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
 * Lead form from the iaplicada.com/business hero — adapted to the premium
 * light palette. 6 fields: Nome, E-mail, Telefone, Cargo, Faturamento, Empresa.
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
      className="rounded-[28px] p-7 lg:p-9 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, oklch(0.62 0.17 125) 0%, oklch(0.54 0.15 125) 100%)",
        boxShadow: "var(--shadow-elevated)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[28px]"
        style={{ boxShadow: "inset 0 1px 0 oklch(1 0 0 / 0.25)" }}
      />

      {submitted ? (
        <div className="text-center py-12 relative">
          <CheckCircle2 className="h-12 w-12 mx-auto text-white" strokeWidth={1.5} />
          <h3 className="mt-6 text-[22px] font-semibold text-white">Recebemos seu contato.</h3>
          <p className="mt-2 text-white/80 text-[14px] leading-[1.6] max-w-[320px] mx-auto">
            Um sócio do time vai te mandar opções de horário em até 1 dia útil.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="relative space-y-4">
          <FormField id="name" label="Nome completo" required>
            <input
              id="name"
              type="text"
              required
              placeholder="Seu nome completo"
              className="form-input"
            />
          </FormField>

          <FormField id="email" label="E-mail" required>
            <input
              id="email"
              type="email"
              required
              placeholder="seu@email.com"
              className="form-input"
            />
          </FormField>

          <FormField id="phone" label="Telefone com DDD" required>
            <input
              id="phone"
              type="tel"
              required
              placeholder="(11) 99999-9999"
              className="form-input"
            />
          </FormField>

          <FormField id="role" label="Cargo" required>
            <select id="role" required defaultValue="" className="form-input">
              <option value="" disabled>
                Selecione...
              </option>
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </FormField>

          <FormField id="revenue" label="Faixa de Faturamento" required>
            <select id="revenue" required defaultValue="" className="form-input">
              <option value="" disabled>
                Selecione...
              </option>
              {REVENUE_BANDS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </FormField>

          <FormField id="company" label="Empresa">
            <input
              id="company"
              type="text"
              placeholder="Nome da sua empresa"
              className="form-input"
            />
          </FormField>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 text-[14px] font-bold transition-transform hover:-translate-y-0.5 disabled:opacity-60"
            style={{
              background:
                "linear-gradient(180deg, oklch(0.95 0.22 115) 0%, oklch(0.8 0.22 118) 100%)",
              color: "oklch(0.14 0.02 122)",
              boxShadow: "0 10px 30px oklch(0.85 0.22 115 / 0.45)",
            }}
          >
            {loading ? "Enviando..." : "Quero saber mais sobre o Business"}
            {!loading && <ArrowRight className="h-4 w-4" />}
          </button>
        </form>
      )}
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
      <label htmlFor={id} className="block text-[13px] font-semibold text-white mb-1.5">
        {label} {required && <span className="text-white/70">*</span>}
      </label>
      {children}
    </div>
  );
}
