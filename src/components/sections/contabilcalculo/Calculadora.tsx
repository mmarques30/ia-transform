import { Reveal } from "@/components/Reveal";
import { Calculator, ArrowRight } from "lucide-react";

/**
 * Placeholder da calculadora — vira o componente real na PR 2.
 *
 * Por enquanto serve como âncora pra os CTAs "Fazer meu diagnóstico"
 * + texto explicativo de que a ferramenta chega em breve. A âncora
 * #calculadora já existe e CTAs apontam pra cá.
 *
 * Quando o componente real ficar pronto (4 etapas: gate de contato
 * + sobre escritório + horas/tarefa + gargalo/maturidade + resultado),
 * substituir este arquivo inteiro mantendo o mesmo export Calculadora.
 */
export function Calculadora() {
  return (
    <section
      id="calculadora"
      className="section-veil py-[80px] lg:py-[140px] relative overflow-hidden scroll-mt-24"
    >
      <div className="container-page relative">
        <div className="max-w-[820px] mx-auto text-center">
          <Reveal>
            <span className="label-chip">
              <span className="dot" />
              Calculadora
            </span>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="h-mix mt-6 text-[32px] sm:text-[40px] lg:text-[52px] leading-[1.1] text-foreground">
              Quanto seu escritório <em>ganharia</em> com IA?
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 text-[15.5px] lg:text-[17px] text-sage leading-[1.6] max-w-[640px] mx-auto">
              4 etapas, 3 minutos. Resultado completo na tela com horas liberadas, economia
              mensal projetada e por onde começar.
            </p>
          </Reveal>

          {/* Placeholder visual da calculadora */}
          <Reveal delay={0.15}>
            <div
              className="mt-12 rounded-2xl border border-border p-10 lg:p-14"
              style={{ backgroundColor: "oklch(0.18 0.025 122 / 0.4)" }}
            >
              <div className="flex flex-col items-center">
                <span
                  className="inline-flex h-16 w-16 items-center justify-center rounded-2xl"
                  style={{
                    backgroundColor: "oklch(0.75 0.20 122 / 0.14)",
                    border: "1px solid oklch(0.75 0.20 122 / 0.4)",
                  }}
                >
                  <Calculator
                    className="h-7 w-7"
                    strokeWidth={2}
                    style={{ color: "var(--color-primary)" }}
                  />
                </span>
                <p className="mt-6 text-[18px] lg:text-[20px] font-semibold text-foreground">
                  Calculadora em desenvolvimento
                </p>
                <p className="mt-3 text-[14.5px] text-sage max-w-[440px]">
                  A ferramenta interativa chega em breve. Por enquanto, deixe seu contato e
                  retornamos com o diagnóstico personalizado.
                </p>
                <a href="https://wa.me/5511999999999" className="cta-primary mt-8">
                  Falar pelo WhatsApp
                  <span className="arrow">
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
