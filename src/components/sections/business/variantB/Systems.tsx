import { Reveal } from "@/components/Reveal";
import { ArrowRight, Mic, ChevronRight } from "lucide-react";

/**
 * Systems (LP-B) — mockup coded no visual de prontuário clínico,
 * com dados fictícios e a mesma camada de animação usada nos
 * mockups da PSA (LP-C): pulse "IA transcrevendo", barra de
 * progresso crescendo, step-glow no card de gravação ativa e
 * ticker cíclico de sessões documentadas hoje. Sem nomes reais
 * de paciente/profissional — o objetivo é mostrar o fluxo de IA
 * capturando áudio e estruturando SOAP em tempo real.
 */

interface Evolucao {
  data: string;
  weekday: string;
  hora: string;
  profissional: string;
  status: "assinada" | "rascunho";
  subj: string;
  obj: string;
  plano: string;
}

const EVOLUCOES: Evolucao[] = [
  {
    data: "19/06/2026",
    weekday: "sexta-feira",
    hora: "09:00",
    profissional: "Dra. C. R.",
    status: "assinada",
    subj: "Paciente refere melhora no equilíbrio em superfícies irregulares. Manteve adesão aos exercícios em casa durante o feriado.",
    obj: "Escala de equilíbrio: 48/56 (+3 vs sessão anterior). Marcha funcional sem apoio em 12 m. Reflexos preservados bilateralmente.",
    plano: "Progredir treino de equilíbrio para superfícies instáveis (espuma). Adicionar marcha lateral nos exercícios em casa.",
  },
  {
    data: "17/06/2026",
    weekday: "quarta-feira",
    hora: "09:00",
    profissional: "Dra. C. R.",
    status: "assinada",
    subj: "Refere fadiga moderada após semana de feriado. Sem episódios de queda nos últimos 14 dias.",
    obj: "Aplicada avaliação padrão institucional: simetria parcial bilateral. Treino proprioceptivo em apoio bipodal.",
    plano: "Próxima sessão: introduzir suporte lateral cervical durante exercícios de equilíbrio.",
  },
];

const SIDEBAR = [
  {
    section: "Operação",
    items: [
      { label: "Dashboard", active: false },
      { label: "Pacientes", active: true },
      { label: "Prontuário", active: true, indent: true },
      { label: "Agenda", active: false },
      { label: "Frequência", active: false },
    ],
  },
  {
    section: "Financeiro",
    badge: "7",
    items: [
      { label: "Cobranças", active: false },
      { label: "Notas Fiscais", active: false },
      { label: "Relatórios", active: false },
    ],
  },
  {
    section: "Equipe",
    items: [
      { label: "Fisioterapeutas", active: false },
      { label: "Usuários", active: false },
    ],
  },
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
              Prontuário clínico com a camada de IA transcrevendo a sessão por áudio e estruturando
              em Subjetivo · Objetivo · Plano ao vivo. O profissional só revisa e assina. Layout de
              referência com dados demonstrativos.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <ClinicaMockup />
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

function ClinicaMockup() {
  return (
    <div className="relative mx-auto mt-14 lg:mt-20 max-w-[1080px]">
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
            clinica.iaplicada.com.br
          </div>
        </div>

        {/* System body */}
        <div className="flex" style={{ backgroundColor: "#f9fafb", minHeight: 460 }}>
          {/* Sidebar */}
          <div
            className="hidden sm:flex flex-col shrink-0"
            style={{
              width: 168,
              backgroundColor: "#ffffff",
              borderRight: "1px solid #e5e7eb",
            }}
          >
            {/* Logo */}
            <div
              className="px-3 py-3 flex items-center gap-2 border-b"
              style={{ borderColor: "#e5e7eb" }}
            >
              <div
                className="h-7 w-7 rounded-full flex items-center justify-center text-[11px] font-bold text-white shrink-0"
                style={{ background: "linear-gradient(135deg, #86efac, #6b7280)" }}
              >
                ∞
              </div>
              <div className="min-w-0">
                <p className="text-[9.5px] font-bold tracking-tight" style={{ color: "#111827" }}>
                  Clínica
                </p>
                <p className="text-[7px] font-semibold" style={{ color: "#6b7280" }}>
                  Neurofunctional
                </p>
              </div>
            </div>

            {/* Admin/Paciente toggle */}
            <div className="p-2 flex gap-1 border-b" style={{ borderColor: "#e5e7eb" }}>
              <div
                className="flex-1 text-[8.5px] font-semibold text-center py-1 rounded"
                style={{ backgroundColor: "#0d9488", color: "#ffffff" }}
              >
                Admin
              </div>
              <div
                className="flex-1 text-[8.5px] font-semibold text-center py-1 rounded"
                style={{ color: "#6b7280" }}
              >
                Paciente
              </div>
            </div>

            {/* Navigation groups */}
            <div className="flex-1 py-1 overflow-hidden">
              {SIDEBAR.map((g) => (
                <div key={g.section} className="px-2 pt-2">
                  <div className="flex items-center justify-between px-1">
                    <p
                      className="text-[7.5px] uppercase tracking-[0.08em] font-bold"
                      style={{ color: "#9ca3af" }}
                    >
                      {g.section}
                    </p>
                    {g.badge && (
                      <span
                        className="text-[7px] font-bold px-1 py-px rounded-full"
                        style={{ backgroundColor: "#ec4899", color: "#ffffff" }}
                      >
                        {g.badge}
                      </span>
                    )}
                  </div>
                  <div className="mt-0.5 flex flex-col gap-0.5">
                    {g.items.map((item) => (
                      <div
                        key={item.label}
                        className="text-[9px] px-2 py-1 rounded"
                        style={{
                          backgroundColor: item.active ? "#f0fdfa" : "transparent",
                          color: item.active ? "#0d9488" : "#374151",
                          fontWeight: item.active ? 600 : 400,
                          paddingLeft: item.indent ? 14 : 8,
                        }}
                      >
                        {item.label}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <div className="px-2 pt-2">
                <p
                  className="text-[7.5px] uppercase tracking-[0.08em] font-bold px-1"
                  style={{ color: "#9ca3af" }}
                >
                  Configurações
                </p>
                <div className="mt-0.5 flex flex-col gap-0.5">
                  {["Convênios", "Instrumentos clínicos", "Templates", "Integrações"].map((l) => (
                    <div
                      key={l}
                      className="text-[9px] px-2 py-1 rounded"
                      style={{ color: "#374151" }}
                    >
                      {l}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main */}
          <div className="flex-1 min-w-0 px-3 py-3 sm:px-5 sm:py-4">
            {/* Breadcrumb */}
            <div
              className="flex items-center gap-1 text-[8px] font-semibold uppercase tracking-[0.06em] mb-2"
              style={{ color: "#6b7280" }}
            >
              <span>Operação</span>
              <ChevronRight className="h-2.5 w-2.5" />
              <span>Pacientes</span>
              <ChevronRight className="h-2.5 w-2.5" />
              <span>#PT2147</span>
              <ChevronRight className="h-2.5 w-2.5" />
              <span style={{ color: "#0d9488" }}>Prontuário</span>
            </div>

            {/* Patient header */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="min-w-0">
                <p
                  className="text-[19px] font-bold tracking-tight leading-none"
                  style={{ color: "#111827" }}
                >
                  Paciente{" "}
                  <span
                    className="text-[10px] font-normal tabular-nums"
                    style={{ color: "#6b7280" }}
                  >
                    #PT2147
                  </span>
                </p>
                <div className="mt-1.5 flex items-center gap-2">
                  <span
                    className="text-[8px] font-bold uppercase tracking-[0.1em] inline-flex items-center gap-1 px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: "#ccfbf1", color: "#134e4a" }}
                  >
                    <span
                      className="psa-pulse h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: "#0d9488" }}
                    />
                    IA transcrevendo
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  className="text-[8.5px] font-semibold px-2 py-1 rounded inline-flex items-center gap-1"
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e5e7eb",
                    color: "#374151",
                  }}
                >
                  Exportar prontuário
                </button>
                <button
                  className="text-[8.5px] font-semibold px-2 py-1 rounded inline-flex items-center gap-1"
                  style={{ backgroundColor: "#0d9488", color: "#ffffff" }}
                >
                  Gravar evolução
                </button>
              </div>
            </div>

            {/* Info row */}
            <div
              className="rounded-md p-2 mb-3 grid grid-cols-2 sm:grid-cols-4 gap-2"
              style={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb" }}
            >
              {[
                { label: "Tipo", value: "Judicial · Convênio", pill: true },
                { label: "Processo", value: "5xxxxxx-xx.20xx", mono: true },
                { label: "Fisio responsável", value: "Dra. C. R." },
                { label: "Plano", value: "18 / 24 sessões", progress: 75 },
              ].map((r) => (
                <div key={r.label}>
                  <p
                    className="text-[7px] uppercase tracking-[0.06em] font-bold"
                    style={{ color: "#9ca3af" }}
                  >
                    {r.label}
                  </p>
                  {r.pill ? (
                    <span
                      className="mt-0.5 inline-block text-[9px] font-semibold px-1.5 py-px rounded"
                      style={{ backgroundColor: "#fecaca", color: "#9f1239" }}
                    >
                      {r.value}
                    </span>
                  ) : (
                    <>
                      <p
                        className="mt-0.5 text-[10px] font-semibold tabular-nums"
                        style={{
                          color: "#111827",
                          fontFamily: r.mono ? '"JetBrains Mono", monospace' : undefined,
                        }}
                      >
                        {r.value}
                      </p>
                      {r.progress !== undefined && (
                        <div
                          className="mt-1 h-1 rounded-full overflow-hidden"
                          style={{ backgroundColor: "#e5e7eb" }}
                        >
                          <div
                            className="psa-bar-fill h-full rounded-full"
                            style={{
                              width: `${r.progress}%`,
                              backgroundColor: "#0d9488",
                              transformOrigin: "left center",
                            }}
                          />
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div
              className="flex items-center gap-3 border-b mb-3"
              style={{ borderColor: "#e5e7eb" }}
            >
              {[
                { label: "Evolução diária", active: true },
                { label: "Avaliações clínicas", active: false },
                { label: "Documentos", active: false },
                { label: "Histórico de status", active: false },
              ].map((t) => (
                <span
                  key={t.label}
                  className="text-[9px] pb-1.5 whitespace-nowrap"
                  style={{
                    color: t.active ? "#0d9488" : "#6b7280",
                    fontWeight: t.active ? 700 : 400,
                    borderBottom: t.active ? "2px solid #0d9488" : "2px solid transparent",
                    marginBottom: -1,
                  }}
                >
                  {t.label}
                </span>
              ))}
            </div>

            {/* Documentação por áudio card — feature IA com step-glow ativo */}
            <div
              className="psa-step-active rounded-md p-3 mb-3 flex items-center justify-between gap-3"
              style={{
                background: "linear-gradient(90deg, #ccfbf1, #f0fdfa)",
                border: "1px solid #99f6e4",
              }}
            >
              <div className="flex items-start gap-2.5 min-w-0">
                <div
                  className="h-8 w-8 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "#0d9488" }}
                >
                  <Mic className="h-4 w-4 text-white" strokeWidth={2.5} />
                </div>
                <div className="min-w-0">
                  <p
                    className="text-[11px] font-bold inline-flex items-center gap-1.5"
                    style={{ color: "#134e4a" }}
                  >
                    Gravando · IA estruturando SOAP
                    <span
                      className="psa-pulse h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: "#0d9488" }}
                    />
                  </p>
                  <p className="mt-0.5 text-[9px]" style={{ color: "#0f766e" }}>
                    Áudio da sessão em tempo real. A IA transcreve e organiza em Subjetivo ·
                    Objetivo · Plano; o fisioterapeuta revisa e assina.
                  </p>
                  <div
                    className="mt-1.5 h-1 rounded-full overflow-hidden"
                    style={{ backgroundColor: "#a7f3d0" }}
                  >
                    <div
                      className="psa-bar-fill h-full rounded-full"
                      style={{
                        width: "72%",
                        backgroundColor: "#0d9488",
                        transformOrigin: "left center",
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p
                  className="text-[7px] uppercase tracking-[0.08em] font-bold"
                  style={{ color: "#0f766e" }}
                >
                  Minutos
                </p>
                <div
                  className="tabular-nums leading-none mt-0.5"
                  style={{ height: "1em", overflow: "hidden" }}
                >
                  <span
                    className="psa-ticker-track text-[16px] font-bold tracking-tight"
                    style={{
                      color: "#134e4a",
                      fontFamily: '"Fraunces", Georgia, serif',
                    }}
                  >
                    <div>04:12</div>
                    <div>05:38</div>
                    <div>07:14</div>
                  </span>
                </div>
              </div>
            </div>

            {/* Últimas evoluções */}
            <div className="mb-2 flex items-center justify-between">
              <p className="text-[10px] font-bold" style={{ color: "#111827" }}>
                Últimas evoluções
              </p>
              <p
                className="text-[7.5px] uppercase tracking-[0.06em] font-semibold"
                style={{ color: "#9ca3af" }}
              >
                23 entradas em jun/2026
              </p>
            </div>

            <div className="flex flex-col gap-2">
              {EVOLUCOES.map((e) => (
                <div
                  key={e.data}
                  className="rounded-md p-2.5"
                  style={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb" }}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <p className="text-[9px] font-bold" style={{ color: "#111827" }}>
                      {e.data} ·{" "}
                      <span className="font-normal" style={{ color: "#6b7280" }}>
                        {e.weekday} · {e.hora} · {e.profissional}
                      </span>
                    </p>
                    <span
                      className="text-[7px] font-bold uppercase tracking-[0.05em] px-1.5 py-px rounded shrink-0"
                      style={{
                        backgroundColor: e.status === "assinada" ? "#d1fae5" : "#fef3c7",
                        color: e.status === "assinada" ? "#065f46" : "#78350f",
                      }}
                    >
                      {e.status === "assinada" ? "Assinada" : "Rascunho · revisar"}
                    </span>
                  </div>
                  <div className="grid grid-cols-[54px_1fr] gap-x-2 gap-y-0.5 text-[8px]">
                    <p
                      className="uppercase tracking-[0.06em] font-bold"
                      style={{ color: "#9ca3af" }}
                    >
                      Subjetivo
                    </p>
                    <p style={{ color: "#374151" }}>{e.subj}</p>
                    <p
                      className="uppercase tracking-[0.06em] font-bold"
                      style={{ color: "#9ca3af" }}
                    >
                      Objetivo
                    </p>
                    <p style={{ color: "#374151" }}>{e.obj}</p>
                    <p
                      className="uppercase tracking-[0.06em] font-bold"
                      style={{ color: "#9ca3af" }}
                    >
                      Plano
                    </p>
                    <p style={{ color: "#374151" }}>{e.plano}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Ticker footer — sessões documentadas hoje */}
            <div
              className="mt-3 rounded-md px-3 py-2 flex items-center justify-between gap-3"
              style={{ backgroundColor: "#134e4a", color: "#ffffff" }}
            >
              <div className="flex items-center gap-2">
                <span
                  className="psa-pulse h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: "#5eead4" }}
                />
                <p
                  className="text-[7.5px] uppercase tracking-[0.08em] font-semibold"
                  style={{ color: "#99f6e4" }}
                >
                  Sessões documentadas hoje
                </p>
                <div
                  className="tabular-nums leading-none"
                  style={{ height: "1em", overflow: "hidden" }}
                >
                  <span
                    className="psa-ticker-track text-[15px] font-bold tracking-tight"
                    style={{ color: "#ffffff", fontFamily: '"Fraunces", Georgia, serif' }}
                  >
                    <div>08</div>
                    <div>12</div>
                    <div>15</div>
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p
                  className="text-[7.5px] uppercase tracking-[0.08em] font-semibold"
                  style={{ color: "#99f6e4" }}
                >
                  Minutos transcritos
                </p>
                <p
                  className="mt-0.5 text-[15px] font-bold tracking-tight leading-none tabular-nums"
                  style={{ color: "#5eead4", fontFamily: '"Fraunces", Georgia, serif' }}
                >
                  47 min
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Ambiente stamp */}
        <div
          className="px-4 py-2 text-[9.5px] uppercase tracking-[0.08em] font-semibold text-center"
          style={{ backgroundColor: "#134e4a", color: "#5eead4" }}
        >
          Ambiente de demonstração · dados fictícios · Portfólio IAplicada
        </div>
      </div>
    </div>
  );
}
