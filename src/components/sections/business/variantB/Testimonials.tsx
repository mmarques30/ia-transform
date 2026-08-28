import { useState, useEffect, useCallback } from "react";
import { Reveal } from "@/components/Reveal";
import { ClientLogos } from "@/components/sections/ClientLogos";

interface TestimonialItem {
  name: string;
  role: string;
  text: string;
  photoSrc: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    name: "Mariana",
    role: "Quadra Arquitetura · Gerenciamento de obras",
    photoSrc: "/clients/mariana-quadra.png",
    text: "A gente gerenciava obra no papel, na planilha e na memória. Hoje cada etapa da obra tem dono, prazo e status que eu vejo do celular. Parei de visitar canteiro pra descobrir problema. O sistema me avisa antes.",
  },
  {
    name: "Alcir",
    role: "Focus Fintax · Teses tributárias",
    photoSrc: "/clients/alcir.jpg",
    text: "A geração de teses era nosso gargalo: calculadora contábil manual, atraso que ninguém enxergava a origem. Hoje o processo roda automatizado de ponta a ponta e qualquer falha operacional aparece na hora, não no fim do mês.",
  },
  {
    name: "Bruno",
    role: "LCR · Conciliação contábil",
    photoSrc: "/clients/bruno-lcr.jpg",
    text: "A conciliação contábil consumia dias do time todo mês. Hoje a IA classifica o razão sozinha e os sistemas conversam entre si, sem digitação dupla. O tempo que a gente economizou virou capacidade de atender mais clientes.",
  },
  {
    name: "Patrícia",
    role: "PSA Consultores · Business Case",
    photoSrc: "/clients/patricia.jpg",
    text: "Eu construí o business case achando que ia ser difícil provar o retorno. Em cinco meses de projeto, R$ 191 mil de ROI documentado. Não foi estimativa, foi número que eu apresentei pra diretoria.",
  },
  {
    name: "Julie",
    role: "Tijolo Capital · Imobiliário",
    photoSrc: "/clients/julie.png",
    text: "Processo imobiliário é burocracia em cima de burocracia. Hoje o que travava dias sai no mesmo dia. Escalei sem contratar ninguém e a agilidade virou meu argumento de venda: o cliente fecha comigo porque comigo anda.",
  },
  {
    name: "Karen",
    role: "Turystar · Operadora de Turismo",
    photoSrc: "/clients/karen.jpg",
    text: "O gerenciamento das viagens corporativas era nosso processo mais crítico: duas semanas de trabalho viraram duas horas. E o mais importante: acabaram os erros. O que a gente refazia por falha manual, hoje sai certo de primeira.",
  },
  {
    name: "Carlos Prado",
    role: "Sócio da PSA Consultores",
    photoSrc: "/clients/carlos-prado.jpg",
    text: "O que mais me impressionou não foi a tecnologia, foi o time. As pessoas pararam de fazer trabalho repetitivo e começaram a entregar mais rápido. Eficiência operacional subiu pelo menos 50% em seis meses. O mesmo time, produzindo o dobro.",
  },
  {
    name: "Juliana",
    role: "B&Z",
    photoSrc: "/clients/juliana-biz.png",
    text: "O diagnóstico foi um choque. A gente fazia tudo manual e eu não tinha visibilidade de nada. Quando vi quanto isso estava custando em receita, entendi onde focar. Fizemos mudanças estruturais que a gente adiava há anos.",
  },
  {
    name: "Uiara",
    role: "Uiara Intimates · Comunidade",
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

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [paused, next]);

  return (
    <section id="depoimentos" className="section-veil py-[80px] lg:py-[110px] overflow-hidden">
      <div className="container-page">
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
      </div>

      <ClientLogos transparent />

      <div className="container-page">
        <Reveal delay={0.1}>
          <div
            className="testimonial-carousel"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="testimonial-quote-area">
              {TESTIMONIALS.map((t, i) => (
                <p
                  key={i}
                  className={`testimonial-quote ${active === i ? "testimonial-quote-active" : ""}`}
                >
                  &ldquo;{t.text}&rdquo;
                </p>
              ))}
            </div>

            <div className="testimonial-author-row">
              <div className="testimonial-avatars">
                {TESTIMONIALS.map((t, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setActive(i);
                      setPaused(true);
                    }}
                    className={`testimonial-avatar ${active === i ? "testimonial-avatar-active" : ""}`}
                  >
                    <img
                      src={t.photoSrc}
                      alt={t.name}
                      loading="lazy"
                      decoding="async"
                    />
                  </button>
                ))}
              </div>

              <div className="testimonial-divider" />

              <div className="testimonial-info-area">
                {TESTIMONIALS.map((t, i) => (
                  <div
                    key={i}
                    className={`testimonial-info ${active === i ? "testimonial-info-active" : ""}`}
                  >
                    <span className="testimonial-info-name">{t.name}</span>
                    <span className="testimonial-info-role">{t.role}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
