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
const FORM_SLUG = "business";

/** Opções sincronizadas com form_fields do CRM (slug=business). */
const CARGOS = [
  "CEO / Fundador / Sócio",
  "Diretor / Head",
  "Gerente",
  "Coordenador / Supervisor",
  "Analista",
];

const FAIXAS = [
  "Menos de R$ 1 milhão",
  "Entre 1MM e 5MM",
  "Entre 5MM e 10MM",
  "Entre 10MM e 50MM",
  "Acima de 50MM",
];

const SETORES = [
  "Contabilidade",
  "Logística",
  "Marketing/Agência",
  "Consultoria",
  "Varejo",
  "Alimentação",
  "Beleza",
  "Eventos",
  "Outros",
];

/**
 * HeroForm — campos nativos React integrados ao design dark da LP.
 * Submete via POST JSON pra Edge Function form-submit da IAplicada,
 * usando o shape esperado pelo backend:
 *   { form_slug, fields: { firstname, email, phone, cargo, faixa_de_faturamento, ... } }
 *
 * UTMs capturadas de window.location.search e enviadas junto ao payload.
 * Em caso de sucesso, navega pra /thank-you-business.
 */
export function HeroForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;
    setError(null);
    setLoading(true);

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
        cargo: String(fd.get("cargo") ?? "").trim(),
        faixa_de_faturamento: String(fd.get("faixa_de_faturamento") ?? "").trim(),
        company: String(fd.get("company") ?? "").trim(),
        setor_do_mercado: String(fd.get("setor_do_mercado") ?? "").trim(),
      };

      const payload = {
        form_slug: FORM_SLUG,
        fields,
        utm_source: params.get("utm_source") ?? "",
        utm_medium: params.get("utm_medium") ?? "",
        utm_campaign: params.get("utm_campaign") ?? "",
        utm_term: params.get("utm_term") ?? "",
        utm_content: params.get("utm_content") ?? "",
        // Click IDs do Meta Ads e Google Ads — usados pra attribution e
        // pra Conversions API. A Edge Function persiste em raw_data.
        fbclid: params.get("fbclid") ?? "",
        gclid: params.get("gclid") ?? "",
        // Mesmo eventID que dispara no fbq client. Permite a Edge Function
        // mandar Conversions API com o mesmo ID se quiser deduplicar
        // server-side no futuro.
        event_id: eventID,
      };

      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
      } else {
        console.warn("[form] fbq not available — Pixel não disparado");
      }

      trackClarity("event", "form_submit_success");
      trackClarity("set", "lead_event_id", eventID);
      submitted.current = true;

      console.log("[form] redirecting");
      navigate({ to: "/thank-you-business", search: { eid: eventID } });
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Não conseguimos enviar agora. Tente novamente em alguns instantes.";

      console.error("[form] submit failed", message);
      trackClarity("event", "form_submit_error");
      trackClarity("set", "form_submit_error_message", message);

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

      <div className="px-7 pt-8 lg:px-9 lg:pt-10 relative">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p
              className="text-[11px] uppercase tracking-[0.16em] font-semibold"
              style={{ color: "oklch(0.5 0.015 115)" }}
            >
              Diagnóstico estratégico
            </p>
            <p
              className="mt-1.5 text-[18px] font-semibold tracking-tight"
              style={{ color: "oklch(0.18 0.02 122)" }}
            >
              Conversa de 30 min · gratuita
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

      <div className="px-7 pb-8 pt-6 lg:px-9 lg:pb-10 lg:pt-7 relative">
        <form
          onSubmit={handleSubmit}
          onFocusCapture={handleFocusCapture}
          onBlurCapture={handleBlurCapture}
          className="space-y-3.5"
          noValidate
        >
          <Field id="firstname" label="Nome completo" required>
            <input
              id="firstname"
              name="firstname"
              type="text"
              required
              autoComplete="name"
              placeholder="Seu nome completo"
              className="form-input"
            />
          </Field>

          <Field id="email" label="E-mail corporativo" required>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="voce@suaempresa.com"
              className="form-input"
            />
          </Field>

          <Field id="phone" label="Telefone com DDD" required>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              placeholder="(11) 99999-9999"
              className="form-input"
            />
          </Field>

          <div className="grid sm:grid-cols-2 gap-3">
            <Field id="cargo" label="Cargo" required>
              <select
                id="cargo"
                name="cargo"
                required
                defaultValue=""
                className="form-input"
              >
                <option value="" disabled>
                  Selecione
                </option>
                {CARGOS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>
            <Field id="faixa_de_faturamento" label="Faixa de faturamento" required>
              <select
                id="faixa_de_faturamento"
                name="faixa_de_faturamento"
                required
                defaultValue=""
                className="form-input"
              >
                <option value="" disabled>
                  Selecione
                </option>
                {FAIXAS.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field id="company" label="Empresa" required>
            <input
              id="company"
              name="company"
              type="text"
              required
              autoComplete="organization"
              placeholder="Nome da sua empresa"
              className="form-input"
            />
          </Field>

          <Field id="setor_do_mercado" label="Setor" required>
            <select
              id="setor_do_mercado"
              name="setor_do_mercado"
              required
              defaultValue=""
              className="form-input"
            >
              <option value="" disabled>
                Selecione
              </option>
              {SETORES.map((s) => (
                <option key={s} value={s}>
                  {s}
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
            disabled={loading}
            className="mt-2 w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 text-[14px] font-bold transition-[transform,opacity,box-shadow] disabled:opacity-60 disabled:cursor-not-allowed hover:-translate-y-0.5"
            style={{
              backgroundColor: "var(--color-accent)",
              color: "oklch(1 0 0)",
              boxShadow:
                "0 1px 0 0 oklch(1 0 0 / 0.12) inset, 0 14px 32px -10px oklch(0.18 0.02 122 / 0.45)",
            }}
          >
            {loading ? "Enviando..." : "Quero saber mais sobre o Business"}
            {!loading && <ArrowRight className="h-4 w-4" strokeWidth={2.5} />}
          </button>

          <p
            className="pt-3 text-[12.5px] text-center leading-relaxed"
            style={{ color: "oklch(0.45 0.015 115)" }}
          >
            Empresa menor?{" "}
            <a
              href="https://academy.iaplicada.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline underline-offset-2 hover:no-underline"
              style={{ color: "var(--color-primary)" }}
            >
              Conheça a Mentoria 1:1 IAplicada
            </a>
          </p>

          <p
            className="pt-1 text-[11.5px] text-center leading-relaxed"
            style={{ color: "oklch(0.55 0.015 115)" }}
          >
            Ao enviar, você concorda em receber comunicações da IAplicada.
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
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[12px] font-semibold mb-1.5"
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
    </div>
  );
}
