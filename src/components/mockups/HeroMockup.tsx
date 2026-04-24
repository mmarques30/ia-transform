import { Sparkles, TrendingUp, Clock } from "lucide-react";

export function HeroMockup() {
  return (
    <div className="relative">
      {/* Subtle glow behind the mockup */}
      <div
        className="absolute -inset-8 -z-10 rounded-3xl opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.82 0.18 118 / 0.25) 0%, transparent 70%)",
        }}
      />

      <div
        className="rounded-xl border border-border bg-card overflow-hidden"
        style={{ boxShadow: "var(--shadow-elevated)" }}
      >
        {/* Window chrome */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-surface">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
          </div>
          <div className="ml-4 text-[11px] text-muted-foreground font-mono">
            painel · operação-ia
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* Header stat cards */}
          <div className="grid grid-cols-3 gap-3">
            <StatCard icon={Clock} label="Horas liberadas" value="+22h" tone="primary" />
            <StatCard icon={TrendingUp} label="1º contato" value="3,2×" tone="neutral" />
            <StatCard icon={Sparkles} label="Adoção time" value="94%" tone="neutral" />
          </div>

          {/* Chart */}
          <div className="rounded-lg border border-border p-4 bg-surface/50">
            <div className="flex items-center justify-between">
              <p className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                Eficiência · últimos 12 meses
              </p>
              <span className="text-[11px] font-semibold" style={{ color: "var(--color-primary)" }}>
                +47%
              </span>
            </div>
            <MiniChart />
          </div>

          {/* Flow items */}
          <div className="space-y-2">
            <FlowRow label="Triagem de atendimento" status="Ativo" on />
            <FlowRow label="Resposta a proposta comercial" status="Ativo" on />
            <FlowRow label="Conciliação de NF" status="Em calibragem" />
          </div>
        </div>
      </div>

      {/* Floating badge */}
      <div
        className="hidden md:flex absolute -bottom-5 -left-6 items-center gap-2 rounded-full border border-border bg-card px-4 py-2"
        style={{ boxShadow: "var(--shadow-card)" }}
      >
        <span
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: "var(--color-primary)" }}
        />
        <span className="text-xs font-semibold text-foreground">Handover completo · semana 12</span>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  value: string;
  tone: "primary" | "neutral";
}) {
  return (
    <div className="rounded-lg border border-border p-3 bg-card">
      <Icon
        className={
          tone === "primary" ? "h-3.5 w-3.5 text-primary" : "h-3.5 w-3.5 text-muted-foreground"
        }
        strokeWidth={2}
      />
      <p className="mt-2 text-[10px] uppercase tracking-[0.1em] text-muted-foreground">{label}</p>
      <p
        className="mt-1 num-display text-[20px] leading-none"
        style={{
          color: tone === "primary" ? "var(--color-primary)" : "var(--color-accent)",
        }}
      >
        {value}
      </p>
    </div>
  );
}

function FlowRow({ label, status, on }: { label: string; status: string; on?: boolean }) {
  return (
    <div className="flex items-center justify-between rounded-md border border-border bg-card px-3 py-2.5">
      <div className="flex items-center gap-2.5">
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{
            backgroundColor: on ? "var(--color-primary)" : "var(--color-muted-foreground)",
          }}
        />
        <span className="text-[13px] font-medium text-foreground">{label}</span>
      </div>
      <span className="text-[11px] text-muted-foreground">{status}</span>
    </div>
  );
}

function MiniChart() {
  // Simple SVG sparkline
  const points = "0,40 10,38 20,35 30,34 40,30 50,28 60,22 70,20 80,14 90,10 100,6";
  return (
    <svg viewBox="0 0 100 44" preserveAspectRatio="none" className="mt-3 w-full h-16">
      <defs>
        <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.62 0.17 125)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="oklch(0.62 0.17 125)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline points={`${points} 100,44 0,44`} fill="url(#chartFill)" stroke="none" />
      <polyline
        points={points}
        fill="none"
        stroke="oklch(0.62 0.17 125)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
