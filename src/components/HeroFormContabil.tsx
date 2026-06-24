import { useEffect, useRef, useState, type FocusEvent, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, AlertCircle } from "lucide-react";

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
  /** Slug do funil — define a origem do lead no CRM. Default: business-contabil. */
  formSlug?: string;
  /** Rota da página de obrigado pra onde redireciona após o envio. */
  thankYouPath?: string;
}

/** Faixa de faturamento anual da empresa — qualificador novo (ICP contábil). */
const FAIXAS_FATURAMENTO = [
  "Menos de R$ 1 milhão",
  "Entre 1MM e 5MM",
  "Entre 5MM e 10MM",
  "Entre 10MM e 50MM",
  "Acima de 50MM",
];

/** Faixa de colaboradores do escritório — opcional, secundário ao faturamento. */
const COLABORADORES = [
  "até 10",
  "11 a 30",
  "31 a 50",
  "+ 50",
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

/**
 * HeroFormContabil — mesma técnica do HeroForm da geral (campos nativos
 * React, POST pra Edge Function form-submit, tracking Clarity + Meta
 * Pixel, redirect), mas com os campos da vertical contábil. Conserva o
 * layout do card e a conexão com a origem (slug business-contabil).
 */
export function HeroForm({
  formSlug = "business-contabil",
  thankYouPath = "/contabil-thank-you",
}: HeroFormProps = {}) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [error, setError] = useState<string | null>(null);
  /** Erros inline por field (populados em onBlur + onSubmit). */
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  /** Controla o disabled do botão em tempo real. */
  const [allRequiredFilled, setAllRequiredFilled] = useState(false);
  const loadingTimers = useRef<number[]>([]);

  function clearLoadingStages() {
    for (const t of loadingTimers.current) clearTimeout(t);
    loadingTimers.current = [];
  }
  function startLoadingStages() {
    clearLoadingStages();
    for (const stage of LOADING_STAGES) {
      if (stage.at === 0) {
        setLoadingMsg(stage.text);
      } else {
        loadingTimers.current.push(
          window.setTimeout(() => setLoadingMsg(stage.text), stage.at),
        );
      }
    }
  }

  /** Cleanup dos timers no unmount pra não vazar setTimeout. */
  useEffect(() => clearLoadingStages, []);

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
    const target = e.target as HTMLInputElement | HTMLSelectElement | null;
    if (!target || !target.name) return;
    const value = (target.value ?? "").trim();
    if (!value) return;
    hasAnyValue.current = true;
    if (fieldsCompleted.current.has(target.name)) return;
    fieldsCompleted.current.add(target.name);
    trackClarity("event", `form_field_complete_${target.name}`);
  }

  /**
   * Required pra qualificação MQL no CRM contábil:
   *   - faixa_de_faturamento é o qualificador principal de tier de deal
   *   - company necessário pra deal/account creation
   *   - numero_de_colaboradores virou opcional (sinal secundário)
   */
  const REQUIRED_FIELDS = [
    "firstname",
    "email",
    "phone",
    "company",
    "faixa_de_faturamento",
  ] as const;

  function validateField(name: string, value: string): string {
    const trimmed = value.trim();
    const isRequired = (REQUIRED_FIELDS as readonly string[]).includes(name);
    if (isRequired && !trimmed) return "Campo obrigatório";
    if (name === "email" && trimmed && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      return "E-mail inválido";
    }
    if (name === "phone" && trimmed && trimmed.replace(/\D/g, "").length < 10) {
      return "Inclua DDD (mín. 10 dígitos)";
    }
    return "";
  }

  function allRequiredHaveValue(form: HTMLFormElement): boolean {
    const fd = new FormData(form);
    for (const name of REQUIRED_FIELDS) {
      if (!String(fd.get(name) ?? "").trim()) return false;
    }
    return true;
  }

  function handleFormInput(e: React.FormEvent<HTMLFormElement>) {
    const target = e.target as HTMLInputElement | HTMLSelectElement | null;
    if (target && target.name && fieldErrors[target.name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[target.name];
        return next;
      });
    }
    setAllRequiredFilled(allRequiredHaveValue(e.currentTarget));
  }

  function handleFieldBlur(e: FocusEvent<HTMLFormElement>) {
    const target = e.target as HTMLInputElement | HTMLSelectElement | null;
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

    const form = e.currentTarget;
    const fdValidate = new FormData(form);
    const newErrors: Record<string, string> = {};
    for (const name of REQUIRED_FIELDS) {
      const value = String(fdValidate.get(name) ?? "");
      const err = validateField(name, value);
      if (err) newErrors[name] = err;
    }
    setFieldErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      const firstErrName = REQUIRED_FIELDS.find((f) => newErrors[f]);
      if (firstErrName) {
        const el = form.elements.namedItem(firstErrName) as HTMLElement | null;
        el?.focus();
      }
      return;
    }

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

      const fields = {
        firstname: String(fd.get("firstname") ?? "").trim(),
        email: String(fd.get("email") ?? "").trim(),
        phone: String(fd.get("phone") ?? "").trim(),
        company: String(fd.get("company") ?? "").trim(),
        faixa_de_faturamento: String(fd.get("faixa_de_faturamento") ?? "").trim(),
        numero_de_colaboradores: String(fd.get("numero_de_colaboradores") ?? "").trim(),
      };

      const utmSource = params.get("utm_source") ?? "";
      const utmMedium = params.get("utm_medium") ?? "";
      const utmCampaign = params.get("utm_campaign") ?? "";
      // utm_term: se o anúncio não setou, usa fallback baseado na LP de
      // origem pra diferenciar leads de /contabil vs /contabil02 no
      // pipeline do CRM. Ad UTM tem prioridade — só preenche default
      // quando o param está ausente OU vazio.
      const pathname = typeof window !== "undefined" ? window.location.pathname : "";
      const defaultUtmTerm = pathname.startsWith("/contabil02")
        ? "contabil-v2"
        : pathname.startsWith("/contabil")
          ? "contabil-v1"
          : "";
      const urlUtmTerm = params.get("utm_term");
      const utmTerm = urlUtmTerm && urlUtmTerm.trim() ? urlUtmTerm : defaultUtmTerm;
      const utmContent = params.get("utm_content") ?? "";
      const fbclid = params.get("fbclid") ?? "";
      const gclid = params.get("gclid") ?? "";

      const payload = {
        form_slug: formSlug,
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
        },
        attribution: { fbclid, gclid },
        meta: {
          page_url: typeof window !== "undefined" ? window.location.href : "",
          referrer: typeof document !== "undefined" ? document.referrer : "",
          user_agent: typeof navigator !== "undefined" ? navigator.userAgent : "",
        },
        // Backwards-compat: mantém o shape antigo (top-level) caso algum
        // consumidor ainda dependa. A Edge Function ignora silenciosamente.
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
        utm_term: utmTerm,
        utm_content: utmContent,
        fbclid,
        gclid,
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
          ? body.missing.map((m: { label?: string }) => m.label).filter(Boolean).join(", ")
          : "";
        throw new Error(
          missing
            ? `Preencha os campos obrigatórios: ${missing}`
            : body?.error || `Falha no envio (HTTP ${res.status})`,
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

      clearLoadingStages();
      console.log("[form] redirecting");
      navigate({ to: thankYouPath, search: { eid: eventID } });
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Não conseguimos enviar agora. Tente novamente em alguns instantes.";

      console.error("[form] submit failed", message);
      trackClarity("event", "form_submit_error");
      trackClarity("set", "form_submit_error_message", message);

      clearLoadingStages();
      setLoadingMsg("");
      setError(message);
      setLoading(false);
    }
  }

  return (
    <div
      ref={cardRef}
      className="rounded-[24px] overflow-hidden relative"
      style={{
        backgroundColor: "oklch(0.995 0.003 110)",
        border: "1px solid oklch(0.88 0.02 115)",
        boxShadow:
          "0 30px 60px -25px oklch(0.18 0.02 122 / 0.18), 0 10px 25px -10px oklch(0.18 0.02 122 / 0.08)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[24px]"
        style={{ boxShadow: "inset 0 1px 0 oklch(1 0 0 / 0.9)" }}
      />

      <div className="px-6 pt-5 lg:px-7 lg:pt-6 relative">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p
              className="text-[10.5px] uppercase tracking-[0.16em] font-semibold"
              style={{ color: "oklch(0.5 0.015 115)" }}
            >
              Diagnóstico
            </p>
            <p
              className="mt-1 text-[16.5px] font-semibold tracking-tight"
              style={{ color: "oklch(0.18 0.02 122)" }}
            >
Conte sobre o seu escritório
            </p>
            <p
              className="mt-1 text-[12.5px] leading-relaxed"
              style={{ color: "oklch(0.45 0.015 115)" }}
            >
              Nossa equipe comercial retorna em até 24h.
            </p>
          </div>
          <span
            className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] font-semibold rounded-full px-2.5 py-1 shrink-0 select-none"
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
            Vagas abertas
          </span>
        </div>
      </div>

      <div className="px-6 pb-5 pt-4 lg:px-7 lg:pb-6 lg:pt-4 relative">
        <form
          onSubmit={handleSubmit}
          onFocusCapture={handleFocusCapture}
          onBlurCapture={(e) => {
            handleBlurCapture(e);
            handleFieldBlur(e);
          }}
          onInput={handleFormInput}
          onChange={handleFormInput}
          className="space-y-2"
          noValidate
        >
          <Field id="firstname" label="Nome Completo" required error={fieldErrors.firstname}>
            <input
              id="firstname"
              name="firstname"
              type="text"
              required
              autoComplete="name"
              placeholder="Seu nome completo"
              aria-invalid={!!fieldErrors.firstname}
              className="form-input"
            />
          </Field>

          <Field id="email" label="E-mail" required error={fieldErrors.email}>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="seu@email.com"
              aria-invalid={!!fieldErrors.email}
              className="form-input"
            />
          </Field>

          <Field id="phone" label="Telefone com DDD" required error={fieldErrors.phone}>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              placeholder="(11) 99999-9999"
              aria-invalid={!!fieldErrors.phone}
              className="form-input"
            />
          </Field>

          <Field id="company" label="Empresa" required error={fieldErrors.company}>
            <input
              id="company"
              name="company"
              type="text"
              required
              autoComplete="organization"
              placeholder="Nome da empresa"
              aria-invalid={!!fieldErrors.company}
              className="form-input"
            />
          </Field>

          <Field
            id="faixa_de_faturamento"
            label="Faturamento anual da empresa"
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
                Selecione a faixa de faturamento
              </option>
              {FAIXAS_FATURAMENTO.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </Field>

          <Field
            id="numero_de_colaboradores"
            label="Número de colaboradores (opcional)"
            error={fieldErrors.numero_de_colaboradores}
          >
            <select
              id="numero_de_colaboradores"
              name="numero_de_colaboradores"
              defaultValue=""
              aria-invalid={!!fieldErrors.numero_de_colaboradores}
              className="form-input"
            >
              <option value="">Selecione (opcional)</option>
              {COLABORADORES.map((c) => (
                <option key={c} value={c}>
                  {c}
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
            className="mt-1 w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[14px] font-bold transition-[transform,opacity,box-shadow] disabled:opacity-60 disabled:cursor-not-allowed hover:-translate-y-0.5"
            style={{
              backgroundColor: "oklch(0.18 0.02 122)",
              color: "oklch(1 0 0)",
              boxShadow:
                "0 1px 0 0 oklch(1 0 0 / 0.12) inset, 0 14px 32px -10px oklch(0 0 0 / 0.5)",
            }}
          >
            {loading ? loadingMsg || "Enviando..." : "Quero meu Diagnóstico Gratuito"}
            {!loading && <ArrowRight className="h-4 w-4" strokeWidth={2.5} />}
          </button>

          <p
            className="pt-2 text-[11.5px] text-center leading-relaxed"
            style={{ color: "oklch(0.55 0.015 115)" }}
          >
            Ao enviar, você autoriza contato por WhatsApp e email.
          </p>
        </form>
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
