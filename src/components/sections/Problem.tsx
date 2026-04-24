import { Reveal } from "@/components/Reveal";

const STATS = [
  {
    big: "78%",
    label: "das iniciativas de IA corporativa",
    text: "não sustentam depois de 6 meses",
  },
  {
    big: "9 em 10",
    label: "das empresas",
    text: "compram ferramenta antes de desenhar o processo",
  },
  {
    big: "1 em 5",
    label: "líderes",
    text: "sabe medir o ROI real das suas implementações de IA",
  },
];

export function Problem() {
  return (
    <section className="py-[120px] lg:py-[160px] bg-background">
      <div className="container-page">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <Reveal>
            <div>
              <span className="label-chip">✱ O problema real</span>
              <h2 className="h-display mt-6 text-[36px] sm:text-[44px] lg:text-[48px] text-foreground">
                Sua empresa não precisa de mais um curso de IA.
                <br />
                Precisa que a IA{" "}
                <span style={{ color: "var(--color-primary-glow)" }}>
                  chegue no fluxo de trabalho.
                </span>
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-[18px] text-sage leading-[1.6] lg:pt-12">
              Quase toda empresa que chega aqui já tentou. Contratou ferramenta,
              mandou o time fazer curso, rodou um workshop. Mas 3 meses depois,
              ninguém está usando. O problema raramente é ferramenta. É
              implementação: mapear onde IA gera valor, desenhar o fluxo,
              treinar o time no contexto real e manter a coisa viva depois.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-6">
          {STATS.map((s, i) => (
            <Reveal key={s.big} delay={i * 0.05}>
              <div className="rounded-lg border border-border bg-card p-8 h-full">
                <div
                  className="num-display text-[56px] lg:text-[64px] leading-none"
                  style={{ color: "var(--color-primary-glow)" }}
                >
                  {s.big}
                </div>
                <p className="mt-4 text-foreground font-semibold">{s.label}</p>
                <p className="mt-2 text-muted-foreground text-[15px] leading-relaxed">
                  {s.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
