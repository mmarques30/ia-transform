import { Reveal } from "@/components/Reveal";

/**
 * Spread 02 — Dor + Resposta em formato editorial magazine.
 *
 * Layout 2-col assimétrico, sem eyebrow chip, sem títulos óbvios.
 * Lado esquerdo = título serif italic enorme da dor + sequência 01/02/03.
 * Lado direito = resposta em parágrafo editorial com destaque tipográfico.
 *
 * Bg charcoal padrão (sem section-veil) — flow contínuo com Hero acima.
 */

const DOR = [
  "Você fecha 4 clientes novos.",
  "Contrata 2 auxiliares.",
  "A margem some.",
];

export function DorResposta() {
  return (
    <section className="relative py-[80px] lg:py-[140px]">
      <div className="container-page relative">
        <div className="grid lg:grid-cols-[5fr_6fr] gap-12 lg:gap-20 items-start">
          {/* ESQUERDA — título serif italic + sequência */}
          <div>
            <Reveal>
              <h2
                className="text-[28px] sm:text-[36px] lg:text-[48px] leading-[1] tracking-[-0.02em] text-foreground"
                style={{ fontFamily: '"Instrument Serif", serif' }}
              >
                Sua operação
                <br />
                <em className="text-muted-foreground/85">não escala</em>
                <br />
                sem gente.
              </h2>
            </Reveal>

            {/* Sequência da dor */}
            <Reveal delay={0.1}>
              <div className="mt-14 lg:mt-16 space-y-8 lg:space-y-10">
                {DOR.map((line, i) => (
                  <div key={line} className="flex items-baseline gap-5 lg:gap-7">
                    <p
                      className="num-display text-[22px] lg:text-[28px] leading-none shrink-0 w-10"
                      style={{
                        color: "oklch(0.55 0.08 125 / 0.7)",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      0{i + 1}
                    </p>
                    <p
                      className="text-[20px] sm:text-[24px] lg:text-[28px] leading-[1.2] text-foreground"
                      style={{
                        fontFamily: '"Instrument Serif", serif',
                        fontStyle: "italic",
                        letterSpacing: "-0.015em",
                      }}
                    >
                      {line}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* DIREITA — resposta editorial */}
          <Reveal delay={0.15}>
            <div className="lg:pt-8">
              <p className="text-[10.5px] uppercase tracking-[0.22em] font-semibold text-muted-foreground">
                A virada
              </p>
              <p className="mt-8 text-[18px] lg:text-[22px] leading-[1.45] text-foreground tracking-[-0.01em]">
                A IA <em className="text-primary">não substitui</em> contador. Assume o pedaço
                operacional que tomava o tempo da equipe pra ela voltar ao que paga melhor:{" "}
                <span className="font-semibold">consultoria</span>,{" "}
                <span className="font-semibold">planejamento</span> e{" "}
                <span className="font-semibold">relação com cliente</span>.
              </p>
              <p className="mt-7 text-[15px] lg:text-[17px] text-sage leading-[1.55]">
                Em <span className="font-bold text-foreground">7 dias</span>, primeira rotina
                automatizada em produção. Em{" "}
                <span className="font-bold text-foreground">8 semanas</span>, time autônomo.
                Sem trocar de sistema. Sem depender de TI.
              </p>

              <div className="mt-12 lg:mt-14 flex items-center gap-4">
                <span
                  aria-hidden
                  className="h-[1px] flex-1"
                  style={{
                    background:
                      "linear-gradient(90deg, var(--color-primary), transparent)",
                  }}
                />
                <a
                  href="#calculadora"
                  className="text-[11px] uppercase tracking-[0.22em] font-semibold whitespace-nowrap hover:opacity-80 transition-opacity"
                  style={{ color: "var(--color-primary)" }}
                >
                  Quanto vale pra você ↓
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
