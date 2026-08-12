import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type FocusEvent,
  type ReactNode,
} from "react";
import { AlertCircle, ArrowRight, CheckCircle2, X } from "lucide-react";
import { OriginButton } from "@/components/ui/origin-button";
import { getMetaPixelCookies, getFbclidFromUrl } from "@/lib/metaCookies";

const FORM_ENDPOINT = "https://ciwdlceyjsnlnunktqzx.supabase.co/functions/v1/form-submit";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpd2RsY2V5anNubG51bmt0cXp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyMTU3OTksImV4cCI6MjA4OTc5MTc5OX0.tl-7gEObYBB7wDUS5_pKh9UyRlJQNdnWPiRpMFYrbUM";

const KIT_LINK = "[LINK_DO_KIT]";

const ETAPAS = [
  { value: "ate500k", label: "Faturamento ate R$ 500 mil / ano" },
  { value: "500k-1m", label: "R$ 500 mil – R$ 1 milhao / ano" },
  { value: "1m-5m", label: "R$ 1 milhao – R$ 5 milhoes / ano" },
  { value: "acima5m", label: "Acima de R$ 5 milhoes / ano" },
];

const GARGALOS = [
  { value: "operacao", label: "Operacao desorganizada — tudo passa por mim" },
  { value: "pessoas", label: "Dependencia de pessoas-chave na equipe" },
  { value: "informacao", label: "Perda de informacoes entre setores" },
  { value: "escala", label: "Nao consigo escalar sem contratar mais" },
];

const LOADING_STAGES = [
  { at: 0, text: "Enviando..." },
  { at: 600, text: "Validando seus dados..." },
  { at: 1800, text: "Criando seu acesso..." },
  { at: 3200, text: "Quase la..." },
];

const REQUIRED_FIELDS = ["firstname", "email", "phone", "etapa", "gargalo"] as const;

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
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
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
  const [submitted, setSubmitted] = useState(false);

  return (
    <div
      className="fixed inset-0 z-[500] flex items-center justify-center p-5"
      style={{
        background: "rgba(0,0,0,0.72)",
        backdropFilter: "blur(6px)",
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative w-full max-w-[520px] max-h-[92vh] overflow-y-auto"
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

        {submitted ? <SuccessState /> : <FormState onSuccess={() => setSubmitted(true)} />}
      </div>
    </div>
  );
}

function FormState({ onSuccess }: { onSuccess: () => void }) {
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [allFilled, setAllFilled] = useState(false);
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

  function validateField(name: string, value: string): string {
    const v = value.trim();
    if ((REQUIRED_FIELDS as readonly string[]).includes(name) && !v) return "Campo obrigatorio";
    if (name === "email" && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "E-mail invalido";
    if (name === "phone" && v && v.replace(/\D/g, "").length < 10) return "Inclua DDD (min. 10 digitos)";
    return "";
  }

  function allHaveValue(form: HTMLFormElement) {
    const fd = new FormData(form);
    for (const name of REQUIRED_FIELDS) {
      if (!String(fd.get(name) ?? "").trim()) return false;
    }
    return true;
  }

  function handleInput(e: React.FormEvent<HTMLFormElement>) {
    const t = e.target as unknown as HTMLInputElement | HTMLSelectElement | null;
    if (t?.name && fieldErrors[t.name]) {
      setFieldErrors((p) => { const n = { ...p }; delete n[t.name]; return n; });
    }
    setAllFilled(allHaveValue(e.currentTarget));
  }

  function handleBlur(e: FocusEvent<HTMLFormElement>) {
    const t = e.target as unknown as HTMLInputElement | HTMLSelectElement | null;
    if (!t?.name) return;
    const err = validateField(t.name, t.value);
    setFieldErrors((p) => {
      const n = { ...p };
      if (err) n[t.name] = err; else delete n[t.name];
      return n;
    });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;
    setError(null);

    const form = e.currentTarget;
    const fd = new FormData(form);
    for (const name of REQUIRED_FIELDS) {
      const err = validateField(name, String(fd.get(name) ?? ""));
      if (err) {
        setFieldErrors((p) => ({ ...p, [name]: err }));
        (form.elements.namedItem(name) as HTMLElement | null)?.focus();
        return;
      }
    }

    setLoading(true);
    startTimers();

    const eventID = `lead_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;

    try {
      const params = new URLSearchParams(window.location.search);
      const { fbp, fbc } = getMetaPixelCookies();

      const payload = {
        form_slug: "lead",
        fields: {
          firstname: String(fd.get("firstname") ?? "").trim(),
          email: String(fd.get("email") ?? "").trim(),
          phone: String(fd.get("phone") ?? "").trim(),
          etapa: String(fd.get("etapa") ?? "").trim(),
          gargalo: String(fd.get("gargalo") ?? "").trim(),
        },
        utm: {
          source: params.get("utm_source") ?? "",
          medium: params.get("utm_medium") ?? "",
          campaign: params.get("utm_campaign") ?? "",
          term: params.get("utm_term") ?? "",
          content: params.get("utm_content") ?? "",
        },
        attribution: {
          fbclid: getFbclidFromUrl() ?? params.get("fbclid") ?? "",
          gclid: params.get("gclid") ?? "",
          fbp, fbc,
        },
        meta: {
          page_url: window.location.href,
          referrer: document.referrer,
          user_agent: navigator.userAgent,
        },
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
      onSuccess();
    } catch (err) {
      clearTimers();
      setLoadingMsg("");
      setError(err instanceof Error ? err.message : "Nao conseguimos enviar agora. Tente novamente.");
      setLoading(false);
    }
  }

  return (
    <>
      <div
        className="px-8 pt-8 pb-5"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      >
        <span
          className="text-[10px] font-semibold uppercase tracking-[0.14em] block mb-1.5"
          style={{ color: "var(--color-primary)" }}
        >
          Kit gratuito &#10038; Acesso imediato
        </span>
        <h3 className="text-[21px] font-bold tracking-[-0.02em] text-foreground">
          Para onde envio o kit?
        </h3>
      </div>

      <div className="px-8 pt-6 pb-8">
        <form
          onSubmit={handleSubmit}
          onInput={handleInput}
          onChange={handleInput}
          onBlurCapture={handleBlur}
          noValidate
          className="space-y-4"
        >
          <p
            className="text-[10px] font-semibold uppercase tracking-[0.12em] mb-4"
            style={{ color: "var(--color-primary)" }}
          >
            Seus dados
          </p>

          <ModalField id="firstname" label="Nome" error={fieldErrors.firstname}>
            <input id="firstname" name="firstname" type="text" required autoComplete="name" placeholder="Seu nome completo" className="lead-input" />
          </ModalField>

          <ModalField id="email" label="E-mail" error={fieldErrors.email}>
            <input id="email" name="email" type="email" required autoComplete="email" placeholder="seu@email.com" className="lead-input" />
          </ModalField>

          <ModalField id="phone" label="WhatsApp" error={fieldErrors.phone}>
            <input id="phone" name="phone" type="tel" required autoComplete="tel" placeholder="(11) 99999-9999" className="lead-input" />
          </ModalField>

          <div className="my-5" style={{ height: 1, background: "rgba(255,255,255,0.07)" }} />

          <p
            className="text-[10px] font-semibold uppercase tracking-[0.12em] mb-4"
            style={{ color: "var(--color-primary)" }}
          >
            Sobre sua empresa
          </p>

          <ModalField id="etapa" label="Em qual etapa esta sua empresa?" error={fieldErrors.etapa}>
            <select id="etapa" name="etapa" required defaultValue="" className="lead-input">
              <option value="" disabled>Selecione</option>
              {ETAPAS.map((e) => <option key={e.value} value={e.value}>{e.label}</option>)}
            </select>
          </ModalField>

          <ModalField id="gargalo" label="Qual e o seu maior gargalo hoje?" error={fieldErrors.gargalo}>
            <select id="gargalo" name="gargalo" required defaultValue="" className="lead-input">
              <option value="" disabled>Selecione</option>
              {GARGALOS.map((g) => <option key={g.value} value={g.value}>{g.label}</option>)}
            </select>
          </ModalField>

          {error && (
            <div
              role="alert"
              className="flex items-start gap-2 rounded-md px-3 py-2.5 text-[12.5px]"
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

          <OriginButton
            type="submit"
            disabled={loading || !allFilled}
            loading={loading}
            className="w-full mt-2 rounded-none py-[17px] text-[13px] tracking-[0.09em]"
          >
            {loading ? loadingMsg || "Enviando..." : (
              <>
                Quero o kit completo
                <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
              </>
            )}
          </OriginButton>

          <p className="text-[11px] text-center leading-relaxed" style={{ color: "var(--text-muted, #8a8e82)" }}>
            Ao enviar, voce autoriza contato por e-mail e WhatsApp.
            <br />
            Sem spam. Cancele quando quiser.
          </p>
        </form>
      </div>
    </>
  );
}

function SuccessState() {
  return (
    <div className="text-center px-8 py-14">
      <span
        className="inline-flex h-14 w-14 items-center justify-center rounded-full mx-auto mb-6"
        style={{
          backgroundColor: "rgba(139,155,58,0.12)",
          border: "1px solid rgba(139,155,58,0.35)",
        }}
      >
        <CheckCircle2 className="h-7 w-7" strokeWidth={2} style={{ color: "var(--color-primary)" }} />
      </span>

      <h3 className="text-[21px] font-bold text-foreground">Kit enviado!</h3>
      <p className="mt-3 text-[14px] leading-[1.75]" style={{ color: "var(--text-sage, #c4c8bc)" }}>
        O link chegou no seu e-mail e WhatsApp.
        <br />
        Acesse agora pelo botao abaixo.
      </p>

      <a
        href={KIT_LINK}
        target="_blank"
        rel="noopener"
        className="mt-8 inline-flex items-center gap-2.5 px-7 py-4 font-bold text-[13px] uppercase tracking-[0.08em] transition-colors"
        style={{
          background: "var(--color-primary)",
          color: "#fff",
        }}
      >
        Acessar o kit completo
        <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
      </a>
    </div>
  );
}

function ModalField({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
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
