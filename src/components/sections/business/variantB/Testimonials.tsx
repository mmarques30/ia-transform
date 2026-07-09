import { Reveal } from "@/components/Reveal";

/**
 * Testimonials (LP-B) — 3 colunas verticais com scroll infinito em
 * velocidades diferentes, no formato do padrão 21st.dev/testimonials-
 * columns-1 (adaptado do Framer Motion pra CSS keyframe puro).
 *
 * Cards mantêm o visual dark IAplicada — bg #0f1109 + moldura sutil,
 * lime nos números-chave via underline, avatar em iniciais. O que
 * muda é a organização: em vez de collage overlapping bagunçado
 * (versão anterior tinha sobreposição e não caberia bem em qualquer
 * viewport), agora é 3 colunas independentes que rolam sozinhas.
 *
 * Speeds bem mais lentas que a referência (60-70s vs 15-19s) — a
 * ideia é que o usuário consiga ler enquanto rola, não que passe
 * como um ticker.
 *
 * Breakpoints:
 *  - mobile   : 1 coluna
 *  - md       : 2 colunas
 *  - lg       : 3 colunas
 *
 * Loop infinito: cada coluna duplica o array de items internamente e
 * o track anima translateY 0 → -50%. Como o segundo bloco é cópia
 * exata do primeiro, o "salto" no fim do keyframe é imperceptível.
 */

interface TestimonialItem {
  initials: string;
  author: string;
  company: string;
  body: React.ReactNode;
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

/** Distribuição dos 6 clientes em 3 colunas (2 por coluna). */
const COL_1: TestimonialItem[] = [
  {
    initials: "RS",
    author: "Ricardo Salvatti",
    company: "PSA",
    body: (
      <>
        A operação da PSA rodava em ferramentas separadas. Com o sistema de acompanhamento,{" "}
        <HL>110+ profissionais</HL> num único painel. Reunião virou dado, não achismo.
      </>
    ),
  },
  {
    initials: "FF",
    author: "Focus Fintax",
    company: "Compensação Tributária",
    body: (
      <>
        <HL>5 processos automatizados</HL> em 60 dias. Time menor, mais entrega, mais margem. E o
        painel roda no nosso domínio, com a nossa cara.
      </>
    ),
  },
];

const COL_2: TestimonialItem[] = [
  {
    initials: "CB",
    author: "Camila Brito",
    company: "CB Move",
    body: (
      <>
        Passamos de 30 pra <HL>100+ pacientes sem contratar admin</HL>. Sessão gravada, IA estrutura
        o SOAP, fisio revisa e assina. Escala sem virar fábrica.
      </>
    ),
  },
  {
    initials: "TS",
    author: "Turystar",
    company: "Operadora",
    body: (
      <>
        3 sistemas integrados, <HL>zero retrabalho</HL> entre setores. Fechamento que travava 5 dias
        virou tempo real.
      </>
    ),
  },
];

const COL_3: TestimonialItem[] = [
  {
    initials: "AZ",
    author: "André Zembruski",
    company: "Borges",
    body: (
      <>
        R$5k/mês economizados de SDR humano. O sistema assumiu a cadência de follow-up.{" "}
        <HL>Receita que ficava na mesa entrou.</HL>
      </>
    ),
  },
  {
    initials: "QA",
    author: "Quadra Arquitetura",
    company: "Escritório Corporativo",
    body: (
      <>
        Operação manual pra digital em <HL>10 semanas</HL>. Nunca mais precisei "lembrar" do que
        estava faltando — o sistema lembra.
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
              <strong className="text-foreground font-bold">serviço, produto e indústria</strong> —
              todas com o mesmo padrão de problema. Todas com o mesmo resultado.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div
            className="mt-14 flex justify-center gap-4 lg:gap-6 mx-auto max-w-[1120px]"
            style={{
              maxHeight: 660,
              overflow: "hidden",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
              maskImage:
                "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
            }}
          >
            <TestimonialColumn items={COL_1} duration={60} />
            <TestimonialColumn items={COL_2} duration={70} className="hidden md:flex" />
            <TestimonialColumn items={COL_3} duration={65} className="hidden lg:flex" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function TestimonialColumn({
  items,
  duration,
  className = "",
}: {
  items: TestimonialItem[];
  duration: number;
  className?: string;
}) {
  const doubled = [...items, ...items];
  return (
    <div className={`flex-1 max-w-[360px] ${className}`}>
      <div
        className="flex flex-col gap-5 testimonial-col-track"
        style={{ animationDuration: `${duration}s` }}
      >
        {doubled.map((item, i) => (
          <TestimonialCard key={i} item={item} />
        ))}
      </div>
    </div>
  );
}

function TestimonialCard({ item }: { item: TestimonialItem }) {
  return (
    <div
      className="rounded-xl p-4 flex gap-3 items-start"
      style={{
        background: "#0f1109",
        border: "1px solid #262a1c",
        boxShadow: "0 20px 40px -20px rgba(0,0,0,0.5)",
      }}
    >
      <span
        className="shrink-0 h-[32px] w-[32px] rounded-full flex items-center justify-center text-[10.5px] font-bold"
        style={{
          background: "linear-gradient(135deg, #4c5340, #1a1e14)",
          color: "var(--color-primary)",
          fontFamily: '"JetBrains Mono", ui-monospace, Menlo, monospace',
        }}
      >
        {item.initials}
      </span>
      <div className="text-[13.5px] text-foreground leading-[1.55]">
        <b
          className="block mb-1 text-[11.5px]"
          style={{ color: "var(--color-primary)", fontWeight: 700 }}
        >
          {item.author} · {item.company}
        </b>
        {item.body}
      </div>
    </div>
  );
}
