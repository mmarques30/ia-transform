import { Reveal } from "@/components/Reveal";

/**
 * Testimonials (LP-B) — 3 colunas verticais com scroll infinito,
 * seguindo o padrão 21st.dev/testimonials-columns-1 que a Mari passou
 * como referência.
 *
 * Speeds MATCH da referência (15s / 19s / 17s) — a versão anterior
 * usava 60-70s e o feedback foi "não dá pra perceber que tem
 * animação". Agora o scroll é visível de cara.
 *
 * Estrutura dos cards MATCH da referência:
 *  - padding grande (p-8), border radius 3xl
 *  - texto do depoimento vem primeiro
 *  - avatar + nome + role embaixo, alinhados horizontalmente
 *  - max-width 320px fixo
 *  - border sutil + sombra com tint primary
 *
 * Implementação: CSS keyframe puro (translateY 0 → -50%) em vez de
 * framer-motion. A referência 21st.dev usa Motion, mas trazer o
 * pacote inteiro pro chunk /businessv2 subia +284kB. CSS puro entrega
 * o mesmo efeito visual com zero bundle cost.
 *
 * Loop infinito: cada coluna duplica o array de items no JSX
 * (`.fill(0).map(() => testimonials)`), e o track anima translateY
 * -50%. O segundo bloco é cópia exata do primeiro, então quando o
 * keyframe reseta em 100%, visualmente está no mesmo ponto (sem
 * "salto" perceptível).
 */

interface TestimonialItem {
  initials: string;
  name: string;
  role: string;
  text: React.ReactNode;
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

const COL_1: TestimonialItem[] = [
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
];

const COL_2: TestimonialItem[] = [
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
    initials: "TS",
    name: "Turystar",
    role: "Operadora de Turismo",
    text: (
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
    name: "André Zembruski",
    role: "Borges & Zembruski",
    text: (
      <>
        R$5k/mês economizados de SDR humano. O sistema assumiu a cadência de follow-up.{" "}
        <HL>Receita que ficava na mesa entrou.</HL>
      </>
    ),
  },
  {
    initials: "QA",
    name: "Quadra Arquitetura",
    role: "Escritório Corporativo",
    text: (
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
          <TestimonialsColumn testimonials={COL_1} duration={15} />
          <TestimonialsColumn testimonials={COL_2} duration={19} className="hidden md:block" />
          <TestimonialsColumn testimonials={COL_3} duration={17} className="hidden lg:block" />
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
