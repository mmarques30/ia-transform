import { Reveal } from "@/components/Reveal";
import { ArrowRight } from "lucide-react";

/**
 * Manifesto — abertura da /contabilcalculo no formato one-page art-director.
 *
 * Sem chip "eyebrow" tradicional — usa margin meta + número de spread
 * "01" como design. H1 ASSIMÉTRICO à esquerda (não centralizado),
 * mockup full-width abaixo, stats strip como separador editorial.
 *
 * Bg charcoal padrão (sem section-veil) — cria continuidade com as
 * próximas dobras no flow one-page.
 */

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="h-[72px]" aria-hidden />

      {/* Glow olive sutil no topo */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 inset-x-0 h-[70%]"
        style={{
          background:
            "radial-gradient(ellipse 65% 60% at 50% 0%, oklch(0.75 0.20 122 / 0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative pt-[40px] lg:pt-[56px] pb-[100px] lg:pb-[140px]">
        <div className="container-page relative">
          {/* Top meta — design editorial em vez de chip */}
          <Reveal>
            <div className="flex items-start justify-between gap-4 mb-12 lg:mb-20">
              <p className="text-[10.5px] uppercase tracking-[0.22em] font-semibold text-muted-foreground leading-tight max-w-[260px]">
                IAplicada · Diagnóstico contábil
                <br />
                <span className="opacity-60">2025 · Versão calculadora</span>
              </p>
              <p
                className="num-display text-[20px] lg:text-[24px] leading-none"
                style={{
                  color: "var(--color-primary)",
                  letterSpacing: "-0.02em",
                }}
              >
                01
              </p>
            </div>
          </Reveal>

          {/* H1 ASSIMÉTRICO — alinhado à esquerda, mistura sans + italic */}
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16 items-end">
            <div>
              <h1 className="h-mix text-[36px] sm:text-[48px] lg:text-[64px] leading-[0.96] tracking-[-0.025em] text-foreground">
                Em <em>3 minutos</em>,
                <br />
                quantas horas
                <br />
                <span className="text-muted-foreground/80">(e quantos R$)</span>
                <br />
                seu escritório
                <br />
                <em>recupera com IA.</em>
              </h1>
            </div>

            {/* Coluna direita — sub + CTA + microcopy */}
            <div className="lg:pb-4">
              <Reveal delay={0.1}>
                <p className="text-[15px] lg:text-[17px] text-sage leading-[1.55]">
                  Diagnóstico gratuito. Conta aberta na tela. Sem cartão, sem cadastro.
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <div className="mt-7 lg:mt-9">
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
                  100% grátis · 3 minutos
                </p>
              </Reveal>
            </div>
          </div>

          {/* MOCKUP full-width abaixo */}
          <Reveal delay={0.28}>
            <div className="mt-16 lg:mt-24 max-w-[1080px] mx-auto">
              <LaptopWithTablet />
            </div>
          </Reveal>

          {/* STRIP de stats — separador editorial */}
          <Reveal delay={0.36}>
            <div className="mt-16 lg:mt-24 pt-7 border-t border-border grid grid-cols-3 gap-4 lg:gap-12 max-w-[920px] mx-auto">
              <StatLine value="+700" label="Profissionais usando IAplicada" />
              <StatLine value="+100" label="Empresas no ecossistema" />
              <StatLine value="8 sem" label="Até o time operar sozinho" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function LaptopWithTablet() {
  return (
    <div className="relative">
      <div
        className="relative rounded-[14px] overflow-hidden"
        style={{
          backgroundColor: "oklch(0.10 0.012 122)",
          border: "1px solid oklch(0.55 0.06 122 / 0.45)",
          boxShadow:
            "0 40px 100px -40px oklch(0 0 0 / 0.7), 0 0 100px -40px oklch(0.75 0.20 122 / 0.35)",
        }}
      >
        <div
          className="flex items-center gap-3 px-4 py-2.5"
          style={{
            backgroundColor: "oklch(0.13 0.015 122)",
            borderBottom: "1px solid oklch(0.55 0.06 122 / 0.3)",
          }}
        >
          <span className="flex gap-1.5">
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: "oklch(0.65 0.18 25)" }}
            />
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: "oklch(0.75 0.16 80)" }}
            />
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: "oklch(0.65 0.18 135)" }}
            />
          </span>
          <span
            className="hidden sm:inline-block flex-1 max-w-[280px] mx-auto text-center text-[10.5px] font-medium rounded px-3 py-1"
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
        className="absolute -bottom-6 -right-2 sm:-bottom-8 sm:-right-4 lg:-bottom-12 lg:-right-12 w-[38%] sm:w-[32%] lg:w-[28%] rounded-[10px] overflow-hidden"
        style={{
          backgroundColor: "oklch(0.10 0.012 122)",
          border: "1px solid oklch(0.55 0.06 122 / 0.5)",
          boxShadow:
            "0 24px 60px -20px oklch(0 0 0 / 0.65), 0 0 40px -10px oklch(0.75 0.20 122 / 0.3)",
          padding: "6px",
        }}
      >
        <img
          src="/clients/recuperacao-tributaria-varejo.webp"
          alt="Diagnóstico de recuperação tributária rodando no tablet"
          loading="lazy"
          decoding="async"
          className="w-full h-auto block rounded-[6px]"
          style={{ display: "block" }}
        />
      </div>
    </div>
  );
}

function StatLine({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p
        className="num-display text-[26px] sm:text-[34px] lg:text-[42px] leading-none"
        style={{ color: "var(--color-primary)", letterSpacing: "-0.02em" }}
      >
        {value}
      </p>
      <p className="mt-2 text-[11px] lg:text-[12px] uppercase tracking-[0.16em] font-semibold text-muted-foreground leading-tight">
        {label}
      </p>
    </div>
  );
}
