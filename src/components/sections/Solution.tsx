import { Reveal } from "@/components/Reveal";
import { HeroMockup } from "@/components/mockups/HeroMockup";

const TOOL_BADGES = ["Monday", "Make", "n8n", "Notion"];

export function Solution() {
  return (
    <section className="py-[100px] lg:py-[140px] bg-background relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage:
            "linear-gradient(to right, oklch(0.82 0.02 122 / 0.3) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.82 0.02 122 / 0.3) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 60% 50% at 30% 50%, black 20%, transparent 80%)",
        }}
      />

      <div className="container-page relative">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <Reveal>
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
              <p className="mt-6 text-[17px] text-sage leading-[1.65] max-w-[520px]">
                Uma plataforma de gestão e automação feita{" "}
                <span className="text-foreground font-semibold">sob medida para a sua empresa</span>
                , que usa IA para substituir planilhas e tarefas manuais por fluxos automáticos e
                dashboards que mostram exatamente onde estão os gargalos do seu crescimento — sem
                depender de time de TI.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <a href="#top" className="mt-10 cta-primary">
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

          <Reveal delay={0.2}>
            <HeroMockup />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
