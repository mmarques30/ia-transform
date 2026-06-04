import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { useDiagnostico } from "./DiagnosticoContext";

/**
 * CTAFinal — fechamento centralizado. Display type reduzido pra
 * harmonizar com o resto da página (não mais ascending 104px).
 * Sem paragraph extra "3 minutos. Conta aberta. Sem cartão." —
 * a página inteira já comunicou isso.
 */
export function CTAFinal() {
  const { open } = useDiagnostico();
  return (
    <section
      id="cta-final"
      className="relative py-[120px] lg:py-[160px] overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 65% at 50% 50%, oklch(0.75 0.20 122 / 0.13) 0%, transparent 70%)",
        }}
      />

      <div className="container-page relative">
        <div className="max-w-[860px] mx-auto text-center">
          <Reveal>
            <h2
              className="h-mix text-[36px] sm:text-[48px] lg:text-[68px] leading-[1.0] text-foreground"
              style={{ letterSpacing: "-0.032em" }}
            >
              Você não precisa decidir nada agora.
              {" "}
              <em>Precisa do número.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-10 lg:mt-12">
              <button type="button" onClick={open} className="cta-primary">
                Fazer meu diagnóstico
                <span className="arrow">
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                </span>
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
