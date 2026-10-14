import { useState, useEffect, useCallback } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { useLpCopy, type LpCopy } from "@/lib/lpLocale";

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

const COPY_PT_BR = {
  titleA: "Mais de 50 empresas já possuem",
  titleB: "sistemas personalizados",
  testimonials: TESTIMONIALS,
  prev: "Anterior",
  next: "Próximo",
  dot: (n: number) => `Depoimento ${n}`,
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
    titleA: "More than 50 companies already run",
    titleB: "custom-built systems",
    testimonials: TESTIMONIALS.map((item, i) => ({ ...item, ...EN_TESTIMONIALS[i] })),
    prev: "Previous",
    next: "Next",
    dot: (n: number) => `Testimonial ${n}`,
  },
};

export function Testimonials() {
  const c = useLpCopy(COPY);
  const testimonials = c.testimonials;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setActive((c) => (c + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setActive((c) => (c - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 7000);
    return () => clearInterval(id);
  }, [paused, next]);

  const t = testimonials[active];

  return (
    <section id="depoimentos" className="section-veil py-[80px] lg:py-[110px] overflow-hidden">
      <div className="container-page">
        <div className="tsplit-card">
          <div className="max-w-[860px] mx-auto text-center">
            <Reveal>
              <h2
                className="font-extrabold text-[28px] sm:text-[36px] lg:text-[42px] leading-[1.08] tracking-[-0.02em] uppercase"
                style={{ textWrap: "balance", color: "var(--color-primary)" }}
              >
                {c.titleA}{" "}
                <span className="text-foreground">{c.titleB}</span>
              </h2>
            </Reveal>
          </div>

          <div className="mt-8 lg:mt-10">
            <ClientLogos bare fadeColor="var(--tsplit-card-bg)" />
          </div>

          <Reveal delay={0.1}>
            <div
              className="tsplit"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <div className="tsplit-content">
                <div className="tsplit-tag-area">
                  {testimonials.map((item, i) => (
                    <span
                      key={i}
                      className={`tsplit-tag ${active === i ? "tsplit-tag-active" : ""}`}
                    >
                      <span className="tsplit-tag-line" />
                      {item.company}
                    </span>
                  ))}
                </div>

                <div className="tsplit-quote-area">
                  {testimonials.map((item, i) => (
                    <blockquote
                      key={i}
                      className={`tsplit-quote ${active === i ? "tsplit-quote-active" : ""}`}
                    >
                      {item.text}
                    </blockquote>
                  ))}
                </div>

                <div className="tsplit-author-area">
                  {testimonials.map((item, i) => (
                    <div
                      key={i}
                      className={`tsplit-author ${active === i ? "tsplit-author-active" : ""}`}
                    >
                      <span className="tsplit-author-line" />
                      <div>
                        <p className="tsplit-author-name">{item.name}</p>
                        <p className="tsplit-author-role">{item.role}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="tsplit-nav">
                  <button
                    type="button"
                    onClick={() => { prev(); setPaused(true); }}
                    className="tsplit-nav-btn"
                    aria-label={c.prev}
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => { next(); setPaused(true); }}
                    className="tsplit-nav-btn"
                    aria-label={c.next}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  <div className="tsplit-dots">
                    {testimonials.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => { setActive(i); setPaused(true); }}
                        className={`tsplit-dot ${active === i ? "tsplit-dot-active" : ""}`}
                        aria-label={c.dot(i + 1)}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="tsplit-photo-col">
                {testimonials.map((item, i) => (
                  <div
                    key={i}
                    className={`tsplit-photo ${active === i ? "tsplit-photo-active" : ""}`}
                  >
                    <img
                      src={item.photoSrc}
                      alt={item.name}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
