import { useState, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, AlertCircle } from "lucide-react";

const FORM_ENDPOINT = "https://ciwdlceyjsnlnunktqzx.supabase.co/functions/v1/form-submit";
const FORM_SLUG = "business";

const CARGOS = [
  "CEO / Fundador(a)",
  "Sócio(a)",
  "C-level (CFO, COO, CMO)",
  "Head / Diretor(a)",
  "Coordenador(a)",
  "Outro",
];

const FAIXAS = [
  "Até R$ 1M/ano",
  "R$ 1M a R$ 5M/ano",
  "R$ 5M a R$ 20M/ano",
  "R$ 20M a R$ 50M/ano",
  "Acima de R$ 50M/ano",
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

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;
    setError(null);
    setLoading(true);

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
        website: String(fd.get("website") ?? "").trim(),
      };

      const payload = {
        form_slug: FORM_SLUG,
        fields,
        utm_source: params.get("utm_source") ?? "",
        utm_medium: params.get("utm_medium") ?? "",
        utm_campaign: params.get("utm_campaign") ?? "",
        utm_term: params.get("utm_term") ?? "",
        utm_content: params.get("utm_content") ?? "",
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

      navigate({ to: "/thank-you-business" });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Não conseguimos enviar agora. Tente novamente em alguns instantes.",
      );
      setLoading(false);
    }
  }

  return (
    <div
      className="rounded-[24px] overflow-hidden relative"
      style={{
        backgroundColor: "var(--color-accent)",
        border: "1px solid oklch(0.3 0.025 122)",
        boxShadow:
          "0 40px 80px -30px oklch(0 0 0 / 0.55), 0 10px 25px -8px oklch(0.18 0.02 122 / 0.25)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[24px]"
        style={{ boxShadow: "inset 0 1px 0 oklch(1 0 0 / 0.08)" }}
      />

      <div className="px-7 pt-8 lg:px-9 lg:pt-10 relative">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p
              className="text-[11px] uppercase tracking-[0.16em] font-semibold"
              style={{ color: "oklch(0.65 0.015 115)" }}
            >
              Diagnóstico estratégico
            </p>
            <p className="mt-1.5 text-[18px] font-semibold text-white tracking-tight">
              Conversa de 30 min · gratuita
            </p>
          </div>
          <span
            className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] font-semibold rounded-full px-2.5 py-1 shrink-0"
            style={{
              backgroundColor: "oklch(1 0 0 / 0.08)",
              color: "oklch(0.85 0.04 110)",
              border: "1px solid oklch(1 0 0 / 0.1)",
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: "oklch(0.82 0.2 115)" }}
            />
            Vagas abertas
          </span>
        </div>
      </div>

      <div className="px-7 pb-8 pt-6 lg:px-9 lg:pb-10 lg:pt-7 relative">
        <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
          <Field id="firstname" label="Nome completo" required>
            <input
              id="firstname"
              name="firstname"
              type="text"
              required
              autoComplete="name"
              placeholder="Seu nome completo"
              className="form-input-dark"
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
              className="form-input-dark"
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
              className="form-input-dark"
            />
          </Field>

          <div className="grid sm:grid-cols-2 gap-3">
            <Field id="cargo" label="Cargo" required>
              <select
                id="cargo"
                name="cargo"
                required
                defaultValue=""
                className="form-input-dark"
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
                className="form-input-dark"
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

          <Field id="company" label="Empresa">
            <input
              id="company"
              name="company"
              type="text"
              autoComplete="organization"
              placeholder="Nome da sua empresa"
              className="form-input-dark"
            />
          </Field>

          <Field id="website" label="Site da empresa">
            <input
              id="website"
              name="website"
              type="url"
              autoComplete="url"
              placeholder="https://suaempresa.com"
              className="form-input-dark"
            />
          </Field>

          {error && (
            <div
              role="alert"
              className="flex items-start gap-2 rounded-md px-3 py-2.5 text-[12.5px]"
              style={{
                backgroundColor: "oklch(0.32 0.13 25 / 0.3)",
                border: "1px solid oklch(0.55 0.18 25 / 0.5)",
                color: "oklch(0.92 0.06 25)",
              }}
            >
              <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" strokeWidth={2} />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 text-[14px] font-bold transition-all disabled:opacity-60 disabled:cursor-not-allowed hover:-translate-y-0.5"
            style={{
              backgroundColor: "oklch(1 0 0)",
              color: "oklch(0.14 0.02 122)",
              boxShadow: "0 8px 24px -8px oklch(1 0 0 / 0.3)",
            }}
          >
            {loading ? "Enviando..." : "Quero saber mais sobre o Business"}
            {!loading && <ArrowRight className="h-4 w-4" strokeWidth={2.5} />}
          </button>

          <p
            className="pt-2 text-[11.5px] text-center leading-relaxed"
            style={{ color: "oklch(0.65 0.015 115)" }}
          >
            Seus dados não são compartilhados. Sem SPAM. Cancele a qualquer momento.
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
        style={{ color: "oklch(0.85 0.02 110)" }}
      >
        {label}
        {required && (
          <span className="ml-1" style={{ color: "oklch(0.82 0.2 115)" }}>
            ·
          </span>
        )}
      </label>
      {children}
    </div>
  );
}
