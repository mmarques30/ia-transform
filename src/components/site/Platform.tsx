import { useState } from "react";
import {
  BarChart3,
  Bell,
  Bot,
  Check,
  FileSpreadsheet,
  Home,
  Layers,
  Mail,
  MessageCircle,
  Package,
  Search,
  Settings,
  Sparkles,
  Workflow,
} from "lucide-react";
import { CtaButton, Eyebrow, Rise, useInView, useTilt } from "./primitives";

/* ───────────────────────── Dashboard demo ───────────────────────── */

type TabKey = "pedidos" | "margem" | "estoque";

const TABS: Record<
  TabKey,
  {
    label: string;
    chartTitle: string;
    bars: number[];
    labels: string[];
    peak: number;
    tip: string;
    axis: string[];
  }
> = {
  pedidos: {
    label: "Pedidos",
    chartTitle: "Pedidos fechados · semana",
    bars: [38, 52, 46, 61, 87, 58, 44],
    labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
    peak: 4,
    tip: "R$ 87 mil",
    axis: ["R$ 100k", "R$ 75k", "R$ 50k", "R$ 25k", "0"],
  },
  margem: {
    label: "Margem",
    chartTitle: "Margem bruta · mês a mês",
    bars: [62, 58, 66, 70, 74, 81, 77],
    labels: ["Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov"],
    peak: 5,
    tip: "24,3%",
    axis: ["30%", "22%", "15%", "8%", "0"],
  },
  estoque: {
    label: "Estoque",
    chartTitle: "Cobertura de estoque · semanas",
    bars: [80, 72, 64, 55, 47, 38, 30],
    labels: ["S1", "S2", "S3", "S4", "S5", "S6", "S7"],
    peak: 6,
    tip: "3 semanas",
    axis: ["10 sem", "7 sem", "5 sem", "2 sem", "0"],
  },
};

const ACTIONS = [
  { title: "Compra de cimento", meta: "R$ 38 mil · fornecedor recomendado", cta: "Aprovar" },
  { title: "Pedido Construtora Alfa", meta: "R$ 54 mil · condição fora do padrão", cta: "Revisar" },
  { title: "Reajuste +4% na tabela", meta: "protege a margem do mês", cta: "Aplicar" },
];

function DashboardDemo() {
  const [tab, setTab] = useState<TabKey>("pedidos");
  const [done, setDone] = useState<Record<number, boolean>>({});
  const { ref, inView } = useInView<HTMLDivElement>(0.2);
  const data = TABS[tab];

  return (
    <div ref={ref} className={`st-dash ${inView ? "is-in" : ""}`}>
      <div className="st-dash-top">
        <div className="st-dash-brand">
          <img src="/brand/logo-mark.svg" alt="" width={22} height={22} />
          <span>Blocaz OS</span>
        </div>
        <div className="st-dash-search">
          <Search size={14} /> Pergunte ao sistema…
          <kbd>⌘K</kbd>
        </div>
        <div className="st-dash-user">
          <span className="st-dash-iconbtn">
            <Bell size={14} />
            <i />
          </span>
          <span className="st-dash-iconbtn">
            <Settings size={14} />
          </span>
          <span className="st-dash-hello">Olá, Rafael</span>
          <span className="st-dash-avatar">R</span>
        </div>
      </div>

      <div className="st-dash-body">
        <aside className="st-dash-side">
          <span className="is-on">
            <Home size={16} />
          </span>
          <span>
            <BarChart3 size={16} />
          </span>
          <span>
            <Package size={16} />
          </span>
          <span>
            <Workflow size={16} />
          </span>
          <span>
            <Bot size={16} />
          </span>
        </aside>

        <div className="st-dash-main">
          <div className="st-dash-titlebar">
            <div>
              <div className="st-mono st-dash-kicker">Blocaz Pré-Moldados · hoje</div>
              <h3>Meu painel</h3>
            </div>
            <div className="st-dash-tabs" role="tablist">
              {(Object.keys(TABS) as TabKey[]).map((k) => (
                <button
                  key={k}
                  type="button"
                  role="tab"
                  aria-selected={tab === k}
                  className={tab === k ? "is-on" : ""}
                  onClick={() => setTab(k)}
                >
                  {TABS[k].label}
                </button>
              ))}
            </div>
          </div>

          <div className="st-dash-kpis">
            <div className="st-kpi">
              <span>Pedidos do dia</span>
              <b>R$ 87 mil</b>
              <small>9 de 14 fechados</small>
              <div className="st-kpi-bar">
                <i style={{ width: inView ? "64%" : 0 }} />
              </div>
            </div>
            <div className="st-kpi">
              <span>Margem do mês</span>
              <b>24,3%</b>
              <small className="up">+1,8 p.p. vs. outubro</small>
              <div className="st-kpi-bar">
                <i style={{ width: inView ? "81%" : 0 }} />
              </div>
            </div>
            <div className="st-kpi">
              <span>Estoque de cimento</span>
              <b>3 semanas</b>
              <small className="warn">reposição sugerida</small>
              <div className="st-kpi-bar">
                <i className="warn" style={{ width: inView ? "30%" : 0 }} />
              </div>
            </div>
          </div>

          <div className="st-dash-chart">
            <div className="st-dash-chart-head">
              <span>{data.chartTitle}</span>
              <span className="st-mono">ver tudo →</span>
            </div>
            <div className="st-chart">
              <div className="st-chart-axis">
                {data.axis.map((a) => (
                  <span key={a}>{a}</span>
                ))}
              </div>
              <div className="st-chart-bars">
                {data.bars.map((v, i) => (
                  <div key={`${tab}-${i}`} className="st-chart-col">
                    <div
                      className={`st-chart-bar ${i === data.peak ? "is-peak" : ""}`}
                      style={{
                        height: inView ? `${v}%` : "4%",
                        transitionDelay: `${i * 60}ms`,
                      }}
                    >
                      {i === data.peak && (
                        <span className="st-chart-tip">
                          {data.tip}
                          <i />
                        </span>
                      )}
                    </div>
                    <span className="st-chart-label">{data.labels[i]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="st-dash-right">
          <div className="st-ai-card">
            <div className="st-ai-head">
              <span className="st-ai-badge">
                <Sparkles size={12} /> IA
              </span>
              <span className="st-mono">agora</span>
            </div>
            <p>
              Cimento subiu <b>6%</b>. Reajuste de <b>+4%</b> na tabela protege sua margem.
            </p>
            <div className="st-ai-typing">
              <i />
              <i />
              <i />
            </div>
          </div>

          <div className="st-actions">
            <div className="st-actions-head">
              <span>Ações sugeridas</span>
              <span className="st-mono">{Object.values(done).filter(Boolean).length}/3</span>
            </div>
            {ACTIONS.map((a, i) => (
              <div key={a.title} className={`st-action ${done[i] ? "is-done" : ""}`}>
                <div>
                  <b>{a.title}</b>
                  <small>{a.meta}</small>
                </div>
                <button type="button" onClick={() => setDone((d) => ({ ...d, [i]: !d[i] }))}>
                  {done[i] ? (
                    <>
                      <Check size={12} strokeWidth={3} /> Feito
                    </>
                  ) : (
                    a.cta
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── Bento ───────────────────────── */

function BentoCard({
  className = "",
  title,
  text,
  children,
}: {
  className?: string;
  title: string;
  text: string;
  children: React.ReactNode;
}) {
  const tilt = useTilt<HTMLElement>(4);
  return (
    <article
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      className={`st-bento-card ${className}`}
    >
      <div className="st-bento-visual">{children}</div>
      <div className="st-bento-copy">
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </article>
  );
}

const INTEGRATIONS = [
  { icon: FileSpreadsheet, label: "Planilhas" },
  { icon: Layers, label: "CRM" },
  { icon: Package, label: "ERP" },
  { icon: MessageCircle, label: "WhatsApp" },
  { icon: Mail, label: "E-mail" },
  { icon: Workflow, label: "APIs" },
];

export function PlatformSection() {
  return (
    <section className="st-section st-platform" id="plataforma">
      <div className="st-platform-arc" aria-hidden />
      <div className="st-container">
        <Rise className="st-center-head">
          <Eyebrow center>A plataforma</Eyebrow>
          <h2 className="st-h2">
            O sistema que <em>libera a operação</em>
            <br className="st-br-lg" /> e escala a receita.
          </h2>
          <p className="st-lead st-lead--center">
            Um software construído para o jeito que a sua empresa funciona. Dados em um lugar só, IA
            que avisa antes do problema e ações que você aprova com um clique.
          </p>
        </Rise>

        <Rise delay={120} className="st-dash-wrap">
          <DashboardDemo />
          <p className="st-dash-caption st-mono">
            Demonstração interativa · clique nas abas e nas ações
          </p>
        </Rise>

        <div className="st-bento">
          <Rise className="st-bento-slot st-bento-slot--a">
            <BentoCard
              title="Decisão com dados"
              text="Margem, pedidos e estoque em tempo real. Você decide olhando o painel, não esperando o fechamento do mês."
            >
              <svg viewBox="0 0 320 140" className="st-viz-line">
                <defs>
                  <linearGradient id="st-line-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#c8e040" stopOpacity="0.35" />
                    <stop offset="1" stopColor="#c8e040" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  className="fill"
                  d="M0,120 C30,110 50,118 80,96 C110,74 130,90 160,70 C190,50 205,64 230,40 C255,18 280,30 320,14 L320,140 L0,140 Z"
                />
                <path
                  className="stroke"
                  d="M0,120 C30,110 50,118 80,96 C110,74 130,90 160,70 C190,50 205,64 230,40 C255,18 280,30 320,14"
                />
                <line x1="230" y1="0" x2="230" y2="140" className="guide" />
                <circle cx="230" cy="40" r="6" className="dot" />
              </svg>
              <span className="st-viz-chip">+32% margem</span>
            </BentoCard>
          </Rise>

          <Rise delay={80} className="st-bento-slot st-bento-slot--b">
            <BentoCard
              title="IA que aprende"
              text="O que o time corrige vira padrão e volta sugerido. Quanto mais o sistema é usado, menos precisa ser preenchido."
            >
              <div className="st-viz-core">
                <span className="st-viz-ring r1" />
                <span className="st-viz-ring r2" />
                <span className="st-viz-node">
                  <img src="/brand/logo-mark.svg" alt="" width={34} height={34} />
                </span>
                <img className="st-viz-av a1" src="/clients/karen.jpg" alt="" />
                <img className="st-viz-av a2" src="/clients/bruno-lcr.jpg" alt="" />
                <img className="st-viz-av a3" src="/clients/julie.png" alt="" />
              </div>
            </BentoCard>
          </Rise>

          <Rise delay={160} className="st-bento-slot st-bento-slot--c">
            <BentoCard
              title="Execução sem gargalo"
              text="Pedido, aprovação e cobrança andam sozinhos. Cada etapa tem dono, prazo e status."
            >
              <div className="st-viz-flow">
                <span>Pedido</span>
                <i />
                <span className="is-hot">IA valida</span>
                <i />
                <span>Faturado</span>
              </div>
            </BentoCard>
          </Rise>

          <Rise delay={60} className="st-bento-slot st-bento-slot--d">
            <BentoCard
              title="Escala sem contratar"
              text="A receita cresce e a folha não acompanha. O mesmo time passa a entregar o dobro."
            >
              <div className="st-viz-bars">
                {[34, 42, 38, 56, 92, 60, 48].map((h, i) => (
                  <span key={i} className={i === 4 ? "is-hot" : ""} style={{ height: `${h}%` }}>
                    {i === 4 && <em>2x entregas</em>}
                  </span>
                ))}
              </div>
            </BentoCard>
          </Rise>

          <Rise delay={140} className="st-bento-slot st-bento-slot--e">
            <BentoCard
              title="Conecta com o que você já usa"
              text="Sem jogar fora o que funciona. O sistema conversa com planilha, CRM, ERP, WhatsApp e e-mail."
            >
              <div className="st-viz-integrations">
                {INTEGRATIONS.map((it, i) => (
                  <span key={it.label} style={{ animationDelay: `${i * 0.4}s` }}>
                    <it.icon size={16} />
                    {it.label}
                  </span>
                ))}
              </div>
            </BentoCard>
          </Rise>
        </div>

        <Rise className="st-center-cta">
          <CtaButton>Quero meu sistema</CtaButton>
        </Rise>
      </div>
    </section>
  );
}
