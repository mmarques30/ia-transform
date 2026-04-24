import { Reveal } from "@/components/Reveal";
import { Check, Minus, X } from "lucide-react";

type Cell =
  | { kind: "yes"; text: string }
  | { kind: "no"; text: string }
  | { kind: "partial"; text: string };

interface Row {
  feature: string;
  ia: Cell;
  erp: Cell;
  factory: Cell;
}

const ROWS: Row[] = [
  {
    feature: "Tempo até a IA estar rodando",
    ia: { kind: "yes", text: "3 a 12 semanas" },
    erp: { kind: "no", text: "6 a 18 meses" },
    factory: { kind: "partial", text: "4 a 9 meses" },
  },
  {
    feature: "Diagnóstico do seu contexto antes de qualquer solução",
    ia: { kind: "yes", text: "Sempre — ponto de partida" },
    erp: { kind: "no", text: "Não, vende módulo" },
    factory: { kind: "partial", text: "Só do escopo técnico" },
  },
  {
    feature: "Personalização real à operação",
    ia: { kind: "yes", text: "Fluxo desenhado pro seu time" },
    erp: { kind: "no", text: "Seu time adapta ao software" },
    factory: { kind: "yes", text: "Sim, mas com briefing seu" },
  },
  {
    feature: "Foco em IA aplicada (não TI genérica)",
    ia: { kind: "yes", text: "É o core do trabalho" },
    erp: { kind: "no", text: "Add-on de IA superficial" },
    factory: { kind: "partial", text: "Depende do fornecedor" },
  },
  {
    feature: "Adoção pelo time (não só entrega técnica)",
    ia: { kind: "yes", text: "Treinamento + ritual semanal" },
    erp: { kind: "partial", text: "Treinamento pontual" },
    factory: { kind: "no", text: "Entrega e tchau" },
  },
  {
    feature: "Medição de ROI e métricas claras",
    ia: { kind: "yes", text: "Métrica acordada antes de executar" },
    erp: { kind: "no", text: "Raramente mensurável" },
    factory: { kind: "partial", text: "Só entregável, não impacto" },
  },
  {
    feature: "Dependência de fornecedor a longo prazo",
    ia: { kind: "yes", text: "Time opera sozinho após handover" },
    erp: { kind: "no", text: "Alta — contratos anuais rígidos" },
    factory: { kind: "no", text: "Alta — manutenção paga" },
  },
  {
    feature: "Investimento inicial",
    ia: { kind: "yes", text: "Escopo por projeto, mensal" },
    erp: { kind: "no", text: "Licença + implantação pesada" },
    factory: { kind: "partial", text: "Escopo fechado por entrega" },
  },
];

function CellRender({ cell }: { cell: Cell }) {
  const Icon = cell.kind === "yes" ? Check : cell.kind === "partial" ? Minus : X;
  const iconClass =
    cell.kind === "yes"
      ? "text-primary-glow"
      : cell.kind === "partial"
        ? "text-muted-foreground"
        : "text-muted-foreground/60";

  return (
    <div className="flex items-start gap-3">
      <Icon className={`h-4 w-4 mt-[3px] shrink-0 ${iconClass}`} strokeWidth={2.5} />
      <span className="text-[14px] leading-[1.5] text-sage">{cell.text}</span>
    </div>
  );
}

export function Comparison() {
  return (
    <section id="comparativo" className="py-[120px] lg:py-[160px] bg-background">
      <div className="container-page">
        <div className="text-center max-w-[820px] mx-auto">
          <Reveal>
            <span className="label-chip">✱ Comparativo honesto</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h-display mt-6 text-[36px] sm:text-[44px] lg:text-[48px] text-foreground">
              Por que não é um ERP.
              <br />
              Nem uma fábrica de software.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-[17px] text-sage leading-[1.6] max-w-[720px] mx-auto">
              Business é implementação de IA aplicada — um formato novo, pensado pra empresas que
              precisam de resultado na operação, não de mais um projeto de TI parado no roadmap.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="mt-16 rounded-lg border border-border bg-card overflow-hidden">
            {/* Header row */}
            <div className="hidden lg:grid grid-cols-[1.4fr_1fr_1fr_1fr] gap-0 border-b border-border">
              <div className="p-6 text-xs uppercase tracking-[0.12em] text-muted-foreground">
                Critério
              </div>
              <div
                className="p-6 border-l border-border"
                style={{
                  background:
                    "linear-gradient(180deg, oklch(0.245 0.055 122) 0%, oklch(0.225 0.045 122) 100%)",
                }}
              >
                <p className="text-xs uppercase tracking-[0.12em] text-primary-glow">
                  IAplicada Business
                </p>
                <p className="mt-1 text-foreground font-semibold">Implementação de IA</p>
              </div>
              <div className="p-6 border-l border-border">
                <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
                  Caminho A
                </p>
                <p className="mt-1 text-foreground font-semibold">ERP / SaaS tradicional</p>
              </div>
              <div className="p-6 border-l border-border">
                <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
                  Caminho B
                </p>
                <p className="mt-1 text-foreground font-semibold">Fábrica de software</p>
              </div>
            </div>

            {/* Rows — desktop */}
            <div className="hidden lg:block">
              {ROWS.map((row, i) => (
                <div
                  key={row.feature}
                  className={`grid grid-cols-[1.4fr_1fr_1fr_1fr] gap-0 ${
                    i !== ROWS.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <div className="p-6 text-[15px] font-semibold text-foreground">{row.feature}</div>
                  <div className="p-6 border-l border-border bg-card">
                    <CellRender cell={row.ia} />
                  </div>
                  <div className="p-6 border-l border-border">
                    <CellRender cell={row.erp} />
                  </div>
                  <div className="p-6 border-l border-border">
                    <CellRender cell={row.factory} />
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile stacked cards */}
            <div className="lg:hidden divide-y divide-border">
              {ROWS.map((row) => (
                <div key={row.feature} className="p-6">
                  <p className="text-[15px] font-semibold text-foreground">{row.feature}</p>
                  <div className="mt-5 space-y-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.12em] text-primary-glow">
                        IAplicada Business
                      </p>
                      <div className="mt-2">
                        <CellRender cell={row.ia} />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
                        ERP / SaaS tradicional
                      </p>
                      <div className="mt-2">
                        <CellRender cell={row.erp} />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
                        Fábrica de software
                      </p>
                      <div className="mt-2">
                        <CellRender cell={row.factory} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <p className="mt-10 text-center text-sm text-muted-foreground italic max-w-[720px] mx-auto">
            Se o seu problema é ERP, contrate um ERP. Se é sistema novo do zero, contrate uma
            fábrica. Se é IA aplicada ao operacional que já existe, é pra isso que a gente existe.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
