import { Reveal } from "@/components/Reveal";
import { ArrowRight, CheckCircle2, Clock } from "lucide-react";

/**
 * Systems (LP-C / dobra 6) — mockup coded do BI Tributário da PSA.
 * Alinha com o ângulo de prova social pura da LP-C: em vez de 3
 * GIFs de casos, um único mockup detalhado simulando o painel real
 * de um dos clientes citados. Browser bar com URL própria + KPIs
 * auditados + gráfico de assertividade por categoria fiscal +
 * timeline de execução.
 */

export function Systems() {
  return (
    <section
      id="sistemas"
      className="section-veil py-[100px] lg:py-[140px] overflow-hidden relative"
    >
      <div className="container-page relative">
        <div className="max-w-[720px] mx-auto text-center">
          <Reveal>
            <span className="label-chip">
              <span className="dot" />
              Sistema em ação
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h-mix mt-6 text-[26px] sm:text-[32px] lg:text-[36px] text-foreground">
              Não vendemos slides. Entregamos o sistema com{" "}
              <em>nome, URL e time do cliente.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-[16px] text-sage leading-[1.6] max-w-[560px] mx-auto">
              Assim é o BI Tributário da PSA Consultores — apuração, categorias e alertas rodando
              dentro da rotina, não fora dela. Dados auditados 21/05/2026.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <SystemMockup />
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-14 text-center">
            <a
              href="#diagnostico-form"
              className="inline-flex items-center gap-2 text-foreground font-semibold text-[15px] hover:text-primary transition-colors"
            >
              Quero um sistema assim no meu negócio
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* Mockup ---------------------------------------------------------- */

const CATEGORIES = [
  { label: "ICMS", before: 82, after: 96 },
  { label: "PIS/COFINS", before: 87, after: 95 },
  { label: "ISS", before: 84, after: 93 },
  { label: "IRPJ", before: 88, after: 94 },
  { label: "IPI", before: 81, after: 92 },
];

const TIMELINE = [
  {
    icon: CheckCircle2,
    color: "oklch(0.55 0.16 145)",
    label: "Apuração ICMS · abril/2026",
    status: "concluído · 04:12",
  },
  {
    icon: CheckCircle2,
    color: "oklch(0.55 0.16 145)",
    label: "Cruzamento SPED × NF-e",
    status: "128 divergências resolvidas",
  },
  {
    icon: Clock,
    color: "oklch(0.72 0.16 88)",
    label: "Fechamento PIS/COFINS",
    status: "em execução · dia 3/5",
  },
];

function SystemMockup() {
  return (
    <div className="relative mx-auto mt-14 lg:mt-20 max-w-[980px]">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[70%] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.75 0.20 122 / 0.16) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          backgroundColor: "oklch(1 0 0)",
          border: "1px solid oklch(0.92 0.005 110)",
          boxShadow:
            "0 40px 80px -30px oklch(0 0 0 / 0.5), 0 8px 20px -8px oklch(0 0 0 / 0.15)",
        }}
      >
        {/* Browser bar */}
        <div
          className="flex items-center gap-2 px-4 py-3 border-b"
          style={{
            borderColor: "oklch(0.92 0.005 110)",
            backgroundColor: "oklch(0.985 0.004 110)",
          }}
        >
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: "oklch(0.6 0.18 25)" }}
          />
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: "oklch(0.78 0.16 85)" }}
          />
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: "oklch(0.7 0.18 145)" }}
          />
          <span
            className="ml-3 text-[11.5px] font-mono truncate"
            style={{ color: "oklch(0.5 0.015 115)" }}
          >
            psa.iaplicada.com.br
          </span>
        </div>

        <div className="px-5 py-5 lg:px-8 lg:py-7 flex flex-col gap-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <p
                className="text-[10.5px] uppercase tracking-[0.16em] font-semibold"
                style={{ color: "oklch(0.5 0.015 115)" }}
              >
                BI Tributário
              </p>
              <p
                className="mt-1 text-[19px] font-bold tracking-tight"
                style={{ color: "oklch(0.18 0.02 122)" }}
              >
                PSA Consultores
              </p>
            </div>
            <span
              className="inline-flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.1em] px-2.5 py-1 rounded-full"
              style={{
                backgroundColor: "oklch(0.94 0.06 145 / 0.6)",
                color: "oklch(0.4 0.14 145)",
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: "oklch(0.55 0.16 145)" }}
              />
              Auditado · 21/05/2026
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { label: "Assertividade geral", value: "94%", delta: "de 85% em 3 meses" },
              { label: "Profissionais no sistema", value: "110+", delta: "todos no mesmo painel" },
              { label: "Produtividade da área", value: "+100%", delta: "vs. baseline pré-projeto" },
            ].map((k) => (
              <div
                key={k.label}
                className="rounded-xl p-4"
                style={{
                  backgroundColor: "oklch(0.985 0.004 110)",
                  border: "1px solid oklch(0.94 0.005 110)",
                }}
              >
                <p
                  className="text-[10.5px] uppercase tracking-[0.12em] font-semibold"
                  style={{ color: "oklch(0.5 0.015 115)" }}
                >
                  {k.label}
                </p>
                <p
                  className="mt-1.5 text-[22px] font-bold tracking-tight leading-none"
                  style={{ color: "oklch(0.18 0.02 122)" }}
                >
                  {k.value}
                </p>
                <p
                  className="mt-1.5 text-[11px] font-medium"
                  style={{ color: "oklch(0.55 0.16 125)" }}
                >
                  {k.delta}
                </p>
              </div>
            ))}
          </div>

          <div>
            <div className="flex items-center justify-between mb-2.5">
              <p
                className="text-[10.5px] uppercase tracking-[0.12em] font-semibold"
                style={{ color: "oklch(0.5 0.015 115)" }}
              >
                Assertividade por categoria fiscal
              </p>
              <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.1em] font-semibold">
                <span className="inline-flex items-center gap-1.5">
                  <span
                    className="h-2 w-2 rounded-sm"
                    style={{ backgroundColor: "oklch(0.85 0.03 115)" }}
                  />
                  <span style={{ color: "oklch(0.5 0.015 115)" }}>antes</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span
                    className="h-2 w-2 rounded-sm"
                    style={{ backgroundColor: "oklch(0.55 0.16 125)" }}
                  />
                  <span style={{ color: "oklch(0.4 0.14 125)" }}>depois</span>
                </span>
              </div>
            </div>
            <div
              className="rounded-xl p-4"
              style={{
                backgroundColor: "oklch(0.985 0.004 110)",
                border: "1px solid oklch(0.94 0.005 110)",
              }}
            >
              <div className="flex flex-col gap-3">
                {CATEGORIES.map((c) => (
                  <div key={c.label} className="flex items-center gap-3">
                    <span
                      className="text-[11.5px] uppercase tracking-[0.08em] font-semibold shrink-0 w-[70px] sm:w-[90px]"
                      style={{ color: "oklch(0.32 0.02 122)" }}
                    >
                      {c.label}
                    </span>
                    <div className="flex-1 relative h-4 rounded overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 rounded"
                        style={{
                          width: `${c.before}%`,
                          backgroundColor: "oklch(0.9 0.02 115)",
                        }}
                      />
                      <div
                        className="absolute inset-y-0 left-0 rounded"
                        style={{
                          width: `${c.after}%`,
                          background:
                            "linear-gradient(90deg, oklch(0.62 0.17 125), oklch(0.82 0.2 115))",
                        }}
                      />
                    </div>
                    <span
                      className="text-[11px] font-bold shrink-0 w-[70px] text-right tabular-nums"
                      style={{ color: "oklch(0.4 0.14 125)" }}
                    >
                      {c.before}% → {c.after}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <p
              className="text-[10.5px] uppercase tracking-[0.12em] font-semibold mb-2.5"
              style={{ color: "oklch(0.5 0.015 115)" }}
            >
              Última execução
            </p>
            <div className="flex flex-col gap-1.5">
              {TIMELINE.map((t) => {
                const Icon = t.icon;
                return (
                  <div
                    key={t.label}
                    className="flex items-center justify-between gap-3 rounded-lg px-3 py-2.5"
                    style={{
                      backgroundColor: "oklch(0.99 0 0)",
                      border: "1px solid oklch(0.94 0.005 110)",
                    }}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon
                        className="h-3.5 w-3.5 shrink-0"
                        strokeWidth={2.4}
                        style={{ color: t.color }}
                      />
                      <span
                        className="text-[13px] font-semibold truncate"
                        style={{ color: "oklch(0.18 0.02 122)" }}
                      >
                        {t.label}
                      </span>
                    </div>
                    <span
                      className="text-[11.5px] font-medium shrink-0"
                      style={{ color: "oklch(0.5 0.015 115)" }}
                    >
                      {t.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
