import { lazy, Suspense } from "react";
import { Reveal } from "@/components/Reveal";
import { OriginButton } from "@/components/ui/origin-button";
import { AlertCircle, Clock, Puzzle, Users } from "lucide-react";

const IAPLogo3D = lazy(() =>
  import("./IAPLogo3D").then((m) => ({ default: m.IAPLogo3D }))
);

interface LeadProblemProps {
  onOpenModal: () => void;
}

const PROBLEMS: { icon: typeof AlertCircle; title: string; text: string }[] = [
  { icon: AlertCircle, title: "Dependência total de você", text: "Cada decisão operacional passa por você. A empresa só avança quando você está presente." },
  { icon: Clock, title: "Tempo desperdiçado", text: "O time gasta horas em tarefas que deveriam ser automáticas, todo santo dia." },
  { icon: Puzzle, title: "IA sem encaixe", text: "Você experimenta ferramentas de IA, mas nada encaixa no processo real da operação." },
  { icon: Users, title: "Mais gente, mesmo gargalo", text: "Contratar mais gente resolve no curto prazo. E cria outro gargalo logo depois." },
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

          <div className="mt-14 lg:mt-16 grid lg:grid-cols-[320px_1fr] gap-10 lg:gap-20 items-center max-w-[1100px] mx-auto">
            <Reveal delay={0.08}>
              <div className="hidden lg:flex items-center justify-center">
                <Suspense fallback={null}>
                  <IAPLogo3D width={300} height={300} scale={1.5} />
                </Suspense>
              </div>
            </Reveal>

            <div className="grid sm:grid-cols-2 gap-5 lg:gap-5">
              {PROBLEMS.map((item, i) => {
                const Icon = item.icon;
                return (
                  <Reveal key={i} delay={0.1 + i * 0.06}>
                    <div
                      className="rounded-2xl p-6 lg:p-7 h-full"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(139,155,58,0.12)",
                      }}
                    >
                      <div
                        className="flex items-center justify-center rounded-full mb-4"
                        style={{
                          width: 48,
                          height: 48,
                          background: "rgba(139,155,58,0.12)",
                        }}
                      >
                        <Icon
                          className="h-5 w-5"
                          strokeWidth={1.5}
                          style={{ color: "var(--color-primary)" }}
                        />
                      </div>
                      <h3 className="font-bold text-[16px] lg:text-[17px] leading-tight text-foreground mb-2">
                        {item.title}
                      </h3>
                      <p
                        className="text-[13.5px] lg:text-[14px] leading-[1.6]"
                        style={{ color: "var(--text-sage, #a3a898)" }}
                      >
                        {item.text}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          <Reveal delay={0.4}>
            <p className="mt-14 text-center text-[18px] lg:text-[22px] leading-[1.35] max-w-[720px] mx-auto text-foreground">
              IA nao e hype. E a unica forma de{" "}
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
