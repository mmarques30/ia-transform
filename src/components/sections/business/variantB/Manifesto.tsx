import { Reveal } from "@/components/Reveal";

/**
 * Manifesto (LP-B) — dobra editorial de fecho.
 *
 * Frase única em Instrument Serif italic com a equação central da
 * IAplicada Business. Serve de pausa visual entre Urgency (alta
 * intensidade) e a saída pra rota do form.
 */
export function Manifesto() {
  return (
    <section id="manifesto" className="section-veil py-[80px] lg:py-[110px] text-center">
      <div className="container-page">
        <Reveal>
          <p
            className="font-extrabold text-[22px] sm:text-[28px] lg:text-[32px] leading-[1.1] max-w-[900px] mx-auto text-foreground"
            style={{ textWrap: "balance", letterSpacing: "-0.01em" }}
          >
            Processo{" "}
            <em
              style={{
                fontFamily: '"Instrument Serif", serif',
                color: "var(--color-primary)",
                fontWeight: 500,
              }}
            >
              mapeado
            </em>{" "}
            <span className="mx-1 lg:mx-2 font-normal" style={{ color: "var(--color-primary)" }}>
              +
            </span>{" "}
            Sistema{" "}
            <em
              style={{
                fontFamily: '"Instrument Serif", serif',
                color: "var(--color-primary)",
                fontWeight: 500,
              }}
            >
              sob medida
            </em>
            <br />
            <span className="mx-1 lg:mx-2 font-normal" style={{ color: "var(--color-primary)" }}>
              =
            </span>{" "}
            Operação que{" "}
            <em
              style={{
                fontFamily: '"Instrument Serif", serif',
                color: "#d5e95a",
                fontWeight: 500,
              }}
            >
              roda sozinha.
            </em>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
