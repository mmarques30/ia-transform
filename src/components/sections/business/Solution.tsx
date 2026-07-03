import { Reveal } from "@/components/Reveal";

const TOOL_BADGES = [
  "planilhas",
  "sistemas fiscais",
  "bancários",
  "documentos",
  "erps",
  "microsoft",
  "google",
];

export function Solution() {
  return (
    <section className="section-veil py-[64px] lg:py-[140px] relative overflow-hidden">
      <div className="container-page relative">
        {/* DESKTOP — coluna única centralizada, texto longo respira bem
            em viewport larga */}
        <div className="hidden lg:block max-w-[720px] mx-auto text-center">
          <Reveal>
            <p className="text-[12px] uppercase tracking-[0.16em] font-semibold text-muted-foreground mb-3">
              Roda sobre os sistemas que sua empresa já usa:
            </p>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5">
              {TOOL_BADGES.map((t, i) => (
                <span
                  key={t}
                  className="text-[11px] font-semibold text-muted-foreground inline-flex items-center gap-2 whitespace-nowrap"
                >
                  {t}
                  {i < TOOL_BADGES.length - 1 && (
                    <span className="h-1 w-1 rounded-full bg-border" />
                  )}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="h-mix mt-6 text-[28px] sm:text-[36px] lg:text-[44px] text-foreground">
              O Método APLICA
              <br />
              <em>automatiza a sua operação.</em>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 text-[17px] sm:text-[18px] text-sage leading-[1.65] mx-auto">
              A gente entra na rotina real da empresa e automatiza os processos que mais custam{" "}
              <span className="text-foreground font-semibold">
                dentro do fluxo que o time já conhece
              </span>
              . Primeira rotina rodando em 7 dias, time autônomo em 2 meses. Sem trocar de sistema,
              sem depender de TI.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <a href="#diagnostico-form" className="mt-10 cta-primary">
              Quero ver onde meu negócio perde hora
              <span className="arrow">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 7H12M12 7L7 2M12 7L7 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>
          </Reveal>
        </div>

        {/* MOBILE — mesma mensagem, layout escaneável. Em coluna estreita
            o parágrafo de 5 linhas vira parede de texto; quebrei em
            chunks com hierarquia visual + stat row pra os dois prazos
            principais (7 dias / 2 meses). */}
        <div className="lg:hidden">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.18em] font-semibold text-muted-foreground mb-3 text-center">
              Roda sobre os sistemas que sua empresa já usa
            </p>
            <div className="flex justify-center">
              <div className="max-w-full flex flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-2xl border border-border bg-card px-3.5 py-2">
                {TOOL_BADGES.map((t, i) => (
                  <span
                    key={t}
                    className="text-[10.5px] font-semibold text-muted-foreground inline-flex items-center gap-2 whitespace-nowrap"
                  >
                    {t}
                    {i < TOOL_BADGES.length - 1 && (
                      <span className="h-1 w-1 rounded-full bg-border" />
                    )}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="h-mix mt-7 text-[26px] leading-[1.1] text-foreground text-center">
              O Método APLICA <em>automatiza a sua operação.</em>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-5 text-[15px] text-sage leading-[1.6] text-center">
              Entramos na rotina real e automatizamos os processos que mais custam.
            </p>
          </Reveal>

          <Reveal delay={0.13}>
            <p className="mt-3 text-[15px] text-foreground font-semibold leading-[1.5] text-center">
              Dentro do fluxo que seu time já conhece. Sem trocar de sistema, sem depender de TI.
            </p>
          </Reveal>

          {/* Stat row — os dois marcos temporais que vendem o método */}
          <Reveal delay={0.18}>
            <div className="mt-7 grid grid-cols-2 gap-3">
              <div
                className="rounded-xl border border-border p-4 text-center"
                style={{ backgroundColor: "oklch(0.18 0.025 122 / 0.4)" }}
              >
                <p
                  className="num-display text-[26px] leading-none"
                  style={{ color: "var(--color-primary)" }}
                >
                  7 dias
                </p>
                <p className="mt-1.5 text-[10.5px] uppercase tracking-[0.18em] font-semibold text-muted-foreground">
                  Primeira rotina rodando
                </p>
              </div>
              <div
                className="rounded-xl border border-border p-4 text-center"
                style={{ backgroundColor: "oklch(0.18 0.025 122 / 0.4)" }}
              >
                <p
                  className="num-display text-[26px] leading-none"
                  style={{ color: "var(--color-primary)" }}
                >
                  2 meses
                </p>
                <p className="mt-1.5 text-[10.5px] uppercase tracking-[0.18em] font-semibold text-muted-foreground">
                  Time autônomo
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="mt-8 flex justify-center">
              <a href="#diagnostico-form" className="cta-primary">
                Quero ver onde meu negócio perde hora
                <span className="arrow">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 7H12M12 7L7 2M12 7L7 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
