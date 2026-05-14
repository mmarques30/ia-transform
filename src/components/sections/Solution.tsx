import { Reveal } from "@/components/Reveal";

const TOOL_BADGES = ["Monday", "Make", "n8n", "Notion"];

export function Solution() {
  return (
    <section className="py-[100px] lg:py-[140px] bg-background relative overflow-hidden">
      {/* Tech animated grid drift */}
      <div
        className="pointer-events-none absolute inset-0 tech-bg-grid ia-anim-grid-drift opacity-[0.35]"
        style={{
          maskImage: "radial-gradient(ellipse 60% 50% at 30% 50%, black 20%, transparent 80%)",
        }}
      />
      {/* Soft lime glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-0 h-[460px] w-[460px] rounded-full ia-anim-shimmer"
        style={{
          background:
            "radial-gradient(circle at center, oklch(0.62 0.17 125 / 0.16) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="container-page relative">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-center">
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

          <Reveal delay={0.2}>
            <SystemsComposition />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/**
 * Real, realistic systems composition — 3 product surfaces stacked with depth.
 * No more cartoon icon boxes. Looks like screenshots of actual SaaS dashboards.
 */
function SystemsComposition() {
  return (
    <div className="relative aspect-[3/2] w-full">
      {/* Soft glow behind */}
      <div
        aria-hidden
        className="absolute -inset-8 -z-10 rounded-[40px] opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.62 0.17 125 / 0.22) 0%, transparent 70%)",
        }}
      />

      {/* Background card — Diag. Tributário (charcoal premium) */}
      <div
        className="absolute right-0 top-0 w-[78%] h-[72%] rounded-2xl overflow-hidden"
        style={{
          backgroundColor: "oklch(0.18 0.02 122)",
          border: "1px solid oklch(0.32 0.025 122)",
          boxShadow: "0 30px 60px -20px oklch(0 0 0 / 0.45), 0 8px 20px -8px oklch(0 0 0 / 0.25)",
        }}
      >
        <DashboardWindow />
      </div>

      {/* Foreground card — PSA Consultores (white) */}
      <div
        className="absolute left-0 bottom-0 w-[62%] h-[58%] rounded-2xl overflow-hidden bg-white"
        style={{
          border: "1px solid oklch(0.88 0.01 122)",
          boxShadow:
            "0 30px 60px -20px oklch(0.18 0.02 122 / 0.25), 0 8px 16px -8px oklch(0.18 0.02 122 / 0.15)",
        }}
      >
        <MetricsWindow />
      </div>
    </div>
  );
}

/** Dashboard window — screenshot real (Diag. Tributário · varejo) com chrome */
function DashboardWindow() {
  return (
    <div className="h-full w-full flex flex-col">
      {/* Window chrome */}
      <div
        className="flex items-center gap-1.5 px-4 py-2.5 border-b shrink-0"
        style={{ borderColor: "oklch(0.28 0.02 122)" }}
      >
        <span className="h-2 w-2 rounded-full bg-red-400/60" />
        <span className="h-2 w-2 rounded-full bg-yellow-400/60" />
        <span className="h-2 w-2 rounded-full bg-green-400/60" />
        <div className="ml-3 text-[10px] font-mono" style={{ color: "oklch(0.55 0.02 110)" }}>
          iaplicada · diag. tributário
        </div>
      </div>

      {/* Screenshot real — object-contain garante que a LP inteira apareça
          sem corte. O bg do card (dark) cobre eventual letterbox. */}
      <div
        className="flex-1 relative overflow-hidden"
        style={{ backgroundColor: "oklch(0.18 0.02 122)" }}
      >
        <img
          src="/clients/recuperacao-tributaria-varejo.png"
          alt="LP de captação do Diagnóstico Tributário pra varejo"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-contain"
        />
      </div>
    </div>
  );
}

/** Foreground window — screenshot real (PSA Consultores · agro) com chrome */
function MetricsWindow() {
  return (
    <div className="h-full w-full flex flex-col">
      {/* Mini chrome (mais discreto que o dark) */}
      <div
        className="flex items-center gap-1.5 px-3 py-2 border-b shrink-0"
        style={{ borderColor: "oklch(0.92 0.005 110)" }}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-border" />
        <span className="h-1.5 w-1.5 rounded-full bg-border" />
        <span className="h-1.5 w-1.5 rounded-full bg-border" />
        <div
          className="ml-2 text-[9px] font-mono"
          style={{ color: "var(--color-muted-foreground)" }}
        >
          iaplicada · psa consultores
        </div>
      </div>

      {/* Screenshot real — object-contain garante o site inteiro sem corte */}
      <div
        className="flex-1 relative overflow-hidden"
        style={{ backgroundColor: "oklch(0.97 0.005 110)" }}
      >
        <img
          src="/clients/psa-consultores-agro.png"
          alt="Site institucional da PSA Consultores no agronegócio"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-contain"
        />
      </div>
    </div>
  );
}
