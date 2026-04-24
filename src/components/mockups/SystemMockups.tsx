import { MessageSquare, FileText, CheckCircle2, Send, Bot, BarChart3 } from "lucide-react";

/** Shared frame so all mockups feel consistent. */
function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute inset-0 p-5 flex flex-col gap-2">
      <div className="flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-border" />
        <span className="h-2 w-2 rounded-full bg-border" />
        <span className="h-2 w-2 rounded-full bg-border" />
      </div>
      {children}
    </div>
  );
}

export function AtendimentoMockup() {
  return (
    <Frame>
      <div className="mt-1 flex items-center gap-2 text-[10px] text-muted-foreground">
        <MessageSquare className="h-3 w-3" strokeWidth={2} />
        <span>Ticket #48291 · fila prioridade</span>
      </div>
      <div className="mt-2 space-y-2">
        <div className="rounded-md border border-border bg-card p-2.5">
          <p className="text-[10px] text-muted-foreground">Cliente</p>
          <p className="text-[11px] text-foreground mt-0.5 leading-tight">
            "Minha assinatura foi cobrada duas vezes, preciso de estorno hoje."
          </p>
        </div>
        <div
          className="rounded-md border p-2.5"
          style={{
            borderColor: "var(--color-primary)",
            backgroundColor: "oklch(0.62 0.17 125 / 0.08)",
          }}
        >
          <div className="flex items-center gap-1.5">
            <Bot className="h-3 w-3 text-primary" strokeWidth={2} />
            <p className="text-[10px] font-semibold text-primary uppercase tracking-wider">
              Resposta sugerida
            </p>
          </div>
          <p className="text-[11px] text-foreground mt-1 leading-tight">
            Identifiquei a duplicidade. Estorno agendado p/ hoje 16h…
          </p>
        </div>
      </div>
      <div className="mt-auto flex gap-1.5">
        <div className="flex-1 rounded bg-primary/10 border border-primary/30 px-2 py-1 text-[10px] text-primary font-semibold text-center">
          Aprovar
        </div>
        <div className="rounded bg-card border border-border px-2 py-1 text-[10px] text-muted-foreground">
          Editar
        </div>
      </div>
    </Frame>
  );
}

export function CopilotoMockup() {
  return (
    <Frame>
      <p className="mt-1 text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
        Proposta · Indústria Alimentícia
      </p>
      <div className="mt-1 space-y-1.5">
        <Line w="90%" />
        <Line w="95%" />
        <Line w="70%" />
        <div className="mt-2 rounded border border-border bg-card p-2">
          <p className="text-[10px] font-semibold text-foreground">Escopo recomendado</p>
          <ul className="mt-1 space-y-0.5">
            {[
              "Migração de 3 linhas em 8 sem",
              "SLA de 99,5% pós-go-live",
              "Entrega em 2 etapas",
            ].map((t) => (
              <li key={t} className="flex items-start gap-1 text-[10px] text-sage leading-tight">
                <CheckCircle2 className="h-2.5 w-2.5 mt-[1px] text-primary" strokeWidth={2.5} />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-auto flex items-center justify-between">
        <p className="text-[10px] text-muted-foreground">Baseado em 12 propostas ganhas</p>
        <Send className="h-3 w-3 text-primary" strokeWidth={2} />
      </div>
    </Frame>
  );
}

export function BackofficeMockup() {
  return (
    <Frame>
      <div className="mt-1 flex items-center justify-between text-[10px] text-muted-foreground">
        <span>Conciliação diária · 12/mar</span>
        <span className="text-primary font-semibold">98,4% auto</span>
      </div>
      <div className="mt-2 rounded border border-border overflow-hidden">
        {[
          { n: "NF-482910", v: "R$ 12.400", ok: true },
          { n: "NF-482911", v: "R$ 8.920", ok: true },
          { n: "NF-482912", v: "R$ 3.200", ok: false },
          { n: "NF-482913", v: "R$ 21.100", ok: true },
        ].map((r, i) => (
          <div
            key={r.n}
            className={`flex items-center justify-between px-2.5 py-1.5 ${
              i > 0 ? "border-t border-border" : ""
            } ${!r.ok ? "bg-primary/5" : ""}`}
          >
            <span className="text-[10px] font-mono text-foreground">{r.n}</span>
            <span className="text-[10px] text-sage">{r.v}</span>
            <span
              className={`text-[9px] uppercase tracking-wider font-semibold ${
                r.ok ? "text-muted-foreground" : "text-primary"
              }`}
            >
              {r.ok ? "ok" : "revisar"}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-auto flex items-center justify-between text-[10px]">
        <span className="text-sage">Divergências</span>
        <span className="font-semibold text-foreground">1 · R$ 3.200</span>
      </div>
    </Frame>
  );
}

export function RelatorioMockup() {
  return (
    <Frame>
      <p className="mt-1 text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
        Semanal · Diretoria comercial
      </p>
      <h4 className="text-[12px] font-semibold text-foreground leading-tight">
        Pipeline cresce 18%, churn cai 2pp
      </h4>
      <div className="mt-2 grid grid-cols-3 gap-1.5">
        {[
          { l: "Pipeline", v: "+18%", up: true },
          { l: "Churn", v: "−2pp", up: true },
          { l: "CAC", v: "−9%", up: true },
        ].map((s) => (
          <div key={s.l} className="rounded border border-border bg-card p-1.5">
            <p className="text-[8px] text-muted-foreground uppercase tracking-wider">{s.l}</p>
            <p
              className="text-[13px] font-bold leading-none mt-0.5"
              style={{ color: "var(--color-primary)" }}
            >
              {s.v}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-2 space-y-1">
        <Line w="85%" />
        <Line w="92%" />
        <Line w="75%" />
      </div>
      <div className="mt-auto flex items-center gap-1 text-[10px] text-muted-foreground">
        <FileText className="h-3 w-3" strokeWidth={2} />
        <span>Exportado pra board · seg 7h</span>
      </div>
    </Frame>
  );
}

export function AssistenteMockup() {
  return (
    <Frame>
      <div className="mt-1 flex items-center gap-1.5">
        <Bot className="h-3 w-3 text-primary" strokeWidth={2} />
        <p className="text-[10px] font-semibold text-foreground">Mari · IA interna</p>
      </div>
      <div className="mt-2 rounded border border-border bg-card p-2">
        <p className="text-[10px] text-muted-foreground">Você</p>
        <p className="text-[11px] text-foreground mt-0.5 leading-tight">
          Quantos dias de férias posso acumular?
        </p>
      </div>
      <div
        className="rounded border p-2"
        style={{
          borderColor: "var(--color-primary)",
          backgroundColor: "oklch(0.62 0.17 125 / 0.08)",
        }}
      >
        <p className="text-[11px] text-foreground leading-tight">
          Até 30 dias, desde que sejam gozados em 2 anos…
        </p>
        <p className="mt-1.5 text-[9px] text-muted-foreground">Fonte: Política de RH v4 · p.12</p>
      </div>
      <Line w="60%" />
    </Frame>
  );
}

export function DashboardMockup() {
  return (
    <Frame>
      <div className="mt-1 rounded border border-border bg-card px-2 py-1.5">
        <p className="text-[10px] text-muted-foreground">Pergunta</p>
        <p className="text-[11px] text-foreground mt-0.5 leading-tight">
          "Como foram as vendas por região mês passado?"
        </p>
      </div>
      <div className="mt-2 rounded border border-border bg-surface/60 p-2">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold text-foreground">Vendas · mar/2026</p>
          <BarChart3 className="h-3 w-3 text-primary" strokeWidth={2} />
        </div>
        <div className="mt-2 flex items-end gap-1 h-12">
          {[60, 45, 85, 70, 55, 92].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm"
              style={{
                height: `${h}%`,
                backgroundColor: i === 5 ? "var(--color-primary)" : "oklch(0.82 0.18 118 / 0.3)",
              }}
            />
          ))}
        </div>
      </div>
      <p className="mt-auto text-[10px] text-sage leading-tight">
        <span className="font-semibold text-foreground">Sul</span> puxou o mês, com +34% vs. média.
      </p>
    </Frame>
  );
}

function Line({ w }: { w: string }) {
  return (
    <div
      className="h-1.5 rounded-full"
      style={{
        width: w,
        backgroundColor: "var(--color-border)",
      }}
    />
  );
}
