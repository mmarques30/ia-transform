import { Reveal } from "@/components/Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/**
 * FAQ específico da /contabilcalculo — perguntas que ataacam objeções
 * reais da calculadora (gratuidade, persistência de contato, dados,
 * substituição vs assistência, tecnologia, IA já em uso).
 *
 * Forkado da FAQ compartilhada porque o tom é completamente diferente
 * (calculadora vs. consultoria full).
 */
const FAQS = [
  {
    q: "O diagnóstico é mesmo gratuito?",
    a: "É. 100%. Você responde 8 perguntas, vê o resultado completo na hora. Sem cartão de crédito. Pedimos só contato pra te enviar as recomendações personalizadas pelo WhatsApp.",
  },
  {
    q: "Vocês vão me ligar enchendo o saco?",
    a: "Não. A gente te manda um WhatsApp depois do diagnóstico com as recomendações. Se quiser conversar pra entender como aplicar, é só responder. Se não quiser, você ficou com seu diagnóstico e segue cada um seu caminho.",
  },
  {
    q: "Meus dados vão pra onde? (LGPD)",
    a: "Pro nosso CRM, e só. Não compartilhamos com ninguém, não vendemos lista, não usamos em treinamento. A operação fica sob seu controle e respeitamos a LGPD.",
  },
  {
    q: "IA vai substituir contador?",
    a: "Não. IA substitui tarefa operacional repetitiva. Conhecimento técnico, relação com cliente, interpretação fiscal, conselho: isso continua sendo você. O que muda é que sua equipe deixa de gastar 60% do tempo em lançamento e passa a usar esse tempo no que o cliente paga mais por.",
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
            Perguntas que <em>sempre aparecem</em>.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <Accordion type="multiple" defaultValue={[]} className="mt-10 w-full">
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
