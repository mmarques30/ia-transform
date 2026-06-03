import { Reveal } from "@/components/Reveal";

/**
 * Spread 05 — Q&A magazine editorial.
 *
 * 2-col grid: pergunta italic serif à esquerda, resposta sans à direita.
 * Tudo aberto, sem accordion, sem chip eyebrow. Header de spread "05"
 * pra ancorar no flow one-page.
 */

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
    <section id="faq" className="relative py-[80px] lg:py-[140px]">
      <div className="container-page relative max-w-[1100px]">
        {/* Header de spread */}
        <Reveal>
          <div className="flex items-start justify-between gap-4 mb-12 lg:mb-16">
            <p className="text-[10.5px] uppercase tracking-[0.22em] font-semibold text-muted-foreground leading-tight">
              Spread 05 · 5 dúvidas · Sem rodeio
            </p>
            <p
              className="num-display text-[20px] lg:text-[24px] leading-none"
              style={{ color: "var(--color-primary)", letterSpacing: "-0.02em" }}
            >
              05
            </p>
          </div>
        </Reveal>

        <div>
          {FAQS.map((item, i) => (
            <Reveal key={i} delay={0.06 + i * 0.04}>
              <div
                className="grid lg:grid-cols-[1fr_1.4fr] gap-4 lg:gap-14 py-8 lg:py-10"
                style={{ borderTop: i === 0 ? "none" : `1px solid ${SECTION_BORDER}` }}
              >
                <p
                  className="text-[22px] sm:text-[26px] lg:text-[32px] leading-[1.1] text-foreground tracking-[-0.015em]"
                  style={{
                    fontFamily: '"Instrument Serif", serif',
                    fontStyle: "italic",
                  }}
                >
                  {item.q}
                </p>
                <p className="text-[14.5px] lg:text-[16px] text-sage leading-[1.6]">
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
