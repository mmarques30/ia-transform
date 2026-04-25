import { Reveal } from "@/components/Reveal";
import { ArrowRight, ArrowUp } from "lucide-react";

const PATTERNS = [
  "Financeiro fragmentado",
  "Relatórios manuais",
  "Dados espalhados",
  "Decisões lentas",
  "Risco constante de erro",
];

interface Benefit {
  n: string;
  label: string;
  text: string;
  Mockup: () => React.ReactElement;
}

const BENEFITS: Benefit[] = [
  {
    n: "01",
    label: "Liberdade",
    text: "O dono sai da operação. Decisão deixa de depender de uma cabeça só.",
    Mockup: LiberdadeMockup,
  },
  {
    n: "02",
    label: "Estrutura",
    text: "Processos no mesmo lugar, papéis claros, hand-off documentado.",
    Mockup: EstruturaMockup,
  },
  {
    n: "03",
    label: "Gestão",
    text: "Indicador semanal pra cada área. Reunião de gestão deixa de ser desabafo.",
    Mockup: GestaoMockup,
  },
  {
    n: "04",
    label: "Previsibilidade",
    text: "Você sabe o que vai entrar, o que vai sair e onde está o gargalo do mês.",
    Mockup: PrevisibilidadeMockup,
  },
];

export function Segmentation() {
  return (
    <section className="py-[100px] lg:py-[140px] bg-background">
      <div className="container-page">
        {/* Same pattern of chaos */}
        <div className="text-center max-w-[820px] mx-auto">
          <Reveal>
            <h2 className="h-mix text-[36px] sm:text-[44px] lg:text-[54px] text-foreground">
              Empresas diferentes.
              <br />O <em>mesmo padrão</em> de caos.
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-5 text-[16px] text-sage leading-[1.6] max-w-[600px] mx-auto">
              Indústrias, consultorias, empresas de serviço, operações em crescimento.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <p className="mt-12 text-center text-[18px] font-semibold text-foreground">
            O cenário se repete:
          </p>
        </Reveal>

        <div className="mt-10 relative">
          <div
            aria-hidden
            className="hidden md:block absolute left-[5%] right-[5%] top-[13px]"
            style={{
              height: "1px",
              backgroundImage:
                "repeating-linear-gradient(to right, oklch(0.6 0.14 125 / 0.6) 0 6px, transparent 6px 14px)",
            }}
          />
          <div className="grid grid-cols-2 md:grid-cols-5 gap-y-8 gap-x-4 relative max-w-[1000px] mx-auto">
            {PATTERNS.map((p, i) => (
              <Reveal key={p} delay={i * 0.05}>
                <div className="flex flex-col items-center text-center">
                  <span
                    className="h-7 w-7 rounded-full flex items-center justify-center relative z-10"
                    style={{ backgroundColor: "var(--color-olive)" }}
                  >
                    <ArrowRight className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
                  </span>
                  <p className="mt-4 text-[14px] font-semibold text-foreground">{p}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* When structure changes — clean 2-col split com mockups reais */}
        <div className="mt-24 lg:mt-28 grid lg:grid-cols-[5fr_7fr] gap-10 lg:gap-14 items-start max-w-[1100px] mx-auto">
          <div className="lg:pt-2">
            <Reveal>
              <span className="label-chip">
                <span className="dot" />
                Resultado real
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h3 className="h-mix mt-5 text-[32px] sm:text-[40px] lg:text-[46px] text-foreground">
                Quando a estrutura muda,
                <br />o <em>jogo muda</em>.
              </h3>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-[16px] text-sage leading-[1.65] max-w-[440px]">
                Cada card abaixo é um indicador real que muda quando a operação ganha estrutura. Não
                é promessa — é o antes e depois.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          </Reveal>
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

/** Gestão — 3 KPIs semanais em mini-grid */
function GestaoMockup() {
  const KPIS = [
    { l: "Vendas", v: "R$ 142k", d: "+8%", up: true },
    { l: "Ops", v: "94%", d: "+2pp", up: true },
    { l: "CAC", v: "184", d: "−9%", up: true },
  ];
  return (
    <div className="absolute inset-0 p-3 flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <p className="text-[8px] uppercase tracking-wider font-semibold text-muted-foreground">
          Painel da diretoria · sem 12
        </p>
        <span className="text-[7px] text-muted-foreground">seg 7h</span>
      </div>

      <div className="grid grid-cols-3 gap-1 flex-1">
        {KPIS.map((k) => (
          <div
            key={k.l}
            className="rounded p-1.5 flex flex-col justify-between"
            style={{
              backgroundColor: "oklch(1 0 0)",
              border: "1px solid oklch(0.92 0.005 110)",
            }}
          >
            <p className="text-[7px] uppercase tracking-wider text-muted-foreground">{k.l}</p>
            <p className="text-[12px] font-bold leading-none text-foreground">{k.v}</p>
            <p
              className="text-[7px] font-semibold inline-flex items-center gap-0.5"
              style={{ color: "oklch(0.55 0.16 125)" }}
            >
              <ArrowUp className="h-1.5 w-1.5" strokeWidth={2.5} />
              {k.d}
            </p>
          </div>
        ))}
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
