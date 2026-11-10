import { Quote } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { CountUp } from "@/components/lpx/CountUp";
import { SectionHead } from "@/components/lpx/SectionHead";
import { useLpCopy, useLpLocale, type LpCopy } from "@/lib/lpLocale";

interface TestimonialItem {
  name: string;
  role: string;
  company: string;
  text: string;
  photoSrc: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    name: "Mariana",
    company: "Quadra Arquitetura",
    role: "Gerenciamento de obras",
    photoSrc: "/clients/mariana-quadra.png",
    text: "A gente gerenciava obra no papel, na planilha e na memória. Hoje cada etapa da obra tem dono, prazo e status que eu vejo do celular. Parei de visitar canteiro pra descobrir problema. O sistema me avisa antes.",
  },
  {
    name: "Alcir",
    company: "Focus Fintax",
    role: "Teses tributárias",
    photoSrc: "/clients/alcir.jpg",
    text: "A geração de teses era nosso gargalo: calculadora contábil manual, atraso que ninguém enxergava a origem. Hoje o processo roda automatizado de ponta a ponta e qualquer falha operacional aparece na hora, não no fim do mês.",
  },
  {
    name: "Bruno",
    company: "LCR",
    role: "Conciliação contábil",
    photoSrc: "/clients/bruno-lcr.jpg",
    text: "A conciliação contábil consumia dias do time todo mês. Hoje a IA classifica o razão sozinha e os sistemas conversam entre si, sem digitação dupla. O tempo que a gente economizou virou capacidade de atender mais clientes.",
  },
  {
    name: "Patrícia",
    company: "PSA Consultores",
    role: "Business Case",
    photoSrc: "/clients/patricia.jpg",
    text: "Eu construí o business case achando que ia ser difícil provar o retorno. Em cinco meses de projeto, R$ 191 mil de ROI documentado. Não foi estimativa, foi número que eu apresentei pra diretoria.",
  },
  {
    name: "Julie",
    company: "Tijolo Capital",
    role: "Imobiliário",
    photoSrc: "/clients/julie.png",
    text: "Processo imobiliário é burocracia em cima de burocracia. Hoje o que travava dias sai no mesmo dia. Escalei sem contratar ninguém e a agilidade virou meu argumento de venda: o cliente fecha comigo porque comigo anda.",
  },
  {
    name: "Karen",
    company: "Turystar",
    role: "Operadora de Turismo",
    photoSrc: "/clients/karen.jpg",
    text: "O gerenciamento das viagens corporativas era nosso processo mais crítico: duas semanas de trabalho viraram duas horas. E o mais importante: acabaram os erros. O que a gente refazia por falha manual, hoje sai certo de primeira.",
  },
  {
    name: "Carlos Prado",
    company: "PSA Consultores",
    role: "Sócio",
    photoSrc: "/clients/carlos-prado.jpg",
    text: "O que mais me impressionou não foi a tecnologia, foi o time. As pessoas pararam de fazer trabalho repetitivo e começaram a entregar mais rápido. Eficiência operacional subiu pelo menos 50% em seis meses. O mesmo time, produzindo o dobro.",
  },
  {
    name: "Juliana",
    company: "B&Z",
    role: "Gestão",
    photoSrc: "/clients/juliana-biz.png",
    text: "O diagnóstico foi um choque. A gente fazia tudo manual e eu não tinha visibilidade de nada. Quando vi quanto isso estava custando em receita, entendi onde focar. Fizemos mudanças estruturais que a gente adiava há anos.",
  },
  {
    name: "Uiara",
    company: "Uiara Intimates",
    role: "Comunidade",
    photoSrc: "/clients/uiara.png",
    text: "Esse era o projeto da minha vida e eu tinha medo de não sair do papel do jeito que eu imaginava. Com a IAplicada saiu exatamente como eu sempre quis. Todas as expectativas atingidas em dois meses e meio. Melhor decisão que eu tomei pro meu negócio.",
  },
];

/** Números que os próprios clientes citam nos depoimentos abaixo. */
interface Metric {
  prefix?: string;
  value: number;
  suffix: string;
  label: string;
  source: string;
}

const METRICS_PT: Metric[] = [
  {
    prefix: "+",
    value: 50,
    suffix: "",
    label: "empresas com sistema próprio",
    source: "Brasil e exterior",
  },
  {
    prefix: "R$ ",
    value: 191,
    suffix: " mil",
    label: "de ROI documentado em 5 meses",
    source: "PSA Consultores",
  },
  {
    value: 2,
    suffix: "h",
    label: "no que levava 2 semanas, o processo mais crítico",
    source: "Turystar",
  },
  {
    prefix: "+",
    value: 50,
    suffix: "%",
    label: "de eficiência operacional em 6 meses",
    source: "PSA Consultores",
  },
];

const COPY_PT_BR = {
  eyebrow: "Resultados",
  titleA: "Mais de 50 empresas já possuem",
  titleB: "sistemas personalizados",
  metrics: METRICS_PT,
  testimonials: TESTIMONIALS,
  /** Destaque numérico de alguns depoimentos (índice no TESTIMONIALS). */
  highlights: {
    3: "R$ 191 mil de ROI",
    5: "2 semanas → 2 horas",
    6: "+50% de eficiência",
  } as Record<number, string>,
};

/**
 * Tradução dos depoimentos reais, na mesma ordem do TESTIMONIALS (nome,
 * empresa e foto não mudam). Valores citados pelo cliente ficam como ele
 * falou (R$), sem conversão.
 */
const EN_TESTIMONIALS: Array<Pick<TestimonialItem, "role" | "text">> = [
  {
    role: "Construction management",
    text: "We managed projects on paper, in spreadsheets and from memory. Today every stage of the project has an owner, a deadline and a status I can see on my phone. I stopped visiting job sites to find problems. The system warns me first.",
  },
  {
    role: "Tax recovery cases",
    text: "Building our tax cases was our bottleneck: manual accounting calculations and delays nobody could trace back to the source. Today the process runs automated end to end, and any operational failure shows up right away, not at the end of the month.",
  },
  {
    role: "Accounting reconciliation",
    text: "Accounting reconciliation used to eat up days of the whole team's time every month. Today the AI classifies the ledger on its own and the systems talk to each other, with no double data entry. The time we saved became capacity to serve more clients.",
  },
  {
    role: "Business Case",
    text: "I built the business case thinking it would be hard to prove the return. Five months into the project, R$191K in documented ROI. It wasn't an estimate; it was a number I presented to the board.",
  },
  {
    role: "Real estate",
    text: "Real estate is red tape on top of red tape. Today what used to take days gets done the same day. I scaled without hiring anyone, and speed became my sales pitch: clients close with me because things move with me.",
  },
  {
    role: "Tour operator",
    text: "Managing corporate travel was our most critical process: two weeks of work became two hours. And most importantly, the errors are gone. What we used to redo because of manual mistakes now comes out right the first time.",
  },
  {
    role: "Partner",
    text: "What impressed me most wasn't the technology, it was the team. People stopped doing repetitive work and started delivering faster. Operational efficiency went up at least 50% in six months. The same team, producing twice as much.",
  },
  {
    role: "Management",
    text: "The diagnostic was a shock. We did everything manually and I had no visibility into anything. When I saw how much it was costing us in revenue, I understood where to focus. We made structural changes we had been putting off for years.",
  },
  {
    role: "Community",
    text: "This was the project of my life and I was afraid it wouldn't come out the way I imagined. With IAplicada it came out exactly the way I always wanted. Every expectation met in two and a half months. The best decision I've made for my business.",
  },
];

const COPY: LpCopy<typeof COPY_PT_BR> = {
  "pt-br": COPY_PT_BR,
  en: {
    eyebrow: "Results",
    titleA: "More than 50 companies already run",
    titleB: "custom-built systems",
    metrics: [
      {
        value: 50,
        suffix: "+",
        label: "companies running their own system",
        source: "Brazil and abroad",
      },
      {
        prefix: "R$",
        value: 191,
        suffix: "K",
        label: "in documented ROI in 5 months",
        source: "PSA Consultores",
      },
      {
        value: 2,
        suffix: "h",
        label: "for what used to take 2 weeks, their most critical process",
        source: "Turystar",
      },
      {
        prefix: "+",
        value: 50,
        suffix: "%",
        label: "operational efficiency in 6 months",
        source: "PSA Consultores",
      },
    ],
    testimonials: TESTIMONIALS.map((item, i) => ({ ...item, ...EN_TESTIMONIALS[i] })),
    highlights: { 3: "R$191K in ROI", 5: "2 weeks → 2 hours", 6: "+50% efficiency" },
  },
};

/**
 * Resultados: faixa de métricas (números citados pelos clientes), logos e
 * um mural de depoimentos em colunas (masonry): todos visíveis de uma vez,
 * foto pequena, e os que trazem número ganham um selo em destaque.
 * No celular o mural vira uma fileira que desliza para o lado.
 */
export function Testimonials() {
  const c = useLpCopy(COPY);
  const numberLocale = useLpLocale() === "en" ? "en-US" : "pt-BR";

  return (
    <section id="depoimentos" className="lpx-section relative">
      <div className="lpx-glow" aria-hidden style={{ top: 120, left: -260 }} />

      <div className="lpx-wrap relative">
        <SectionHead
          eyebrow={c.eyebrow}
          title={
            <>
              {c.titleA} <em>{c.titleB}</em>
            </>
          }
        />

        <Reveal delay={0.1}>
          <dl className="lpx-metrics mt-12 lg:mt-16">
            {c.metrics.map((m) => (
              <div key={m.label} className="lpx-metric">
                <dt className="sr-only">{m.label}</dt>
                <dd>
                  <span className="lpx-metric-value">
                    {m.prefix}
                    <CountUp value={m.value} locale={numberLocale} />
                    {m.suffix}
                  </span>
                  <span className="mt-2 block text-[14px] leading-snug text-[var(--lpx-muted)]">
                    {m.label}
                  </span>
                  <span className="lpx-mono mt-3 block text-[10.5px] uppercase tracking-[0.14em] text-[var(--lpx-faint)]">
                    {m.source}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div className="mt-10 lg:mt-12">
          <ClientLogos bare fadeColor="var(--lpx-bg)" />
        </div>

        <Reveal delay={0.1}>
          <div className="lpx-wall mt-10 lg:mt-12">
            {c.testimonials.map((item, i) => {
              const highlight = c.highlights[i];
              return (
                <div key={item.name + i} className="lpx-wall-item">
                  <figure
                    className={`lpx-card lpx-card--hover lpx-spot lpx-tcard${highlight ? " lpx-tcard--hl" : ""}`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      {highlight ? (
                        <span className="lpx-tcard-badge">{highlight}</span>
                      ) : (
                        <Quote
                          className="h-5 w-5 text-[var(--lpx-lime)]"
                          strokeWidth={1.8}
                          aria-hidden
                        />
                      )}
                      <span className="lpx-mono text-[10.5px] uppercase tracking-[0.14em] text-[var(--lpx-faint)]">
                        {item.company}
                      </span>
                    </div>
                    <blockquote className="mt-5 text-[15px] leading-[1.65] text-[#d9dccf]">
                      {item.text}
                    </blockquote>
                    <figcaption className="mt-6 flex items-center gap-3 border-t border-white/[0.07] pt-5">
                      <img
                        src={item.photoSrc}
                        alt={item.name}
                        loading="lazy"
                        decoding="async"
                        className="h-10 w-10 shrink-0 rounded-[12px] object-cover"
                      />
                      <span className="min-w-0">
                        <span className="block text-[14.5px] font-semibold text-[var(--lpx-text)]">
                          {item.name}
                        </span>
                        <span className="block truncate text-[12.5px] text-[var(--lpx-muted)]">
                          {item.role} · {item.company}
                        </span>
                      </span>
                    </figcaption>
                  </figure>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
