import { Reveal } from "@/components/Reveal";

const TOOL_BADGES = ["Monday", "Make", "n8n", "Notion"];

export function Solution() {
  return (
    <section className="section-veil py-[64px] lg:py-[140px] relative overflow-hidden">
      <div className="container-page relative">
        {/* DESKTOP — coluna única centralizada, texto longo respira bem
            em viewport larga */}
        <div className="hidden lg:block max-w-[720px] mx-auto text-center">
          <Reveal>
            <p className="text-[12px] uppercase tracking-[0.16em] font-semibold text-muted-foreground mb-3">
              Construído sobre o stack que você (ou seu time) já usa:
            </p>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5">
              {TOOL_BADGES.map((t, i) => (
                <span
                  key={t}
                  className="text-[11px] font-semibold text-muted-foreground flex items-center gap-2"
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
            <h2 className="h-mix mt-6 text-[36px] sm:text-[42px] lg:text-[52px] text-foreground">
              O Business da IAplicada
              <br />
              <em>existe para resolver isso.</em>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 text-[17px] text-sage leading-[1.65] mx-auto">
              Uma plataforma de gestão e automação feita{" "}
              <span className="text-foreground font-semibold">sob medida para a sua empresa</span>
              , que usa IA para substituir planilhas e tarefas manuais por fluxos automáticos e
              dashboards que mostram exatamente onde estão os gargalos do seu crescimento, sem
              depender de time de TI.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <a href="#diagnostico-form" className="mt-10 cta-primary">
              Quero conhecer o Business
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

        {/* MOBILE — mesma mensagem, layout escaneável. O parágrafo de 5
            linhas vira parede em coluna estreita; quebrei em chunks com
            hierarquia visual + linha de diferenciais. */}
        <div className="lg:hidden">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.18em] font-semibold text-muted-foreground mb-3 text-center">
              Construído sobre o stack que você já usa
            </p>
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5">
                {TOOL_BADGES.map((t, i) => (
                  <span
                    key={t}
                    className="text-[10.5px] font-semibold text-muted-foreground flex items-center gap-2"
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
            <h2 className="h-mix mt-7 text-[30px] leading-[1.1] text-foreground text-center">
              O Business da IAplicada <em>existe para resolver isso.</em>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-5 text-[15px] text-sage leading-[1.6] text-center">
              Plataforma de gestão e automação feita sob medida para a sua empresa.
            </p>
          </Reveal>

          <Reveal delay={0.13}>
            <p className="mt-3 text-[15px] text-foreground font-semibold leading-[1.5] text-center">
              IA substitui planilhas e tarefas manuais por fluxos automáticos e dashboards que
              mostram seus gargalos.
            </p>
          </Reveal>

          {/* Linha de diferenciais — 3 pilares curtos que vendem o método
              sem precisar do parágrafo todo */}
          <Reveal delay={0.18}>
            <div className="mt-7 grid grid-cols-3 gap-2">
              {[
                { k: "Sob medida", v: "Pra sua operação" },
                { k: "Sem TI", v: "Sem dependência" },
                { k: "Sem código", v: "Pra escalar" },
              ].map((it) => (
                <div
                  key={it.k}
                  className="rounded-xl border border-border p-3 text-center"
                  style={{ backgroundColor: "oklch(0.18 0.025 122 / 0.4)" }}
                >
                  <p
                    className="text-[13px] font-bold tracking-tight"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {it.k}
                  </p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.14em] font-semibold text-muted-foreground">
                    {it.v}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="mt-8 flex justify-center">
              <a href="#diagnostico-form" className="cta-primary">
                Quero conhecer o Business
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
