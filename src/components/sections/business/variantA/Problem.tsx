import { Reveal } from "@/components/Reveal";
import { ChaosCards } from "@/components/sections/business/variantB/ChaosCards";

/**
 * Problem (LP-A) — mesma estrutura da /businessv2 (Problem):
 *  - H2 "SE VOCÊ RECONHECE 3 DESSES, ESSA PÁGINA É PRA VOCÊ"
 *  - ChaosCards (WhatsApp lotado, planilha, inbox) — reusa da v2
 *  - 2 colunas de bullets com pain-points
 *  - transição "Esse não é um problema de time..." + CTA glow
 *
 * Só a copy dos bullets muda pra o ângulo LP-A (crescimento sem
 * contratação): fala em receita, contratação, custo, gargalo — no
 * lugar do LP-B que fala em "apagar incêndio, aprova tudo".
 */

const COL_LEFT = [
  "Sua receita cresceu, mas a operação não acompanhou",
  "Você contrata mais gente pra resolver o que deveria ser processo",
  "O time passa horas em tarefas que poderiam ser automáticas",
];

const COL_RIGHT = [
  "Você não tem visibilidade real do que está acontecendo na operação",
  "Perdeu cliente ou contrato porque a operação não deu conta",
  "Cada nova contratação aumenta o custo mas não resolve o gargalo",
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
            <div className="mt-14 max-w-[720px] mx-auto text-center">
              <p className="text-[18px] lg:text-[22px] leading-[1.35] text-foreground">
                Esse não é um problema de{" "}
                <strong className="font-extrabold text-foreground">time.</strong> É um problema de{" "}
                <strong style={{ color: "var(--color-primary)" }} className="font-extrabold">
                  sistema.
                </strong>
              </p>
              <p className="mt-5 text-[15px] lg:text-[16px] text-sage leading-[1.6]">
                ERP não resolve: foi feito pra padronizar, não pra pensar. Consultoria não resolve:
                entrega slide e vai embora. O que você precisa é de software com IA construído dentro
                da sua operação — que automatiza, que aprende e que fica.
              </p>
              <p
                className="mt-4 text-[16px] lg:text-[18px] font-bold leading-[1.4]"
                style={{ color: "var(--color-primary)" }}
              >
                É isso que a IAplicada constrói.
              </p>
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
