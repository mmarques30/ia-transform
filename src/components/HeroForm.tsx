import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, ShieldCheck, Clock, Lock } from "lucide-react";

const COMPANY_SIZES = [
  "50 a 200 colaboradores",
  "200 a 500 colaboradores",
  "500 a 2.000 colaboradores",
  "+2.000 colaboradores",
];

const ROLES = [
  "CEO / Fundador(a)",
  "C-level (CFO, COO, CMO, CTO, CDO)",
  "Head ou Diretor(a) de área",
  "Líder de transformação",
];

interface HeroFormProps {
  /** Compact mode used when embedded in secondary CTAs. */
  compact?: boolean;
}

export function HeroForm({ compact = false }: HeroFormProps) {
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
      className="rounded-2xl border border-border bg-card overflow-hidden"
      style={{ boxShadow: "var(--shadow-elevated)" }}
    >
      {/* Header strip */}
      <div
        className="px-7 py-5 border-b border-border flex items-center justify-between"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <div>
          <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground font-semibold">
            Diagnóstico estratégico
          </p>
          <p className="mt-1 text-[16px] font-semibold text-foreground">
            Conversa de 30 min · gratuita
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: "var(--color-primary)" }}
          />
          Vagas abertas
        </div>
      </div>

      {/* Body */}
      <div className={compact ? "p-6" : "p-7 lg:p-8"}>
        {submitted ? (
          <div className="text-center py-10">
            <CheckCircle2
              className="h-10 w-10 mx-auto"
              style={{ color: "var(--color-primary)" }}
              strokeWidth={1.5}
            />
            <h3 className="mt-5 text-[20px] font-semibold text-foreground">
              Recebemos seu contato.
            </h3>
            <p className="mt-2 text-sage text-[14px] leading-[1.6] max-w-[320px] mx-auto">
              Um sócio do time vai te mandar opções de horário em até 1 dia útil.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Field id={`${compact ? "c-" : ""}name`} label="Nome">
              <input
                id={`${compact ? "c-" : ""}name`}
                type="text"
                required
                placeholder="Como prefere ser chamado(a)"
                className="form-input"
              />
            </Field>

            <Field id={`${compact ? "c-" : ""}email`} label="E-mail corporativo">
              <input
                id={`${compact ? "c-" : ""}email`}
                type="email"
                required
                placeholder="voce@suaempresa.com"
                className="form-input"
              />
            </Field>

            <div className="grid sm:grid-cols-2 gap-3">
              <Field id={`${compact ? "c-" : ""}role`} label="Seu papel">
                <select
                  id={`${compact ? "c-" : ""}role`}
                  required
                  defaultValue=""
                  className="form-input"
                >
                  <option value="" disabled>
                    Selecione
                  </option>
                  {ROLES.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </Field>
              <Field id={`${compact ? "c-" : ""}size`} label="Porte">
                <select
                  id={`${compact ? "c-" : ""}size`}
                  required
                  defaultValue=""
                  className="form-input"
                >
                  <option value="" disabled>
                    Selecione
                  </option>
                  {COMPANY_SIZES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-accent text-accent-foreground font-semibold px-6 py-3.5 text-[14px] hover:bg-primary hover:text-primary-foreground transition-colors disabled:opacity-60"
            >
              {loading ? "Enviando..." : "Agendar diagnóstico"}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </button>

            <div className="pt-3 flex flex-col sm:flex-row sm:items-center gap-x-5 gap-y-2 text-[11px] text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3 w-3" strokeWidth={2} /> 30 min
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3 w-3" strokeWidth={2} /> NDA
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Lock className="h-3 w-3" strokeWidth={2} /> 6 vagas/trimestre
              </span>
            </div>
          </form>
        )}
      </div>

    </div>
  );
}

function Field({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[11px] uppercase tracking-[0.14em] text-muted-foreground font-semibold mb-2"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
