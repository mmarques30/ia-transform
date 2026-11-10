import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import {
  AlertTriangle,
  Bell,
  Check,
  FileCode2,
  FileSpreadsheet,
  Heart,
  Home,
  LayoutGrid,
  MessageCircle,
  Receipt,
  Search,
  Send,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";

/**
 * Mockups dos cases (cards do carrossel em /site).
 *
 * Cada um é um painel em miniatura inspirado no sistema real do cliente,
 * redesenhado com a paleta da empresa e animação contínua. Tudo é
 * desenhado num canvas fixo de 480×300 e escalado para o tamanho do
 * card (ResizeObserver), então a composição é idêntica em qualquer tela.
 */

const W = 480;

function MockFrame({ theme, children }: { theme: CSSProperties; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(([entry]) => {
      el.style.setProperty("--mk-s", String(entry.contentRect.width / W));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={ref} className="mk-wrap" aria-hidden>
      <div className="mk" style={theme}>
        {children}
      </div>
    </div>
  );
}

function TopBar({ name, logo, right }: { name: string; logo: ReactNode; right?: ReactNode }) {
  return (
    <div className="mk-top">
      <span className="mk-brand">
        <span className="mk-logo">{logo}</span>
        {name}
      </span>
      <span className="mk-search">
        <Search size={10} /> Buscar…
      </span>
      <span className="mk-top-right">
        {right}
        <span className="mk-bell">
          <Bell size={10} />
          <i />
        </span>
        <span className="mk-avatar" />
      </span>
    </div>
  );
}

/** Contador que sobe em loop (para os números "vivos"). */
function useTicker(from: number, to: number, ms = 2600) {
  const [v, setV] = useState(to);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let start = performance.now();
    const tick = (now: number) => {
      const t = (now - start) / ms;
      if (t >= 1.6) start = now;
      const p = Math.min(1, t);
      setV(from + (to - from) * (1 - Math.pow(1 - p, 3)));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [from, to, ms]);
  return v;
}

/* ───────── Quadra Arquitetura · gestão de obras + assistente IA ───────── */

function QuadraMock() {
  const tasks = [
    ["Demolição do piso", "Civil", 100, "done"],
    ["Instalações elétricas", "Elétrica", 72, "run"],
    ["Impermeabilização", "Hidráulica", 38, "late"],
    ["Alvenaria e fechamento", "Civil", 12, "plan"],
  ] as const;
  return (
    <MockFrame
      theme={
        {
          "--bg": "#f6f3ee",
          "--card": "#ffffff",
          "--fg": "#1b2a44",
          "--muted": "#8a8f9c",
          "--c1": "#1b2a44",
          "--c2": "#d9677a",
          "--line": "#ebe6de",
        } as CSSProperties
      }
    >
      <TopBar name="Quadra" logo={<span className="mk-q">Q</span>} />
      <div className="mk-body mk-quadra">
        <div className="mk-col">
          <div className="mk-h">
            <span className="mk-serif">Obra Jardins</span>
            <span className="mk-chip mk-chip--c2">68% concluída</span>
          </div>
          <div className="mk-progress">
            <i />
          </div>
          <div className="mk-tasks">
            {tasks.map(([t, d, p, s], i) => (
              <div key={t} className="mk-task" style={{ animationDelay: `${i * 0.25}s` }}>
                <span className={`mk-dot mk-dot--${s}`} />
                <span className="mk-task-t">
                  <b>{t}</b>
                  <small>{d}</small>
                </span>
                <span className="mk-mini">
                  <i style={{ width: `${p}%` }} />
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="mk-ai">
          <div className="mk-ai-head">
            <Sparkles size={11} /> Assistente IA
          </div>
          <div className="mk-msg mk-msg--me">Quais tarefas estão atrasadas?</div>
          <div className="mk-msg mk-msg--ai">
            <b>1 atrasada:</b> Impermeabilização, 3 dias. Sugiro antecipar a equipe da elétrica.
          </div>
          <div className="mk-typing">
            <i />
            <i />
            <i />
          </div>
          <div className="mk-ask">
            Pergunte algo… <Send size={10} />
          </div>
        </div>
      </div>
    </MockFrame>
  );
}

/* ───────── Focus FinTax · teses tributárias / compensações ───────── */

function FocusMock() {
  const v = useTicker(10.2, 12.85);
  const bars = [62, 88, 40, 74, 96, 58];
  return (
    <MockFrame
      theme={
        {
          "--bg": "#0f1d36",
          "--card": "#16294a",
          "--fg": "#eef3ff",
          "--muted": "#8ea2c8",
          "--c1": "#2f6bff",
          "--c2": "#22c58b",
          "--c3": "#f59e3b",
          "--line": "#22385e",
        } as CSSProperties
      }
    >
      <TopBar name="Focus FinTax" logo={<TrendingUp size={11} />} />
      <div className="mk-body mk-focus">
        <div className="mk-kpis">
          <div className="mk-kpi">
            <small>Crédito identificado</small>
            <b>R$ {v.toFixed(2).replace(".", ",")} mi</b>
            <span className="mk-up">+18% no trimestre</span>
          </div>
          <div className="mk-kpi">
            <small>Compensado</small>
            <b>R$ 755 mil</b>
            <span className="mk-up">6 teses ativas</span>
          </div>
          <div className="mk-kpi mk-kpi--warn">
            <small>Pendências</small>
            <b>2</b>
            <span>
              <AlertTriangle size={9} /> revisar hoje
            </span>
          </div>
        </div>
        <div className="mk-card mk-chart">
          <div className="mk-card-h">
            Evolução das compensações
            <span className="mk-legend">
              <i className="c1" /> crédito <i className="c2" /> compensado
            </span>
          </div>
          <div className="mk-bars2">
            {bars.map((h, i) => (
              <span key={i} style={{ animationDelay: `${i * 0.12}s` }}>
                <i style={{ height: `${h}%` }} />
                <i style={{ height: `${h * 0.42}%` }} />
              </span>
            ))}
          </div>
        </div>
      </div>
    </MockFrame>
  );
}

/* ───────── PSA Consultores · projetos estratégicos ───────── */

function PsaMock() {
  const h = useTicker(2400, 2837);
  return (
    <MockFrame
      theme={
        {
          "--bg": "#f3f6f5",
          "--card": "#ffffff",
          "--fg": "#0f3b3a",
          "--muted": "#7c8c8a",
          "--c1": "#0f3b3a",
          "--c2": "#1db67a",
          "--line": "#e3ebe9",
        } as CSSProperties
      }
    >
      <TopBar
        name="PSA Consultores"
        logo={<span className="mk-q">P</span>}
        right={<span className="mk-chip mk-chip--c2">ROI R$ 191 mil</span>}
      />
      <div className="mk-body mk-psa">
        <div className="mk-kpis mk-kpis--4">
          <div className="mk-kpi">
            <small>Projetos ativos</small>
            <b>75</b>
          </div>
          <div className="mk-kpi">
            <small>Taxa de conclusão</small>
            <b>48%</b>
            <span className="mk-ring" style={{ "--p": 48 } as CSSProperties} />
          </div>
          <div className="mk-kpi">
            <small>Tarefas</small>
            <b>22</b>
          </div>
          <div className="mk-kpi mk-kpi--hero">
            <small>Horas planejadas</small>
            <b>{Math.round(h).toLocaleString("pt-BR")}h</b>
          </div>
        </div>
        <div className="mk-psa-row">
          <div className="mk-alert">
            <span className="mk-alert-i">
              <Bell size={12} />
            </span>
            <span>
              <small>PSA TAX · agora</small>
              <b>22 tarefas precisam de atenção</b>
              <em>Distribuídas entre 5 consultores</em>
            </span>
          </div>
          <div className="mk-card mk-line">
            <div className="mk-card-h">Horas por semana</div>
            <svg viewBox="0 0 200 70" preserveAspectRatio="none">
              <path
                className="mk-area"
                d="M0,60 C30,50 40,56 70,40 C100,24 120,36 150,20 C170,10 185,16 200,8 L200,70 L0,70Z"
              />
              <path
                className="mk-stroke"
                d="M0,60 C30,50 40,56 70,40 C100,24 120,36 150,20 C170,10 185,16 200,8"
              />
            </svg>
          </div>
        </div>
      </div>
    </MockFrame>
  );
}

/* ───────── Indústria moveleira · receita e margem ───────── */

function MoveisMock() {
  const bars = [45, 58, 52, 70, 64, 82, 76, 92];
  return (
    <MockFrame
      theme={
        {
          "--bg": "#f7f1e7",
          "--card": "#fffaf2",
          "--fg": "#2a2420",
          "--muted": "#9a8f82",
          "--c1": "#2a2420",
          "--c2": "#e8853a",
          "--line": "#ece2d2",
        } as CSSProperties
      }
    >
      <TopBar name="Atelier Móveis" logo={<LayoutGrid size={11} />} />
      <div className="mk-body mk-moveis">
        <div className="mk-kpis">
          <div className="mk-kpi">
            <small>Receita do mês</small>
            <b className="mk-serif">R$ 1,86 mi</b>
            <span className="mk-up">+12%</span>
          </div>
          <div className="mk-kpi">
            <small>Pedidos ativos</small>
            <b className="mk-serif">154</b>
          </div>
          <div className="mk-kpi">
            <small>Margem média</small>
            <b className="mk-serif">43,5%</b>
            <span className="mk-up">+2,1 p.p.</span>
          </div>
        </div>
        <div className="mk-moveis-row">
          <div className="mk-card mk-chart">
            <div className="mk-card-h">Receita mensal</div>
            <div className="mk-bars1">
              {bars.map((h, i) => (
                <i
                  key={i}
                  className={i === bars.length - 1 ? "hot" : ""}
                  style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          </div>
          <div className="mk-card mk-line">
            <div className="mk-card-h">Margem (%)</div>
            <svg viewBox="0 0 200 90" preserveAspectRatio="none">
              <path
                className="mk-stroke"
                d="M0,70 L28,62 L56,66 L84,48 L112,52 L140,34 L168,38 L200,20"
              />
              <circle className="mk-pt" cx="200" cy="20" r="4" />
            </svg>
          </div>
        </div>
      </div>
    </MockFrame>
  );
}

/* ───────── Uiara Intimates · comunidade ───────── */

function UiaraMock() {
  const posts = [
    ["Ana Clara", "Hoje acordei com uma clareza que não tinha há meses.", "Rituais"],
    ["Júlia Mendes", "Gente, precifiquei meu serviço pela primeira vez sem culpa.", "Empreender"],
    ["Beatriz Santos", "Meta da semana cumprida. Obrigada por existirem.", "Networking"],
  ];
  return (
    <MockFrame
      theme={
        {
          "--bg": "#f8efe9",
          "--card": "#fffaf7",
          "--fg": "#4a1f2a",
          "--muted": "#a58b86",
          "--c1": "#7a2e3b",
          "--c2": "#c9787f",
          "--line": "#f0dfd8",
        } as CSSProperties
      }
    >
      <TopBar name="Uiara" logo={<Heart size={10} />} />
      <div className="mk-body mk-uiara">
        <div className="mk-side">
          <span className="on">
            <Home size={11} /> Feed geral
          </span>
          <span>
            <Users size={11} /> Círculos
          </span>
          <span>
            <MessageCircle size={11} /> Mensagens
          </span>
          <div className="mk-online">
            <small>Online agora</small>
            <div className="mk-faces">
              <i />
              <i />
              <i />
              <i />
              <b>+38</b>
            </div>
          </div>
        </div>
        <div className="mk-col">
          <div className="mk-h">
            <span className="mk-serif">Umas pelas outras.</span>
          </div>
          {posts.map(([n, t, tag], i) => (
            <div key={n} className="mk-post" style={{ animationDelay: `${i * 0.4}s` }}>
              <span className="mk-av">{n[0]}</span>
              <span className="mk-post-t">
                <b>
                  {n} <em>{tag}</em>
                </b>
                <small>{t}</small>
              </span>
              <span className="mk-like" style={{ animationDelay: `${0.8 + i * 0.6}s` }}>
                <Heart size={10} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </MockFrame>
  );
}

/* ───────── Escritório contábil · catálogo de ferramentas fiscais ───────── */

function FiscalMock() {
  const tools = [
    [FileCode2, "Consulta de XMLs", "NF-e · NFC-e · CT-e"],
    [FileSpreadsheet, "Consulta SPED", "EFD ICMS/IPI"],
    [Receipt, "Análise ICMS", "Crédito e ST"],
    [Search, "PIS/COFINS", "Levantamento"],
  ] as const;
  return (
    <MockFrame
      theme={
        {
          "--bg": "#0b201c",
          "--card": "#11302a",
          "--fg": "#e7f6f1",
          "--muted": "#83a69c",
          "--c1": "#2fbf9b",
          "--c2": "#2fbf9b",
          "--line": "#1d443b",
        } as CSSProperties
      }
    >
      <TopBar
        name="Catálogo Fiscal"
        logo={<Receipt size={11} />}
        right={<span className="mk-chip mk-chip--c2">16 ferramentas</span>}
      />
      <div className="mk-body mk-fiscal">
        {tools.map(([Icon, t, d], i) => (
          <div key={t} className={`mk-tool ${i === 1 ? "is-run" : ""}`}>
            <span className="mk-tool-i">
              <Icon size={13} />
            </span>
            <b>{t}</b>
            <small>{d}</small>
            {i === 1 ? (
              <span className="mk-tool-run">
                <i />
                processando 1.284 registros
              </span>
            ) : (
              <span className="mk-tool-open">Abrir →</span>
            )}
          </div>
        ))}
      </div>
    </MockFrame>
  );
}

/* ───────── Varejo · diagnóstico de recuperação tributária ───────── */

function VarejoMock() {
  const v = useTicker(0.4, 2.1, 3000);
  return (
    <MockFrame
      theme={
        {
          "--bg": "#1b2f9e",
          "--card": "#24389f",
          "--fg": "#ffffff",
          "--muted": "#b9c4f5",
          "--c1": "#ff6a4d",
          "--c2": "#ff6a4d",
          "--line": "#3a4fb8",
        } as CSSProperties
      }
    >
      <div className="mk-body mk-varejo">
        <div className="mk-varejo-copy">
          <span className="mk-chip mk-chip--c2">Diagnóstico gratuito</span>
          <h4>
            Seu varejo perde em média <em>R$ {v.toFixed(1).replace(".", ",")} mi</em> por ano em
            impostos pagos a mais
          </h4>
          <div className="mk-meter">
            <i />
          </div>
          <small>Calculado com os dados do seu CNPJ</small>
        </div>
        <div className="mk-form">
          <b>Descubra quanto você pode recuperar</b>
          <span className="mk-field">CNPJ</span>
          <span className="mk-field">Segmento · Supermercado</span>
          <span className="mk-field mk-field--type">Faturamento anual</span>
          <span className="mk-cta">
            <Check size={11} /> Ver meu diagnóstico
          </span>
        </div>
      </div>
    </MockFrame>
  );
}

export const CASE_MOCKS = {
  quadra: QuadraMock,
  focus: FocusMock,
  psa: PsaMock,
  moveis: MoveisMock,
  uiara: UiaraMock,
  fiscal: FiscalMock,
  varejo: VarejoMock,
};
export type CaseMockKey = keyof typeof CASE_MOCKS;
