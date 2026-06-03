import { Reveal } from "@/components/Reveal";
import { ArrowRight, Clock, TrendingDown, Users } from "lucide-react";

/**
 * Hero da /contabilcalculo — copy à esquerda + preview visual do
 * resultado da calculadora à direita. O preview mostra o que o lead
 * vai ver depois (3 KPIs + economia anual), funcionando como prova
 * visual de saída antes mesmo de começar.
 *
 * Layout 2-col no desktop, stack no mobile (preview vem depois do CTA).
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

      <div className="relative pt-[40px] lg:pt-[64px]">
        <div
          aria-hidden
          className="pointer-events-none absolute hidden lg:block"
          style={{
            top: "8%",
            right: "-5%",
            width: "55%",
            height: "70%",
            background:
              "radial-gradient(ellipse at center, oklch(0.75 0.20 122 / 0.28) 0%, transparent 60%)",
            filter: "blur(80px)",
          }}
        />

        <div className="container-page relative">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-14 items-center">
            {/* Coluna texto */}
            <div>
              <Reveal>
                <span className="label-chip">
                  <span className="dot" />
                  Inteligência artificial para escritório contábil
                </span>
              </Reveal>

              <h1 className="h-mix mt-6 lg:mt-7 text-[32px] sm:text-[42px] lg:text-[54px] leading-[1.05] text-foreground">
                Em 3 minutos, descubra quantas <em>horas</em> (e quantos <em>R$</em>) seu
                escritório pode recuperar com IA.
              </h1>

              <Reveal delay={0.1}>
                <p className="mt-5 lg:mt-6 text-[15.5px] lg:text-[17px] text-sage leading-[1.55] max-w-[520px]">
                  Diagnóstico gratuito que mostra, com a conta aberta, onde sua equipe perde
                  tempo em tarefas que a IA já automatiza.
                </p>
              </Reveal>

              <Reveal delay={0.18}>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a href="#calculadora" className="cta-primary">
                    Fazer meu diagnóstico gratuito
                    <span className="arrow">
                      <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                    </span>
                  </a>
                </div>
              </Reveal>

              <Reveal delay={0.24}>
                <p className="mt-4 text-[11.5px] uppercase tracking-[0.18em] font-semibold text-muted-foreground">
                  100% gratuito · 3 minutos · Sem cartão
                </p>
              </Reveal>
            </div>

            {/* Coluna preview do resultado */}
            <Reveal delay={0.15}>
              <ResultMockup />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Mockup do que o lead vai ver no fim da calculadora. Números são
 * ilustrativos (vêm do brief, mesmo exemplo da página 11). Marcado
 * como "Exemplo" pra não confundir com diagnóstico real.
 */
function ResultMockup() {
  return (
    <div
      className="relative rounded-3xl border p-5 lg:p-6"
      style={{
        backgroundColor: "oklch(0.13 0.015 122 / 0.7)",
        borderColor: "oklch(0.35 0.04 125 / 0.55)",
        backdropFilter: "blur(8px)",
        boxShadow: "0 30px 60px -30px oklch(0 0 0 / 0.65)",
      }}
    >
      {/* Label "Exemplo" */}
      <div className="flex items-center justify-between">
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
        <span className="text-[10px] uppercase tracking-[0.18em] font-semibold text-muted-foreground hidden sm:block">
          escritório · 5 colaboradores
        </span>
      </div>

      {/* 3 KPI tiles */}
      <div className="mt-5 grid grid-cols-3 gap-2.5">
        <MiniKPI Icon={Clock} label="Horas/mês" value="81h" tint="emerald" />
        <MiniKPI Icon={TrendingDown} label="Economia/mês" value="R$ 4.869" tint="blue" />
        <MiniKPI Icon={Users} label="Equivale a" value="0.5 FTE" tint="amber" />
      </div>

      {/* Banner economia anual */}
      <div
        className="mt-3 rounded-2xl p-5 text-center"
        style={{
          backgroundColor: "oklch(0.10 0.012 122)",
          border: "1px solid oklch(0.35 0.04 125 / 0.45)",
        }}
      >
        <p className="text-[10.5px] uppercase tracking-[0.2em] font-semibold text-muted-foreground">
          Economia em 12 meses
        </p>
        <p
          className="num-display mt-2 text-[32px] lg:text-[40px] leading-none"
          style={{ color: "var(--color-primary)" }}
        >
          R$ 58.428
        </p>
      </div>

      {/* Mini "by task" linhas */}
      <div className="mt-4 space-y-1.5">
        {[
          { t: "Conciliação bancária", e: "R$ 1.800" },
          { t: "Atendimento ao cliente", e: "R$ 1.170" },
          { t: "Apuração de impostos", e: "R$ 600" },
        ].map((row) => (
          <div
            key={row.t}
            className="flex items-center justify-between text-[12.5px] px-3 py-2 rounded-lg"
            style={{ backgroundColor: "oklch(0.10 0.012 122 / 0.5)" }}
          >
            <span className="text-foreground/80 truncate pr-2">{row.t}</span>
            <span className="font-bold whitespace-nowrap" style={{ color: "var(--color-primary)" }}>
              {row.e}
            </span>
          </div>
        ))}
        <p className="pt-2 text-center text-[10.5px] italic text-muted-foreground">
          + 3 tarefas no resultado completo
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
      className="rounded-xl p-3"
      style={{ backgroundColor: t.bg, border: `1px solid ${t.border}` }}
    >
      <Icon className="h-3.5 w-3.5 text-foreground/70" strokeWidth={2} />
      <p className="mt-1.5 text-[9.5px] uppercase tracking-[0.14em] font-semibold text-muted-foreground leading-tight">
        {label}
      </p>
      <p
        className="num-display mt-1 text-[18px] lg:text-[22px] leading-none text-foreground whitespace-nowrap"
      >
        {value}
      </p>
    </div>
  );
}
