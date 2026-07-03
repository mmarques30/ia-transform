import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";
import { ChevronRight, CalendarDays, Search, Sparkles, LayoutDashboard } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Step {
  n: string;
  title: string;
  text: string;
  Icon: LucideIcon;
  Mockup: () => React.ReactElement;
}

const STEPS: Step[] = [
  {
    n: "1",
    title: "Semana 1 · Mapeamento",
    text: "Auditoria dos processos, ranking dos ladrões de hora e a primeira automação em produção.",
    Icon: CalendarDays,
    Mockup: AgendaMockup,
  },
  {
    n: "2-4",
    title: "Sem 2 a 4 · Processos prioritários",
    text: "Fechamento, follow-up, relatório e integrações. Um a um, dentro do fluxo que o time já conhece.",
    Icon: Search,
    Mockup: ImersaoMockup,
  },
  {
    n: "5-7",
    title: "Sem 5 a 7 · Padronização",
    text: "Documentação dos processos novos. Vídeo curto, passo a passo. O conhecimento fica registrado. Não na cabeça de ninguém.",
    Icon: Sparkles,
    Mockup: AnaliseMockup,
  },
  {
    n: "8",
    title: "Semana 8 · Autonomia",
    text: "Treinamento prático com mão na massa. A gente sai. Seu time fica operando sozinho.",
    Icon: LayoutDashboard,
    Mockup: SistemaMockup,
  },
];

interface ProcessProps {
  /** Substitui o heading padrão. Aceita ReactNode pra <em>/<br/> arbitrários. */
  title?: ReactNode;
  /** Esconde a linha de chevrons abaixo do heading. */
  hideChevrons?: boolean;
  /** Esconde o heading "A jornada, semana a semana:" + os 4 step cards. */
  hideJourney?: boolean;
}

export function Process({ title, hideChevrons = false, hideJourney = false }: ProcessProps = {}) {
  return (
    <section id="abordagem" className="section-veil relative overflow-hidden">
      <div className="container-page py-[100px] lg:py-[140px] relative">
        <div className="text-center max-w-[820px] mx-auto">
          <Reveal>
            <h2 className="h-mix text-[28px] sm:text-[36px] lg:text-[44px] text-foreground">
              {title ?? (
                <>
                  Em apenas 8 semanas,
                  <br />
                  a operação <em>roda sozinha</em>.
                </>
              )}
            </h2>
          </Reveal>

          {!hideChevrons && (
            <Reveal delay={0.1}>
              <div className="mt-8 flex flex-wrap justify-center gap-x-10 gap-y-3 text-[15px] text-foreground font-semibold">
                {["Você escolhe as rotinas", "Sem trocar de sistema", "Time operando sozinho"].map(
                  (s) => (
                    <span key={s} className="inline-flex items-center gap-2">
                      <ChevronRight
                        className="h-4 w-4"
                        style={{ color: "var(--color-primary)" }}
                        strokeWidth={2.5}
                      />
                      {s}
                    </span>
                  ),
                )}
              </div>
            </Reveal>
          )}
        </div>

        {!hideJourney && (
          <>
            <Reveal delay={0.15}>
              <h3
                className="mt-16 text-center text-[22px] lg:text-[26px] font-semibold"
                style={{ color: "var(--color-primary)" }}
              >
                A jornada, semana a semana:
              </h3>
            </Reveal>

            {/* Connected timeline com mini-mockups */}
            <div className="mt-14 relative">
              {/* Connector line — passa por trás dos cards */}
              <div
                aria-hidden
                className="hidden md:block absolute top-[80px] left-[10%] right-[10%]"
                style={{
                  height: "2px",
                  background:
                    "linear-gradient(90deg, transparent 0%, var(--color-primary) 10%, var(--color-primary) 90%, transparent 100%)",
                  opacity: 0.3,
                }}
              />

              <div className="grid md:grid-cols-4 gap-5 lg:gap-6 relative">
                {STEPS.map((s, i) => (
                  <Reveal key={s.n} delay={i * 0.08}>
                    <div className="tech-card overflow-hidden h-full flex flex-col">
                      {/* Mini mockup at top */}
                      <div
                        className="aspect-[16/10] relative overflow-hidden"
                        style={{
                          backgroundColor: "oklch(0.97 0.004 110)",
                          borderBottom: "1px solid var(--color-border)",
                        }}
                      >
                        <s.Mockup />
                      </div>

                      {/* Content below */}
                      <div className="p-5 lg:p-6 flex flex-col flex-1 relative">
                        <div className="flex items-center gap-2.5">
                          <span
                            className="h-7 w-7 rounded-full flex items-center justify-center text-[12px] font-bold"
                            style={{
                              backgroundColor: "var(--color-primary)",
                              color: "oklch(1 0 0)",
                            }}
                          >
                            {s.n}
                          </span>
                          <span
                            className="h-[1px] flex-1"
                            style={{
                              background:
                                "linear-gradient(90deg, var(--color-primary), transparent)",
                            }}
                          />
                        </div>
                        <h4 className="mt-4 text-[15px] font-bold tracking-tight text-foreground leading-snug">
                          {s.title}
                        </h4>
                        <p className="mt-1.5 text-[13px] text-sage leading-[1.5]">{s.text}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </>
        )}

        <Reveal delay={hideJourney ? 0.15 : 0.3}>
          <div className="mt-14 text-center">
            <a href="#diagnostico-form" className="cta-primary">
              Quero o diagnóstico do meu negócio
              <span className="arrow">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 7H12M12 7L7 2M12 7L7 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Mini-mockups — um por step                                         */
/* ------------------------------------------------------------------ */

/** Step 1 — Calendar / agenda visual com slot disponível destacado */
function AgendaMockup() {
  const days = ["S", "T", "Q", "Q", "S"];
  const slots = [
    { d: 0, available: false },
    { d: 1, available: true, highlight: true },
    { d: 2, available: false },
    { d: 3, available: true },
    { d: 4, available: false },
  ];
  return (
    <div className="absolute inset-0 p-3 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <p className="text-[8px] uppercase tracking-wider font-semibold text-muted-foreground">
          Diagnóstico · 30 min
        </p>
        <span
          className="text-[7px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded"
          style={{
            backgroundColor: "oklch(0.97 0.025 125)",
            color: "oklch(0.45 0.16 125)",
          }}
        >
          Disponível
        </span>
      </div>

      <div className="grid grid-cols-5 gap-1 flex-1">
        {days.map((d, i) => (
          <div
            key={i}
            className="rounded flex flex-col items-center justify-center p-1.5"
            style={{
              backgroundColor: slots[i].highlight ? "oklch(0.97 0.025 125)" : "oklch(1 0 0)",
              border: slots[i].highlight
                ? "1.5px solid oklch(0.62 0.17 125)"
                : "1px solid oklch(0.92 0.005 110)",
            }}
          >
            <p
              className="text-[7px] uppercase font-semibold"
              style={{
                color: slots[i].available
                  ? "oklch(0.45 0.16 125)"
                  : "var(--color-muted-foreground)",
              }}
            >
              {d}
            </p>
            <p
              className="text-[12px] font-bold"
              style={{
                color: slots[i].available
                  ? "oklch(0.18 0.02 122)"
                  : "var(--color-muted-foreground)",
                opacity: slots[i].available ? 1 : 0.4,
              }}
            >
              {12 + i}
            </p>
            {slots[i].available && (
              <span
                className="mt-0.5 h-1 w-1 rounded-full"
                style={{ backgroundColor: "oklch(0.62 0.17 125)" }}
              />
            )}
          </div>
        ))}
      </div>

      <div
        className="rounded text-center text-[8px] font-semibold py-1.5"
        style={{
          backgroundColor: "var(--color-accent)",
          color: "oklch(1 0 0)",
        }}
      >
        Agendar 14h · qua
      </div>
    </div>
  );
}

/** Step 2 — Imersão: mapa de processos com nodes + conexões */
function ImersaoMockup() {
  return (
    <div className="absolute inset-0 p-3">
      <div className="flex items-center gap-1.5 mb-2">
        <p className="text-[8px] uppercase tracking-wider font-semibold text-muted-foreground">
          Mapa de processos
        </p>
        <span
          className="ml-auto h-1 w-1 rounded-full"
          style={{ backgroundColor: "oklch(0.62 0.17 125)" }}
        />
        <span className="text-[7px] text-muted-foreground">12 nós</span>
      </div>
      <svg viewBox="0 0 200 100" className="w-full h-[calc(100%-20px)]">
        {/* Connection lines */}
        <line
          x1="30"
          y1="20"
          x2="100"
          y2="50"
          stroke="oklch(0.85 0.02 122)"
          strokeWidth="1"
          strokeDasharray="2 2"
        />
        <line
          x1="30"
          y1="80"
          x2="100"
          y2="50"
          stroke="oklch(0.85 0.02 122)"
          strokeWidth="1"
          strokeDasharray="2 2"
        />
        <line x1="100" y1="50" x2="170" y2="20" stroke="oklch(0.62 0.17 125)" strokeWidth="1.5" />
        <line
          x1="100"
          y1="50"
          x2="170"
          y2="50"
          stroke="oklch(0.85 0.02 122)"
          strokeWidth="1"
          strokeDasharray="2 2"
        />
        <line x1="100" y1="50" x2="170" y2="80" stroke="oklch(0.62 0.17 125)" strokeWidth="1.5" />

        {/* Nodes */}
        {[
          { x: 30, y: 20, fill: "oklch(0.97 0.005 110)", stroke: "oklch(0.85 0.02 122)" },
          { x: 30, y: 80, fill: "oklch(0.97 0.005 110)", stroke: "oklch(0.85 0.02 122)" },
          { x: 100, y: 50, fill: "oklch(0.62 0.17 125)", stroke: "oklch(0.55 0.16 125)" },
          { x: 170, y: 20, fill: "oklch(0.97 0.005 110)", stroke: "oklch(0.85 0.02 122)" },
          { x: 170, y: 50, fill: "oklch(0.97 0.025 25)", stroke: "oklch(0.55 0.16 25)" },
          { x: 170, y: 80, fill: "oklch(0.97 0.005 110)", stroke: "oklch(0.85 0.02 122)" },
        ].map((n, i) => (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r="7"
            fill={n.fill}
            stroke={n.stroke}
            strokeWidth="1.5"
          />
        ))}

        {/* Label do gargalo */}
        <rect x="180" y="42" width="20" height="16" rx="2" fill="oklch(0.55 0.16 25)" />
        <text x="190" y="53" textAnchor="middle" fontSize="6" fontWeight="700" fill="white">
          GAP
        </text>
      </svg>
    </div>
  );
}

/** Step 3 — Análise: chart com tendência + insight */
function AnaliseMockup() {
  return (
    <div className="absolute inset-0 p-3 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <p className="text-[8px] uppercase tracking-wider font-semibold text-muted-foreground">
          Análise · semana 1
        </p>
        <span className="text-[8px] font-bold" style={{ color: "oklch(0.62 0.17 125)" }}>
          84%
        </span>
      </div>

      {/* Bar chart */}
      <div className="flex items-end gap-1 flex-1">
        {[35, 50, 42, 65, 58, 78, 92].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm"
            style={{
              height: `${h}%`,
              background:
                i >= 5
                  ? "linear-gradient(180deg, oklch(0.82 0.2 115), oklch(0.62 0.17 125))"
                  : "oklch(0.92 0.01 122)",
            }}
          />
        ))}
      </div>

      <div
        className="rounded p-1.5 flex items-start gap-1.5"
        style={{
          backgroundColor: "oklch(0.97 0.025 125)",
          border: "1px solid oklch(0.85 0.05 125)",
        }}
      >
        <Sparkles
          className="h-2.5 w-2.5 mt-0.5 shrink-0"
          style={{ color: "oklch(0.45 0.16 125)" }}
          strokeWidth={2.5}
        />
        <p className="text-[8px] leading-tight" style={{ color: "oklch(0.18 0.02 122)" }}>
          <span className="font-bold">3 fluxos</span> com ROI imediato.
        </p>
      </div>
    </div>
  );
}

/** Step 4 — Sistema: dashboard integrado */
function SistemaMockup() {
  return (
    <div className="absolute inset-0 p-3 flex flex-col gap-2">
      <div className="flex items-center gap-1">
        <span className="h-1 w-1 rounded-full bg-red-400/60" />
        <span className="h-1 w-1 rounded-full bg-yellow-400/60" />
        <span className="h-1 w-1 rounded-full bg-green-400/60" />
        <p className="ml-1.5 text-[7px] font-mono text-muted-foreground">operacao.ia</p>
      </div>

      <div className="grid grid-cols-3 gap-1">
        {[
          { v: "+22h", l: "ops" },
          { v: "98%", l: "auto" },
          { v: "R$480k", l: "save" },
        ].map((k) => (
          <div
            key={k.l}
            className="rounded p-1"
            style={{
              backgroundColor: "oklch(0.97 0.005 110)",
              border: "1px solid oklch(0.92 0.005 110)",
            }}
          >
            <p
              className="text-[8px] font-bold leading-none"
              style={{ color: "oklch(0.55 0.16 125)" }}
            >
              {k.v}
            </p>
            <p className="text-[6px] uppercase tracking-wider text-muted-foreground mt-0.5">
              {k.l}
            </p>
          </div>
        ))}
      </div>

      {/* Mini sparkline */}
      <div className="flex-1">
        <svg viewBox="0 0 100 30" className="w-full h-full">
          <defs>
            <linearGradient id="grad-step4" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.62 0.17 125)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="oklch(0.62 0.17 125)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0,24 L15,20 L30,22 L45,16 L60,12 L75,8 L90,6 L100,4 L100,30 L0,30 Z"
            fill="url(#grad-step4)"
          />
          <path
            d="M0,24 L15,20 L30,22 L45,16 L60,12 L75,8 L90,6 L100,4"
            fill="none"
            stroke="oklch(0.62 0.17 125)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="flex items-center justify-between text-[7px] text-muted-foreground">
        <span>3 áreas integradas</span>
        <span className="font-semibold" style={{ color: "oklch(0.55 0.16 145)" }}>
          ● ao vivo
        </span>
      </div>
    </div>
  );
}
