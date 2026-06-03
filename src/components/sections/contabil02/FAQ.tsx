import { Reveal } from "@/components/Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/**
 * FAQ específico da /contabil02 — perguntas em linguagem de busca natural,
 * desenhadas pra GEO (citação por IA: ChatGPT, Perplexity, AI Overviews).
 *
 * IMPORTANTE: o texto aqui DEVE bater palavra por palavra com o JSON-LD
 * FAQPage adicionado em PR 2. Se divergir, o Google ignora o schema.
 *
 * As perguntas atacam objeções reais do sócio receoso (LGPD, ChatGPT vs IA
 * aplicada, dependência tecnológica) — fechando o loop com o slide 4 do
 * criativo ("é só ChatGPT?").
 */
const FAQS = [
  {
    q: "Como a inteligência artificial pode ser usada em um escritório de contabilidade?",
    a: "A IA aplicada à contabilidade automatiza rotinas operacionais como lançamento por contexto e regra, conciliação bancária em lote, apuração de impostos e fechamento mensal. Na IAplicada, isso é feito dentro do sistema que o escritório já usa (Domínio, Alterdata, Omie), sem trocar de ERP e sem depender de TI. A primeira rotina entra em produção em 7 dias e o time fica autônomo em 2 meses.",
  },
  {
    q: "Qual a diferença entre usar ChatGPT e IA contábil aplicada?",
    a: "ChatGPT é uma ferramenta genérica para tarefas pontuais, como escrever um e-mail. IA contábil aplicada é um sistema construído dentro do fluxo do escritório, com a equipe e sob o nome do escritório, que executa rotinas específicas como conciliação em lote e apuração. A diferença é que a IA aplicada vira processo operacional contínuo, não uma resposta avulsa.",
  },
  {
    q: "Preciso trocar de sistema contábil para usar IA no escritório?",
    a: "Não. A automação da IAplicada roda sobre os sistemas que o escritório já usa, como Domínio, Alterdata e Omie. Não é necessário trocar de ERP nem depender de uma equipe de TI.",
  },
  {
    q: "Em quanto tempo a IA começa a funcionar no escritório contábil?",
    a: "A primeira rotina automatizada entra em produção em 7 dias. O time atinge autonomia total em cerca de 2 meses (8 semanas), seguindo as etapas do Método MAPA: mapeamento, aplicação, padronização e acompanhamento.",
  },
  {
    q: "Automatizar com IA é seguro para os dados dos clientes do escritório (LGPD)?",
    a: "Sim. A operação fica sob o controle do escritório, dentro do seu próprio ambiente. A IAplicada assina NDA e estrutura a automação com governança e controle, respeitando a LGPD.",
  },
  {
    q: "A IA pode errar nos lançamentos e gerar problema fiscal?",
    a: "A automação da IAplicada trabalha por contexto e regra definidos junto com o escritório, com pontos de revisão e validação humana onde importa. O objetivo é reduzir o retrabalho e o risco de erro manual, mantendo o controle e a governança nas mãos do escritório. Nada entra em produção sem o time validar o padrão antes.",
  },
  {
    q: "Meu time precisa saber programar para operar a IA?",
    a: "Não. A IAplicada documenta cada processo e treina a equipe passo a passo. Ao final, o próprio time opera as rotinas automatizadas sozinho, sem conhecimento técnico de programação.",
  },
  {
    q: "Quanto custa o programa?",
    a: "A partir de R$ 9.997, conforme escopo e porte do escritório. O valor fechado vem depois do diagnóstico gratuito, que já entrega as 3 frentes prioritárias e o tempo de retorno estimado.",
  },
  {
    q: "O diagnóstico é mesmo gratuito?",
    a: "É. Sem custo, sem follow-up insistente. Você sai com o mapa das 3 frentes prioritárias mesmo se a gente não fechar.",
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
