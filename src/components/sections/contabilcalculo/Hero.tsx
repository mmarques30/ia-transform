import { Reveal } from "@/components/Reveal";
import { ArrowRight } from "lucide-react";

/**
 * Hero da /contabilcalculo.
 *
 * Sem top meta + sem numeração — entra direto na proposta.
 * Layout 2-col equilibrado: copy à esquerda + mockup laptop+tablet
 * lateral à direita como complemento (não dominante).
 */

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="h-[72px]" aria-hidden />

      <div
        aria-hidden
        className="pointer-events-none absolute top-0 inset-x-0 h-[70%]"
        style={{
          background:
            "radial-gradient(ellipse 65% 60% at 50% 0%, oklch(0.75 0.20 122 / 0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative pt-[48px] lg:pt-[80px] pb-[80px] lg:pb-[120px]">
        <div className="container-page relative">
          {/* GRID 2-col equilibrado: copy esquerda, mockup direita */}
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-14 items-center">
            {/* COPY — esquerda */}
            <div>
              <Reveal>
                <h1 className="h-mix text-[40px] sm:text-[54px] lg:text-[72px] leading-[0.96] tracking-[-0.025em] text-foreground">
                  Em <em>3 minutos</em>, quantas horas{" "}
                  <span className="text-muted-foreground/85">(e quantos R$)</span> seu
                  escritório recupera com IA.
                </h1>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="mt-7 lg:mt-9 text-[16px] lg:text-[18px] text-sage leading-[1.55] max-w-[520px]">
                  Diagnóstico gratuito. Conta aberta na tela. Sem cartão, sem cadastro.
                </p>
              </Reveal>

              <Reveal delay={0.18}>
                <div className="mt-9 lg:mt-11">
                  <a href="#calculadora" className="cta-primary">
                    Fazer meu diagnóstico
                    <span className="arrow">
                      <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                    </span>
                  </a>
                </div>
              </Reveal>

              <Reveal delay={0.24}>
                <p className="mt-5 text-[10.5px] uppercase tracking-[0.2em] font-semibold text-muted-foreground">
                  100% grátis · 3 minutos · Sem cartão
                </p>
              </Reveal>
            </div>

            {/* MOCKUP — direita, complementar (não dominante) */}
            <Reveal delay={0.18}>
              <LaptopWithTablet />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function LaptopWithTablet() {
  return (
    <div className="relative">
      <div
        className="relative rounded-[12px] overflow-hidden"
        style={{
          backgroundColor: "oklch(0.10 0.012 122)",
          border: "1px solid oklch(0.55 0.06 122 / 0.45)",
          boxShadow:
            "0 30px 70px -30px oklch(0 0 0 / 0.65), 0 0 70px -30px oklch(0.75 0.20 122 / 0.32)",
        }}
      >
        <div
          className="flex items-center gap-3 px-3.5 py-2"
          style={{
            backgroundColor: "oklch(0.13 0.015 122)",
            borderBottom: "1px solid oklch(0.55 0.06 122 / 0.3)",
          }}
        >
          <span className="flex gap-1.5">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: "oklch(0.65 0.18 25)" }}
            />
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: "oklch(0.75 0.16 80)" }}
            />
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: "oklch(0.65 0.18 135)" }}
            />
          </span>
          <span
            className="hidden sm:inline-block flex-1 max-w-[220px] mx-auto text-center text-[10px] font-medium rounded px-2.5 py-0.5"
            style={{
              backgroundColor: "oklch(0.18 0.015 122)",
              color: "oklch(0.75 0.02 115)",
            }}
          >
            psaconsultores.com.br
          </span>
        </div>
        <img
          src="/clients/psa-consultores-agro.webp"
          alt="Sistema operacional da PSA Consultores rodando com IAplicada"
          loading="lazy"
          decoding="async"
          className="w-full h-auto block"
          style={{ display: "block" }}
        />
      </div>

      <div
        className="absolute -bottom-5 -right-3 lg:-bottom-8 lg:-right-8 w-[42%] sm:w-[36%] lg:w-[36%] rounded-[8px] overflow-hidden"
        style={{
          backgroundColor: "oklch(0.10 0.012 122)",
          border: "1px solid oklch(0.55 0.06 122 / 0.5)",
          boxShadow:
            "0 18px 44px -16px oklch(0 0 0 / 0.6), 0 0 30px -10px oklch(0.75 0.20 122 / 0.28)",
          padding: "5px",
        }}
      >
        <img
          src="/clients/recuperacao-tributaria-varejo.webp"
          alt="Diagnóstico de recuperação tributária rodando no tablet"
          loading="lazy"
          decoding="async"
          className="w-full h-auto block rounded-[4px]"
          style={{ display: "block" }}
        />
      </div>
    </div>
  );
}
