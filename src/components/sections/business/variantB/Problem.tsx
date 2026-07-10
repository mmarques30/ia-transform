import { Reveal } from "@/components/Reveal";
import { CtaGlow } from "@/components/sections/business/variantB/CtaGlow";
import { ChaosCards } from "@/components/sections/business/variantB/ChaosCards";

/**
 * Problem (LP-B) — dobra "SE VOCÊ RECONHECE 3 DESSES, ESSA PÁGINA É PRA
 * VOCÊ". Estrutura:
 *  - H2 lime centralizada
 *  - trio de mockups "do caos" (WhatsApp lotado, planilha quebrada,
 *    inbox de madrugada) via <ChaosCards />. Substituiu os polígonos
 *    lime placeholder — hoje os cards já mostram concretamente as 3
 *    telas que o dono olha todo dia (dessaturadas, com vermelho de
 *    alerta como único acento).
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

          <div className="mt-12 lg:mt-16">
            <ChaosCards />
          </div>

          <div className="mt-14 lg:mt-20 grid md:grid-cols-2 gap-6 lg:gap-14 max-w-[900px] mx-auto">
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
