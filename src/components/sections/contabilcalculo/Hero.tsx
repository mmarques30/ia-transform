import { Reveal } from "@/components/Reveal";
import { ArrowRight } from "lucide-react";

/**
 * Hero — padrão nextsense.io adaptado IAplicada:
 * display type oversized + mockup com generoso whitespace + eyebrow
 * uppercase. Layout asymmetric 2-col 1.1fr/1fr no desktop, stack no
 * mobile. Branding (cores, fontes, container) preservado.
 */

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="h-[72px]" aria-hidden />

      {/* Glow olive sutil no topo */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 inset-x-0 h-[80%]"
        style={{
          background:
            "radial-gradient(ellipse 70% 65% at 50% 0%, oklch(0.75 0.20 122 / 0.13) 0%, transparent 70%)",
        }}
      />

      <div className="relative pt-[40px] lg:pt-[80px] pb-[80px] lg:pb-[140px]">
        <div className="container-page relative">
          {/* Grid asymmetric — copy ocupa coluna maior; mockup respira */}
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-center">
            <div>
              <Reveal>
                <span
                  className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] font-bold"
                  style={{ color: "var(--color-primary)" }}
                >
                  <span
                    aria-hidden
                    className="inline-block h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  />
                  IAplicada · Diagnóstico
                </span>
              </Reveal>

              {/* Display type — escala oversized inspirada no nextsense */}
              <Reveal delay={0.05}>
                <h1
                  className="h-mix mt-7 lg:mt-9 text-[42px] sm:text-[60px] lg:text-[88px] leading-[0.95] text-foreground"
                  style={{ letterSpacing: "-0.035em" }}
                >
                  Em <em>3 minutos</em>,
                  <br />
                  quantos R$
                  <br />
                  seu escritório <em>perde sem IA.</em>
                </h1>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="mt-7 lg:mt-10 text-[17px] lg:text-[20px] text-sage leading-[1.5] max-w-[480px]">
                  Diagnóstico gratuito tarefa por tarefa. Resultado na hora — com a conta
                  aberta de onde vem cada hora liberada.
                </p>
              </Reveal>

              <Reveal delay={0.18}>
                <div className="mt-9 lg:mt-12 flex flex-wrap items-center gap-6">
                  <a
                    href="#calculadora"
                    className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground font-semibold text-[15px] px-6 py-3.5 hover:bg-primary/90 transition-colors"
                  >
                    Fazer meu diagnóstico
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </a>
                  <span className="text-[12.5px] uppercase tracking-[0.18em] font-semibold text-muted-foreground">
                    3 min · sem cartão
                  </span>
                </div>
              </Reveal>
            </div>

            {/* Mockup com mais espaço — sem maxWidth restritiva */}
            <Reveal delay={0.18}>
              <HeroMockup />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroMockup() {
  return (
    <div className="relative">
      {/* Halo radial atrás do mockup */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, oklch(0.75 0.20 122 / 0.18) 0%, transparent 70%)",
        }}
      />

      <div
        className="relative rounded-[14px] overflow-hidden"
        style={{
          backgroundColor: "oklch(0.10 0.012 122)",
          border: "1px solid oklch(0.55 0.06 122 / 0.45)",
          boxShadow:
            "0 40px 80px -30px oklch(0 0 0 / 0.7), 0 0 60px -20px oklch(0.75 0.20 122 / 0.25)",
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
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "oklch(0.65 0.18 25)" }} />
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "oklch(0.75 0.16 80)" }} />
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "oklch(0.65 0.18 135)" }} />
          </span>
          <span
            className="hidden sm:inline-block flex-1 max-w-[240px] mx-auto text-center text-[10.5px] font-medium rounded px-2.5 py-0.5"
            style={{
              backgroundColor: "oklch(0.18 0.015 122)",
              color: "oklch(0.75 0.02 115)",
            }}
          >
            iaplicada.com/diagnostico
          </span>
        </div>
        <img
          src="/clients/psa-consultores-agro.webp"
          alt="Diagnóstico operacional rodando com IAplicada"
          loading="eager"
          decoding="async"
          className="w-full h-auto block"
          style={{ display: "block" }}
        />
      </div>

      {/* Mini-card flutuante embaixo direita — tablet com KPI */}
      <div
        className="absolute -bottom-8 -right-4 lg:-bottom-12 lg:-right-10 w-[40%] sm:w-[34%] lg:w-[38%] rounded-[10px] overflow-hidden"
        style={{
          backgroundColor: "oklch(0.10 0.012 122)",
          border: "1px solid oklch(0.55 0.06 122 / 0.5)",
          boxShadow:
            "0 22px 50px -18px oklch(0 0 0 / 0.7), 0 0 32px -10px oklch(0.75 0.20 122 / 0.3)",
          padding: "6px",
        }}
      >
        <img
          src="/clients/recuperacao-tributaria-varejo.webp"
          alt="Painel de recuperação tributária da IAplicada"
          loading="eager"
          decoding="async"
          className="w-full h-auto block rounded-[5px]"
          style={{ display: "block" }}
        />
      </div>
    </div>
  );
}
