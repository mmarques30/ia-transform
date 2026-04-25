import { Reveal } from "@/components/Reveal";

const STATEMENTS = [
  { label: "Você trabalha", highlight: "muito" },
  { label: "Seu time se", highlight: "esforça" },
  { label: "Decisões acontecem", highlight: "todo dia" },
];

/**
 * OliveWave — typography-driven, no icon cards. Olive bg + tech grid drift +
 * lime glow. The 3 statements são chips minimalistas inline.
 */
export function OliveWave() {
  return (
    <section
      className="relative pt-[80px] pb-[120px] lg:pt-[100px] lg:pb-[140px] overflow-hidden"
      style={{ background: "var(--gradient-olive-wave)" }}
    >
      {/* Smooth wave divider on top */}
      <svg
        aria-hidden
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="absolute top-0 inset-x-0 w-full h-[60px] lg:h-[80px]"
        style={{ display: "block" }}
      >
        <path
          d="M0,0 L1440,0 L1440,40 C1080,80 720,80 360,40 C240,28 120,28 0,40 Z"
          fill="var(--color-background)"
        />
      </svg>

      {/* Tech grid drift in subtle white over olive */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 ia-anim-grid-drift opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(to right, oklch(1 0 0 / 0.5) 1px, transparent 1px), linear-gradient(to bottom, oklch(1 0 0 / 0.5) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 60% 80% at 50% 50%, black 30%, transparent 90%)",
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
                borderColor: "oklch(0.18 0.02 122 / 0.25)",
                backgroundColor: "oklch(0.18 0.02 122 / 0.1)",
                color: "oklch(0.18 0.02 122)",
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: "oklch(0.18 0.02 122)" }}
              />
              Diagnóstico
            </span>
          </Reveal>

          <Reveal delay={0.05}>
            <h2
              className="h-mix mt-7 text-[36px] sm:text-[48px] lg:text-[60px] tracking-tight"
              style={{ color: "oklch(0.12 0.02 122)" }}
            >
              O problema não é falta de esforço.
              <br />É <em style={{ color: "oklch(0.18 0.02 122)" }}>falta de estrutura.</em>
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
                    borderLeft: i > 0 ? "1px solid oklch(0.18 0.02 122 / 0.2)" : undefined,
                  }}
                >
                  <p
                    className="text-[14px] lg:text-[15px] leading-tight"
                    style={{ color: "oklch(0.18 0.02 122 / 0.7)" }}
                  >
                    {s.label}
                  </p>
                  <p
                    className="text-[18px] lg:text-[22px] font-bold tracking-tight"
                    style={{ color: "oklch(0.12 0.02 122)" }}
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
              style={{ color: "oklch(0.1 0.01 122)" }}
            >
              Mas tudo ainda{" "}
              <em
                style={{
                  color: "oklch(0.95 0.22 115)",
                  fontStyle: "italic",
                  fontFamily: "var(--font-serif)",
                  fontWeight: 400,
                }}
              >
                depende demais
              </em>{" "}
              de você.
            </p>
          </Reveal>

          {/* Disclaimer in subtle pill */}
          <Reveal delay={0.26}>
            <p
              className="mt-8 text-[13.5px] leading-[1.6] max-w-[560px] mx-auto"
              style={{ color: "oklch(0.18 0.02 122 / 0.75)" }}
            >
              Sem estrutura, todo crescimento aumenta risco, caos e desgaste. E essa conta sempre
              chega.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
