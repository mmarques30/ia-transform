import { Activity, TrendingUp, ArrowUp, ArrowDown } from "lucide-react";

/* ------------------------------------------------------------------ */
/* Frames                                                             */
/* ------------------------------------------------------------------ */

interface FrameProps {
  children: React.ReactNode;
  /** Theme — drives bg + text colors */
  theme?: "light" | "dark";
}

/** macOS-style window frame for desktop apps */
function WindowFrame({ children, theme = "light" }: FrameProps) {
  const isDark = theme === "dark";
  const bg = isDark ? "oklch(0.16 0.02 122)" : "oklch(1 0 0)";
  const border = isDark ? "oklch(0.28 0.025 122)" : "oklch(0.92 0.005 110)";
  const headerBg = isDark ? "oklch(0.2 0.022 122)" : "oklch(0.97 0.004 110)";

  return (
    <div className="absolute inset-0 p-2 flex flex-col">
      <div
        className="flex-1 rounded-lg overflow-hidden flex flex-col"
        style={{ backgroundColor: bg, border: `1px solid ${border}` }}
      >
        {/* Title bar */}
        <div
          className="flex items-center gap-1.5 px-3 py-2 border-b shrink-0"
          style={{ borderColor: border, backgroundColor: headerBg }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-red-400/60" />
          <span className="h-1.5 w-1.5 rounded-full bg-yellow-400/60" />
          <span className="h-1.5 w-1.5 rounded-full bg-green-400/60" />
        </div>
        <div className="flex-1 p-3 flex flex-col gap-2 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

function MicroBar({ height, color }: { height: number; color: string }) {
  return (
    <div className="flex-1 rounded-sm" style={{ height: `${height}%`, backgroundColor: color }} />
  );
}

function Sparkline({ points, stroke, fill }: { points: string; stroke: string; fill: string }) {
  const id = `spark-${stroke.replace(/[^a-z0-9]/gi, "")}`;
  return (
    <svg viewBox="0 0 200 50" preserveAspectRatio="none" className="w-full h-full">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={fill} stopOpacity="0.4" />
          <stop offset="100%" stopColor={fill} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${points} L 200,50 L 0,50 Z`} fill={`url(#${id})`} />
      <path
        d={points}
        fill="none"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Mockups — realistic screenshot look                                */
/* ------------------------------------------------------------------ */

/** CX — Atendimento dashboard com fila + métricas */
export function AtendimentoMockup() {
  return (
    <WindowFrame theme="light">
      <div className="flex items-center justify-between">
        <p className="text-[9px] font-semibold tracking-tight text-foreground">
          Atendimento · hoje
        </p>
        <span
          className="text-[8px] font-semibold inline-flex items-center gap-0.5"
          style={{ color: "oklch(0.55 0.16 145)" }}
        >
          <ArrowDown className="h-2 w-2" strokeWidth={2.5} />
          −47%
        </span>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-3 gap-1.5">
        {[
          { l: "Resolvidos", v: "247" },
          { l: "Resp. médio", v: "1m38" },
          { l: "CSAT", v: "4,8" },
        ].map((k) => (
          <div
            key={k.l}
            className="rounded p-1.5"
            style={{
              backgroundColor: "oklch(0.97 0.004 110)",
              border: "1px solid oklch(0.92 0.005 110)",
            }}
          >
            <p className="text-[7px] uppercase tracking-wider text-muted-foreground">{k.l}</p>
            <p className="text-[12px] font-bold text-foreground leading-none mt-0.5">{k.v}</p>
          </div>
        ))}
      </div>

      {/* Queue table */}
      <div
        className="rounded overflow-hidden"
        style={{ border: "1px solid oklch(0.92 0.005 110)" }}
      >
        {[
          { id: "T-4829", st: "novo", c: "oklch(0.6 0.16 25)" },
          { id: "T-4828", st: "ia respondendo", c: "oklch(0.62 0.17 125)" },
          { id: "T-4827", st: "resolvido", c: "oklch(0.55 0.13 145)" },
        ].map((r, i) => (
          <div
            key={r.id}
            className="flex items-center justify-between px-2 py-1"
            style={{
              borderTop: i > 0 ? "1px solid oklch(0.94 0.005 110)" : undefined,
            }}
          >
            <span className="text-[8px] font-mono text-foreground">{r.id}</span>
            <span
              className="inline-flex items-center gap-1 text-[7.5px] uppercase tracking-wider font-semibold"
              style={{ color: r.c }}
            >
              <span className="h-1 w-1 rounded-full" style={{ backgroundColor: r.c }} />
              {r.st}
            </span>
          </div>
        ))}
      </div>

      {/* Sparkline */}
      <div className="flex-1 min-h-[28px]">
        <Sparkline
          points="0,38 20,32 40,30 60,24 80,28 100,18 120,22 140,14 160,16 180,8 200,10"
          stroke="oklch(0.62 0.17 125)"
          fill="oklch(0.62 0.17 125)"
        />
      </div>
    </WindowFrame>
  );
}

/** Backoffice — Conciliação NF realista */
export function BackofficeMockup() {
  return (
    <WindowFrame theme="light">
      <div className="flex items-center justify-between">
        <p className="text-[9px] font-semibold tracking-tight text-foreground">
          Conciliação · 12/mar
        </p>
        <span className="text-[8px] font-semibold" style={{ color: "oklch(0.55 0.16 145)" }}>
          98,4% auto
        </span>
      </div>

      <div
        className="rounded overflow-hidden"
        style={{ border: "1px solid oklch(0.92 0.005 110)" }}
      >
        <div
          className="grid grid-cols-3 px-2 py-1 text-[7px] uppercase tracking-wider font-semibold"
          style={{
            backgroundColor: "oklch(0.97 0.004 110)",
            color: "var(--color-muted-foreground)",
          }}
        >
          <span>NF</span>
          <span className="text-right">Valor</span>
          <span className="text-right">Status</span>
        </div>
        {[
          { n: "482910", v: "R$ 12.400", ok: true },
          { n: "482911", v: "R$ 8.920", ok: true },
          { n: "482912", v: "R$ 3.200", ok: false },
          { n: "482913", v: "R$ 21.100", ok: true },
          { n: "482914", v: "R$ 5.840", ok: true },
        ].map((r, i) => (
          <div
            key={r.n}
            className="grid grid-cols-3 px-2 py-1 text-[8.5px]"
            style={{
              borderTop: i > 0 ? "1px solid oklch(0.94 0.005 110)" : undefined,
              backgroundColor: !r.ok ? "oklch(0.97 0.025 50)" : "transparent",
            }}
          >
            <span className="font-mono text-foreground">NF-{r.n}</span>
            <span className="text-right text-sage">{r.v}</span>
            <span
              className="text-right font-semibold uppercase tracking-wider text-[7px]"
              style={{
                color: r.ok ? "oklch(0.55 0.13 145)" : "oklch(0.55 0.16 50)",
              }}
            >
              {r.ok ? "✓ ok" : "revisar"}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between text-[8px] text-muted-foreground">
        <span>5 NFs · 1 divergência</span>
        <span className="font-semibold text-foreground">R$ 51.460</span>
      </div>
    </WindowFrame>
  );
}

/** Comercial — Pipeline de vendas com funil */
export function CopilotoMockup() {
  return (
    <WindowFrame theme="light">
      <div className="flex items-center justify-between">
        <p className="text-[9px] font-semibold tracking-tight text-foreground">Pipeline · março</p>
        <span
          className="text-[8px] font-semibold inline-flex items-center gap-0.5"
          style={{ color: "oklch(0.62 0.17 125)" }}
        >
          <ArrowUp className="h-2 w-2" strokeWidth={2.5} />
          +18%
        </span>
      </div>

      {/* Funnel rows */}
      <div className="space-y-1.5 flex-1">
        {[
          { l: "Lead qualificado", v: 128, w: "100%" },
          { l: "Reunião marcada", v: 72, w: "72%" },
          { l: "Proposta enviada", v: 41, w: "55%" },
          { l: "Negociação", v: 23, w: "38%" },
          { l: "Fechado", v: 12, w: "22%" },
        ].map((row) => (
          <div key={row.l}>
            <div className="flex items-center justify-between mb-0.5">
              <span className="text-[8.5px] text-foreground">{row.l}</span>
              <span className="text-[8.5px] font-mono text-muted-foreground">{row.v}</span>
            </div>
            <div
              className="h-1.5 rounded-full overflow-hidden"
              style={{ backgroundColor: "oklch(0.95 0.005 110)" }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: row.w,
                  background: "linear-gradient(90deg, oklch(0.62 0.17 125), oklch(0.82 0.2 115))",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div
        className="mt-auto flex items-center justify-between rounded p-1.5"
        style={{
          backgroundColor: "oklch(0.97 0.025 125)",
          border: "1px solid oklch(0.85 0.05 125)",
        }}
      >
        <span className="text-[8px] text-foreground font-semibold">Receita projetada</span>
        <span className="text-[10px] font-bold text-foreground">R$ 1,42M</span>
      </div>
    </WindowFrame>
  );
}

/** Diretoria — Relatório executivo dark premium */
export function RelatorioMockup() {
  return (
    <WindowFrame theme="dark">
      <div className="flex items-center justify-between">
        <p className="text-[9px] font-semibold text-white">Diretoria · semanal</p>
        <span
          className="text-[7px] uppercase tracking-wider"
          style={{ color: "oklch(0.6 0.02 110)" }}
        >
          12 → 18 mar
        </span>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-2 gap-1.5">
        {[
          { l: "Receita", v: "R$ 1,42M", d: "+18%", up: true },
          { l: "Margem", v: "32,4%", d: "+1,2pp", up: true },
          { l: "CAC", v: "R$ 184", d: "−9%", up: true },
          { l: "Churn", v: "2,1%", d: "−0,4pp", up: true },
        ].map((k) => (
          <div
            key={k.l}
            className="rounded p-1.5"
            style={{
              backgroundColor: "oklch(0.22 0.022 122)",
              border: "1px solid oklch(0.3 0.025 122)",
            }}
          >
            <p
              className="text-[7px] uppercase tracking-wider"
              style={{ color: "oklch(0.6 0.02 110)" }}
            >
              {k.l}
            </p>
            <p className="text-[12px] font-bold text-white leading-none mt-0.5">{k.v}</p>
            <p
              className="text-[7px] font-semibold mt-0.5 inline-flex items-center gap-0.5"
              style={{ color: "oklch(0.82 0.2 115)" }}
            >
              {k.up ? (
                <ArrowUp className="h-2 w-2" strokeWidth={2.5} />
              ) : (
                <ArrowDown className="h-2 w-2" strokeWidth={2.5} />
              )}
              {k.d}
            </p>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div className="flex-1 mt-1 flex flex-col">
        <p
          className="text-[7px] uppercase tracking-wider mb-1"
          style={{ color: "oklch(0.6 0.02 110)" }}
        >
          Receita · 12 sem
        </p>
        <div className="flex-1 flex items-end gap-1">
          {[42, 55, 48, 60, 58, 70, 65, 78, 72, 82, 85, 95].map((h, i) => (
            <MicroBar
              key={i}
              height={h}
              color={i === 11 ? "oklch(0.82 0.2 115)" : "oklch(0.95 0.22 115 / 0.4)"}
            />
          ))}
        </div>
      </div>
    </WindowFrame>
  );
}

/** RH — Headcount + clima dashboard */
export function AssistenteMockup() {
  return (
    <WindowFrame theme="light">
      <div className="flex items-center justify-between">
        <p className="text-[9px] font-semibold tracking-tight text-foreground">
          Pessoas · mar/2026
        </p>
        <span className="text-[8px] font-semibold" style={{ color: "oklch(0.62 0.17 125)" }}>
          124 ativos
        </span>
      </div>

      {/* Donut + legend */}
      <div className="flex items-center gap-3">
        <svg viewBox="0 0 60 60" className="h-14 w-14">
          {/* Donut chart */}
          <circle
            cx="30"
            cy="30"
            r="22"
            fill="none"
            stroke="oklch(0.95 0.005 110)"
            strokeWidth="8"
          />
          <circle
            cx="30"
            cy="30"
            r="22"
            fill="none"
            stroke="oklch(0.62 0.17 125)"
            strokeWidth="8"
            strokeDasharray="62 138"
            transform="rotate(-90 30 30)"
          />
          <circle
            cx="30"
            cy="30"
            r="22"
            fill="none"
            stroke="oklch(0.55 0.13 240)"
            strokeWidth="8"
            strokeDasharray="38 162"
            strokeDashoffset="-62"
            transform="rotate(-90 30 30)"
          />
          <circle
            cx="30"
            cy="30"
            r="22"
            fill="none"
            stroke="oklch(0.6 0.16 50)"
            strokeWidth="8"
            strokeDasharray="22 178"
            strokeDashoffset="-100"
            transform="rotate(-90 30 30)"
          />
          <text
            x="30"
            y="33"
            textAnchor="middle"
            fontSize="9"
            fontWeight="700"
            fill="oklch(0.18 0.02 122)"
          >
            124
          </text>
        </svg>

        <div className="flex flex-col gap-1 text-[8px]">
          {[
            { l: "Operações", v: "62", c: "oklch(0.62 0.17 125)" },
            { l: "Comercial", v: "38", c: "oklch(0.55 0.13 240)" },
            { l: "Produto", v: "24", c: "oklch(0.6 0.16 50)" },
          ].map((s) => (
            <div key={s.l} className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-sm" style={{ backgroundColor: s.c }} />
              <span className="text-foreground">{s.l}</span>
              <span className="ml-auto font-mono text-muted-foreground">{s.v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Climate row */}
      <div
        className="mt-auto rounded p-1.5"
        style={{
          backgroundColor: "oklch(0.97 0.004 110)",
          border: "1px solid oklch(0.92 0.005 110)",
        }}
      >
        <div className="flex items-center justify-between">
          <span className="text-[8px] text-muted-foreground">Clima eNPS</span>
          <span className="text-[10px] font-bold text-foreground">+62</span>
        </div>
        <div
          className="mt-1 h-1 rounded-full overflow-hidden"
          style={{ backgroundColor: "oklch(0.94 0.005 110)" }}
        >
          <div
            className="h-full rounded-full"
            style={{
              width: "78%",
              background: "linear-gradient(90deg, oklch(0.62 0.17 125), oklch(0.82 0.2 115))",
            }}
          />
        </div>
      </div>
    </WindowFrame>
  );
}

/** Dados — Dashboard operacional com chart real */
export function DashboardMockup() {
  return (
    <WindowFrame theme="light">
      <div className="flex items-center justify-between">
        <p className="text-[9px] font-semibold tracking-tight text-foreground">Vendas · região</p>
        <span className="inline-flex items-center gap-1 text-[8px] font-semibold text-foreground">
          <Activity className="h-2.5 w-2.5" strokeWidth={2} />
          ao vivo
        </span>
      </div>

      {/* Bar chart by region */}
      <div className="space-y-1.5 flex-1">
        {[
          { l: "Sul", v: "R$ 482k", w: "92%", c: "oklch(0.62 0.17 125)" },
          { l: "Sudeste", v: "R$ 384k", w: "74%", c: "oklch(0.55 0.13 240)" },
          { l: "Nordeste", v: "R$ 218k", w: "42%", c: "oklch(0.6 0.16 50)" },
          { l: "Centro-O.", v: "R$ 142k", w: "27%", c: "oklch(0.5 0.13 290)" },
          { l: "Norte", v: "R$ 96k", w: "18%", c: "oklch(0.55 0.13 195)" },
        ].map((row) => (
          <div key={row.l} className="flex items-center gap-2">
            <span className="text-[8px] text-foreground w-12 shrink-0">{row.l}</span>
            <div
              className="flex-1 h-3 rounded-sm overflow-hidden"
              style={{ backgroundColor: "oklch(0.97 0.004 110)" }}
            >
              <div className="h-full" style={{ width: row.w, backgroundColor: row.c }} />
            </div>
            <span className="text-[8px] font-mono text-muted-foreground w-14 text-right">
              {row.v}
            </span>
          </div>
        ))}
      </div>

      <div
        className="mt-auto rounded p-1.5 flex items-center gap-1.5"
        style={{
          backgroundColor: "oklch(0.97 0.025 125)",
          border: "1px solid oklch(0.85 0.05 125)",
        }}
      >
        <TrendingUp
          className="h-3 w-3 shrink-0"
          style={{ color: "oklch(0.55 0.16 125)" }}
          strokeWidth={2}
        />
        <span className="text-[8px] text-foreground leading-tight">
          <span className="font-semibold">Sul</span> puxou +34% sobre a média.
        </span>
      </div>
    </WindowFrame>
  );
}
