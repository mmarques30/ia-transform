import {
  MessageSquare,
  CheckCircle2,
  Send,
  Bot,
  BarChart3,
  Sparkles,
  ShoppingCart,
  Briefcase,
  Factory,
  Users,
  FileText,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Frames                                                             */
/* ------------------------------------------------------------------ */

interface FrameProps {
  children: React.ReactNode;
  /** Background tint by segment — feel of a personalized system */
  tint: string;
  /** Border color (slightly darker than tint) */
  border: string;
}

/** Laptop chrome — wider widget, looks like a desktop app screen */
function LaptopFrame({ children, tint, border }: FrameProps) {
  return (
    <div className="absolute inset-0 p-3 flex flex-col">
      <div
        className="flex-1 rounded-md overflow-hidden flex flex-col"
        style={{ background: tint, border: `1px solid ${border}` }}
      >
        {/* macOS-style title bar */}
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 border-b"
          style={{ borderColor: border, backgroundColor: "oklch(1 0 0 / 0.6)" }}
        >
          <span className="h-2 w-2 rounded-full bg-red-400/60" />
          <span className="h-2 w-2 rounded-full bg-yellow-400/60" />
          <span className="h-2 w-2 rounded-full bg-green-400/60" />
        </div>
        <div className="flex-1 p-3 flex flex-col gap-2 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}

/** Mobile chrome — narrow phone-style widget centered */
function MobileFrame({ children, tint, border }: FrameProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-3">
      <div
        className="h-full w-[58%] rounded-2xl overflow-hidden flex flex-col relative"
        style={{
          background: tint,
          border: `1px solid ${border}`,
          boxShadow: "0 12px 32px -10px oklch(0.18 0.02 122 / 0.25)",
        }}
      >
        {/* iOS-style notch */}
        <div className="flex justify-center pt-2">
          <span className="h-1 w-10 rounded-full" style={{ backgroundColor: border }} />
        </div>
        <div className="flex-1 px-3 pb-3 pt-2 flex flex-col gap-1.5 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}

/** Tablet/dashboard widget — square-ish card, mid sized */
function CardFrame({ children, tint, border }: FrameProps) {
  return (
    <div className="absolute inset-0 p-4 flex flex-col">
      <div
        className="flex-1 rounded-xl p-4 flex flex-col gap-2 overflow-hidden"
        style={{ background: tint, border: `1px solid ${border}` }}
      >
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Tints by segment                                                   */
/* ------------------------------------------------------------------ */

const TINTS = {
  // CX / Atendimento — warm orange wash
  cx: {
    bg: "linear-gradient(180deg, oklch(0.97 0.045 60) 0%, oklch(0.99 0.015 60) 100%)",
    border: "oklch(0.85 0.06 60)",
    accent: "oklch(0.55 0.15 50)",
    label: "oklch(0.45 0.14 50)",
  },
  // Backoffice — neutral cool gray-blue
  backoffice: {
    bg: "linear-gradient(180deg, oklch(0.96 0.025 240) 0%, oklch(0.99 0.01 240) 100%)",
    border: "oklch(0.84 0.05 240)",
    accent: "oklch(0.5 0.13 240)",
    label: "oklch(0.4 0.12 240)",
  },
  // Comercial / Vendas — olive / brand
  comercial: {
    bg: "linear-gradient(180deg, oklch(0.96 0.04 125) 0%, oklch(0.99 0.015 125) 100%)",
    border: "oklch(0.82 0.08 125)",
    accent: "oklch(0.55 0.16 125)",
    label: "oklch(0.42 0.14 125)",
  },
  // Diretoria — premium deep dark
  gestao: {
    bg: "linear-gradient(180deg, oklch(0.22 0.025 122) 0%, oklch(0.16 0.018 122) 100%)",
    border: "oklch(0.32 0.025 122)",
    accent: "oklch(0.82 0.2 115)",
    label: "oklch(0.85 0.04 110)",
  },
  // RH / Interno — soft purple
  interno: {
    bg: "linear-gradient(180deg, oklch(0.96 0.035 290) 0%, oklch(0.99 0.012 290) 100%)",
    border: "oklch(0.85 0.06 290)",
    accent: "oklch(0.52 0.15 290)",
    label: "oklch(0.42 0.13 290)",
  },
  // Dados — soft teal
  dados: {
    bg: "linear-gradient(180deg, oklch(0.95 0.035 195) 0%, oklch(0.99 0.012 195) 100%)",
    border: "oklch(0.82 0.06 195)",
    accent: "oklch(0.5 0.13 195)",
    label: "oklch(0.4 0.12 195)",
  },
} as const;

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

function Line({ w, color }: { w: string; color?: string }) {
  return (
    <div
      className="h-1.5 rounded-full"
      style={{ width: w, backgroundColor: color ?? "oklch(0.85 0.015 122)" }}
    />
  );
}

function ChipSmall({
  Icon,
  label,
  color,
}: {
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  color: string;
}) {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] uppercase tracking-wider font-semibold"
      style={{ backgroundColor: "oklch(1 0 0 / 0.7)", color }}
    >
      <Icon className="h-2.5 w-2.5" strokeWidth={2.5} />
      {label}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Mockups                                                            */
/* ------------------------------------------------------------------ */

/** CX — Triagem de tickets (warm orange laptop app) */
export function AtendimentoMockup() {
  const t = TINTS.cx;
  return (
    <LaptopFrame tint={t.bg} border={t.border}>
      <ChipSmall Icon={ShoppingCart} label="Varejo · CX" color={t.label} />
      <div className="mt-1 flex items-center gap-1.5 text-[9px]" style={{ color: t.label }}>
        <MessageSquare className="h-3 w-3" strokeWidth={2} />
        <span>Ticket #48291 · prioridade</span>
      </div>
      <div
        className="rounded-md border p-2"
        style={{
          backgroundColor: "oklch(1 0 0 / 0.85)",
          borderColor: t.border,
        }}
      >
        <p className="text-[8px]" style={{ color: t.label }}>
          Cliente
        </p>
        <p className="text-[10px] mt-0.5 leading-tight" style={{ color: "oklch(0.18 0.02 122)" }}>
          "Cobrança duplicada, preciso de estorno hoje."
        </p>
      </div>
      <div
        className="rounded-md border p-2"
        style={{
          backgroundColor: `color-mix(in oklab, ${t.accent} 8%, white)`,
          borderColor: t.accent,
        }}
      >
        <div className="flex items-center gap-1">
          <Bot className="h-3 w-3" strokeWidth={2} style={{ color: t.accent }} />
          <p
            className="text-[8px] font-semibold uppercase tracking-wider"
            style={{ color: t.accent }}
          >
            Resposta sugerida
          </p>
        </div>
        <p className="text-[10px] mt-1 leading-tight" style={{ color: "oklch(0.18 0.02 122)" }}>
          Identifiquei a duplicidade. Estorno agendado pra hoje 16h.
        </p>
      </div>
      <div className="mt-auto flex gap-1.5">
        <div
          className="flex-1 rounded px-2 py-1 text-[9px] font-semibold text-center"
          style={{ backgroundColor: t.accent, color: "white" }}
        >
          Aprovar
        </div>
        <div
          className="rounded px-2 py-1 text-[9px]"
          style={{
            backgroundColor: "oklch(1 0 0 / 0.7)",
            color: t.label,
            border: `1px solid ${t.border}`,
          }}
        >
          Editar
        </div>
      </div>
    </LaptopFrame>
  );
}

/** Comercial — Copiloto de proposta (olive brand) */
export function CopilotoMockup() {
  const t = TINTS.comercial;
  return (
    <LaptopFrame tint={t.bg} border={t.border}>
      <ChipSmall Icon={Briefcase} label="Comercial" color={t.label} />
      <p className="mt-1 text-[8px] uppercase tracking-[0.1em]" style={{ color: t.label }}>
        Proposta · Indústria Alimentícia
      </p>
      <div className="space-y-1">
        <Line w="92%" color={t.border} />
        <Line w="80%" color={t.border} />
        <Line w="70%" color={t.border} />
      </div>
      <div
        className="rounded border p-2"
        style={{
          backgroundColor: "oklch(1 0 0 / 0.8)",
          borderColor: t.border,
        }}
      >
        <p className="text-[9px] font-semibold" style={{ color: "oklch(0.18 0.02 122)" }}>
          Escopo recomendado
        </p>
        <ul className="mt-1 space-y-0.5">
          {["Migração 3 linhas em 8 sem", "SLA 99,5% pós-go-live", "Entrega em 2 etapas"].map(
            (x) => (
              <li
                key={x}
                className="flex items-start gap-1 text-[9px] leading-tight"
                style={{ color: t.label }}
              >
                <CheckCircle2
                  className="h-2.5 w-2.5 mt-[1px]"
                  style={{ color: t.accent }}
                  strokeWidth={2.5}
                />
                {x}
              </li>
            ),
          )}
        </ul>
      </div>
      <div className="mt-auto flex items-center justify-between">
        <p className="text-[8px]" style={{ color: t.label }}>
          Baseado em 12 propostas ganhas
        </p>
        <div className="rounded-full p-1" style={{ backgroundColor: t.accent }}>
          <Send className="h-2.5 w-2.5 text-white" strokeWidth={2.5} />
        </div>
      </div>
    </LaptopFrame>
  );
}

/** Backoffice — Conciliação de NF (industrial blue laptop) */
export function BackofficeMockup() {
  const t = TINTS.backoffice;
  return (
    <LaptopFrame tint={t.bg} border={t.border}>
      <ChipSmall Icon={Factory} label="Indústria · Backoffice" color={t.label} />
      <div className="flex items-center justify-between text-[9px]" style={{ color: t.label }}>
        <span>Conciliação · 12/mar</span>
        <span className="font-semibold" style={{ color: t.accent }}>
          98,4% auto
        </span>
      </div>
      <div
        className="rounded border overflow-hidden"
        style={{ backgroundColor: "oklch(1 0 0 / 0.8)", borderColor: t.border }}
      >
        {[
          { n: "NF-482910", v: "R$ 12.400", ok: true },
          { n: "NF-482911", v: "R$ 8.920", ok: true },
          { n: "NF-482912", v: "R$ 3.200", ok: false },
          { n: "NF-482913", v: "R$ 21.100", ok: true },
        ].map((r, i) => (
          <div
            key={r.n}
            className={`flex items-center justify-between px-2 py-1 ${i > 0 ? "border-t" : ""}`}
            style={{
              borderTopColor: t.border,
              backgroundColor: !r.ok
                ? `color-mix(in oklab, ${t.accent} 10%, transparent)`
                : "transparent",
            }}
          >
            <span className="text-[9px] font-mono" style={{ color: "oklch(0.18 0.02 122)" }}>
              {r.n}
            </span>
            <span className="text-[9px]" style={{ color: t.label }}>
              {r.v}
            </span>
            <span
              className="text-[8px] uppercase tracking-wider font-semibold"
              style={{ color: r.ok ? t.label : t.accent }}
            >
              {r.ok ? "ok" : "revisar"}
            </span>
          </div>
        ))}
      </div>
      <div
        className="mt-auto flex items-center justify-between text-[9px]"
        style={{ color: t.label }}
      >
        <span>Divergências</span>
        <span className="font-semibold" style={{ color: "oklch(0.18 0.02 122)" }}>
          1 · R$ 3.200
        </span>
      </div>
    </LaptopFrame>
  );
}

/** Diretoria — Relatório executivo (deep dark card, premium) */
export function RelatorioMockup() {
  const t = TINTS.gestao;
  return (
    <CardFrame tint={t.bg} border={t.border}>
      <div className="flex items-center gap-2">
        <span
          className="h-6 w-6 rounded-md flex items-center justify-center"
          style={{ backgroundColor: t.accent }}
        >
          <FileText
            className="h-3 w-3"
            style={{ color: "oklch(0.18 0.02 122)" }}
            strokeWidth={2.5}
          />
        </span>
        <div>
          <p className="text-[8px] uppercase tracking-[0.1em]" style={{ color: t.label }}>
            Diretoria · semanal
          </p>
          <p className="text-[11px] font-semibold" style={{ color: "white" }}>
            Pipeline +18% · churn −2pp
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {[
          { l: "Pipeline", v: "+18%" },
          { l: "Churn", v: "−2pp" },
          { l: "CAC", v: "−9%" },
        ].map((s) => (
          <div
            key={s.l}
            className="rounded p-1.5"
            style={{
              backgroundColor: "oklch(1 0 0 / 0.06)",
              border: `1px solid ${t.border}`,
            }}
          >
            <p className="text-[7px] uppercase tracking-wider" style={{ color: t.label }}>
              {s.l}
            </p>
            <p className="text-[12px] font-bold leading-none mt-0.5" style={{ color: t.accent }}>
              {s.v}
            </p>
          </div>
        ))}
      </div>
      {/* Bar chart */}
      <div className="mt-1 flex items-end gap-1 h-10">
        {[40, 55, 48, 70, 62, 88].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm"
            style={{
              height: `${h}%`,
              backgroundColor: i === 5 ? t.accent : "oklch(1 0 0 / 0.18)",
            }}
          />
        ))}
      </div>
      <div className="mt-auto flex items-center gap-1 text-[8px]" style={{ color: t.label }}>
        <Sparkles className="h-2.5 w-2.5" strokeWidth={2} />
        <span>Exportado pra board · seg 7h</span>
      </div>
    </CardFrame>
  );
}

/** Interno — Assistente de RH (mobile purple) */
export function AssistenteMockup() {
  const t = TINTS.interno;
  return (
    <MobileFrame tint={t.bg} border={t.border}>
      <ChipSmall Icon={Users} label="RH" color={t.label} />
      <div className="flex items-center gap-1">
        <Bot className="h-3 w-3" style={{ color: t.accent }} strokeWidth={2} />
        <p className="text-[9px] font-semibold" style={{ color: "oklch(0.18 0.02 122)" }}>
          Mari · IA interna
        </p>
      </div>
      <div
        className="rounded-md p-1.5 ml-auto max-w-[80%]"
        style={{
          backgroundColor: "oklch(1 0 0 / 0.85)",
          border: `1px solid ${t.border}`,
        }}
      >
        <p className="text-[9px] leading-tight" style={{ color: "oklch(0.18 0.02 122)" }}>
          Quantos dias de férias posso acumular?
        </p>
      </div>
      <div
        className="rounded-md p-1.5 max-w-[85%]"
        style={{
          backgroundColor: `color-mix(in oklab, ${t.accent} 12%, white)`,
          border: `1px solid ${t.accent}`,
        }}
      >
        <p className="text-[9px] leading-tight" style={{ color: "oklch(0.18 0.02 122)" }}>
          Até 30 dias, gozados em 2 anos.
        </p>
        <p className="mt-1 text-[7px]" style={{ color: t.label }}>
          Política de RH v4 · p.12
        </p>
      </div>
      <div
        className="mt-auto rounded-full px-2 py-1 text-[8px]"
        style={{
          backgroundColor: "oklch(1 0 0 / 0.7)",
          color: t.label,
          border: `1px solid ${t.border}`,
        }}
      >
        Pergunte algo...
      </div>
    </MobileFrame>
  );
}

/** Dados — Dashboard NL (mobile teal) */
export function DashboardMockup() {
  const t = TINTS.dados;
  return (
    <MobileFrame tint={t.bg} border={t.border}>
      <ChipSmall Icon={BarChart3} label="Dados" color={t.label} />
      <div
        className="rounded-md p-1.5"
        style={{
          backgroundColor: "oklch(1 0 0 / 0.85)",
          border: `1px solid ${t.border}`,
        }}
      >
        <p className="text-[8px]" style={{ color: t.label }}>
          Pergunta
        </p>
        <p className="text-[9px] mt-0.5 leading-tight" style={{ color: "oklch(0.18 0.02 122)" }}>
          Vendas por região mês passado?
        </p>
      </div>
      <div
        className="rounded-md p-1.5"
        style={{
          backgroundColor: `color-mix(in oklab, ${t.accent} 6%, white)`,
          border: `1px solid ${t.border}`,
        }}
      >
        <p className="text-[8px] font-semibold" style={{ color: "oklch(0.18 0.02 122)" }}>
          Vendas · mar/2026
        </p>
        <div className="mt-1.5 flex items-end gap-1 h-9">
          {[60, 45, 85, 70, 55, 92].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm"
              style={{
                height: `${h}%`,
                backgroundColor: i === 5 ? t.accent : `color-mix(in oklab, ${t.accent} 30%, white)`,
              }}
            />
          ))}
        </div>
      </div>
      <p className="mt-auto text-[8px] leading-tight" style={{ color: t.label }}>
        <span className="font-semibold" style={{ color: "oklch(0.18 0.02 122)" }}>
          Sul
        </span>{" "}
        puxou o mês · +34% vs. média.
      </p>
    </MobileFrame>
  );
}
