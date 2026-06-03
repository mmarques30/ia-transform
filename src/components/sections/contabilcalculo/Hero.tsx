import { Reveal } from "@/components/Reveal";
import { ArrowRight, Clock, TrendingDown, Users, MessageCircle } from "lucide-react";

/**
 * Hero da /contabilcalculo — H1 grande à esquerda + preview rico do
 * resultado à direita. O preview é uma reprodução fiel do que o lead
 * vai ver no fim da calculadora (banner anual + 3 KPIs + tabela + linha
 * de próximo passo via WhatsApp), criando expectativa clara da entrega.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative pb-[60px] lg:pb-[80px] overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 80% 55% at 50% 0%, oklch(0.22 0.03 122 / 0.5) 0%, transparent 75%)",
      }}
    >
      <div className="h-[72px]" aria-hidden />

      <div className="relative pt-[28px] lg:pt-[32px]">
        <div
          aria-hidden
          className="pointer-events-none absolute hidden lg:block"
          style={{
            top: "0%",
            right: "-8%",
            width: "55%",
            height: "70%",
            background:
              "radial-gradient(ellipse at center, oklch(0.75 0.20 122 / 0.28) 0%, transparent 60%)",
            filter: "blur(80px)",
          }}
        />

        <div className="container-page relative">
          <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-12 items-center">
            {/* Coluna texto — h1 maior, mais respiro */}
            <div>
              <Reveal>
                <span className="label-chip">
                  <span className="dot" />
                  Inteligência artificial para escritório contábil
                </span>
              </Reveal>

              <h1 className="h-mix mt-7 text-[36px] sm:text-[48px] lg:text-[66px] leading-[0.98] text-foreground tracking-[-0.02em]">
                Em 3 minutos, descubra quantas <em>horas</em> (e quantos <em>R$</em>) seu
                escritório pode recuperar com IA.
              </h1>

              <Reveal delay={0.1}>
                <p className="mt-7 text-[16px] lg:text-[18px] text-sage leading-[1.55] max-w-[520px]">
                  Diagnóstico gratuito que mostra, com a conta aberta, onde sua equipe perde
                  tempo em tarefas que a IA já automatiza.
                </p>
              </Reveal>

              <Reveal delay={0.18}>
                <div className="mt-9 flex flex-wrap items-center gap-4">
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
            </div>

            {/* Coluna preview — mais rico, espelha o resultado real */}
            <Reveal delay={0.15}>
              <ResultMockup />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function ResultMockup() {
  return (
    <div
      className="relative rounded-3xl border p-5 lg:p-6"
      style={{
        backgroundColor: "oklch(0.13 0.015 122 / 0.78)",
        borderColor: "oklch(0.35 0.04 125 / 0.55)",
        backdropFilter: "blur(8px)",
        boxShadow: "0 30px 60px -30px oklch(0 0 0 / 0.7)",
      }}
    >
      {/* Header com badge + meta */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <span
          className="inline-flex items-center gap-1.5 text-[10.5px] uppercase tracking-[0.18em] font-semibold px-2.5 py-1 rounded-full"
          style={{
            backgroundColor: "oklch(0.75 0.20 122 / 0.14)",
            border: "1px solid oklch(0.75 0.20 122 / 0.45)",
            color: "var(--color-primary)",
          }}
        >
          Exemplo de resultado
        </span>
        <span className="text-[9.5px] uppercase tracking-[0.18em] font-semibold text-muted-foreground">
          Escritório · 5 colaboradores
        </span>
      </div>

      {/* Banner economia anual — agora no TOPO, é o destaque */}
      <div
        className="mt-4 rounded-2xl p-5 text-center relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.18 0.04 122) 0%, oklch(0.13 0.02 122) 100%)",
          border: "1.5px solid oklch(0.75 0.20 122 / 0.5)",
          boxShadow: "0 10px 28px -10px oklch(0.75 0.2 122 / 0.4)",
        }}
      >
        <p className="text-[10.5px] uppercase tracking-[0.2em] font-semibold text-muted-foreground">
          Economia projetada em 12 meses
        </p>
        <p
          className="num-display mt-2 text-[36px] lg:text-[44px] leading-none"
          style={{ color: "var(--color-primary)" }}
        >
          R$ 58.428
        </p>
        <p className="mt-2 text-[12px] text-sage">
          81 horas/mês liberadas para trabalho de maior valor
        </p>
      </div>

      {/* 3 KPI mini-tiles */}
      <div className="mt-3 grid grid-cols-3 gap-2">
        <MiniKPI Icon={Clock} label="Horas/mês" value="81h" tint="emerald" />
        <MiniKPI Icon={TrendingDown} label="R$/mês" value="4.869" tint="blue" />
        <MiniKPI Icon={Users} label="FTE" value="0.5" tint="amber" />
      </div>

      {/* Tabela compacta de tarefas */}
      <div className="mt-4 space-y-1">
        {[
          { t: "Conciliação bancária", h: "40h → 10h", e: "R$ 1.800" },
          { t: "Atendimento ao cliente", h: "30h → 11h", e: "R$ 1.170" },
          { t: "Apuração de impostos", h: "25h → 15h", e: "R$ 600" },
          { t: "Onboarding", h: "10h → 5h", e: "R$ 300" },
        ].map((row) => (
          <div
            key={row.t}
            className="flex items-center justify-between text-[12px] px-3 py-2 rounded-lg gap-3"
            style={{ backgroundColor: "oklch(0.10 0.012 122 / 0.55)" }}
          >
            <span className="text-foreground/85 truncate flex-1">{row.t}</span>
            <span className="text-muted-foreground text-[10.5px] whitespace-nowrap font-medium">
              {row.h}
            </span>
            <span
              className="font-bold whitespace-nowrap min-w-[58px] text-right"
              style={{ color: "var(--color-primary)" }}
            >
              {row.e}
            </span>
          </div>
        ))}
      </div>

      {/* Linha próximo passo — WhatsApp follow-up */}
      <div
        className="mt-4 flex items-center gap-2.5 rounded-lg px-3 py-2.5"
        style={{
          backgroundColor: "oklch(0.18 0.025 122 / 0.5)",
          border: "1px solid oklch(0.55 0.06 122 / 0.4)",
        }}
      >
        <MessageCircle
          className="h-3.5 w-3.5 shrink-0"
          strokeWidth={2}
          style={{ color: "var(--color-primary)" }}
        />
        <p className="text-[11.5px] text-foreground/85 leading-tight">
          Trilha personalizada pelo WhatsApp em até 5 minutos.
        </p>
      </div>
    </div>
  );
}

function MiniKPI({
  Icon,
  label,
  value,
  tint,
}: {
  Icon: typeof Clock;
  label: string;
  value: string;
  tint: "emerald" | "blue" | "amber";
}) {
  const tintMap = {
    emerald: { bg: "oklch(0.75 0.20 122 / 0.12)", border: "oklch(0.75 0.20 122 / 0.45)" },
    blue: { bg: "oklch(0.55 0.12 240 / 0.14)", border: "oklch(0.55 0.12 240 / 0.45)" },
    amber: { bg: "oklch(0.75 0.16 80 / 0.14)", border: "oklch(0.75 0.16 80 / 0.45)" },
  } as const;
  const t = tintMap[tint];
  return (
    <div
      className="rounded-xl p-2.5"
      style={{ backgroundColor: t.bg, border: `1px solid ${t.border}` }}
    >
      <Icon className="h-3 w-3 text-foreground/70" strokeWidth={2} />
      <p className="mt-1 text-[9px] uppercase tracking-[0.14em] font-semibold text-muted-foreground leading-tight">
        {label}
      </p>
      <p
        className="num-display mt-0.5 text-[18px] lg:text-[20px] leading-none text-foreground whitespace-nowrap"
      >
        {value}
      </p>
    </div>
  );
}
