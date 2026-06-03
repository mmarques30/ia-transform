import { Reveal } from "@/components/Reveal";
import { ArrowRight } from "lucide-react";

/**
 * Manifesto — abertura editorial centralizada + mockup laptop+tablet
 * abaixo (estilo Systems da /contabil).
 *
 * Decisões corrigidas:
 *  - Bg: brand charcoal (hue 122) — não warm sepia
 *  - Mockup: composição real laptop com chrome + tablet flutuante
 *    (igual modelo Systems da /contabil)
 *  - SEM pill "+81h" flutuando — só copy + mockup limpo
 *  - Layout vertical: h1 centralizado + mockup full-width abaixo
 *    (não 2-col com cards desproporcionais lateral)
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

      <div className="relative pt-[40px] lg:pt-[64px] pb-[80px] lg:pb-[110px]">
        <div className="container-page relative">
          {/* TOP — copy centralizada */}
          <div className="max-w-[920px] mx-auto text-center">
            <Reveal>
              <p className="text-[11.5px] uppercase tracking-[0.22em] font-semibold text-muted-foreground">
                IAplicada · Inteligência artificial para escritório contábil
              </p>
            </Reveal>

            <h1 className="h-mix mt-7 lg:mt-9 text-[40px] sm:text-[58px] lg:text-[76px] leading-[0.96] tracking-[-0.025em] text-foreground">
              Em <em>3 minutos</em>, quantas horas{" "}
              <span className="text-muted-foreground/85">(e quantos R$)</span> seu escritório
              recupera com IA.
            </h1>

            <Reveal delay={0.12}>
              <p className="mt-7 lg:mt-9 text-[16px] lg:text-[19px] text-sage leading-[1.55] max-w-[640px] mx-auto">
                Diagnóstico gratuito. Conta aberta na tela. Sem cartão.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-10 lg:mt-12 flex justify-center">
                <a href="#calculadora" className="cta-primary">
                  Fazer meu diagnóstico
                  <span className="arrow">
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </span>
                </a>
              </div>
            </Reveal>
          </div>

          {/* MOCKUP — laptop + tablet flutuante, centralizado abaixo */}
          <Reveal delay={0.28}>
            <div className="mt-16 lg:mt-24 max-w-[1080px] mx-auto">
              <LaptopWithTablet />
            </div>
          </Reveal>

          {/* STRIP de stats — separador editorial */}
          <Reveal delay={0.36}>
            <div className="mt-16 lg:mt-20 pt-7 border-t border-border grid grid-cols-3 gap-4 lg:gap-12 max-w-[920px] mx-auto">
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

/**
 * Composição: laptop com chrome (traffic-light dots + URL bar) com
 * dashboard PSA Agro dentro + tablet flutuante no canto inferior
 * direito com dashboard varejo. Estilo do modelo que o user pediu.
 */
function LaptopWithTablet() {
  return (
    <div className="relative">
      {/* LAPTOP */}
      <div
        className="relative rounded-[14px] overflow-hidden"
        style={{
          backgroundColor: "oklch(0.10 0.012 122)",
          border: "1px solid oklch(0.55 0.06 122 / 0.45)",
          boxShadow:
            "0 40px 100px -40px oklch(0 0 0 / 0.7), 0 0 100px -40px oklch(0.75 0.20 122 / 0.35)",
        }}
      >
        {/* Chrome bar — macOS dots + URL */}
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

        {/* Image */}
        <img
          src="/clients/psa-consultores-agro.webp"
          alt="Sistema operacional da PSA Consultores rodando com IAplicada"
          loading="lazy"
          decoding="async"
          className="w-full h-auto block"
          style={{ display: "block" }}
        />
      </div>

      {/* TABLET flutuante */}
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
