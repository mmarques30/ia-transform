import { Reveal } from "@/components/Reveal";
import { OriginButton } from "@/components/ui/origin-button";
import { AlertCircle, Clock, Puzzle, Users } from "lucide-react";

interface LeadProblemProps {
  onOpenModal: () => void;
}

const PROBLEMS: { icon: typeof AlertCircle; text: string }[] = [
  { icon: AlertCircle, text: "Cada decisao operacional passa por voce — a empresa so avanca quando voce esta" },
  { icon: Clock, text: "O time gasta horas em tarefas que deveriam ser automaticas" },
  { icon: Puzzle, text: "Voce experimenta ferramentas de IA, mas nada encaixa no processo real" },
  { icon: Users, text: "Contratar mais gente resolve no curto prazo — e cria outro gargalo" },
];

export function LeadProblem({ onOpenModal }: LeadProblemProps) {
  return (
    <section id="lead-section2" className="relative">
      <div className="section-veil w-full py-[72px] lg:py-[110px]">
        <div className="relative z-10 container-page">
          <Reveal>
            <h2
              className="text-center font-extrabold text-[24px] sm:text-[32px] lg:text-[38px] leading-[1.15] tracking-[-0.02em] max-w-[880px] mx-auto uppercase"
              style={{ textWrap: "balance", color: "var(--color-primary)" }}
            >
              Sua empresa esta{" "}
              <span className="text-foreground">refem da sua presenca.</span>
              <br className="hidden sm:block" /> E contratar mais gente{" "}
              <span className="text-foreground">nao resolve.</span>
            </h2>
          </Reveal>

          <div className="mt-14 lg:mt-16 grid sm:grid-cols-2 gap-4 lg:gap-5 max-w-[820px] mx-auto">
            {PROBLEMS.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={i} delay={0.1 + i * 0.06}>
                  <div
                    className="p-6"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(139,155,58,0.12)",
                    }}
                  >
                    <Icon
                      className="h-5 w-5 mb-3"
                      strokeWidth={1.5}
                      style={{ color: "var(--color-primary)" }}
                    />
                    <p className="text-[14px] lg:text-[14.5px] leading-[1.55] text-foreground">
                      {item.text}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.4}>
            <p className="mt-14 text-center text-[18px] lg:text-[22px] leading-[1.35] max-w-[720px] mx-auto text-foreground">
              IA nao e hype — e a unica forma de{" "}
              <strong style={{ color: "var(--color-primary)" }} className="font-extrabold">
                escalar sem inflar a folha.
              </strong>{" "}
              E este kit mostra como comecar.
            </p>
          </Reveal>

          <Reveal delay={0.45}>
            <div className="mt-8 text-center">
              <OriginButton onClick={onOpenModal}>
                Quero o kit gratuito &rarr;
              </OriginButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
