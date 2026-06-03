import { Reveal } from "@/components/Reveal";

/**
 * Problema / Dor — sequência narrativa que dá continuidade ao slide 2 do
 * criativo ("Você fecha 4 clientes novos. Contrata 2 auxiliares. A margem
 * some. Conhecido?"). Reusa a mecânica do anúncio pra que quem veio do
 * tráfego pago sinta que a LP confirma o diagnóstico em vez de recomeçar
 * do zero.
 *
 * Estrutura: 3 statements numerados em sequência + fecho empático. Mobile
 * empilha vertical; desktop vira linha com connectors entre as etapas.
 */
const SEQUENCE = [
  {
    n: "01",
    text: "Você fecha 4 clientes novos.",
  },
  {
    n: "02",
    text: "Contrata 2 auxiliares.",
  },
  {
    n: "03",
    text: "A margem some.",
  },
];

export function Problem() {
  return (
    <section
      id="problema"
      className="section-veil relative overflow-hidden py-[80px] lg:py-[140px]"
    >
      <div className="container-page relative">
        <div className="max-w-[860px] mx-auto text-center">
          <Reveal>
            <span className="label-chip">
              <span className="dot" />O cenário do escritório
            </span>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="h-mix mt-6 text-[36px] sm:text-[44px] lg:text-[58px] text-foreground">
              A conta que <em>ninguém faz.</em>
            </h2>
          </Reveal>
        </div>

        {/* Sequência — 3 statements em cascata. Cada um tem o número grande
            em olive como ponto de ancoragem visual. */}
        <div className="mt-14 lg:mt-20 max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-4">
            {SEQUENCE.map((step, i) => (
              <Reveal key={step.n} delay={0.1 + i * 0.08}>
                <div className="relative flex flex-col items-center text-center px-4 lg:px-6">
                  <span
                    className="num-display text-[42px] lg:text-[56px] leading-none"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {step.n}
                  </span>
                  <p className="mt-5 text-[20px] lg:text-[24px] font-semibold tracking-tight text-foreground leading-[1.25]">
                    {step.text}
                  </p>
                  {/* Connector → entre statements no desktop */}
                  {i < SEQUENCE.length - 1 && (
                    <span
                      aria-hidden
                      className="hidden lg:block absolute right-[-18px] top-[20px] text-[22px]"
                      style={{ color: "oklch(0.55 0.08 125 / 0.5)" }}
                    >
                      →
                    </span>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Fecho empático — recupera a mecânica "Conhecido?" do criativo */}
        <Reveal delay={0.4}>
          <div className="mt-14 lg:mt-20 max-w-[760px] mx-auto text-center">
            <p
              className="text-[24px] lg:text-[32px] italic text-foreground"
              style={{ fontFamily: '"Instrument Serif", serif', lineHeight: 1.2 }}
            >
              Conhecido?
            </p>
            <p className="mt-5 text-[15.5px] lg:text-[17px] text-sage leading-[1.6]">
              O problema não é vender mais. É que sua operação{" "}
              <span className="text-foreground font-semibold">não escala sem gente</span>.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
