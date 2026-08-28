import { useState, useEffect, useCallback } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { ClientLogos } from "@/components/sections/ClientLogos";

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

export function Testimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setActive((c) => (c + 1) % TESTIMONIALS.length);
  }, []);

  const prev = useCallback(() => {
    setActive((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 7000);
    return () => clearInterval(id);
  }, [paused, next]);

  const t = TESTIMONIALS[active];

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
                Mais de 50 empresas já possuem{" "}
                <span className="text-foreground">sistemas personalizados</span>
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
                  {TESTIMONIALS.map((item, i) => (
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
                  {TESTIMONIALS.map((item, i) => (
                    <blockquote
                      key={i}
                      className={`tsplit-quote ${active === i ? "tsplit-quote-active" : ""}`}
                    >
                      {item.text}
                    </blockquote>
                  ))}
                </div>

                <div className="tsplit-author-area">
                  {TESTIMONIALS.map((item, i) => (
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
                    aria-label="Anterior"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => { next(); setPaused(true); }}
                    className="tsplit-nav-btn"
                    aria-label="Próximo"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  <div className="tsplit-dots">
                    {TESTIMONIALS.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => { setActive(i); setPaused(true); }}
                        className={`tsplit-dot ${active === i ? "tsplit-dot-active" : ""}`}
                        aria-label={`Depoimento ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="tsplit-photo-col">
                {TESTIMONIALS.map((item, i) => (
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
