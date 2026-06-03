import { Reveal } from "@/components/Reveal";

/**
 * FAQ editorial — pergunta + resposta lado a lado, tudo aberto, sem
 * accordion. Lista enxuta de 5 perguntas focadas no contexto da
 * calculadora. Tipografia editorial pura, sem moldura de card.
 */
const SECTION_BG = "oklch(0.13 0.018 122)";
const SECTION_BORDER = "oklch(0.3 0.04 122 / 0.4)";

const FAQS = [
  {
    q: "Os números são reais ou marketing?",
    a: "Reais. Os percentuais de redução por tarefa (40% a 75%) vêm de benchmarks de +80 implementações da IAplicada no setor contábil. O valor em R$ é calculado em cima do seu custo/hora.",
  },
  {
    q: "Esses 3 minutos são reais?",
    a: "Sim. As perguntas vêm com valores padrão de mercado já pré-preenchidos. Você ajusta o que não bate e vê o resultado direto na tela.",
  },
  {
    q: "Vou ser bombardeado depois?",
    a: "Não. Um WhatsApp uma vez com a trilha personalizada. Se responder, a gente conversa. Se não, ficou com o diagnóstico e cada um segue o seu caminho.",
  },
  {
    q: "Meus dados ficam onde?",
    a: "No nosso CRM próprio. Não vendemos, não compartilhamos, não usamos pra treinar IA. Conformidade LGPD. NDA quando viramos cliente.",
  },
  {
    q: "E se eu não quiser implementar com vocês?",
    a: "O diagnóstico é seu de qualquer jeito. Pode aplicar internamente, com agência ou consultoria. A conversa comigo é opcional, não condição.",
  },
];

export function FAQ() {
  return (
    <section
      id="faq"
      className="relative py-[80px] lg:py-[140px]"
      style={{ backgroundColor: SECTION_BG }}
    >
      <div className="container-page relative max-w-[1080px]">
        <Reveal>
          <p className="text-[11.5px] uppercase tracking-[0.22em] font-semibold text-muted-foreground">
            O que sempre aparece
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="h-mix mt-7 text-[36px] sm:text-[48px] lg:text-[60px] leading-[1.02] tracking-[-0.02em] text-foreground max-w-[700px]">
            5 dúvidas. <em>Sem rodeio.</em>
          </h2>
        </Reveal>

        {/* Lista — cada Q&A em grid 2-col, separador horizontal entre */}
        <div className="mt-14 lg:mt-20">
          {FAQS.map((item, i) => (
            <Reveal key={i} delay={0.06 + i * 0.04}>
              <div
                className={`grid lg:grid-cols-[1fr_1.4fr] gap-4 lg:gap-12 py-7 lg:py-9 ${
                  i === 0 ? "" : ""
                }`}
                style={{ borderTop: i === 0 ? "none" : `1px solid ${SECTION_BORDER}` }}
              >
                <p
                  className="text-[19px] sm:text-[22px] lg:text-[26px] leading-[1.15] text-foreground tracking-tight"
                  style={{
                    fontFamily: '"Instrument Serif", serif',
                    fontStyle: "italic",
                    letterSpacing: "-0.015em",
                  }}
                >
                  {item.q}
                </p>
                <p className="text-[14.5px] lg:text-[15.5px] text-sage leading-[1.6]">
                  {item.a}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
