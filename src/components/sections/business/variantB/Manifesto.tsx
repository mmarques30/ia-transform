import { Reveal } from "@/components/Reveal";

/**
 * Manifesto (LP-B) — dobra editorial de fecho.
 *
 * Simplificada depois de feedback: "tem traço/travessão. Já te pedi
 * pra tirar isso diversas vezes. Tá com muita informação. Não sei
 * se tá útil esse visual."
 *
 * Mudanças:
 *  - Removidos todos os em-dashes (—) — restrutura pra pontos e
 *    vírgulas
 *  - Cortado o parágrafo do meio ("Todo dono chega num ponto...")
 *    que era o mais longo e adicionava menos
 *  - Removido "com garantia" do fechamento (o modelo de garantia
 *    mudou na dobra 08, não é mais promessa universal)
 *  - Padding vertical reduzido — seção mais compacta, menos
 *    "espaço morto" abaixo
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

          <Reveal delay={0.1}>
            <p className="mt-7 text-[15.5px] lg:text-[16.5px] text-sage leading-[1.65] max-w-[620px] mx-auto">
              Não é culpa sua.{" "}
              <strong className="text-foreground font-bold">
                É estrutura. É processo. É sistema.
              </strong>{" "}
              A IAplicada constrói o sistema que coloca sua empresa no{" "}
              <strong className="text-foreground font-bold">piloto automático</strong>.
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <p
              className="mt-9 text-[20px] sm:text-[26px] lg:text-[32px] leading-[1.15] tracking-[-0.015em] text-foreground"
              style={{ fontFamily: '"Instrument Serif", serif' }}
            >
              <em>Sob medida.</em>{" "}
              <span
                className="mx-1 not-italic font-normal"
                style={{ color: "var(--color-primary)" }}
              >
                ·
              </span>{" "}
              <em>Dentro da sua operação.</em>{" "}
              <span
                className="mx-1 not-italic font-normal"
                style={{ color: "var(--color-primary)" }}
              >
                ·
              </span>{" "}
              <em>Rodando de verdade.</em>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
