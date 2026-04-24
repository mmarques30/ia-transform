import { Reveal } from "@/components/Reveal";
import { CheckCircle2 } from "lucide-react";

type Status = "red" | "yellow" | "green";

interface Cell {
  status: Status;
  text: string;
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
    feature: "Velocidade de Implementação",
    erp: { status: "red", text: "Lenta, meses de setup" },
    factory: { status: "red", text: "Média, depende de escopo" },
    squads: { status: "red", text: "Lenta, onboarding demorado" },
    iaplicada: { status: "green", text: "Rápida, foco em impacto imediato" },
  },
  {
    feature: "Personalização",
    erp: { status: "red", text: "Limitada ao sistema" },
    factory: { status: "yellow", text: "Alta, porém complexa" },
    squads: { status: "yellow", text: "Alta, porém complexa" },
    iaplicada: { status: "green", text: "Total, baseada na operação real" },
  },
  {
    feature: "Custo Inicial",
    erp: { status: "red", text: "Alto" },
    factory: { status: "red", text: "Muito alto" },
    squads: { status: "red", text: "Muito alto" },
    iaplicada: { status: "green", text: "Controlado e previsível" },
  },
  {
    feature: "Manutenção",
    erp: { status: "yellow", text: "Dependência do fornecedor" },
    factory: { status: "yellow", text: "Dependência de pessoas" },
    squads: { status: "yellow", text: "Dependência de pessoas" },
    iaplicada: { status: "green", text: "Processos claros e automações" },
  },
  {
    feature: "Foco em Resultado",
    erp: { status: "red", text: "Baixo" },
    factory: { status: "yellow", text: "Média" },
    squads: { status: "yellow", text: "Variável" },
    iaplicada: { status: "green", text: "Alto, orientado à decisão" },
  },
  {
    feature: "Visibilidade da Operação",
    erp: { status: "yellow", text: "Parcial" },
    factory: { status: "red", text: "Customizada" },
    squads: { status: "red", text: "Depende do time" },
    iaplicada: { status: "green", text: "Centralizada e em tempo real" },
  },
  {
    feature: "Escalabilidade",
    erp: { status: "red", text: "Limitada" },
    factory: { status: "red", text: "Demorada" },
    squads: { status: "red", text: "Difícil" },
    iaplicada: { status: "green", text: "Natural e progressiva" },
  },
  {
    feature: "Complexidade para o Gestor",
    erp: { status: "red", text: "Alta" },
    factory: { status: "red", text: "Alta" },
    squads: { status: "red", text: "Muito alta" },
    iaplicada: { status: "green", text: "Baixa, decisões simplificadas" },
  },
];

const STATUS_DOT: Record<Status, string> = {
  red: "oklch(0.65 0.22 22)",
  yellow: "oklch(0.82 0.17 88)",
  green: "oklch(0.65 0.2 140)",
};

export function Comparison() {
  return (
    <section
      id="comparativo"
      className="py-[100px] lg:py-[140px]"
      style={{ backgroundColor: "var(--color-surface)" }}
    >
      <div className="container-page">
        <div className="text-center max-w-[820px] mx-auto">
          <Reveal>
            <h2 className="h-mix text-[36px] sm:text-[44px] lg:text-[54px] text-foreground">
              Por que a <em>IAplicada</em> é diferente
              <br />
              de ERP e fábrica de software
            </h2>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div
            className="mt-16 rounded-2xl border border-border overflow-hidden"
            style={{
              backgroundColor: "var(--color-card)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            {/* Desktop */}
            <div className="hidden lg:block">
              <div className="grid grid-cols-[1.3fr_1fr_1fr_1fr_1.1fr] border-b border-border">
                <HeaderCell title="Entregas" />
                <HeaderCell title="ERP Tradicional" />
                <HeaderCell title="Fábrica de Software" />
                <HeaderCell title="Squads Internos" />
                <HeaderCell title="IAplicada" highlight />
              </div>

              {ROWS.map((row, i) => (
                <div
                  key={row.feature}
                  className={`grid grid-cols-[1.3fr_1fr_1fr_1fr_1.1fr] ${
                    i !== ROWS.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <div className="p-5 text-[14px] font-semibold text-foreground flex items-center">
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
                  <p className="text-[14px] font-semibold text-foreground">{row.feature}</p>
                  <div className="mt-4 space-y-2.5">
                    <MobileRow label="ERP Tradicional" cell={row.erp} />
                    <MobileRow label="Fábrica de Software" cell={row.factory} />
                    <MobileRow label="Squads Internos" cell={row.squads} />
                    <MobileRow label="IAplicada" cell={row.iaplicada} highlight />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function HeaderCell({ title, highlight }: { title: string; highlight?: boolean }) {
  return (
    <div
      className="p-5 border-l border-border first:border-l-0"
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
        className="text-[13px] uppercase tracking-[0.12em] font-bold"
        style={{ color: highlight ? "oklch(0.1 0.01 110)" : "var(--color-foreground)" }}
      >
        {title}
      </p>
    </div>
  );
}

function BodyCell({ cell, highlight }: { cell: Cell; highlight?: boolean }) {
  return (
    <div
      className="p-5 border-l border-border first:border-l-0"
      style={highlight ? { backgroundColor: "oklch(0.62 0.17 125 / 0.12)" } : undefined}
    >
      <div className="flex items-start gap-2.5">
        {highlight ? (
          <CheckCircle2
            className="h-4 w-4 mt-[2px] shrink-0"
            style={{ color: "var(--color-primary)" }}
            strokeWidth={2}
          />
        ) : (
          <span
            className="h-2.5 w-2.5 rounded-full mt-[5px] shrink-0"
            style={{ backgroundColor: STATUS_DOT[cell.status] }}
          />
        )}
        <span
          className="text-[13px] leading-[1.45]"
          style={{
            color: highlight ? "var(--color-foreground)" : "var(--color-sage)",
            fontWeight: highlight ? 600 : 400,
          }}
        >
          {cell.text}
        </span>
      </div>
    </div>
  );
}

function MobileRow({ label, cell, highlight }: { label: string; cell: Cell; highlight?: boolean }) {
  return (
    <div className="flex items-start gap-2.5">
      {highlight ? (
        <CheckCircle2
          className="h-4 w-4 mt-[2px] shrink-0"
          style={{ color: "var(--color-primary)" }}
          strokeWidth={2}
        />
      ) : (
        <span
          className="h-2.5 w-2.5 rounded-full mt-[5px] shrink-0"
          style={{ backgroundColor: STATUS_DOT[cell.status] }}
        />
      )}
      <div>
        <p
          className="text-[11px] uppercase tracking-[0.12em] font-semibold"
          style={{
            color: highlight ? "var(--color-primary)" : "var(--color-muted-foreground)",
          }}
        >
          {label}
        </p>
        <p className="text-[13px] text-sage mt-0.5">{cell.text}</p>
      </div>
    </div>
  );
}
