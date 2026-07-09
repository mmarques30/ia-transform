/**
 * HeroMockup (LP-B) — mockup do painel IAplicada rodando ao lado direito da hero.
 *
 * Substitui a foto/silhueta do fundador do Acelerador. Estrutura fiel ao spec V5
 * aprovado:
 *  - chrome de browser (traffic lights + URL painel.suaempresa.com.br)
 *  - topbar com badge "AO VIVO" pulsante + horário
 *  - 2 KPI tiles (Volume · R$ 482 mil / Alertas IA · 7)
 *  - lista de últimas ações com tags (IA, assinar, whatsapp)
 *  - perspectiva rotateY -6deg + edges fadeando pro preto
 *
 * Sem moldura visível: o mockup parece flutuar no fundo da hero, não é
 * uma caixinha ao lado. Toda a moldura vem via inner border sutil + fade
 * bottom pra dar impressão de bleed contínuo.
 */
export function HeroMockup() {
  return (
    <div className="relative w-full max-w-[560px] mx-auto lg:mx-0">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 60% at 60% 45%, rgba(200,224,64,0.18), transparent 65%), radial-gradient(50% 40% at 30% 70%, rgba(60,80,30,0.25), transparent 70%)",
        }}
      />

      <div
        className="relative overflow-hidden hero-mockup-frame"
        style={{
          transform: "perspective(1600px) rotateY(-6deg) rotateX(2deg)",
          borderRadius: 14,
          background: "linear-gradient(180deg, #0d1008 0%, #05060a 100%)",
          border: "1px solid rgba(200,224,64,0.14)",
          boxShadow: "0 60px 100px -30px rgba(0,0,0,0.7), 0 0 60px -10px rgba(200,224,64,0.18)",
        }}
      >
        {/* Chrome de browser */}
        <div
          className="flex items-center gap-2.5 px-4 py-3"
          style={{
            background: "rgba(10,12,7,0.9)",
            borderBottom: "1px solid rgba(200,224,64,0.08)",
          }}
        >
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ background: "rgba(255,255,255,0.15)" }}
          />
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ background: "rgba(255,255,255,0.15)" }}
          />
          <span className="inline-block h-2 w-2 rounded-full" style={{ background: "#7a8f30" }} />
          <div
            className="ml-2 flex-1 rounded-md px-3 py-1"
            style={{
              background: "rgba(200,224,64,0.06)",
              border: "1px solid rgba(200,224,64,0.12)",
              fontFamily: '"JetBrains Mono", ui-monospace, Menlo, monospace',
              fontSize: 10.5,
              color: "rgba(200,224,64,0.7)",
            }}
          >
            <span style={{ color: "#c8e040", marginRight: 6 }}>🔒</span>
            painel.suaempresa.com.br/operacao
          </div>
        </div>

        {/* Body */}
        <div className="relative px-5 pt-5 pb-14 flex flex-col gap-3.5">
          {/* Topbar */}
          <div className="flex items-center justify-between">
            <span
              className="inline-flex items-center gap-2 text-[10.5px] font-extrabold uppercase tracking-[0.16em] text-foreground"
              style={{ fontFamily: '"JetBrains Mono", ui-monospace, Menlo, monospace' }}
            >
              <span
                className="inline-block h-4 w-4 rounded-full"
                style={{
                  background: "radial-gradient(circle at 30% 30%, #d5e95a, #7a8f30)",
                  boxShadow: "0 0 10px rgba(200,224,64,0.5)",
                }}
              />
              SuaEmpresa · painel
            </span>
            <span
              className="text-[10px] uppercase tracking-[0.14em]"
              style={{
                fontFamily: '"JetBrains Mono", ui-monospace, Menlo, monospace',
                color: "#6a6f5f",
              }}
            >
              <span className="mr-2 psa-pulse font-bold" style={{ color: "var(--color-primary)" }}>
                ● AO VIVO
              </span>
              terça 22:14
            </span>
          </div>

          <h4 className="text-[18px] lg:text-[20px] font-extrabold leading-[1.15] tracking-[-0.015em] text-foreground">
            Boa noite, equipe.{" "}
            <em
              style={{
                fontFamily: '"Instrument Serif", serif',
                color: "var(--color-primary)",
                fontWeight: 500,
              }}
            >
              7 alertas
            </em>{" "}
            pra revisar.
          </h4>

          {/* KPIs */}
          <div className="grid grid-cols-2 gap-2.5">
            <KpiTile label="Volume · hoje" value="R$ 482 mil" delta="↑ 18% vs média" />
            <KpiTile
              label="Alertas · IA"
              value="7 pendências"
              delta="3 aguardando assinatura"
              warn
            />
          </div>

          {/* List header */}
          <div className="mt-1 flex items-center justify-between">
            <span
              className="text-[9px] uppercase tracking-[0.14em] font-bold"
              style={{
                fontFamily: '"JetBrains Mono", ui-monospace, Menlo, monospace',
                color: "#6a6f5f",
              }}
            >
              Últimas ações · piloto automático
            </span>
            <span
              className="px-2 py-[3px] rounded-full text-[9px] font-bold uppercase tracking-[0.14em]"
              style={{
                background: "rgba(200,224,64,0.1)",
                color: "var(--color-primary)",
                border: "1px solid rgba(200,224,64,0.25)",
              }}
            >
              rodando
            </span>
          </div>

          {/* Items */}
          <div className="flex flex-col gap-1.5">
            <MockRow tone="ai" tag={{ label: "IA", tone: "ai" }} meta="agora">
              <b className="text-foreground">Compensação · Cliente #42</b> · rascunho de petição
              pronto
            </MockRow>
            <MockRow tone="wait" tag={{ label: "assinar", tone: "warn" }} meta="2min">
              <b className="text-foreground">Julio Ramos</b> · procuração aguardando validação
            </MockRow>
            <MockRow tone="ok" tag={{ label: "whatsapp", tone: "ok" }} meta="4min">
              <b className="text-foreground">+55 11 98…12</b> · lead qualificado, agendado
            </MockRow>
            <MockRow tone="ai" tag={{ label: "IA", tone: "ai" }} meta="8min">
              <b className="text-foreground">Relatório mensal</b> · consolidado, revisão humana em
              fila
            </MockRow>
          </div>

          {/* Fade footer pra dar impressão de bleed pro preto */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, transparent 60%, rgba(10,12,7,0.85) 100%), linear-gradient(90deg, rgba(10,12,7,0.4) 0%, transparent 20%, transparent 80%, rgba(10,12,7,0.5) 100%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

interface KpiTileProps {
  label: string;
  value: string;
  delta: string;
  warn?: boolean;
}

function KpiTile({ label, value, delta, warn = false }: KpiTileProps) {
  return (
    <div
      className="rounded-[10px] px-3.5 py-3"
      style={{
        background: warn ? "rgba(239,68,68,0.05)" : "rgba(200,224,64,0.05)",
        border: `1px solid ${warn ? "rgba(239,68,68,0.25)" : "rgba(200,224,64,0.14)"}`,
      }}
    >
      <p
        className="text-[8.5px] uppercase tracking-[0.14em] font-extrabold"
        style={{
          color: warn ? "#fca5a5" : "var(--color-primary)",
          fontFamily: '"JetBrains Mono", ui-monospace, Menlo, monospace',
        }}
      >
        {label}
      </p>
      <p
        className="mt-1 text-[20px] lg:text-[22px] text-foreground italic leading-none"
        style={{ fontFamily: '"Instrument Serif", serif' }}
      >
        {value}
      </p>
      <p
        className="mt-1.5 text-[8.5px] tracking-[0.1em] font-bold"
        style={{
          color: warn ? "#fca5a5" : "#d5e95a",
          fontFamily: '"JetBrains Mono", ui-monospace, Menlo, monospace',
        }}
      >
        {delta}
      </p>
    </div>
  );
}

interface MockRowProps {
  tone: "ai" | "wait" | "ok";
  tag: { label: string; tone: "ai" | "warn" | "ok" };
  meta: string;
  children: React.ReactNode;
}

function MockRow({ tone, tag, meta, children }: MockRowProps) {
  const dotColor = tone === "ai" ? "#a78bfa" : tone === "wait" ? "#fbbf24" : "var(--color-primary)";
  const dotGlow =
    tone === "ai"
      ? "0 0 6px rgba(167,139,250,0.6)"
      : tone === "wait"
        ? "0 0 6px rgba(251,191,36,0.5)"
        : "0 0 6px rgba(200,224,64,0.6)";
  const tagBg =
    tag.tone === "ai"
      ? "rgba(167,139,250,0.14)"
      : tag.tone === "warn"
        ? "rgba(239,68,68,0.14)"
        : "rgba(200,224,64,0.1)";
  const tagColor =
    tag.tone === "ai" ? "#c4b5fd" : tag.tone === "warn" ? "#fca5a5" : "var(--color-primary)";

  return (
    <div
      className="grid items-center gap-2.5 px-3 py-[9px] rounded-lg text-[11px] text-foreground"
      style={{
        gridTemplateColumns: "14px 1fr auto",
        background: "rgba(200,224,64,0.03)",
        border: "1px solid rgba(200,224,64,0.08)",
      }}
    >
      <span
        className="inline-block h-1.5 w-1.5 rounded-full"
        style={{ background: dotColor, boxShadow: dotGlow }}
      />
      <span>
        <span
          className="inline-block px-1.5 py-[2px] rounded mr-1.5 text-[8px] font-extrabold uppercase tracking-[0.14em]"
          style={{
            background: tagBg,
            color: tagColor,
            fontFamily: '"JetBrains Mono", ui-monospace, Menlo, monospace',
          }}
        >
          {tag.label}
        </span>
        {children}
      </span>
      <span
        className="text-[9px] uppercase tracking-[0.1em]"
        style={{
          fontFamily: '"JetBrains Mono", ui-monospace, Menlo, monospace',
          color: "#6a6f5f",
        }}
      >
        {meta}
      </span>
    </div>
  );
}
