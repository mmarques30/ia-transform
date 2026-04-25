import { Reveal } from "@/components/Reveal";
import { ArrowDown, ArrowUp, Activity } from "lucide-react";

interface Metric {
  label: string;
  delta: string;
  fill: number;
  trend: "up" | "down";
  isGoodWhen: "up" | "down";
}

const METRICS: Metric[] = [
  { label: "Tarefas manuais", delta: "−62%", fill: 38, trend: "down", isGoodWhen: "down" },
  { label: "Retrabalho", delta: "−54%", fill: 46, trend: "down", isGoodWhen: "down" },
  { label: "Visibilidade ops", delta: "+88%", fill: 88, trend: "up", isGoodWhen: "up" },
  { label: "Confiança em decisões", delta: "+74%", fill: 74, trend: "up", isGoodWhen: "up" },
  { label: "Dependência do dono", delta: "−71%", fill: 29, trend: "down", isGoodWhen: "down" },
  { label: "Crescimento previsível", delta: "+92%", fill: 92, trend: "up", isGoodWhen: "up" },
];

interface Vertical {
  label: string;
  brand: string;
  Mockup: () => React.ReactElement;
}

const VERTICALS: Vertical[] = [
  { label: "Varejo", brand: "Lumia", Mockup: VarejoMockup },
  { label: "Indústria", brand: "Forjana", Mockup: IndustriaMockup },
  { label: "Consultoria", brand: "Praxis", Mockup: ConsultoriaMockup },
  { label: "Saúde", brand: "Clínica Ípê", Mockup: SaudeMockup },
  { label: "Serviços", brand: "FieldOps", Mockup: ServicosMockup },
  { label: "Educação", brand: "Polo.edu", Mockup: EducacaoMockup },
];

export function Impact() {
  return (
    <section className="py-[100px] lg:py-[140px] bg-background relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 tech-bg-dots ia-anim-grid-drift opacity-50"
        style={{
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 90%)",
        }}
      />

      <div className="container-page relative">
        {/* ATO 1 — A virada operacional (claim + monitor) */}
        <div className="text-center max-w-[760px] mx-auto">
          <Reveal>
            <span className="label-chip">
              <span className="dot" />
              Impacto operacional
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h-mix mt-6 text-[36px] sm:text-[44px] lg:text-[54px] text-foreground">
              Quando a empresa para de operar <em>no improviso</em>,
              <br className="hidden sm:block" /> o jogo muda em <em>todos</em> os indicadores.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-[16px] text-sage leading-[1.6] max-w-[600px] mx-auto">
              Não é um KPI subindo isolado. É a operação inteira ganhando estrutura — e os números
              acompanhando.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="mt-12 max-w-[1080px] mx-auto">
            <ImpactMonitor />
          </div>
        </Reveal>

        {/* PONTE — divisor narrativo entre impacto e personalização */}
        <div className="mt-24 lg:mt-32 flex flex-col items-center">
          <span
            aria-hidden
            className="block h-px w-24"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--color-primary), transparent)",
            }}
          />
          <Reveal delay={0.05}>
            <p className="mt-6 text-center text-[11px] uppercase tracking-[0.18em] font-semibold text-muted-foreground">
              Mesma metodologia · Sistemas distintos
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h3 className="mt-4 text-center text-[28px] sm:text-[34px] lg:text-[40px] font-bold text-foreground tracking-tight max-w-[820px] mx-auto leading-[1.15]">
              E esse impacto roda em um{" "}
              <em
                style={{
                  color: "var(--color-primary)",
                  fontStyle: "italic",
                  fontFamily: "var(--font-serif)",
                  fontWeight: 400,
                }}
              >
                sistema próprio
              </em>{" "}
              pra cada vertical.
            </h3>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-5 text-center text-[15px] text-sage leading-[1.6] max-w-[560px] mx-auto">
              Mesmo método de estruturação. Implementação adaptada ao jeito de operar de cada
              segmento.
            </p>
          </Reveal>
        </div>

        {/* ATO 2 — Personalização por vertical */}
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[1100px] mx-auto">
          {VERTICALS.map((v, i) => (
            <Reveal key={v.label} delay={(i % 3) * 0.06}>
              <div className="tech-card overflow-hidden h-full flex flex-col">
                <div
                  className="aspect-[16/9] relative overflow-hidden"
                  style={{
                    backgroundColor: "oklch(0.97 0.004 110)",
                    borderBottom: "1px solid var(--color-border)",
                  }}
                >
                  <v.Mockup />
                </div>
                <div className="relative px-5 py-4 flex items-center justify-between">
                  <p
                    className="text-[10px] uppercase tracking-[0.16em] font-semibold"
                    style={{ color: "var(--color-muted-foreground)" }}
                  >
                    Sistema {v.brand}
                  </p>
                  <p className="text-[16px] font-bold tracking-tight text-foreground">
                    {v.label}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Impact monitor — same dashboard live                              */
/* ------------------------------------------------------------------ */

function ImpactMonitor() {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        backgroundColor: "oklch(1 0 0)",
        border: "1px solid oklch(0.92 0.005 110)",
        boxShadow:
          "0 30px 60px -20px oklch(0.18 0.02 122 / 0.18), 0 8px 20px -8px oklch(0.18 0.02 122 / 0.08)",
      }}
    >
      <div
        className="flex items-center justify-between px-5 py-3.5 border-b"
        style={{
          borderColor: "oklch(0.92 0.005 110)",
          backgroundColor: "oklch(0.985 0.004 110)",
        }}
      >
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-red-400/60" />
          <span className="h-2 w-2 rounded-full bg-yellow-400/60" />
          <span className="h-2 w-2 rounded-full bg-green-400/60" />
          <p className="ml-2 text-[10.5px] font-mono text-muted-foreground">
            iaplicada · monitor operacional
          </p>
        </div>
        <span
          className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider"
          style={{ color: "oklch(0.55 0.16 145)" }}
        >
          <Activity className="h-2.5 w-2.5" strokeWidth={2.5} />
          ao vivo
        </span>
      </div>

      <div className="px-6 lg:px-8 pt-6 pb-4 flex items-end justify-between border-b" style={{ borderColor: "oklch(0.94 0.005 110)" }}>
        <div>
          <p className="text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground font-semibold">
            Operação · últimos 90 dias
          </p>
          <p className="mt-1.5 text-[20px] font-bold tracking-tight text-foreground">
            Antes vs. depois da estruturação
          </p>
        </div>
        <div className="text-right">
          <span
            className="block text-[32px] font-bold tracking-tight leading-none"
            style={{ color: "oklch(0.55 0.16 125)" }}
          >
            +73%
          </span>
          <span className="block mt-1 text-[10px] uppercase tracking-[0.14em] text-muted-foreground font-semibold">
            ganho médio
          </span>
        </div>
      </div>

      <div className="px-6 lg:px-8 py-6 grid sm:grid-cols-2 gap-x-8 gap-y-4">
        {METRICS.map((m) => {
          const isGood = m.trend === m.isGoodWhen;
          const TrendIcon = m.trend === "up" ? ArrowUp : ArrowDown;
          return (
            <div key={m.label}>
              <div className="flex items-center justify-between mb-2">
                <p className="text-[13.5px] text-foreground font-medium">{m.label}</p>
                <span
                  className="inline-flex items-center gap-1 text-[13px] font-bold tracking-tight"
                  style={{
                    color: isGood ? "oklch(0.55 0.16 125)" : "oklch(0.55 0.16 25)",
                  }}
                >
                  <TrendIcon className="h-3 w-3" strokeWidth={2.5} />
                  {m.delta}
                </span>
              </div>
              <div
                className="h-1.5 rounded-full overflow-hidden"
                style={{ backgroundColor: "oklch(0.95 0.005 110)" }}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${m.fill}%`,
                    background: isGood
                      ? "linear-gradient(90deg, oklch(0.62 0.17 125), oklch(0.82 0.2 115))"
                      : "linear-gradient(90deg, oklch(0.55 0.16 25), oklch(0.7 0.18 25))",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div
        className="px-5 lg:px-6 py-3.5 border-t flex items-center justify-between text-[11px]"
        style={{
          borderColor: "oklch(0.92 0.005 110)",
          backgroundColor: "oklch(0.985 0.004 110)",
        }}
      >
        <span className="text-muted-foreground">Calculado sobre média de 80+ implementações</span>
        <span
          className="font-semibold inline-flex items-center gap-1"
          style={{ color: "oklch(0.55 0.16 125)" }}
        >
          tudo no verde
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Vertical mockups — sistemas brandados com movimento                */
/* ------------------------------------------------------------------ */

interface BrandHeaderProps {
  name: string;
  context: string;
  accent: string;
  Mark: () => React.ReactElement;
}

/** Header brandado compartilhado: marca + contexto + status ao vivo. */
function BrandHeader({ name, context, accent, Mark }: BrandHeaderProps) {
  return (
    <div
      className="flex items-center justify-between px-2.5 py-1.5"
      style={{
        backgroundColor: "oklch(1 0 0)",
        borderBottom: "1px solid oklch(0.93 0.005 110)",
      }}
    >
      <div className="flex items-center gap-1.5 min-w-0">
        <span
          className="h-4 w-4 rounded-[3px] flex items-center justify-center shrink-0"
          style={{ backgroundColor: accent }}
        >
          <Mark />
        </span>
        <div className="leading-none min-w-0">
          <p className="text-[8.5px] font-bold tracking-tight text-foreground truncate">{name}</p>
          <p className="text-[6.5px] uppercase tracking-[0.14em] text-muted-foreground mt-[1px] truncate">
            {context}
          </p>
        </div>
      </div>
      <span
        className="inline-flex items-center gap-1 text-[6.5px] font-semibold uppercase tracking-wider"
        style={{ color: accent }}
      >
        <span
          className="h-1.5 w-1.5 rounded-full ia-anim-blink"
          style={{ backgroundColor: accent }}
        />
        ao vivo
      </span>
    </div>
  );
}

/** Varejo — Lumia: vendas por loja com barras animadas + scan line */
function VarejoMockup() {
  const stores = [
    { l: "Vila Olímpia", v: "R$ 142k", min: 0.78, max: 0.96, dur: "3.2s" },
    { l: "Pinheiros", v: "R$ 118k", min: 0.62, max: 0.82, dur: "3.8s" },
    { l: "Jardins", v: "R$ 98k", min: 0.5, max: 0.7, dur: "4.4s" },
    { l: "Itaim", v: "R$ 84k", min: 0.42, max: 0.6, dur: "4.0s" },
  ];
  const accent = "oklch(0.6 0.16 45)";
  return (
    <div className="absolute inset-0 flex flex-col">
      <BrandHeader
        name="Lumia · Varejo"
        context="Painel de vendas"
        accent={accent}
        Mark={() => (
          <svg viewBox="0 0 12 12" className="h-2.5 w-2.5">
            <path d="M2 9 L5 5 L7 7 L10 3" stroke="white" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      />
      <div className="flex-1 p-3 flex flex-col gap-1.5 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <p className="text-[7.5px] uppercase tracking-wider font-semibold text-muted-foreground">
            Vendas por loja · semana
          </p>
          <span className="text-[8.5px] font-bold ia-anim-tick-up" style={{ color: accent }}>
            R$ 442k
          </span>
        </div>
        <div className="space-y-1 flex-1">
          {stores.map((s) => (
            <div key={s.l} className="flex items-center gap-1.5">
              <span className="text-[7.5px] text-foreground w-14 shrink-0 truncate">{s.l}</span>
              <div
                className="flex-1 h-2 rounded-sm overflow-hidden"
                style={{ backgroundColor: "oklch(0.96 0.004 110)" }}
              >
                <div
                  className="h-full ia-anim-bar-rise origin-left"
                  style={{
                    backgroundColor: accent,
                    ["--bar-min" as string]: s.min,
                    ["--bar-max" as string]: s.max,
                    animationDuration: s.dur,
                    width: "100%",
                  }}
                />
              </div>
              <span className="text-[7px] font-mono text-muted-foreground w-10 text-right">
                {s.v}
              </span>
            </div>
          ))}
        </div>
        {/* Scan line subtle sweeping over the chart */}
        <div
          aria-hidden
          className="absolute inset-y-6 left-0 w-1/3 ia-anim-scan-x pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(0.6 0.16 45 / 0.12), transparent)",
          }}
        />
      </div>
    </div>
  );
}

/** Indústria — Forjana: OEE pulsando + status da linha */
function IndustriaMockup() {
  const accent = "oklch(0.45 0.14 240)";
  return (
    <div className="absolute inset-0 flex flex-col">
      <BrandHeader
        name="Forjana · Indústria"
        context="Linha 03 · turno B"
        accent={accent}
        Mark={() => (
          <svg viewBox="0 0 12 12" className="h-2.5 w-2.5">
            <circle cx="6" cy="6" r="2.4" stroke="white" strokeWidth="1.4" fill="none" />
            <path d="M6 1.5 V3.2 M6 8.8 V10.5 M1.5 6 H3.2 M8.8 6 H10.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        )}
      />
      <div className="flex-1 p-3 flex items-center gap-3 relative overflow-hidden">
        <svg viewBox="0 0 60 60" className="h-[68px] w-[68px] shrink-0 ia-anim-breathe">
          <circle cx="30" cy="30" r="22" fill="none" stroke="oklch(0.95 0.005 110)" strokeWidth="6" />
          <circle
            cx="30"
            cy="30"
            r="22"
            fill="none"
            stroke={accent}
            strokeWidth="6"
            strokeDasharray="115 138"
            transform="rotate(-90 30 30)"
            strokeLinecap="round"
          />
          <text x="30" y="30" textAnchor="middle" fontSize="11" fontWeight="700" fill="oklch(0.18 0.02 122)">
            83%
          </text>
          <text x="30" y="40" textAnchor="middle" fontSize="6" fill="oklch(0.5 0.02 110)">
            OEE
          </text>
        </svg>

        <div className="flex-1 space-y-1">
          {[
            { l: "Disponib.", v: "94%" },
            { l: "Performance", v: "91%" },
            { l: "Qualidade", v: "97%" },
          ].map((r, i) => (
            <div key={r.l} className="flex items-center justify-between text-[8px]">
              <span className="text-foreground">{r.l}</span>
              <div className="flex items-center gap-1.5">
                <div
                  className="h-1 w-10 rounded-full overflow-hidden"
                  style={{ backgroundColor: "oklch(0.95 0.005 110)" }}
                >
                  <div
                    className="h-full ia-anim-fill-loop"
                    style={{
                      backgroundColor: accent,
                      ["--fill-target" as string]: r.v,
                      animationDelay: `${i * 0.4}s`,
                    }}
                  />
                </div>
                <span className="font-mono font-semibold text-foreground w-7 text-right">
                  {r.v}
                </span>
              </div>
            </div>
          ))}
          <div className="flex items-center gap-1 mt-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className="h-1 w-1 rounded-full ia-anim-pulse-glow"
                style={{
                  backgroundColor: i < 4 ? accent : "oklch(0.85 0.04 240)",
                  animationDelay: `${i * 0.18}s`,
                }}
              />
            ))}
            <span className="text-[6.5px] uppercase tracking-wider text-muted-foreground ml-1">
              5/5 ativas
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Consultoria — Praxis: projetos com progresso animado tracejado */
function ConsultoriaMockup() {
  const accent = "oklch(0.5 0.14 280)";
  const projects = [
    { c: "Acme Co", h: "112h", w: "84%", st: "no prazo" },
    { c: "Foxtrot", h: "84h", w: "62%", st: "atenção", warn: true },
    { c: "Northwind", h: "62h", w: "48%", st: "no prazo" },
  ];
  return (
    <div className="absolute inset-0 flex flex-col">
      <BrandHeader
        name="Praxis · Consultoria"
        context="3 projetos ativos"
        accent={accent}
        Mark={() => (
          <svg viewBox="0 0 12 12" className="h-2.5 w-2.5">
            <path d="M2 6 L5 9 L10 3" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      />
      <div className="flex-1 p-2.5 flex flex-col gap-1 relative">
        {projects.map((p, i) => {
          const color = p.warn ? "oklch(0.65 0.17 80)" : accent;
          return (
            <div
              key={p.c}
              className="rounded p-1.5 flex items-center gap-2"
              style={{
                backgroundColor: "oklch(1 0 0)",
                border: "1px solid oklch(0.93 0.005 110)",
              }}
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-[8.5px] font-semibold text-foreground leading-none truncate">
                    {p.c}
                  </p>
                  <span className="text-[6.5px] text-muted-foreground font-mono">{p.h}</span>
                </div>
                <svg viewBox="0 0 100 4" preserveAspectRatio="none" className="w-full h-1 mt-1">
                  <line x1="0" y1="2" x2="100" y2="2" stroke="oklch(0.95 0.005 110)" strokeWidth="3" strokeLinecap="round" />
                  <line
                    x1="0"
                    y1="2"
                    x2={p.w}
                    y2="2"
                    stroke={color}
                    strokeWidth="3"
                    strokeLinecap="round"
                    className="ia-anim-progress-dash"
                    style={{ animationDelay: `${i * 0.25}s` }}
                  />
                </svg>
              </div>
              <span
                className="text-[6.5px] uppercase tracking-wider font-semibold inline-flex items-center gap-1 shrink-0"
                style={{ color }}
              >
                <span
                  className="h-1 w-1 rounded-full ia-anim-blink"
                  style={{ backgroundColor: color, animationDelay: `${i * 0.2}s` }}
                />
                {p.st}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** Saúde — Clínica Ípê: agenda com ECG animado */
function SaudeMockup() {
  const accent = "oklch(0.55 0.18 25)";
  const slots = [
    { t: "08:00", n: "M. Silva", st: "confirmado", ok: true },
    { t: "09:30", n: "P. Costa", st: "check-in", ok: true },
    { t: "11:00", n: "L. Almeida", st: "remarcar", ok: false },
  ];
  return (
    <div className="absolute inset-0 flex flex-col">
      <BrandHeader
        name="Clínica Ípê · Saúde"
        context="Agenda · hoje"
        accent={accent}
        Mark={() => (
          <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 ia-anim-heartbeat">
            <path
              d="M6 10 C6 10 1.5 7.2 1.5 4.5 C1.5 3 2.7 2 4 2 C5 2 5.6 2.6 6 3.4 C6.4 2.6 7 2 8 2 C9.3 2 10.5 3 10.5 4.5 C10.5 7.2 6 10 6 10 Z"
              fill="white"
            />
          </svg>
        )}
      />
      <div className="flex-1 p-3 flex flex-col gap-1.5 relative overflow-hidden">
        {/* ECG line animation */}
        <svg viewBox="0 0 200 12" preserveAspectRatio="none" className="w-full h-3">
          <path
            d="M0,6 L40,6 L46,2 L52,10 L58,6 L100,6 L106,2 L112,10 L118,6 L160,6 L166,2 L172,10 L178,6 L200,6"
            fill="none"
            stroke={accent}
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ia-anim-progress-dash"
          />
        </svg>
        <div className="space-y-1 flex-1">
          {slots.map((s) => (
            <div
              key={s.t}
              className="rounded p-1.5 flex items-center gap-2"
              style={{
                backgroundColor: "oklch(1 0 0)",
                border: "1px solid oklch(0.93 0.005 110)",
              }}
            >
              <span className="text-[8px] font-mono font-semibold text-foreground w-10">
                {s.t}
              </span>
              <span className="text-[8px] text-foreground flex-1 truncate">{s.n}</span>
              <span
                className="text-[6.5px] uppercase tracking-wider font-semibold inline-flex items-center gap-1"
                style={{ color: s.ok ? accent : "oklch(0.6 0.18 50)" }}
              >
                <span
                  className="h-1 w-1 rounded-full ia-anim-blink"
                  style={{ backgroundColor: s.ok ? accent : "oklch(0.6 0.18 50)" }}
                />
                {s.st}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Serviços — FieldOps: OS em andamento com SLA descontando */
function ServicosMockup() {
  const accent = "oklch(0.5 0.16 200)";
  return (
    <div className="absolute inset-0 flex flex-col">
      <BrandHeader
        name="FieldOps · Serviços"
        context="OS #4829 · em campo"
        accent={accent}
        Mark={() => (
          <svg viewBox="0 0 12 12" className="h-2.5 w-2.5">
            <path
              d="M3 9 L3 5 L6 2 L9 5 L9 9 Z"
              fill="white"
            />
            <circle cx="6" cy="6.5" r="1.1" fill={accent} />
          </svg>
        )}
      />
      <div className="flex-1 p-3 flex flex-col gap-1.5 relative">
        <div
          className="rounded p-2 space-y-1.5"
          style={{
            backgroundColor: "oklch(1 0 0)",
            border: "1px solid oklch(0.93 0.005 110)",
          }}
        >
          <div className="flex items-center justify-between text-[8px]">
            <span className="text-muted-foreground">Cliente</span>
            <span className="font-semibold text-foreground">Indústria SA</span>
          </div>
          <div className="flex items-center justify-between text-[8px]">
            <span className="text-muted-foreground">Técnico</span>
            <span className="font-semibold text-foreground inline-flex items-center gap-1">
              <span
                className="h-1 w-1 rounded-full ia-anim-blink"
                style={{ backgroundColor: accent }}
              />
              J. Pereira
            </span>
          </div>
          <div>
            <div className="flex items-center justify-between text-[7.5px] mb-0.5">
              <span className="text-muted-foreground">Etapas</span>
              <span className="font-mono font-semibold text-foreground">4/6</span>
            </div>
            <div className="flex items-center gap-0.5">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="flex-1 h-1.5 rounded-sm"
                  style={{
                    backgroundColor:
                      i < 4 ? accent : i === 4 ? "oklch(0.85 0.06 200)" : "oklch(0.94 0.005 110)",
                  }}
                >
                  {i === 4 && (
                    <div
                      className="h-full rounded-sm ia-anim-fill-loop"
                      style={{
                        backgroundColor: accent,
                        ["--fill-target" as string]: "70%",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between text-[7.5px] mt-auto">
          <span className="text-muted-foreground">SLA 8h</span>
          <span className="font-semibold ia-anim-tick-up" style={{ color: accent }}>
            restante 2h47
          </span>
        </div>
      </div>
    </div>
  );
}

/** Educação — Polo.edu: coorte com progresso preenchendo */
function EducacaoMockup() {
  const accent = "oklch(0.5 0.14 195)";
  return (
    <div className="absolute inset-0 flex flex-col">
      <BrandHeader
        name="Polo.edu · Educação"
        context="Coorte 2026.1 · 124 alunos"
        accent={accent}
        Mark={() => (
          <svg viewBox="0 0 12 12" className="h-2.5 w-2.5">
            <path d="M1.5 5 L6 2.5 L10.5 5 L6 7.5 Z" fill="white" />
            <path d="M3.5 6.2 L3.5 8 C3.5 8.6 4.6 9 6 9 C7.4 9 8.5 8.6 8.5 8 L8.5 6.2" stroke="white" strokeWidth="1.1" fill="none" strokeLinecap="round" />
          </svg>
        )}
      />
      <div className="flex-1 p-3 flex flex-col gap-2 relative">
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[7.5px]">
            <span className="text-muted-foreground uppercase tracking-wider">Progresso</span>
            <span className="font-bold ia-anim-tick-up" style={{ color: accent }}>
              78%
            </span>
          </div>
          <div
            className="h-2.5 rounded-sm overflow-hidden relative"
            style={{ backgroundColor: "oklch(0.95 0.005 110)" }}
          >
            <div
              className="absolute inset-y-0 left-0 ia-anim-fill-loop"
              style={{
                background: `linear-gradient(90deg, ${accent}, oklch(0.6 0.16 195))`,
                ["--fill-target" as string]: "78%",
              }}
            />
            <div
              aria-hidden
              className="absolute inset-y-0 w-8 ia-anim-scan-x"
              style={{
                background:
                  "linear-gradient(90deg, transparent, oklch(1 0 0 / 0.5), transparent)",
              }}
            />
          </div>
          <div className="flex items-center justify-between text-[6.5px] uppercase tracking-wider">
            <span className="inline-flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-sm" style={{ backgroundColor: accent }} />
              <span className="text-foreground">no ritmo</span>
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-sm" style={{ backgroundColor: "oklch(0.7 0.18 80)" }} />
              <span className="text-foreground">atenção</span>
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-sm" style={{ backgroundColor: "oklch(0.6 0.18 50)" }} />
              <span className="text-foreground">risco</span>
            </span>
          </div>
        </div>

        <div className="mt-auto flex items-center gap-1.5 text-[8px]">
          <div
            className="rounded p-1.5 flex-1"
            style={{
              backgroundColor: "oklch(1 0 0)",
              border: "1px solid oklch(0.93 0.005 110)",
            }}
          >
            <p className="text-[6.5px] text-muted-foreground uppercase tracking-wider">NPS</p>
            <p className="text-[12px] font-bold text-foreground leading-none mt-0.5 ia-anim-tick-up">
              +74
            </p>
          </div>
          <div
            className="rounded p-1.5 flex-1"
            style={{
              backgroundColor: "oklch(1 0 0)",
              border: "1px solid oklch(0.93 0.005 110)",
            }}
          >
            <p className="text-[6.5px] text-muted-foreground uppercase tracking-wider">Frequência</p>
            <p className="text-[12px] font-bold text-foreground leading-none mt-0.5">92%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
