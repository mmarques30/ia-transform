import { Reveal } from "@/components/Reveal";
import { ArrowRight } from "lucide-react";

/**
 * Hero da /contabilcalculo — versão D do review:
 * - Centralizado single-column, sem card lateral
 * - Wallpaper geométrico sutil (anéis concêntricos + grid de pontos)
 *   em olive low-opacity atrás do texto. Dá atmosfera de produto sem
 *   competir com a copy
 * - Stat-âncora gigante abaixo do CTA com outcome real: "escritórios
 *   de 5 colaboradores recuperam em média R$ 58.428/ano". Mostra
 *   vislumbre do resultado sem mockup sintético
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative pb-[80px] lg:pb-[120px] overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 60% 50% at 50% 0%, oklch(0.22 0.03 122 / 0.55) 0%, transparent 75%)",
      }}
    >
      <div className="h-[72px]" aria-hidden />

      {/* WALLPAPER GEOMÉTRICO — anéis concêntricos + grid de pontos
          em olive low-opacity. Dá presença atrás do texto sem virar
          card ou mockup. Desktop-only. */}
      <BlueprintBackground />

      <div className="relative pt-[56px] lg:pt-[88px] z-10">
        <div className="container-page relative">
          <div className="max-w-[920px] mx-auto text-center">
            <Reveal>
              <span className="label-chip">
                <span className="dot" />
                Inteligência artificial para escritório contábil
              </span>
            </Reveal>

            <h1 className="h-mix mt-7 lg:mt-8 text-[36px] sm:text-[52px] lg:text-[72px] leading-[0.98] tracking-[-0.02em] text-foreground">
              Em 3 minutos, descubra quantas <em>horas</em> (e quantos <em>R$</em>) seu
              escritório pode recuperar com IA.
            </h1>

            <Reveal delay={0.1}>
              <p className="mt-7 lg:mt-8 text-[16px] lg:text-[19px] text-sage leading-[1.55] max-w-[640px] mx-auto">
                Diagnóstico gratuito que mostra, com a conta aberta, onde sua equipe perde tempo
                em tarefas que a IA já automatiza.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-9 lg:mt-10 flex justify-center">
                <a href="#calculadora" className="cta-primary">
                  Fazer meu diagnóstico gratuito
                  <span className="arrow">
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </span>
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <p className="mt-5 text-[11.5px] uppercase tracking-[0.18em] font-semibold text-muted-foreground">
                100% gratuito · 3 minutos · Sem cartão
              </p>
            </Reveal>

            {/* STAT-ÂNCORA enxuta — só o número grande + 1 linha de
                contexto. Antes tinha 4 linhas (intro + caption + valor +
                outro), virou parede. */}
            <Reveal delay={0.32}>
              <div className="mt-14 lg:mt-16 max-w-[640px] mx-auto">
                <span
                  aria-hidden
                  className="block h-[1px] w-12 mx-auto mb-6"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, var(--color-primary), transparent)",
                  }}
                />
                <p
                  className="num-display text-[48px] sm:text-[64px] lg:text-[84px] leading-none"
                  style={{
                    color: "var(--color-primary)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  R$ 58.428/ano
                </p>
                <p className="mt-4 text-[12.5px] uppercase tracking-[0.18em] font-semibold text-muted-foreground">
                  média recuperada em escritórios com 5 colaboradores
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Wallpaper sutil — 3 anéis concêntricos centralizados + grid de pontos
 * de fundo. Tudo em olive translúcido pra dar atmosfera sem competir.
 */
function BlueprintBackground() {
  return (
    <>
      <svg
        aria-hidden
        className="hidden lg:block pointer-events-none absolute left-1/2 top-[120px] -translate-x-1/2 z-0"
        width="900"
        height="900"
        viewBox="0 0 900 900"
        style={{ opacity: 0.55 }}
      >
        <defs>
          <radialGradient id="hero-ring-fade" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.75 0.20 122)" stopOpacity="0.18" />
            <stop offset="100%" stopColor="oklch(0.55 0.08 125)" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Halo olive sutil no centro */}
        <circle cx="450" cy="450" r="380" fill="url(#hero-ring-fade)" />
        {/* Anéis concêntricos */}
        <circle
          cx="450"
          cy="450"
          r="200"
          fill="none"
          stroke="oklch(0.55 0.08 125 / 0.4)"
          strokeWidth="0.6"
        />
        <circle
          cx="450"
          cy="450"
          r="320"
          fill="none"
          stroke="oklch(0.55 0.08 125 / 0.28)"
          strokeWidth="0.6"
          strokeDasharray="2 6"
        />
        <circle
          cx="450"
          cy="450"
          r="430"
          fill="none"
          stroke="oklch(0.55 0.08 125 / 0.18)"
          strokeWidth="0.6"
          strokeDasharray="2 8"
        />
      </svg>

      {/* Grid de pontos de fundo — densidade leve, desktop only */}
      <div
        aria-hidden
        className="hidden lg:block pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, oklch(0.55 0.08 125 / 0.18) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(ellipse 70% 50% at 50% 40%, black 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 50% at 50% 40%, black 30%, transparent 80%)",
        }}
      />
    </>
  );
}
