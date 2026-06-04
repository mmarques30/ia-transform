import { Reveal } from "@/components/Reveal";
import { ArrowRight } from "lucide-react";

/**
 * CTAFinal — fechamento com display type ainda mais oversized que o
 * hero, criando ascending visual ao final da página. Headline ocupa
 * a tela toda. Glow olive sutil. CTA único.
 */
export function CTAFinal() {
  return (
    <section
      id="cta-final"
      className="relative py-[140px] lg:py-[200px] overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 65% 65% at 50% 50%, oklch(0.75 0.20 122 / 0.14) 0%, transparent 70%)",
        }}
      />

      <div className="container-page relative">
        <div className="max-w-[1200px]">
          <Reveal>
            <p
              className="text-[11px] uppercase tracking-[0.28em] font-bold"
              style={{ color: "var(--color-primary)" }}
            >
              O próximo passo
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2
              className="h-mix mt-7 lg:mt-9 text-[44px] sm:text-[64px] lg:text-[104px] leading-[0.92] text-foreground"
              style={{ letterSpacing: "-0.04em" }}
            >
              Você não precisa
              <br />
              decidir nada agora.
              <br />
              <em>Precisa do número.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-10 lg:mt-14 text-[17px] lg:text-[20px] text-sage leading-[1.55] max-w-[560px]">
              3 minutos. Conta aberta. Sem cartão.
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <div className="mt-12 lg:mt-16">
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
