import { Reveal } from "@/components/Reveal";

/**
 * Seção 2 do brief — Problema/Agitação.
 * Lista cenários concretos do dia-a-dia + fecho "Você não tem essa
 * resposta agora. Em 3 minutos, vai ter."
 */
const SCENARIOS = [
  "Conciliação bancária que toma o dia inteiro de um analista.",
  "Cliente perguntando pelo WhatsApp se a guia já saiu, pela terceira vez no mês.",
  "Apuração no apagar das luzes.",
  "Onboarding de cliente novo que come uma semana inteira de um sênior.",
];

export function Problem() {
  return (
    <section className="section-veil py-[80px] lg:py-[140px] relative overflow-hidden">
      <div className="container-page relative">
        <div className="max-w-[820px] mx-auto text-center">
          <Reveal>
            <span className="label-chip">
              <span className="dot" />O cenário do escritório
            </span>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="h-mix mt-6 text-[32px] sm:text-[40px] lg:text-[52px] leading-[1.1] text-foreground">
              Você sabe que sua equipe perde tempo. Mas sabe <em>exatamente</em> quanto?
            </h2>
          </Reveal>
        </div>

        {/* Cenários concretos */}
        <div className="mt-12 lg:mt-16 max-w-[920px] mx-auto grid sm:grid-cols-2 gap-3 lg:gap-4">
          {SCENARIOS.map((s, i) => (
            <Reveal key={s} delay={0.08 + i * 0.05}>
              <div
                className="rounded-xl border border-border p-5 lg:p-6 h-full"
                style={{ backgroundColor: "oklch(0.18 0.025 122 / 0.4)" }}
              >
                <p className="text-[14.5px] lg:text-[15.5px] text-foreground leading-[1.55]">
                  {s}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Fecho — "Você não tem essa resposta agora. Em 3 minutos, vai ter." */}
        <Reveal delay={0.32}>
          <div className="mt-12 lg:mt-16 max-w-[760px] mx-auto text-center space-y-5">
            <p className="text-[16px] lg:text-[18px] text-foreground font-semibold leading-[1.55]">
              Você sente que o escritório está afogado. Mas pra decidir o que automatizar
              primeiro, você precisa de número.
            </p>
            <p className="text-[14.5px] lg:text-[16px] text-sage leading-[1.6]">
              Quantas horas/mês sua equipe gasta em conciliação? Quanto isso custa em folha?
              Quanto sobraria de margem se 60% dessas horas voltassem pra trabalho de maior valor?
            </p>
            <p
              className="text-[20px] lg:text-[26px] italic text-foreground"
              style={{ fontFamily: '"Instrument Serif", serif', lineHeight: 1.25 }}
            >
              Você não tem essa resposta agora. Em 3 minutos, vai ter.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
