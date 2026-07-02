import { Reveal } from "@/components/Reveal";

/**
 * Impact (LP-C / dobra 9) — painel 3 colunas com dados auditados
 * de PSA, CB Move e Borges & Zembruski. Cada card tem stamp de
 * auditoria (data / status) reforçando o pillar "prova social pura".
 */

interface CaseMetric {
  label: string;
  value: string;
}

interface CaseCard {
  client: string;
  stamp: string;
  metrics: CaseMetric[];
}

const CASES: CaseCard[] = [
  {
    client: "PSA Consultores",
    stamp: "auditado 21/05/2026",
    metrics: [
      { label: "Assertividade tributária", value: "85% → 94%" },
      { label: "Produtividade da área", value: "+100%" },
      { label: "ROI projetado", value: "R$193k/ano" },
      { label: "Profissionais no sistema", value: "110+" },
    ],
  },
  {
    client: "CB Move Neuroscience",
    stamp: "validado jun/2026",
    metrics: [
      { label: "Crescimento de pacientes", value: "30 → 100+ (+233%)" },
      { label: "Headcount admin extra", value: "R$0" },
      { label: "Captação", value: "100% automatizada" },
    ],
  },
  {
    client: "Borges & Zembruski",
    stamp: "em produção · mar/2026",
    metrics: [
      { label: "SDR humano substituído", value: "R$60k/ano" },
      { label: "Pipeline sob gestão", value: "R$950k–R$1,9M" },
      { label: "Processos ativos no CRM", value: "190" },
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
              Resultado medido em <em>número real</em>,
              <br className="hidden sm:block" /> não em estimativa genérica.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-[16px] text-sage leading-[1.6] max-w-[560px] mx-auto">
              Payback médio dos projetos entregues: 12,2 meses.
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
      <p
        className="mt-1 text-[10.5px] uppercase tracking-[0.08em] font-semibold"
        style={{ color: "oklch(0.55 0.16 125)" }}
      >
        {card.stamp}
      </p>
      <div className="mt-5 space-y-4">
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
