import { Reveal } from "@/components/Reveal";
import { ArrowRight, TrendingUp } from "lucide-react";

/**
 * Manifesto — abertura editorial da /contabilcalculo.
 *
 * Layout 60/40 assimétrico: copy à esquerda, mockup integrado de
 * dashboard real à direita com callouts dos resultados "saindo" dele
 * (edges fade pra a página, sem moldura de card pesado).
 *
 * Background warm dark (sepia-toned) único pra essa LP — diferencia
 * visualmente das outras LPs contábeis sem quebrar o branding olive.
 */
const WARM_BG = "oklch(0.16 0.022 70)";
const WARM_BORDER = "oklch(0.32 0.025 70 / 0.5)";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden" style={{ backgroundColor: WARM_BG }}>
      <div className="h-[72px]" aria-hidden />

      <div
        aria-hidden
        className="pointer-events-none absolute top-0 inset-x-0 h-[70%]"
        style={{
          background:
            "radial-gradient(ellipse 65% 60% at 50% 0%, oklch(0.75 0.20 122 / 0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative pt-[48px] lg:pt-[80px] pb-[80px] lg:pb-[110px]">
        <div className="container-page relative">
          <div className="grid lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-16 items-center">
            {/* COPY */}
            <div>
              <Reveal>
                <p className="text-[11.5px] uppercase tracking-[0.22em] font-semibold text-muted-foreground">
                  IAplicada · Inteligência artificial para escritório contábil
                </p>
              </Reveal>

              <h1 className="h-mix mt-7 lg:mt-9 text-[40px] sm:text-[56px] lg:text-[76px] leading-[0.95] tracking-[-0.025em] text-foreground">
                Em <em>3 minutos</em>, quantas horas{" "}
                <span className="text-muted-foreground/85">(e quantos R$)</span> seu escritório
                recupera com IA.
              </h1>

              <Reveal delay={0.12}>
                <p className="mt-7 lg:mt-9 text-[16px] lg:text-[18px] text-sage leading-[1.5] max-w-[520px]">
                  Diagnóstico gratuito. Conta aberta na tela. Sem cartão, sem cadastro
                  complicado.
                </p>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="mt-9 lg:mt-12">
                  <a href="#calculadora" className="cta-primary">
                    Fazer meu diagnóstico
                    <span className="arrow">
                      <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                    </span>
                  </a>
                </div>
              </Reveal>
            </div>

            {/* MOCKUP integrado — dashboard real + callouts saindo dele */}
            <Reveal delay={0.18}>
              <DashboardMockup />
            </Reveal>
          </div>

          {/* STRIP — separador editorial com 3 stats agregados */}
          <Reveal delay={0.32}>
            <div
              className="mt-16 lg:mt-24 pt-7 grid grid-cols-3 gap-4 lg:gap-12"
              style={{ borderTop: `1px solid ${WARM_BORDER}` }}
            >
              <StatLine value="+700" label="Profissionais usando a IAplicada" />
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
 * Dashboard real com callouts dos resultados emergindo dele.
 * Edges fade pra o bg da página via mask-image — sem moldura cartesiana
 * pesada. Float natural, integrado ao layout editorial.
 */
function DashboardMockup() {
  return (
    <div className="relative">
      {/* Dashboard image — fade edges */}
      <div className="relative">
        <img
          src="/clients/focus-tax.webp"
          alt="Dashboard de recuperação tributária da Focus FinTax rodando com IAplicada"
          loading="lazy"
          decoding="async"
          className="w-full rounded-2xl"
          style={{
            boxShadow:
              "0 32px 80px -30px oklch(0 0 0 / 0.7), 0 0 80px -30px oklch(0.75 0.20 122 / 0.45)",
            border: "1px solid oklch(0.55 0.06 122 / 0.35)",
          }}
        />

        {/* Glow olive vazando das bordas pra dentro do bg */}
        <div
          aria-hidden
          className="absolute -inset-4 -z-10 rounded-3xl pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, oklch(0.75 0.20 122 / 0.18), transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      {/* Callout principal — R$ 58.428 saindo do canto inferior esquerdo */}
      <div
        className="absolute -bottom-6 -left-4 lg:-left-10 rounded-2xl px-4 py-3 lg:px-5 lg:py-4 max-w-[220px] lg:max-w-[260px]"
        style={{
          backgroundColor: "oklch(0.10 0.015 70 / 0.92)",
          border: "1px solid oklch(0.75 0.20 122 / 0.5)",
          backdropFilter: "blur(8px)",
          boxShadow: "0 20px 40px -20px oklch(0 0 0 / 0.6)",
        }}
      >
        <p className="text-[9.5px] uppercase tracking-[0.18em] font-semibold text-muted-foreground">
          Economia anual média
        </p>
        <p
          className="num-display mt-1 text-[26px] lg:text-[32px] leading-none"
          style={{ color: "var(--color-primary)", letterSpacing: "-0.02em" }}
        >
          R$ 58.428
        </p>
        <p className="mt-1.5 text-[11px] text-foreground/75 leading-tight">
          em escritórios de 5 colaboradores
        </p>
      </div>

      {/* Callout secundário — pill flutuante com horas */}
      <div
        className="absolute top-3 -right-3 lg:-right-5 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5"
        style={{
          backgroundColor: "var(--color-primary)",
          color: "oklch(0.14 0.02 122)",
          boxShadow: "0 14px 28px -14px oklch(0.75 0.20 122 / 0.55)",
        }}
      >
        <TrendingUp className="h-3.5 w-3.5" strokeWidth={2.5} />
        <span className="text-[12.5px] font-bold tracking-tight">+81h/mês liberadas</span>
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
