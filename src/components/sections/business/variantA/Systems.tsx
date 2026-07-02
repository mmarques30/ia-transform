import { Reveal } from "@/components/Reveal";
import { ArrowRight } from "lucide-react";

/**
 * Systems (LP-A / dobra unificada — antes eram Systems + Impact).
 *
 * Mockup coded do painel operacional da Focus Fintax simulando o
 * "sistema em ação" com números reais dentro do próprio mockup
 * (KPIs + tabela antes×depois + auditoria). Substitui os dois GIFs
 * anteriores + o painel Impact separado.
 *
 * Estilo alinhado com lp_a_problema.html do briefing (Focus Fintax
 * painel: browser bar + tabs + KPI grid + linha antes/depois).
 */

const KPIS = [
  { value: "90h", label: "Liberadas/mês" },
  { value: "14", label: "Automações ativas" },
  { value: "248", label: "Leads/mês" },
  { value: "R$6,9k", label: "Economia estimada" },
];

const PROCESSES = [
  {
    label: "Fechamento mensal",
    before: "5 dias",
    after: "4h",
    economy: "R$3.200/mês",
  },
  {
    label: "Follow-up de leads",
    before: "manual",
    after: "automático",
    economy: "R$2.100/mês",
  },
  {
    label: "Relatório executivo",
    before: "4h/sem",
    after: "zero",
    economy: "R$1.600/mês",
  },
];

const TABS = ["Visão Geral", "Automações", "Relatórios", "SDR"];

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
              Não vendemos slides.{" "}
              <em>Entregamos o sistema rodando na sua operação.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-[16px] text-sage leading-[1.6] max-w-[560px] mx-auto">
              Assim é o painel operacional da Focus Fintax — 14 automações rodando, 90h/mês
              liberadas, R$6.900 de economia medida. Sistema com nome, URL e time do cliente.
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

function SystemMockup() {
  return (
    <div className="relative mx-auto mt-14 lg:mt-20 max-w-[1000px]">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[70%] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.75 0.20 122 / 0.18) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          border: "1px solid oklch(0.4 0.02 122)",
          boxShadow: "0 40px 80px -30px oklch(0 0 0 / 0.7)",
        }}
      >
        {/* Browser bar */}
        <div
          className="flex items-center gap-2 px-4 py-2.5"
          style={{ backgroundColor: "#e2e1da" }}
        >
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#ff5f57" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#febc2e" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#28c840" }} />
          <div
            className="ml-2 flex-1 rounded px-3 py-1 text-[11px] text-center truncate"
            style={{ backgroundColor: "#cdccc5", color: "#555" }}
          >
            painel.focusfintax.com.br — Operacional
          </div>
        </div>

        {/* Client body */}
        <div style={{ backgroundColor: "#0e120d" }}>
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 lg:px-5 py-2.5 border-b"
            style={{ backgroundColor: "#0b1f0e", borderColor: "#1e3021" }}
          >
            <div
              className="text-[13px] font-bold tracking-tight"
              style={{ color: "#e8f5e0" }}
            >
              <span style={{ color: "#7cc442", marginRight: 4 }}>▸</span>
              Focus Fintax · Painel Operacional
            </div>
            <div
              className="text-[9px] font-semibold uppercase tracking-[0.1em] inline-flex items-center gap-1.5"
              style={{ color: "#7cc442" }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: "#7cc442" }}
              />
              ao vivo
            </div>
          </div>

          {/* Tabs */}
          <div
            className="flex gap-1 px-4 lg:px-5 py-1.5 border-b overflow-x-auto"
            style={{ backgroundColor: "#0e1f11", borderColor: "#1a2e1c" }}
          >
            {TABS.map((t, i) => (
              <div
                key={t}
                className="text-[10px] px-3 py-1 rounded font-semibold whitespace-nowrap"
                style={
                  i === 0
                    ? { backgroundColor: "#1a3a1e", color: "#cfe060" }
                    : { color: "#8aad78" }
                }
              >
                {t}
              </div>
            ))}
          </div>

          {/* KPI grid */}
          <div
            className="grid grid-cols-2 sm:grid-cols-4 gap-2 px-4 lg:px-5 py-3"
            style={{ backgroundColor: "#0a1a0c" }}
          >
            {KPIS.map((k) => (
              <div
                key={k.label}
                className="rounded-lg p-3"
                style={{
                  backgroundColor: "#112514",
                  border: "1px solid #1f3f22",
                }}
              >
                <p
                  className="text-[18px] lg:text-[20px] font-bold tracking-tight leading-none"
                  style={{
                    color: "#c8e040",
                    fontFamily: '"Fraunces", Georgia, serif',
                  }}
                >
                  {k.value}
                </p>
                <p
                  className="mt-1.5 text-[8.5px] uppercase tracking-[0.05em] font-semibold"
                  style={{ color: "#6a8c62" }}
                >
                  {k.label}
                </p>
              </div>
            ))}
          </div>

          {/* Table antes/depois */}
          <div className="px-4 lg:px-5 pb-4" style={{ backgroundColor: "#0a1a0c" }}>
            <div
              className="grid gap-1.5 pb-1 border-b mb-1"
              style={{
                gridTemplateColumns: "2fr 1fr 1fr 1fr",
                borderColor: "#1a2e1c",
              }}
            >
              {["Processo", "Antes", "Depois", "Economia"].map((h) => (
                <p
                  key={h}
                  className="text-[8.5px] uppercase tracking-[0.05em] font-semibold"
                  style={{ color: "#4a6a44" }}
                >
                  {h}
                </p>
              ))}
            </div>
            {PROCESSES.map((p) => (
              <div
                key={p.label}
                className="grid gap-1.5 py-2 border-b"
                style={{
                  gridTemplateColumns: "2fr 1fr 1fr 1fr",
                  borderColor: "#0f2012",
                }}
              >
                <p className="text-[10.5px]" style={{ color: "#a8c8a0" }}>
                  {p.label}
                </p>
                <p className="text-[9.5px]" style={{ color: "#4a7044" }}>
                  {p.before}
                </p>
                <p
                  className="text-[10px] font-semibold"
                  style={{ color: "#c8e040" }}
                >
                  {p.after}
                </p>
                <p
                  className="text-[10px] font-semibold"
                  style={{ color: "#c8e040" }}
                >
                  {p.economy}
                </p>
              </div>
            ))}
          </div>

          {/* Auditoria stamp */}
          <div
            className="px-4 lg:px-5 py-2.5 text-[9.5px] uppercase tracking-[0.08em] font-semibold text-center border-t"
            style={{
              backgroundColor: "#0b1f0e",
              borderColor: "#1e3021",
              color: "#4a7044",
            }}
          >
            Dados auditados · portfólio IAplicada · jun/2026
          </div>
        </div>
      </div>
    </div>
  );
}
