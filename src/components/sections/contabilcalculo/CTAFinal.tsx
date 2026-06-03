import { Reveal } from "@/components/Reveal";
import { ArrowRight } from "lucide-react";

/**
 * Seção 9 do brief — CTA Final.
 * "3 minutos. R$ 0. A conta aberta na sua tela."
 */
export function CTAFinal() {
  return (
    <section id="cta-final" className="section-veil py-[100px] lg:py-[140px]">
      <div className="container-page">
        <div className="max-w-[820px] mx-auto text-center">
          <Reveal>
            <h2 className="h-mix text-[36px] sm:text-[48px] lg:text-[60px] text-foreground leading-[1.05]">
              3 minutos. <em>R$ 0.</em> A conta aberta na sua tela.
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-6 text-[16px] lg:text-[18px] text-sage leading-[1.65] max-w-[600px] mx-auto">
              Você não precisa decidir nada agora sobre IA. Precisa saber o tamanho do problema.
              Depois, com o número na mão, você decide se vale ou não a pena.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 flex justify-center">
              <a href="#calculadora" className="cta-primary">
                Fazer meu diagnóstico gratuito
                <span className="arrow">
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                </span>
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-5 text-[12px] uppercase tracking-[0.18em] font-semibold text-muted-foreground">
              Sem cartão · Sem compromisso · Resultado em até 3 minutos
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
