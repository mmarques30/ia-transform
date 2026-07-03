import { Reveal } from "@/components/Reveal";
import {
  ArrowRight,
  ArrowUp,
  LayoutDashboard,
  UserPlus,
  Bell,
  FileText,
  Settings,
  Shield,
} from "lucide-react";

/**
 * Systems (LP-A) — mockup coded no visual de painel de controle
 * tributário, com dados fictícios e a mesma camada de animação
 * usada nos mockups da PSA (LP-C): pulse "IA em execução", barras
 * crescendo com stagger, ticker cíclico e step-glow no alerta
 * ativo. Sem nomes/valores reais — o objetivo é sinalizar fluxo
 * de sistema e IA rodando ao vivo, não replicar dashboard de
 * cliente específico.
 */

const KPIS = [
  {
    label: "Clientes ativos",
    value: "42",
    hint: "de 60 mapeados",
    tone: "neutral" as const,
  },
  {
    label: "Volume processado",
    value: "R$ 8,3 mi",
    hint: "últimos 12 meses",
    delta: "+38%",
    tone: "positive" as const,
  },
  {
    label: "Créditos identificados",
    value: "R$ 2,1 mi",
    hint: "IA · média 12%",
    tone: "blue" as const,
  },
  {
    label: "Assertividade IA",
    value: "96%",
    hint: "vs 78% baseline manual",
    tone: "positive" as const,
  },
];

const PROJECTIONS = [
  { label: "Projeção anual", value: "R$ 12,4 mi", tone: "red" },
  { label: "Honorários projetados", value: "R$ 1,8 mi", tone: "yellow" },
  { label: "Prazo estimado", value: "18 meses", tone: "yellow" },
  { label: "Potencial no saldo", value: "R$ 4,7 mi", tone: "green" },
  { label: "Média mensal", value: "R$ 620 k", tone: "green" },
];

const CHART_MONTHS = [
  { m: "M-6", comp: 42, hon: 6 },
  { m: "M-5", comp: 55, hon: 8 },
  { m: "M-4", comp: 48, hon: 7 },
  { m: "M-3", comp: 72, hon: 10 },
  { m: "M-2", comp: 38, hon: 5 },
  { m: "M-1", comp: 62, hon: 9 },
  { m: "Atual", comp: 84, hon: 12 },
];

const DISTRIB = [
  { label: "Acima de R$1M", w: 78, count: "6", color: "#dc2626" },
  { label: "R$500k – R$1M", w: 52, count: "9", color: "#f97316" },
  { label: "Até R$500k", w: 34, count: "17", color: "#eab308" },
  { label: "Saldo zerado", w: 18, count: "10", color: "#a3a3a3" },
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
            <h2 className="h-mix mt-6 text-[28px] sm:text-[36px] lg:text-[44px] text-foreground">
              Não vendemos slides.{" "}
              <em>Entregamos o sistema rodando na sua operação.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-[17px] sm:text-[18px] text-sage leading-[1.6] max-w-[600px] mx-auto">
              Painel de controle tributário com a camada de IA identificando créditos, priorizando
              intimações e projetando cenário mensal em tempo real. Layout de referência com dados
              demonstrativos.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <ControleMockup />
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

function ControleMockup() {
  return (
    <div className="relative mx-auto mt-14 lg:mt-20 max-w-[860px]">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[70%] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.75 0.20 122 / 0.14) 0%, transparent 70%)",
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
        {/* Scan line — feixe verde descendo pelo mockup indicando que
            o sistema está processando linhas de dados ao vivo. */}
        <div aria-hidden className="psa-scan-line" />

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
            controle.iaplicada.com.br
          </div>
        </div>

        {/* System body */}
        <div className="flex" style={{ backgroundColor: "#f2f4f7" }}>
          {/* Sidebar */}
          <div
            className="hidden sm:flex flex-col items-center gap-4 py-4 relative"
            style={{ width: 44, backgroundColor: "#08306b", color: "#ffffff" }}
          >
            <div
              className="h-7 w-7 rounded-md flex items-center justify-center text-[12px] font-bold psa-module-active"
              style={{ backgroundColor: "#0b3a80", color: "#e5edf6" }}
            >
              IA
            </div>
            {[LayoutDashboard, UserPlus, Bell, FileText, Settings, Shield].map((Icon, i) => (
              <div key={i} className="relative">
                <Icon
                  className="h-[14px] w-[14px]"
                  strokeWidth={1.75}
                  style={{ color: i === 0 ? "#89b7ec" : "#4d7bb0" }}
                />
                {/* Sinal de "módulo ativo" — 3 ícones pulsando (dashboard,
                    intimações, integrações). Passa a ideia de sistema
                    processando em várias frentes ao mesmo tempo. */}
                {[0, 2, 5].includes(i) && (
                  <span
                    aria-hidden
                    className="psa-pulse absolute -right-1 -top-1 h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: "#86efac" }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Main */}
          <div className="flex-1 min-w-0 px-3 py-3 sm:px-4 sm:py-4">
            {/* Top bar */}
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-[11.5px] font-bold" style={{ color: "#0a1a2f" }}>
                  Boa noite, equipe.{" "}
                  <span className="font-normal" style={{ color: "#6b7280" }}>
                    terça-feira, 12 de junho
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="text-[8px] font-bold uppercase tracking-[0.1em] inline-flex items-center gap-1 px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: "#dcfce7",
                    color: "#166534",
                  }}
                >
                  <span
                    className="psa-pulse h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: "#16a34a" }}
                  />
                  IA em execução
                </span>
                <span
                  className="text-[8.5px] font-bold uppercase tracking-[0.08em] px-2 py-0.5 rounded-full border"
                  style={{ borderColor: "#c4d1e0", color: "#334155" }}
                >
                  Admin
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
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 mb-3">
              {KPIS.map((k) => {
                const valueColor =
                  k.tone === "positive"
                    ? "#16a34a"
                    : k.tone === "blue"
                      ? "#1d4ed8"
                      : "#0a1a2f";
                return (
                  <div
                    key={k.label}
                    className="rounded-md p-2 relative overflow-hidden"
                    style={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #e5e7eb",
                    }}
                  >
                    <div
                      aria-hidden
                      className="psa-bar-fill absolute inset-x-0 top-0 h-[2px]"
                      style={{
                        transformOrigin: "left center",
                        background: valueColor,
                        opacity: 0.85,
                      }}
                    />
                    <p
                      className="text-[7.5px] uppercase tracking-[0.06em] font-semibold truncate mt-1"
                      style={{ color: "#6b7280" }}
                    >
                      {k.label}
                    </p>
                    <p
                      className="mt-1 text-[15px] font-bold tracking-tight leading-none flex items-baseline gap-1"
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

            {/* Alert com step-glow — IA acabou de priorizar */}
            <div
              className="psa-step-active rounded-md px-2 py-1.5 mb-3 flex items-center justify-between gap-2"
              style={{
                backgroundColor: "#fef2f2",
                border: "1px solid #fecaca",
              }}
            >
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="psa-pulse h-1.5 w-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: "#dc2626" }}
                />
                <p
                  className="text-[9px] font-semibold truncate"
                  style={{ color: "#7f1d1d" }}
                >
                  IA priorizou 7 intimações · 4 vencem em 5 dias
                </p>
              </div>
              <span
                className="text-[8px] font-semibold shrink-0 hidden sm:inline"
                style={{ color: "#7f1d1d" }}
              >
                Ver todas →
              </span>
            </div>

            {/* Projections banner */}
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
            <div className="grid grid-cols-1 sm:grid-cols-[1.4fr_1fr] gap-2 mb-3">
              {/* Chart evolução */}
              <div
                className="rounded-md p-2 sm:p-3"
                style={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb" }}
              >
                <div className="flex items-center justify-between mb-1">
                  <p
                    className="text-[8px] uppercase tracking-[0.06em] font-semibold"
                    style={{ color: "#374151" }}
                  >
                    Evolução mensal — créditos identificados
                  </p>
                  <span
                    className="text-[7px] px-1.5 py-px rounded"
                    style={{ backgroundColor: "#fef9c3", color: "#854d0e" }}
                  >
                    últimos 7m
                  </span>
                </div>
                <div className="flex items-end gap-1 h-[60px] pt-2">
                  {CHART_MONTHS.map((c) => (
                    <div
                      key={c.m}
                      className="flex-1 flex flex-col items-center justify-end gap-0.5"
                    >
                      <div className="flex items-end gap-0.5 w-full justify-center h-full">
                        <div
                          className="psa-bar-loop rounded-t-sm"
                          style={{
                            width: "42%",
                            height: `${c.comp}%`,
                            backgroundColor: "#1d4ed8",
                          }}
                        />
                        <div
                          className="psa-bar-loop rounded-t-sm"
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
                  <span
                    className="text-[6.5px] inline-flex items-center gap-1"
                    style={{ color: "#6b7280" }}
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: "#1d4ed8" }}
                    />
                    Volume
                  </span>
                  <span
                    className="text-[6.5px] inline-flex items-center gap-1"
                    style={{ color: "#6b7280" }}
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: "#f87171" }}
                    />
                    Honorários
                  </span>
                </div>
              </div>

              {/* Distribution — barras com psa-bar-fill em stagger */}
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
                {DISTRIB.map((d) => (
                  <div key={d.label} className="flex items-center gap-1.5 mb-1">
                    <p
                      className="text-[7.5px] w-[70px] shrink-0 truncate"
                      style={{ color: "#374151" }}
                    >
                      {d.label}
                    </p>
                    <div
                      className="flex-1 h-1.5 rounded-full overflow-hidden"
                      style={{ backgroundColor: "#e5e7eb" }}
                    >
                      <div
                        className="psa-bar-fill h-full rounded-full"
                        style={{
                          width: `${d.w}%`,
                          backgroundColor: d.color,
                          transformOrigin: "left center",
                        }}
                      />
                    </div>
                    <p
                      className="text-[7.5px] font-semibold shrink-0 tabular-nums"
                      style={{ color: d.color }}
                    >
                      {d.count}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Ticker live — documentos processados */}
            <div
              className="rounded-md px-3 py-2 flex items-center justify-between gap-3"
              style={{ backgroundColor: "#0a1a2f", color: "#ffffff" }}
            >
              <div className="flex items-center gap-2">
                <span
                  className="psa-pulse h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: "#38bdf8" }}
                />
                <p
                  className="text-[7.5px] uppercase tracking-[0.08em] font-semibold"
                  style={{ color: "#93c5fd" }}
                >
                  Documentos processados hoje
                </p>
                <div
                  className="tabular-nums leading-none"
                  style={{ height: "1em", overflow: "hidden" }}
                >
                  <span
                    className="psa-ticker-track text-[15px] font-bold tracking-tight"
                    style={{ color: "#ffffff", fontFamily: '"Fraunces", Georgia, serif' }}
                  >
                    <div>234</div>
                    <div>246</div>
                    <div>253</div>
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p
                  className="text-[7.5px] uppercase tracking-[0.08em] font-semibold"
                  style={{ color: "#93c5fd" }}
                >
                  Assertividade IA
                </p>
                <p
                  className="mt-0.5 text-[15px] font-bold tracking-tight leading-none"
                  style={{ color: "#86efac", fontFamily: '"Fraunces", Georgia, serif' }}
                >
                  96%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Ambiente stamp */}
        <div
          className="px-4 py-2 text-[9.5px] uppercase tracking-[0.08em] font-semibold text-center"
          style={{
            backgroundColor: "#0a1a2f",
            color: "#89b7ec",
          }}
        >
          Ambiente de demonstração · dados fictícios · Portfólio IAplicada
        </div>
      </div>
    </div>
  );
}
