import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const REVENUE_BANDS = [
  "Até R$ 1M/ano",
  "R$ 1M a R$ 5M/ano",
  "R$ 5M a R$ 20M/ano",
  "R$ 20M a R$ 50M/ano",
  "Acima de R$ 50M/ano",
];

const ROLES = [
  "CEO / Fundador(a)",
  "Sócio(a)",
  "C-level (CFO, COO, CMO)",
  "Head ou Diretor(a)",
  "Líder de transformação",
];

/**
 * Premium B2B lead form — white card with subtle olive top accent strip,
 * neutral inputs, charcoal submit button. Pulled back from the saturated
 * lime/olive of the legacy LP for a more refined Stripe/Vanta feel.
 */
export function HeroForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
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
      {/* Inner highlight (1px top) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[24px]"
        style={{
          boxShadow: "inset 0 1px 0 oklch(1 0 0 / 0.08)",
        }}
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
        {submitted ? (
          <div className="text-center py-10">
            <CheckCircle2
              className="h-11 w-11 mx-auto"
              style={{ color: "oklch(0.82 0.2 115)" }}
              strokeWidth={1.5}
            />
            <h3 className="mt-5 text-[20px] font-semibold text-white">Recebemos seu contato.</h3>
            <p
              className="mt-2 text-[14px] leading-[1.6] max-w-[320px] mx-auto"
              style={{ color: "oklch(0.72 0.02 115)" }}
            >
              Um sócio do time vai te mandar opções de horário em até 1 dia útil.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <FormField id="name" label="Nome completo" required>
              <input
                id="name"
                type="text"
                required
                placeholder="Seu nome completo"
                className="form-input-dark"
              />
            </FormField>

            <FormField id="email" label="E-mail corporativo" required>
              <input
                id="email"
                type="email"
                required
                placeholder="voce@suaempresa.com"
                className="form-input-dark"
              />
            </FormField>

            <FormField id="phone" label="Telefone com DDD" required>
              <input
                id="phone"
                type="tel"
                required
                placeholder="(11) 99999-9999"
                className="form-input-dark"
              />
            </FormField>

            <div className="grid sm:grid-cols-2 gap-3">
              <FormField id="role" label="Cargo" required>
                <select id="role" required defaultValue="" className="form-input-dark">
                  <option value="" disabled>
                    Selecione
                  </option>
                  {ROLES.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </FormField>
              <FormField id="revenue" label="Faturamento" required>
                <select id="revenue" required defaultValue="" className="form-input-dark">
                  <option value="" disabled>
                    Selecione
                  </option>
                  {REVENUE_BANDS.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </FormField>
            </div>

            <FormField id="company" label="Empresa">
              <input
                id="company"
                type="text"
                placeholder="Nome da sua empresa"
                className="form-input-dark"
              />
            </FormField>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 text-[14px] font-bold transition-all disabled:opacity-60 hover:-translate-y-0.5"
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
        )}
      </div>
    </div>
  );
}

function FormField({
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
