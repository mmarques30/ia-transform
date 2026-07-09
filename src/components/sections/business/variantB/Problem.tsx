import { Reveal } from "@/components/Reveal";
import { CtaGlow } from "@/components/sections/business/variantB/CtaGlow";

/**
 * Problem (LP-B refactor Acelerador) — dobra "Você tem esses problemas
 * em sua empresa?". Estrutura:
 *  - H2 lime centralizada
 *  - trio de fotos "PROBLEMA" em polígono inclinado (moldura lime,
 *    skewX). Placeholder até termos assets — 3 gradientes dark
 *  - 2 colunas de lista com bullets circulares lime
 *  - transição "Se você disse sim..." + CTA glow
 */

const COL_LEFT = [
  "Multiplicidade de demandas, processos desorganizados e falta de indicadores;",
  'Política do "Apaga Incêndio", negligenciando o importante por conta das urgências;',
  "Time dependente, sem autonomia ou iniciativa;",
  "Falta de clareza e perspectiva no processo de crescimento e escalada.",
];

const COL_RIGHT = [
  "Sobrecarga de trabalho, mais de 12 horas por dia;",
  "Dificuldade em se ausentar da empresa e tirar férias;",
  "Falta de tempo para a família, amigos e lazer;",
  "Reflexos na saúde, como estresse e vida sedentária.",
];

export function Problem() {
  return (
    <section className="relative">
      <div className="section-veil w-full py-[72px] lg:py-[110px]">
        <div className="relative z-10 container-page">
          <Reveal>
            <h2
              className="text-center font-extrabold text-[28px] sm:text-[36px] lg:text-[42px] leading-[1.1] tracking-[-0.02em] max-w-[780px] mx-auto"
              style={{ textWrap: "balance", color: "var(--color-primary)" }}
            >
              Você tem esses problemas <span className="text-foreground">em sua empresa?</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div
              className="mt-10 lg:mt-14 mx-auto max-w-[620px] grid grid-cols-3 gap-2.5 lg:gap-3"
              style={{ transform: "skewX(-8deg)", aspectRatio: "3 / 1.2" }}
            >
              {[0, 1, 2].map((i) => (
                <ProblemPolygonCell key={i} />
              ))}
            </div>
          </Reveal>

          <div className="mt-12 lg:mt-16 grid md:grid-cols-2 gap-8 lg:gap-14 max-w-[900px] mx-auto">
            <Reveal delay={0.15}>
              <div>
                <h3
                  className="font-extrabold text-[18px] lg:text-[20px] mb-5"
                  style={{ color: "var(--color-primary)" }}
                >
                  Isso acontece em sua empresa?
                </h3>
                <ul className="flex flex-col gap-4">
                  {COL_LEFT.map((item) => (
                    <ProblemItem key={item}>{item}</ProblemItem>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div>
                <h3
                  className="font-extrabold text-[18px] lg:text-[20px] mb-5"
                  style={{ color: "var(--color-primary)" }}
                >
                  Você sofre com:
                </h3>
                <ul className="flex flex-col gap-4">
                  {COL_RIGHT.map((item) => (
                    <ProblemItem key={item}>{item}</ProblemItem>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.25}>
            <p className="mt-14 text-center text-[18px] lg:text-[22px] leading-[1.35] max-w-[620px] mx-auto text-foreground">
              Se você{" "}
              <strong style={{ color: "var(--color-primary)" }} className="font-extrabold">
                disse sim
              </strong>{" "}
              a qualquer item, então a IAplicada é pra você.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-8 text-center">
              <CtaGlow size="lg">Quero o diagnóstico do meu negócio</CtaGlow>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/**
 * Célula do polígono "PROBLEMA" — placeholder até termos as fotos reais.
 * A skew externa (-8deg) enviesa a moldura; a contra-skew (+8deg) mantém
 * o gradiente/label reto. Moldura lime + shadow pesado dá o mesmo peso
 * visual das fotos do Acelerador Empresarial.
 */
function ProblemPolygonCell() {
  return (
    <div
      className="relative overflow-hidden rounded-[4px]"
      style={{
        background: "radial-gradient(circle at 40% 30%, #2a2f22, #0d0f08 70%)",
        border: "3px solid var(--color-primary)",
        boxShadow: "0 20px 40px -10px rgba(0,0,0,0.5)",
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          transform: "skewX(8deg)",
          backgroundImage:
            "linear-gradient(180deg, rgba(255,255,255,0.06), transparent 30%), radial-gradient(60% 40% at 50% 30%, rgba(230,220,200,0.15), transparent 70%)",
        }}
      />
      <span
        aria-hidden
        className="absolute bottom-2.5 left-1/2 -translate-x-1/2 text-[8.5px] tracking-[0.16em] font-bold"
        style={{
          transform: "translateX(-50%) skewX(8deg)",
          color: "rgba(200,224,64,0.35)",
          fontFamily: '"JetBrains Mono", ui-monospace, Menlo, monospace',
        }}
      >
        PROBLEMA
      </span>
    </div>
  );
}

function ProblemItem({ children }: { children: React.ReactNode }) {
  return (
    <li
      className="grid items-baseline gap-3 text-[14.5px] lg:text-[15px] leading-[1.5] text-foreground"
      style={{ gridTemplateColumns: "16px 1fr" }}
    >
      <span
        aria-hidden
        className="inline-block h-2.5 w-2.5 rounded-full mt-2"
        style={{
          border: "1.5px solid var(--color-primary)",
        }}
      />
      <span>{children}</span>
    </li>
  );
}
