import { Reveal } from "@/components/Reveal";
import {
  ShoppingCart,
  Factory,
  Briefcase,
  HeartPulse,
  Wrench,
  GraduationCap,
  ArrowDown,
  ArrowUp,
  Activity,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Metric {
  label: string;
  delta: string;
  /** 0–100 — quanto da barra está preenchido */
  fill: number;
  trend: "up" | "down";
  /** "down" significa que cair é bom (tarefas, retrabalho) */
  isGoodWhen: "up" | "down";
}

const METRICS: Metric[] = [
  { label: "Tarefas manuais", delta: "−62%", fill: 38, trend: "down", isGoodWhen: "down" },
  { label: "Retrabalho", delta: "−54%", fill: 46, trend: "down", isGoodWhen: "down" },
  { label: "Visibilidade ops", delta: "+88%", fill: 88, trend: "up", isGoodWhen: "up" },
  { label: "Confiança em decisões", delta: "+74%", fill: 74, trend: "up", isGoodWhen: "up" },
  { label: "Dependência do dono", delta: "−71%", fill: 29, trend: "down", isGoodWhen: "down" },
  { label: "Crescimento previsível", delta: "+92%", fill: 92, trend: "up", isGoodWhen: "up" },
];

interface Segment {
  Icon: LucideIcon;
  label: string;
  iconColor: string;
}

const SEGMENTS: Segment[] = [
  { Icon: ShoppingCart, label: "Varejo", iconColor: "oklch(0.55 0.13 60)" },
  { Icon: Factory, label: "Indústria", iconColor: "oklch(0.45 0.13 240)" },
  { Icon: Briefcase, label: "Consultoria", iconColor: "oklch(0.45 0.16 125)" },
  { Icon: HeartPulse, label: "Saúde", iconColor: "oklch(0.5 0.15 25)" },
  { Icon: Wrench, label: "Serviços", iconColor: "oklch(0.45 0.14 280)" },
  { Icon: GraduationCap, label: "Educação", iconColor: "oklch(0.45 0.13 195)" },
];

export function Impact() {
  return (
    <section className="py-[100px] lg:py-[140px] bg-background relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 tech-bg-dots ia-anim-grid-drift opacity-50"
        style={{
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 90%)",
        }}
      />

      <div className="container-page relative">
        <div className="grid lg:grid-cols-[5fr_7fr] gap-10 lg:gap-14 items-center max-w-[1200px] mx-auto">
          {/* LEFT — Headline */}
          <div>
            <Reveal>
              <span className="label-chip">
                <span className="dot" />
                Impacto operacional
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="h-mix mt-6 text-[32px] sm:text-[40px] lg:text-[48px] text-foreground">
                Quando a empresa
                <br />
                deixa de operar
                <br />
                <em>no improviso,</em>
                <br />o impacto é imediato.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-7 text-[15.5px] text-sage leading-[1.65] max-w-[440px]">
                O Business é uma solução de estruturação operacional com IA, criada pra empresas que
                precisam organizar a casa antes de escalar.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div
                className="mt-8 rounded-xl p-4"
                style={{
                  backgroundColor: "oklch(0.97 0.025 125)",
                  border: "1px solid oklch(0.85 0.05 125)",
                }}
              >
                <p
                  className="text-[15px] font-bold leading-[1.45]"
                  style={{ color: "oklch(0.42 0.15 125)" }}
                >
                  Clareza gera controle.
                  <br />
                  Controle gera crescimento sustentável.
                </p>
              </div>
            </Reveal>
          </div>

          {/* RIGHT — Live operations monitor */}
          <Reveal delay={0.2}>
            <ImpactMonitor />
          </Reveal>
        </div>

        {/* Vertical strip — Empresas que organizamos */}
        <div className="mt-24 lg:mt-28">
          <Reveal>
            <p className="text-center text-[11px] uppercase tracking-[0.16em] text-muted-foreground font-semibold">
              Empresas que organizamos
            </p>
            <h3 className="mt-4 text-center text-[22px] lg:text-[28px] font-semibold text-foreground tracking-tight max-w-[680px] mx-auto">
              Operações diferentes, mesma estrutura — adaptada por segmento.
            </h3>
          </Reveal>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 max-w-[1100px] mx-auto">
            {SEGMENTS.map((s, i) => (
              <Reveal key={s.label} delay={(i % 6) * 0.04}>
                <div className="tech-card p-5 h-full flex flex-col items-start gap-4">
                  <span
                    className="relative h-10 w-10 rounded-xl flex items-center justify-center"
                    style={{
                      backgroundColor: "oklch(0.97 0.005 110)",
                      border: "1px solid var(--color-border)",
                    }}
                  >
                    <s.Icon
                      className="h-5 w-5 relative z-10"
                      style={{ color: s.iconColor }}
                      strokeWidth={1.5}
                    />
                  </span>
                  <div className="relative">
                    <p
                      className="text-[10px] uppercase tracking-[0.16em] font-semibold"
                      style={{ color: s.iconColor, opacity: 0.75 }}
                    >
                      Vertical
                    </p>
                    <p className="mt-1 text-[15px] font-semibold tracking-tight text-foreground">
                      {s.label}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Live operations monitor — dashboard-style com 6 métricas em barras de progresso
 * coloridas baseadas no benefício. Substitui os 6 bullets estáticos.
 */
function ImpactMonitor() {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        backgroundColor: "oklch(1 0 0)",
        border: "1px solid oklch(0.92 0.005 110)",
        boxShadow:
          "0 30px 60px -20px oklch(0.18 0.02 122 / 0.18), 0 8px 20px -8px oklch(0.18 0.02 122 / 0.08)",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-3.5 border-b"
        style={{
          borderColor: "oklch(0.92 0.005 110)",
          backgroundColor: "oklch(0.985 0.004 110)",
        }}
      >
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-red-400/60" />
          <span className="h-2 w-2 rounded-full bg-yellow-400/60" />
          <span className="h-2 w-2 rounded-full bg-green-400/60" />
          <p className="ml-2 text-[10.5px] font-mono text-muted-foreground">
            iaplicada · monitor operacional
          </p>
        </div>
        <span
          className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider"
          style={{ color: "oklch(0.55 0.16 145)" }}
        >
          <Activity className="h-2.5 w-2.5" strokeWidth={2.5} />
          ao vivo
        </span>
      </div>

      {/* Title row */}
      <div className="px-5 lg:px-6 pt-5 pb-3 flex items-end justify-between">
        <div>
          <p className="text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground font-semibold">
            Operação · últimos 90 dias
          </p>
          <p className="mt-1 text-[18px] font-bold tracking-tight text-foreground">
            6 indicadores chave
          </p>
        </div>
        <span
          className="text-[24px] font-bold tracking-tight"
          style={{ color: "oklch(0.55 0.16 125)" }}
        >
          +73%
        </span>
      </div>

      {/* Metrics list */}
      <div className="px-5 lg:px-6 pb-5 lg:pb-6 space-y-3.5">
        {METRICS.map((m) => {
          const isGood = m.trend === m.isGoodWhen;
          const TrendIcon = m.trend === "up" ? ArrowUp : ArrowDown;
          return (
            <div key={m.label}>
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-[13px] text-foreground font-medium">{m.label}</p>
                <span
                  className="inline-flex items-center gap-1 text-[12px] font-bold tracking-tight"
                  style={{
                    color: isGood ? "oklch(0.55 0.16 125)" : "oklch(0.55 0.16 25)",
                  }}
                >
                  <TrendIcon className="h-3 w-3" strokeWidth={2.5} />
                  {m.delta}
                </span>
              </div>
              <div
                className="h-1.5 rounded-full overflow-hidden relative"
                style={{ backgroundColor: "oklch(0.95 0.005 110)" }}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${m.fill}%`,
                    background: isGood
                      ? "linear-gradient(90deg, oklch(0.62 0.17 125), oklch(0.82 0.2 115))"
                      : "linear-gradient(90deg, oklch(0.55 0.16 25), oklch(0.7 0.18 25))",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div
        className="px-5 lg:px-6 py-3.5 border-t flex items-center justify-between text-[11px]"
        style={{
          borderColor: "oklch(0.92 0.005 110)",
          backgroundColor: "oklch(0.985 0.004 110)",
        }}
      >
        <span className="text-muted-foreground">Calculado sobre média de 80+ implementações</span>
        <span
          className="font-semibold inline-flex items-center gap-1"
          style={{ color: "oklch(0.55 0.16 125)" }}
        >
          tudo no verde
        </span>
      </div>
    </div>
  );
}
