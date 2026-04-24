import { Reveal } from "@/components/Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    q: "Quanto tempo dura um projeto típico?",
    a: "Entre 3 e 12 meses, dependendo do escopo definido no diagnóstico. Projetos de construção de sistema costumam ser 3-6 meses. Mentoria estratégica é por contrato anual.",
  },
  {
    q: "Qual o investimento?",
    a: "O valor é construído caso a caso, depois do diagnóstico. Nossos contratos atuais ficam entre R$ 15 mil e R$ 80 mil por mês, dependendo do escopo e do porte da empresa.",
  },
  {
    q: "Vocês substituem a nossa consultoria, agência ou fábrica de software?",
    a: "Não. A gente complementa. Trabalhamos lado a lado com times internos, consultorias estratégicas e fornecedores técnicos. Nosso foco é implementação de IA aplicada ao operacional, não a estratégia de negócio inteira.",
  },
  {
    q: "O time precisa ter base técnica?",
    a: "Não. A gente trabalha com líderes e times operacionais. A parte técnica fica com a gente quando necessário. O objetivo é o time usar, não virar desenvolvedor.",
  },
  {
    q: "Vocês assinam NDA?",
    a: "Sim, é parte do protocolo. Acordo de confidencialidade é assinado antes do diagnóstico aprofundado.",
  },
  {
    q: "Como é a cobrança?",
    a: "Mensal, sob contrato, nota fiscal PJ. Pagamento por boleto ou transferência bancária.",
  },
  {
    q: "Vocês atendem empresas fora do Brasil?",
    a: "Atendemos, sim, desde que as conversas sejam em português ou inglês. Temos cases em Portugal e México.",
  },
  {
    q: "Qual a diferença entre Business e Skills?",
    a: "Skills é capacitação estruturada de time (mínimo 3 pessoas, treinamento intensivo por 3 meses). Business é implementação e acompanhamento contínuo. Skills às vezes é parte de um projeto Business — definimos no diagnóstico.",
  },
  {
    q: "Vocês têm exclusividade por setor?",
    a: "Não. Atendemos múltiplas empresas no mesmo setor quando não há conflito direto. Transparência total sobre isso é firmada no contrato.",
  },
  {
    q: "Como garantimos continuidade quando o projeto acaba?",
    a: "Todo projeto termina com handover documentado: playbooks, rituais, materiais de treinamento. E oferecemos formato de acompanhamento mais leve (4-8h/mês) pra quem quer manter um ponto de contato externo.",
  },
];

export function FAQ() {
  return (
    <section
      id="faq"
      className="py-[120px] lg:py-[160px]"
      style={{ backgroundColor: "var(--color-surface)" }}
    >
      <div className="container-page max-w-[880px]">
        <Reveal>
          <h2 className="h-display text-[36px] sm:text-[44px] lg:text-[48px] text-foreground">
            Perguntas frequentes
          </h2>
        </Reveal>

        <Reveal delay={0.05}>
          <Accordion type="single" collapsible className="mt-12 w-full">
            {FAQS.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b border-border">
                <AccordionTrigger className="text-left text-foreground hover:text-primary-glow text-[17px] font-semibold py-6">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-sage leading-[1.6] text-[16px] pb-6">
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
