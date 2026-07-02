import { Reveal } from "@/components/Reveal";

/**
 * Impact (LP-B / dobra 9) — painel 3 colunas com dados auditados
 * de 3 cases: PSA Consultores, Quadra Arquitetura, Turystar.
 * Substitui o antigo monitor de simulação genérico por prova real.
 */

interface CaseMetric {
  label: string;
  value: string;
}

interface CaseCard {
  client: string;
  metrics: CaseMetric[];
}

const CASES: CaseCard[] = [
  {
    client: "PSA Consultores",
    metrics: [
      { label: "Assertividade tributária", value: "85% → 94%" },
      { label: "Produtividade", value: "+100%" },
      { label: "ROI projetado", value: "R$193k/ano" },
      { label: "Payback médio", value: "12,2 meses" },
    ],
  },
  {
    client: "Quadra Arquitetura",
    metrics: [
      { label: "Valor entregue vs contratado", value: "+225%" },
      { label: "R$10k contratado", value: "R$32k+ entregue" },
      { label: "Horas liberadas", value: "~90h/mês" },
    ],
  },
  {
    client: "Turystar",
    metrics: [
      { label: "Vendas no ERP", value: "17.886" },
      { label: "Passageiros sob gestão", value: "20.958" },
      { label: "Transfers cruzados", value: "7.886" },
    ],
  },
];

export function Impact() {
  return (
    <section className="section-veil py-[100px] lg:py-[140px] relative overflow-hidden">
      <div className="container-page relative">
        <div className="text-center max-w-[760px] mx-auto">
          <Reveal>
            <span className="label-chip">
              <span className="dot" />
              Impacto operacional
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h-mix mt-6 text-[26px] sm:text-[32px] lg:text-[36px] text-foreground">
              Sem improviso, a operação <em>ganha previsibilidade.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-[16px] text-sage leading-[1.6] max-w-[560px] mx-auto">
              Três referências. Resultados auditados.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div
            className="mt-12 lg:mt-14 rounded-2xl overflow-hidden max-w-[1080px] mx-auto"
            style={{
              backgroundColor: "oklch(1 0 0)",
              border: "1px solid oklch(0.92 0.005 110)",
              boxShadow:
                "0 30px 60px -20px oklch(0.18 0.02 122 / 0.18), 0 8px 20px -8px oklch(0.18 0.02 122 / 0.08)",
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3">
              {CASES.map((c, i) => (
                <CaseColumn key={c.client} card={c} isFirst={i === 0} />
              ))}
            </div>
            <div
              className="px-5 lg:px-6 py-3.5 border-t text-[11.5px] uppercase tracking-[0.08em] font-semibold text-center"
              style={{
                borderColor: "oklch(0.92 0.005 110)",
                backgroundColor: "oklch(0.985 0.004 110)",
                color: "oklch(0.5 0.015 115)",
              }}
            >
              Dados auditados · portfólio IAplicada · jun/2026
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CaseColumn({ card, isFirst }: { card: CaseCard; isFirst: boolean }) {
  return (
    <div
      className="px-6 lg:px-7 py-7 lg:py-8"
      style={{
        borderTop: !isFirst ? "1px solid oklch(0.94 0.005 110)" : undefined,
      }}
    >
      <p
        className="text-[10.5px] uppercase tracking-[0.16em] font-semibold"
        style={{ color: "oklch(0.5 0.015 115)" }}
      >
        Case
      </p>
      <p
        className="mt-1.5 text-[17px] font-bold tracking-tight leading-tight"
        style={{ color: "oklch(0.18 0.02 122)" }}
      >
        {card.client}
      </p>
      <div className="mt-6 space-y-4">
        {card.metrics.map((m) => (
          <div key={m.label}>
            <p
              className="text-[12px] font-medium leading-tight"
              style={{ color: "oklch(0.4 0.015 115)" }}
            >
              {m.label}
            </p>
            <p
              className="mt-1 text-[18px] font-bold tracking-tight leading-tight"
              style={{ color: "oklch(0.55 0.16 125)" }}
            >
              {m.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
