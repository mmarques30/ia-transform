import { Reveal } from "@/components/Reveal";

const STATEMENTS = [
  { label: "O time", highlight: "vira a noite" },
  { label: "O cliente", highlight: "atrasa doc" },
  { label: "O fechamento", highlight: "trava tudo" },
];

/**
 * OliveWave — typography-driven, no icon cards. Olive bg + tech grid drift +
 * lime glow. The 3 statements são chips minimalistas inline.
 */
export function OliveWave() {
  return (
    <section className="relative pt-[150px] pb-[170px] lg:pt-[190px] lg:pb-[210px] overflow-hidden">
      {/* Olive wash com fade vertical longo nas bordas — funde de forma
          bem gradual com o WebGL das sections vizinhas (sem linha de corte). */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: "var(--gradient-olive-wave)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 34%, black 66%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 34%, black 66%, transparent 100%)",
        }}
      />

      {/* Lime glow at top center */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-[400px] w-[800px] rounded-full ia-anim-shimmer"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.95 0.22 115 / 0.35) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />

      <div className="container-page relative">
        <div className="text-center max-w-[860px] mx-auto">
          <Reveal>
            <span
              className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.18em] font-semibold backdrop-blur-sm"
              style={{
                borderColor: "oklch(0.96 0.012 110 / 0.3)",
                backgroundColor: "oklch(0.96 0.012 110 / 0.08)",
                color: "oklch(0.96 0.012 110)",
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: "oklch(0.88 0.20 118)" }}
              />
              Diagnóstico
            </span>
          </Reveal>

          <Reveal delay={0.05}>
            <h2
              className="h-mix mt-7 text-[36px] sm:text-[48px] lg:text-[60px] tracking-tight"
              style={{ color: "oklch(0.97 0.012 110)" }}
            >
              O problema não é falta de esforço.
              <br />É <em style={{ color: "oklch(0.88 0.20 118)" }}>rotina manual demais.</em>
            </h2>
          </Reveal>

          {/* 3 statements em uma linha — divididos por separadores verticais sutis */}
          <Reveal delay={0.12}>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-0 text-center">
              {STATEMENTS.map((s, i) => (
                <div
                  key={s.label}
                  className="flex items-center gap-3 sm:px-6 lg:px-8 first:pl-0 last:pr-0"
                  style={{
                    borderLeft: i > 0 ? "1px solid oklch(0.96 0.012 110 / 0.2)" : undefined,
                  }}
                >
                  <p
                    className="text-[14px] lg:text-[15px] leading-tight"
                    style={{ color: "oklch(0.96 0.012 110 / 0.7)" }}
                  >
                    {s.label}
                  </p>
                  <p
                    className="text-[18px] lg:text-[22px] font-bold tracking-tight"
                    style={{ color: "oklch(0.97 0.012 110)" }}
                  >
                    {s.highlight}.
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Punchline */}
          <Reveal delay={0.2}>
            <p
              className="mt-14 text-[28px] sm:text-[36px] lg:text-[44px] font-bold leading-[1.15] tracking-tight"
              style={{ color: "oklch(0.97 0.012 110)" }}
            >
              E o escritório ainda{" "}
              <em
                style={{
                  color: "oklch(0.90 0.21 116)",
                  fontStyle: "italic",
                  fontFamily: "var(--font-serif)",
                  fontWeight: 400,
                }}
              >
                não cresce
              </em>{" "}
              sem contratar.
            </p>
          </Reveal>

          {/* Disclaimer in subtle pill */}
          <Reveal delay={0.26}>
            <p
              className="mt-8 text-[13.5px] leading-[1.6] max-w-[560px] mx-auto"
              style={{ color: "oklch(0.96 0.012 110 / 0.7)" }}
            >
              Mais carteira significa mais gente, mais custo e mais retrabalho. Sem automação, a
              margem some no meio do caminho.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
