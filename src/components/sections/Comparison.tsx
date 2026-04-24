import { Reveal } from "@/components/Reveal";
import { Check, Minus, X } from "lucide-react";

type Cell = { kind: "yes" | "no" | "partial"; text: string };

interface Row {
  feature: string;
  ia: Cell;
  erp: Cell;
  factory: Cell;
}

const ROWS: Row[] = [
  {
    feature: "Tempo até rodar",
    ia: { kind: "yes", text: "3–12 semanas" },
    erp: { kind: "no", text: "6–18 meses" },
    factory: { kind: "partial", text: "4–9 meses" },
  },
  {
    feature: "Diagnóstico do seu contexto",
    ia: { kind: "yes", text: "Sempre, antes de tudo" },
    erp: { kind: "no", text: "Vende módulo" },
    factory: { kind: "partial", text: "Só técnico" },
  },
  {
    feature: "Foco em IA aplicada",
    ia: { kind: "yes", text: "Core do trabalho" },
    erp: { kind: "no", text: "Add-on superficial" },
    factory: { kind: "partial", text: "Depende" },
  },
  {
    feature: "Adoção pelo time",
    ia: { kind: "yes", text: "Ritual + treinamento" },
    erp: { kind: "partial", text: "Pontual" },
    factory: { kind: "no", text: "Entrega e tchau" },
  },
  {
    feature: "ROI mensurável",
    ia: { kind: "yes", text: "Métrica acordada antes" },
    erp: { kind: "no", text: "Raramente claro" },
    factory: { kind: "partial", text: "Só entrega" },
  },
  {
    feature: "Dependência de fornecedor",
    ia: { kind: "yes", text: "Opera sozinho depois" },
    erp: { kind: "no", text: "Contrato rígido" },
    factory: { kind: "no", text: "Manutenção paga" },
  },
];

function CellRender({ cell }: { cell: Cell }) {
  const Icon = cell.kind === "yes" ? Check : cell.kind === "partial" ? Minus : X;
  const color =
    cell.kind === "yes"
      ? "var(--color-primary)"
      : cell.kind === "partial"
        ? "var(--color-muted-foreground)"
        : "oklch(0.55 0.15 25)";

  return (
    <div className="flex items-start gap-2">
      <Icon className="h-4 w-4 mt-[2px] shrink-0" style={{ color }} strokeWidth={2.5} />
      <span className="text-[13px] leading-[1.5] text-sage">{cell.text}</span>
    </div>
  );
}

export function Comparison() {
  return (
    <section
      id="comparativo"
      className="py-[90px] lg:py-[120px]"
      style={{ backgroundColor: "var(--color-surface)" }}
    >
      <div className="container-page">
        <div className="max-w-[760px]">
          <Reveal>
            <span className="label-chip">
              <span className="dot" />
              Comparativo honesto
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h-mix mt-6 text-[36px] sm:text-[44px] lg:text-[52px] text-foreground">
              <em>Não é</em> ERP.
              <br />
              <em>Nem</em> fábrica de software.
            </h2>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div
            className="mt-12 rounded-xl border border-border bg-card overflow-hidden"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <div className="hidden lg:grid grid-cols-[1.3fr_1fr_1fr_1fr] border-b border-border">
              <div className="p-5 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                Critério
              </div>
              <div
                className="p-5 border-l border-border"
                style={{ backgroundColor: "oklch(0.62 0.17 125 / 0.08)" }}
              >
                <p className="text-[11px] uppercase tracking-[0.14em] text-primary font-semibold">
                  IAplicada Business
                </p>
              </div>
              <div className="p-5 border-l border-border">
                <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  ERP / SaaS
                </p>
              </div>
              <div className="p-5 border-l border-border">
                <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  Fábrica de software
                </p>
              </div>
            </div>

            <div className="hidden lg:block">
              {ROWS.map((row, i) => (
                <div
                  key={row.feature}
                  className={`grid grid-cols-[1.3fr_1fr_1fr_1fr] ${
                    i !== ROWS.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <div className="p-5 text-[14px] font-semibold text-foreground">{row.feature}</div>
                  <div
                    className="p-5 border-l border-border"
                    style={{ backgroundColor: "oklch(0.62 0.17 125 / 0.04)" }}
                  >
                    <CellRender cell={row.ia} />
                  </div>
                  <div className="p-5 border-l border-border">
                    <CellRender cell={row.erp} />
                  </div>
                  <div className="p-5 border-l border-border">
                    <CellRender cell={row.factory} />
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:hidden divide-y divide-border">
              {ROWS.map((row) => (
                <div key={row.feature} className="p-5">
                  <p className="text-[14px] font-semibold text-foreground">{row.feature}</p>
                  <div className="mt-4 space-y-3">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.14em] text-primary font-semibold">
                        IAplicada
                      </p>
                      <div className="mt-1.5">
                        <CellRender cell={row.ia} />
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                        ERP / SaaS
                      </p>
                      <div className="mt-1.5">
                        <CellRender cell={row.erp} />
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                        Fábrica de software
                      </p>
                      <div className="mt-1.5">
                        <CellRender cell={row.factory} />
                      </div>
                    </div>
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
