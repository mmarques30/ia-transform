import { useState } from "react";
import { Building2, CalendarClock, Check, Rocket, TrendingUp, X } from "lucide-react";
import { CountUp, CtaButton, Eyebrow, Rise, spotlight } from "./primitives";

/* ───────────────────────── Métricas + logos ───────────────────────── */

const STATS = [
  {
    icon: Building2,
    to: 50,
    prefix: "+",
    suffix: "",
    label: "empresas com sistema rodando",
    tag: "Brasil e exterior",
  },
  {
    icon: Rocket,
    to: 30,
    prefix: "",
    suffix: " dias",
    label: "para o MVP funcionar",
    tag: "entrega real",
  },
  {
    icon: CalendarClock,
    to: 90,
    prefix: "",
    suffix: " dias",
    label: "para o sistema completo",
    tag: "Método APLICA",
  },
  {
    icon: TrendingUp,
    to: 191,
    prefix: "R$ ",
    suffix: " mil",
    label: "de ROI documentado em 5 meses",
    tag: "case PSA",
  },
];

const LOGOS: { name: string; src?: string }[] = [
  { name: "Mercado Livre", src: "/clients/mercado-livre-logo.png" },
  { name: "iFood", src: "/clients/IFood_logo.svg.png" },
  { name: "Cimed", src: "/clients/cimed-logo.svg" },
  { name: "PSA Consultores", src: "/clients/psa-logo-quem-somos.png" },
  { name: "Borges & Zembruski" },
  { name: "Recon", src: "/clients/recon-logo-proposal.png" },
  { name: "Focus FinTax" },
  { name: "Turystar" },
  { name: "Uiara Intimates" },
  { name: "Quadra Arquitetura" },
  { name: "LCR Contadores" },
  { name: "Tijolo Capital" },
];

function LogoItem({ logo }: { logo: { name: string; src?: string } }) {
  const [failed, setFailed] = useState(false);
  if (logo.src && !failed) {
    return (
      <span className="st-logo">
        <img src={logo.src} alt={logo.name} loading="lazy" onError={() => setFailed(true)} />
      </span>
    );
  }
  return <span className="st-logo st-logo--text">{logo.name}</span>;
}

export function StatsBand() {
  return (
    <section className="st-stats" aria-label="Números da IAplicada">
      <div className="st-container">
        <div className="st-stats-grid">
          {STATS.map((s, i) => (
            <Rise key={s.label} delay={i * 90} className="st-stat">
              <span className="st-stat-icon">
                <s.icon size={18} />
              </span>
              <div className="st-stat-value">
                <CountUp to={s.to} prefix={s.prefix} suffix={s.suffix} />
              </div>
              <div className="st-stat-label">{s.label}</div>
              <span className="st-stat-tag">
                <Check size={11} strokeWidth={3} /> {s.tag}
              </span>
            </Rise>
          ))}
        </div>

        <div className="st-logos">
          <p className="st-logos-title">
            Empresas que já tiraram a operação da planilha com a IAplicada
          </p>
          <div className="st-marquee">
            <div className="st-marquee-track">
              {[...LOGOS, ...LOGOS].map((logo, i) => (
                <LogoItem key={`${logo.name}-${i}`} logo={logo} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Problema ───────────────────────── */

const PAINS = [
  {
    title: "Tudo passa pelo fundador",
    text: "Aprovação, preço, prioridade e cliente difícil. Se você sai uma semana, a operação desacelera.",
  },
  {
    title: "Operação vive em planilha e WhatsApp",
    text: "Informação espalhada em abas, grupos e cabeças. Ninguém tem a versão certa do dado.",
  },
  {
    title: "Decisão trava por falta de dado",
    text: "Margem, estoque e pipeline só aparecem no fim do mês, quando já é tarde para corrigir.",
  },
  {
    title: "Crescer significa contratar mais",
    text: "Cada cliente novo vira mais gente fazendo o mesmo trabalho manual. A folha cresce junto com a receita.",
  },
  {
    title: "Retrabalho entra como custo fixo",
    text: "Digitação dupla, conferência e correção. O erro manual não aparece no DRE, mas está em todo lugar.",
  },
];

export function ProblemSection() {
  const [active, setActive] = useState(1);
  return (
    <section className="st-section st-problem" id="problema">
      <div className="st-container">
        <div className="st-split-head">
          <Rise>
            <Eyebrow>O próximo ciclo</Eyebrow>
            <h2 className="st-h2">
              O que fez sua empresa crescer até aqui <em>não sustenta</em> o próximo ciclo.
            </h2>
          </Rise>
          <Rise delay={120}>
            <p className="st-lead">
              A operação ficou maior, as decisões mais complexas e os erros mais caros. As empresas
              que mais escalam hoje são as que automatizam a operação{" "}
              <strong>antes de contratar mais gente</strong>.
            </p>
          </Rise>
        </div>

        <div className="st-pains" onMouseLeave={() => setActive(1)}>
          {PAINS.map((p, i) => (
            <Rise key={p.title} delay={i * 70}>
              <article
                className={`st-pain ${active === i ? "is-active" : ""}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onMouseMove={spotlight}
                tabIndex={0}
              >
                <span className="st-pain-num">0{i + 1}.</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </article>
            </Rise>
          ))}
        </div>

        <Rise className="st-bridge">
          <p>
            O resultado é <span>crescimento que cria gargalo</span>, não velocidade.
          </p>
          <CtaButton>Quero destravar minha operação</CtaButton>
        </Rise>
      </div>
    </section>
  );
}

/* ───────────────────────── Antes x Depois ───────────────────────── */

const BEFORE = [
  "Tudo passa pelo fundador",
  "Operação vive em planilha e WhatsApp",
  "Decisão trava por falta de dado",
  "Crescer significa contratar mais",
  "Retrabalho entra como custo fixo",
];
const AFTER = [
  "Sistema resolve o que é rotina",
  "Dados centralizados e integrados",
  "Decisão acontece no sistema, não no WhatsApp",
  "IA elimina o retrabalho na raiz",
  "Time executa, você escala",
];

export function CompareSection() {
  const [mode, setMode] = useState<"before" | "after">("after");
  const list = mode === "before" ? BEFORE : AFTER;
  return (
    <section className="st-section st-compare">
      <div className="st-container">
        <Rise className="st-center-head">
          <Eyebrow center>A virada</Eyebrow>
          <h2 className="st-h2">
            Mesma empresa. Mesmo time. <em>Outra operação.</em>
          </h2>
        </Rise>

        <Rise delay={100}>
          <div className={`st-compare-card is-${mode}`}>
            <div className="st-toggle" role="tablist" aria-label="Comparar operação">
              <span className="st-toggle-thumb" aria-hidden />
              <button
                role="tab"
                aria-selected={mode === "before"}
                onClick={() => setMode("before")}
                type="button"
              >
                Como a maioria opera
              </button>
              <button
                role="tab"
                aria-selected={mode === "after"}
                onClick={() => setMode("after")}
                type="button"
              >
                Com a IAplicada
              </button>
            </div>

            <ul className="st-compare-list" key={mode}>
              {list.map((item, i) => (
                <li key={item} style={{ animationDelay: `${i * 60}ms` }}>
                  <span className="st-compare-icon">
                    {mode === "before" ? (
                      <X size={14} strokeWidth={3} />
                    ) : (
                      <Check size={14} strokeWidth={3} />
                    )}
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="st-compare-result">
              <span className="st-mono">Resultado</span>
              <strong>
                {mode === "before"
                  ? "Crescimento que cria gargalo, não velocidade."
                  : "Mais receita com o time que você já tem."}
              </strong>
            </div>
          </div>
        </Rise>
      </div>
    </section>
  );
}
