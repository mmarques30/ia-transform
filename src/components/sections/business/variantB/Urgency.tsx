import { Reveal } from "@/components/Reveal";
import { CtaGlow } from "@/components/sections/business/variantB/CtaGlow";

/**
 * Urgency (LP-B) — banda de escassez.
 *
 * Reframada de novo depois do feedback: "a implementação não é feita
 * por mim, é pelo time da IAplicada" + "ajuste o quanto de informação".
 *
 * Antes o texto sugeria que a Mari fazia a implementação direto —
 * inaplicável, os projetos são conduzidos pelo time. Diagnóstico
 * sim é feito com a Mari; implementação vai pelo time.
 *
 * Copy simplificada: h2 sobre custo de esperar (mantido, funciona),
 * paragrafo introdutório reduzido, card do próximo ciclo com uma
 * frase curta explicando a cadência.
 *
 * Nota: o mês/ano do próximo ciclo é hard-coded aqui. Atualizar
 * manualmente conforme o ciclo real corre.
 */
const NEXT_COHORT_MONTH = "Agosto";
const NEXT_COHORT_YEAR = "2026";

export function Urgency() {
  return (
    <section
      id="urgencia"
      className="relative"
      style={{
        background:
          "radial-gradient(80% 100% at 50% 0%, rgba(239, 68, 68, 0.12), transparent 60%), #0f1109",
        borderTop: "1px solid rgba(239, 68, 68, 0.3)",
        borderBottom: "1px solid rgba(239, 68, 68, 0.3)",
      }}
    >
      <div className="container-page py-[64px] lg:py-[90px] text-center">
        <Reveal>
          <p
            className="text-[11px] lg:text-[12px] uppercase tracking-[0.22em] font-bold"
            style={{
              color: "#ef4444",
              fontFamily: '"JetBrains Mono", ui-monospace, Menlo, monospace',
            }}
          >
            Custo de esperar
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <h2
            className="mt-4 font-extrabold uppercase text-[26px] sm:text-[34px] lg:text-[44px] leading-[1.05] tracking-[-0.02em] max-w-[820px] mx-auto text-foreground"
            style={{ textWrap: "balance" }}
          >
            Cada mês travado no operacional{" "}
            <span style={{ color: "#ef4444" }}>é dinheiro escapando da sua empresa.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="mt-6 text-[14.5px] lg:text-[15.5px] text-sage leading-[1.6] max-w-[620px] mx-auto">
            Enquanto a operação depende de você, é você o teto do faturamento. Cada mês assim é uma
            conta que não fecha.
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <div
            className="mt-9 mx-auto max-w-[520px] p-6 lg:p-7 rounded-xl text-left"
            style={{
              background: "rgba(20, 24, 13, 0.7)",
              border: "1px solid rgba(200,224,64,0.25)",
              boxShadow: "0 20px 40px -20px rgba(0,0,0,0.5)",
            }}
          >
            <p
              className="text-[10px] uppercase tracking-[0.22em] font-bold"
              style={{
                color: "var(--color-primary)",
                fontFamily: '"JetBrains Mono", ui-monospace, Menlo, monospace',
              }}
            >
              Próximo ciclo de implementação
            </p>
            <p
              className="mt-2 text-[42px] sm:text-[52px] lg:text-[64px] leading-none italic"
              style={{
                fontFamily: '"Instrument Serif", serif',
                color: "var(--color-primary)",
                fontWeight: 500,
                letterSpacing: "-0.02em",
              }}
            >
              {NEXT_COHORT_MONTH}{" "}
              <span className="not-italic text-sage text-[24px] sm:text-[30px] lg:text-[36px] font-normal">
                / {NEXT_COHORT_YEAR}
              </span>
            </p>
            <p className="mt-4 text-[13.5px] lg:text-[14px] text-sage leading-[1.55]">
              Diagnóstico feito com a <strong className="text-foreground font-bold">Mari</strong>.
              Implementação conduzida pelo{" "}
              <strong className="text-foreground font-bold">time IAplicada</strong>, com marcos
              semanais. Quem começa agora entra no ciclo de{" "}
              <strong className="text-foreground font-bold">
                {NEXT_COHORT_MONTH.toLowerCase()}
              </strong>
              .
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mt-10">
            <CtaGlow size="lg">Entrar no próximo ciclo →</CtaGlow>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
