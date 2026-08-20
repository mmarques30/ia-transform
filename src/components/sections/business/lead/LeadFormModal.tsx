import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AlertCircle, ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { OriginButton } from "@/components/ui/origin-button";
import { getMetaPixelCookies, getFbclidFromUrl } from "@/lib/metaCookies";

const FORM_ENDPOINT = "https://ciwdlceyjsnlnunktqzx.supabase.co/functions/v1/form-submit";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpd2RsY2V5anNubG51bmt0cXp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyMTU3OTksImV4cCI6MjA4OTc5MTc5OX0.tl-7gEObYBB7wDUS5_pKh9UyRlJQNdnWPiRpMFYrbUM";

const QUESTIONS: {
  field: string;
  section: string;
  label: string;
  options: string[];
}[] = [
  {
    field: "faixa_de_faturamento",
    section: "Sobre sua empresa",
    label: "Em qual etapa está sua empresa?",
    options: [
      "Menos de R$ 1 milhão",
      "Entre 1MM e 5MM",
      "Entre 5MM e 10MM",
      "Entre 10MM e 50MM",
      "Acima de 50MM",
    ],
  },
  {
    field: "equipe_repetitiva",
    section: "Sobre sua empresa",
    label: "Quantas pessoas da sua equipe fazem tarefas repetitivas que poderiam ser automatizadas?",
    options: [
      "Nenhuma, só eu",
      "1 a 3 pessoas",
      "4 a 10 pessoas",
      "Mais de 10 pessoas",
    ],
  },
  {
    field: "operacao_atual",
    section: "Sobre sua empresa",
    label: "Como sua operação funciona hoje?",
    options: [
      "Tudo em planilhas e WhatsApp",
      "Tenho sistema mas não uso direito",
      "Está estruturada mas dependo de mim para tudo funcionar",
      "Funciona bem e não preciso mudar nada",
    ],
  },
  {
    field: "cargo",
    section: "Sobre você",
    label: "Qual é o seu cargo?",
    options: [
      "Dono / Sócio",
      "CEO",
      "Diretor",
      "Gerente",
      "Coordenador",
      "Analista",
      "Assistente",
      "Outro",
    ],
  },
  {
    field: "perdeu_cliente",
    section: "Sobre você",
    label: "Você já perdeu cliente ou oportunidade por falta de processo?",
    options: [
      "Sim, acontece com frequência",
      "Sim, já aconteceu algumas vezes",
      "Raramente",
      "Não, nunca aconteceu",
    ],
  },
  {
    field: "gargalo",
    section: "Sobre você",
    label: "Qual é o seu maior gargalo hoje?",
    options: [
      "Operação desorganizada, tudo passa por mim",
      "Dependência de pessoas-chave na equipe",
      "Perda de informações entre setores",
      "Não consigo escalar sem contratar mais",
    ],
  },
  {
    field: "orcamento",
    section: "Intenção",
    label: "Você tem orçamento para investir em melhoria operacional este ano?",
    options: [
      "Sim, já está reservado",
      "Sim, se fizer sentido investir",
      "Ainda estou avaliando",
      "Não no momento",
    ],
  },
];

const TOTAL_STEPS = 1 + QUESTIONS.length;

const LOADING_STAGES = [
  { at: 0, text: "Enviando..." },
  { at: 600, text: "Validando seus dados..." },
  { at: 1800, text: "Criando seu acesso..." },
  { at: 3200, text: "Quase lá..." },
];

interface ModalCtx {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalCtx | null>(null);

export function useLeadModal() {
  return useContext(ModalContext);
}

export function LeadModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const lenis = (window as unknown as { lenis?: { stop: () => void; start: () => void } }).lenis;
    if (isOpen) {
      document.body.style.overflow = "hidden";
      lenis?.stop();
    } else {
      document.body.style.overflow = "";
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [isOpen]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
      {isOpen && <LeadModal onClose={closeModal} />}
    </ModalContext.Provider>
  );
}

function LeadModal({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();

  function handleSuccess(eventID: string) {
    onClose();
    navigate({ to: "/lead-obrigado", search: { eid: eventID } });
  }

  return (
    <div
      className="lead-modal-scroll fixed inset-0 z-[500] overflow-y-auto overscroll-contain"
      data-lenis-prevent
      style={{
        background: "rgba(0,0,0,0.72)",
        backdropFilter: "blur(6px)",
        WebkitOverflowScrolling: "touch",
      }}
    >
      <div
        className="flex min-h-full items-center justify-center p-5"
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <div
          className="relative w-full max-w-[540px] rounded-2xl overflow-hidden"
          style={{
            background: "#111310",
            border: "1px solid rgba(139,155,58,0.22)",
          }}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-1 z-10 transition-colors"
            style={{ color: "var(--text-muted, #8a8e82)" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-muted, #8a8e82)"; }}
          >
            <X className="h-5 w-5" />
          </button>

          <FormWizard onSuccess={handleSuccess} />
        </div>
      </div>
    </div>
  );
}

function FormWizard({ onSuccess }: { onSuccess: (eventID: string) => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [animKey, setAnimKey] = useState(0);
  const loadingTimers = useRef<number[]>([]);

  function clearTimers() {
    for (const t of loadingTimers.current) clearTimeout(t);
    loadingTimers.current = [];
  }
  function startTimers() {
    clearTimers();
    for (const s of LOADING_STAGES) {
      if (s.at === 0) setLoadingMsg(s.text);
      else loadingTimers.current.push(window.setTimeout(() => setLoadingMsg(s.text), s.at));
    }
  }
  useEffect(() => clearTimers, []);

  function goTo(s: number) {
    setAnimKey((k) => k + 1);
    setStep(s);
  }

  function validatePersonalData(): boolean {
    const errs: Record<string, string> = {};
    const name = (answers.firstname ?? "").trim();
    const email = (answers.email ?? "").trim();
    const phone = (answers.phone ?? "").trim();

    if (!name) errs.firstname = "Campo obrigatório";
    if (!email) errs.email = "Campo obrigatório";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "E-mail inválido";
    if (!phone) errs.phone = "Campo obrigatório";
    else if (phone.replace(/\D/g, "").length < 10) errs.phone = "Inclua DDD (min. 10 dígitos)";

    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handlePersonalContinue() {
    if (validatePersonalData()) goTo(1);
  }

  function handleOptionSelect(field: string, value: string) {
    setAnswers((p) => ({ ...p, [field]: value }));

    const questionIndex = step - 1;
    const isLast = questionIndex === QUESTIONS.length - 1;

    if (isLast) {
      setTimeout(() => submitForm({ ...answers, [field]: value }), 400);
    } else {
      setTimeout(() => goTo(step + 1), 400);
    }
  }

  async function submitForm(data: Record<string, string>) {
    setLoading(true);
    startTimers();
    setError(null);

    const eventID = `lead_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;

    try {
      const params = new URLSearchParams(window.location.search);
      const { fbp, fbc } = getMetaPixelCookies();

      const utmSource = params.get("utm_source") ?? "";
      const utmMedium = params.get("utm_medium") ?? "";
      const utmCampaign = params.get("utm_campaign") ?? "";
      const utmTerm = params.get("utm_term") ?? "";
      const utmContent = params.get("utm_content") ?? "";
      const fbclid = getFbclidFromUrl() ?? params.get("fbclid") ?? "";
      const gclid = params.get("gclid") ?? "";

      const fields: Record<string, string> = {
        firstname: (data.firstname ?? "").trim(),
        email: (data.email ?? "").trim(),
        phone: (data.phone ?? "").trim(),
      };
      for (const q of QUESTIONS) {
        fields[q.field] = (data[q.field] ?? "").trim();
      }

      const payload = {
        form_slug: "isca-business-gargalos",
        fields,
        utm: {
          source: utmSource,
          medium: utmMedium,
          campaign: utmCampaign,
          term: utmTerm,
          content: utmContent,
        },
        attribution: { fbclid, gclid, fbp, fbc },
        meta: {
          page_url: window.location.href,
          referrer: document.referrer,
          user_agent: navigator.userAgent,
        },
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
        utm_term: utmTerm,
        utm_content: utmContent,
        fbclid,
        gclid,
        event_id: eventID,
      };

      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || `Falha no envio (HTTP ${res.status})`);
      }

      type FbqFn = (a: "track", e: string, p?: Record<string, unknown>, o?: { eventID: string }) => void;
      const fbq = (window as unknown as { fbq?: FbqFn }).fbq;
      if (typeof fbq === "function") {
        try {
          fbq("track", "Lead", { content_name: "kit_automacao_ia", content_category: "lead_magnet" }, { eventID });
        } catch { /* in-app browser safety */ }
      }

      clearTimers();
      onSuccess(eventID);
    } catch (err) {
      clearTimers();
      setLoadingMsg("");
      setError(err instanceof Error ? err.message : "Não conseguimos enviar agora. Tente novamente.");
      setLoading(false);
    }
  }

  const progress = ((step + 1) / TOTAL_STEPS) * 100;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-8">
        <div className="relative h-12 w-12 mb-6">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              border: "2.5px solid rgba(139,155,58,0.15)",
            }}
          />
          <div
            className="absolute inset-0 rounded-full lead-spinner"
            style={{
              border: "2.5px solid transparent",
              borderTopColor: "var(--color-primary)",
            }}
          />
        </div>
        <p className="text-[14px] font-medium text-foreground">{loadingMsg}</p>
        {error && (
          <div
            role="alert"
            className="mt-4 flex items-start gap-2 rounded-md px-3 py-2.5 text-[12.5px] max-w-[360px]"
            style={{
              backgroundColor: "rgba(200,50,50,0.12)",
              border: "1px solid rgba(200,50,50,0.3)",
              color: "rgba(255,140,140,1)",
            }}
          >
            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" strokeWidth={2} />
            <span>{error}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Progress bar */}
      <div className="h-[3px] w-full" style={{ background: "rgba(255,255,255,0.06)" }}>
        <div
          className="h-full transition-all duration-500 ease-out"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg, #8b9b3a, #c8e040)",
          }}
        />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-5 pb-2">
        <div className="flex items-center gap-3">
          {step > 0 && (
            <button
              type="button"
              onClick={() => goTo(step - 1)}
              className="p-1.5 rounded-lg transition-colors"
              style={{ color: "var(--text-muted, #8a8e82)" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-muted, #8a8e82)"; e.currentTarget.style.background = "transparent"; }}
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={2} />
            </button>
          )}
        </div>
        <span
          className="text-[11px] font-medium tracking-[0.04em]"
          style={{ color: "var(--text-muted, #8a8e82)" }}
        >
          {step + 1} de {TOTAL_STEPS}
        </span>
      </div>

      {/* Step content */}
      <div
        key={animKey}
        className="lead-step-enter px-7 pb-8 pt-2"
        style={{ minHeight: 320 }}
      >
        {step === 0 ? (
          <PersonalDataStep
            answers={answers}
            fieldErrors={fieldErrors}
            onChange={(field, value) => {
              setAnswers((p) => ({ ...p, [field]: value }));
              if (fieldErrors[field]) {
                setFieldErrors((p) => { const n = { ...p }; delete n[field]; return n; });
              }
            }}
            onContinue={handlePersonalContinue}
          />
        ) : (
          <QuestionStep
            question={QUESTIONS[step - 1]}
            selected={answers[QUESTIONS[step - 1].field]}
            onSelect={(value) => handleOptionSelect(QUESTIONS[step - 1].field, value)}
          />
        )}

        {error && !loading && (
          <div
            role="alert"
            className="mt-4 flex items-start gap-2 rounded-md px-3 py-2.5 text-[12.5px]"
            style={{
              backgroundColor: "rgba(200,50,50,0.12)",
              border: "1px solid rgba(200,50,50,0.3)",
              color: "rgba(255,140,140,1)",
            }}
          >
            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" strokeWidth={2} />
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function PersonalDataStep({
  answers,
  fieldErrors,
  onChange,
  onContinue,
}: {
  answers: Record<string, string>;
  fieldErrors: Record<string, string>;
  onChange: (field: string, value: string) => void;
  onContinue: () => void;
}) {
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();
      onContinue();
    }
  }

  return (
    <div>
      <span
        className="text-[10px] font-semibold uppercase tracking-[0.14em] block mb-2"
        style={{ color: "var(--color-primary)" }}
      >
        Kit gratuito &#10038; Acesso imediato
      </span>
      <h3 className="text-[22px] font-bold tracking-[-0.02em] text-foreground mb-7">
        Para onde envio o kit?
      </h3>

      <div className="space-y-4" onKeyDown={handleKeyDown}>
        <WizardField label="Nome" error={fieldErrors.firstname}>
          <input
            type="text"
            autoComplete="name"
            placeholder="Seu nome completo"
            className="lead-input"
            value={answers.firstname ?? ""}
            onChange={(e) => onChange("firstname", e.target.value)}
            autoFocus
          />
        </WizardField>

        <WizardField label="E-mail" error={fieldErrors.email}>
          <input
            type="email"
            autoComplete="email"
            placeholder="seu@email.com"
            className="lead-input"
            value={answers.email ?? ""}
            onChange={(e) => onChange("email", e.target.value)}
          />
        </WizardField>

        <WizardField label="WhatsApp" error={fieldErrors.phone}>
          <input
            type="tel"
            autoComplete="tel"
            placeholder="(11) 99999-9999"
            className="lead-input"
            value={answers.phone ?? ""}
            onChange={(e) => onChange("phone", e.target.value)}
          />
        </WizardField>
      </div>

      <OriginButton
        type="button"
        onClick={onContinue}
        className="w-full mt-6 py-[17px] text-[13px] tracking-[0.09em]"
      >
        Continuar
        <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
      </OriginButton>

      <p
        className="text-[10px] text-center uppercase tracking-[0.06em] mt-3"
        style={{ color: "var(--text-muted, #8a8e82)" }}
      >
        Gratuito &#10038; Acesso imediato
      </p>
    </div>
  );
}

function QuestionStep({
  question,
  selected,
  onSelect,
}: {
  question: (typeof QUESTIONS)[number];
  selected: string | undefined;
  onSelect: (value: string) => void;
}) {
  return (
    <div>
      <span
        className="text-[10px] font-semibold uppercase tracking-[0.14em] block mb-2"
        style={{ color: "var(--color-primary)" }}
      >
        {question.section}
      </span>
      <h3 className="text-[20px] sm:text-[22px] font-bold tracking-[-0.02em] text-foreground mb-6 leading-[1.25]">
        {question.label}
      </h3>

      <div className="flex flex-col gap-2.5">
        {question.options.map((opt) => {
          const isSelected = selected === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onSelect(opt)}
              className="group flex items-center gap-3 w-full text-left rounded-xl px-4 py-3.5 transition-all duration-200"
              style={{
                background: isSelected
                  ? "rgba(139,155,58,0.12)"
                  : "rgba(255,255,255,0.03)",
                border: isSelected
                  ? "1.5px solid rgba(139,155,58,0.5)"
                  : "1.5px solid rgba(255,255,255,0.08)",
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = "rgba(139,155,58,0.3)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                }
              }}
            >
              <span
                className="flex items-center justify-center shrink-0 rounded-full transition-all duration-200"
                style={{
                  width: 22,
                  height: 22,
                  background: isSelected
                    ? "var(--color-primary)"
                    : "rgba(255,255,255,0.06)",
                  border: isSelected
                    ? "none"
                    : "1.5px solid rgba(255,255,255,0.12)",
                }}
              >
                {isSelected && <Check className="h-3.5 w-3.5" strokeWidth={3} style={{ color: "#0a0c07" }} />}
              </span>
              <span
                className="text-[14px] font-medium leading-[1.35]"
                style={{
                  color: isSelected ? "#fff" : "var(--text-sage, #c4c8bc)",
                }}
              >
                {opt}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function WizardField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        className="block text-[11px] font-semibold uppercase tracking-[0.07em] mb-1.5"
        style={{ color: "var(--text-muted, #8a8e82)" }}
      >
        {label} <span style={{ color: "var(--color-primary)" }}>*</span>
      </label>
      {children}
      {error && (
        <p className="mt-1 text-[11px] font-medium" style={{ color: "rgba(255,140,140,1)" }}>
          {error}
        </p>
      )}
    </div>
  );
}
