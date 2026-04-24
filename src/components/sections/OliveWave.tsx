import { Reveal } from "@/components/Reveal";
import { ArrowRight } from "lucide-react";

const PILLARS = [
  { label: "Você trabalha", highlight: "muito." },
  { label: "O time se", highlight: "esforça." },
  { label: "As decisões acontecem", highlight: "todos os dias." },
];

/**
 * Olive wave section — black wave cuts into olive background,
 * replicates the "O problema não é falta de esforço" section.
 */
export function OliveWave() {
  return (
    <section
      className="relative pt-[120px] pb-[120px] lg:pt-[140px] lg:pb-[140px]"
      style={{ background: "var(--gradient-olive-wave)" }}
    >
      {/* Top wave cutout (black notch blending into olive) */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-16"
        style={{
          background: "var(--color-background)",
          clipPath: "polygon(0 0, 40% 0, 45% 90%, 55% 90%, 60% 0, 100% 0, 100% 100%, 0 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute left-1/2 top-0 -translate-x-1/2 translate-y-1 h-9 w-9 rounded-full flex items-center justify-center"
        style={{
          backgroundColor: "var(--color-background)",
        }}
      >
        <ArrowRight className="h-4 w-4 text-white rotate-90" strokeWidth={2.5} />
      </div>

      <div className="container-page relative text-center">
        <Reveal>
          <h2
            className="h-display text-[36px] sm:text-[44px] lg:text-[56px]"
            style={{ color: "oklch(0.14 0.02 122)" }}
          >
            O problema não é falta de esforço.
            <br />É falta de estrutura.
          </h2>
        </Reveal>

        <Reveal delay={0.05}>
          <div
            className="mt-12 mx-auto rounded-full px-6 py-4 inline-flex flex-wrap items-center gap-x-6 gap-y-3 max-w-[880px]"
            style={{
              backgroundColor: "oklch(0.14 0.02 122)",
              color: "oklch(1 0 0)",
            }}
          >
            {PILLARS.map((p) => (
              <span
                key={p.label}
                className="inline-flex items-center gap-2 text-[14px] lg:text-[15px]"
              >
                <ArrowRight
                  className="h-4 w-4"
                  style={{ color: "var(--color-primary-glow)" }}
                  strokeWidth={2.5}
                />
                {p.label}{" "}
                <strong style={{ color: "var(--color-primary-glow)" }}>{p.highlight}</strong>
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p
            className="mt-8 text-[22px] sm:text-[26px] lg:text-[30px] font-bold"
            style={{ color: "oklch(0.1 0.01 122)" }}
          >
            mas tudo ainda depende demais de você.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <p
            className="mt-6 text-[14px] lg:text-[15px] max-w-[520px] mx-auto underline"
            style={{ color: "oklch(0.16 0.02 122)" }}
          >
            Sem estrutura, todo crescimento aumenta o risco, o caos e o desgaste. E, cedo ou tarde,
            essa conta chega.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
