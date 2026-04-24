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
  "CEO / Fundador(a) / Sócio(a)",
  "C-level (CFO, COO, CMO, CTO, CDO)",
  "Head ou Diretor(a) de área",
  "Líder de transformação ou inovação",
];

export function CTAFinal() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    // Placeholder: hook up to real endpoint / CRM
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  }

  return (
    <section
      id="cta-final"
      className="py-[120px] lg:py-[160px] relative overflow-hidden"
      style={{ background: "var(--gradient-cta)" }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, oklch(0.28 0.055 122 / 0.5) 0%, transparent 65%)",
        }}
      />

      <div className="container-page relative">
        <div className="grid lg:grid-cols-[6fr_5fr] gap-12 lg:gap-20 items-start max-w-[1120px] mx-auto">
          <div>
            <Reveal>
              <span className="label-chip">✱ Diagnóstico estratégico</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="h-display mt-6 text-[36px] sm:text-[44px] lg:text-[52px] text-foreground">
                Em 30 minutos,
                <br />a gente descobre se{" "}
                <span style={{ color: "var(--color-primary-glow)" }}>faz sentido seguir.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-8 text-[18px] text-sage leading-[1.6] max-w-[520px]">
                A conversa inicial é gratuita e conduzida pela Mari ou por um sócio-executor. Sem
                pitch. Sem deck de vendas. Você fala do seu contexto, a gente devolve se Business é
                pra você — e, se não for, indicamos o caminho.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <ul className="mt-10 space-y-4 text-[15px] text-sage">
                {[
                  {
                    icon: Clock,
                    text: "30 minutos, agenda enviada por e-mail em até 1 dia útil.",
                  },
                  {
                    icon: ShieldCheck,
                    text: "NDA pré-assinado antes de qualquer conversa aprofundada.",
                  },
                  {
                    icon: Lock,
                    text: "Vagas limitadas a 6 novas empresas por trimestre.",
                  },
                ].map((item) => (
                  <li key={item.text} className="flex items-start gap-3">
                    <item.icon
                      className="h-5 w-5 mt-[2px] text-primary-glow shrink-0"
                      strokeWidth={1.75}
                    />
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div
              className="rounded-xl border border-border bg-card p-8 lg:p-10"
              style={{ boxShadow: "var(--shadow-elevated)" }}
            >
              {submitted ? (
                <div className="text-center py-10">
                  <CheckCircle2 className="h-10 w-10 text-primary-glow mx-auto" strokeWidth={1.5} />
                  <h3 className="mt-6 text-[22px] font-semibold text-foreground">
                    Recebemos seu contato.
                  </h3>
                  <p className="mt-3 text-sage text-[15px] leading-[1.6] max-w-[360px] mx-auto">
                    Em até 1 dia útil, um sócio do time vai te mandar opções de horário por e-mail.
                    Enquanto isso, se quiser, dá uma olhada nos nossos cases.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <h3 className="text-[20px] font-semibold text-foreground">
                      Agendar diagnóstico
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      4 campos. Leva 40 segundos.
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs uppercase tracking-[0.12em] text-muted-foreground mb-2"
                    >
                      Nome
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Como prefere ser chamado(a)"
                      className="w-full rounded-md bg-background border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary-glow focus:ring-1 focus:ring-primary-glow/40 transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs uppercase tracking-[0.12em] text-muted-foreground mb-2"
                    >
                      E-mail corporativo
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="voce@suaempresa.com"
                      className="w-full rounded-md bg-background border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary-glow focus:ring-1 focus:ring-primary-glow/40 transition-colors"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="role"
                        className="block text-xs uppercase tracking-[0.12em] text-muted-foreground mb-2"
                      >
                        Seu papel
                      </label>
                      <select
                        id="role"
                        name="role"
                        required
                        defaultValue=""
                        className="w-full rounded-md bg-background border border-border px-4 py-3 text-foreground focus:outline-none focus:border-primary-glow focus:ring-1 focus:ring-primary-glow/40 transition-colors"
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
                    </div>

                    <div>
                      <label
                        htmlFor="size"
                        className="block text-xs uppercase tracking-[0.12em] text-muted-foreground mb-2"
                      >
                        Porte da empresa
                      </label>
                      <select
                        id="size"
                        name="size"
                        required
                        defaultValue=""
                        className="w-full rounded-md bg-background border border-border px-4 py-3 text-foreground focus:outline-none focus:border-primary-glow focus:ring-1 focus:ring-primary-glow/40 transition-colors"
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
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-primary text-primary-foreground font-semibold px-6 py-4 text-base hover:bg-primary-glow transition-colors disabled:opacity-60"
                  >
                    {loading ? "Enviando..." : "Agendar diagnóstico"}
                    {!loading && <ArrowRight className="h-4 w-4" />}
                  </button>

                  <p className="text-xs text-muted-foreground text-center leading-relaxed">
                    Ao enviar, você concorda em receber o convite de agenda por e-mail. Seus dados
                    não são compartilhados com terceiros.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
