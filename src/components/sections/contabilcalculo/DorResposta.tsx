import { Reveal } from "@/components/Reveal";
import { useDiagnostico } from "./DiagnosticoContext";

/**
 * DorResposta — adota o padrão visual dos cards da /contabil/Process:
 * mini-mockup de widget no topo (fundo cream, SVG abstrato) + bloco
 * de texto embaixo com badge numerado, título e body.
 *
 * Cada widget representa visualmente a fase da dor:
 *   01 — Crescimento de clientes (curva de demanda subindo)
 *   02 — Folha crescendo junto (KPIs de overhead)
 *   03 — Margem caindo (chart de lucro descendente)
 */

interface Feature {
  n: string;
  headline: string;
  body: string;
  Mockup: () => React.ReactElement;
}

const FEATURES: Feature[] = [
  {
    n: "1",
    headline: "Você cresce em clientes.",
    body: "Quatro contas novas no mês. A operação responde com plantão de sênior, hora extra e contratação de júnior.",
    Mockup: ClientesMockup,
  },
  {
    n: "2",
    headline: "A folha cresce junto.",
    body: "Onboarding consome semanas. Treinamento, supervisão, retrabalho. Cada novo cliente custa mais margem.",
    Mockup: FolhaMockup,
  },
  {
    n: "3",
    headline: "A margem some.",
    body: "Mais demanda, mais custo, mesma operação manual. O escritório cresce sem virar lucro.",
    Mockup: MargemMockup,
  },
];

export function DorResposta() {
  const { open } = useDiagnostico();
  return (
    <section className="relative py-[100px] lg:py-[160px] overflow-hidden">
      <div className="container-page relative">
        <div className="max-w-[900px] mx-auto text-center">
          <Reveal>
            <h2
              className="h-mix text-[38px] sm:text-[52px] lg:text-[72px] leading-[0.98] text-foreground"
              style={{ letterSpacing: "-0.03em" }}
            >
              Crescer sem escalar margem
              <br />
              <em>tem um nome.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 text-[16px] lg:text-[18px] text-sage leading-[1.55] max-w-[640px] mx-auto">
              O problema não é vender mais clientes. É que a operação contábil ainda escala
              proporcional à contratação.
            </p>
          </Reveal>
        </div>

        {/* 3 cards estilo /contabil/Process — widget cream top + texto bottom */}
        <div className="mt-20 lg:mt-24 grid lg:grid-cols-3 gap-5 lg:gap-6">
          {FEATURES.map((f, i) => (
            <Reveal key={f.n} delay={0.08 + i * 0.08}>
              <div className="tech-card overflow-hidden h-full flex flex-col">
                {/* Mini-mockup cream top */}
                <div
                  className="aspect-[16/10] relative overflow-hidden"
                  style={{
                    backgroundColor: "oklch(0.97 0.004 110)",
                    borderBottom: "1px solid var(--color-border)",
                  }}
                >
                  <f.Mockup />
                </div>

                {/* Conteúdo embaixo */}
                <div className="p-6 lg:p-7 flex flex-col flex-1 relative">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="h-7 w-7 rounded-full flex items-center justify-center text-[12px] font-bold"
                      style={{
                        backgroundColor: "var(--color-primary)",
                        color: "oklch(1 0 0)",
                      }}
                    >
                      {f.n}
                    </span>
                    <span
                      className="h-[1px] flex-1"
                      style={{
                        background:
                          "linear-gradient(90deg, var(--color-primary), transparent)",
                      }}
                    />
                  </div>
                  <h3
                    className="mt-5 h-mix text-[20px] lg:text-[24px] leading-[1.15] text-foreground"
                    style={{ letterSpacing: "-0.018em" }}
                  >
                    {f.headline}
                  </h3>
                  <p className="mt-3 text-[14px] lg:text-[14.5px] text-sage leading-[1.6]">
                    {f.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Bloco "A virada" — centralizado, separado por divider hairline */}
        <Reveal delay={0.32}>
          <div className="mt-24 lg:mt-32 max-w-[820px] mx-auto text-center">
            <div
              aria-hidden
              className="mx-auto mb-12 h-px w-24"
              style={{ backgroundColor: "var(--color-primary)" }}
            />
            <p
              className="text-[22px] lg:text-[30px] leading-[1.35] text-foreground"
              style={{ letterSpacing: "-0.012em" }}
            >
              A IA <em className="text-primary">não substitui</em> contador. Assume o pedaço
              operacional para você voltar ao que paga melhor:{" "}
              <span className="font-semibold">consultoria, planejamento</span> e{" "}
              <span className="font-semibold">relação com cliente</span>.
            </p>
            <p className="mt-7 text-[15px] lg:text-[16.5px] text-sage leading-[1.6]">
              Em <span className="font-bold text-foreground">7 dias</span>, primeira rotina
              automatizada em produção. Em{" "}
              <span className="font-bold text-foreground">8 semanas</span>, time autônomo.
            </p>

            <button
              type="button"
              onClick={open}
              className="mt-12 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.22em] font-bold hover:opacity-80 transition-opacity"
              style={{ color: "var(--color-primary)" }}
            >
              Quanto isso vale pra você
              <span aria-hidden>→</span>
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
 * Mini-mockups SVG — fundo cream, paleta da marca
 * ─────────────────────────────────────────────────────── */

const INK = "oklch(0.18 0.02 122)";
const OLIVE = "oklch(0.62 0.17 125)";
const OLIVE_LIGHT = "oklch(0.82 0.20 115)";
const RULE = "oklch(0.92 0.005 110)";
const MUTED = "oklch(0.55 0.02 110)";
const RED_SOFT = "oklch(0.65 0.18 25)";

/** 01 — Crescimento de clientes: bar chart subindo + KPI */
function ClientesMockup() {
  return (
    <div className="absolute inset-0 p-3 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <p
          className="text-[8px] uppercase tracking-wider font-semibold"
          style={{ color: MUTED }}
        >
          Carteira · 90 dias
        </p>
        <span className="text-[8px] font-bold" style={{ color: OLIVE }}>
          +4 novos
        </span>
      </div>

      <div className="flex items-end gap-1 flex-1">
        {[28, 34, 30, 42, 48, 55, 64, 72, 80].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm"
            style={{
              height: `${h}%`,
              background:
                i >= 6
                  ? `linear-gradient(180deg, ${OLIVE_LIGHT}, ${OLIVE})`
                  : "oklch(0.90 0.01 122)",
            }}
          />
        ))}
      </div>

      <div className="flex items-center justify-between text-[8px]" style={{ color: MUTED }}>
        <span>Jan</span>
        <span>Mar</span>
        <span className="font-semibold" style={{ color: INK }}>
          Hoje
        </span>
      </div>
    </div>
  );
}

/** 02 — Folha crescendo: 3 KPIs com setas pra cima */
function FolhaMockup() {
  const kpis = [
    { label: "Folha", value: "+22%" },
    { label: "Onboarding", value: "18d" },
    { label: "Retrabalho", value: "+34%" },
  ];
  return (
    <div className="absolute inset-0 p-3 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <p
          className="text-[8px] uppercase tracking-wider font-semibold"
          style={{ color: MUTED }}
        >
          Operação · custo
        </p>
        <span
          className="text-[7px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded"
          style={{
            backgroundColor: "oklch(0.97 0.04 25)",
            color: RED_SOFT,
          }}
        >
          Sobe
        </span>
      </div>

      <div className="grid grid-cols-3 gap-1.5 flex-1">
        {kpis.map((k) => (
          <div
            key={k.label}
            className="rounded p-1.5 flex flex-col justify-between"
            style={{
              backgroundColor: "oklch(1 0 0)",
              border: `1px solid ${RULE}`,
            }}
          >
            <p
              className="text-[7px] uppercase tracking-wider font-semibold"
              style={{ color: MUTED }}
            >
              {k.label}
            </p>
            <div className="flex items-end gap-0.5">
              <p
                className="text-[12px] font-bold leading-none"
                style={{ color: INK }}
              >
                {k.value}
              </p>
              <span className="text-[9px] leading-none" style={{ color: RED_SOFT }}>
                ↑
              </span>
            </div>
          </div>
        ))}
      </div>

      <div
        className="rounded text-[8px] py-1 px-1.5 flex items-center gap-1"
        style={{
          backgroundColor: "oklch(0.97 0.04 25)",
          border: `1px solid oklch(0.85 0.06 25)`,
        }}
      >
        <span style={{ color: RED_SOFT }}>●</span>
        <span style={{ color: INK }} className="font-semibold">
          Cada cliente novo custa mais
        </span>
      </div>
    </div>
  );
}

/** 03 — Margem caindo: line chart descendente */
function MargemMockup() {
  return (
    <div className="absolute inset-0 p-3 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <p
          className="text-[8px] uppercase tracking-wider font-semibold"
          style={{ color: MUTED }}
        >
          Margem · trimestre
        </p>
        <span className="text-[8px] font-bold" style={{ color: RED_SOFT }}>
          −18%
        </span>
      </div>

      <div className="flex-1 relative">
        <svg viewBox="0 0 100 38" className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="margem-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={RED_SOFT} stopOpacity="0.18" />
              <stop offset="100%" stopColor={RED_SOFT} stopOpacity="0" />
            </linearGradient>
          </defs>
          {[10, 20, 30].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="100"
              y2={y}
              stroke={RULE}
              strokeWidth="0.5"
              strokeDasharray="2 2"
            />
          ))}
          <path
            d="M0,6 L14,9 L28,12 L42,14 L56,19 L70,23 L84,28 L100,32 L100,38 L0,38 Z"
            fill="url(#margem-grad)"
          />
          <path
            d="M0,6 L14,9 L28,12 L42,14 L56,19 L70,23 L84,28 L100,32"
            fill="none"
            stroke={RED_SOFT}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="100" cy="32" r="2" fill={RED_SOFT} />
        </svg>
      </div>

      <div className="flex items-center justify-between text-[8px]">
        <span style={{ color: MUTED }}>Q1</span>
        <span style={{ color: MUTED }}>Q2</span>
        <span style={{ color: MUTED }}>Q3</span>
        <span className="font-semibold" style={{ color: RED_SOFT }}>
          Q4
        </span>
      </div>
    </div>
  );
}
