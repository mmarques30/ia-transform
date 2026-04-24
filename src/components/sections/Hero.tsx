import { Reveal } from "@/components/Reveal";

export function Hero() {
  return (
    <section
      id="top"
      className="relative pt-[200px] pb-[140px]"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div className="container-page">
        <div className="max-w-[900px] mx-auto text-center">
          <Reveal>
            <span className="label-chip">✱ IAplicada Business</span>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="h-display mt-8 text-[44px] sm:text-[56px] lg:text-[68px] text-foreground">
              IA dentro da sua empresa.
              <br />
              Não como promessa. Como{" "}
              <span style={{ color: "var(--color-primary-glow)" }}>
                entrega mensurável.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-8 text-[18px] sm:text-[22px] text-sage leading-[1.5] max-w-[720px] mx-auto">
              A IAplicada implementa IA no operacional de empresas que já
              tentaram sozinhas e não sustentaram. A gente diagnostica onde faz
              diferença, constrói os fluxos junto com seu time e mantém a roda
              girando. Sem curso genérico, sem hype, sem dependência de
              consultor.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="#cta-final"
                className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground font-semibold px-8 py-4 text-base hover:bg-primary-glow transition-colors"
              >
                Agendar diagnóstico de 30 min
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
              Conversa inicial gratuita. Sem pitch de venda, sem material
              pronto. A gente ouve seu contexto e diz, ali, se faz sentido
              seguir.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
