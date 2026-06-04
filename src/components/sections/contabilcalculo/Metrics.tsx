import { Reveal } from "@/components/Reveal";

/**
 * Métricas — seção tipo "scientific credibility" do nextsense.io.
 * 4 números oversized funcionando como tipografia hero — dão peso
 * técnico antes do lead chegar na calculadora. Cria ponte entre o
 * hero (proposta) e o DorResposta (sequência narrativa).
 *
 * Layout: eyebrow centralizado + grid 4-col com num-display gigante,
 * label uppercase e linha hairline divisória entre colunas.
 */

const METRICS = [
  {
    value: "75%",
    label: "Redução do tempo operacional",
    sub: "tarefa por tarefa, com IA no lugar certo",
  },
  {
    value: "7d",
    label: "Primeira rotina em produção",
    sub: "do diagnóstico ao primeiro ganho",
  },
  {
    value: "8sem",
    label: "Time autônomo",
    sub: "operação rodando sozinha — a gente sai",
  },
  {
    value: "+80",
    label: "Implementações reais",
    sub: "benchmark dos % vem daqui, não de palpite",
  },
];

export function Metrics() {
  return (
    <section
      className="relative py-[80px] lg:py-[120px]"
      style={{
        backgroundColor: "oklch(0.13 0.018 122)",
        borderTop: "1px solid oklch(0.55 0.06 122 / 0.2)",
        borderBottom: "1px solid oklch(0.55 0.06 122 / 0.2)",
      }}
    >
      <div className="container-page relative">
        <Reveal>
          <h2
            className="h-mix text-center text-[26px] sm:text-[34px] lg:text-[44px] leading-[1.05] text-foreground max-w-[820px] mx-auto"
            style={{ letterSpacing: "-0.02em" }}
          >
            O número não é palpite.
            <br />
            <em>É média de operação real.</em>
          </h2>
        </Reveal>

        <div className="mt-14 lg:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-y-12 lg:gap-y-0 relative">
          {METRICS.map((m, i) => (
            <Reveal key={m.label} delay={0.08 + i * 0.06}>
              <div
                className="relative px-4 lg:px-8 text-center"
                style={{
                  borderRight:
                    i < METRICS.length - 1
                      ? "1px solid oklch(0.55 0.06 122 / 0.18)"
                      : undefined,
                }}
              >
                <p
                  className="num-display text-[56px] sm:text-[72px] lg:text-[96px] leading-[0.92]"
                  style={{
                    color: "var(--color-primary)",
                    letterSpacing: "-0.04em",
                  }}
                >
                  {m.value}
                </p>
                <p className="mt-5 text-[12px] uppercase tracking-[0.16em] font-bold text-foreground leading-[1.25]">
                  {m.label}
                </p>
                <p className="mt-2.5 text-[13px] text-sage leading-[1.5] max-w-[200px] mx-auto">
                  {m.sub}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
