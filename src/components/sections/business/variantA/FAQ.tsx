import { useState } from "react";
import { Plus } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { CtaButton } from "@/components/lpx/CtaButton";
import { useLpCopy, type LpCopy } from "@/lib/lpLocale";
import { jsonLd } from "@/lib/structuredData";

/** As mesmas perguntas em schema.org (FAQPage): IAs e buscadores extraem a resposta direto. */
function faqJsonLd(items: { q: string; a: string }[]): string {
  return jsonLd({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a.replace(/\n\n/g, " ") },
    })),
  });
}

const FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: "O que a IAplicada faz, exatamente?",
    a: "Construímos software com inteligência artificial sob medida para automatizar a operação do negócio. Não é licença de ferramenta pronta e não é consultoria que entrega apresentação.\n\nMapeamos os processos, identificamos onde a empresa perde tempo e dinheiro, e entregamos um sistema que já funciona dentro da operação. Com uma diferença: a IA embutida aprende com cada uso. O que o time corrige vira padrão e volta sugerido. Quanto mais o sistema é usado, menos precisa ser preenchido.",
  },
  {
    q: "Como implementar IA na minha empresa?",
    a: "Começa por um diagnóstico gratuito: mapeamos os processos da operação, identificamos onde a empresa perde tempo e dinheiro e montamos o ranking de gargalos.\n\nDepois construímos o sistema pelo Método APLICA, começando pelo que gera resultado primeiro: MVP funcional em até 30 dias e o sistema completo em até 90 dias, integrado ao que a empresa já usa (planilha, CRM, ERP, WhatsApp, e-mail). Sem jogar fora o que já funciona.",
  },
  {
    q: "Em quanto tempo fica pronto e quanto custa?",
    a: "Em até 30 dias o MVP funcional. Projetos maiores são divididos por módulos, priorizando o que gera resultado primeiro. Cada entrega é funcional, não uma promessa de próxima fase.\n\nO investimento é calculado por escopo. Depois do diagnóstico, você recebe uma proposta com os módulos, a ordem de entrega e o valor correspondente. A condição comercial é preservada durante o período de avaliação.",
  },
  {
    q: "Qual a diferença entre a IAplicada e um ERP ou consultoria tradicional?",
    a: "ERP força a empresa a se adaptar ao software. A IAplicada constrói o software para se adaptar à empresa.\n\nConsultoria entrega diagnóstico e vai embora. A IAplicada foi fundada por Mariana Marques, com 11 anos como executiva em Mercado Livre, Suzano e AngloGold, liderando transformação digital na América Latina. O que entregamos não é o que um consultor aprendeu em livro. É o que funcionou em empresas grandes, agora adaptado para o tamanho e o processo de quem está crescendo.\n\nVocê recebe sistema rodando, não slide.",
  },
  {
    q: "Para que tipo de empresa a IAplicada atende?",
    a: "Empresas que já faturam, têm operação rodando e precisam escalar sem multiplicar o time.\n\nO critério não é setor. É o problema: processo manual que consome hora de gente cara, dado espalhado em planilha e WhatsApp, decisão que trava porque depende de uma pessoa só, crescimento de receita que não acompanha o crescimento da operação.\n\nE especialmente quem quer recuperar tempo. Tocar a empresa de onde quiser, sem precisar estar presente para cada decisão. O sistema faz o operacional rodar. Você cuida do que só você pode fazer.",
  },
  {
    q: "Vale mais a pena contratar mais gente ou automatizar com IA?",
    a: "Faça a conta: um time de 10 pessoas que gasta 2 horas por dia em trabalho manual repetitivo perde 400 horas por mês, o equivalente a 2 pessoas em tempo integral só para manter o que deveria ser automático. Contratar aumenta esse custo fixo; automatizar devolve essas horas para o time.\n\nNos nossos clientes, o mesmo time passou a produzir mais: na PSA Consultores, a eficiência operacional subiu pelo menos 50% em seis meses, com R$ 191 mil de ROI documentado em cinco meses de projeto.",
  },
  {
    q: "O diagnóstico é realmente gratuito? E se eu já tiver sistemas?",
    a: "Sim. Sem custo e sem compromisso de contratação. Mesmo que você não feche, leva o mapa de processos, o ranking de gargalos e o playbook do trimestre. O material fica com você.\n\nSe já usa outros sistemas, o que construímos se integra ao que você já tem: planilha, CRM, ERP, WhatsApp, e-mail. Não jogamos fora o que funciona. Automatizamos o que trava.",
  },
];

const COPY_PT_BR = {
  eyebrow: "Perguntas frequentes",
  titleA: "Tire suas",
  titleB: "dúvidas",
  sub: "Não achou o que procurava? No diagnóstico gratuito a gente responde olhando para a sua operação.",
  cta: "Quero meu diagnóstico",
  items: FAQ_ITEMS,
};

const COPY: LpCopy<typeof COPY_PT_BR> = {
  "pt-br": COPY_PT_BR,
  en: {
    eyebrow: "FAQ",
    titleA: "Frequently asked",
    titleB: "questions",
    sub: "Didn't find what you were looking for? In the free diagnostic we answer by looking at your own operation.",
    cta: "Request my diagnostic",
    items: [
      {
        q: "What exactly does IAplicada do?",
        a: "We build custom AI-powered software that automates how your business operates. It's not an off-the-shelf tool license, and it's not consulting that ends with a slide deck.\n\nWe map your processes, find where the company is losing time and money, and deliver a system that already works inside your operations. With one difference: the built-in AI learns from every use. What your team corrects becomes the standard and comes back as a suggestion. The more the system is used, the less it needs to be filled in.",
      },
      {
        q: "How do I implement AI in my company?",
        a: "It starts with a free diagnostic: we map your operational processes, find where the company is losing time and money, and build a ranking of bottlenecks.\n\nThen we build the system with the APLICA Method, starting with what drives results first: a working MVP in up to 30 days and the complete system in up to 90 days, integrated with the tools the company already uses (spreadsheets, CRM, ERP, email, messaging apps). Without throwing away what already works.",
      },
      {
        q: "How long does it take, and how much does it cost?",
        a: "A working MVP in up to 30 days. Larger projects are split into modules, prioritizing what drives results first. Every delivery works on its own; it's not a promise for the next phase.\n\nPricing is based on scope. After the diagnostic, you get a proposal with the modules, the delivery order and the corresponding price. The commercial terms are held for the evaluation period.",
      },
      {
        q: "How is IAplicada different from an ERP or a traditional consultancy?",
        a: "An ERP forces the company to adapt to the software. IAplicada builds the software to adapt to the company.\n\nConsultancies hand over a diagnosis and leave. IAplicada was founded by Mariana Marques, who spent 11 years as an executive at Mercado Libre, Suzano and AngloGold, leading digital transformation across Latin America. What we deliver isn't what a consultant learned from a book. It's what worked at large companies, now adapted to the size and processes of companies that are growing.\n\nYou get a running system, not slides.",
      },
      {
        q: "What kind of companies does IAplicada work with?",
        a: "Companies that already have revenue, have operations running, and need to scale without multiplying headcount.\n\nThe criterion isn't the industry. It's the problem: manual processes eating up hours of expensive people, data scattered across spreadsheets and chat apps, decisions that stall because they depend on a single person, revenue growth that operations can't keep up with.\n\nAnd especially anyone who wants their time back. Run the company from wherever you want, without having to be there for every decision. The system keeps operations running. You focus on what only you can do.",
      },
      {
        q: "Is it better to hire more people or automate with AI?",
        a: "Do the math: a team of 10 people spending 2 hours a day on repetitive manual work loses 400 hours a month, the equivalent of 2 full-time people just to keep up what should be automatic. Hiring adds to that fixed cost; automating gives those hours back to the team.\n\nWith our clients, the same team started producing more: at PSA Consultores, operational efficiency went up at least 50% in six months, with R$191K in documented ROI five months into the project.",
      },
      {
        q: "Is the diagnostic really free? What if I already have systems in place?",
        a: "Yes. No cost and no commitment to hire us. Even if you don't move forward, you keep the process map, the bottleneck ranking and the quarterly playbook. The material is yours.\n\nIf you already use other systems, what we build integrates with what you have: spreadsheets, CRM, ERP, email, messaging apps. We don't throw away what works. We automate what's stuck.",
      },
    ],
  },
};

/**
 * FAQ em duas colunas: título, apoio e CTA fixos à esquerda; acordeão à
 * direita (abre com transição de altura, o primeiro já vem aberto).
 */
export function FAQ() {
  const c = useLpCopy(COPY);
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="lpx-section relative">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd(c.items) }} />
      <div className="lpx-wrap relative">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,400px)_minmax(0,1fr)] gap-10 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-[120px]">
            <Reveal>
              <span className="lpx-eyebrow">{c.eyebrow}</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="lpx-h2 mt-6">
                {c.titleA} <em>{c.titleB}</em>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="lpx-lead mt-5">{c.sub}</p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8">
                <CtaButton>{c.cta}</CtaButton>
              </div>
            </Reveal>
          </div>

          <div className="flex flex-col gap-3">
            {c.items.map((item, i) => (
              <Reveal key={item.q} delay={0.04 * (i + 1)}>
                <FaqItem
                  num={i + 1}
                  question={item.q}
                  answer={item.a}
                  open={open === i}
                  onToggle={() => setOpen(open === i ? null : i)}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqItem({
  num,
  question,
  answer,
  open,
  onToggle,
}: {
  num: number;
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
}) {
  const id = `faq-${num}`;
  return (
    <div className="lpx-faq-item" data-open={open}>
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center gap-4 lg:gap-5 px-5 lg:px-7 py-5 text-left cursor-pointer"
        aria-expanded={open}
        aria-controls={id}
      >
        <span className="lpx-mono shrink-0 text-[13px] text-[var(--lpx-faint)]">
          {String(num).padStart(2, "0")}
        </span>
        <span className="flex-1 text-[15.5px] lg:text-[17px] font-semibold leading-[1.35] tracking-[-0.01em] text-[var(--lpx-text)]">
          {question}
        </span>
        <span className="lpx-faq-toggle" aria-hidden>
          <Plus className="h-4 w-4" strokeWidth={2.2} />
        </span>
      </button>

      <div className="lpx-faq-answer" id={id} role="region">
        <div>
          <div className="px-5 lg:px-7 pb-6 pl-[52px] lg:pl-[66px] pr-6 lg:pr-[76px]">
            {answer.split("\n\n").map((p, i) => (
              <p
                key={i}
                className="text-[14.5px] lg:text-[15px] leading-[1.7] text-[var(--lpx-muted)]"
                style={{ marginTop: i > 0 ? "0.8rem" : 0 }}
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
