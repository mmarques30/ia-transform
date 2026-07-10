import { Reveal } from "@/components/Reveal";
import { CtaGlow } from "@/components/sections/business/variantB/CtaGlow";

/**
 * Problem (LP-B refactor Acelerador) — dobra "SE VOCÊ RECONHECE 3
 * DESSES, ESSA PÁGINA É PRA VOCÊ". Estrutura:
 *  - H2 lime centralizada (novo copy: reconhecer 3 dos 6)
 *  - trio de fotos "PROBLEMA" em polígono inclinado (moldura lime,
 *    skewX). Placeholder até termos assets — 3 gradientes dark
 *  - 2 colunas de lista com 3 itens cada (6 sintomas do dono
 *    dependente do operacional)
 *  - transição "Esse não é um problema de gestão..." + CTA glow
 */

const COL_LEFT = [
  "Você aprova tudo, porque sem você a coisa não anda",
  "Seu time pede resposta pra tudo, o dia todo",
  "Você não sabe o que está acontecendo na operação agora",
];

const COL_RIGHT = [
  "Perdeu tempo com consultor que entregou slide e sumiu",
  "Tem medo de crescer porque não consegue entregar o que já tem",
  "Sua melhor pessoa segura a operação inteira na cabeça dela",
];

export function Problem() {
  return (
    <section className="relative">
      <div className="section-veil w-full py-[72px] lg:py-[110px]">
        <div className="relative z-10 container-page">
          <Reveal>
            <h2
              className="text-center font-extrabold text-[24px] sm:text-[32px] lg:text-[38px] leading-[1.15] tracking-[-0.02em] max-w-[880px] mx-auto uppercase"
              style={{ textWrap: "balance", color: "var(--color-primary)" }}
            >
              Se você reconhece <span className="text-foreground">3 desses,</span>
              <br className="hidden sm:block" /> essa página{" "}
              <span className="text-foreground">é pra você</span>
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

          <div className="mt-12 lg:mt-16 grid md:grid-cols-2 gap-6 lg:gap-14 max-w-[900px] mx-auto">
            <Reveal delay={0.15}>
              <ul className="flex flex-col gap-4">
                {COL_LEFT.map((item) => (
                  <ProblemItem key={item}>{item}</ProblemItem>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.2}>
              <ul className="flex flex-col gap-4">
                {COL_RIGHT.map((item) => (
                  <ProblemItem key={item}>{item}</ProblemItem>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.25}>
            <p className="mt-14 text-center text-[18px] lg:text-[22px] leading-[1.35] max-w-[720px] mx-auto text-foreground">
              Esse não é um problema de{" "}
              <strong className="font-extrabold text-foreground">gestão.</strong> É um problema de{" "}
              <strong style={{ color: "var(--color-primary)" }} className="font-extrabold">
                sistema.
              </strong>{" "}
              E sistema a gente constrói.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-8 text-center">
              <CtaGlow size="lg">Quero sair do operacional →</CtaGlow>
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
