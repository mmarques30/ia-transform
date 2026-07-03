import { Reveal } from "@/components/Reveal";
import { ArrowRight, CheckCircle2, Clock, Circle } from "lucide-react";

/**
 * Systems (LP-C) — 2 mockups PSA lado a lado com animação.
 *
 * Mockup A: Visão Geral — 4 KPIs + chart horizontal de
 * assertividade por categoria fiscal (barras crescendo com
 * stagger).
 *
 * Mockup B: Apuração ICMS em execução — timeline de 4 steps
 * (2 concluídos, 1 rodando com glow pulse, 1 na fila) +
 * contador live de divergências detectadas que tickam em loop.
 *
 * Fica menor individualmente que o mockup único anterior, mas
 * o duo entrega o visual "sistema real rodando ao vivo" com
 * mais movimento. Compatível com prefers-reduced-motion (CSS
 * em styles.css).
 */

const CATEGORIES = [
  { label: "ICMS", value: 96 },
  { label: "PIS/COFINS", value: 95 },
  { label: "ISS", value: 93 },
  { label: "IRPJ", value: 94 },
  { label: "IPI", value: 92 },
];

const KPIS = [
  { label: "Assertividade", value: "94%", delta: "de 85% em 3m" },
  { label: "Profissionais", value: "110+", delta: "no mesmo sistema" },
  { label: "Produtividade", value: "+100%", delta: "vs baseline" },
  { label: "ROI projetado", value: "R$193k", delta: "/ano" },
];

export function Systems() {
  return (
    <section
      id="sistemas"
      className="section-veil py-[100px] lg:py-[140px] overflow-hidden relative"
    >
      <div className="container-page relative">
        <div className="max-w-[760px] mx-auto text-center">
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
            <p className="mt-6 text-[16px] text-sage leading-[1.6] max-w-[600px] mx-auto">
              Assim é o BI Tributário da PSA Consultores — visão geral à esquerda, apuração rodando
              ao vivo à direita. Dados auditados 21/05/2026.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="hidden md:block">
            <div className="mt-14 lg:mt-20 grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-[1080px] mx-auto items-stretch">
              <VisaoGeralMockup />
              <ApuracaoMockup />
            </div>
          </div>
          <MobileStats
            items={[
              { value: "94%", label: "Assertividade" },
              { value: "110+", label: "Profissionais no sistema" },
              { value: "R$193k", label: "ROI projetado / ano" },
            ]}
          />
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

/**
 * MobileStats — versão simplificada dos 2 mockups PSA pra viewport
 * <768px. Renderiza 3 stat cards empilhados no lugar do duo de mockups
 * que ficaria com fontes microscópicas no mobile.
 */
function MobileStats({ items }: { items: { value: string; label: string }[] }) {
  return (
    <div className="md:hidden mt-10 flex flex-col gap-3 max-w-[380px] mx-auto">
      {items.map((s) => (
        <div
          key={s.label}
          className="rounded-2xl px-5 py-6 text-center"
          style={{
            backgroundColor: "#0b1f0e",
            border: "1px solid #1e3021",
          }}
        >
          <p
            className="text-[36px] font-bold tracking-tight leading-none"
            style={{
              color: "#c8e040",
              fontFamily: '"Fraunces", Georgia, serif',
            }}
          >
            {s.value}
          </p>
          <p
            className="mt-2 text-[11px] uppercase tracking-[0.14em] font-semibold"
            style={{ color: "#6a8c62" }}
          >
            {s.label}
          </p>
        </div>
      ))}
    </div>
  );
}

/* Mockup A — Visão Geral com barras crescendo ------------------ */

function VisaoGeralMockup() {
  return (
    <MockupFrame url="psa.iaplicada.com.br" label="Visão geral">
      <div
        className="flex items-center justify-between px-4 py-2.5 border-b"
        style={{ backgroundColor: "#0b1f0e", borderColor: "#1e3021" }}
      >
        <div className="text-[12px] font-bold" style={{ color: "#e8f5e0" }}>
          <span style={{ color: "#7cc442", marginRight: 4 }}>▸</span>
          PSA · BI Tributário
        </div>
        <div
          className="text-[8px] font-semibold uppercase tracking-[0.1em] inline-flex items-center gap-1"
          style={{ color: "#7cc442" }}
        >
          <span
            className="psa-pulse h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: "#7cc442" }}
          />
          ao vivo
        </div>
      </div>

      {/* KPIs 2x2 */}
      <div className="grid grid-cols-2 gap-2 px-4 py-3" style={{ backgroundColor: "#0a1a0c" }}>
        {KPIS.map((k) => (
          <div
            key={k.label}
            className="rounded-md p-2.5"
            style={{ backgroundColor: "#112514", border: "1px solid #1f3f22" }}
          >
            <p
              className="text-[7.5px] uppercase tracking-[0.08em] font-semibold"
              style={{ color: "#6a8c62" }}
            >
              {k.label}
            </p>
            <p
              className="mt-1 text-[18px] font-bold tracking-tight leading-none"
              style={{ color: "#c8e040", fontFamily: '"Fraunces", Georgia, serif' }}
            >
              {k.value}
            </p>
            <p className="mt-1 text-[8px]" style={{ color: "#4a7044" }}>
              {k.delta}
            </p>
          </div>
        ))}
      </div>

      {/* Chart horizontal — assertividade por categoria */}
      <div className="px-4 pb-4 flex-1 flex flex-col" style={{ backgroundColor: "#0a1a0c" }}>
        <p
          className="text-[8px] uppercase tracking-[0.08em] font-semibold mb-2"
          style={{ color: "#4a7044" }}
        >
          Assertividade por categoria fiscal
        </p>
        <div className="flex flex-col gap-1.5">
          {CATEGORIES.map((c) => (
            <div key={c.label} className="flex items-center gap-2">
              <span
                className="text-[8.5px] font-semibold shrink-0 w-[60px]"
                style={{ color: "#a8c8a0" }}
              >
                {c.label}
              </span>
              <div
                className="flex-1 relative h-2.5 rounded overflow-hidden"
                style={{ backgroundColor: "#112514" }}
              >
                <div
                  className="psa-bar-fill absolute inset-y-0 left-0 rounded"
                  style={{
                    width: `${c.value}%`,
                    background:
                      "linear-gradient(90deg, oklch(0.62 0.17 125), oklch(0.82 0.2 115))",
                  }}
                />
              </div>
              <span
                className="text-[8.5px] font-bold shrink-0 tabular-nums w-[32px] text-right"
                style={{ color: "#c8e040" }}
              >
                {c.value}%
              </span>
            </div>
          ))}
        </div>
      </div>

      <MockupStamp text="Auditado · 21/05/2026" />
    </MockupFrame>
  );
}

/* Mockup B — Apuração ICMS em execução ------------------------- */

function ApuracaoMockup() {
  return (
    <MockupFrame url="psa.iaplicada.com.br/apuracoes" label="Apuração em execução">
      <div
        className="flex items-center justify-between px-4 py-2.5 border-b"
        style={{ backgroundColor: "#0b1f0e", borderColor: "#1e3021" }}
      >
        <div className="text-[12px] font-bold" style={{ color: "#e8f5e0" }}>
          <span style={{ color: "#7cc442", marginRight: 4 }}>▸</span>
          Apuração ICMS · abril/2026
        </div>
        <div
          className="text-[8px] font-semibold uppercase tracking-[0.1em] inline-flex items-center gap-1"
          style={{ color: "#fde68a" }}
        >
          <span
            className="psa-pulse h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: "#fde68a" }}
          />
          em execução
        </div>
      </div>

      {/* Timeline steps */}
      <div className="px-4 py-4 flex-1 flex flex-col gap-2" style={{ backgroundColor: "#0a1a0c" }}>
        <TimelineStep
          Icon={CheckCircle2}
          color="#7cc442"
          label="Coleta SPED × NF-e"
          status="128 documentos"
        />
        <TimelineStep
          Icon={CheckCircle2}
          color="#7cc442"
          label="Cruzamento de créditos"
          status="128 divergências resolvidas"
        />
        <TimelineStep
          Icon={Clock}
          color="#fde68a"
          label="Apuração ICMS abril"
          status="dia 3/5 · 62% concluído"
          active
        />
        <TimelineStep
          Icon={Circle}
          color="#4a7044"
          label="Assinatura digital"
          status="agendado seg 09h"
        />
      </div>

      {/* Ticker live counter */}
      <div
        className="px-4 py-3 border-t flex items-center justify-between gap-3"
        style={{ backgroundColor: "#0b1f0e", borderColor: "#1e3021" }}
      >
        <div>
          <p
            className="text-[7.5px] uppercase tracking-[0.08em] font-semibold"
            style={{ color: "#4a7044" }}
          >
            Divergências detectadas
          </p>
          <div
            className="mt-1 flex items-baseline gap-1 tabular-nums"
            style={{ height: "1em", overflow: "hidden" }}
          >
            <span
              className="psa-ticker-track text-[20px] font-bold tracking-tight leading-none"
              style={{ color: "#c8e040", fontFamily: '"Fraunces", Georgia, serif' }}
            >
              <div>128</div>
              <div>132</div>
              <div>135</div>
            </span>
          </div>
        </div>
        <div className="text-right">
          <p
            className="text-[7.5px] uppercase tracking-[0.08em] font-semibold"
            style={{ color: "#4a7044" }}
          >
            Assertividade projetada
          </p>
          <p
            className="mt-1 text-[20px] font-bold tracking-tight leading-none"
            style={{ color: "#c8e040", fontFamily: '"Fraunces", Georgia, serif' }}
          >
            94%
          </p>
        </div>
      </div>

      <MockupStamp text="Rodando · portfólio IAplicada · jun/2026" />
    </MockupFrame>
  );
}

/* Reusable UI ------------------------------------------------- */

function MockupFrame({
  url,
  label,
  children,
}: {
  url: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="flex flex-col gap-2 h-full">
      <p
        className="text-[11px] uppercase font-semibold tracking-[0.08em] text-center text-sage"
      >
        {label}
      </p>
      <div
        className="rounded-2xl overflow-hidden flex-1 flex flex-col"
        style={{
          border: "1px solid oklch(0.4 0.02 122)",
          boxShadow: "0 30px 60px -25px oklch(0 0 0 / 0.6)",
        }}
      >
        {/* Browser bar */}
        <div className="flex items-center gap-2 px-3 py-2" style={{ backgroundColor: "#e2e1da" }}>
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "#ff5f57" }} />
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "#febc2e" }} />
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "#28c840" }} />
          <div
            className="ml-2 flex-1 rounded px-2 py-0.5 text-[10px] text-center truncate"
            style={{ backgroundColor: "#cdccc5", color: "#555" }}
          >
            {url}
          </div>
        </div>
        {children}
      </div>
    </figure>
  );
}

function MockupStamp({ text }: { text: string }) {
  return (
    <div
      className="px-3 py-1.5 text-[8.5px] uppercase tracking-[0.08em] font-semibold text-center"
      style={{ backgroundColor: "#0b1f0e", color: "#4a7044" }}
    >
      {text}
    </div>
  );
}

function TimelineStep({
  Icon,
  color,
  label,
  status,
  active,
}: {
  Icon: typeof CheckCircle2;
  color: string;
  label: string;
  status: string;
  active?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 rounded-md px-3 py-2 ${active ? "psa-step-active" : ""}`}
      style={{
        backgroundColor: active ? "#182a15" : "#112514",
        border: `1px solid ${active ? "#3a6a36" : "#1f3f22"}`,
      }}
    >
      <Icon className="h-3.5 w-3.5 shrink-0" strokeWidth={2.4} style={{ color }} />
      <div className="flex-1 min-w-0">
        <p className="text-[10.5px] font-semibold" style={{ color: "#a8c8a0" }}>
          {label}
        </p>
        <p className="mt-0.5 text-[8.5px]" style={{ color: "#4a7044" }}>
          {status}
        </p>
      </div>
    </div>
  );
}
