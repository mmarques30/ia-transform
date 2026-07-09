import { Reveal } from "@/components/Reveal";

/**
 * Guarantee (LP-B) — dobra de redução de risco.
 *
 * Promessa: se em 90 dias o sistema não estiver rodando dentro da
 * operação, a IAplicada devolve 100% do investimento — sem cláusula,
 * sem burocracia. Carta assinada + registrada em cartório funciona
 * como âncora de credibilidade.
 *
 * Visual: carta amarelada rotacionada + carimbo circular lime
 * sobreposto (100% GARANTIDO).
 */
export function Guarantee() {
  return (
    <section
      id="garantia"
      className="relative section-veil py-[80px] lg:py-[110px] overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(80% 80% at 70% 50%, rgba(200,224,64,0.08), transparent 60%)",
        }}
      />
      <div className="container-page relative">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-[1080px] mx-auto">
          <Reveal>
            <div>
              <span
                className="inline-block px-3.5 py-1.5 rounded-full text-[11px] tracking-[0.2em] uppercase font-bold"
                style={{
                  border: "1px solid rgba(200,224,64,0.4)",
                  background: "rgba(200,224,64,0.06)",
                  color: "var(--color-primary)",
                  fontFamily: '"JetBrains Mono", ui-monospace, Menlo, monospace',
                }}
              >
                Nossa garantia
              </span>
              <h2
                className="mt-5 font-extrabold text-[30px] sm:text-[36px] lg:text-[42px] leading-[1.05] tracking-[-0.025em] text-foreground"
                style={{ textWrap: "balance" }}
              >
                Garantia com{" "}
                <em
                  style={{
                    fontFamily: '"Instrument Serif", serif',
                    color: "var(--color-primary)",
                    fontWeight: 500,
                  }}
                >
                  carimbo de cartório.
                </em>
              </h2>
              <p className="mt-5 text-[14.5px] lg:text-[15.5px] text-sage leading-[1.65]">
                Se ao final de <strong className="text-foreground font-bold">90 dias</strong> o
                sistema não estiver rodando dentro da sua operação —{" "}
                <strong className="text-foreground font-bold">
                  devolvemos 100% do investimento
                </strong>
                . Sem cláusula, sem burocracia, sem discussão.
              </p>
              <p className="mt-4 text-[14.5px] lg:text-[15.5px] text-sage leading-[1.65]">
                <strong className="text-foreground font-bold">
                  Carta assinada + registrada em cartório.
                </strong>{" "}
                Não porque precisamos.{" "}
                <em
                  style={{
                    fontFamily: '"Instrument Serif", serif',
                    color: "var(--color-primary)",
                    fontWeight: 500,
                  }}
                >
                  Porque acreditamos no que entregamos.
                </em>
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative flex items-center justify-center min-h-[460px]">
              <GuaranteeDocument />
              <GuaranteeStamp />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function GuaranteeDocument() {
  return (
    <div
      className="relative"
      style={{
        width: 320,
        padding: "32px 28px",
        background: "#fdfaf0",
        color: "#1a1d10",
        borderRadius: 4,
        transform: "rotate(-4deg)",
        boxShadow: "0 40px 60px -20px rgba(0,0,0,0.6)",
        border: "1px solid #d9d3b8",
      }}
    >
      <div
        aria-hidden
        className="absolute inset-1 rounded pointer-events-none"
        style={{ border: "1px solid rgba(200,180,100,0.4)" }}
      />
      <p
        className="text-center text-[9px] font-extrabold uppercase mb-5"
        style={{
          color: "#7a6d3d",
          letterSpacing: "0.24em",
          fontFamily: '"JetBrains Mono", ui-monospace, Menlo, monospace',
        }}
      >
        TERMO · IAPLICADA · CNPJ XX.XXX.XXX/0001-XX
      </p>
      <p
        className="text-center text-[21px] leading-[1.1] italic font-medium mb-3.5"
        style={{ fontFamily: '"Instrument Serif", serif', color: "#131610" }}
      >
        Garantia de
        <br />
        <em>100% do investimento</em>
      </p>
      <p className="text-[10px] leading-[1.5] mb-4 text-justify" style={{ color: "#4a4a3a" }}>
        Eu, Mariana Marques, na qualidade de fundadora da IAplicada, garanto ao contratante deste
        termo que — se ao final de 90 dias corridos a contar da assinatura do contrato de
        implementação o sistema não estiver rodando dentro da operação — o valor integral do
        investimento será restituído em até 15 dias úteis.
      </p>
      <div style={{ height: 1, background: "#d9d3b8", margin: "12px 0" }} />
      <p className="text-[9.5px] leading-[1.5]" style={{ color: "#4a4a3a" }}>
        Sem cláusula de saída, sem discussão de escopo, sem burocracia. A garantia é reconhecida em
        cartório e vale a partir da data de emissão deste termo.
      </p>
      <div className="mt-6 w-[60%] text-center pt-1.5" style={{ borderTop: "1px solid #4a4a3a" }}>
        <p
          className="italic text-[21px] leading-none"
          style={{
            fontFamily: '"Instrument Serif", serif',
            color: "#2a2410",
            letterSpacing: "-0.01em",
          }}
        >
          M. Marques
        </p>
        <p
          className="mt-1 text-[8px] uppercase font-bold"
          style={{
            color: "#7a6d3d",
            letterSpacing: "0.14em",
            fontFamily: "Inter, sans-serif",
          }}
        >
          Mariana Marques · Fundadora · IAplicada
        </p>
      </div>
    </div>
  );
}

function GuaranteeStamp() {
  return (
    <div
      className="absolute flex items-center justify-center text-center"
      style={{
        top: 40,
        right: 20,
        width: 130,
        height: 130,
        borderRadius: "50%",
        background: "linear-gradient(180deg, #d5e95a, #7a8f30)",
        border: "4px double #0a0c07",
        color: "#0a0c07",
        fontWeight: 900,
        fontSize: 11,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        lineHeight: 1.15,
        transform: "rotate(12deg)",
        boxShadow: "0 20px 40px -10px rgba(200,224,64,0.5)",
      }}
    >
      <div>
        100%
        <br />
        GARANTIDO
        <span className="block mt-1 font-bold" style={{ fontSize: 8.5 }}>
          90 dias · Método APLICA
        </span>
      </div>
    </div>
  );
}
