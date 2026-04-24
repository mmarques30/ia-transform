import { Reveal } from "@/components/Reveal";
import { Linkedin, Instagram, Youtube } from "lucide-react";

const NUMBERS = [
  { v: "+80", l: "empresas atendidas" },
  { v: "+2.000", l: "profissionais formados" },
  { v: "3 anos", l: "construindo IAplicada" },
  { v: "100%", l: "projetos com métrica mensurável" },
];

export function Authority() {
  return (
    <section
      id="time"
      className="py-[120px] lg:py-[160px]"
      style={{ backgroundColor: "var(--color-surface)" }}
    >
      <div className="container-page">
        <div className="grid lg:grid-cols-[5fr_7fr] gap-12 lg:gap-16 items-start">
          <Reveal>
            <div className="aspect-[4/5] w-full rounded-lg border border-border overflow-hidden bg-card relative">
              {/* Placeholder portrait */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at 50% 40%, oklch(0.305 0.038 122) 0%, oklch(0.193 0.039 122) 70%)",
                }}
              />
              <div className="absolute inset-0 flex items-end p-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-primary-glow">Fundadora</p>
                  <p className="mt-1 text-foreground font-semibold text-lg">Mariana Marques</p>
                </div>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <span className="label-chip">✱ Quem lidera</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="h-display mt-6 text-[36px] sm:text-[42px] text-foreground">
                Mariana Marques.
                <br />E uma rede de especialistas.
              </h2>
            </Reveal>

            <div className="mt-8 space-y-5 text-sage text-[17px] leading-[1.6]">
              <Reveal delay={0.1}>
                <p>
                  Fundei a IAplicada porque cansei de ver boas empresas presas em pilotos de IA que
                  nunca viraram operação. Há 3 anos, a gente ajuda equipes a sair da experimentação
                  e chegar na implementação que sustenta.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <p>
                  Atendemos empresas como Natura, Ambev, Magazine Luiza e dezenas de médias em
                  setores que vão de varejo a indústria. E formei mais de 2.000 profissionais no
                  Academy. Business é onde aplicamos tudo isso na escala de quem precisa mudar a
                  operação inteira, não só a rotina pessoal.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p>
                  Não trabalho sozinha. Business é conduzido por um time de especialistas em
                  implementação, automação e liderança de IA, curado e treinado por mim. Cada
                  projeto é acompanhado de ponta a ponta.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.25}>
              <div className="mt-8 flex gap-5">
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  aria-label="Instagram"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  aria-label="YouTube"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8 border-t border-border pt-12">
            {NUMBERS.map((n) => (
              <div key={n.l}>
                <div
                  className="num-display text-[44px] lg:text-[56px] leading-none"
                  style={{ color: "var(--color-primary-glow)" }}
                >
                  {n.v}
                </div>
                <p className="mt-3 text-sm text-muted-foreground max-w-[180px]">{n.l}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
