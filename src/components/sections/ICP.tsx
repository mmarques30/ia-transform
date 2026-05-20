import { Reveal } from "@/components/Reveal";
import { ArrowRight } from "lucide-react";

/**
 * ICP — bloco geométrico com clip-path nos cantos (mesma linguagem
 * angular da seção OliveWave). Stats em destaque + CTA pra Mentoria
 * pra quem não cabe no Business.
 */
export function ICP() {
  return (
    <section className="py-[60px] lg:py-[80px] bg-background">
      <div className="container-page">
        <div
          className="relative mx-auto max-w-[1080px] overflow-hidden [clip-path:polygon(24px_0,100%_0,100%_calc(100%-24px),calc(100%-24px)_100%,0_100%,0_24px)] lg:[clip-path:polygon(32px_0,100%_0,100%_calc(100%-32px),calc(100%-32px)_100%,0_100%,0_32px)]"
          style={{ backgroundColor: "oklch(0.18 0.02 122)" }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "linear-gradient(to right, oklch(1 0 0 / 0.7) 1px, transparent 1px), linear-gradient(to bottom, oklch(1 0 0 / 0.7) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              maskImage: "radial-gradient(ellipse 70% 90% at 50% 50%, black 30%, transparent 90%)",
            }}
          />

          <div className="relative px-8 py-10 lg:px-14 lg:py-14 grid lg:grid-cols-[1fr_auto] gap-10 items-center">
            <div>
              <Reveal>
                <p
                  className="text-[11px] uppercase tracking-[0.18em] font-semibold"
                  style={{ color: "oklch(0.85 0.18 122)" }}
                >
                  Pra quem é o Business
                </p>
              </Reveal>

              <div className="mt-6 grid grid-cols-2 gap-6 lg:gap-10 max-w-[560px]">
                <Reveal delay={0.05}>
                  <div>
                    <p
                      className="font-mono text-[32px] lg:text-[40px] leading-[1] tracking-tight whitespace-nowrap"
                      style={{ color: "oklch(0.97 0.02 115)" }}
                    >
                      30–100
                    </p>
                    <p
                      className="mt-2 text-[11px] uppercase tracking-[0.16em] font-semibold"
                      style={{ color: "oklch(0.97 0.02 115 / 0.55)" }}
                    >
                      Colaboradores
                    </p>
                  </div>
                </Reveal>
                <Reveal delay={0.1}>
                  <div>
                    <p
                      className="font-mono text-[32px] lg:text-[40px] leading-[1] tracking-tight whitespace-nowrap"
                      style={{ color: "oklch(0.97 0.02 115)" }}
                    >
                      R$5–50<span className="text-[22px] lg:text-[26px]">MM</span>
                    </p>
                    <p
                      className="mt-2 text-[11px] uppercase tracking-[0.16em] font-semibold"
                      style={{ color: "oklch(0.97 0.02 115 / 0.55)" }}
                    >
                      Faturamento/ano
                    </p>
                  </div>
                </Reveal>
              </div>

              <Reveal delay={0.15}>
                <p
                  className="mt-7 text-[16px] lg:text-[17px] leading-[1.55] max-w-[520px]"
                  style={{ color: "oklch(0.97 0.02 115 / 0.78)" }}
                >
                  Empresa de serviço que precisa parar de depender do dono no operacional.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.2}>
              <a
                href="https://academy.iaplicada.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-lg px-5 py-4 text-[13px] font-semibold transition-colors group"
                style={{
                  backgroundColor: "oklch(0.97 0.02 115)",
                  color: "oklch(0.18 0.02 122)",
                }}
              >
                <span className="flex flex-col items-start leading-tight">
                  <span
                    className="text-[10.5px] uppercase tracking-[0.14em] font-semibold"
                    style={{ color: "oklch(0.18 0.02 122 / 0.55)" }}
                  >
                    Empresa menor?
                  </span>
                  <span>Conheça a Mentoria 1:1</span>
                </span>
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  strokeWidth={2}
                />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
