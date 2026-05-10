import { Reveal } from "@/components/Reveal";
import { TrendingUp, Clock, CheckCircle2, BarChart3 } from "lucide-react";

const TOOL_BADGES = ["Monday", "Make", "n8n", "Notion"];

export function Solution() {
  return (
    <section className="py-[100px] lg:py-[140px] bg-background relative overflow-hidden">
      {/* Tech animated grid drift */}
      <div
        className="pointer-events-none absolute inset-0 tech-bg-grid ia-anim-grid-drift opacity-[0.35]"
        style={{
          maskImage: "radial-gradient(ellipse 60% 50% at 30% 50%, black 20%, transparent 80%)",
        }}
      />
      {/* Soft lime glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-0 h-[460px] w-[460px] rounded-full ia-anim-shimmer"
        style={{
          background:
            "radial-gradient(circle at center, oklch(0.62 0.17 125 / 0.16) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="container-page relative">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-center">
          <div>
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5">
                {TOOL_BADGES.map((t, i) => (
                  <span
                    key={t}
                    className="text-[11px] font-semibold text-muted-foreground flex items-center gap-2"
                  >
                    {t}
                    {i < TOOL_BADGES.length - 1 && (
                      <span className="h-1 w-1 rounded-full bg-border" />
                    )}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <h2 className="h-mix mt-6 text-[36px] sm:text-[42px] lg:text-[52px] text-foreground">
                O Business da IAplicada
                <br />
                <em>existe para resolver isso.</em>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-6 text-[17px] text-sage leading-[1.65] max-w-[520px]">
                Uma plataforma de gestão e automação feita{" "}
                <span className="text-foreground font-semibold">sob medida para a sua empresa</span>
                , que usa IA para substituir planilhas e tarefas manuais por fluxos automáticos e
                dashboards que mostram exatamente onde estão os gargalos do seu crescimento — sem
                depender de time de TI.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <a href="#diagnostico-form" className="mt-10 cta-primary">
                Quero conhecer o Business
                <span className="arrow">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 7H12M12 7L7 2M12 7L7 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <SystemsComposition />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/**
 * Real, realistic systems composition — 3 product surfaces stacked with depth.
 * No more cartoon icon boxes. Looks like screenshots of actual SaaS dashboards.
 */
function SystemsComposition() {
  return (
    <div className="relative aspect-[5/4] w-full">
      {/* Soft glow behind */}
      <div
        aria-hidden
        className="absolute -inset-8 -z-10 rounded-[40px] opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.62 0.17 125 / 0.22) 0%, transparent 70%)",
        }}
      />

      {/* Background card — KPIs dashboard (charcoal premium) */}
      <div
        className="absolute right-0 top-0 w-[78%] h-[72%] rounded-2xl overflow-hidden"
        style={{
          backgroundColor: "oklch(0.18 0.02 122)",
          border: "1px solid oklch(0.32 0.025 122)",
          boxShadow: "0 30px 60px -20px oklch(0 0 0 / 0.45), 0 8px 20px -8px oklch(0 0 0 / 0.25)",
        }}
      >
        <DashboardWindow />
      </div>

      {/* Foreground card — Realtime metrics (white) */}
      <div
        className="absolute left-0 bottom-0 w-[62%] h-[58%] rounded-2xl overflow-hidden bg-white"
        style={{
          border: "1px solid oklch(0.88 0.01 122)",
          boxShadow:
            "0 30px 60px -20px oklch(0.18 0.02 122 / 0.25), 0 8px 16px -8px oklch(0.18 0.02 122 / 0.15)",
        }}
      >
        <MetricsWindow />
      </div>

      {/* Floating notification chip top-right */}
      <div
        className="absolute right-4 top-4 lg:right-6 lg:top-6 inline-flex items-center gap-2 rounded-full px-3 py-1.5 backdrop-blur-md"
        style={{
          backgroundColor: "oklch(0.95 0.22 115 / 0.95)",
          color: "oklch(0.18 0.02 122)",
          boxShadow: "0 8px 24px -8px oklch(0.18 0.02 122 / 0.3)",
        }}
      >
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: "oklch(0.18 0.02 122)" }}
        />
        <span className="text-[10.5px] uppercase tracking-[0.14em] font-bold">
          Sincronizado · 23s atrás
        </span>
      </div>
    </div>
  );
}

/** Dashboard window — looks like a real product screenshot (dark) */
function DashboardWindow() {
  return (
    <div className="h-full w-full flex flex-col">
      {/* Window chrome */}
      <div
        className="flex items-center gap-1.5 px-4 py-2.5 border-b"
        style={{ borderColor: "oklch(0.28 0.02 122)" }}
      >
        <span className="h-2 w-2 rounded-full bg-red-400/60" />
        <span className="h-2 w-2 rounded-full bg-yellow-400/60" />
        <span className="h-2 w-2 rounded-full bg-green-400/60" />
        <div className="ml-3 text-[10px] font-mono" style={{ color: "oklch(0.55 0.02 110)" }}>
          iaplicada · operação
        </div>
      </div>

      <div className="flex-1 p-4 lg:p-5 grid grid-cols-12 gap-3 overflow-hidden">
        {/* Sidebar nav */}
        <div className="col-span-3 flex flex-col gap-1.5">
          {["Visão geral", "Operações", "Financeiro", "Pessoas", "Relatórios"].map((item, i) => (
            <div
              key={item}
              className="px-2.5 py-1.5 rounded-md text-[10px]"
              style={{
                backgroundColor: i === 0 ? "oklch(0.95 0.22 115 / 0.18)" : "transparent",
                color: i === 0 ? "oklch(0.95 0.22 115)" : "oklch(0.7 0.02 110)",
                fontWeight: i === 0 ? 600 : 400,
              }}
            >
              {item}
            </div>
          ))}
        </div>

        {/* Main panel */}
        <div className="col-span-9 flex flex-col gap-3">
          {/* KPI row */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { l: "MRR", v: "R$ 1,42M", d: "+18%" },
              { l: "Churn", v: "2,1%", d: "−0,4pp" },
              { l: "NPS", v: "72", d: "+5" },
            ].map((k) => (
              <div
                key={k.l}
                className="rounded-md p-2"
                style={{
                  backgroundColor: "oklch(0.22 0.025 122)",
                  border: "1px solid oklch(0.3 0.025 122)",
                }}
              >
                <p
                  className="text-[8.5px] uppercase tracking-[0.1em]"
                  style={{ color: "oklch(0.6 0.02 110)" }}
                >
                  {k.l}
                </p>
                <p className="mt-1 text-[14px] font-bold leading-none text-white">{k.v}</p>
                <p
                  className="mt-1 text-[9px] font-semibold"
                  style={{ color: "oklch(0.82 0.2 115)" }}
                >
                  {k.d}
                </p>
              </div>
            ))}
          </div>

          {/* Realistic chart */}
          <div
            className="rounded-md p-3 flex-1 flex flex-col"
            style={{
              backgroundColor: "oklch(0.22 0.025 122)",
              border: "1px solid oklch(0.3 0.025 122)",
            }}
          >
            <div className="flex items-center justify-between">
              <p
                className="text-[9px] uppercase tracking-[0.12em]"
                style={{ color: "oklch(0.6 0.02 110)" }}
              >
                Receita · 12 meses
              </p>
              <span className="inline-flex items-center gap-1 text-[9px] font-semibold text-white">
                <TrendingUp className="h-2.5 w-2.5" strokeWidth={2.5} />
                +47%
              </span>
            </div>

            {/* SVG line chart */}
            <svg viewBox="0 0 200 60" preserveAspectRatio="none" className="mt-2 flex-1 w-full">
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.95 0.22 115)" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="oklch(0.95 0.22 115)" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* grid lines */}
              {[0, 1, 2, 3].map((i) => (
                <line
                  key={i}
                  x1="0"
                  y1={i * 15}
                  x2="200"
                  y2={i * 15}
                  stroke="oklch(0.3 0.02 122)"
                  strokeWidth="0.5"
                  strokeDasharray="2 3"
                />
              ))}
              {/* area */}
              <path
                d="M0,52 L18,48 L36,42 L54,44 L72,36 L90,30 L108,32 L126,22 L144,18 L162,14 L180,8 L200,4 L200,60 L0,60 Z"
                fill="url(#chartGrad)"
              />
              {/* line */}
              <path
                d="M0,52 L18,48 L36,42 L54,44 L72,36 L90,30 L108,32 L126,22 L144,18 L162,14 L180,8 L200,4"
                fill="none"
                stroke="oklch(0.95 0.22 115)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* dot at last point */}
              <circle cx="200" cy="4" r="2" fill="oklch(0.95 0.22 115)" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Realtime metrics window (white card with progress bars + chart) */
function MetricsWindow() {
  return (
    <div className="h-full w-full p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div>
          <p
            className="text-[9px] uppercase tracking-[0.14em] font-semibold"
            style={{ color: "var(--color-muted-foreground)" }}
          >
            Tempo real
          </p>
          <p className="mt-0.5 text-[14px] font-bold tracking-tight text-foreground">
            Operação hoje
          </p>
        </div>
        <BarChart3
          className="h-4 w-4"
          style={{ color: "var(--color-primary)" }}
          strokeWidth={1.75}
        />
      </div>

      {/* Progress rows */}
      <div className="flex flex-col gap-2.5 flex-1">
        {[
          { l: "Tickets resolvidos", v: 87, d: "87/100" },
          { l: "NF conciliadas", v: 96, d: "192/200" },
          { l: "Propostas enviadas", v: 64, d: "32/50" },
        ].map((row) => (
          <div key={row.l}>
            <div className="flex items-center justify-between mb-1">
              <p className="text-[10px] font-medium text-foreground">{row.l}</p>
              <p
                className="text-[9px] font-mono"
                style={{ color: "var(--color-muted-foreground)" }}
              >
                {row.d}
              </p>
            </div>
            <div
              className="h-1.5 rounded-full overflow-hidden"
              style={{ backgroundColor: "oklch(0.94 0.005 110)" }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: `${row.v}%`,
                  background: "linear-gradient(90deg, oklch(0.62 0.17 125), oklch(0.82 0.2 115))",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Footer status */}
      <div
        className="flex items-center justify-between pt-2.5"
        style={{ borderTop: "1px solid var(--color-border)" }}
      >
        <span
          className="inline-flex items-center gap-1.5 text-[9px]"
          style={{ color: "var(--color-muted-foreground)" }}
        >
          <Clock className="h-2.5 w-2.5" strokeWidth={2} />
          atualizado há 12s
        </span>
        <span
          className="inline-flex items-center gap-1 text-[9px] font-semibold"
          style={{ color: "var(--color-primary)" }}
        >
          <CheckCircle2 className="h-2.5 w-2.5" strokeWidth={2.5} />
          tudo no verde
        </span>
      </div>
    </div>
  );
}
