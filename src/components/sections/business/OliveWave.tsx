import type { ReactNode } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const STATEMENTS = [
  { n: "01", label: "O time", highlight: "vira a noite" },
  { n: "02", label: "O cliente", highlight: "atrasa doc" },
  { n: "03", label: "O fechamento", highlight: "trava tudo" },
];

interface OliveWaveProps {
  /**
   * Desliga o wash olive local + lime glow que dominam o fundo. Usado
   * na LP `/`, onde a dobra fica dentro de <BgDobra> e é o ia-bg
   * (grid/glow/sparks/sweep) que carrega o fundo — os efeitos locais
   * competiam com ele. LP-B/C mantém o comportamento antigo (default).
   */
  plainBg?: boolean;
  /**
   * Bloco adicional renderizado dentro da mesma section, abaixo do
   * conteúdo principal. Usado na LP `/` pra empurrar o carrossel de
   * logos (ClientLogos) pra dentro dessa dobra em vez de deixar ele
   * como uma dobra própria só com o carrossel.
   */
  children?: ReactNode;
}

/**
 * OliveWave — dobra de "diagnóstico". Reformulada como fluxo visual:
 * as 3 disfunções (time / cliente / fechamento) viraram cards com
 * numeração conectados por setas horizontais, um conector vertical
 * (linha + chevron) desce do fluxo até a punchline, e o disclaimer é
 * folded logo abaixo pra fechar o argumento. Aplica em todas as
 * 3 LPs Business.
 */
export function OliveWave({ plainBg = false, children }: OliveWaveProps = {}) {
  return (
    <section className="relative pt-[120px] pb-[140px] lg:pt-[160px] lg:pb-[180px] overflow-hidden">
      {!plainBg && (
        <>
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
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-[400px] w-[800px] rounded-full ia-anim-shimmer"
            style={{
              background:
                "radial-gradient(ellipse at center, oklch(0.95 0.22 115 / 0.35) 0%, transparent 65%)",
              filter: "blur(60px)",
            }}
          />
        </>
      )}

      <div className="container-page relative">
        <div className="text-center max-w-[900px] mx-auto">
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
              className="h-mix mt-7 text-[32px] sm:text-[42px] lg:text-[52px] tracking-tight"
              style={{ color: "oklch(0.97 0.012 110)" }}
            >
              O problema não é falta de esforço.
              <br />É <em style={{ color: "oklch(0.88 0.20 118)" }}>rotina manual demais.</em>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p
              className="mt-6 text-[13px] uppercase tracking-[0.18em] font-semibold"
              style={{ color: "oklch(0.96 0.012 110 / 0.55)" }}
            >
              O ciclo que se repete todo mês
            </p>
          </Reveal>
        </div>

        {/* Fluxo — 3 cards conectados por setas horizontais (desktop) /
            verticais (mobile). Cada card tem número, label e statement. */}
        <Reveal delay={0.15}>
          <div className="mt-10 lg:mt-12 max-w-[1000px] mx-auto flex flex-col lg:flex-row items-stretch justify-center gap-3 lg:gap-2">
            {STATEMENTS.map((s, i) => (
              <div key={s.n} className="flex flex-col lg:flex-row items-center lg:flex-1">
                <div
                  className="w-full lg:flex-1 rounded-xl p-5 lg:p-6 text-left"
                  style={{
                    backgroundColor: "oklch(0.96 0.012 110 / 0.04)",
                    border: "1px solid oklch(0.96 0.012 110 / 0.14)",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  <p
                    className="text-[11px] uppercase tracking-[0.14em] font-bold"
                    style={{ color: "oklch(0.88 0.20 118)" }}
                  >
                    {s.n}
                  </p>
                  <p
                    className="mt-3 text-[13px] uppercase tracking-[0.08em] font-semibold"
                    style={{ color: "oklch(0.96 0.012 110 / 0.6)" }}
                  >
                    {s.label}
                  </p>
                  <p
                    className="mt-1 text-[20px] lg:text-[22px] font-bold tracking-tight leading-tight"
                    style={{ color: "oklch(0.97 0.012 110)" }}
                  >
                    {s.highlight}.
                  </p>
                </div>

                {/* Seta conectando cards — horizontal no desktop,
                    vertical no mobile, oculta no último */}
                {i < STATEMENTS.length - 1 && (
                  <div
                    aria-hidden
                    className="flex items-center justify-center shrink-0 py-2 lg:py-0 lg:px-2"
                    style={{ color: "oklch(0.88 0.20 118 / 0.7)" }}
                  >
                    <ArrowRight className="hidden lg:block h-5 w-5" strokeWidth={2.2} />
                    <ChevronDown className="lg:hidden h-5 w-5" strokeWidth={2.2} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </Reveal>

        {/* Conector vertical do fluxo pra punchline — linha sutil + chevron */}
        <Reveal delay={0.22}>
          <div className="flex flex-col items-center mt-8 lg:mt-10">
            <div
              aria-hidden
              style={{
                width: "1px",
                height: "40px",
                background:
                  "linear-gradient(to bottom, oklch(0.96 0.012 110 / 0.35) 0%, oklch(0.88 0.20 118 / 0.55) 100%)",
              }}
            />
            <ChevronDown
              className="h-4 w-4 -mt-1"
              strokeWidth={2.4}
              style={{ color: "oklch(0.88 0.20 118 / 0.8)" }}
            />
          </div>
        </Reveal>

        <div className="text-center max-w-[820px] mx-auto">
          {/* Punchline */}
          <Reveal delay={0.28}>
            <p
              className="mt-6 lg:mt-8 text-[24px] sm:text-[30px] lg:text-[38px] font-bold leading-[1.2] tracking-tight"
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

          <Reveal delay={0.33}>
            <p
              className="mt-5 text-[14px] leading-[1.6] max-w-[560px] mx-auto"
              style={{ color: "oklch(0.96 0.012 110 / 0.7)" }}
            >
              Mais carteira significa mais gente, mais custo e mais retrabalho. Sem automação, a
              margem some no meio do caminho.
            </p>
          </Reveal>
        </div>
      </div>

      {children && <div className="relative mt-40 lg:mt-56">{children}</div>}
    </section>
  );
}
