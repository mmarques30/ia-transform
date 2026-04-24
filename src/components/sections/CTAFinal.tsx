import { useState, type FormEvent } from "react";
import { Reveal } from "@/components/Reveal";
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

export function CTAFinal() {
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
    <section
      id="cta-final"
      className="py-[90px] lg:py-[120px] relative overflow-hidden"
      style={{ background: "var(--gradient-cta)" }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, oklch(0.62 0.17 125 / 0.25) 0%, transparent 65%)",
        }}
      />

      <div className="container-page relative">
        <div className="grid lg:grid-cols-[6fr_5fr] gap-10 lg:gap-16 items-start max-w-[1080px] mx-auto">
          <div>
            <Reveal>
              <span
                className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] uppercase tracking-[0.14em] font-semibold"
                style={{
                  borderColor: "oklch(0.4 0.03 122)",
                  backgroundColor: "oklch(0.25 0.02 122 / 0.6)",
                  color: "oklch(0.82 0.18 118)",
                }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: "oklch(0.82 0.18 118)" }}
                />
                Diagnóstico
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="h-display mt-6 text-[36px] sm:text-[44px] lg:text-[52px] text-white">
                Em 30 minutos,
                <br />a gente descobre se{" "}
                <span style={{ color: "oklch(0.82 0.18 118)" }}>faz sentido.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p
                className="mt-6 text-[16px] leading-[1.6] max-w-[480px]"
                style={{ color: "oklch(0.75 0.02 110)" }}
              >
                Sem pitch. Sem deck. Você fala do contexto, a gente devolve se Business é pra você —
                ou indica o caminho.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <ul className="mt-8 space-y-3 text-[14px]" style={{ color: "oklch(0.78 0.02 110)" }}>
                {[
                  { icon: Clock, text: "30 min · agenda em 1 dia útil" },
                  { icon: ShieldCheck, text: "NDA assinado antes de aprofundar" },
                  { icon: Lock, text: "6 novas empresas por trimestre" },
                ].map((item) => (
                  <li key={item.text} className="flex items-center gap-2.5">
                    <item.icon
                      className="h-4 w-4 shrink-0"
                      style={{ color: "oklch(0.82 0.18 118)" }}
                      strokeWidth={2}
                    />
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div
              className="rounded-xl p-7 lg:p-8"
              style={{
                backgroundColor: "oklch(1 0 0)",
                boxShadow: "0 30px 60px -20px oklch(0 0 0 / 0.4)",
              }}
            >
              {submitted ? (
                <div className="text-center py-6">
                  <CheckCircle2
                    className="h-10 w-10 mx-auto"
                    style={{ color: "var(--color-primary)" }}
                    strokeWidth={1.5}
                  />
                  <h3 className="mt-5 text-[20px] font-semibold text-foreground">Recebemos.</h3>
                  <p className="mt-2 text-sage text-[14px] leading-[1.6] max-w-[320px] mx-auto">
                    Um sócio vai te mandar horários em até 1 dia útil.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <h3 className="text-[18px] font-semibold text-foreground">
                      Agendar diagnóstico
                    </h3>
                    <p className="mt-1 text-[13px] text-muted-foreground">4 campos. 40 segundos.</p>
                  </div>

                  <Field id="name" label="Nome" required>
                    <input
                      id="name"
                      type="text"
                      required
                      placeholder="Como prefere ser chamado(a)"
                      className="form-input"
                    />
                  </Field>

                  <Field id="email" label="E-mail corporativo" required>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="voce@suaempresa.com"
                      className="form-input"
                    />
                  </Field>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <Field id="role" label="Seu papel" required>
                      <select id="role" required defaultValue="" className="form-input">
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
                    <Field id="size" label="Porte" required>
                      <select id="size" required defaultValue="" className="form-input">
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

                  <p className="text-[11px] text-muted-foreground text-center leading-relaxed">
                    Seus dados não são compartilhados com terceiros.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        .form-input {
          width: 100%;
          border-radius: 8px;
          background-color: var(--color-background);
          border: 1px solid var(--color-border);
          padding: 10px 14px;
          color: var(--color-foreground);
          font-size: 14px;
          transition: border-color 0.15s ease;
        }
        .form-input:focus {
          outline: none;
          border-color: var(--color-primary);
        }
        .form-input::placeholder {
          color: var(--color-muted-foreground);
          opacity: 0.7;
        }
      `}</style>
    </section>
  );
}

function Field({
  id,
  label,
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
        className="block text-[11px] uppercase tracking-[0.14em] text-muted-foreground font-semibold mb-2"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
