import { Reveal } from "@/components/Reveal";

/**
 * Testimonials (LP-B) — 3 colunas verticais com scroll infinito
 * seguindo o padrão 21st.dev/testimonials-columns-1.
 *
 * Cards com foto real do cliente quando `photoSrc` está presente,
 * fallback pra avatar circular de iniciais quando não. Trechos-chave
 * do depoimento vão em <HL> (underline lime).
 *
 * Distribuição por coluna: cards intercalados de forma que empresas
 * iguais (2 da PSA: Patrícia + Carlos Prado + Ricardo) fiquem em
 * colunas diferentes pra evitar adjacência.
 */

interface TestimonialItem {
  initials: string;
  name: string;
  role: string;
  text: React.ReactNode;
  photoSrc?: string;
}

const HL = ({ children }: { children: React.ReactNode }) => (
  <u
    style={{
      textDecoration: "underline",
      textDecorationColor: "#d5e95a",
      textUnderlineOffset: 3,
    }}
  >
    {children}
  </u>
);

/**
 * Coluna 1: Mariana Quadra, Ricardo PSA (velho, sem foto), Alcir Foco
 * Syntex, Bruno LCR.
 */
const COL_1: TestimonialItem[] = [
  {
    initials: "MQ",
    name: "Mariana",
    role: "Quadra Arquitetura · Gerenciamento de obras",
    photoSrc: "/clients/mariana-quadra.png",
    text: (
      <>
        A gente gerenciava obra no papel, na planilha e na memória. Hoje cada etapa da obra tem
        dono, prazo e status que eu vejo do celular.{" "}
        <HL>Parei de visitar canteiro pra descobrir problema</HL>. O sistema me avisa antes.
      </>
    ),
  },
  {
    initials: "RS",
    name: "Ricardo Salvatti",
    role: "PSA Consultores",
    text: (
      <>
        A operação da PSA rodava em ferramentas separadas. Com o sistema de acompanhamento,{" "}
        <HL>110+ profissionais</HL> num único painel. Reunião virou dado, não achismo.
      </>
    ),
  },
  {
    initials: "AL",
    name: "Alcir",
    role: "Foco Syntex · Teses tributárias",
    photoSrc: "/clients/alcir.jpg",
    text: (
      <>
        A geração de teses era nosso gargalo: calculadora contábil manual, atraso que ninguém
        enxergava a origem. Hoje <HL>o processo roda automatizado de ponta a ponta</HL> e qualquer
        falha operacional aparece na hora, não no fim do mês.
      </>
    ),
  },
  {
    initials: "BR",
    name: "Bruno",
    role: "LCR · Conciliação contábil",
    photoSrc: "/clients/bruno-lcr.jpg",
    text: (
      <>
        A conciliação contábil consumia dias do time todo mês. Hoje a IA{" "}
        <HL>classifica o razão sozinha</HL> e os sistemas conversam entre si, sem digitação dupla. O
        tempo que a gente economizou virou capacidade de atender mais clientes.
      </>
    ),
  },
];

/**
 * Coluna 2: Patrícia PSA, Camila CB Move (velho), Juliana Jmob, Karen
 * Turystar.
 */
const COL_2: TestimonialItem[] = [
  {
    initials: "PT",
    name: "Patrícia",
    role: "PSA Consultores · Business Case",
    photoSrc: "/clients/patricia.jpg",
    text: (
      <>
        Eu construí o business case achando que ia ser difícil provar o retorno. Em cinco meses de
        projeto, <HL>R$ 191 mil de ROI documentado</HL>. Não foi estimativa, foi número que eu
        apresentei pra diretoria.
      </>
    ),
  },
  {
    initials: "CB",
    name: "Camila Brito",
    role: "CB Move",
    text: (
      <>
        Passamos de 30 pra <HL>100+ pacientes sem contratar admin</HL>. Sessão gravada, IA estrutura
        o SOAP, fisio revisa e assina. Escala sem virar fábrica.
      </>
    ),
  },
  {
    initials: "JJ",
    name: "Juliana",
    role: "Jmob · Imobiliário",
    photoSrc: "/clients/juliana-jmob.png",
    text: (
      <>
        Processo imobiliário é burocracia em cima de burocracia. Hoje o que travava dias sai no
        mesmo dia. <HL>Escalei sem contratar ninguém</HL> e a agilidade virou meu argumento de
        venda: o cliente fecha comigo porque comigo anda.
      </>
    ),
  },
  {
    initials: "KA",
    name: "Karen",
    role: "Turystar · Operadora de Turismo",
    photoSrc: "/clients/karen.jpg",
    text: (
      <>
        O gerenciamento das viagens corporativas era nosso processo mais crítico:{" "}
        <HL>duas semanas de trabalho viraram duas horas</HL>. E o mais importante: acabaram os
        erros. O que a gente refazia por falha manual, hoje sai certo de primeira.
      </>
    ),
  },
];

/**
 * Coluna 3: Carlos Prado PSA, Focus Fintax (velho), Juliana BIZ,
 * Uiara Intimates, André Zembruski (velho, sem foto).
 */
const COL_3: TestimonialItem[] = [
  {
    initials: "CP",
    name: "Carlos Prado",
    role: "Sócio da PSA Consultores",
    photoSrc: "/clients/carlos-prado.jpg",
    text: (
      <>
        O que mais me impressionou não foi a tecnologia, foi o time. As pessoas pararam de fazer
        trabalho repetitivo e começaram a entregar mais rápido.{" "}
        <HL>Eficiência operacional subiu pelo menos 50% em seis meses</HL>. O mesmo time, produzindo
        o dobro.
      </>
    ),
  },
  {
    initials: "FF",
    name: "Focus Fintax",
    role: "Compensação Tributária",
    text: (
      <>
        <HL>5 processos automatizados</HL> em 60 dias. Time menor, mais entrega, mais margem. E o
        painel roda no nosso domínio, com a nossa cara.
      </>
    ),
  },
  {
    initials: "JB",
    name: "Juliana",
    role: "BIZ",
    photoSrc: "/clients/juliana-biz.png",
    text: (
      <>
        O diagnóstico foi um choque. A gente fazia tudo manual e eu não tinha visibilidade de nada.
        Quando vi <HL>quanto isso estava custando em receita</HL>, entendi onde focar. Fizemos
        mudanças estruturais que a gente adiava há anos.
      </>
    ),
  },
  {
    initials: "UI",
    name: "Uiara",
    role: "Uiara Intimates · Comunidade",
    photoSrc: "/clients/uiara.png",
    text: (
      <>
        Esse era o projeto da minha vida e eu tinha medo de não sair do papel do jeito que eu
        imaginava. Com a IAplicada saiu exatamente como eu sempre quis.{" "}
        <HL>Todas as expectativas atingidas em dois meses e meio</HL>. Melhor decisão que eu tomei
        pro meu negócio.
      </>
    ),
  },
  {
    initials: "AZ",
    name: "André Zembruski",
    role: "Borges & Zembruski",
    text: (
      <>
        R$5k/mês economizados de SDR humano. O sistema assumiu a cadência de follow-up.{" "}
        <HL>Receita que ficava na mesa entrou.</HL>
      </>
    ),
  },
];

export function Testimonials() {
  return (
    <section id="depoimentos" className="section-veil py-[80px] lg:py-[110px] overflow-hidden">
      <div className="container-page">
        <div className="max-w-[860px] mx-auto text-center">
          <Reveal>
            <h2
              className="font-extrabold text-[28px] sm:text-[36px] lg:text-[42px] leading-[1.08] tracking-[-0.02em] uppercase"
              style={{ textWrap: "balance", color: "var(--color-primary)" }}
            >
              Quem já saiu <span className="text-foreground">do operacional</span>
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-5 text-[15.5px] text-sage leading-[1.6] max-w-[560px] mx-auto">
              Empresas de{" "}
              <strong className="text-foreground font-bold">serviço, produto e indústria</strong>.
              Todas com o mesmo padrão de problema. Todas com o mesmo resultado.
            </p>
          </Reveal>
        </div>

        <div
          className="mt-14 flex justify-center gap-6 mx-auto max-w-[1120px]"
          style={{
            maxHeight: 680,
            overflow: "hidden",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
          }}
        >
          <TestimonialsColumn testimonials={COL_1} duration={26} />
          <TestimonialsColumn testimonials={COL_2} duration={32} className="hidden md:block" />
          <TestimonialsColumn testimonials={COL_3} duration={29} className="hidden lg:block" />
        </div>
      </div>
    </section>
  );
}

function TestimonialsColumn(props: {
  className?: string;
  testimonials: TestimonialItem[];
  duration?: number;
}) {
  return (
    <div className={props.className}>
      <div
        className="flex flex-col gap-6 pb-6 testimonial-col-track"
        style={{ animationDuration: `${props.duration || 15}s` }}
      >
        {[...new Array(2)].map((_, blockIndex) => (
          <div key={blockIndex} className="flex flex-col gap-6">
            {props.testimonials.map((t, i) => (
              <TestimonialCard key={i} item={t} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function TestimonialCard({ item }: { item: TestimonialItem }) {
  return (
    <div
      className="p-7 lg:p-8 rounded-3xl max-w-[320px] w-full"
      style={{
        background: "#0f1109",
        border: "1px solid rgba(200,224,64,0.15)",
        boxShadow: "0 20px 40px -20px rgba(0,0,0,0.6), 0 0 0 1px rgba(200,224,64,0.04)",
      }}
    >
      <div className="text-[14px] text-foreground leading-[1.6]">{item.text}</div>
      <div className="mt-6 flex items-center gap-3">
        {item.photoSrc ? (
          <img
            src={item.photoSrc}
            alt={item.name}
            width={40}
            height={40}
            loading="lazy"
            decoding="async"
            className="shrink-0 h-10 w-10 rounded-full object-cover"
            style={{ objectPosition: "center 20%" }}
          />
        ) : (
          <span
            className="shrink-0 h-10 w-10 rounded-full flex items-center justify-center text-[11.5px] font-bold"
            style={{
              background: "linear-gradient(135deg, #4c5340, #1a1e14)",
              color: "var(--color-primary)",
              fontFamily: '"JetBrains Mono", ui-monospace, Menlo, monospace',
            }}
          >
            {item.initials}
          </span>
        )}
        <div className="flex flex-col">
          <div className="font-medium tracking-tight leading-5 text-[13.5px] text-foreground">
            {item.name}
          </div>
          <div className="leading-5 opacity-60 tracking-tight text-[12px] text-foreground">
            {item.role}
          </div>
        </div>
      </div>
    </div>
  );
}
