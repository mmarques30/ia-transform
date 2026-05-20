import { Reveal } from "@/components/Reveal";
import { ArrowUp } from "lucide-react";

interface Benefit {
  n: string;
  label: string;
  text: string;
  Mockup: () => React.ReactElement;
}

const BENEFITS: Benefit[] = [
  {
    n: "01",
    label: "Autonomia",
    text: "A operação deixa de depender de uma única pessoa. Decisão distribuída, com base em processo.",
    Mockup: LiberdadeMockup,
  },
  {
    n: "02",
    label: "Estrutura",
    text: "Processos centralizados, papéis definidos e handoffs documentados.",
    Mockup: EstruturaMockup,
  },
  {
    n: "03",
    label: "Previsibilidade",
    text: "Visibilidade sobre entrada, saída e gargalos operacionais.",
    Mockup: PrevisibilidadeMockup,
  },
];

export function Segmentation() {
  return (
    <section className="py-[100px] lg:py-[140px] bg-background">
      <div className="container-page">
        {/* When structure changes — centered header + single row of aligned cards */}
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center max-w-[720px] mx-auto">
            <Reveal>
              <span className="label-chip">
                <span className="dot" />
                Resultado real
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h3 className="h-mix mt-5 text-[32px] sm:text-[40px] lg:text-[46px] text-foreground">
                Quando a estrutura muda, os
                <br />
                <em>indicadores</em> passam a responder.
              </h3>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-[16px] text-sage leading-[1.65] max-w-[640px] mx-auto">
                Resultados não são isolados. São consequência de uma empresa estruturada. Os
                indicadores abaixo refletem o impacto direto da estrutura na operação.
              </p>
            </Reveal>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
            {BENEFITS.map((b, i) => (
              <Reveal key={b.label} delay={i * 0.06}>
                <div className="tech-card overflow-hidden h-full flex flex-col">
                  {/* Mini mockup */}
                  <div
                    className="aspect-[16/9] relative overflow-hidden"
                    style={{
                      backgroundColor: "oklch(0.97 0.004 110)",
                      borderBottom: "1px solid var(--color-border)",
                    }}
                  >
                    <b.Mockup />
                  </div>
                  {/* Content */}
                  <div className="relative p-5 flex flex-col grow">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="num-display text-[11px] tracking-wider"
                        style={{ color: "var(--color-muted-foreground)" }}
                      >
                        {b.n}
                      </span>
                      <span
                        className="h-[1px] flex-1"
                        style={{
                          background: "linear-gradient(90deg, var(--color-primary), transparent)",
                        }}
                      />
                    </div>
                    <p className="relative mt-3 text-[18px] font-bold tracking-tight text-foreground">
                      {b.label}
                    </p>
                    <p className="relative mt-1.5 text-[13.5px] leading-[1.5] text-sage">
                      {b.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Mini-mockups — one per benefit, realistic widget feel              */
/* ------------------------------------------------------------------ */

/** Liberdade — Big number "+22h/sem" + sparkline crescente */
function LiberdadeMockup() {
  return (
    <div className="absolute inset-0 p-3 flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <p className="text-[8px] uppercase tracking-wider font-semibold text-muted-foreground">
          Tempo do dono · semanal
        </p>
        <span
          className="text-[7px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded"
          style={{
            backgroundColor: "oklch(0.97 0.025 125)",
            color: "oklch(0.45 0.16 125)",
          }}
        >
          ● ao vivo
        </span>
      </div>

      <div className="flex items-baseline gap-2">
        <p className="text-[28px] font-bold leading-none tracking-tight text-foreground">+22h</p>
        <span
          className="text-[10px] font-semibold inline-flex items-center gap-0.5"
          style={{ color: "oklch(0.55 0.16 125)" }}
        >
          <ArrowUp className="h-2.5 w-2.5" strokeWidth={2.5} />
          devolvidas
        </span>
      </div>

      <div className="flex-1 -mx-1">
        <svg viewBox="0 0 200 40" preserveAspectRatio="none" className="w-full h-full">
          <defs>
            <linearGradient id="grad-lib" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.62 0.17 125)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="oklch(0.62 0.17 125)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0,32 L20,28 L40,30 L60,22 L80,18 L100,20 L120,12 L140,14 L160,8 L180,4 L200,2 L200,40 L0,40 Z"
            fill="url(#grad-lib)"
          />
          <path
            d="M0,32 L20,28 L40,30 L60,22 L80,18 L100,20 L120,12 L140,14 L160,8 L180,4 L200,2"
            fill="none"
            stroke="oklch(0.62 0.17 125)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="200" cy="2" r="2.5" fill="oklch(0.62 0.17 125)" />
        </svg>
      </div>
    </div>
  );
}

/** Estrutura — fluxo de processo com 4 nós conectados */
function EstruturaMockup() {
  return (
    <div className="absolute inset-0 p-3 flex flex-col gap-1.5">
      <p className="text-[8px] uppercase tracking-wider font-semibold text-muted-foreground">
        Fluxo · Onboarding cliente
      </p>

      <svg viewBox="0 0 200 60" className="flex-1 w-full">
        {/* connectors */}
        <line x1="30" y1="30" x2="75" y2="30" stroke="oklch(0.62 0.17 125)" strokeWidth="1.5" />
        <line x1="95" y1="30" x2="140" y2="30" stroke="oklch(0.62 0.17 125)" strokeWidth="1.5" />
        <line
          x1="160"
          y1="30"
          x2="180"
          y2="30"
          stroke="oklch(0.62 0.17 125)"
          strokeWidth="1.5"
          strokeDasharray="3 2"
        />

        {/* nodes */}
        {[
          { x: 20, label: "Lead" },
          { x: 85, label: "Setup" },
          { x: 150, label: "Live" },
        ].map((n) => (
          <g key={n.label}>
            <rect
              x={n.x - 14}
              y="22"
              width="28"
              height="16"
              rx="3"
              fill="oklch(1 0 0)"
              stroke="oklch(0.62 0.17 125)"
              strokeWidth="1.2"
            />
            <text
              x={n.x}
              y="33"
              textAnchor="middle"
              fontSize="6.5"
              fontWeight="600"
              fill="oklch(0.18 0.02 122)"
            >
              {n.label}
            </text>
          </g>
        ))}

        {/* arrow tip */}
        <polygon points="180,30 175,27 175,33" fill="oklch(0.62 0.17 125)" />
      </svg>

      <div className="flex items-center justify-between text-[7.5px]">
        <span className="text-muted-foreground">3 etapas · 2 responsáveis</span>
        <span className="font-semibold" style={{ color: "oklch(0.55 0.16 125)" }}>
          documentado
        </span>
      </div>
    </div>
  );
}

/** Previsibilidade — forecast trend com banda de incerteza */
function PrevisibilidadeMockup() {
  return (
    <div className="absolute inset-0 p-3 flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <p className="text-[8px] uppercase tracking-wider font-semibold text-muted-foreground">
          Forecast · próximos 90d
        </p>
        <span className="text-[8px] font-bold" style={{ color: "oklch(0.62 0.17 125)" }}>
          R$ 4,8M
        </span>
      </div>

      <div className="flex-1 -mx-1">
        <svg viewBox="0 0 200 50" preserveAspectRatio="none" className="w-full h-full">
          <defs>
            <linearGradient id="grad-forecast" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.62 0.17 125)" stopOpacity="0.18" />
              <stop offset="100%" stopColor="oklch(0.62 0.17 125)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* uncertainty band */}
          <path
            d="M0,32 L40,26 L80,22 L120,16 L160,10 L200,6 L200,12 L160,16 L120,22 L80,28 L40,32 L0,38 Z"
            fill="url(#grad-forecast)"
          />
          {/* historical solid line */}
          <path
            d="M0,35 L20,33 L40,30 L60,28 L80,26 L100,24"
            fill="none"
            stroke="oklch(0.18 0.02 122)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* forecast dashed line */}
          <path
            d="M100,24 L120,20 L140,16 L160,12 L180,10 L200,8"
            fill="none"
            stroke="oklch(0.62 0.17 125)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="4 2"
          />
          {/* divider line */}
          <line
            x1="100"
            y1="2"
            x2="100"
            y2="48"
            stroke="oklch(0.85 0.02 122)"
            strokeWidth="0.8"
            strokeDasharray="2 2"
          />
        </svg>
      </div>

      <div className="flex items-center justify-between text-[7.5px]">
        <span className="text-muted-foreground">hoje</span>
        <span className="font-semibold" style={{ color: "oklch(0.62 0.17 125)" }}>
          +18% projeção
        </span>
      </div>
    </div>
  );
}
