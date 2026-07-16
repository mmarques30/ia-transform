import { Reveal } from "@/components/Reveal";

/**
 * Manifesto (LP-A) — mesma estrutura editorial da /businessv2 com
 * copy própria pro ângulo LP-A: "contratar mais nunca foi solução".
 *
 * Mantém o formato compacto (h2 + parágrafo + linha serif italic
 * de fecho) e o padrão sem em-dashes decidido antes.
 */
export function Manifesto() {
  return (
    <section id="manifesto" className="section-veil py-[70px] lg:py-[100px]">
      <div className="container-page">
        <div className="max-w-[820px] mx-auto text-center">
          <Reveal>
            <h2
              className="font-extrabold text-[26px] sm:text-[34px] lg:text-[46px] leading-[1.08] tracking-[-0.02em] text-foreground"
              style={{ textWrap: "balance" }}
            >
              Contratar mais nunca foi a solução.{" "}
              <em
                style={{
                  fontFamily: '"Instrument Serif", serif',
                  color: "var(--color-primary)",
                  fontWeight: 500,
                }}
              >
                Nunca vai ser.
              </em>
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mt-7 text-[15.5px] lg:text-[16.5px] text-sage leading-[1.65] max-w-[620px] mx-auto">
              Toda empresa chega num ponto onde o crescimento para. Não porque o mercado parou, mas
              porque a operação não aguenta mais. E a resposta instintiva é contratar. Mais uma
              pessoa. Mais um gestor. Mais uma planilha de controle.
            </p>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mt-5 text-[15.5px] lg:text-[16.5px] text-sage leading-[1.65] max-w-[620px] mx-auto">
              Mas o problema não é gente.{" "}
              <strong className="text-foreground font-bold">É processo. É sistema.</strong> A
              IAplicada existe para construir o sistema que escala a sua operação, sem aumentar a
              folha, sem depender de você para funcionar.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <p
              className="mt-9 text-[20px] sm:text-[26px] lg:text-[32px] leading-[1.15] tracking-[-0.015em] text-foreground"
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
