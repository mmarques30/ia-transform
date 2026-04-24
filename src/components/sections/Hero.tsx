import { Reveal } from "@/components/Reveal";
import { ArrowRight } from "lucide-react";
import { HeroMockup } from "@/components/mockups/HeroMockup";

const HERO_STATS = [
  { v: "+80", l: "empresas" },
  { v: "R$ 2,1M", l: "em eficiência (1 case)" },
  { v: "3 a 12 sem", l: "pra rodar" },
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative pt-[140px] pb-[80px] lg:pt-[180px] lg:pb-[120px] overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div className="container-page relative">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center">
          <div>
            <Reveal>
              <span className="label-chip">
                <span className="dot" />
                IAplicada · Business
              </span>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="h-display mt-6 text-[44px] sm:text-[56px] lg:text-[68px] text-foreground">
                IA dentro da sua empresa.
                <br />
                Como <span style={{ color: "var(--color-primary)" }}>entrega mensurável.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-6 text-[18px] lg:text-[20px] text-sage leading-[1.55] max-w-[560px]">
                Diagnosticamos onde IA faz diferença, construímos os fluxos com seu time e mantemos
                a roda girando. Sem curso. Sem hype.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href="#cta-final"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-accent text-accent-foreground font-semibold px-7 py-3.5 text-[15px] hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  Agendar diagnóstico
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#sistemas"
                  className="inline-flex items-center justify-center rounded-md border border-border bg-card text-foreground font-semibold px-7 py-3.5 text-[15px] hover:border-primary transition-colors"
                >
                  Ver sistemas que construímos
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-10 pt-8 border-t border-border grid grid-cols-3 gap-4 max-w-[480px]">
                {HERO_STATS.map((s) => (
                  <div key={s.l}>
                    <div
                      className="num-display text-[22px] lg:text-[26px] leading-none"
                      style={{ color: "var(--color-accent)" }}
                    >
                      {s.v}
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground leading-tight">{s.l}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.25}>
            <div className="relative">
              <HeroMockup />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
