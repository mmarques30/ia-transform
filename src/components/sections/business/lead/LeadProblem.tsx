import { lazy, Suspense } from "react";
import { Reveal } from "@/components/Reveal";

const IAPLogo3D = lazy(() =>
  import("./IAPLogo3D").then((m) => ({ default: m.IAPLogo3D }))
);

interface LeadProblemProps {
  onOpenModal: () => void;
}

const COL_LEFT = [
  "Cada decisao operacional passa por voce — a empresa so avanca quando voce esta",
  "O time gasta horas em tarefas que deveriam ser automaticas",
  "Voce sabe que a solucao existe, mas nao tem tempo pra implementar",
];

const COL_RIGHT = [
  "Voce experimenta ferramentas de IA, mas nada encaixa no processo real",
  "Contratar mais gente resolve no curto prazo — e cria outro gargalo",
  "Sem processo claro, cada novo cliente e mais caos na operacao",
];

export function LeadProblem({ onOpenModal }: LeadProblemProps) {
  return (
    <section id="lead-section2" className="relative">
      <div className="section-veil w-full py-[72px] lg:py-[110px]">
        <div className="relative z-10 container-page">
          <div className="lg:grid lg:grid-cols-[200px_1fr] lg:gap-12 lg:items-start">
            <div
              id="lead-logo-target"
              className="hidden lg:flex lg:items-start lg:justify-center"
              style={{ minHeight: 200, position: "sticky", top: 110 }}
            >
              <Suspense fallback={null}>
                <IAPLogo3D width={200} height={200} scale={1.2} />
              </Suspense>
            </div>

            <div>
              <Reveal>
                <h2
                  className="text-center lg:text-left font-extrabold text-[24px] sm:text-[32px] lg:text-[38px] leading-[1.15] tracking-[-0.02em] max-w-[880px] uppercase"
                  style={{ textWrap: "balance", color: "var(--color-primary)" }}
                >
                  Sua empresa esta{" "}
                  <span className="text-foreground">refem da sua presenca.</span>
                  <br className="hidden sm:block" /> E contratar mais gente{" "}
                  <span className="text-foreground">nao resolve.</span>
                </h2>
              </Reveal>

              <div className="mt-14 lg:mt-16 grid md:grid-cols-2 gap-6 lg:gap-10 max-w-[900px]">
                <Reveal delay={0.15}>
                  <ul className="flex flex-col gap-4">
                    {COL_LEFT.map((item) => (
                      <ProblemItem key={item}>{item}</ProblemItem>
                    ))}
                  </ul>
                </Reveal>

                <Reveal delay={0.2}>
                  <ul className="flex flex-col gap-4">
                    {COL_RIGHT.map((item) => (
                      <ProblemItem key={item}>{item}</ProblemItem>
                    ))}
                  </ul>
                </Reveal>
              </div>

              <Reveal delay={0.25}>
                <p className="mt-14 text-center lg:text-left text-[18px] lg:text-[22px] leading-[1.35] max-w-[720px] text-foreground">
                  IA nao e hype — e a unica forma de{" "}
                  <strong style={{ color: "var(--color-primary)" }} className="font-extrabold">
                    escalar sem inflar a folha.
                  </strong>{" "}
                  E este kit mostra como comecar.
                </p>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="mt-8 text-center lg:text-left">
                  <button
                    type="button"
                    onClick={onOpenModal}
                    className="cta-glow-btn inline-flex items-center justify-center gap-2.5 px-7 py-5 rounded-[10px] font-black text-[13.5px] lg:text-[14.5px] uppercase tracking-[0.06em] no-underline"
                    style={{
                      background: "linear-gradient(180deg, #d5e95a, #7a8f30)",
                      color: "#0a0c07",
                      boxShadow:
                        "0 0 0 6px rgba(200,224,64,0.15), 0 24px 48px -14px rgba(200,224,64,0.5), inset 0 -2px 0 rgba(0,0,0,0.2)",
                    }}
                  >
                    Quero o kit gratuito &rarr;
                  </button>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProblemItem({ children }: { children: React.ReactNode }) {
  return (
    <li
      className="grid items-baseline gap-3 text-[14.5px] lg:text-[15px] leading-[1.5] text-foreground"
      style={{ gridTemplateColumns: "16px 1fr" }}
    >
      <span
        aria-hidden
        className="inline-block h-2.5 w-2.5 rounded-full mt-2"
        style={{
          border: "1.5px solid var(--color-primary)",
        }}
      />
      <span>{children}</span>
    </li>
  );
}
