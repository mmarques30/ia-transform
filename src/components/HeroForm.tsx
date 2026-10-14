import { useCallback, useEffect, useRef, useState, type FocusEvent, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { AlertCircle, TriangleAlert } from "lucide-react";
import { getMetaPixelCookies, getFbclidFromUrl } from "@/lib/metaCookies";
import { captureAttribution, landingPageFromPath } from "@/lib/attribution";
import { useLpCopy, type LpCopy } from "@/lib/lpLocale";
import {
  CORRIGIR_PARAM,
  WHATSAPP_REFORCO,
  buildCorrigirHref,
  checkWhatsappRemote,
  formatPhone,
  naoWhatsappMensagem,
  normalizePhoneInput,
  onlyDigits,
  readLeadDraft,
  sanitizeMotivo,
  saveLeadDraft,
  validatePhoneFormat,
  type FormatIssue,
  type WhatsappRemoteResult,
} from "@/lib/whatsapp";

/** Aviso do campo de WhatsApp. Não bloqueia o envio. */
interface PhoneWarning {
  motivo: string;
  mensagem: string;
  /** Mostra o reforço de confiança embaixo da mensagem. */
  reforco: boolean;
}

/**
 * O retorno via "errou? corrigir" (?corrigir=1) preenche só o primeiro
 * HeroForm montado na página. /businessv2 tem dois (hero + final) e o do
 * modal monta depois: nenhum deles deve repetir o preenchimento.
 */
let corrigirConsumed = false;

/**
 * Wrapper safe pro Clarity. window.clarity é injetado pelo snippet no
 * __root.tsx — pode não estar pronto se o usuário interagir muito cedo,
 * ou pode estar bloqueado por adblocker. Falha silenciosa nesses casos.
 */
type ClarityFn = (action: string, ...args: unknown[]) => void;
function trackClarity(action: string, ...args: unknown[]): void {
  if (typeof window === "undefined") return;
  const fn = (window as unknown as { clarity?: ClarityFn }).clarity;
  if (typeof fn !== "function") return;
  try {
    fn(action, ...args);
  } catch (err) {
    console.warn("[clarity] tracking failed", err);
  }
}

const FORM_ENDPOINT = "https://ciwdlceyjsnlnunktqzx.supabase.co/functions/v1/form-submit";

// Anon JWT do Supabase. A Edge Function form-submit está configurada com
// verify_jwt=true, então o gateway Kong rejeita (HTTP 401) qualquer
// request sem Authorization: Bearer <jwt>. Esta chave é pública por
// design — é o que o cliente Supabase já expõe em qualquer integração
// frontend. NÃO confunda com SERVICE_ROLE_KEY, essa sim sigilosa.
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpd2RsY2V5anNubG51bmt0cXp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyMTU3OTksImV4cCI6MjA4OTc5MTc5OX0.tl-7gEObYBB7wDUS5_pKh9UyRlJQNdnWPiRpMFYrbUM";

interface HeroFormProps {
  /**
   * Slug do funil — define a origem do lead no CRM. Default: o do idioma
   * da LP (business no Brasil, business-us / business-en fora).
   */
  formSlug?: string;
  /** Rota da página de obrigado pra onde redireciona após o envio. Default: a do idioma. */
  thankYouPath?: string;
  /**
   * Callback opcional pós-submit bem-sucedido. Quando fornecido, ele é
   * chamado NO LUGAR do redirect pra thankYouPath — permite embutir o
   * form em modal/overlay que mostra estado de sucesso inline (LP-B
   * usa isso na modal do hero CTA).
   *
   * Recebe o event_id gerado pra eventual tracking/deep link. Se retornar
   * true (ou por padrão), a navegação é PULADA. Não fornecer = comporta
   * como sempre (navigate → thankYouPath).
   */
  onSuccess?: (eventID: string) => void;
  /**
   * Variante compacta pro uso no hero da /businessv2 (form ao lado do
   * título): esconde o eyebrow "Vagas limitadas por ciclo" (redundante
   * com a QualifierStrip vermelha no topo), reduz padding vertical do
   * card e tighter gap entre campos. Só afeta o layout; a lógica de
   * submit e o payload são idênticos ao form normal.
   */
  compact?: boolean;
  /**
   * Slug fixo da página, enviado sempre como `landing_page` (o CRM
   * identifica a LP por ele). "home" na /, slug da rota nas variantes
   * /iaplicada-*. Omitido = derivado do pathname na abertura.
   */
  landingPage?: string;
}

/** Opções sincronizadas com form_fields do CRM (slug=business). */
const CARGOS = [
  "CEO / Fundador / Sócio",
  "Diretor / Head",
  "Gerente",
  "Coordenador / Supervisor",
  "Analista",
];

const FAIXAS: Array<{ value: string; label: string }> = [
  { value: "Menos de R$ 1 milhão", label: "Menos de R$ 1M" },
  { value: "Entre R$1M e R$3M", label: "Entre R$ 1M e R$ 3M" },
  { value: "Entre R$3M e R$5M", label: "Entre R$ 3M e R$ 5M" },
  { value: "Entre R$5M e R$10M", label: "Entre R$ 5M e R$ 10M" },
  { value: "Acima de R$10M", label: "Acima de R$ 10M" },
];

/**
 * Microcopy escalonada no botão durante o submit. A Edge Function gasta
 * ~3-5s rodando ~14 queries (form, contato, deal, qualify, etc) — o texto
 * em estágios dá percepção de progresso e tira a sensação de travado.
 */
const LOADING_STAGES: Array<{ at: number; text: string }> = [
  { at: 0, text: "Enviando..." },
  { at: 600, text: "Validando seus dados..." },
  { at: 1800, text: "Criando seu acesso..." },
  { at: 3200, text: "Quase lá..." },
];

/** Faixas da LP dos EUA em português. Contrato com o backend: não editar. */
const FAIXAS_US_PT: Array<{ value: string; label: string }> = [
  "Menos de US$ 500 mil",
  "Entre US$ 500 mil e US$ 1 milhão",
  "Entre US$ 1 e US$ 3 milhões",
  "Entre US$ 3 e US$ 10 milhões",
  "Acima de US$ 10 milhões",
].map((v) => ({ value: v, label: v }));

/** Faixas da LP em inglês. Contrato com o backend: não editar. */
const FAIXAS_US_EN: Array<{ value: string; label: string }> = [
  "Less than $500K",
  "$500K to $1M",
  "$1M to $3M",
  "$3M to $10M",
  "More than $10M",
].map((v) => ({ value: v, label: v }));

/** Cargos da LP em inglês. Contrato com o backend: não editar. */
const CARGOS_EN = [
  "CEO / Founder / Owner",
  "Director / VP / Head",
  "Manager",
  "Coordinator / Supervisor",
  "Analyst",
];

interface FormCopy {
  formSlug: string;
  thankYouPath: string;
  /**
   * br: máscara (DD) 9XXXX-XXXX + validação de formato + checagem remota.
   * intl: formato internacional livre (+1 305 555 0123), sem máscara nem
   * checagem; vai com whatsapp_check=nao_verificado.
   */
  phoneMode: "br" | "intl";
  cargos: string[];
  faixas: Array<{ value: string; label: string }>;
  loadingStages: Array<{ at: number; text: string }>;
  eyebrow: string;
  title: string;
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  phoneHint: string;
  cargoLabel: string;
  faixaLabel: string;
  select: string;
  required: string;
  invalidEmail: string;
  /** Só no modo intl: número que não dá pra converter em E.164. */
  invalidPhone: string;
  missingFields: string;
  /** Mensagem de erro do backend vem em português: em inglês usa a genérica. */
  useBackendError: boolean;
  submitFailed: (status: number) => string;
  genericError: string;
  sending: string;
  submitAnyway: string;
  submit: string;
}

const FORM_COPY_PT_BR: FormCopy = {
  formSlug: "business",
  thankYouPath: "/thank-you-business",
  phoneMode: "br",
  cargos: CARGOS,
  faixas: FAIXAS,
  loadingStages: LOADING_STAGES,
  eyebrow: "Vagas limitadas por ciclo",
  title: "Vamos construir o seu?",
  nameLabel: "Nome Completo",
  namePlaceholder: "João da Silva",
  emailLabel: "E-mail",
  emailPlaceholder: "voce@email.com",
  phoneLabel: "Seu WhatsApp (com DDD)",
  phonePlaceholder: "(11) 99999-8888",
  phoneHint: "Vamos te chamar nesse número.",
  cargoLabel: "Seu cargo",
  faixaLabel: "Faturamento anual da empresa",
  select: "Selecione",
  required: "Campo obrigatório",
  invalidEmail: "E-mail inválido",
  invalidPhone: "Inclua o + e o código do país, ex: +1 305 555 0123.",
  missingFields: "Preencha os campos obrigatórios:",
  useBackendError: true,
  submitFailed: (status) => `Falha no envio (HTTP ${status})`,
  genericError: "Não conseguimos enviar agora. Tente novamente em alguns instantes.",
  sending: "Enviando...",
  submitAnyway: "Enviar mesmo assim",
  submit: "SOLICITAR DIAGNÓSTICO",
};

const FORM_COPY: LpCopy<FormCopy> = {
  "pt-br": FORM_COPY_PT_BR,
  "pt-us": {
    ...FORM_COPY_PT_BR,
    formSlug: "business-us",
    thankYouPath: "/thank-you-us",
    phoneMode: "intl",
    faixas: FAIXAS_US_PT,
    phoneLabel: "WhatsApp (com código do país)",
    phonePlaceholder: "+1 (305) 555-0123",
    phoneHint: "Com + e o código do país. Vamos te chamar nesse número.",
  },
  en: {
    formSlug: "business-en",
    thankYouPath: "/thank-you-en",
    phoneMode: "intl",
    cargos: CARGOS_EN,
    faixas: FAIXAS_US_EN,
    loadingStages: [
      { at: 0, text: "Sending..." },
      { at: 600, text: "Validating your info..." },
      { at: 1800, text: "Setting up your access..." },
      { at: 3200, text: "Almost there..." },
    ],
    eyebrow: "Limited spots per cycle",
    title: "Shall we build yours?",
    nameLabel: "Full Name",
    namePlaceholder: "John Smith",
    emailLabel: "Email",
    emailPlaceholder: "you@company.com",
    phoneLabel: "Phone number",
    phonePlaceholder: "+1 (305) 555-0123",
    phoneHint: "Include + and your country code.",
    cargoLabel: "Your role",
    faixaLabel: "Company annual revenue",
    select: "Select",
    required: "Required field",
    invalidEmail: "Invalid email",
    invalidPhone: "Add + and your country code, e.g. +1 305 555 0123.",
    missingFields: "Please fill in the required fields:",
    useBackendError: false,
    submitFailed: (status) => `Submission failed (HTTP ${status}). Please try again.`,
    genericError: "We couldn't submit right now. Please try again in a few moments.",
    sending: "Sending...",
    submitAnyway: "Submit anyway",
    submit: "REQUEST DIAGNOSTIC",
  },
};

/** Telefone internacional: só dígitos, +, espaço, parênteses, hífen e ponto. */
function sanitizeIntlPhone(raw: string): string {
  return raw.replace(/[^\d+\s().-]/g, "").slice(0, 24);
}

/**
 * Telefone internacional em E.164 (+<código do país><número>), que é o que o
 * CRM exige: sem o +, o form-submit lê o número como brasileiro e reprova
 * (ex.: (786) 555-1234 vira "DDD não existe").
 *
 *  - com + (ou 00 na frente): mantém o código do país digitado
 *  - sem +, número dos EUA/Canadá (10 dígitos, ou 11 com o 1 na frente,
 *    no formato do plano americano) → +1
 *  - qualquer outra coisa sem +: ambíguo (não dá pra saber o país) → null
 *
 * null também quando o total foge de 8–15 dígitos (limites do E.164).
 */
function toE164Intl(raw: string): string | null {
  const trimmed = raw.trim();
  let digits = onlyDigits(trimmed);
  let explicitCountry = trimmed.startsWith("+");
  if (!explicitCountry && digits.startsWith("00")) {
    digits = digits.slice(2);
    explicitCountry = true;
  }
  if (!explicitCountry) {
    // Plano de numeração dos EUA/Canadá: código de área e prefixo começam
    // com 2–9. Sem isso, celular brasileiro sem +55 ((11) 98765-4321 tem 11
    // dígitos começando com 1) passaria por americano.
    const national = digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;
    if (!/^[2-9]\d{2}[2-9]\d{6}$/.test(national)) return null;
    digits = `1${national}`;
  }
  if (digits.length < 8 || digits.length > 15) return null;
  return `+${digits}`;
}

/**
 * HeroForm — campos nativos React integrados ao design dark da LP.
 * Submete via POST JSON pra Edge Function form-submit da IAplicada,
 * usando o shape esperado pelo backend:
 *   { form_slug, fields: { firstname, email, phone, cargo, faixa_de_faturamento, ... } }
 *
 * UTMs capturadas de window.location.search e enviadas junto ao payload.
 * Em caso de sucesso, navega pra /thank-you-business.
 */
export function HeroForm({
  formSlug: formSlugProp,
  thankYouPath: thankYouPathProp,
  onSuccess,
  compact = false,
  landingPage,
}: HeroFormProps = {}) {
  const navigate = useNavigate();
  const c = useLpCopy(FORM_COPY);
  const formSlug = formSlugProp ?? c.formSlug;
  const thankYouPath = thankYouPathProp ?? c.thankYouPath;
  const intlPhone = c.phoneMode === "intl";
  /** Hidden fields de tracking. landing_page é fixo por rota; page_url e
   *  referrer só existem no client, então entram no mount. UTMs/click ids
   *  são capturados da URL aqui (e guardados em sessionStorage) pra não
   *  se perderem se a query string sumir antes do submit. */
  const [tracking, setTracking] = useState({
    landing_page: landingPage ?? "",
    page_url: "",
    referrer: "",
  });
  useEffect(() => {
    captureAttribution();
    setTracking({
      landing_page: landingPage ?? landingPageFromPath(window.location.pathname),
      page_url: window.location.href,
      referrer: document.referrer,
    });
  }, [landingPage]);

  /* ─── Campo de WhatsApp ───────────────────────────────────────────
   * Máscara enquanto digita, validação de formato ao sair do campo e
   * checagem "existe no WhatsApp?" em segundo plano. Nada disso bloqueia
   * o envio: o resultado vai no hidden whatsapp_check e o aviso só pede
   * um segundo clique ("Enviar mesmo assim"). */
  const formRef = useRef<HTMLFormElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const [phoneDisplay, setPhoneDisplay] = useState("");
  const phoneDigits = onlyDigits(phoneDisplay);
  const [phoneWarning, setPhoneWarning] = useState<PhoneWarning | null>(null);
  /** Espelho síncrono do aviso: o submit roda no mesmo evento que pode
   *  acabar de criá-lo (Enter dentro do campo) e não pode ler state velho. */
  const phoneWarningRef = useRef<PhoneWarning | null>(null);
  const [whatsappCheck, setWhatsappCheck] = useState("");
  /** 55DD9XXXXXXXX devolvido pela checagem remota; substitui o valor do campo no envio. */
  const verifiedPhone = useRef<string | null>(null);
  /** Descarta respostas de checagens antigas (o número mudou no meio). */
  const checkSeq = useRef(0);
  const lastRemote = useRef<{ digits: string; result: WhatsappRemoteResult } | null>(null);
  /** Primeiro clique com aviso na tela só foca o campo; o segundo envia. */
  const warningAcknowledged = useRef(false);
  /** Envio em andamento: checagem que chegar depois não mexe mais na tela. */
  const sending = useRef(false);

  function showPhoneWarning(next: PhoneWarning) {
    const prev = phoneWarningRef.current;
    if (!prev || prev.motivo !== next.motivo || prev.mensagem !== next.mensagem) {
      // Aviso novo: volta a exigir o clique de confirmação.
      warningAcknowledged.current = false;
      trackClarity("event", `whatsapp_aviso_${next.motivo}`);
    }
    phoneWarningRef.current = next;
    setPhoneWarning(next);
  }

  function clearPhoneWarning() {
    warningAcknowledged.current = false;
    phoneWarningRef.current = null;
    setPhoneWarning(null);
  }

  function applyFormatIssue(issue: FormatIssue) {
    verifiedPhone.current = null;
    setWhatsappCheck(`formato:${issue.motivo}`);
    showPhoneWarning({ motivo: issue.motivo, mensagem: issue.mensagem, reforco: issue.reforco });
  }

  function applyRemoteResult(digits: string, result: WhatsappRemoteResult) {
    if (result.kind === "verificado") {
      verifiedPhone.current = result.telefone;
      setWhatsappCheck("ok");
      clearPhoneWarning();
      return;
    }
    verifiedPhone.current = null;
    if (result.kind === "invalido") {
      // ok:false → mostra a `mensagem` da função (já vem com o reforço
      // de confiança no caso nao_whatsapp). Texto local só de reserva.
      const naoWhatsapp = result.motivo === "nao_whatsapp";
      const motivo = naoWhatsapp ? "nao_whatsapp" : sanitizeMotivo(result.motivo);
      setWhatsappCheck(naoWhatsapp ? "nao_whatsapp" : `formato:${motivo}`);
      showPhoneWarning(
        result.mensagem
          ? { motivo, mensagem: result.mensagem, reforco: false }
          : naoWhatsapp
            ? { motivo, mensagem: naoWhatsappMensagem(digits), reforco: true }
            : { motivo, mensagem: "Confere o seu WhatsApp?", reforco: false },
      );
      return;
    }
    // verificado: false, timeout ou erro de rede: segue sem aviso.
    setWhatsappCheck("nao_verificado");
    clearPhoneWarning();
  }

  function startRemoteCheck(digits: string) {
    const cached = lastRemote.current;
    if (cached && cached.digits === digits) {
      applyRemoteResult(digits, cached.result);
      return;
    }
    verifiedPhone.current = null;
    setWhatsappCheck("nao_verificado");
    clearPhoneWarning();
    const seq = ++checkSeq.current;
    void checkWhatsappRemote(formatPhone(digits)).then((result) => {
      if (result.kind !== "erro") lastRemote.current = { digits, result };
      // Número mudou no meio, ou o envio já saiu (foi com nao_verificado):
      // a resposta não muda mais nada na tela.
      if (seq !== checkSeq.current || sending.current) return;
      applyRemoteResult(digits, result);
    });
  }

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (intlPhone) {
      const value = sanitizeIntlPhone(e.target.value);
      setPhoneDisplay(value);
      setWhatsappCheck(value.trim() ? "nao_verificado" : "");
      return;
    }
    const inputType = (e.nativeEvent as InputEvent).inputType;
    const digits = normalizePhoneInput(e.target.value, phoneDigits, inputType);
    setPhoneDisplay(formatPhone(digits));
    // Número mudou: resultado anterior não vale mais.
    checkSeq.current++;
    verifiedPhone.current = null;
    const issue = digits ? validatePhoneFormat(digits) : null;
    setWhatsappCheck(!digits ? "" : issue ? `formato:${issue.motivo}` : "nao_verificado");
    // Corrigiu: o aviso some na hora. Ainda errado: o aviso atual fica até sair do campo.
    if (phoneWarningRef.current && !issue) clearPhoneWarning();
  }

  function handlePhoneBlur() {
    if (intlPhone) return;
    const digits = onlyDigits(phoneRef.current?.value ?? phoneDisplay);
    if (!digits) {
      clearPhoneWarning();
      setWhatsappCheck("");
      return;
    }
    const issue = validatePhoneFormat(digits);
    if (issue) {
      applyFormatIssue(issue);
      return;
    }
    startRemoteCheck(digits);
  }

  /**
   * Volta do "errou? corrigir": repõe nome, e-mail, cargo e faturamento do
   * envio anterior e deixa o WhatsApp VAZIO e em foco, com whatsapp_check
   * zerado, pra pessoa digitar o número do zero. O reenvio usa o mesmo
   * e-mail e o CRM troca o telefone do contato.
   */
  useEffect(() => {
    if (corrigirConsumed) return;
    if (new URLSearchParams(window.location.search).get(CORRIGIR_PARAM) !== "1") return;
    const draft = readLeadDraft();
    const form = formRef.current;
    if (!draft || !form) return;
    corrigirConsumed = true;
    for (const name of ["firstname", "email", "cargo", "faixa_de_faturamento"] as const) {
      const el = form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | null;
      if (el && draft[name]) el.value = draft[name];
    }
    setPhoneDisplay("");
    setWhatsappCheck("");
    verifiedPhone.current = null;
    lastRemote.current = null;
    clearPhoneWarning();
    setAllRequiredFilled(false);
    requestAnimationFrame(() => phoneRef.current?.focus());
  }, []);

  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [error, setError] = useState<string | null>(null);
  /** Erros inline por field — populados onBlur (após o usuário sair do campo)
   *  e onSubmit (validação completa antes do envio). Cleared on focus/typing
   *  pra não distrair enquanto o usuário corrige. */
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  /** Boolean derivado dos required-com-valor pra controlar o disabled do
   *  botão de submit em tempo real. Recalculado em todo onInput/onChange
   *  do form. */
  const [allRequiredFilled, setAllRequiredFilled] = useState(false);
  const loadingTimers = useRef<number[]>([]);

  function clearLoadingStages() {
    for (const t of loadingTimers.current) clearTimeout(t);
    loadingTimers.current = [];
  }
  function startLoadingStages() {
    clearLoadingStages();
    for (const stage of c.loadingStages) {
      if (stage.at === 0) {
        setLoadingMsg(stage.text);
      } else {
        loadingTimers.current.push(window.setTimeout(() => setLoadingMsg(stage.text), stage.at));
      }
    }
  }

  /** Cleanup dos timers no unmount pra não vazar setTimeout. */
  useEffect(() => clearLoadingStages, []);

  const tiltRAF = useRef(0);
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    cancelAnimationFrame(tiltRAF.current);
    tiltRAF.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(800px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg)`;
    });
  }, []);
  const handleMouseLeave = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    cancelAnimationFrame(tiltRAF.current);
    el.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg)";
  }, []);

  /**
   * Refs de tracking — fora do state pra evitar re-renders. Cada flag
   * garante "dispara só uma vez" pros eventos one-shot do Clarity.
   */
  const cardRef = useRef<HTMLDivElement>(null);
  const viewFired = useRef(false);
  const startFired = useRef(false);
  const fieldsCompleted = useRef<Set<string>>(new Set());
  const submitted = useRef(false);
  const hasAnyValue = useRef(false);

  /**
   * IntersectionObserver: dispara form_view quando >=50% do card está
   * visível. Cobre o caso de scroll-down (visitor desceu sem ver o form)
   * vs. acima da dobra (impressão imediata).
   */
  useEffect(() => {
    if (!cardRef.current) return;
    const node = cardRef.current;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !viewFired.current) {
            viewFired.current = true;
            trackClarity("event", "form_view");
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.5 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  /**
   * beforeunload: se o usuário interagiu com pelo menos 1 campo mas
   * não submeteu, registra form_abandon. Útil pra medir fricção dos
   * campos finais (cargo / faixa / setor).
   */
  useEffect(() => {
    const onBeforeUnload = () => {
      if (submitted.current) return;
      if (!hasAnyValue.current) return;
      trackClarity("event", "form_abandon");
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, []);

  /**
   * Delegação no <form>: primeiro focus em qualquer campo → form_start.
   * Blur com valor preenchido → form_field_complete_<name> (uma vez por
   * field). Marca hasAnyValue pra alimentar o form_abandon.
   */
  function handleFocusCapture(_e: FocusEvent<HTMLFormElement>) {
    if (startFired.current) return;
    startFired.current = true;
    trackClarity("event", "form_start");
  }

  function handleBlurCapture(e: FocusEvent<HTMLFormElement>) {
    const target = e.target as unknown as HTMLInputElement | HTMLSelectElement | null;
    if (!target || !target.name) return;
    const value = (target.value ?? "").trim();
    if (!value) return;
    hasAnyValue.current = true;
    if (fieldsCompleted.current.has(target.name)) return;
    fieldsCompleted.current.add(target.name);
    trackClarity("event", `form_field_complete_${target.name}`);
  }

  /**
   * Lista de campos obrigatórios pra qualificação MQL no CRM.
   * Sem todos preenchidos a Edge Function devolve missing[] e o lead
   * fica desqualificado. Bloqueamos no client antes pra evitar o roundtrip.
   */
  const REQUIRED_FIELDS = ["firstname", "email", "phone", "cargo", "faixa_de_faturamento"] as const;

  /** Valida um único field. Retorna mensagem de erro ou "" se OK. */
  function validateField(name: string, value: string): string {
    const trimmed = value.trim();
    const isRequired = (REQUIRED_FIELDS as readonly string[]).includes(name);
    if (isRequired && !trimmed) return c.required;
    if (name === "email" && trimmed && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      return c.invalidEmail;
    }
    if (intlPhone && name === "phone" && trimmed && !toE164Intl(trimmed)) {
      return c.invalidPhone;
    }
    // WhatsApp: formato não bloqueia mais o envio. O aviso vem do
    // handlePhoneBlur / handleSubmit e o resultado vai em whatsapp_check.
    return "";
  }

  /** Confere se todos os required têm valor (sem checar formato). Usado
   *  só pra controlar o disabled do botão. Formato é checado em validateField. */
  function allRequiredHaveValue(form: HTMLFormElement): boolean {
    const fd = new FormData(form);
    for (const name of REQUIRED_FIELDS) {
      if (!String(fd.get(name) ?? "").trim()) return false;
    }
    return true;
  }

  /** Cleared error do field assim que o usuário começa a digitar/selecionar.
   *  Também recalcula allRequiredFilled. */
  function handleFormInput(e: React.FormEvent<HTMLFormElement>) {
    const target = e.target as unknown as HTMLInputElement | HTMLSelectElement | null;
    if (target && target.name && fieldErrors[target.name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[target.name];
        return next;
      });
    }
    setAllRequiredFilled(allRequiredHaveValue(e.currentTarget));
  }

  /** Valida o field ao perder foco (pattern leve — não cobrar erro durante
   *  digitação). */
  function handleFieldBlur(e: FocusEvent<HTMLFormElement>) {
    const target = e.target as unknown as HTMLInputElement | HTMLSelectElement | null;
    if (!target || !target.name) return;
    const err = validateField(target.name, target.value);
    setFieldErrors((prev) => {
      const next = { ...prev };
      if (err) next[target.name] = err;
      else delete next[target.name];
      return next;
    });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;
    setError(null);

    // Validação: em vez de mostrar todos os erros de uma vez, achamos
    // o primeiro campo obrigatório inválido, marcamos SÓ o erro dele,
    // focamos e deixamos que o próprio fluxo de onBlur do usuário
    // popule os erros dos demais conforme ele avança. Isso evita a
    // "parede vermelha" de erros no submit.
    const form = e.currentTarget;
    const fdValidate = new FormData(form);
    let firstErrName: (typeof REQUIRED_FIELDS)[number] | null = null;
    let firstErrMsg = "";
    for (const name of REQUIRED_FIELDS) {
      const value = String(fdValidate.get(name) ?? "");
      const err = validateField(name, value);
      if (err) {
        firstErrName = name;
        firstErrMsg = err;
        break;
      }
    }
    if (firstErrName) {
      setFieldErrors((prev) => ({ ...prev, [firstErrName!]: firstErrMsg }));
      const el = form.elements.namedItem(firstErrName) as HTMLElement | null;
      el?.focus();
      return;
    }

    // WhatsApp com aviso: o primeiro clique só leva o foco pro campo com o
    // aviso visível; o segundo envia ("Enviar mesmo assim"). Formato é
    // recalculado aqui porque Enter dentro do campo envia sem passar pelo blur.
    const submitDigits = onlyDigits(String(fdValidate.get("phone") ?? ""));
    const submitIssue = intlPhone ? null : validatePhoneFormat(submitDigits);
    let warningOnScreen = phoneWarningRef.current !== null;
    if (submitIssue && phoneWarningRef.current?.motivo !== submitIssue.motivo) {
      applyFormatIssue(submitIssue);
      warningOnScreen = true;
    }
    if (warningOnScreen && !warningAcknowledged.current) {
      warningAcknowledged.current = true;
      trackClarity("event", "whatsapp_aviso_primeiro_clique");
      phoneRef.current?.focus();
      return;
    }
    if (warningOnScreen) trackClarity("event", "whatsapp_enviar_mesmo_assim");
    const whatsappCheckFinal = submitIssue
      ? `formato:${submitIssue.motivo}`
      : whatsappCheck || "nao_verificado";

    sending.current = true;
    setLoading(true);
    startLoadingStages();

    /**
     * eventID — único por submissão. Usado pra deduplicação do evento
     * Lead no Meta Pixel: dispara aqui (client-side, antes do redirect)
     * E também no thank-you-business.tsx (backup, caso o usuário feche
     * a aba antes do PageView da thank-you).
     */
    const eventID = `lead_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;

    console.log("[form] submit start", { eventID });

    try {
      const fd = new FormData(e.currentTarget);
      const params =
        typeof window !== "undefined"
          ? new URLSearchParams(window.location.search)
          : new URLSearchParams();

      const typedPhone = String(fd.get("phone") ?? "").trim();
      // LPs dos EUA: sempre E.164 (o validateField já barrou o que não converte).
      const intlE164 = intlPhone ? toE164Intl(typedPhone) : null;
      const fields = {
        firstname: String(fd.get("firstname") ?? "").trim(),
        email: String(fd.get("email") ?? "").trim(),
        // Número confirmado no WhatsApp vai no formato 55DD9XXXXXXXX;
        // senão, o que a pessoa digitou (com máscara). Fora do Brasil, E.164.
        phone: intlE164 || (!submitIssue && verifiedPhone.current) || typedPhone,
        cargo: String(fd.get("cargo") ?? "").trim(),
        faixa_de_faturamento: String(fd.get("faixa_de_faturamento") ?? "").trim(),
        // ok | nao_verificado | nao_whatsapp | formato:<motivo>
        whatsapp_check: whatsappCheckFinal,
      };

      // UTMs e click ids: só o que veio na URL (capturado na abertura da
      // página e guardado na sessão). Sem fallback — sem UTM, vai vazio.
      const attribution = captureAttribution();
      const utmSource = attribution.utm_source;
      const utmMedium = attribution.utm_medium;
      const utmCampaign = attribution.utm_campaign;
      const utmTerm = attribution.utm_term;
      const utmContent = attribution.utm_content;
      const utmId = attribution.utm_id;
      const fbclid = getFbclidFromUrl() ?? params.get("fbclid") ?? attribution.fbclid;
      const gclid = attribution.gclid;
      // Identidade da LP (hidden fields) — independente de UTM.
      const landing_page =
        String(fd.get("landing_page") ?? "").trim() ||
        landingPage ||
        landingPageFromPath(window.location.pathname);
      const pageUrl = String(fd.get("page_url") ?? "") || window.location.href;
      const referrer = String(fd.get("referrer") ?? "") || document.referrer;
      // Cookies do pixel Meta — alimentam o Match Quality da CAPI
      // server-side. Pixel é injetado no __root.tsx; quando o user
      // chega aqui via submit (alguns segundos depois), _fbp/_fbc
      // já estão criados em document.cookie. NUNCA criar/sobrescrever
      // — só ler o que o pixel setou.
      const { fbp, fbc } = getMetaPixelCookies();

      const payload = {
        form_slug: formSlug,
        // Slug fixo da rota ("home", "iaplicada-erp", ...). O CRM usa este
        // campo pra saber a LP; utm_content é só repasse do que veio na URL.
        landing_page,
        fields,
        // ─── Shape esperada pela Edge Function form-submit ───
        // A Edge Function lê utm.source / attribution.fbclid / meta.page_url.
        // Antes mandávamos só os campos top-level (utm_source, fbclid, ...) e
        // a função caía no fallback `deriveSourceFromReferrer('')` → gravava
        // utm_source='direct' independente do tráfego real.
        utm: {
          source: utmSource,
          medium: utmMedium,
          campaign: utmCampaign,
          term: utmTerm,
          content: utmContent,
          id: utmId,
        },
        attribution: { fbclid, gclid, fbp, fbc },
        meta: {
          page_url: pageUrl,
          referrer,
          user_agent: typeof navigator !== "undefined" ? navigator.userAgent : "",
        },
        // Backwards-compat: mantém o shape antigo (top-level) caso algum
        // consumidor ainda dependa. A Edge Function ignora silenciosamente.
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
        utm_term: utmTerm,
        utm_content: utmContent,
        utm_id: utmId,
        fbclid,
        gclid,
        whatsapp_check: whatsappCheckFinal,
        // Mesmo eventID que dispara no fbq client. Permite a Edge Function
        // mandar Conversions API com o mesmo ID se quiser deduplicar
        // server-side no futuro.
        event_id: eventID,
      };

      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // apikey é exigido pelo Kong gateway do Supabase; Authorization
          // Bearer é validado pelo verify_jwt=true da Edge Function. Sem
          // os dois, a request volta com HTTP 401 antes da função rodar.
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        const missing = Array.isArray(body?.missing)
          ? body.missing
              .map((m: { label?: string }) => m.label)
              .filter(Boolean)
              .join(", ")
          : "";
        throw new Error(
          missing
            ? `${c.missingFields} ${missing}`
            : (c.useBackendError && body?.error) || c.submitFailed(res.status),
        );
      }

      console.log("[form] api ok");

      // Dispara Lead no Meta Pixel com eventID pra deduplicação.
      // window.fbq é injetado pelo script inline no __root.tsx.
      type FbqFn = (
        action: "track",
        event: string,
        params?: Record<string, unknown>,
        opts?: { eventID: string },
      ) => void;
      const fbq = (window as unknown as { fbq?: FbqFn }).fbq;
      if (typeof fbq === "function") {
        // try/catch: in-app browsers (Instagram/Facebook) injetam
        // `window.webkit.messageHandlers` e o fbevents.js às vezes lança
        // ao tocar nesse bridge. Sem o try/catch, o throw aborta o
        // navigate() abaixo — lead já está salvo, mas o usuário vê
        // "Falha no envio" e o funnel parece quebrado.
        try {
          fbq(
            "track",
            "Lead",
            {
              content_name: "business_diagnostic",
              content_category: "business",
            },
            { eventID },
          );
          console.log("[form] pixel fired", { eventID });
        } catch (err) {
          console.warn("[form] pixel throw — seguindo pro redirect", err);
        }
      } else {
        console.warn("[form] fbq not available — Pixel não disparado");
      }

      trackClarity("event", "form_submit_success");
      trackClarity("set", "lead_event_id", eventID);
      submitted.current = true;

      // Tela de obrigado mostra o número digitado + "errou? corrigir".
      // Fora do Brasil mostra o E.164 enviado: se o +1 foi deduzido, a
      // pessoa vê e corrige.
      saveLeadDraft({
        firstname: fields.firstname,
        email: fields.email,
        phone: intlE164 || typedPhone,
        cargo: fields.cargo,
        faixa_de_faturamento: fields.faixa_de_faturamento,
        returnHref: buildCorrigirHref(),
      });

      clearLoadingStages();
      if (onSuccess) {
        console.log("[form] onSuccess handler present, skipping navigate");
        onSuccess(eventID);
      } else {
        console.log("[form] redirecting");
        navigate({ to: thankYouPath, search: { eid: eventID } });
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : c.genericError;

      console.error("[form] submit failed", message);
      trackClarity("event", "form_submit_error");
      trackClarity("set", "form_submit_error_message", message);

      clearLoadingStages();
      setLoadingMsg("");
      setError(message);
      setLoading(false);
      sending.current = false;
    }
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`hero-form-card rounded-[24px] overflow-hidden relative${compact ? " hero-form-compact" : ""}`}
      style={{
        backgroundColor: "oklch(0.995 0.003 110 / 0.72)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid oklch(0.88 0.02 115 / 0.7)",
        boxShadow:
          "0 30px 60px -25px oklch(0.18 0.02 122 / 0.18), 0 10px 25px -10px oklch(0.18 0.02 122 / 0.08)",
        transition: "transform 0.25s ease-out, box-shadow 0.4s ease",
        willChange: "transform",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[24px]"
        style={{ boxShadow: "inset 0 1px 0 oklch(1 0 0 / 0.9)" }}
      />

      <div
        className={
          compact ? "px-6 pt-4 lg:px-7 lg:pt-4 relative" : "px-6 pt-4 lg:px-7 lg:pt-5 relative"
        }
      >
        {!compact && (
          <span
            className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] font-semibold rounded-full px-2.5 py-1 select-none"
            style={{
              backgroundColor: "oklch(0.96 0.025 125)",
              color: "var(--color-primary)",
              border: "1px solid oklch(0.85 0.05 125)",
              cursor: "default",
            }}
            aria-hidden
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: "var(--color-primary)" }}
            />
            {c.eyebrow}
          </span>
        )}
        <p
          className={
            compact
              ? "text-[20px] tracking-[-0.02em] leading-tight"
              : "mt-2 text-[22px] tracking-[-0.02em] leading-tight"
          }
          style={{
            color: "oklch(0.15 0.02 122)",
            fontFamily: '"Instrument Serif", serif',
            fontWeight: 500,
            fontStyle: "italic",
          }}
        >
          {c.title}
        </p>
      </div>

      <div
        className={
          compact
            ? "px-6 pb-4 pt-3 lg:px-7 lg:pb-4 lg:pt-2 relative"
            : "px-6 pb-4 pt-3 lg:px-7 lg:pb-5 lg:pt-3 relative"
        }
      >
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          onFocusCapture={handleFocusCapture}
          onBlurCapture={(e) => {
            handleBlurCapture(e);
            handleFieldBlur(e);
          }}
          onInput={handleFormInput}
          onChange={handleFormInput}
          className={compact ? "space-y-1.5" : "space-y-2"}
          noValidate
        >
          <input type="hidden" name="landing_page" value={tracking.landing_page} readOnly />
          <input type="hidden" name="page_url" value={tracking.page_url} readOnly />
          <input type="hidden" name="referrer" value={tracking.referrer} readOnly />
          <input type="hidden" name="whatsapp_check" value={whatsappCheck} readOnly />

          <Field id="firstname" label={c.nameLabel} required error={fieldErrors.firstname}>
            <input
              id="firstname"
              name="firstname"
              type="text"
              required
              autoComplete="name"
              placeholder={c.namePlaceholder}
              aria-invalid={!!fieldErrors.firstname}
              className="form-input"
            />
          </Field>

          <Field id="email" label={c.emailLabel} required error={fieldErrors.email}>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder={c.emailPlaceholder}
              aria-invalid={!!fieldErrors.email}
              className="form-input"
            />
          </Field>

          <Field id="phone" label={c.phoneLabel} required error={fieldErrors.phone}>
            <input
              ref={phoneRef}
              id="phone"
              name="phone"
              type="tel"
              inputMode="tel"
              required
              autoComplete={intlPhone ? "tel" : "tel-national"}
              placeholder={c.phonePlaceholder}
              value={phoneDisplay}
              onChange={handlePhoneChange}
              onBlur={handlePhoneBlur}
              aria-invalid={!!fieldErrors.phone || !!phoneWarning}
              aria-describedby={phoneWarning ? "phone-hint phone-warning" : "phone-hint"}
              className="form-input"
            />
            <p
              id="phone-hint"
              className="mt-1 text-[11.5px] leading-tight"
              style={{ color: "oklch(0.45 0.02 122)" }}
            >
              {c.phoneHint}
            </p>
            {phoneWarning && <WhatsappWarning warning={phoneWarning} />}
          </Field>

          <Field id="cargo" label={c.cargoLabel} required error={fieldErrors.cargo}>
            <select
              id="cargo"
              name="cargo"
              required
              defaultValue=""
              aria-invalid={!!fieldErrors.cargo}
              className="form-input"
            >
              <option value="" disabled>
                {c.select}
              </option>
              {c.cargos.map((cargo) => (
                <option key={cargo} value={cargo}>
                  {cargo}
                </option>
              ))}
            </select>
          </Field>

          <Field
            id="faixa_de_faturamento"
            label={c.faixaLabel}
            required
            error={fieldErrors.faixa_de_faturamento}
          >
            <select
              id="faixa_de_faturamento"
              name="faixa_de_faturamento"
              required
              defaultValue=""
              aria-invalid={!!fieldErrors.faixa_de_faturamento}
              className="form-input"
            >
              <option value="" disabled>
                {c.select}
              </option>
              {c.faixas.map((f) => (
                <option key={f.value} value={f.value}>
                  {f.label}
                </option>
              ))}
            </select>
          </Field>

          {error && (
            <div
              role="alert"
              className="flex items-start gap-2 rounded-md px-3 py-2.5 text-[12.5px]"
              style={{
                backgroundColor: "oklch(0.96 0.05 25)",
                border: "1px solid oklch(0.82 0.1 25)",
                color: "oklch(0.4 0.16 25)",
              }}
            >
              <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" strokeWidth={2} />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !allRequiredFilled}
            className="hero-form-cta mt-1 w-full inline-flex items-center justify-center rounded-full px-6 py-4 text-[14.5px] font-bold uppercase tracking-[0.06em] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? loadingMsg || c.sending : phoneWarning ? c.submitAnyway : c.submit}
          </button>
        </form>
      </div>
    </div>
  );
}

/**
 * Separa o título do aviso (até a primeira pergunta, ex.: "Não achamos
 * WhatsApp em (31) 95051-2233. Confere o DDD e os dígitos?") do resto
 * (o reforço de confiança que a função manda na mesma `mensagem`).
 */
function splitWarning(text: string): [string, string] {
  const q = text.indexOf("?");
  if (q > 0 && q < 160 && q < text.length - 1) {
    return [text.slice(0, q + 1).trim(), text.slice(q + 1).trim()];
  }
  return [text, ""];
}

/** Caixa de aviso do WhatsApp: destaque quente, legível, sem travar o envio. */
function WhatsappWarning({ warning }: { warning: PhoneWarning }) {
  const [titulo, corpo] = splitWarning(warning.mensagem);
  const detalhe = warning.reforco ? WHATSAPP_REFORCO : corpo;
  return (
    <div
      id="phone-warning"
      role="alert"
      className="mt-2 flex items-start gap-2.5 rounded-xl px-3.5 py-3"
      style={{
        backgroundColor: "#FFF5E6",
        border: "1px solid #F1C27D",
        color: "#5A3410",
      }}
    >
      <TriangleAlert
        className="h-4 w-4 mt-[2px] shrink-0"
        strokeWidth={2.2}
        style={{ color: "#C2620A" }}
        aria-hidden
      />
      <div className="text-[12.5px] leading-[1.45]">
        <p className="font-semibold">{warning.reforco ? warning.mensagem : titulo}</p>
        {detalhe && <p className="mt-1.5">{detalhe}</p>}
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[12px] font-semibold mb-1"
        style={{ color: "oklch(0.32 0.02 122)" }}
      >
        {label}
        {required && (
          <span className="ml-1" style={{ color: "var(--color-primary)" }}>
            ·
          </span>
        )}
      </label>
      {children}
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-1 text-[11.5px] font-medium leading-tight"
          style={{ color: "oklch(0.5 0.18 25)" }}
        >
          {error}
        </p>
      )}
    </div>
  );
}
