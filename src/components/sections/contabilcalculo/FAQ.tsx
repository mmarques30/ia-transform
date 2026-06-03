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
    a: "É. 100%. Você responde 8 perguntas, vê o resultado completo na hora. Não pedimos cartão de crédito em nenhum momento. Pedimos seu contato pra te enviar as recomendações personalizadas pelo WhatsApp.",
  },
  {
    q: "Vocês vão me ligar enchendo o saco?",
    a: "Não. A gente te manda um WhatsApp depois do diagnóstico com as recomendações. Se você quiser conversar com alguém do nosso time pra entender como aplicar, é só responder. Se não quiser, você ficou com seu diagnóstico gratuito e a gente segue cada um seu caminho.",
  },
  {
    q: "Quanto tempo leva mesmo?",
    a: "Cerca de 3 minutos. As perguntas vêm com valores padrão de mercado pré-preenchidos. Você só ajusta pra refletir seu escritório.",
  },
  {
    q: "Meus dados vão pra onde?",
    a: "Pro nosso CRM, e só. Não compartilhamos com ninguém, não vendemos lista, não usamos em treinamento. Política de privacidade completa no rodapé.",
  },
  {
    q: "IA vai substituir contador?",
    a: "Não. IA substitui tarefa operacional repetitiva. O conhecimento técnico, a relação com o cliente, a interpretação fiscal, o conselho: isso continua sendo você. O que muda é que sua equipe deixa de gastar 60% do tempo classificando lançamento e passa a usar esse tempo no que o cliente paga mais por.",
  },
  {
    q: "Preciso entender de tecnologia pra usar IA no escritório?",
    a: "Não. A trilha que a IAplicada propõe começa pela aplicação prática. Você não precisa virar dev nem cientista de dados. Precisa saber onde aplicar e como configurar. Disso a gente cuida.",
  },
  {
    q: "E se eu já uso alguma ferramenta de IA?",
    a: "Melhor ainda. O diagnóstico vai te mostrar o que você ainda não atacou e onde tem dinheiro pra recuperar mesmo com o que já roda hoje.",
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
