import { Reveal } from "@/components/Reveal";
import { ArrowRight } from "lucide-react";

/**
 * Systems (LP-B / dobra unificada — antes eram Systems + Impact).
 *
 * Mockup coded do workflow de captação da CB Move Neuroscience,
 * alinhado com o ângulo "operação que escala" da LP-B — mostra
 * o fluxo automatizado que permitiu crescimento de 30 → 100+
 * pacientes sem contratar admin extra. Substitui o antigo
 * mockup "SuaEmpresa" fictício + o painel Impact separado.
 *
 * Estilo alinhado com o template lp_c_prova.html (case CB Move).
 */

const STEPS = [
  {
    icon: "📋",
    label: "Lead entra via WhatsApp ou Instagram",
    sub: "Formulário ou mensagem direta",
    badge: "entrada",
  },
  {
    icon: "🤖",
    label: "IA qualifica: dor, urgência, perfil",
    sub: "Categorização automática em <30 segundos",
    badge: "auto",
  },
  {
    icon: "💬",
    label: "Follow-up em até 5 minutos · 3 toques",
    sub: "WhatsApp personalizado por perfil de lead",
    badge: "auto",
  },
];

const RESULTS = [
  { value: "30 → 100+", label: "pacientes atendidos" },
  { value: "+300%", label: "capacidade sem contratar" },
  { value: "R$0", label: "headcount admin extra" },
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
              Do caos das planilhas{" "}
              <em>a um sistema que funciona sozinho.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-[16px] text-sage leading-[1.6] max-w-[600px] mx-auto">
              Assim é o workflow de captação da CB Move Neuroscience — do primeiro contato à
              consulta agendada, sem intervenção humana. Crescimento de 30 pra 100+ pacientes sem
              contratar admin.
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
    <div className="relative mx-auto mt-14 lg:mt-20 max-w-[900px]">
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
            workflow.cbmove.com.br — Captação
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
              CB Move Neuroscience · Workflow de Captação
            </div>
            <div
              className="text-[9px] font-semibold uppercase tracking-[0.1em] inline-flex items-center gap-1.5"
              style={{ color: "#7cc442" }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: "#7cc442" }}
              />
              3 leads ativos
            </div>
          </div>

          {/* Workflow steps */}
          <div
            className="flex flex-col gap-2 px-4 lg:px-6 py-5"
            style={{ backgroundColor: "#0a1a0c" }}
          >
            {STEPS.map((step, i) => (
              <div key={step.label}>
                <div
                  className="rounded-lg px-4 py-3 flex items-center gap-3"
                  style={{
                    backgroundColor: "#112514",
                    border: "1px solid #1f3f22",
                  }}
                >
                  <span
                    className="text-[16px] shrink-0"
                    style={{ width: 22, textAlign: "center" }}
                  >
                    {step.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-[11.5px] font-semibold"
                      style={{ color: "#a8c8a0" }}
                    >
                      {step.label}
                    </p>
                    <p
                      className="mt-0.5 text-[9.5px]"
                      style={{ color: "#4a7044" }}
                    >
                      {step.sub}
                    </p>
                  </div>
                  <span
                    className="text-[9px] font-bold uppercase tracking-[0.05em] shrink-0"
                    style={{ color: "#c8e040" }}
                  >
                    ● {step.badge}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className="text-center text-[14px] leading-none py-1"
                    style={{ color: "#3a5a36" }}
                  >
                    ↓
                  </div>
                )}
              </div>
            ))}

            {/* Final success row */}
            <div className="mt-1">
              <div className="text-center text-[14px] leading-none py-1" style={{ color: "#3a5a36" }}>
                ↓
              </div>
              <div
                className="rounded-lg px-4 py-3 flex items-center justify-between gap-3"
                style={{
                  backgroundColor: "#1a3a1e",
                  border: "1px solid #3a6a36",
                }}
              >
                <p
                  className="text-[12px] font-bold"
                  style={{ color: "#c8e040" }}
                >
                  ✓ Consulta agendada — sem intervenção humana
                </p>
                <span
                  className="text-[10px] font-semibold shrink-0"
                  style={{ color: "#7cc442" }}
                >
                  Jornada &lt; 4h
                </span>
              </div>
            </div>
          </div>

          {/* Results row */}
          <div
            className="grid grid-cols-3 gap-3 px-4 lg:px-5 py-4 border-t"
            style={{
              backgroundColor: "#0b1f0e",
              borderColor: "#1e3021",
            }}
          >
            {RESULTS.map((r) => (
              <div key={r.label} className="text-center">
                <p
                  className="text-[16px] lg:text-[18px] font-bold tracking-tight leading-none"
                  style={{
                    color: "#c8e040",
                    fontFamily: '"Fraunces", Georgia, serif',
                  }}
                >
                  {r.value}
                </p>
                <p
                  className="mt-1 text-[9px] uppercase tracking-[0.06em] font-semibold"
                  style={{ color: "#6a8c62" }}
                >
                  {r.label}
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
            Validado jun/2026 · portfólio IAplicada
          </div>
        </div>
      </div>
    </div>
  );
}
