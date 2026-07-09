import { Reveal } from "@/components/Reveal";

/**
 * Testimonials (LP-B) — colagem de "screenshots" com 6 depoimentos
 * dispostos em ângulo, cada um simulando um card de Insta/WhatsApp/
 * e-mail. Números-chave sublinhados em lime como no Acelerador.
 *
 * Se termos prints reais dos clientes elogiando, troca por
 * <img> real mantendo o formato do card.
 */

interface Testimonial {
  initials: string;
  author: string;
  company: string;
  body: React.ReactNode;
  /** Posição no collage (desktop). Ordem também é a ordem mobile. */
  pos: {
    top?: string;
    left?: string;
    right?: string;
    width: number;
    rotate: number;
  };
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

const ITEMS: Testimonial[] = [
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
    pos: { top: "5%", left: "25%", width: 270, rotate: -3 },
  },
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
    pos: { top: "8%", right: "5%", width: 290, rotate: 2 },
  },
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
    pos: { top: "30%", left: "3%", width: 250, rotate: -2 },
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
    pos: { top: "42%", left: "33%", width: 260, rotate: 1 },
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
    pos: { top: "55%", right: "10%", width: 260, rotate: -2 },
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
    pos: { top: "75%", left: "20%", width: 240, rotate: 3 },
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

        {/* Desktop: collage posicional. Mobile: stack vertical simples. */}
        <div
          className="hidden lg:block relative mt-14 mx-auto max-w-[920px]"
          style={{ height: 620 }}
        >
          {ITEMS.map((t, i) => (
            <Reveal key={t.author} delay={0.1 + i * 0.06}>
              <CollageCard t={t} />
            </Reveal>
          ))}
        </div>

        <div className="lg:hidden mt-10 flex flex-col gap-4 max-w-[420px] mx-auto">
          {ITEMS.map((t, i) => (
            <Reveal key={t.author} delay={0.05 + i * 0.05}>
              <MobileTestimonial t={t} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CollageCard({ t }: { t: Testimonial }) {
  const { pos } = t;
  return (
    <div
      className="absolute rounded-xl p-3.5 flex gap-2.5 items-start"
      style={{
        top: pos.top,
        left: pos.left,
        right: pos.right,
        width: pos.width,
        transform: `rotate(${pos.rotate}deg)`,
        background: "#0f1109",
        boxShadow: "0 30px 50px -20px rgba(0,0,0,0.7)",
      }}
    >
      <TestimonialAvatar initials={t.initials} />
      <div className="text-[12.5px] text-foreground leading-[1.55]">
        <b
          className="block mb-1 text-[11.5px]"
          style={{ color: "var(--color-primary)", fontWeight: 700 }}
        >
          {t.author} · {t.company}
        </b>
        {t.body}
      </div>
    </div>
  );
}

function MobileTestimonial({ t }: { t: Testimonial }) {
  return (
    <div
      className="rounded-xl p-4 flex gap-3 items-start"
      style={{
        background: "#0f1109",
        border: "1px solid #262a1c",
      }}
    >
      <TestimonialAvatar initials={t.initials} />
      <div className="text-[13.5px] text-foreground leading-[1.55]">
        <b
          className="block mb-1 text-[11.5px]"
          style={{ color: "var(--color-primary)", fontWeight: 700 }}
        >
          {t.author} · {t.company}
        </b>
        {t.body}
      </div>
    </div>
  );
}

function TestimonialAvatar({ initials }: { initials: string }) {
  return (
    <span
      className="shrink-0 h-[30px] w-[30px] rounded-full flex items-center justify-center text-[10px] font-bold"
      style={{
        background: "linear-gradient(135deg, #4c5340, #1a1e14)",
        color: "var(--color-primary)",
        fontFamily: '"JetBrains Mono", ui-monospace, Menlo, monospace',
      }}
    >
      {initials}
    </span>
  );
}
