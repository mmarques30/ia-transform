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
  Mockup: () => React.ReactElement;
}

const VERTICALS: Vertical[] = [
  { label: "Varejo", Mockup: VarejoMockup },
  { label: "Indústria", Mockup: IndustriaMockup },
  { label: "Consultoria", Mockup: ConsultoriaMockup },
  { label: "Saúde", Mockup: SaudeMockup },
  { label: "Serviços", Mockup: ServicosMockup },
  { label: "Educação", Mockup: EducacaoMockup },
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
        <div className="grid lg:grid-cols-[5fr_7fr] gap-10 lg:gap-14 items-center max-w-[1200px] mx-auto">
          <div>
            <Reveal>
              <span className="label-chip">
                <span className="dot" />
                Impacto operacional
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="h-mix mt-6 text-[32px] sm:text-[40px] lg:text-[48px] text-foreground">
                Quando a empresa
                <br />
                deixa de operar
                <br />
                <em>no improviso,</em>
                <br />o impacto é imediato.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-7 text-[15.5px] text-sage leading-[1.65] max-w-[440px]">
                O Business é uma solução de estruturação operacional com IA, criada pra empresas que
                precisam organizar a casa antes de escalar.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div
                className="mt-8 rounded-xl p-4"
                style={{
                  backgroundColor: "oklch(0.97 0.025 125)",
                  border: "1px solid oklch(0.85 0.05 125)",
                }}
              >
                <p
                  className="text-[15px] font-bold leading-[1.45]"
                  style={{ color: "oklch(0.42 0.15 125)" }}
                >
                  Clareza gera controle.
                  <br />
                  Controle gera crescimento sustentável.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <ImpactMonitor />
          </Reveal>
        </div>

        {/* Verticais — agora com mockups reais por segmento */}
        <div className="mt-24 lg:mt-28">
          <Reveal>
            <p className="text-center text-[11px] uppercase tracking-[0.16em] text-muted-foreground font-semibold">
              Empresas que organizamos
            </p>
            <h3 className="mt-4 text-center text-[24px] lg:text-[32px] font-bold text-foreground tracking-tight max-w-[760px] mx-auto">
              Cada vertical roda{" "}
              <em
                style={{
                  color: "var(--color-primary)",
                  fontStyle: "italic",
                  fontFamily: "var(--font-serif)",
                  fontWeight: 400,
                }}
              >
                seu próprio sistema
              </em>{" "}
              — adaptado por segmento.
            </h3>
          </Reveal>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[1100px] mx-auto">
            {VERTICALS.map((v, i) => (
              <Reveal key={v.label} delay={(i % 3) * 0.06}>
                <div className="tech-card overflow-hidden h-full flex flex-col">
                  {/* Mockup */}
                  <div
                    className="aspect-[16/9] relative overflow-hidden"
                    style={{
                      backgroundColor: "oklch(0.97 0.004 110)",
                      borderBottom: "1px solid var(--color-border)",
                    }}
                  >
                    <v.Mockup />
                  </div>
                  {/* Footer label */}
                  <div className="relative px-5 py-4 flex items-center justify-between">
                    <p
                      className="text-[10px] uppercase tracking-[0.16em] font-semibold"
                      style={{ color: "var(--color-muted-foreground)" }}
                    >
                      Vertical
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

      <div className="px-5 lg:px-6 pt-5 pb-3 flex items-end justify-between">
        <div>
          <p className="text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground font-semibold">
            Operação · últimos 90 dias
          </p>
          <p className="mt-1 text-[18px] font-bold tracking-tight text-foreground">
            6 indicadores chave
          </p>
        </div>
        <span
          className="text-[24px] font-bold tracking-tight"
          style={{ color: "oklch(0.55 0.16 125)" }}
        >
          +73%
        </span>
      </div>

      <div className="px-5 lg:px-6 pb-5 lg:pb-6 space-y-3.5">
        {METRICS.map((m) => {
          const isGood = m.trend === m.isGoodWhen;
          const TrendIcon = m.trend === "up" ? ArrowUp : ArrowDown;
          return (
            <div key={m.label}>
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-[13px] text-foreground font-medium">{m.label}</p>
                <span
                  className="inline-flex items-center gap-1 text-[12px] font-bold tracking-tight"
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
/* Vertical mockups — um por segmento, look de widget de produto      */
/* ------------------------------------------------------------------ */

/** Varejo — vendas por loja com bar chart horizontal */
function VarejoMockup() {
  const stores = [
    { l: "Vila Olímpia", v: "R$ 142k", w: "92%", c: "oklch(0.55 0.13 60)" },
    { l: "Pinheiros", v: "R$ 118k", w: "76%", c: "oklch(0.6 0.13 60)" },
    { l: "Jardins", v: "R$ 98k", w: "63%", c: "oklch(0.65 0.13 60)" },
    { l: "Itaim", v: "R$ 84k", w: "54%", c: "oklch(0.7 0.13 60)" },
  ];
  return (
    <div className="absolute inset-0 p-3 flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <p className="text-[8px] uppercase tracking-wider font-semibold text-muted-foreground">
          Vendas por loja · semana
        </p>
        <span className="text-[8px] font-semibold" style={{ color: "oklch(0.55 0.13 60)" }}>
          R$ 442k
        </span>
      </div>
      <div className="space-y-1 flex-1">
        {stores.map((s) => (
          <div key={s.l} className="flex items-center gap-1.5">
            <span className="text-[7.5px] text-foreground w-12 shrink-0 truncate">{s.l}</span>
            <div
              className="flex-1 h-2.5 rounded-sm overflow-hidden"
              style={{ backgroundColor: "oklch(0.97 0.004 110)" }}
            >
              <div className="h-full" style={{ width: s.w, backgroundColor: s.c }} />
            </div>
            <span className="text-[7.5px] font-mono text-muted-foreground w-12 text-right">
              {s.v}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Indústria — OEE com ring chart */
function IndustriaMockup() {
  return (
    <div className="absolute inset-0 p-3 flex items-center gap-3">
      <svg viewBox="0 0 60 60" className="h-16 w-16 shrink-0">
        <circle cx="30" cy="30" r="22" fill="none" stroke="oklch(0.95 0.005 110)" strokeWidth="6" />
        <circle
          cx="30"
          cy="30"
          r="22"
          fill="none"
          stroke="oklch(0.45 0.13 240)"
          strokeWidth="6"
          strokeDasharray="115 138"
          strokeDashoffset="0"
          transform="rotate(-90 30 30)"
          strokeLinecap="round"
        />
        <text
          x="30"
          y="30"
          textAnchor="middle"
          fontSize="11"
          fontWeight="700"
          fill="oklch(0.18 0.02 122)"
        >
          83%
        </text>
        <text x="30" y="40" textAnchor="middle" fontSize="6" fill="oklch(0.5 0.02 110)">
          OEE
        </text>
      </svg>

      <div className="flex-1 space-y-1">
        <p className="text-[8px] uppercase tracking-wider font-semibold text-muted-foreground">
          Linha 03 · turno B
        </p>
        {[
          { l: "Disponib.", v: "94%" },
          { l: "Performance", v: "91%" },
          { l: "Qualidade", v: "97%" },
        ].map((r) => (
          <div key={r.l} className="flex items-center justify-between text-[8px]">
            <span className="text-foreground">{r.l}</span>
            <span className="font-mono font-semibold text-foreground">{r.v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Consultoria — projetos ativos com horas */
function ConsultoriaMockup() {
  const projects = [
    { c: "Acme Co", h: "112h", st: "no prazo", color: "oklch(0.55 0.16 145)" },
    { c: "Foxtrot", h: "84h", st: "atenção", color: "oklch(0.7 0.18 80)" },
    { c: "Northwind", h: "62h", st: "no prazo", color: "oklch(0.55 0.16 145)" },
  ];
  return (
    <div className="absolute inset-0 p-3 flex flex-col gap-1.5">
      <p className="text-[8px] uppercase tracking-wider font-semibold text-muted-foreground">
        Projetos ativos · 3
      </p>
      <div className="space-y-1 flex-1">
        {projects.map((p) => (
          <div
            key={p.c}
            className="rounded p-1.5 flex items-center justify-between"
            style={{
              backgroundColor: "oklch(1 0 0)",
              border: "1px solid oklch(0.92 0.005 110)",
            }}
          >
            <div>
              <p className="text-[9px] font-semibold text-foreground leading-none">{p.c}</p>
              <p className="text-[7px] text-muted-foreground mt-0.5">{p.h}</p>
            </div>
            <span
              className="text-[7px] uppercase tracking-wider font-semibold inline-flex items-center gap-1"
              style={{ color: p.color }}
            >
              <span className="h-1 w-1 rounded-full" style={{ backgroundColor: p.color }} />
              {p.st}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Saúde — agenda de consultas */
function SaudeMockup() {
  const slots = [
    { t: "08:00", n: "M. Silva", st: "confirmado", c: "oklch(0.55 0.16 145)" },
    { t: "09:30", n: "P. Costa", st: "confirmado", c: "oklch(0.55 0.16 145)" },
    { t: "11:00", n: "—", st: "livre", c: "oklch(0.55 0.16 125)" },
    { t: "14:00", n: "L. Almeida", st: "remarcar", c: "oklch(0.6 0.18 50)" },
  ];
  return (
    <div className="absolute inset-0 p-3 flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <p className="text-[8px] uppercase tracking-wider font-semibold text-muted-foreground">
          Agenda · hoje
        </p>
        <span className="text-[8px] font-semibold" style={{ color: "oklch(0.5 0.15 25)" }}>
          24 consultas
        </span>
      </div>
      <div className="space-y-1 flex-1">
        {slots.map((s) => (
          <div
            key={s.t}
            className="rounded p-1.5 flex items-center justify-between"
            style={{
              backgroundColor: "oklch(1 0 0)",
              border: "1px solid oklch(0.92 0.005 110)",
            }}
          >
            <span className="text-[8px] font-mono text-foreground w-10">{s.t}</span>
            <span className="text-[8px] text-foreground flex-1 truncate">{s.n}</span>
            <span
              className="text-[7px] uppercase tracking-wider font-semibold"
              style={{ color: s.c }}
            >
              {s.st}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Serviços — ordem de serviço com SLA */
function ServicosMockup() {
  return (
    <div className="absolute inset-0 p-3 flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <p className="text-[8px] uppercase tracking-wider font-semibold text-muted-foreground">
          OS #4829 · em andamento
        </p>
        <span
          className="text-[7px] font-semibold uppercase tracking-wider"
          style={{ color: "oklch(0.55 0.16 145)" }}
        >
          dentro do SLA
        </span>
      </div>

      <div
        className="rounded p-2 space-y-1.5"
        style={{
          backgroundColor: "oklch(1 0 0)",
          border: "1px solid oklch(0.92 0.005 110)",
        }}
      >
        <div className="flex items-center justify-between text-[8px]">
          <span className="text-muted-foreground">Cliente</span>
          <span className="font-semibold text-foreground">Indústria SA</span>
        </div>
        <div className="flex items-center justify-between text-[8px]">
          <span className="text-muted-foreground">Técnico</span>
          <span className="font-semibold text-foreground">J. Pereira</span>
        </div>
        <div>
          <div className="flex items-center justify-between text-[8px] mb-0.5">
            <span className="text-muted-foreground">Progresso</span>
            <span className="font-mono font-semibold text-foreground">4/6 etapas</span>
          </div>
          <div
            className="h-1.5 rounded-full overflow-hidden"
            style={{ backgroundColor: "oklch(0.95 0.005 110)" }}
          >
            <div
              className="h-full rounded-full"
              style={{
                width: "67%",
                background: "linear-gradient(90deg, oklch(0.45 0.14 280), oklch(0.62 0.17 125))",
              }}
            />
          </div>
        </div>
      </div>

      <p className="text-[7.5px] text-muted-foreground mt-auto">SLA: 8h · restante 2h47</p>
    </div>
  );
}

/** Educação — coorte com progresso */
function EducacaoMockup() {
  return (
    <div className="absolute inset-0 p-3 flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <p className="text-[8px] uppercase tracking-wider font-semibold text-muted-foreground">
          Coorte 2026.1 · 124 alunos
        </p>
        <span className="text-[8px] font-semibold" style={{ color: "oklch(0.45 0.13 195)" }}>
          78%
        </span>
      </div>

      {/* Progress segmented bar */}
      <div className="space-y-1">
        <div className="flex h-3 rounded-sm overflow-hidden">
          <div className="flex-[78]" style={{ backgroundColor: "oklch(0.45 0.13 195)" }} />
          <div className="flex-[15]" style={{ backgroundColor: "oklch(0.7 0.18 80)" }} />
          <div className="flex-[7]" style={{ backgroundColor: "oklch(0.6 0.18 50)" }} />
        </div>
        <div className="flex items-center justify-between text-[7.5px]">
          <span className="inline-flex items-center gap-1">
            <span
              className="h-1.5 w-1.5 rounded-sm"
              style={{ backgroundColor: "oklch(0.45 0.13 195)" }}
            />
            <span className="text-foreground">no ritmo</span>
          </span>
          <span className="inline-flex items-center gap-1">
            <span
              className="h-1.5 w-1.5 rounded-sm"
              style={{ backgroundColor: "oklch(0.7 0.18 80)" }}
            />
            <span className="text-foreground">atenção</span>
          </span>
          <span className="inline-flex items-center gap-1">
            <span
              className="h-1.5 w-1.5 rounded-sm"
              style={{ backgroundColor: "oklch(0.6 0.18 50)" }}
            />
            <span className="text-foreground">risco</span>
          </span>
        </div>
      </div>

      <div className="mt-auto flex items-center gap-2 text-[8px]">
        <div
          className="rounded p-1.5 flex-1"
          style={{
            backgroundColor: "oklch(1 0 0)",
            border: "1px solid oklch(0.92 0.005 110)",
          }}
        >
          <p className="text-[7px] text-muted-foreground uppercase tracking-wider">NPS</p>
          <p className="text-[12px] font-bold text-foreground leading-none mt-0.5">+74</p>
        </div>
        <div
          className="rounded p-1.5 flex-1"
          style={{
            backgroundColor: "oklch(1 0 0)",
            border: "1px solid oklch(0.92 0.005 110)",
          }}
        >
          <p className="text-[7px] text-muted-foreground uppercase tracking-wider">Frequência</p>
          <p className="text-[12px] font-bold text-foreground leading-none mt-0.5">92%</p>
        </div>
      </div>
    </div>
  );
}
