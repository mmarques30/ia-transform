import { Reveal } from "@/components/Reveal";

/**
 * Dor + Resposta — seção editorial 2-col da /contabilcalculo.
 * À esquerda, sequência numerada da dor (espelha o slide do criativo
 * "4 clientes / 2 auxiliares / margem some"). À direita, a resposta
 * em parágrafo editorial. Sem cards, sem ícones — pura tipografia.
 */
// Bg brand charcoal (hue 122, não warm sepia) pra ficar coerente com o resto.
const SECTION_BG = "oklch(0.13 0.018 122)";
const SECTION_BORDER = "oklch(0.3 0.04 122 / 0.5)";

const DOR = [
  "Você fecha 4 clientes novos.",
  "Contrata 2 auxiliares.",
  "A margem some.",
];

export function DorResposta() {
  return (
    <section
      className="relative py-[80px] lg:py-[140px]"
      style={{ backgroundColor: SECTION_BG }}
    >
      <div className="container-page relative">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-start">
          {/* DOR — sequência narrativa numerada */}
          <Reveal>
            <div>
              <p className="text-[11.5px] uppercase tracking-[0.22em] font-semibold text-muted-foreground">
                A conta que ninguém faz
              </p>
              <div className="mt-10 space-y-9 lg:space-y-12">
                {DOR.map((line, i) => (
                  <div key={line}>
                    <p
                      className="num-display text-[36px] lg:text-[44px] leading-none"
                      style={{
                        color: "oklch(0.55 0.08 125 / 0.7)",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      0{i + 1}
                    </p>
                    <p
                      className="mt-3 text-[24px] sm:text-[28px] lg:text-[34px] leading-[1.15] text-foreground"
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

              <p
                className="mt-12 lg:mt-14 pt-6 text-[16px] lg:text-[18px] text-foreground/85 leading-[1.55] max-w-[420px]"
                style={{ borderTop: `1px solid ${SECTION_BORDER}` }}
              >
                O problema não é vender mais. É que sua operação{" "}
                <span className="text-foreground font-semibold">
                  não escala sem gente
                </span>
                .
              </p>
            </div>
          </Reveal>

          {/* RESPOSTA — parágrafo editorial */}
          <Reveal delay={0.1}>
            <div className="lg:pt-3">
              <p className="text-[11.5px] uppercase tracking-[0.22em] font-semibold text-muted-foreground">
                A virada
              </p>
              <h2 className="h-mix mt-7 lg:mt-9 text-[32px] sm:text-[42px] lg:text-[52px] leading-[1.02] tracking-[-0.02em] text-foreground">
                A IA <em>não substitui</em> contador.
              </h2>
              <p className="mt-7 text-[16px] lg:text-[19px] text-sage leading-[1.6]">
                Assume o pedaço operacional que tomava o tempo da equipe pra ela voltar ao que
                paga melhor: consultoria, planejamento tributário, relação com o cliente.
              </p>
              <p className="mt-5 text-[16px] lg:text-[19px] text-foreground leading-[1.6]">
                Em <span className="font-bold">7 dias</span>, primeira rotina automatizada em
                produção. Em{" "}
                <span className="font-bold">8 semanas</span>, time autônomo. Sem trocar de
                sistema, sem depender de TI.
              </p>

              {/* Linha conectora pra Calculadora */}
              <div className="mt-12 lg:mt-16 flex items-center gap-4">
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
                  className="text-[12px] uppercase tracking-[0.22em] font-semibold whitespace-nowrap hover:opacity-80 transition-opacity"
                  style={{ color: "var(--color-primary)" }}
                >
                  Quanto isso vale pra você ↓
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
