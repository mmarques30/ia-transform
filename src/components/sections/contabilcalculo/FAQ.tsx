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
    q: "Os números do diagnóstico são reais ou marketing?",
    a: "Reais. Os percentuais de redução por tarefa (40% a 75%) vêm de benchmarks de +80 implementações da IAplicada no setor contábil. O valor em R$ é calculado em cima do SEU custo/hora que você preencheu, não de média genérica.",
  },
  {
    q: "Quanto tempo leva mesmo? Esses 3 minutos são reais?",
    a: "Sim. As 8 perguntas vêm com valores padrão de mercado já pré-preenchidos. Você ajusta o que não bate com a sua realidade e vê o resultado direto na tela. Sem espera, sem PDF que chega amanhã.",
  },
  {
    q: "Depois do diagnóstico, vou ser bombardeado de e-mail e ligação?",
    a: "Não. Mandamos um WhatsApp uma vez com a trilha personalizada de próximos passos. Se você responder, a gente conversa. Se não, ficou com o seu diagnóstico e segue cada um seu caminho. Sem ligação fria, sem cadência insistente.",
  },
  {
    q: "Meus dados ficam onde? Vocês vendem lista?",
    a: "Não vendemos, não compartilhamos, não usamos pra treinar IA. Os dados ficam no nosso CRM próprio, conformidade LGPD. Quando viramos cliente, assinamos NDA antes de qualquer projeto.",
  },
  {
    q: "E se eu não quiser implementar com vocês depois?",
    a: "O diagnóstico é seu de qualquer jeito. Você pode pegar as 3 frentes priorizadas e implementar internamente, com agência ou consultoria. Se quiser conversar com a gente sobre como acelerar, é uma conversa opcional, não condição.",
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
