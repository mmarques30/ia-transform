import { Reveal } from "@/components/Reveal";
import { ArrowDown, ArrowUp, Activity } from "lucide-react";

interface Metric {
  label: string;
  delta: string;
  fill: number;
  trend: "up" | "down";
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

interface Vertical {
  label: string;
  brand: string;
  context: string;
  accent: string;
  image: string;
}

const VERTICALS: Vertical[] = [
  {
    label: "Varejo",
    brand: "Lumia",
    context: "Painel de vendas multi-loja",
    accent: "oklch(0.6 0.16 45)",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",
  },
  {
    label: "Indústria",
    brand: "Forjana",
    context: "OEE em tempo real por linha",
    accent: "oklch(0.45 0.14 240)",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80",
  },
  {
    label: "Saúde",
    brand: "Clínica Ípê",
    context: "Agenda + prontuário integrados",
    accent: "oklch(0.55 0.18 25)",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1400&q=80",
  },
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
        {/* ATO 1 — A virada operacional (claim + monitor) */}
        <div className="text-center max-w-[760px] mx-auto">
          <Reveal>
            <span className="label-chip">
              <span className="dot" />
              Impacto operacional
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h-mix mt-6 text-[36px] sm:text-[44px] lg:text-[54px] text-foreground">
              Sem improviso, a operação ganha <em>previsibilidade</em>
              <br className="hidden sm:block" /> — e os indicadores acompanham.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-[16px] text-sage leading-[1.6] max-w-[600px] mx-auto">
              Não é um KPI isolado. É a operação estruturada refletindo nos resultados.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="mt-12 max-w-[1080px] mx-auto">
            <ImpactMonitor />
          </div>
        </Reveal>

        {/* PONTE — divisor narrativo entre impacto e personalização */}
        <div className="mt-24 lg:mt-32 flex flex-col items-center">
          <span
            aria-hidden
            className="block h-px w-24"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--color-primary), transparent)",
            }}
          />
          <Reveal delay={0.05}>
            <p className="mt-6 text-center text-[11px] uppercase tracking-[0.18em] font-semibold text-muted-foreground">
              Mesma metodologia · Sistemas distintos
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h3 className="mt-4 text-center text-[28px] sm:text-[34px] lg:text-[40px] font-bold text-foreground tracking-tight max-w-[820px] mx-auto leading-[1.15]">
              Uma mesma metodologia,{" "}
              <em
                style={{
                  color: "var(--color-primary)",
                  fontStyle: "italic",
                  fontFamily: "var(--font-serif)",
                  fontWeight: 400,
                }}
              >
                adaptada
              </em>{" "}
              para sua empresa.
            </h3>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-5 text-center text-[15px] text-sage leading-[1.6] max-w-[560px] mx-auto">
              Mesma metodologia. Implementação adaptada ao contexto de cada segmento.
            </p>
          </Reveal>
        </div>

        {/* ATO 2 — Personalização por vertical (3 cards com imagens reais) */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1180px] mx-auto">
          {VERTICALS.map((v, i) => (
            <Reveal key={v.label} delay={i * 0.08}>
              <div className="tech-card overflow-hidden h-full flex flex-col">
                {/* Imagem real do dashboard */}
                <div
                  className="aspect-[4/3] relative overflow-hidden"
                  style={{
                    backgroundColor: "oklch(0.94 0.005 110)",
                    borderBottom: "1px solid var(--color-border)",
                  }}
                >
                  <img
                    src={v.image}
                    alt={`Dashboard ${v.brand} — ${v.label}`}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {/* Gradient overlay no topo pra legibilidade do chip brandado */}
                  <div
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-24"
                    style={{
                      background:
                        "linear-gradient(180deg, oklch(0.18 0.02 122 / 0.55), transparent)",
                    }}
                  />
                  {/* Brand chip (top-left) */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span
                      className="inline-flex items-center gap-2 rounded-full pl-1 pr-3 py-1"
                      style={{
                        backgroundColor: "oklch(1 0 0 / 0.92)",
                        backdropFilter: "blur(6px)",
                        WebkitBackdropFilter: "blur(6px)",
                      }}
                    >
                      <span
                        className="h-5 w-5 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: v.accent }}
                      >
                        <span
                          className="h-1.5 w-1.5 rounded-full ia-anim-blink"
                          style={{ backgroundColor: "oklch(1 0 0)" }}
                        />
                      </span>
                      <span className="text-[11px] font-bold tracking-tight text-foreground">
                        {v.brand}
                      </span>
                    </span>
                    <span
                      className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-[9.5px] font-semibold uppercase tracking-wider"
                      style={{
                        backgroundColor: "oklch(1 0 0 / 0.92)",
                        backdropFilter: "blur(6px)",
                        WebkitBackdropFilter: "blur(6px)",
                        color: v.accent,
                      }}
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full ia-anim-blink"
                        style={{ backgroundColor: v.accent }}
                      />
                      ao vivo
                    </span>
                  </div>
                </div>

                {/* Footer */}
                <div className="relative px-5 py-4 flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <p
                      className="text-[10px] uppercase tracking-[0.16em] font-semibold"
                      style={{ color: "var(--color-muted-foreground)" }}
                    >
                      Sistema {v.brand}
                    </p>
                    <p className="text-[16px] font-bold tracking-tight text-foreground">
                      {v.label}
                    </p>
                  </div>
                  <p className="text-[12.5px] text-sage leading-snug">{v.context}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Impact monitor — same dashboard live                              */
/* ------------------------------------------------------------------ */

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

      <div className="px-6 lg:px-8 pt-6 pb-4 flex items-end justify-between border-b" style={{ borderColor: "oklch(0.94 0.005 110)" }}>
        <div>
          <p className="text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground font-semibold">
            Operação · últimos 90 dias
          </p>
          <p className="mt-1.5 text-[20px] font-bold tracking-tight text-foreground">
            Antes vs. depois da estruturação
          </p>
        </div>
        <div className="text-right">
          <span
            className="block text-[32px] font-bold tracking-tight leading-none"
            style={{ color: "oklch(0.55 0.16 125)" }}
          >
            +73%
          </span>
          <span className="block mt-1 text-[10px] uppercase tracking-[0.14em] text-muted-foreground font-semibold">
            ganho médio
          </span>
        </div>
      </div>

      <div className="px-6 lg:px-8 py-6 grid sm:grid-cols-2 gap-x-8 gap-y-4">
        {METRICS.map((m) => {
          const isGood = m.trend === m.isGoodWhen;
          const TrendIcon = m.trend === "up" ? ArrowUp : ArrowDown;
          return (
            <div key={m.label}>
              <div className="flex items-center justify-between mb-2">
                <p className="text-[13.5px] text-foreground font-medium">{m.label}</p>
                <span
                  className="inline-flex items-center gap-1 text-[13px] font-bold tracking-tight"
                  style={{
                    color: isGood ? "oklch(0.55 0.16 125)" : "oklch(0.55 0.16 25)",
                  }}
                >
                  <TrendIcon className="h-3 w-3" strokeWidth={2.5} />
                  {m.delta}
                </span>
              </div>
              <div
                className="h-1.5 rounded-full overflow-hidden"
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

