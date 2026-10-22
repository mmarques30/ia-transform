import { useState } from "react";
import { Reveal } from "@/components/Reveal";
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
    q: "O diagnóstico é realmente gratuito? E se eu já tiver sistemas?",
    a: "Sim. Sem custo e sem compromisso de contratação. Mesmo que você não feche, leva o mapa de processos, o ranking de gargalos e o playbook do trimestre. O material fica com você.\n\nSe já usa outros sistemas, o que construímos se integra ao que você já tem: planilha, CRM, ERP, WhatsApp, e-mail. Não jogamos fora o que funciona. Automatizamos o que trava.",
  },
];

const COPY_PT_BR = {
  titleA: "Tire suas",
  titleB: "Dúvidas",
  items: FAQ_ITEMS,
};

const COPY: LpCopy<typeof COPY_PT_BR> = {
  "pt-br": COPY_PT_BR,
  en: {
    titleA: "Frequently Asked",
    titleB: "Questions",
    items: [
      {
        q: "What exactly does IAplicada do?",
        a: "We build custom AI-powered software that automates how your business operates. It's not an off-the-shelf tool license, and it's not consulting that ends with a slide deck.\n\nWe map your processes, find where the company is losing time and money, and deliver a system that already works inside your operations. With one difference: the built-in AI learns from every use. What your team corrects becomes the standard and comes back as a suggestion. The more the system is used, the less it needs to be filled in.",
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
        q: "Is the diagnostic really free? What if I already have systems in place?",
        a: "Yes. No cost and no commitment to hire us. Even if you don't move forward, you keep the process map, the bottleneck ranking and the quarterly playbook. The material is yours.\n\nIf you already use other systems, what we build integrates with what you have: spreadsheets, CRM, ERP, email, messaging apps. We don't throw away what works. We automate what's stuck.",
      },
    ],
  },
};

export function FAQ() {
  const c = useLpCopy(COPY);
  return (
    <section
      id="faq"
      className="relative overflow-hidden"
      style={{
        background:
          "radial-gradient(80% 60% at 50% 0%, rgba(200,224,64,0.08), transparent 65%), linear-gradient(180deg, #0a0c07 0%, #0f1109 100%)",
      }}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd(c.items) }} />
      <div className="container-page relative py-[80px] lg:py-[120px]">
        <div className="max-w-[860px] mx-auto">
          <Reveal>
            <h2
              className="font-extrabold text-[30px] sm:text-[40px] lg:text-[52px] leading-[1.03] tracking-[-0.025em] text-foreground"
              style={{ textWrap: "balance" }}
            >
              {c.titleA}{" "}
              <span
                style={{ color: "var(--color-primary)" }}
              >
                {c.titleB}
              </span>
            </h2>
          </Reveal>

          <div className="mt-10 flex flex-col gap-3">
            {c.items.map((item, i) => (
              <Reveal key={i} delay={0.05 * (i + 1)}>
                <FaqItem num={i + 1} question={item.q} answer={item.a} />
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
}: {
  num: number;
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="faq-item"
      style={{
        borderRadius: 12,
        border: "1px solid rgba(200,224,64,0.12)",
        background: "rgba(15,17,9,0.6)",
        transition: "border-color 0.25s ease",
        ...(open ? { borderColor: "rgba(200,224,64,0.3)" } : {}),
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 lg:gap-6 px-5 lg:px-7 py-5 text-left cursor-pointer"
        aria-expanded={open}
      >
        <span
          className="shrink-0 font-extrabold text-[22px] lg:text-[28px] leading-none"
          style={{ color: "var(--color-primary)", fontFamily: '"JetBrains Mono", monospace' }}
        >
          {String(num).padStart(2, "0")}
        </span>
        <span className="flex-1 font-bold text-[15px] lg:text-[17px] text-foreground leading-[1.3]">
          {question}
        </span>
        <span
          className="shrink-0 text-[20px] lg:text-[24px] font-light transition-transform duration-300"
          style={{
            color: "var(--color-primary)",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          +
        </span>
      </button>

      <div
        className="faq-answer overflow-hidden transition-all duration-300"
        style={{
          maxHeight: open ? 600 : 0,
          opacity: open ? 1 : 0,
        }}
      >
        <div className="px-5 lg:px-7 pb-6 pl-[60px] lg:pl-[76px]">
          {answer.split("\n\n").map((p, i) => (
            <p
              key={i}
              className="text-[14px] lg:text-[15px] text-sage leading-[1.6]"
              style={{ marginTop: i > 0 ? "0.75rem" : 0 }}
            >
              {p}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
