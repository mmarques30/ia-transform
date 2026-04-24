import { Reveal } from "@/components/Reveal";
import { ArrowRight } from "lucide-react";

const HERO_STATS = [
  { v: "+80", l: "empresas atendidas" },
  { v: "R$ 2,1M", l: "em eficiência gerada (1 case)" },
  { v: "3 a 12 sem", l: "pra IA rodar na operação" },
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative pt-[180px] pb-[120px] lg:pt-[200px] lg:pb-[140px] overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] opacity-60"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, oklch(0.305 0.05 122 / 0.55) 0%, transparent 60%)",
        }}
      />
      <div className="container-page relative">
        <div className="max-w-[960px] mx-auto text-center">
          <Reveal>
            <span className="label-chip">✱ IAplicada Business · B2B</span>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="h-display mt-8 text-[40px] sm:text-[56px] lg:text-[72px] text-foreground">
              IA dentro da sua empresa.
              <br />
              Não como promessa. Como{" "}
              <span style={{ color: "var(--color-primary-glow)" }}>entrega mensurável.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-8 text-[18px] sm:text-[22px] text-sage leading-[1.5] max-w-[760px] mx-auto">
              A IAplicada implementa IA no operacional de empresas que já tentaram sozinhas e não
              sustentaram. A gente diagnostica onde faz diferença, constrói os fluxos junto com seu
              time e mantém a roda girando. Sem curso genérico, sem hype, sem dependência de
              consultor.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="#cta-final"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary text-primary-foreground font-semibold px-8 py-4 text-base hover:bg-primary-glow transition-colors"
              >
                Agendar diagnóstico de 30 min
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#cases"
                className="inline-flex items-center justify-center rounded-md border border-border text-foreground font-semibold px-8 py-4 text-base hover:border-primary transition-colors"
              >
                Ver cases de implementação
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-6 text-sm text-muted-foreground max-w-[560px] mx-auto">
              Conversa inicial gratuita. Sem pitch de venda, sem material pronto. A gente ouve seu
              contexto e diz, ali, se faz sentido seguir.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.3}>
          <div className="mt-20 lg:mt-24 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-[900px] mx-auto">
            {HERO_STATS.map((s) => (
              <div
                key={s.l}
                className="rounded-lg border border-border bg-card/50 backdrop-blur-sm px-6 py-5 text-left"
              >
                <div
                  className="num-display text-[30px] lg:text-[34px] leading-none"
                  style={{ color: "var(--color-primary-glow)" }}
                >
                  {s.v}
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-snug">{s.l}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
