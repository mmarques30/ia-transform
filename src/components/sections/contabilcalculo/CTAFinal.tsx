import { Reveal } from "@/components/Reveal";
import { ArrowRight } from "lucide-react";

/**
 * Spread 06 — Fechamento.
 *
 * Manifesto curto + CTA único. Sem stats, sem listas, sem CTA secundário.
 * Encerra a página com um statement potente.
 */
export function CTAFinal() {
  return (
    <section
      id="cta-final"
      className="relative py-[100px] lg:py-[160px] overflow-hidden"
    >
      {/* Glow sutil pra dar peso ao fechamento */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, oklch(0.75 0.20 122 / 0.12) 0%, transparent 70%)",
        }}
      />

      <div className="container-page relative">
        {/* Header de spread */}
        <Reveal>
          <div className="flex items-start justify-between gap-4 mb-12 lg:mb-16">
            <p className="text-[10.5px] uppercase tracking-[0.22em] font-semibold text-muted-foreground leading-tight">
              Spread 06 · Decisão
            </p>
            <p
              className="num-display text-[20px] lg:text-[24px] leading-none"
              style={{ color: "var(--color-primary)", letterSpacing: "-0.02em" }}
            >
              06
            </p>
          </div>
        </Reveal>

        <div className="max-w-[1000px]">
          <Reveal>
            <h2 className="h-mix text-[32px] sm:text-[44px] lg:text-[60px] leading-[0.96] tracking-[-0.025em] text-foreground">
              Você não precisa decidir
              <br />
              nada agora.
              <br />
              <em>Precisa do número.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-9 lg:mt-12 text-[16px] lg:text-[19px] text-sage leading-[1.55] max-w-[560px]">
              3 minutos. Conta aberta. Sem cartão.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-12 lg:mt-14">
              <a href="#calculadora" className="cta-primary">
                Fazer meu diagnóstico
                <span className="arrow">
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                </span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
