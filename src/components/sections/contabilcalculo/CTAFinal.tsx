import { Reveal } from "@/components/Reveal";
import { ArrowRight } from "lucide-react";

/**
 * Fechamento editorial — manifesto curto + CTA. Sem caption, sem
 * lista, sem stats. Foco na frase que decide.
 */
const SECTION_BG = "oklch(0.13 0.018 122)";

export function CTAFinal() {
  return (
    <section
      id="cta-final"
      className="relative py-[100px] lg:py-[160px] overflow-hidden"
      style={{ backgroundColor: SECTION_BG }}
    >
      {/* Glow sutil pra dar peso ao fechamento */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, oklch(0.75 0.20 122 / 0.10) 0%, transparent 70%)",
        }}
      />

      <div className="container-page relative">
        <div className="max-w-[920px] mx-auto text-center">
          <Reveal>
            <h2 className="h-mix text-[36px] sm:text-[52px] lg:text-[72px] leading-[0.98] tracking-[-0.025em] text-foreground">
              Você não precisa decidir nada agora.
              <br />
              <em>Precisa do número.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-9 text-[16px] lg:text-[18px] text-sage leading-[1.55] max-w-[560px] mx-auto">
              3 minutos. Conta aberta. Sem cartão.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-12 lg:mt-14 flex justify-center">
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
