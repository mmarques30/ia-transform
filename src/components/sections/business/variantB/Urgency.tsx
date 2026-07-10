import { Reveal } from "@/components/Reveal";
import { CtaGlow } from "@/components/sections/business/variantB/CtaGlow";

/**
 * Urgency (LP-B) — banda de escassez.
 *
 * Feedback: "remova o card 'PRÓXIMO CICLO DE IMPLEMENTAÇÃO ·
 * Agosto/2026' inteiro. Não existe ciclo, turma nem data de entrada
 * — quem fecha, começa o projeto imediatamente."
 *
 * Estrutura enxuta agora:
 *   headline → parágrafo → linha de escassez → CTA
 *
 * A urgência fica em cima de dois vetores reais:
 *  1. Custo de inação (headline vermelha uppercase)
 *  2. Agenda da Mari (diagnóstico feito pessoalmente + poucas
 *     empresas/mês)
 *
 * Zero mecânica de cohort. Zero data inventada.
 *
 * Decorativo: texto gigante "AGORA" opacity 0.04 no bg, hidden
 * no mobile — só reforço visual, sem interação.
 */
export function Urgency() {
  return (
    <section
      id="urgencia"
      className="relative overflow-hidden"
      style={{
        background:
          "radial-gradient(80% 100% at 50% 0%, rgba(239, 68, 68, 0.12), transparent 60%), #0f1109",
        borderTop: "1px solid rgba(239, 68, 68, 0.3)",
        borderBottom: "1px solid rgba(239, 68, 68, 0.3)",
      }}
    >
      {/* Decorativo: AGORA gigante em segundo plano. Aria-hidden,
          hidden no mobile (viewports estreitas não têm espaço). */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden lg:flex items-center justify-center select-none"
        style={{
          fontSize: "min(30vw, 380px)",
          fontWeight: 900,
          letterSpacing: "-0.05em",
          color: "rgba(255,255,255,0.04)",
          fontFamily: '"Inter", system-ui, sans-serif',
          lineHeight: 1,
        }}
      >
        AGORA
      </div>

      <div className="container-page relative py-[64px] lg:py-[90px] text-center">
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
          <p
            className="mt-10 lg:mt-12 text-[14px] leading-[1.55] max-w-[620px] mx-auto"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            Diagnóstico conduzido{" "}
            <strong style={{ color: "#ffffff", fontWeight: 600 }}>pelo time IAplicada</strong> —
            poucas empresas por mês. Quem fecha,{" "}
            <strong style={{ color: "#ffffff", fontWeight: 600 }}>começa na mesma semana</strong>.
          </p>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mt-6 lg:mt-7">
            <CtaGlow size="lg">Quero meu diagnóstico →</CtaGlow>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
