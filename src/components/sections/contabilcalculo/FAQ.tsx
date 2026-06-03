import { Reveal } from "@/components/Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/**
 * FAQ — perguntas focadas no RESULTADO da calculadora e o que o lead
 * leva como benefício pra empresa. Accordion (oculta/expande) pra evitar
 * dobra gigante de texto.
 */

const FAQS = [
  {
    q: "Como interpretar o número que a calculadora me deu?",
    a: "O valor em R$ é calculado em cima das suas horas reais × o seu custo/hora, aplicando o % de redução típico que a IA entrega em cada tarefa. É uma projeção realista, não otimista. Em escritórios já implementados, o entregue costuma ficar entre 80% e 110% do que o diagnóstico estimou.",
  },
  {
    q: "Esse R$ X de economia/mês é garantido?",
    a: "Não há garantia 100%, porque depende de como o escritório aplica. O que é garantido: as 3 frentes priorizadas são exatamente as que dão maior ROI no seu caso, e os percentuais vêm de benchmarks de mais de 80 implementações reais. O número é o teto possível com o método rodando bem.",
  },
  {
    q: "Por que isso faz sentido pro meu escritório especificamente?",
    a: "A calculadora cruza o seu tamanho (colaboradores + clientes), o seu custo real de equipe, suas horas atuais por tarefa e o gargalo que você declarou. As recomendações que aparecem no resultado são desenhadas pra esse perfil, não genéricas. Quando viramos cliente, o time da IAplicada valida com você antes de implementar.",
  },
  {
    q: "Em quanto tempo eu vejo retorno na prática?",
    a: "Primeira rotina rodando em 7 dias. O retorno mensal começa já no mês 1 da implementação — mesmo que parcial — e cresce até a semana 8, quando seu time opera sozinho. Em 3 meses, a maioria dos escritórios já recuperou o custo da implementação.",
  },
  {
    q: "O que muda na minha operação se eu implementar?",
    a: "A equipe deixa de gastar tempo em lançamento, conciliação e atendimento repetitivo. Esse tempo volta pra trabalho de maior valor: consultoria, planejamento tributário, relacionamento com cliente. Mesma equipe, mais carteira, mais margem. Sem trocar de sistema, sem depender de TI.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="relative py-[80px] lg:py-[120px]">
      <div className="container-page relative max-w-[920px]">
        <Reveal>
          <h2 className="h-mix text-[28px] sm:text-[36px] lg:text-[44px] leading-[1.02] tracking-[-0.02em] text-foreground">
            5 dúvidas sobre <em>o resultado</em>.
          </h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-5 text-[14.5px] lg:text-[15.5px] text-sage leading-[1.55] max-w-[560px]">
            O que essa calculadora realmente entrega pra você — e o que isso significa pra
            operação do seu escritório.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <Accordion type="multiple" defaultValue={[]} className="mt-10 lg:mt-12 w-full">
            {FAQS.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b border-border">
                <AccordionTrigger className="text-left text-foreground hover:text-primary text-[16px] lg:text-[17px] font-semibold py-5">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-sage leading-[1.6] text-[14.5px] lg:text-[15.5px] pb-5 pr-6">
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
