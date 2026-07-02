import { Reveal } from "@/components/Reveal";
import { ArrowRight, CheckCircle2, Circle, Clock } from "lucide-react";

/**
 * Systems (LP-B / dobra 6) — mockup de "sistema do cliente"
 * construído em código (não é imagem). Simula um painel operacional
 * personalizado com URL própria da empresa, mostrando o "depois"
 * que a LP-B promete: pipeline de processo automatizado + KPIs em
 * tempo real + status dos ativos.
 *
 * O layout foge do braille de placeholders genéricos: usa nome
 * fake ("SuaEmpresa") + URL fake (sua-empresa.iaplicada.com.br)
 * pra deixar claro que o sistema entregue tem branding do cliente.
 */

export function Systems() {
  return (
    <section
      id="sistemas"
      className="section-veil py-[100px] lg:py-[140px] overflow-hidden relative"
    >
      <div className="container-page relative">
        <div className="max-w-[680px] mx-auto text-center">
          <Reveal>
            <span className="label-chip">
              <span className="dot" />
              Sistema em ação
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h-mix mt-6 text-[26px] sm:text-[32px] lg:text-[36px] text-foreground">
              Do caos das planilhas
              <br />
              <em>a um sistema que funciona sozinho.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-[16px] text-sage leading-[1.6] max-w-[560px] mx-auto">
              Painel entregue com o nome e a URL da sua empresa. O time opera direto no fluxo — sem
              planilha por trás, sem SaaS pra assinar.
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
              Quero ver como ficaria no meu negócio
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* Mockup ---------------------------------------------------------- */

const PIPELINE = [
  { label: "Lead", count: 128, active: false },
  { label: "Qualificação", count: 47, active: true },
  { label: "Proposta", count: 19, active: false },
  { label: "Fechado", count: 8, active: false },
];

const PROCESSES = [
  {
    icon: CheckCircle2,
    color: "oklch(0.55 0.16 145)",
    label: "Onboarding de cliente",
    status: "12/12 automáticos",
  },
  {
    icon: Clock,
    color: "oklch(0.72 0.16 88)",
    label: "Fechamento mensal",
    status: "rodando · dia 3/5",
  },
  {
    icon: CheckCircle2,
    color: "oklch(0.55 0.16 145)",
    label: "Follow-up de proposta",
    status: "23 disparos hoje",
  },
  {
    icon: Circle,
    color: "oklch(0.7 0.015 115)",
    label: "Relatório da diretoria",
    status: "próxima execução seg 09h",
  },
];

function SystemMockup() {
  return (
    <div className="relative mx-auto mt-14 lg:mt-20 max-w-[980px]">
      {/* Glow sutil */}
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
            sua-empresa.iaplicada.com.br
          </span>
        </div>

        <div className="px-5 py-5 lg:px-8 lg:py-7 flex flex-col gap-6">
          {/* Header do painel */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <p
                className="text-[10.5px] uppercase tracking-[0.16em] font-semibold"
                style={{ color: "oklch(0.5 0.015 115)" }}
              >
                Painel operacional
              </p>
              <p
                className="mt-1 text-[19px] font-bold tracking-tight"
                style={{ color: "oklch(0.18 0.02 122)" }}
              >
                SuaEmpresa · operação
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
              Ao vivo
            </span>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { label: "Clientes ativos", value: "87", delta: "+23%" },
              { label: "Processos rodando", value: "14", delta: "sem intervenção" },
              { label: "Horas liberadas", value: "62h/mês", delta: "vs. planilha" },
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

          {/* Pipeline horizontal */}
          <div>
            <p
              className="text-[10.5px] uppercase tracking-[0.12em] font-semibold mb-2.5"
              style={{ color: "oklch(0.5 0.015 115)" }}
            >
              Pipeline comercial
            </p>
            <div
              className="rounded-xl p-3 lg:p-4"
              style={{
                backgroundColor: "oklch(0.985 0.004 110)",
                border: "1px solid oklch(0.94 0.005 110)",
              }}
            >
              <div className="flex items-center gap-1 sm:gap-2 overflow-hidden">
                {PIPELINE.map((step, i) => (
                  <div key={step.label} className="flex items-center flex-1 min-w-0 gap-1 sm:gap-2">
                    <div
                      className="flex-1 rounded-lg px-2.5 py-2 min-w-0"
                      style={{
                        backgroundColor: step.active
                          ? "oklch(0.75 0.20 122 / 0.12)"
                          : "oklch(1 0 0)",
                        border: `1px solid ${step.active ? "oklch(0.55 0.16 125 / 0.4)" : "oklch(0.94 0.005 110)"}`,
                      }}
                    >
                      <p
                        className="text-[10px] uppercase tracking-[0.1em] font-semibold truncate"
                        style={{ color: "oklch(0.5 0.015 115)" }}
                      >
                        {step.label}
                      </p>
                      <p
                        className="mt-0.5 text-[15px] font-bold tracking-tight"
                        style={{
                          color: step.active
                            ? "oklch(0.4 0.14 125)"
                            : "oklch(0.18 0.02 122)",
                        }}
                      >
                        {step.count}
                      </p>
                    </div>
                    {i < PIPELINE.length - 1 && (
                      <ArrowRight
                        className="h-3 w-3 shrink-0"
                        style={{ color: "oklch(0.72 0.015 115)" }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Processos ativos */}
          <div>
            <p
              className="text-[10.5px] uppercase tracking-[0.12em] font-semibold mb-2.5"
              style={{ color: "oklch(0.5 0.015 115)" }}
            >
              Processos ativos
            </p>
            <div className="flex flex-col gap-1.5">
              {PROCESSES.map((p) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.label}
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
                        style={{ color: p.color }}
                      />
                      <span
                        className="text-[13px] font-semibold truncate"
                        style={{ color: "oklch(0.18 0.02 122)" }}
                      >
                        {p.label}
                      </span>
                    </div>
                    <span
                      className="text-[11.5px] font-medium shrink-0"
                      style={{ color: "oklch(0.5 0.015 115)" }}
                    >
                      {p.status}
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
