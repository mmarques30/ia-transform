import { Reveal } from "@/components/Reveal";
import { CtaGlow } from "@/components/sections/business/variantB/CtaGlow";
import { PainelClientesShowcase } from "@/components/sections/business/variantB/painel/PainelClientesShowcase";

/**
 * AppShowcase (LP-A) — carrossel de painéis com copy própria.
 *
 * Reusa PainelClientesShowcase da v2 (3 painéis de demonstração).
 * Copy do topo adaptada pro ângulo LP-A: "sua operação roda sem estar
 * no meio de tudo" + "sem planilha, sem WhatsApp de emergência, sem
 * retrabalho".
 */

export function AppShowcase() {
  return (
    <section id="sistema-app" className="section-veil py-[80px] lg:py-[110px]">
      <div className="container-page">
        <div className="max-w-[820px] mx-auto text-center">
          <Reveal>
            <span
              className="inline-block px-3.5 py-1.5 rounded-full text-[11px] tracking-[0.2em] uppercase font-bold"
              style={{
                border: "1px solid rgba(200,224,64,0.4)",
                background: "rgba(200,224,64,0.06)",
                color: "var(--color-primary)",
                fontFamily: '"JetBrains Mono", ui-monospace, Menlo, monospace',
              }}
            >
              O que seu time usa depois que a gente constrói
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2
              className="mt-5 font-extrabold text-[28px] sm:text-[36px] lg:text-[42px] leading-[1.05] tracking-[-0.025em] text-foreground"
              style={{ textWrap: "balance" }}
            >
              Sua operação roda. Seu time entrega.{" "}
              <em
                style={{
                  fontFamily: '"Instrument Serif", serif',
                  color: "var(--color-primary)",
                  fontWeight: 500,
                }}
              >
                Você acompanha tudo sem estar no meio de tudo.
              </em>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-5 text-[15px] lg:text-[16px] text-sage leading-[1.6] max-w-[560px] mx-auto">
              <strong className="text-foreground font-bold">
                Sem planilha, sem WhatsApp de emergência, sem retrabalho.
              </strong>
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="mt-10 max-w-[880px] mx-auto">
            <PainelClientesShowcase />
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-12 text-center">
            <CtaGlow size="md">Ver como funciona →</CtaGlow>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
