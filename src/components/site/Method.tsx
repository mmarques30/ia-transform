import { useEffect, useState } from "react";
import { Cpu, Rocket, Search, Sparkles } from "lucide-react";
import { CtaButton, Eyebrow, Rise, Wave, prefersReducedMotion, useInView } from "./primitives";

/* ───────────────────────── Método APLICA ───────────────────────── */

const APLICA = [
  {
    letter: "A",
    label: "Analisar",
    title: "Onde sua operação trava hoje",
    text: "Mapeamos processos, pessoas e ferramentas e medimos onde a empresa perde tempo e dinheiro. Sai daqui o ranking de gargalos, do que mais custa ao que menos custa.",
    tags: ["Diagnóstico", "Mapa de processos", "Ranking de gargalos"],
  },
  {
    letter: "P",
    label: "Planejar",
    title: "O sistema que elimina o gargalo",
    text: "Desenhamos o software para o jeito que o seu negócio funciona, dividido em módulos e priorizado pelo que gera resultado primeiro.",
    tags: ["Escopo por módulo", "Ordem de entrega", "Métricas de sucesso"],
  },
  {
    letter: "L",
    label: "Listar",
    title: "Processos, gente e ferramentas",
    text: "Cada etapa ganha dono, prazo e regra. O que hoje vive na cabeça de alguém vira fluxo documentado dentro do sistema.",
    tags: ["Fluxos", "Responsáveis", "Regras de negócio"],
  },
  {
    letter: "I",
    label: "Implementar",
    title: "Dentro do seu negócio, não em slide",
    text: "MVP funcionando em até 30 dias, na operação real. O time usa desde a primeira semana e cada entrega é funcional, não promessa de próxima fase.",
    tags: ["MVP em 30 dias", "Sprints", "Treinamento do time"],
  },
  {
    letter: "C",
    label: "Conectar",
    title: "Com o que já roda, sem trocar tudo",
    text: "Integramos planilha, CRM, ERP, WhatsApp e e-mail. Os sistemas conversam entre si e a digitação dupla acaba.",
    tags: ["Integrações via API", "CRM e ERP", "WhatsApp e e-mail"],
  },
  {
    letter: "A",
    label: "Automatizar",
    title: "As rotinas que consomem seu time",
    text: "Agentes de IA assumem o repetitivo, alertam antes do problema e sugerem a próxima ação. O time executa, você escala.",
    tags: ["Agentes de IA", "Alertas", "Painéis em tempo real"],
  },
];

const STEP_MS = 6000;

export function MethodSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const { ref, inView } = useInView<HTMLDivElement>(0.3);

  useEffect(() => {
    if (!inView || paused || prefersReducedMotion()) return;
    const id = setTimeout(() => setActive((a) => (a + 1) % APLICA.length), STEP_MS);
    return () => clearTimeout(id);
  }, [active, inView, paused]);

  const item = APLICA[active];

  return (
    <section className="st-section st-method" id="metodo">
      <div className="st-container">
        <div className="st-split-head">
          <Rise>
            <Eyebrow>Metodologia</Eyebrow>
            <h2 className="st-h2">
              Método <em>APLICA</em>: seis etapas do gargalo ao sistema rodando.
            </h2>
          </Rise>
          <Rise delay={120}>
            <p className="st-lead">
              Criado pela Mariana Marques a partir de 11 anos operando em Mercado Livre, Suzano e
              AngloGold. Identifica onde sua operação trava, constrói o sistema que resolve e
              implanta dentro do seu negócio em até <strong>90 dias</strong>.
            </p>
          </Rise>
        </div>

        <div
          ref={ref}
          className="st-method-body"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="st-method-tabs" role="tablist" aria-label="Etapas do Método APLICA">
            {APLICA.map((s, i) => (
              <button
                key={`${s.letter}-${i}`}
                type="button"
                role="tab"
                aria-selected={active === i}
                className={active === i ? "is-on" : ""}
                onClick={() => setActive(i)}
              >
                <span className="st-method-letter">{s.letter}</span>
                <span className="st-method-label">
                  <span className="st-mono">0{i + 1}</span>
                  {s.label}
                </span>
                {active === i && (
                  <span
                    className={`st-method-progress ${paused ? "is-paused" : ""}`}
                    style={{ animationDuration: `${STEP_MS}ms` }}
                    key={`p-${active}`}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="st-method-panel" key={active} role="tabpanel">
            <span className="st-method-giant" aria-hidden>
              {item.letter}
            </span>
            <div className="st-method-panel-inner">
              <span className="st-mono st-method-step">
                Etapa 0{active + 1} · {item.label}
              </span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <div className="st-method-tags">
                <span className="st-mono">Principais entregas</span>
                <div>
                  {item.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="st-method-word" aria-hidden>
              {APLICA.map((s, i) => (
                <span key={i} className={i <= active ? "is-lit" : ""}>
                  {s.letter}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Jornada (dobra clara) ───────────────────────── */

const JOURNEY = [
  {
    icon: Search,
    when: "Semana 0",
    title: "Diagnóstico gratuito",
    text: "45 minutos com a IAplicada. Mapeamos a operação e entregamos o ranking de gargalos. O material fica com você.",
  },
  {
    icon: Rocket,
    when: "Até 30 dias",
    title: "MVP funcionando",
    text: "A primeira parte do sistema já roda na operação real, resolvendo o gargalo que mais custa.",
  },
  {
    icon: Cpu,
    when: "Até 90 dias",
    title: "Sistema completo",
    text: "Módulos integrados, painéis, alertas e agentes de IA. O time operando e você acompanhando de onde estiver.",
  },
  {
    icon: Sparkles,
    when: "Contínuo",
    title: "IA que evolui",
    text: "O sistema aprende com cada uso. O que o time corrige vira padrão e o trabalho manual continua caindo.",
  },
];

const DELIVERABLES = [
  [
    "I",
    "Clareza sobre os gargalos",
    "o que está limitando a operação, com custo em horas e receita.",
  ],
  ["II", "Prioridades definidas", "a ordem de construção pelo que gera resultado primeiro."],
  ["III", "Sistema em produção", "software rodando dentro da operação, não apresentação."],
  ["IV", "Time operando", "pessoas treinadas e processos que não dependem do dono."],
];

export function JourneySection() {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);
  return (
    <section className="st-light" id="jornada">
      <Wave />
      <div className="st-light-body">
        <div className="st-container">
          <div className="st-split-head">
            <Rise>
              <Eyebrow>Como funciona</Eyebrow>
              <h2 className="st-h2 st-h2--dark">
                Do diagnóstico ao sistema rodando <em>em até 90 dias.</em>
              </h2>
            </Rise>
            <Rise delay={120}>
              <p className="st-lead st-lead--dark">
                Uma jornada de preparação, construção e evolução. Cada etapa aproxima a decisão da
                execução, e cada entrega já funciona na operação.
              </p>
            </Rise>
          </div>

          <div ref={ref} className={`st-journey ${inView ? "is-in" : ""}`}>
            <svg
              className="st-journey-line"
              viewBox="0 0 1000 80"
              preserveAspectRatio="none"
              aria-hidden
            >
              <path d="M0,40 C120,0 220,80 340,40 C460,0 540,80 660,40 C780,0 880,80 1000,40" />
              <path
                className="st-journey-line-on"
                d="M0,40 C120,0 220,80 340,40 C460,0 540,80 660,40 C780,0 880,80 1000,40"
              />
            </svg>
            {JOURNEY.map((j, i) => (
              <div
                key={j.title}
                className={`st-journey-step ${i === JOURNEY.length - 1 ? "is-final" : ""}`}
                style={{ transitionDelay: `${300 + i * 220}ms` }}
              >
                <span className="st-journey-node">
                  <j.icon size={18} />
                </span>
                <span className="st-mono st-journey-when">{j.when}</span>
                <h3>{j.title}</h3>
                <p>{j.text}</p>
              </div>
            ))}
          </div>

          <div className="st-deliver">
            <Rise className="st-deliver-head">
              <span className="st-mono">Entregável</span>
              <h3>O que você leva, contratando ou não, e depois do projeto.</h3>
            </Rise>
            <div className="st-deliver-grid">
              {DELIVERABLES.map(([n, t, d], i) => (
                <Rise key={n} delay={i * 80} className="st-deliver-item">
                  <span className="st-deliver-num">{n}</span>
                  <b>{t}</b>
                  <p>{d}</p>
                </Rise>
              ))}
            </div>
            <Rise className="st-center-cta">
              <CtaButton variant="dark">Agendar meu diagnóstico</CtaButton>
            </Rise>
          </div>
        </div>
      </div>
      <Wave flip />
    </section>
  );
}
