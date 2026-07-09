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
        className="relative overflow-hidden pb-[64px] lg:pb-[110px] pt-[36px] lg:pt-[56px]"
        style={{
          background:
            "radial-gradient(120% 90% at 100% 40%, rgba(200,224,64,0.08), transparent 60%)",
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
          <div className="grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-16 items-center">
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

              <Reveal delay={0.05}>
                <h1
                  className="mt-8 lg:mt-10 text-[32px] sm:text-[48px] lg:text-[62px] font-extrabold leading-[1.03] tracking-[-0.03em] text-foreground"
                  style={{ textWrap: "balance" }}
                >
                  Sua operação <span style={{ color: "var(--color-primary)" }}>pode rodar</span>{" "}
                  sozinha em até <span style={{ color: "var(--color-primary)" }}>60 dias.</span>
                </h1>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="mt-6 lg:mt-7 text-[15.5px] lg:text-[17px] text-sage leading-[1.55] max-w-[500px]">
                  Mais de <strong className="text-foreground font-bold">40 empresas</strong> — de
                  arquitetura a turismo — já entregaram planilha, whatsapp e retrabalho pra um
                  sistema próprio. Entenda como a sua pode também.
                </p>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="mt-9 lg:mt-10">
                  <CtaGlow shape="pill" size="xl">
                    Quero o diagnóstico do meu negócio
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
          className="relative mt-12 lg:mt-16 py-6 lg:py-7 px-6 text-center"
          style={{
            background: "linear-gradient(180deg, transparent, rgba(0,0,0,0.35))",
            borderTop: "1px solid rgba(200,224,64,0.15)",
          }}
        >
          <p
            className="text-[16px] sm:text-[20px] lg:text-[24px] leading-tight"
            style={{ fontFamily: '"Instrument Serif", serif', color: "#f4f5ec" }}
          >
            <em>Processo mapeado</em>
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
            <em>Operação que roda sozinha.</em>
          </p>
        </div>
      </section>
    </>
  );
}
