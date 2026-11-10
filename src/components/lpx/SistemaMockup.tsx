import { useEffect, useState } from "react";
import {
  Bell,
  ChartNoAxesCombined,
  FileText,
  LayoutDashboard,
  Settings,
  Sparkles,
  Users,
  Workflow,
} from "lucide-react";
import { useLpCopy, type LpCopy } from "@/lib/lpLocale";
import { PainelScaler } from "@/components/sections/business/variantB/painel/PainelScaler";
import { BLOCAZ_COPY } from "@/components/sections/business/variantB/painel/painelBlocazCopy";
import { ATLAS_COPY } from "@/components/sections/business/variantB/painel/painelAtlasCopy";
import { ROTASUL_COPY } from "@/components/sections/business/variantB/painel/painelRotaSulCopy";

/**
 * Painel de demonstração da dobra "Como a gente faz", no visual da LP:
 * menu lateral, alerta da IA, indicadores com minigráfico, gráfico do
 * setor e a fila de decisões. Três setores em abas (empresas fictícias,
 * mesmos textos e números dos painéis antigos). Desenhado em 990px e
 * escalado pelo PainelScaler pra caber em qualquer largura.
 */

type Sector = "industria" | "servicos" | "logistica";

const SECTORS: Sector[] = ["industria", "servicos", "logistica"];
const ROTATE_MS = 8000;

const TAB_LABELS: LpCopy<Record<Sector, string>> = {
  "pt-br": { industria: "Indústria", servicos: "Serviços", logistica: "Logística" },
  en: { industria: "Manufacturing", servicos: "Services", logistica: "Logistics" },
};

interface Kpi {
  label: string;
  value: string;
  trend: string;
}
interface Action {
  label: string;
  detail: string;
  btn: string;
}
interface PanelData {
  url: string;
  company: string;
  live: string;
  clock: string;
  aiA: string;
  aiMoney: string;
  aiB: string;
  aiTag: string;
  kpis: Kpi[];
  chartTitle: string;
  chartTag: string;
  decide: string;
  actions: Action[];
}

/** Setas e "!" que os textos de tendência já trazem viram cor do selo. */
function trendTone(trend: string): "up" | "down" | "warn" | "none" {
  if (!trend) return "none";
  if (trend.startsWith("↗")) return "up";
  if (trend.startsWith("↘")) return "down";
  return "warn";
}

const SPARKS = [
  "0,22 12,18 24,20 36,12 48,14 60,6 72,8",
  "0,8 12,12 24,10 36,16 48,14 60,20 72,18",
  "0,20 12,16 24,18 36,10 48,12 60,8 72,4",
];

/**
 * Cada painel simula o sistema de um cliente: cores e logo da marca dele
 * (empresas fictícias), não as da IAplicada.
 */
const THEMES: Record<Sector, React.CSSProperties> = {
  industria: {
    "--a1": "#ff8a3d",
    "--a1-hi": "#ffb37a",
    "--a2": "#ff4d6d",
    "--on-a": "#1f0d04",
    "--alert": "#ff4d6d",
  } as React.CSSProperties,
  servicos: {
    "--a1": "#2dd4a7",
    "--a1-hi": "#7eecd0",
    "--a2": "#38bdf8",
    "--on-a": "#04201a",
    "--alert": "#ffb347",
  } as React.CSSProperties,
  logistica: {
    "--a1": "#f472b6",
    "--a1-hi": "#f9a8d4",
    "--a2": "#a78bfa",
    "--on-a": "#2a0a1c",
    "--alert": "#ffb347",
  } as React.CSSProperties,
};

/** Logos das empresas fictícias (marca simples em SVG). */
function ClientLogo({ sector, size = 36 }: { sector: Sector; size?: number }) {
  const id = `sx-logo-${sector}`;
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: "var(--a1)" }} />
          <stop offset="1" style={{ stopColor: "var(--a2)" }} />
        </linearGradient>
      </defs>
      <rect width="36" height="36" rx="10" fill={`url(#${id})`} />
      {sector === "industria" && (
        <g style={{ fill: "var(--on-a)" }}>
          <rect x="8" y="20" width="9" height="7" rx="1.5" />
          <rect x="19" y="20" width="9" height="7" rx="1.5" />
          <rect x="13.5" y="11.5" width="9" height="7" rx="1.5" opacity=".8" />
        </g>
      )}
      {sector === "servicos" && (
        <g
          fill="none"
          style={{ stroke: "var(--on-a)" }}
          strokeWidth="2.6"
          strokeLinejoin="round"
          strokeLinecap="round"
        >
          <path d="M9 26 L18 9 L27 26" />
          <path d="M13.5 19.5 H22.5" />
        </g>
      )}
      {sector === "logistica" && (
        <g fill="none" style={{ stroke: "var(--on-a)" }} strokeWidth="2.6" strokeLinecap="round">
          <path d="M10 25 C10 18, 26 19, 26 12" />
          <circle cx="10" cy="25" r="2.2" style={{ fill: "var(--on-a)" }} stroke="none" />
          <path d="M22 11 L26 11 L26 15" strokeLinejoin="round" />
        </g>
      )}
    </svg>
  );
}

export function SistemaShowcase() {
  const labels = useLpCopy(TAB_LABELS);
  const [active, setActive] = useState<Sector>("industria");
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (touched) return;
    const id = window.setInterval(() => {
      setActive((cur) => SECTORS[(SECTORS.indexOf(cur) + 1) % SECTORS.length]);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [touched]);

  return (
    <div className="w-full">
      <div className="lpx-segment mb-5" role="tablist">
        {SECTORS.map((s) => (
          <button
            key={s}
            type="button"
            role="tab"
            aria-selected={s === active}
            data-active={s === active}
            onClick={() => {
              setActive(s);
              setTouched(true);
            }}
            className="lpx-segment-btn"
          >
            {labels[s]}
          </button>
        ))}
      </div>
      <PainelScaler maxScale={1.2}>
        <SistemaMockup key={active} sector={active} />
      </PainelScaler>
    </div>
  );
}

function SistemaMockup({ sector }: { sector: Sector }) {
  const blocaz = useLpCopy(BLOCAZ_COPY);
  const atlas = useLpCopy(ATLAS_COPY);
  const rota = useLpCopy(ROTASUL_COPY);

  const data: PanelData =
    sector === "industria" ? blocaz : sector === "servicos" ? { ...atlas, chartTag: "" } : rota;

  const NAV = [LayoutDashboard, Workflow, Users, FileText, ChartNoAxesCombined, Settings];

  return (
    <div className="sx" style={THEMES[sector]} aria-hidden>
      <aside className="sx-side">
        <ClientLogo sector={sector} size={32} />
        <nav className="sx-side-nav">
          {NAV.map((Icon, i) => (
            <span key={i} className="sx-side-btn" data-active={i === 0}>
              <Icon className="h-[17px] w-[17px]" strokeWidth={1.8} />
            </span>
          ))}
        </nav>
        <span className="sx-side-btn">
          <Bell className="h-[17px] w-[17px]" strokeWidth={1.8} />
        </span>
      </aside>

      <div className="sx-main">
        <header className="sx-head sx-in" style={{ "--d": "0s" } as React.CSSProperties}>
          <div className="flex items-center gap-3">
            <ClientLogo sector={sector} />
            <div>
              <p className="sx-company">{data.company}</p>
              <p className="sx-url">{data.url}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="sx-live">
              <i />
              {data.live}
            </span>
            <span className="sx-clock">{data.clock}</span>
          </div>
        </header>

        <div className="sx-ai sx-in" style={{ "--d": ".08s" } as React.CSSProperties}>
          <span className="sx-ai-icon">
            <Sparkles className="h-4 w-4" strokeWidth={2} />
          </span>
          <p className="sx-ai-text">
            {data.aiA}
            <strong>{data.aiMoney}</strong>
            {data.aiB}
          </p>
          <span className="sx-ai-tag">{data.aiTag}</span>
        </div>

        <div className="sx-kpis">
          {data.kpis.map((k, i) => {
            const tone = trendTone(k.trend);
            return (
              <div
                key={k.label}
                className="sx-card sx-in"
                style={{ "--d": `${0.16 + i * 0.07}s` } as React.CSSProperties}
              >
                <p className="sx-label">{k.label}</p>
                <div className="mt-2 flex items-end justify-between gap-2">
                  <p className="sx-value">{k.value}</p>
                  <svg viewBox="0 0 72 26" className="sx-spark" data-tone={tone}>
                    <polyline points={SPARKS[i % SPARKS.length]} />
                  </svg>
                </div>
                {tone === "none" ? (
                  <span className="sx-meter">
                    <i style={{ width: "88%" }} />
                  </span>
                ) : (
                  <span className="sx-chip" data-tone={tone}>
                    {k.trend}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div className="sx-bottom">
          <div className="sx-card sx-in" style={{ "--d": ".38s" } as React.CSSProperties}>
            <div className="flex items-center justify-between">
              <p className="sx-card-title">{data.chartTitle}</p>
              {data.chartTag && (
                <span className="sx-chip" data-tone="warn">
                  {data.chartTag}
                </span>
              )}
            </div>
            {sector === "industria" && <BarsChart days={blocaz.days} />}
            {sector === "servicos" && <AreaChart months={atlas.months} end={atlas.chartEnd} />}
            {sector === "logistica" && <RoutesChart routes={rota.routes} />}
          </div>

          <div className="sx-card sx-in" style={{ "--d": ".46s" } as React.CSSProperties}>
            <p className="sx-card-title">{data.decide}</p>
            <ul className="mt-3 space-y-2">
              {data.actions.map((a, i) => (
                <li key={a.label} className="sx-action">
                  <span className="sx-action-dot" data-first={i === 0} />
                  <span className="min-w-0 flex-1">
                    <span className="sx-action-label">{a.label}</span>
                    <span className="sx-action-detail">{a.detail}</span>
                  </span>
                  <span className="sx-btn" data-primary={i === 0}>
                    {a.btn}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Pedidos por dia contra a capacidade; o que passa da linha fica âmbar. */
function BarsChart({ days }: { days: string[] }) {
  const values = [44, 54, 62, 88, 94];
  const cap = 76;
  return (
    <div className="sx-bars">
      <span className="sx-cap" style={{ bottom: `${cap}%` }} />
      {values.map((v, i) => (
        <div key={days[i]} className="sx-bar-col">
          <span
            className="sx-bar"
            data-over={v > cap}
            style={{ height: `${v}%`, animationDelay: `${0.45 + i * 0.07}s` }}
          />
          <span className="sx-axis">{days[i]}</span>
        </div>
      ))}
    </div>
  );
}

/** Receita recorrente em 6 meses, linha com área e o valor final. */
function AreaChart({ months, end }: { months: string[]; end: string }) {
  const values = [158, 167, 176, 191, 203, 214];
  const min = 150;
  const max = 220;
  const pts = values.map((v, i) => {
    const x = 8 + (i * (384 - 16)) / (values.length - 1);
    const y = 110 - ((v - min) / (max - min)) * 96;
    return [x, y] as const;
  });
  const line = pts.map(([x, y]) => `${x},${y}`).join(" ");
  const area = `M${pts[0][0]},118 L${line.replace(/ /g, " L")} L${pts[pts.length - 1][0]},118 Z`;
  const [lx, ly] = pts[pts.length - 1];
  return (
    <div className="mt-3">
      <svg viewBox="0 0 384 120" className="sx-area">
        <defs>
          <linearGradient id="sx-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" style={{ stopColor: "var(--a1)", stopOpacity: 0.35 }} />
            <stop offset="1" style={{ stopColor: "var(--a1)", stopOpacity: 0 }} />
          </linearGradient>
        </defs>
        {[30, 60, 90].map((y) => (
          <line key={y} x1="0" x2="384" y1={y} y2={y} className="sx-gridline" />
        ))}
        <path d={area} fill="url(#sx-fill)" className="sx-area-fill" />
        <polyline points={line} className="sx-area-line" />
        <circle cx={lx} cy={ly} r="4.5" className="sx-area-dot" />
        <text x={lx - 6} y={ly - 10} textAnchor="end" className="sx-area-end">
          {end}
        </text>
      </svg>
      <div className="flex justify-between px-1">
        {months.map((m) => (
          <span key={m} className="sx-axis">
            {m}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Margem por rota; a que fica abaixo do mínimo aparece em âmbar. */
function RoutesChart({ routes }: { routes: string[] }) {
  const values = [28, 24, 20, 16, 9];
  const min = 12;
  const scale = 32;
  return (
    <div className="sx-routes">
      <span className="sx-min" style={{ left: `calc(84px + (100% - 128px) * ${min / scale})` }} />
      {values.map((v, i) => (
        <div key={routes[i]} className="sx-route">
          <span className="sx-axis sx-route-name">{routes[i]}</span>
          <span className="sx-route-track">
            <span
              className="sx-route-bar"
              data-under={v < min}
              style={{ width: `${(v / scale) * 100}%`, animationDelay: `${0.45 + i * 0.07}s` }}
            />
          </span>
          <span className="sx-route-val" data-under={v < min}>
            {v}%
          </span>
        </div>
      ))}
    </div>
  );
}
