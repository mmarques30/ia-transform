import { useState } from "react";
import { Reveal } from "@/components/Reveal";

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
    a: "ERP força a empresa a se adaptar ao software. A IAplicada constrói o software para se adaptar à empresa.\n\nConsultoria entrega diagnóstico e vai embora. A IAplicada foi fundada por Mariana Marques, com 11 anos como executiva em Mercado Livre, Suzano e AngloGold, liderando mais de 40 frentes de transformação digital na América Latina. O que entregamos não é o que um consultor aprendeu em livro. É o que funcionou em empresa grande, adaptado para o tamanho e o processo de quem está crescendo agora.\n\nVocê recebe sistema rodando, não slide.",
  },
  {
    q: "Para que tipo de empresa a IAplicada atende?",
    a: "Empresas que já faturam, têm operação rodando e precisam escalar sem multiplicar o time.\n\nO critério não é setor. É o problema: processo manual que consome hora de gente cara, dado espalhado em planilha e WhatsApp, decisão que trava porque depende de uma pessoa só, crescimento de receita que não acompanha o crescimento da operação.\n\nE especialmente quem quer recuperar tempo. Tocar a empresa de onde quiser, sem precisar estar presente para cada decisão. O sistema faz o operacional rodar. Você cuida do que só você pode fazer.",
  },
  {
    q: "O diagnóstico é realmente gratuito? E se eu já tiver sistemas?",
    a: "Sim. Sem custo e sem compromisso de contratação. Mesmo que você não feche, leva o mapa de processos, o ranking de gargalos e o playbook do trimestre. O material fica com você.\n\nSe já usa outros sistemas, o que construímos se integra ao que você já tem: planilha, CRM, ERP, WhatsApp, e-mail. Não jogamos fora o que funciona. Automatizamos o que trava.",
  },
  {
    q: "Vale a pena o investimento? Tem como calcular?",
    a: "Tem. Faça a conta.\n\nUma empresa com 10 pessoas gastando 2 horas por dia em tarefas manuais acumula 400 horas paradas por mês. A R$ 80 por hora, são R$ 32 mil por mês em tempo que não vira receita.\n\nSem contar o custo de erro, retrabalho e decisão lenta.\n\nA PSA Consultores economizou R$ 251 mil no primeiro ano com o sistema. ROI de 1.806%. A B&Z Advocacia eliminou R$ 60 mil por ano em custo de equipe. A LCR Contábil automatizou 10.948 lançamentos por mês que antes dependiam de operador.\n\nO investimento é calculado por escopo e apresentado depois do diagnóstico. Mas a pergunta certa não é quanto custa. É quanto está custando não ter.",
  },
];

export function FAQ() {
  return (
    <section
      id="faq"
      className="relative overflow-hidden"
      style={{
        background:
          "radial-gradient(80% 60% at 50% 0%, rgba(200,224,64,0.08), transparent 65%), linear-gradient(180deg, #0a0c07 0%, #0f1109 100%)",
      }}
    >
      <div className="container-page relative py-[80px] lg:py-[120px]">
        <div className="max-w-[860px] mx-auto">
          <Reveal>
            <h2
              className="font-extrabold text-[30px] sm:text-[40px] lg:text-[52px] leading-[1.03] tracking-[-0.025em] text-foreground"
              style={{ textWrap: "balance" }}
            >
              Tire suas{" "}
              <span
                style={{ color: "var(--color-primary)" }}
              >
                Dúvidas
              </span>
            </h2>
          </Reveal>

          <div className="mt-10 flex flex-col gap-3">
            {FAQ_ITEMS.map((item, i) => (
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
