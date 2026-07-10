import { Reveal } from "@/components/Reveal";
import { CtaGlow } from "@/components/sections/business/variantB/CtaGlow";
import { QualifierStrip } from "@/components/sections/business/variantB/QualifierStrip";
import { HeroMockup } from "@/components/sections/business/variantB/HeroMockup";

/**
 * Hero (LP-B refactor Acelerador) — refeito completo. Estrutura:
 *  - QualifierStrip vermelha topo (ICP faturamento >= R$1MM/ano)
 *  - grid 2 colunas: texto+CTA glow à esquerda, mockup do painel
 *    IAplicada rodando à direita, sem moldura visível (bleed pro bg)
 *  - manifesto rodapé (equação processo + sistema = operação)
 *
 * Sem form aberto. CTA leva pra /businessv2/diagnostico (rota separada).
 */
export function Hero() {
  return (
    <>
      <QualifierStrip />
      <section
        id="top"
        className="relative pb-[120px] lg:pb-[180px] pt-[60px] lg:pt-[100px]"
        style={{
          background:
            "radial-gradient(120% 90% at 100% 40%, rgba(200,224,64,0.08), transparent 60%)",
          minHeight: "780px",
          overflowX: "clip",
          overflowY: "visible",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute hidden lg:block"
          style={{
            top: "10%",
            right: "-8%",
            width: "55%",
            height: "72%",
            background:
              "radial-gradient(ellipse at center, oklch(0.75 0.20 122 / 0.24) 0%, transparent 60%)",
            filter: "blur(80px)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute hidden lg:block"
          style={{
            top: "20%",
            left: "-10%",
            width: "40%",
            height: "50%",
            background:
              "radial-gradient(ellipse at center, oklch(0.35 0.05 125 / 0.45) 0%, transparent 70%)",
            filter: "blur(70px)",
          }}
        />

        <div className="container-page relative">
          <div className="grid lg:grid-cols-[minmax(480px,46%)_1fr] gap-8 lg:gap-12 items-center">
            <div>
              <Reveal>
                <img
                  src="/brand/iaplicada-logo-dark.png"
                  alt="IAplicada"
                  height={28}
                  className="block"
                  style={{ height: 28, width: "auto" }}
                />
              </Reveal>

              <Reveal delay={0.03}>
                <p
                  className="mt-5 lg:mt-6 text-[11px] lg:text-[12px] uppercase tracking-[0.22em] font-bold"
                  style={{
                    color: "var(--color-primary)",
                    fontFamily: '"JetBrains Mono", ui-monospace, Menlo, monospace',
                  }}
                >
                  IAplicada · Sistemas de IA sob medida
                </p>
              </Reveal>

              {/* Headline: quebras controladas via <br> (3 linhas fixas
                  desktop). max-width 15ch + text-wrap: balance evita que
                  o browser recompute a quebra e escale acima de 15 chars
                  por linha. Mobile: text-wrap normal, quebra natural. */}
              <Reveal delay={0.05}>
                <h1
                  className="mt-5 font-extrabold text-foreground"
                  style={{
                    fontSize: "clamp(32px, 4.6vw, 64px)",
                    lineHeight: 1.04,
                    letterSpacing: "-0.03em",
                    maxWidth: "15ch",
                    textWrap: "balance",
                  }}
                >
                  Você foi feito para <br className="hidden lg:inline" />
                  <span style={{ color: "var(--color-primary)" }}>crescer a empresa,</span> não{" "}
                  <br className="hidden lg:inline" />
                  para <span style={{ color: "var(--color-primary)" }}>apagar incêndio.</span>
                </h1>
              </Reveal>

              <Reveal delay={0.08}>
                <p
                  className="text-[19px] sm:text-[22px] lg:text-[26px] leading-[1.15] tracking-[-0.015em] text-foreground"
                  style={{
                    marginTop: 24,
                    fontFamily: '"Instrument Serif", serif',
                    fontWeight: 500,
                  }}
                >
                  Em <em style={{ color: "var(--color-primary)" }}>90 dias</em> a gente te tira do
                  operacional.
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <p
                  className="text-[14.5px] lg:text-[15.5px] text-sage leading-[1.6]"
                  style={{ marginTop: 16, maxWidth: "46ch" }}
                >
                  Construímos sistemas de IA sob medida que colocam seu time para executar com
                  padrão. Você{" "}
                  <strong className="text-foreground font-bold">sai do dia a dia</strong> e foca em
                  fechar clientes, não em resolver problema interno.
                </p>
              </Reveal>

              <Reveal delay={0.15}>
                <div style={{ marginTop: 32 }}>
                  <CtaGlow shape="pill" size="xl">
                    Quero sair do operacional →
                  </CtaGlow>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.15}>
              <div className="mt-4 lg:mt-0">
                <HeroMockup />
              </div>
            </Reveal>
          </div>
        </div>

        <div
          className="relative mt-20 lg:mt-28 py-6 lg:py-8 px-6 text-center"
          style={{
            background: "linear-gradient(180deg, transparent, rgba(0,0,0,0.35))",
            borderTop: "1px solid rgba(200,224,64,0.15)",
          }}
        >
          <p
            className="text-[16px] sm:text-[20px] lg:text-[24px] leading-tight"
            style={{ fontFamily: '"Instrument Serif", serif', color: "#f4f5ec" }}
          >
            <em>Diagnóstico</em>
            <span
              className="mx-2 lg:mx-3 not-italic font-normal"
              style={{ color: "var(--color-primary)", fontFamily: "Inter, sans-serif" }}
            >
              +
            </span>
            <em>Sistema sob medida</em>
            <span
              className="mx-2 lg:mx-3 not-italic font-normal"
              style={{ color: "var(--color-primary)", fontFamily: "Inter, sans-serif" }}
            >
              =
            </span>
            <em>Você fora do operacional.</em>
          </p>
        </div>
      </section>
    </>
  );
}
