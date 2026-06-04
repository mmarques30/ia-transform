import { Reveal } from "@/components/Reveal";
import { Calculator, ShieldCheck, Workflow } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/**
 * FAQ — pattern do nextsense.io: 3 grupos temáticos com ícone-categoria,
 * accordions por grupo. Cria taxonomia visual e dá um respiro ao bloco
 * de texto que era denso antes.
 *
 * 3 categorias:
 *   - O número (interpretação dos R$ e horas)
 *   - O método (como a IAplicada implementa)
 *   - O retorno (timing, ROI, garantias)
 */

interface FAQGroup {
  Icon: LucideIcon;
  label: string;
  items: { q: string; a: string }[];
}

const GROUPS: FAQGroup[] = [
  {
    Icon: Calculator,
    label: "O número",
    items: [
      {
        q: "Como interpretar o número que a calculadora me deu?",
        a: "O valor em R$ é calculado em cima das suas horas reais × o seu custo/hora, aplicando o % de redução típico que a IA entrega em cada tarefa. É uma projeção realista, não otimista. Em escritórios já implementados, o entregue costuma ficar entre 80% e 110% do que o diagnóstico estimou.",
      },
      {
        q: "Por que isso faz sentido pro meu escritório especificamente?",
        a: "A calculadora cruza o seu tamanho (colaboradores + clientes), o seu custo real de equipe, suas horas atuais por tarefa e o gargalo que você declarou. As recomendações que aparecem no resultado são desenhadas pra esse perfil, não genéricas. Quando viramos cliente, o time da IAplicada valida com você antes de implementar.",
      },
    ],
  },
  {
    Icon: Workflow,
    label: "O método",
    items: [
      {
        q: "O que muda na minha operação se eu implementar?",
        a: "A equipe deixa de gastar tempo em lançamento, conciliação e atendimento repetitivo. Esse tempo volta pra trabalho de maior valor: consultoria, planejamento tributário, relacionamento com cliente. Mesma equipe, mais carteira, mais margem. Sem trocar de sistema, sem depender de TI.",
      },
    ],
  },
  {
    Icon: ShieldCheck,
    label: "O retorno",
    items: [
      {
        q: "Esse R$ X de economia/mês é garantido?",
        a: "Não há garantia 100%, porque depende de como o escritório aplica. O que é garantido: as 3 frentes priorizadas são exatamente as que dão maior ROI no seu caso, e os percentuais vêm de benchmarks de mais de 80 implementações reais. O número é o teto possível com o método rodando bem.",
      },
      {
        q: "Em quanto tempo eu vejo retorno na prática?",
        a: "Primeira rotina rodando em 7 dias. O retorno mensal começa já no mês 1 da implementação — mesmo que parcial — e cresce até a semana 8, quando seu time opera sozinho. Em 3 meses, a maioria dos escritórios já recuperou o custo da implementação.",
      },
    ],
  },
];

export function FAQ() {
  return (
    <section
      id="faq"
      className="relative py-[100px] lg:py-[160px]"
      style={{
        backgroundColor: "oklch(0.13 0.018 122)",
        borderTop: "1px solid oklch(0.55 0.06 122 / 0.2)",
      }}
    >
      <div className="container-page relative">
        {/* Header */}
        <div className="max-w-[900px]">
          <Reveal>
            <p
              className="text-[11px] uppercase tracking-[0.28em] font-bold"
              style={{ color: "var(--color-primary)" }}
            >
              Dúvidas
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2
              className="h-mix mt-6 text-[38px] sm:text-[52px] lg:text-[68px] leading-[0.98] text-foreground"
              style={{ letterSpacing: "-0.03em" }}
            >
              5 dúvidas sobre
              <br />
              <em>o resultado.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 text-[16px] lg:text-[18px] text-sage leading-[1.55] max-w-[620px]">
              O que essa calculadora realmente entrega pra você — e o que isso significa pra
              operação do seu escritório.
            </p>
          </Reveal>
        </div>

        {/* 3 grupos lado a lado no desktop, stack mobile */}
        <div className="mt-16 lg:mt-24 grid lg:grid-cols-3 gap-6 lg:gap-8">
          {GROUPS.map((g, gi) => (
            <Reveal key={g.label} delay={0.08 + gi * 0.08}>
              <div
                className="rounded-2xl p-7 lg:p-8 h-full"
                style={{
                  backgroundColor: "oklch(0.16 0.02 122)",
                  border: "1px solid oklch(0.55 0.06 122 / 0.28)",
                }}
              >
                {/* Ícone categoria */}
                <div
                  className="inline-flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{
                    backgroundColor: "oklch(0.75 0.20 122 / 0.12)",
                    border: "1px solid oklch(0.75 0.20 122 / 0.4)",
                  }}
                >
                  <g.Icon
                    className="h-5 w-5"
                    strokeWidth={2}
                    style={{ color: "var(--color-primary)" }}
                  />
                </div>
                <p
                  className="mt-5 text-[11px] uppercase tracking-[0.22em] font-bold"
                  style={{ color: "var(--color-primary)" }}
                >
                  {g.label}
                </p>

                <Accordion type="multiple" defaultValue={[]} className="mt-5 w-full">
                  {g.items.map((item, i) => (
                    <AccordionItem
                      key={i}
                      value={`${gi}-${i}`}
                      className="border-b border-border/40 last:border-b-0"
                    >
                      <AccordionTrigger className="text-left text-foreground hover:text-primary text-[14.5px] lg:text-[15px] font-semibold py-4 leading-[1.35]">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-sage leading-[1.6] text-[13.5px] lg:text-[14px] pb-4 pr-2">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
