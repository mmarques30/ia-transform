import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Clock, Quote, Users, Wallet } from "lucide-react";
import { CtaButton, Eyebrow, Rise, prefersReducedMotion, useInView, useTilt } from "./primitives";

/* ───────────────────────── Calculadora ───────────────────────── */

const HOURS_PER_FTE = 200; // mesma conta da LP: 400h/mês = 2 pessoas
const WORKDAYS = 20;

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  format: (v: number) => string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <label className="st-slider">
      <span className="st-slider-head">
        <span>{label}</span>
        <b>{format(value)}</b>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ "--pct": `${pct}%` } as React.CSSProperties}
      />
    </label>
  );
}

export function CalculatorSection() {
  const [people, setPeople] = useState(10);
  const [hours, setHours] = useState(2);
  const [cost, setCost] = useState(60);

  const monthly = people * hours * WORKDAYS;
  const fte = monthly / HOURS_PER_FTE;
  const yearly = monthly * cost * 12;
  const ring = Math.min(1, fte / Math.max(people, 1));

  return (
    <section className="st-section st-calc" id="calculadora">
      <div className="st-container">
        <div className="st-calc-card">
          <div className="st-calc-glow" aria-hidden />
          <div className="st-calc-left">
            <Rise>
              <Eyebrow>Faça a conta</Eyebrow>
              <h2 className="st-h2">
                O custo que <em>não aparece no DRE.</em>
              </h2>
              <p className="st-lead">
                Fica diluído no CLT do time. Mexa nos números da sua operação e veja quanto do seu
                time trabalha só para manter o que deveria ser automático.
              </p>
            </Rise>
            <div className="st-calc-sliders">
              <Slider
                label="Pessoas no time"
                value={people}
                min={2}
                max={120}
                step={1}
                onChange={setPeople}
                format={(v) => `${v} pessoas`}
              />
              <Slider
                label="Horas de trabalho manual por dia, por pessoa"
                value={hours}
                min={0.5}
                max={6}
                step={0.5}
                onChange={setHours}
                format={(v) => `${v.toLocaleString("pt-BR")}h`}
              />
              <Slider
                label="Custo médio da hora (salário + encargos)"
                value={cost}
                min={25}
                max={250}
                step={5}
                onChange={setCost}
                format={(v) => `R$ ${v}`}
              />
            </div>
          </div>

          <div className="st-calc-right">
            <div className="st-gauge">
              <svg viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="84" className="track" />
                <circle
                  cx="100"
                  cy="100"
                  r="84"
                  className="value"
                  style={{ strokeDashoffset: 528 - 528 * ring }}
                />
              </svg>
              <div className="st-gauge-center">
                <b className="st-tabular">
                  {fte.toLocaleString("pt-BR", { maximumFractionDigits: 1 })}
                </b>
                <span>pessoas em tempo integral só no manual</span>
              </div>
            </div>
            <div className="st-calc-results">
              <div>
                <Clock size={16} />
                <span>Horas perdidas por mês</span>
                <b className="st-tabular">{monthly.toLocaleString("pt-BR")}h</b>
              </div>
              <div>
                <Users size={16} />
                <span>Equivalente em pessoas</span>
                <b className="st-tabular">
                  {fte.toLocaleString("pt-BR", { maximumFractionDigits: 1 })} FTE
                </b>
              </div>
              <div className="is-hot">
                <Wallet size={16} />
                <span>Custo escondido por ano</span>
                <b className="st-tabular">
                  {yearly.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                    maximumFractionDigits: 0,
                  })}
                </b>
              </div>
            </div>
            <CtaButton className="st-calc-cta">Quero recuperar essas horas</CtaButton>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Cases ───────────────────────── */

const CASES = [
  {
    img: "/clients/quadra-arquitetura.webp",
    client: "Quadra Arquitetura",
    title: "Gestão de obras com assistente de IA",
    text: "Cada etapa da obra com dono, prazo e status visível do celular.",
    tags: ["Obras", "Assistente IA", "Tarefas"],
  },
  {
    img: "/clients/focus-tax.webp",
    client: "Focus FinTax",
    title: "Teses tributárias de ponta a ponta",
    text: "O gargalo da calculadora manual virou processo automatizado com alerta de falha.",
    tags: ["Tributário", "Automação", "Relatórios"],
  },
  {
    img: "/clients/psa-tax.webp",
    client: "PSA Consultores",
    title: "Painel de projetos estratégicos",
    text: "R$ 191 mil de ROI documentado em cinco meses de projeto.",
    tags: ["Consultoria", "Painel", "ROI"],
  },
  {
    img: "/clients/industria-moveis-dashboard.webp",
    client: "Indústria moveleira",
    title: "Receita e margem em tempo real",
    text: "Pedidos, margem e receita mensal num painel único para a diretoria.",
    tags: ["Indústria", "Dashboard", "Margem"],
  },
  {
    img: "/clients/uiara-comunidade.webp",
    client: "Uiara Intimates",
    title: "Plataforma de comunidade",
    text: "O projeto da vida da fundadora no ar em dois meses e meio.",
    tags: ["Comunidade", "Plataforma", "Engajamento"],
  },
  {
    img: "/clients/catalogo-ferramentas-fiscais.webp",
    client: "Escritório contábil",
    title: "Catálogo de ferramentas fiscais",
    text: "Consulta de XML, SPED e ICMS em um só lugar, sem digitação dupla.",
    tags: ["Contábil", "Fiscal", "Integrações"],
  },
  {
    img: "/clients/recuperacao-tributaria-varejo.webp",
    client: "Varejo",
    title: "Diagnóstico de recuperação tributária",
    text: "Funil que qualifica o lead e calcula o potencial de recuperação na hora.",
    tags: ["Varejo", "Funil", "IA"],
  },
];

function CaseCard({ c }: { c: (typeof CASES)[number] }) {
  const tilt = useTilt<HTMLElement>(7);
  return (
    <article
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      className="st-case"
    >
      <div className="st-case-img">
        <img
          src={c.img}
          alt={`Sistema ${c.client}: ${c.title}`}
          loading="lazy"
          width={1600}
          height={900}
        />
      </div>
      <div className="st-case-body">
        <span className="st-mono st-case-client">{c.client}</span>
        <h3>{c.title}</h3>
        <p>{c.text}</p>
        <div className="st-case-tags">
          {c.tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>
    </article>
  );
}

export function CasesSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const t = trackRef.current;
    if (!t) return;
    setEdge({
      start: t.scrollLeft < 8,
      end: t.scrollLeft + t.clientWidth > t.scrollWidth - 8,
    });
  }, []);

  const scroll = (dir: number) => {
    const t = trackRef.current;
    if (!t) return;
    const card = t.querySelector<HTMLElement>(".st-case");
    t.scrollBy({ left: dir * ((card?.offsetWidth ?? 360) + 20), behavior: "smooth" });
  };

  return (
    <section className="st-section st-cases" id="cases">
      <div className="st-container">
        <div className="st-cases-head">
          <Rise>
            <Eyebrow>Cases</Eyebrow>
            <h2 className="st-h2">
              Sistemas reais, <em>rodando</em> em operações reais.
            </h2>
            <p className="st-lead">
              Indústria, serviços, contábil, varejo e logística. O critério não é o setor, é o
              problema.
            </p>
          </Rise>
          <div className="st-cases-nav">
            <button
              type="button"
              onClick={() => scroll(-1)}
              disabled={edge.start}
              aria-label="Anterior"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              disabled={edge.end}
              aria-label="Próximo"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
      <div className="st-cases-track" ref={trackRef} onScroll={update}>
        {CASES.map((c) => (
          <CaseCard key={c.title} c={c} />
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────── Depoimentos ───────────────────────── */

const TESTIMONIALS = [
  {
    name: "Patrícia",
    company: "PSA Consultores",
    role: "Business Case",
    photo: "/clients/patricia.jpg",
    text: "Eu construí o business case achando que ia ser difícil provar o retorno. Em cinco meses de projeto, R$ 191 mil de ROI documentado. Não foi estimativa, foi número que eu apresentei pra diretoria.",
  },
  {
    name: "Mariana",
    company: "Quadra Arquitetura",
    role: "Gerenciamento de obras",
    photo: "/clients/mariana-quadra.png",
    text: "A gente gerenciava obra no papel, na planilha e na memória. Hoje cada etapa da obra tem dono, prazo e status que eu vejo do celular. Parei de visitar canteiro pra descobrir problema.",
  },
  {
    name: "Karen",
    company: "Turystar",
    role: "Operadora de Turismo",
    photo: "/clients/karen.jpg",
    text: "O gerenciamento das viagens corporativas era nosso processo mais crítico: duas semanas de trabalho viraram duas horas. E o mais importante: acabaram os erros.",
  },
  {
    name: "Carlos Prado",
    company: "PSA Consultores",
    role: "Sócio",
    photo: "/clients/carlos-prado.jpg",
    text: "As pessoas pararam de fazer trabalho repetitivo e começaram a entregar mais rápido. Eficiência operacional subiu pelo menos 50% em seis meses. O mesmo time, produzindo o dobro.",
  },
  {
    name: "Bruno",
    company: "LCR",
    role: "Conciliação contábil",
    photo: "/clients/bruno-lcr.jpg",
    text: "A conciliação contábil consumia dias do time todo mês. Hoje a IA classifica o razão sozinha e os sistemas conversam entre si, sem digitação dupla.",
  },
  {
    name: "Julie",
    company: "Tijolo Capital",
    role: "Imobiliário",
    photo: "/clients/julie.png",
    text: "Hoje o que travava dias sai no mesmo dia. Escalei sem contratar ninguém e a agilidade virou meu argumento de venda: o cliente fecha comigo porque comigo anda.",
  },
  {
    name: "Alcir",
    company: "Focus FinTax",
    role: "Teses tributárias",
    photo: "/clients/alcir.jpg",
    text: "A geração de teses era nosso gargalo. Hoje o processo roda automatizado de ponta a ponta e qualquer falha operacional aparece na hora, não no fim do mês.",
  },
  {
    name: "Juliana",
    company: "B&Z",
    role: "Gestão",
    photo: "/clients/juliana-biz.png",
    text: "O diagnóstico foi um choque. Quando vi quanto o manual estava custando em receita, entendi onde focar. Fizemos mudanças estruturais que a gente adiava há anos.",
  },
  {
    name: "Uiara",
    company: "Uiara Intimates",
    role: "Comunidade",
    photo: "/clients/uiara.png",
    text: "Esse era o projeto da minha vida. Com a IAplicada saiu exatamente como eu sempre quis. Todas as expectativas atingidas em dois meses e meio.",
  },
];

export function TestimonialsSection() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const { ref, inView } = useInView<HTMLDivElement>(0.3);
  const n = TESTIMONIALS.length;
  const go = (d: number) => setI((v) => (v + d + n) % n);

  useEffect(() => {
    if (!inView || paused || prefersReducedMotion()) return;
    const id = setTimeout(() => go(1), 6500);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i, inView, paused]);

  return (
    <section className="st-section st-testi" id="depoimentos">
      <div className="st-testi-glow" aria-hidden />
      <div className="st-container">
        <Rise className="st-center-head">
          <Eyebrow center>Depoimentos</Eyebrow>
          <h2 className="st-h2">
            Quem opera com a IAplicada <em>não volta</em> pra planilha.
          </h2>
        </Rise>

        <div
          ref={ref}
          className="st-testi-stage"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {TESTIMONIALS.map((t, idx) => {
            let pos = idx - i;
            if (pos > n / 2) pos -= n;
            if (pos < -n / 2) pos += n;
            const hidden = Math.abs(pos) > 1;
            return (
              <figure
                key={t.name}
                className={`st-testi-card ${pos === 0 ? "is-center" : ""}`}
                style={{
                  transform: `translateX(calc(${pos} * var(--st-testi-shift))) scale(${pos === 0 ? 1 : 0.86})`,
                  opacity: hidden ? 0 : pos === 0 ? 1 : 0.35,
                  zIndex: 10 - Math.abs(pos),
                  pointerEvents: hidden ? "none" : "auto",
                }}
                onClick={() => pos !== 0 && go(pos)}
                aria-hidden={pos !== 0}
              >
                <Quote className="st-testi-quote" size={28} />
                <blockquote>{t.text}</blockquote>
                <figcaption>
                  <img src={t.photo} alt="" width={44} height={44} loading="lazy" />
                  <span>
                    <b>{t.name}</b>
                    <small>
                      {t.role} · {t.company}
                    </small>
                  </span>
                  <span className="st-stars" aria-label="5 estrelas">
                    ★★★★★
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>

        <div className="st-testi-controls">
          <button type="button" onClick={() => go(-1)} aria-label="Depoimento anterior">
            <ArrowLeft size={16} />
          </button>
          <div className="st-testi-dots">
            {TESTIMONIALS.map((t, idx) => (
              <button
                key={t.name}
                type="button"
                className={idx === i ? "is-on" : ""}
                onClick={() => setI(idx)}
                aria-label={`Depoimento de ${t.name}`}
              />
            ))}
          </div>
          <button type="button" onClick={() => go(1)} aria-label="Próximo depoimento">
            <ArrowRight size={16} />
          </button>
        </div>

        <Rise className="st-center-cta">
          <CtaButton>Quero meu diagnóstico</CtaButton>
        </Rise>
      </div>
    </section>
  );
}
