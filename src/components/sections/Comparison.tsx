import { Reveal } from "@/components/Reveal";
import { Check, X, Minus } from "lucide-react";
import { TiltCard } from "@/components/TiltCard";

type Status = "no" | "partial" | "yes";

interface Cell {
  status: Status;
  label: string;
}

interface Row {
  feature: string;
  erp: Cell;
  factory: Cell;
  squads: Cell;
  iaplicada: Cell;
}

const ROWS: Row[] = [
  {
    feature: "Tempo até resultado",
    erp: { status: "no", label: "Meses" },
    factory: { status: "partial", label: "Variável" },
    squads: { status: "no", label: "Lento" },
    iaplicada: { status: "yes", label: "Semanas" },
  },
  {
    feature: "Aderência ao seu negócio",
    erp: { status: "no", label: "Limitada" },
    factory: { status: "partial", label: "Cara" },
    squads: { status: "partial", label: "Cara" },
    iaplicada: { status: "yes", label: "Adaptado ao contexto real" },
  },
  {
    feature: "Previsibilidade de investimento",
    erp: { status: "no", label: "Alto" },
    factory: { status: "no", label: "Muito alto" },
    squads: { status: "no", label: "Muito alto" },
    iaplicada: { status: "yes", label: "Investimento previsível" },
  },
  {
    feature: "Autonomia pós-implementação",
    erp: { status: "partial", label: "Fornecedor" },
    factory: { status: "partial", label: "Pessoas" },
    squads: { status: "partial", label: "Pessoas" },
    iaplicada: { status: "yes", label: "Autonomia via processos" },
  },
  {
    feature: "Visibilidade e controle para liderança",
    erp: { status: "partial", label: "Parcial" },
    factory: { status: "no", label: "Ad-hoc" },
    squads: { status: "no", label: "Depende" },
    iaplicada: { status: "yes", label: "Tempo real" },
  },
];

const STATUS_COLOR: Record<Status, string> = {
  no: "oklch(0.65 0.22 22)",
  partial: "oklch(0.78 0.16 88)",
  yes: "oklch(0.62 0.17 125)",
};

export function Comparison() {
  return (
    <section id="comparativo" className="section-veil py-[100px] lg:py-[140px]">
      <div className="container-page">
        <div className="text-center max-w-[820px] mx-auto">
          <Reveal>
            <span className="label-chip">
              <span className="dot" />
              Comparativo
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h-mix mt-6 text-[36px] sm:text-[44px] lg:text-[54px] text-foreground">
              Por que a <em>IAplicada</em> é diferente
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-[16px] text-sage leading-[1.6] max-w-[600px] mx-auto">
              5 critérios estratégicos. ERP, fábrica de software, squads internos e nós.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <TiltCard
            className="mt-14 rounded-2xl border border-border overflow-hidden max-w-[1080px] mx-auto relative"
            maxTilt={4}
            style={{
              backgroundColor: "var(--color-card)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            {/* Desktop */}
            <div className="hidden lg:block">
              <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr_1.1fr] border-b border-border">
                <HeaderCell title="Entregas" />
                <HeaderCell title="ERP" />
                <HeaderCell title="Fábrica de software" />
                <HeaderCell title="Squads internos" />
                <HeaderCell title="IAplicada" highlight />
              </div>

              {ROWS.map((row, i) => (
                <div
                  key={row.feature}
                  className={`grid grid-cols-[1.4fr_1fr_1fr_1fr_1.1fr] ${
                    i !== ROWS.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <div className="px-6 py-6 text-[15px] font-semibold text-foreground flex items-center">
                    {row.feature}
                  </div>
                  <BodyCell cell={row.erp} />
                  <BodyCell cell={row.factory} />
                  <BodyCell cell={row.squads} />
                  <BodyCell cell={row.iaplicada} highlight />
                </div>
              ))}
            </div>

            {/* Mobile */}
            <div className="lg:hidden divide-y divide-border">
              {ROWS.map((row) => (
                <div key={row.feature} className="p-5">
                  <p className="text-[15px] font-semibold text-foreground">{row.feature}</p>
                  <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2.5">
                    <MobileRow label="ERP" cell={row.erp} />
                    <MobileRow label="Fábrica" cell={row.factory} />
                    <MobileRow label="Squads" cell={row.squads} />
                    <MobileRow label="IAplicada" cell={row.iaplicada} highlight />
                  </div>
                </div>
              ))}
            </div>
          </TiltCard>
        </Reveal>
      </div>
    </section>
  );
}

function HeaderCell({ title, highlight }: { title: string; highlight?: boolean }) {
  return (
    <div
      className="px-6 py-5 border-l border-border first:border-l-0"
      style={
        highlight
          ? {
              background:
                "linear-gradient(180deg, oklch(0.62 0.17 125) 0%, oklch(0.55 0.16 125) 100%)",
            }
          : undefined
      }
    >
      <p
        className="text-[12px] uppercase tracking-[0.14em] font-bold"
        style={{ color: highlight ? "oklch(1 0 0)" : "var(--color-muted-foreground)" }}
      >
        {title || " "}
      </p>
    </div>
  );
}

function StatusIcon({ status }: { status: Status }) {
  const color = STATUS_COLOR[status];
  if (status === "yes") {
    return (
      <span
        className="h-5 w-5 rounded-full flex items-center justify-center shrink-0"
        style={{ backgroundColor: color }}
      >
        <Check className="h-3 w-3" style={{ color: "oklch(1 0 0)" }} strokeWidth={3} />
      </span>
    );
  }
  if (status === "no") {
    return (
      <span
        className="h-5 w-5 rounded-full flex items-center justify-center shrink-0"
        style={{ backgroundColor: `${color.slice(0, -1)} / 0.14)` }}
      >
        <X className="h-3 w-3 shrink-0" style={{ color }} strokeWidth={3} />
      </span>
    );
  }
  return (
    <span
      className="h-5 w-5 rounded-full flex items-center justify-center shrink-0"
      style={{ backgroundColor: `${color.slice(0, -1)} / 0.18)` }}
    >
      <Minus className="h-3 w-3 shrink-0" style={{ color }} strokeWidth={3} />
    </span>
  );
}

function BodyCell({ cell, highlight }: { cell: Cell; highlight?: boolean }) {
  return (
    <div
      className="px-6 py-6 border-l border-border first:border-l-0 flex items-center gap-2.5"
      style={highlight ? { backgroundColor: "oklch(0.62 0.17 125 / 0.08)" } : undefined}
    >
      <StatusIcon status={cell.status} />
      <span
        className="text-[14px] leading-tight"
        style={{
          color: highlight ? "var(--color-foreground)" : "var(--color-sage)",
          fontWeight: highlight ? 700 : 500,
        }}
      >
        {cell.label}
      </span>
    </div>
  );
}

function MobileRow({ label, cell, highlight }: { label: string; cell: Cell; highlight?: boolean }) {
  return (
    <div
      className="flex items-center gap-2 rounded-lg px-2.5 py-2"
      style={
        highlight
          ? { backgroundColor: "oklch(0.75 0.20 122 / 0.12)" }
          : { backgroundColor: "var(--color-card)" }
      }
    >
      <StatusIcon status={cell.status} />
      <div className="min-w-0">
        <p
          className="text-[10px] uppercase tracking-[0.1em] font-semibold leading-none"
          style={{
            color: highlight ? "var(--color-primary)" : "var(--color-muted-foreground)",
          }}
        >
          {label}
        </p>
        <p
          className="text-[12.5px] mt-1 leading-tight"
          style={{
            color: highlight ? "var(--color-foreground)" : "var(--color-sage)",
            fontWeight: highlight ? 700 : 500,
          }}
        >
          {cell.label}
        </p>
      </div>
    </div>
  );
}
