import { Reveal } from "@/components/Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    q: "Qual é o prazo de implementação?",
    a: "Entregas a partir de 1 semana, conforme o escopo. Acompanhamento da operação por até 12 meses.",
  },
  {
    q: "Quanto dura um projeto?",
    a: "De 1 a 6 meses, conforme o escopo. A mentoria é um programa à parte e deve ser consultada direto com o time da IAplicada. A Mari abre vagas esporadicamente.",
  },
  {
    q: "Qual o investimento?",
    a: "A partir de R$ 9.997, dependendo do escopo e porte da operação. Valor fechado depois do diagnóstico.",
  },
  {
    q: "Como é a cobrança?",
    a: "Trabalhamos com entrada + parcelas, com contrato e nota fiscal. O pagamento pode ser feito via boleto ou cartão de crédito. Você escolhe o que faz mais sentido pro fluxo de caixa da empresa.",
  },
  {
    q: "Substitui consultoria, agência ou fábrica de software?",
    a: "Depende do escopo contratado. Em muitos casos, sim: a IAplicada assume frentes que antes ficavam com consultoria, agência ou fábrica. Em outros, integramos com sistemas já implementados e trabalhamos lado a lado com times internos e fornecedores existentes.",
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
    q: "Como garante continuidade depois?",
    a: "Handover documentado: playbooks, rituais, materiais. Acompanhamento opcional de 4–8h/mês.",
  },
  {
    q: "O sistema fica com o nome da IAplicada ou da minha empresa?",
    a: "Com o nome da sua empresa. A URL, o branding e o painel são seus. A IAplicada constrói e depois o sistema é inteiramente seu — sem dependência de licença ou assinatura da gente.",
  },
  {
    q: "Preciso ter time de TI para manter?",
    a: "Não. A entrega inclui treinamento do time e documentação. A maioria dos clientes opera de forma autônoma desde a semana 8, sem depender de TI interno ou consultor externo pra manter.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="section-veil py-[90px] lg:py-[120px]">
      <div className="container-page max-w-[820px]">
        <Reveal>
          <span className="label-chip">
            <span className="dot" />
            Perguntas frequentes
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="h-mix mt-6 text-[36px] sm:text-[44px] lg:text-[52px] text-foreground">
            O que a gente <em>mais ouve</em>.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <Accordion
            type="multiple"
            defaultValue={[]}
            className="mt-10 w-full"
          >
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
