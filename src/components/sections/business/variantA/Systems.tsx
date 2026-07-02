import { Reveal } from "@/components/Reveal";
import { ArrowRight, ArrowUp, LayoutDashboard, UserPlus, Bell, FileText, Settings, Shield } from "lucide-react";

/**
 * Systems (LP-A) — mockup coded realista do sistema Focus Fintax
 * (visão operacional), inspirado no dashboard real do cliente.
 * Substitui a versão anterior (que não refletia o sistema deles).
 *
 * Estrutura fiel: sidebar F + greeting "Boa noite, Mariana" +
 * tabs Comercial/Operacional + 5 KPIs coloridos + alert de
 * intimações + banner azul de projeções + chart de evolução
 * mensal + prioridade máxima. Escala reduzida pra caber na LP.
 */

const KPIS = [
  {
    label: "Clientes compensando",
    value: "26",
    hint: "de 81 ativos",
    tone: "neutral" as const,
  },
  {
    label: "Total compensado",
    value: "R$ 15,8 mi",
    hint: "Fev/25 — Abr/26",
    delta: "+391%",
    tone: "positive" as const,
  },
  {
    label: "Honorários gerados",
    value: "R$ 2,4 mi",
    hint: "taxa média 15.0%",
    tone: "blue" as const,
  },
  {
    label: "Economia líquida clientes",
    value: "R$ 13,4 mi",
    hint: "líquido de honorários",
    tone: "positive" as const,
  },
  {
    label: "Saldo de créditos",
    value: "R$ 770,6 mi",
    hint: "disponível para compensar",
    tone: "danger" as const,
  },
];

const PROJECTIONS = [
  { label: "Projeção anual", value: "R$ 31,6 mi", tone: "red" },
  { label: "Honorários projetados / ano", value: "R$ 4,8 mi", tone: "yellow" },
  { label: "Prazo do saldo atual", value: "292.5 meses", tone: "yellow" },
  { label: "Honorários futuros no saldo", value: "R$ 115,9 mi", tone: "green" },
  { label: "Média mensal realizada", value: "R$ 2,6 mi", tone: "green" },
];

const CHART_MONTHS = [
  { m: "Fev/25", comp: 62, hon: 8 },
  { m: "Dez/25", comp: 62, hon: 8 },
  { m: "Jan/26", comp: 92, hon: 10 },
  { m: "Fev/26", comp: 62, hon: 8 },
  { m: "Mar/26", comp: 22, hon: 4 },
  { m: "Abr/26", comp: 50, hon: 6 },
  { m: "Mai/26", comp: 78, hon: 10 },
];

const PRIORIDADE = [
  { name: "Princesa Auto Servico de ...", value: "R$ 187,2 mi", hon: "hon. potencial R$ 28,1 mi" },
  { name: "Supermercados Feira Nov...", value: "R$ 76,4 mi", hon: "hon. potencial R$ 11,5 mi" },
  { name: "Mercado São Fernando 10 ...", value: "R$ 31,6 mi", hon: "hon. potencial R$ 4,7 mi" },
  { name: "Maravista Comercio de Al...", value: "R$ 20,8 mi", hon: "hon. potencial R$ 3,1 mi" },
  { name: "Emporio Petropolis Come...", value: "R$ 20,6 mi", hon: "hon. potencial R$ 3,1 mi" },
];

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
              Assim é a visão operacional da Focus Fintax — R$ 15,8 mi compensado, R$ 13,4 mi de
              economia líquida entregue aos 81 clientes, projeções e prioridade máxima consolidados
              num painel só.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <FocusFintaxMockup />
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

function FocusFintaxMockup() {
  return (
    <div className="relative mx-auto mt-14 lg:mt-20 max-w-[1080px]">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[70%] rounded-full"
        style={{
          background: "radial-gradient(ellipse at center, oklch(0.75 0.20 122 / 0.14) 0%, transparent 70%)",
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
        <div className="flex items-center gap-2 px-4 py-2.5" style={{ backgroundColor: "#e2e1da" }}>
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#ff5f57" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#febc2e" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#28c840" }} />
          <div
            className="ml-2 flex-1 rounded px-3 py-1 text-[11px] text-center truncate"
            style={{ backgroundColor: "#cdccc5", color: "#555" }}
          >
            painel.focusfintax.com.br
          </div>
        </div>

        {/* System body — Focus Fintax layout */}
        <div className="flex" style={{ backgroundColor: "#f2f4f7" }}>
          {/* Sidebar */}
          <div
            className="hidden sm:flex flex-col items-center gap-4 py-4"
            style={{ width: 44, backgroundColor: "#08306b", color: "#ffffff" }}
          >
            <div
              className="h-7 w-7 rounded-full flex items-center justify-center text-[13px] font-bold"
              style={{ backgroundColor: "#0b3a80", color: "#e5edf6" }}
            >
              F
            </div>
            {[LayoutDashboard, UserPlus, Bell, FileText, Settings, Shield].map((Icon, i) => (
              <Icon
                key={i}
                className="h-[14px] w-[14px]"
                strokeWidth={1.75}
                style={{ color: i === 0 ? "#89b7ec" : "#4d7bb0" }}
              />
            ))}
          </div>

          {/* Main */}
          <div className="flex-1 min-w-0 px-3 py-3 sm:px-4 sm:py-4">
            {/* Top bar */}
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-[11.5px] font-bold" style={{ color: "#0a1a2f" }}>
                  Boa noite, Mariana{" "}
                  <span className="font-normal" style={{ color: "#6b7280" }}>
                    quinta-feira, 2 de julho
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="text-[8.5px] font-bold uppercase tracking-[0.08em] px-2 py-0.5 rounded-full border"
                  style={{ borderColor: "#c4d1e0", color: "#334155" }}
                >
                  Admin
                </span>
                <span className="text-[9px] tabular-nums" style={{ color: "#6b7280" }}>
                  20:14
                </span>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center justify-center gap-4 mb-3">
              <span className="text-[10px]" style={{ color: "#6b7280" }}>
                Visão Comercial
              </span>
              <span
                className="text-[10px] font-bold pb-1 border-b-2"
                style={{ color: "#0a1a2f", borderColor: "#0a1a2f" }}
              >
                Visão Operacional
              </span>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 mb-3">
              {KPIS.map((k) => {
                const valueColor =
                  k.tone === "positive"
                    ? "#16a34a"
                    : k.tone === "blue"
                    ? "#1d4ed8"
                    : k.tone === "danger"
                    ? "#dc2626"
                    : "#0a1a2f";
                return (
                  <div
                    key={k.label}
                    className="rounded-md p-1.5 sm:p-2"
                    style={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #e5e7eb",
                    }}
                  >
                    <p
                      className="text-[7.5px] uppercase tracking-[0.06em] font-semibold truncate"
                      style={{ color: "#6b7280" }}
                    >
                      {k.label}
                    </p>
                    <p
                      className="mt-1 text-[13px] sm:text-[15px] font-bold tracking-tight leading-none flex items-baseline gap-1"
                      style={{ color: valueColor }}
                    >
                      {k.value}
                      {k.delta && (
                        <span
                          className="text-[8px] font-semibold inline-flex items-center"
                          style={{ color: "#16a34a" }}
                        >
                          <ArrowUp className="h-2 w-2" strokeWidth={3} />
                          {k.delta}
                        </span>
                      )}
                    </p>
                    <p
                      className="mt-1 text-[7px] truncate"
                      style={{ color: "#9ca3af" }}
                    >
                      {k.hint}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Alert */}
            <div
              className="rounded-md px-2 py-1.5 mb-3 flex items-center justify-between gap-2"
              style={{ backgroundColor: "#fef2f2", border: "1px solid #fecaca" }}
            >
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="h-1.5 w-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: "#dc2626" }}
                />
                <p className="text-[9px] font-semibold truncate" style={{ color: "#7f1d1d" }}>
                  12 intimações fiscais pendentes
                </p>
                <span
                  className="text-[7px] font-bold uppercase tracking-[0.06em] px-1 py-px rounded shrink-0"
                  style={{ backgroundColor: "#fecaca", color: "#7f1d1d" }}
                >
                  11 vencem em 15 dias
                </span>
              </div>
              <span
                className="text-[8px] font-semibold shrink-0 hidden sm:inline"
                style={{ color: "#7f1d1d" }}
              >
                Ver todas →
              </span>
            </div>

            {/* Blue banner projections */}
            <div
              className="rounded-md px-2 py-2 mb-3 grid grid-cols-2 sm:grid-cols-5 gap-1.5"
              style={{
                background: "linear-gradient(90deg, #1e3a8a, #1e40af)",
                color: "#ffffff",
              }}
            >
              {PROJECTIONS.map((p) => (
                <div key={p.label}>
                  <p
                    className="text-[6.5px] uppercase tracking-[0.06em] font-semibold truncate"
                    style={{ color: "#c7d2fe" }}
                  >
                    {p.label}
                  </p>
                  <p
                    className="mt-0.5 text-[11px] sm:text-[12.5px] font-bold tracking-tight leading-none"
                    style={{
                      color:
                        p.tone === "red"
                          ? "#fca5a5"
                          : p.tone === "yellow"
                          ? "#fde68a"
                          : "#86efac",
                    }}
                  >
                    {p.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Chart + Distribution */}
            <div className="grid grid-cols-1 sm:grid-cols-[1.6fr_1fr] gap-2 mb-3">
              {/* Chart */}
              <div
                className="rounded-md p-2 sm:p-3"
                style={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb" }}
              >
                <div className="flex items-center justify-between mb-1">
                  <p
                    className="text-[8px] uppercase tracking-[0.06em] font-semibold"
                    style={{ color: "#374151" }}
                  >
                    Evolução mensal — compensações
                  </p>
                  <span
                    className="text-[7px] px-1.5 py-px rounded"
                    style={{ backgroundColor: "#fef9c3", color: "#854d0e" }}
                  >
                    Fev/25 — Abr/26
                  </span>
                </div>
                <div className="flex items-end gap-1 h-[60px] pt-2">
                  {CHART_MONTHS.map((c) => (
                    <div key={c.m} className="flex-1 flex flex-col items-center justify-end gap-0.5">
                      <div className="flex items-end gap-0.5 w-full justify-center h-full">
                        <div
                          className="rounded-t-sm"
                          style={{
                            width: "42%",
                            height: `${c.comp}%`,
                            backgroundColor: "#1d4ed8",
                          }}
                        />
                        <div
                          className="rounded-t-sm"
                          style={{
                            width: "42%",
                            height: `${c.hon}%`,
                            backgroundColor: "#f87171",
                          }}
                        />
                      </div>
                      <p className="text-[6px]" style={{ color: "#9ca3af" }}>
                        {c.m}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[6.5px] inline-flex items-center gap-1" style={{ color: "#6b7280" }}>
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: "#1d4ed8" }}
                    />
                    Compensado
                  </span>
                  <span className="text-[6.5px] inline-flex items-center gap-1" style={{ color: "#6b7280" }}>
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: "#f87171" }}
                    />
                    Honorários
                  </span>
                </div>
              </div>

              {/* Distribution */}
              <div
                className="rounded-md p-2 sm:p-3"
                style={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb" }}
              >
                <p
                  className="text-[8px] uppercase tracking-[0.06em] font-semibold mb-1.5"
                  style={{ color: "#374151" }}
                >
                  Distribuição do saldo
                </p>
                {[
                  { label: "Acima de R$1M", w: "88%", count: "11", value: "R$ 433,4 mi", color: "#dc2626" },
                  { label: "R$500k – R$1M", w: "10%", count: "0", value: "—", color: "#f97316" },
                  { label: "Até R$500k", w: "6%", count: "0", value: "—", color: "#a3a3a3" },
                  { label: "Saldo zerado", w: "20%", count: "1", value: "—", color: "#a3a3a3" },
                ].map((d) => (
                  <div key={d.label} className="flex items-center gap-1.5 mb-1">
                    <p
                      className="text-[7.5px] w-[70px] shrink-0 truncate"
                      style={{ color: "#374151" }}
                    >
                      {d.label}
                    </p>
                    <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "#e5e7eb" }}>
                      <div className="h-full rounded-full" style={{ width: d.w, backgroundColor: d.color }} />
                    </div>
                    <p className="text-[7.5px] font-semibold shrink-0 tabular-nums" style={{ color: d.color }}>
                      {d.count}
                    </p>
                    <p className="text-[7px] shrink-0 tabular-nums w-[46px] text-right" style={{ color: "#6b7280" }}>
                      {d.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Prioridade máxima */}
            <div
              className="rounded-md p-2"
              style={{ backgroundColor: "#fef2f2", border: "1px solid #fecaca" }}
            >
              <p
                className="text-[8px] uppercase tracking-[0.06em] font-bold mb-1.5"
                style={{ color: "#7f1d1d" }}
              >
                ● Prioridade máxima — 5 clientes com saldo acima de R$1M
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-1">
                {PRIORIDADE.map((p) => (
                  <div
                    key={p.name}
                    className="rounded p-1.5"
                    style={{ backgroundColor: "#ffffff", border: "1px solid #fecaca" }}
                  >
                    <p
                      className="text-[7px] uppercase tracking-[0.04em] font-semibold truncate"
                      style={{ color: "#374151" }}
                    >
                      {p.name}
                    </p>
                    <p
                      className="mt-0.5 text-[11px] font-bold tracking-tight leading-none"
                      style={{ color: "#dc2626" }}
                    >
                      {p.value}
                    </p>
                    <p className="mt-0.5 text-[6.5px] truncate" style={{ color: "#7f1d1d" }}>
                      {p.hon}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Auditoria stamp */}
        <div
          className="px-4 py-2 text-[9.5px] uppercase tracking-[0.08em] font-semibold text-center"
          style={{
            backgroundColor: "#0a1a2f",
            color: "#89b7ec",
          }}
        >
          Focus Fintax · Painel real em produção · dados auditados jun/2026
        </div>
      </div>
    </div>
  );
}
