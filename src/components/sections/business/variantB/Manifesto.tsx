import { Reveal } from "@/components/Reveal";

/**
 * Manifesto (LP-B) — dobra editorial de fecho.
 *
 * Headline serif italic de peso alto ("empresa foi feita pra crescer,
 * não pra depender de você"), 3 parágrafos curtos de body (o problema
 * é estrutura, não culpa do dono) e um fechamento em 3 elementos ("Em
 * 90 dias. Com garantia. Sob medida.") que amarra o método, a garantia
 * e o produto num único triplet memorável.
 */
export function Manifesto() {
  return (
    <section id="manifesto" className="section-veil py-[80px] lg:py-[120px]">
      <div className="container-page">
        <div className="max-w-[820px] mx-auto text-center">
          <Reveal>
            <h2
              className="font-extrabold text-[26px] sm:text-[34px] lg:text-[46px] leading-[1.08] tracking-[-0.02em] text-foreground"
              style={{ textWrap: "balance" }}
            >
              A sua empresa foi feita para{" "}
              <em
                style={{
                  fontFamily: '"Instrument Serif", serif',
                  color: "var(--color-primary)",
                  fontWeight: 500,
                }}
              >
                crescer.
              </em>
              <br />
              Não para depender de você para{" "}
              <em
                style={{
                  fontFamily: '"Instrument Serif", serif',
                  color: "var(--color-primary)",
                  fontWeight: 500,
                }}
              >
                funcionar.
              </em>
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mt-8 text-[15.5px] lg:text-[16.5px] text-sage leading-[1.7] max-w-[680px] mx-auto">
              Todo dono de empresa chega num ponto onde percebe que o maior obstáculo para crescer{" "}
              <strong className="text-foreground font-bold">é ele mesmo</strong> — porque a operação
              não funciona sem a sua presença.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-5 text-[15.5px] lg:text-[16.5px] text-sage leading-[1.7] max-w-[680px] mx-auto">
              Não é culpa sua.{" "}
              <strong className="text-foreground font-bold">
                É estrutura. É processo. É sistema.
              </strong>
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-5 text-[15.5px] lg:text-[16.5px] text-sage leading-[1.7] max-w-[680px] mx-auto">
              A IAplicada existe para construir o sistema que coloca sua empresa no{" "}
              <strong className="text-foreground font-bold">piloto automático</strong> — para você
              parar de apagar incêndio e voltar a fazer o que realmente importa:{" "}
              <em
                style={{
                  fontFamily: '"Instrument Serif", serif',
                  color: "var(--color-primary)",
                  fontWeight: 500,
                }}
              >
                crescer.
              </em>
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <p
              className="mt-10 text-[20px] sm:text-[26px] lg:text-[32px] leading-[1.15] tracking-[-0.015em] text-foreground"
              style={{ fontFamily: '"Instrument Serif", serif' }}
            >
              <em>Em 90 dias.</em>{" "}
              <span
                className="mx-1 not-italic font-normal"
                style={{ color: "var(--color-primary)" }}
              >
                ·
              </span>{" "}
              <em>Com garantia.</em>{" "}
              <span
                className="mx-1 not-italic font-normal"
                style={{ color: "var(--color-primary)" }}
              >
                ·
              </span>{" "}
              <em>Sob medida.</em>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
