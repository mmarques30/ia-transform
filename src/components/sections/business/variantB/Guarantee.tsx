import { Reveal } from "@/components/Reveal";

/**
 * Guarantee (LP-B) — dobra de redução de risco. No Acelerador é a
 * "garantia de R$1000 de volta" com carimbo cartório. Como esse
 * modelo não encaixa em IA empresarial (R$1k não cobre o diagnóstico),
 * adaptamos pra promessa mais forte e mais honesta: o diagnóstico é
 * bancado por nós e o material fica com o cliente mesmo se não
 * fecharmos contrato.
 *
 * Visual mantém a linguagem: carta amarelada rotacionada + carimbo
 * circular lime sobreposto.
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
                O diagnóstico é{" "}
                <em
                  style={{
                    fontFamily: '"Instrument Serif", serif',
                    color: "var(--color-primary)",
                    fontWeight: 500,
                  }}
                >
                  sem custo
                </em>{" "}
                — e o material fica com você.
              </h2>
              <p className="mt-5 text-[14.5px] lg:text-[15.5px] text-sage leading-[1.65]">
                A IAplicada{" "}
                <strong className="text-foreground font-bold">não vende ilusão de refund</strong>. A
                gente faz diferente: o diagnóstico é bancado por nós. Se identificarmos que sua
                operação não precisa de sistema, você{" "}
                <strong className="text-foreground font-bold">
                  fica com o mapa dos processos, o ranking dos ladrões de hora e o playbook do
                  próximo trimestre
                </strong>{" "}
                — de graça, assinado pela Mari, mesmo que não fechemos.
              </p>
              <p className="mt-4 text-[14.5px] lg:text-[15.5px] text-sage leading-[1.65]">
                Se topar seguir, os 60 dias de implementação têm{" "}
                <strong className="text-foreground font-bold">marcos semanais</strong>. Se em algum
                marco a entrega não estiver de pé, a gente{" "}
                <strong className="text-foreground font-bold">pausa e refaz</strong>, sem cobrança
                extra.
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
        Compromisso de
        <br />
        <em>diagnóstico sem custo</em>
      </p>
      <p className="text-[10px] leading-[1.5] mb-4 text-justify" style={{ color: "#4a4a3a" }}>
        Eu, Mariana Marques, na qualidade de fundadora da IAplicada, garanto ao contratante deste
        termo que o diagnóstico operacional preliminar — incluindo mapa de processos, ranking de
        gargalos e playbook trimestral — será entregue por escrito e sem qualquer custo, mesmo na
        hipótese de não formalizarmos contrato de implementação.
      </p>
      <div style={{ height: 1, background: "#d9d3b8", margin: "12px 0" }} />
      <p className="text-[9.5px] leading-[1.5]" style={{ color: "#4a4a3a" }}>
        O contratante mantém titularidade integral sobre o material entregue. IAplicada renuncia a
        exclusividade sobre os achados aqui descritos.
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
        DIAGNÓSTICO
        <br />
        SEM CUSTO
        <span className="block mt-1 font-bold" style={{ fontSize: 8.5 }}>
          Método APLICA · 2026
        </span>
      </div>
    </div>
  );
}
