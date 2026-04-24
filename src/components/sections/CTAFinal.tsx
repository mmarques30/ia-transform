import { Reveal } from "@/components/Reveal";

export function CTAFinal() {
  return (
    <section
      id="cta-final"
      className="py-[120px] lg:py-[160px]"
      style={{ background: "var(--gradient-cta)" }}
    >
      <div className="container-page text-center">
        <Reveal>
          <h2 className="h-display text-[40px] sm:text-[48px] lg:text-[56px] text-foreground max-w-[800px] mx-auto">
            Em 30 minutos, a gente descobre se faz sentido.
          </h2>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="mt-8 text-[18px] sm:text-[20px] text-sage leading-[1.5] max-w-[640px] mx-auto">
            A conversa inicial é gratuita. Não tem apresentação de produto.
            Você fala do seu contexto, a gente faz algumas perguntas, e no fim
            dizemos se Business é pra você.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <a
            href="#"
            className="mt-10 inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground font-semibold px-10 py-5 text-base hover:bg-primary-glow transition-colors"
          >
            Agendar diagnóstico de 30 min
          </a>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-6 text-sm text-muted-foreground">
            Sem pitch. Sem SPAM. Sem compromisso.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
