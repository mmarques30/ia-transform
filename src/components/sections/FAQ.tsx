import { Reveal } from "@/components/Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    q: "Quanto dura um projeto?",
    a: "De 3 a 12 meses. Construção de sistema costuma ser 3–6 meses. Mentoria é anual.",
  },
  {
    q: "Qual o investimento?",
    a: "Entre R$ 15k e R$ 80k/mês, dependendo do escopo e porte. Valor fechado depois do diagnóstico.",
  },
  {
    q: "Substitui consultoria, agência ou fábrica de software?",
    a: "Não. Complementa. Trabalhamos lado a lado com times internos e fornecedores técnicos.",
  },
  {
    q: "O time precisa ter base técnica?",
    a: "Não. Trabalhamos com líderes e operacionais. Parte técnica fica com a gente.",
  },
  {
    q: "Vocês assinam NDA?",
    a: "Sim, antes de qualquer conversa aprofundada.",
  },
  {
    q: "Como é a cobrança?",
    a: "Mensal, contrato PJ, nota fiscal, boleto ou transferência.",
  },
  {
    q: "Diferença entre Business e Academy?",
    a: "Academy é capacitação individual. Business é implementação na empresa inteira.",
  },
  {
    q: "Como garante continuidade depois?",
    a: "Handover documentado: playbooks, rituais, materiais. Acompanhamento opcional de 4–8h/mês.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-[90px] lg:py-[120px] bg-background">
      <div className="container-page max-w-[820px]">
        <Reveal>
          <span className="label-chip">
            <span className="dot" />
            Perguntas frequentes
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="h-display mt-6 text-[36px] sm:text-[44px] lg:text-[52px] text-foreground">
            O que a gente mais ouve.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <Accordion type="single" collapsible className="mt-10 w-full">
            {FAQS.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b border-border">
                <AccordionTrigger className="text-left text-foreground hover:text-primary text-[16px] font-semibold py-5">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-sage leading-[1.6] text-[15px] pb-5">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
