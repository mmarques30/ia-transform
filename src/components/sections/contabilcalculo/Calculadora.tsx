import { useCallback, useState } from "react";
import {
  Calculator,
  ArrowRight,
  ArrowLeft,
  Clock,
  TrendingDown,
  Users,
  Sparkles,
  CheckCircle2,
  MessageCircle,
  AlertCircle,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { FORM_ENDPOINT, FORM_HEADERS, captureTrafficContext } from "@/lib/formSubmit";

/* ─────────────────────────────────────────────────────────────
 * CONSTANTES
 * ────────────────────────────────────────────────────────── */

const FORM_SLUG = "business-contabil";

/** % de redução por tarefa baseado nos benchmarks da IAplicada. */
const TASK_REDUCTION: Record<TaskKey, number> = {
  conciliacao: 0.75,
  atendimento: 0.63,
  apuracao: 0.4,
  guias: 0.53,
  onboarding: 0.5,
  relatorios: 0.67,
};

const TASKS: Array<{ key: TaskKey; label: string; defaultHoras: number }> = [
  { key: "conciliacao", label: "Conciliação bancária e lançamentos", defaultHoras: 40 },
  { key: "atendimento", label: "Atendimento ao cliente (WhatsApp, e-mail, dúvidas)", defaultHoras: 30 },
  { key: "apuracao", label: "Apuração de impostos e revisões", defaultHoras: 25 },
  { key: "guias", label: "Emissão de guias e obrigações acessórias", defaultHoras: 15 },
  { key: "onboarding", label: "Onboarding de novos clientes", defaultHoras: 10 },
  { key: "relatorios", label: "Geração de relatórios gerenciais", defaultHoras: 12 },
];

const GARGALOS: Array<{ key: GargaloKey; label: string }> = [
  { key: "atendimento", label: "Atendimento e dúvidas dos clientes" },
  { key: "conciliacao", label: "Conciliação e lançamentos" },
  { key: "apuracao", label: "Apuração e revisões" },
  { key: "guias", label: "Guias e obrigações acessórias" },
  { key: "onboarding", label: "Onboarding de novos clientes" },
  { key: "relatorios", label: "Relatórios gerenciais" },
];

const MATURIDADES: Array<{ key: MaturidadeKey; label: string }> = [
  { key: "nao-usamos", label: "Não usamos" },
  { key: "testando", label: "Testando" },
  { key: "ja-usamos", label: "Já usamos" },
];

/**
 * Recomendações priorizadas por gargalo. Baseado nos exemplos do brief
 * (página 11 mostrou as 3 do gargalo atendimento). Aqui cobrimos os 6
 * gargalos possíveis.
 */
const RECOMENDACOES: Record<GargaloKey, Array<{ title: string; text: string }>> = {
  atendimento: [
    {
      title: "Agente de WhatsApp para dúvidas recorrentes",
      text: "Responde 24/7 perguntas frequentes dos clientes (guias, prazos, status).",
    },
    {
      title: "Triagem inteligente de e-mails",
      text: "Classifica, prioriza e responde automaticamente mensagens simples.",
    },
    {
      title: "Base de conhecimento conversacional",
      text: "Cliente consulta regras fiscais e do escritório em linguagem natural.",
    },
  ],
  conciliacao: [
    {
      title: "Conciliação bancária automatizada",
      text: "Match de extrato com lançamentos em lote, sinaliza divergências antes do fechamento.",
    },
    {
      title: "Lançamentos por contexto e regra",
      text: "IA classifica histórico baseado em padrões aprendidos do escritório.",
    },
    {
      title: "Validação inteligente de outliers",
      text: "Sinaliza padrões anômalos que indicam erro ou fraude antes do envio.",
    },
  ],
  apuracao: [
    {
      title: "Apuração assistida por IA",
      text: "Calcula impostos sobre movimentações classificadas, com memória de cálculo automática.",
    },
    {
      title: "Conferência cruzada automatizada",
      text: "Compara apuração contra notas, extratos e obrigações pra pegar inconsistência.",
    },
    {
      title: "Geração de revisões antes do envio",
      text: "Sinaliza divergências por cliente, prioriza pelo time revisar onde importa.",
    },
  ],
  guias: [
    {
      title: "Emissão automatizada de guias",
      text: "Gera guias com base na apuração, prontas pra envio. Sem retrabalho manual.",
    },
    {
      title: "Calendário fiscal inteligente",
      text: "Avisa prazos próximos por cliente, com priorização e checklist do que falta.",
    },
    {
      title: "Anexação automática de documentos",
      text: "Pega documentos do escritório e do cliente, organiza por obrigação.",
    },
  ],
  onboarding: [
    {
      title: "Onboarding automatizado de cliente",
      text: "Coleta documentos, valida CNPJ e regime, gera contrato. Em horas, não semanas.",
    },
    {
      title: "Importação inteligente de histórico",
      text: "Migra dados do sistema antigo do cliente direto pro fluxo do escritório.",
    },
    {
      title: "Checklist conversacional via WhatsApp",
      text: "Cliente novo responde e a IA preenche o cadastro automaticamente.",
    },
  ],
  relatorios: [
    {
      title: "Relatórios gerenciais automatizados",
      text: "Gerados mensalmente com gráficos e narrativa em linguagem natural.",
    },
    {
      title: "Painel cliente-pronto em tempo real",
      text: "DRE, fluxo e indicadores atualizados sem ninguém puxar dados manualmente.",
    },
    {
      title: "Alertas proativos por cliente",
      text: "Sinaliza variações relevantes antes do cliente perguntar. Vira consultoria.",
    },
  ],
};

const TOTAL_ETAPAS = 5; // 0 lead + 4 calc

/* ─────────────────────────────────────────────────────────────
 * TYPES
 * ────────────────────────────────────────────────────────── */

type TaskKey =
  | "conciliacao"
  | "atendimento"
  | "apuracao"
  | "guias"
  | "onboarding"
  | "relatorios";
type GargaloKey = TaskKey;
type MaturidadeKey = "nao-usamos" | "testando" | "ja-usamos";

interface LeadData {
  nome: string;
  email: string;
  whatsapp: string;
}
interface Escritorio {
  colaboradores: number;
  clientes: number;
  custoHora: number;
}
type HorasMap = Record<TaskKey, number>;

interface CalculoResultado {
  totalHorasAtuais: number;
  totalHorasLiberadas: number;
  economiaMensal: number;
  economiaAnual: number;
  fteEquivalente: number;
  porTarefa: Array<{
    key: TaskKey;
    label: string;
    horasHoje: number;
    horasComIA: number;
    economiaR$: number;
  }>;
}

interface Score {
  fit: number;
  pain: number;
  readiness: number;
  total: number;
  tier: "A" | "B" | "C" | "D";
}

/* ─────────────────────────────────────────────────────────────
 * HELPERS — cálculo + scoring
 * ────────────────────────────────────────────────────────── */

function calcularEconomia(esc: Escritorio, horas: HorasMap): CalculoResultado {
  const porTarefa = TASKS.map((t) => {
    const horasHoje = horas[t.key];
    const horasComIA = Math.round(horasHoje * (1 - TASK_REDUCTION[t.key]));
    const horasLiberadas = horasHoje - horasComIA;
    return {
      key: t.key,
      label: t.label,
      horasHoje,
      horasComIA,
      economiaR$: horasLiberadas * esc.custoHora,
    };
  });

  const totalHorasAtuais = porTarefa.reduce((s, t) => s + t.horasHoje, 0);
  const totalHorasLiberadas = porTarefa.reduce(
    (s, t) => s + (t.horasHoje - t.horasComIA),
    0,
  );
  const economiaMensal = totalHorasLiberadas * esc.custoHora;
  return {
    totalHorasAtuais,
    totalHorasLiberadas,
    economiaMensal,
    economiaAnual: economiaMensal * 12,
    fteEquivalente: Math.round((totalHorasLiberadas / 176) * 10) / 10,
    porTarefa,
  };
}

function calcularScore(
  esc: Escritorio,
  resultado: CalculoResultado,
  gargalo: GargaloKey,
  maturidade: MaturidadeKey,
): Score {
  // FIT (max 35)
  const fitColab = esc.colaboradores >= 10 ? 15 : 3;
  let fitClientes = 4;
  if (esc.clientes >= 200) fitClientes = 20;
  else if (esc.clientes >= 81) fitClientes = 18;
  else if (esc.clientes >= 31) fitClientes = 15;
  else if (esc.clientes >= 10) fitClientes = 10;
  const fit = fitColab + fitClientes;

  // PAIN (max 40)
  let pain = 5;
  if (resultado.economiaMensal > 50000) pain = 40;
  else if (resultado.economiaMensal > 25000) pain = 33;
  else if (resultado.economiaMensal > 10000) pain = 25;
  else if (resultado.economiaMensal > 3000) pain = 10;

  // READINESS (max 25)
  const gargaloPain: Record<GargaloKey, number> = {
    atendimento: 10,
    conciliacao: 10,
    apuracao: 10,
    relatorios: 10,
    onboarding: 5,
    guias: 5,
  };
  const maturidadePain: Record<MaturidadeKey, number> = {
    "nao-usamos": 6,
    testando: 15,
    "ja-usamos": 10,
  };
  const readiness = gargaloPain[gargalo] + maturidadePain[maturidade];

  const total = fit + pain + readiness;
  let tier: Score["tier"] = "D";
  if (total >= 75) tier = "A";
  else if (total >= 55) tier = "B";
  else if (total >= 35) tier = "C";

  return { fit, pain, readiness, total, tier };
}

function formatR$(n: number): string {
  return n.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });
}

/* ─────────────────────────────────────────────────────────────
 * SUBMIT — pro form-submit do Supabase
 * ────────────────────────────────────────────────────────── */

interface SubmitPayloadFields {
  firstname: string;
  email: string;
  phone: string;
  company?: string;
  // Calculadora — todos ficam em raw_data via Edge Function
  colaboradores?: string;
  clientes_ativos?: string;
  custo_hora?: string;
  horas_conciliacao?: string;
  horas_atendimento?: string;
  horas_apuracao?: string;
  horas_guias?: string;
  horas_onboarding?: string;
  horas_relatorios?: string;
  gargalo_principal?: string;
  maturidade_ia?: string;
  horas_liberadas_mes?: string;
  economia_mensal?: string;
  economia_anual?: string;
  fte_equivalente?: string;
  lead_score?: string;
  fit_score?: string;
  pain_score?: string;
  readiness_score?: string;
  tier?: string;
}

async function postToForm(fields: SubmitPayloadFields): Promise<void> {
  const ctx = captureTrafficContext();
  const payload = {
    form_slug: FORM_SLUG,
    fields,
    utm: ctx.utm,
    attribution: ctx.attribution,
    meta: ctx.meta,
    // Backwards-compat top-level
    utm_source: ctx.utm.source,
    utm_medium: ctx.utm.medium,
    utm_campaign: ctx.utm.campaign,
    utm_term: ctx.utm.term,
    utm_content: ctx.utm.content,
    fbclid: ctx.attribution.fbclid,
    gclid: ctx.attribution.gclid,
  };

  const res = await fetch(FORM_ENDPOINT, {
    method: "POST",
    headers: FORM_HEADERS,
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.error || `Falha (HTTP ${res.status})`);
  }
}

/* ─────────────────────────────────────────────────────────────
 * UI helpers
 * ────────────────────────────────────────────────────────── */

function ProgressBar({ etapa }: { etapa: number }) {
  const pct = Math.round(((etapa + 1) / TOTAL_ETAPAS) * 100);
  return (
    <div>
      <div className="flex items-center justify-between text-[11.5px] uppercase tracking-[0.18em] font-semibold text-muted-foreground">
        <span>
          Etapa {etapa + 1} de {TOTAL_ETAPAS}
        </span>
        <span>{pct}%</span>
      </div>
      <div className="mt-2 h-1 w-full rounded-full bg-border overflow-hidden">
        <div
          className="h-full transition-all duration-300"
          style={{ width: `${pct}%`, backgroundColor: "var(--color-primary)" }}
        />
      </div>
    </div>
  );
}

interface NavProps {
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  loading?: boolean;
  showBack?: boolean;
}
function NavButtons({
  onBack,
  onNext,
  nextLabel = "Próximo",
  nextDisabled,
  loading,
  showBack = true,
}: NavProps) {
  return (
    <div className="mt-8 flex items-center justify-between gap-3">
      {showBack && onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-[14px] font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={2} />
          Voltar
        </button>
      ) : (
        <span />
      )}
      {onNext && (
        <button
          type="button"
          onClick={onNext}
          disabled={nextDisabled || loading}
          className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[14px] font-bold transition-[transform,opacity,box-shadow] disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5"
          style={{
            backgroundColor: "oklch(0.18 0.02 122)",
            color: "oklch(1 0 0)",
            boxShadow: "0 10px 24px -10px oklch(0 0 0 / 0.5)",
          }}
        >
          {loading ? "Enviando..." : nextLabel}
          <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
 * MAIN COMPONENT
 * ────────────────────────────────────────────────────────── */

export function Calculadora() {
  const [etapa, setEtapa] = useState<number>(0);
  const [iniciada, setIniciada] = useState(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const [lead, setLead] = useState<LeadData>({ nome: "", email: "", whatsapp: "" });
  const [escritorio, setEscritorio] = useState<Escritorio>({
    colaboradores: 5,
    clientes: 50,
    custoHora: 60,
  });
  const [horas, setHoras] = useState<HorasMap>({
    conciliacao: 40,
    atendimento: 30,
    apuracao: 25,
    guias: 15,
    onboarding: 10,
    relatorios: 12,
  });
  const [gargalo, setGargalo] = useState<GargaloKey>("atendimento");
  const [maturidade, setMaturidade] = useState<MaturidadeKey>("nao-usamos");

  const resultado = calcularEconomia(escritorio, horas);
  const score = calcularScore(escritorio, resultado, gargalo, maturidade);

  /* — Submissão #1: logo após o lead gate (etapa 0 → 1). Captura mesmo
       se lead abandonar a calculadora. */
  const submitLeadCapture = useCallback(async () => {
    try {
      await postToForm({
        firstname: lead.nome,
        email: lead.email,
        phone: lead.whatsapp,
      });
    } catch (err) {
      // Não bloqueia o avanço — gate é capture-best-effort. O usuário
      // segue pra calculadora e a submissão final terá outra chance.
      console.warn("[calculadora] lead gate submit failed", err);
    }
  }, [lead]);

  /* — Submissão #2: ao terminar etapa 3 (antes de revelar o resultado).
       Envia tudo: lead + calc inputs + scores. Edge Function faz upsert
       por email, então merge com o contact criado no submit #1. */
  const submitFinal = useCallback(async () => {
    setError("");
    setLoading(true);
    try {
      await postToForm({
        firstname: lead.nome,
        email: lead.email,
        phone: lead.whatsapp,
        colaboradores: String(escritorio.colaboradores),
        clientes_ativos: String(escritorio.clientes),
        custo_hora: String(escritorio.custoHora),
        horas_conciliacao: String(horas.conciliacao),
        horas_atendimento: String(horas.atendimento),
        horas_apuracao: String(horas.apuracao),
        horas_guias: String(horas.guias),
        horas_onboarding: String(horas.onboarding),
        horas_relatorios: String(horas.relatorios),
        gargalo_principal: gargalo,
        maturidade_ia: maturidade,
        horas_liberadas_mes: String(resultado.totalHorasLiberadas),
        economia_mensal: String(Math.round(resultado.economiaMensal)),
        economia_anual: String(Math.round(resultado.economiaAnual)),
        fte_equivalente: String(resultado.fteEquivalente),
        lead_score: String(score.total),
        fit_score: String(score.fit),
        pain_score: String(score.pain),
        readiness_score: String(score.readiness),
        tier: score.tier,
      });
      setEtapa(4);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Tente novamente em instantes.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [lead, escritorio, horas, gargalo, maturidade, resultado, score]);

  /* — Validações por etapa */
  const canAdvanceFromGate = lead.nome.trim().length >= 2 && lead.email.includes("@") && lead.whatsapp.trim().length >= 8;
  const canAdvanceFromEscritorio = escritorio.colaboradores > 0 && escritorio.clientes > 0 && escritorio.custoHora > 0;

  const handleNext = async () => {
    setError("");
    if (etapa === 0) {
      // Submissão #1 (não bloqueia avanço)
      void submitLeadCapture();
      setEtapa(1);
      return;
    }
    if (etapa === 1) {
      setEtapa(2);
      return;
    }
    if (etapa === 2) {
      setEtapa(3);
      return;
    }
    if (etapa === 3) {
      await submitFinal();
      return;
    }
  };
  const handleBack = () => {
    if (etapa > 0) setEtapa((e) => e - 1);
  };

  return (
    <section
      id="calculadora"
      className="section-veil py-[80px] lg:py-[120px] relative overflow-hidden scroll-mt-24"
    >
      <div className="container-page relative">
        {/* Header da seção — só no estado inicial */}
        {!iniciada && (
          <div className="max-w-[820px] mx-auto text-center">
            <Reveal>
              <span className="label-chip">
                <span className="dot" />
                Calculadora
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="h-mix mt-6 text-[32px] sm:text-[40px] lg:text-[52px] leading-[1.1] text-foreground">
                Quanto seu escritório <em>ganharia</em> com IA?
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-[15.5px] lg:text-[17px] text-sage leading-[1.6] max-w-[620px] mx-auto">
                4 etapas, 3 minutos. Resultado completo na tela com horas liberadas, economia
                mensal e por onde começar.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-10 flex justify-center">
                <button type="button" onClick={() => setIniciada(true)} className="cta-primary">
                  Começar diagnóstico
                  <span className="arrow">
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </span>
                </button>
              </div>
            </Reveal>
          </div>
        )}

        {/* Wizard — aparece quando iniciada */}
        {iniciada && (
          <div className="max-w-[860px] mx-auto">
            <Reveal>
              <div
                className="rounded-2xl border border-border p-6 lg:p-10"
                style={{ backgroundColor: "oklch(0.18 0.025 122 / 0.55)" }}
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{
                      backgroundColor: "oklch(0.75 0.20 122 / 0.14)",
                      border: "1px solid oklch(0.75 0.20 122 / 0.4)",
                    }}
                  >
                    <Calculator
                      className="h-5 w-5"
                      strokeWidth={2}
                      style={{ color: "var(--color-primary)" }}
                    />
                  </span>
                  <div>
                    <p className="text-[10.5px] uppercase tracking-[0.2em] font-semibold text-muted-foreground">
                      Calculadora
                    </p>
                    <p className="text-[15.5px] lg:text-[17px] font-bold text-foreground tracking-tight">
                      Quanto seu escritório contábil ganharia com IA
                    </p>
                  </div>
                </div>

                {etapa < 4 && <ProgressBar etapa={etapa} />}

                <div className="mt-7">
                  {etapa === 0 && (
                    <LeadGateStep lead={lead} setLead={setLead} />
                  )}
                  {etapa === 1 && (
                    <EscritorioStep escritorio={escritorio} setEscritorio={setEscritorio} />
                  )}
                  {etapa === 2 && <HorasStep horas={horas} setHoras={setHoras} />}
                  {etapa === 3 && (
                    <GargaloStep
                      gargalo={gargalo}
                      setGargalo={setGargalo}
                      maturidade={maturidade}
                      setMaturidade={setMaturidade}
                    />
                  )}
                  {etapa === 4 && (
                    <ResultadoStep
                      lead={lead}
                      resultado={resultado}
                      score={score}
                      gargalo={gargalo}
                    />
                  )}
                </div>

                {error && (
                  <div
                    role="alert"
                    className="mt-5 flex items-start gap-2 rounded-md px-3 py-2.5 text-[13px]"
                    style={{
                      backgroundColor: "oklch(0.96 0.05 25 / 0.18)",
                      border: "1px solid oklch(0.65 0.16 25 / 0.5)",
                      color: "oklch(0.82 0.18 25)",
                    }}
                  >
                    <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" strokeWidth={2} />
                    <span>{error}</span>
                  </div>
                )}

                {etapa < 4 && (
                  <NavButtons
                    onBack={etapa > 0 ? handleBack : undefined}
                    onNext={handleNext}
                    nextLabel={etapa === 3 ? "Ver meu diagnóstico" : "Próximo"}
                    nextDisabled={
                      (etapa === 0 && !canAdvanceFromGate) ||
                      (etapa === 1 && !canAdvanceFromEscritorio)
                    }
                    loading={loading && etapa === 3}
                    showBack={etapa > 0}
                  />
                )}
              </div>
            </Reveal>
          </div>
        )}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
 * ETAPA 0 — Lead gate
 * ────────────────────────────────────────────────────────── */

function LeadGateStep({
  lead,
  setLead,
}: {
  lead: LeadData;
  setLead: (l: LeadData) => void;
}) {
  return (
    <div>
      <p className="text-[16px] lg:text-[18px] font-semibold text-foreground">
        Vamos preparar seu diagnóstico
      </p>
      <p className="mt-1.5 text-[13.5px] text-sage leading-[1.55]">
        Pra mandar a sua trilha personalizada pelo WhatsApp depois.
      </p>

      <div className="mt-6 space-y-4">
        <FieldText
          id="calc-nome"
          label="Nome completo"
          required
          value={lead.nome}
          onChange={(v) => setLead({ ...lead, nome: v })}
          placeholder="Seu nome"
          autoComplete="name"
        />
        <FieldText
          id="calc-email"
          label="E-mail"
          type="email"
          required
          value={lead.email}
          onChange={(v) => setLead({ ...lead, email: v })}
          placeholder="seu@email.com"
          autoComplete="email"
        />
        <FieldText
          id="calc-whats"
          label="WhatsApp com DDD"
          type="tel"
          required
          value={lead.whatsapp}
          onChange={(v) => setLead({ ...lead, whatsapp: v })}
          placeholder="(11) 99999-9999"
          autoComplete="tel"
        />
      </div>

      <p className="mt-5 text-[11.5px] text-muted-foreground leading-[1.5]">
        Ao avançar, você autoriza contato pelo WhatsApp e e-mail. Não vendemos sua lista.
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
 * ETAPA 1 — Sobre o escritório
 * ────────────────────────────────────────────────────────── */

function EscritorioStep({
  escritorio,
  setEscritorio,
}: {
  escritorio: Escritorio;
  setEscritorio: (e: Escritorio) => void;
}) {
  return (
    <div>
      <p className="text-[16px] lg:text-[18px] font-semibold text-foreground">
        Sobre o seu escritório
      </p>
      <p className="mt-1.5 text-[13.5px] text-sage leading-[1.55]">
        Informações básicas para ajustar o cálculo à sua realidade.
      </p>

      <div className="mt-6 space-y-5">
        <FieldNumber
          id="calc-colab"
          label="Quantos colaboradores trabalham no escritório?"
          value={escritorio.colaboradores}
          min={1}
          onChange={(v) => setEscritorio({ ...escritorio, colaboradores: v })}
        />
        <FieldNumber
          id="calc-clientes"
          label="Quantos clientes ativos vocês atendem?"
          value={escritorio.clientes}
          min={1}
          onChange={(v) => setEscritorio({ ...escritorio, clientes: v })}
        />
        <FieldNumber
          id="calc-custo"
          label="Custo médio por hora da equipe (R$)"
          helpText="Inclui salário + encargos. Padrão do mercado: R$ 50 a R$ 80/hora."
          value={escritorio.custoHora}
          min={1}
          onChange={(v) => setEscritorio({ ...escritorio, custoHora: v })}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
 * ETAPA 2 — Horas/mês por tarefa
 * ────────────────────────────────────────────────────────── */

function HorasStep({
  horas,
  setHoras,
}: {
  horas: HorasMap;
  setHoras: (h: HorasMap) => void;
}) {
  const total = TASKS.reduce((s, t) => s + horas[t.key], 0);
  return (
    <div>
      <p className="text-[16px] lg:text-[18px] font-semibold text-foreground">
        Quantas horas por mês em cada tarefa?
      </p>
      <p className="mt-1.5 text-[13.5px] text-sage leading-[1.55]">
        Somando o tempo de toda a equipe. Se não souber exato, estime, a calculadora já vem com
        valores típicos.
      </p>

      <div className="mt-6 space-y-3.5">
        {TASKS.map((t) => (
          <div key={t.key} className="flex items-center justify-between gap-3">
            <label htmlFor={`h-${t.key}`} className="text-[13.5px] lg:text-[14.5px] text-foreground flex-1">
              {t.label}
            </label>
            <div className="flex items-center gap-2 shrink-0">
              <input
                id={`h-${t.key}`}
                type="number"
                min={0}
                value={horas[t.key]}
                onChange={(e) =>
                  setHoras({ ...horas, [t.key]: Math.max(0, Number(e.target.value) || 0) })
                }
                className="w-20 rounded-lg px-3 py-2 text-[14px] font-semibold text-foreground text-right"
                style={{
                  backgroundColor: "oklch(0.12 0.012 122 / 0.6)",
                  border: "1px solid oklch(0.55 0.06 122 / 0.4)",
                }}
              />
              <span className="text-[11.5px] uppercase tracking-[0.14em] font-semibold text-muted-foreground">
                h/mês
              </span>
            </div>
          </div>
        ))}
      </div>

      <div
        className="mt-6 flex items-center justify-between rounded-xl px-5 py-4"
        style={{
          backgroundColor: "oklch(0.12 0.012 122 / 0.6)",
          border: "1px solid oklch(0.55 0.06 122 / 0.4)",
        }}
      >
        <span className="text-[13px] uppercase tracking-[0.16em] font-semibold text-muted-foreground">
          Total atual
        </span>
        <span
          className="num-display text-[22px] lg:text-[26px] leading-none"
          style={{ color: "var(--color-primary)" }}
        >
          {total} h/mês
        </span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
 * ETAPA 3 — Gargalo + Maturidade
 * ────────────────────────────────────────────────────────── */

function GargaloStep({
  gargalo,
  setGargalo,
  maturidade,
  setMaturidade,
}: {
  gargalo: GargaloKey;
  setGargalo: (g: GargaloKey) => void;
  maturidade: MaturidadeKey;
  setMaturidade: (m: MaturidadeKey) => void;
}) {
  return (
    <div>
      <p className="text-[16px] lg:text-[18px] font-semibold text-foreground">
        Onde está o maior gargalo hoje?
      </p>
      <p className="mt-1.5 text-[13.5px] text-sage leading-[1.55]">
        Vamos priorizar as recomendações pra essa área.
      </p>

      <div className="mt-6 space-y-2.5">
        {GARGALOS.map((g) => (
          <button
            key={g.key}
            type="button"
            onClick={() => setGargalo(g.key)}
            className="w-full text-left rounded-xl px-4 py-3 text-[14.5px] transition-colors"
            style={{
              backgroundColor:
                gargalo === g.key ? "oklch(0.75 0.20 122 / 0.12)" : "oklch(0.12 0.012 122 / 0.5)",
              border:
                gargalo === g.key
                  ? "1px solid oklch(0.75 0.20 122 / 0.55)"
                  : "1px solid oklch(0.55 0.06 122 / 0.3)",
              color: gargalo === g.key ? "var(--color-primary)" : "var(--color-foreground)",
              fontWeight: gargalo === g.key ? 600 : 500,
            }}
          >
            {g.label}
          </button>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-border">
        <p className="text-[14.5px] font-semibold text-foreground">
          Vocês já usam alguma ferramenta com IA hoje?
        </p>
        <div className="mt-4 grid grid-cols-3 gap-2.5">
          {MATURIDADES.map((m) => (
            <button
              key={m.key}
              type="button"
              onClick={() => setMaturidade(m.key)}
              className="rounded-xl px-3 py-2.5 text-[13.5px] transition-colors"
              style={{
                backgroundColor:
                  maturidade === m.key
                    ? "oklch(0.75 0.20 122 / 0.12)"
                    : "oklch(0.12 0.012 122 / 0.5)",
                border:
                  maturidade === m.key
                    ? "1px solid oklch(0.75 0.20 122 / 0.55)"
                    : "1px solid oklch(0.55 0.06 122 / 0.3)",
                color:
                  maturidade === m.key ? "var(--color-primary)" : "var(--color-foreground)",
                fontWeight: maturidade === m.key ? 600 : 500,
              }}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
 * ETAPA 4 — Resultado
 * ────────────────────────────────────────────────────────── */

function ResultadoStep({
  lead,
  resultado,
  score,
  gargalo,
}: {
  lead: LeadData;
  resultado: CalculoResultado;
  score: Score;
  gargalo: GargaloKey;
}) {
  const recs = RECOMENDACOES[gargalo];
  const primeiroNome = lead.nome.trim().split(/\s+/)[0] || "você";
  return (
    <div>
      <div className="text-center">
        <span
          className="inline-flex items-center gap-2 text-[11.5px] uppercase tracking-[0.2em] font-semibold"
          style={{ color: "var(--color-primary)" }}
        >
          <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={2.5} />
          Diagnóstico personalizado para {primeiroNome}
        </span>
        <h3 className="h-mix mt-3 text-[24px] sm:text-[30px] lg:text-[36px] text-foreground leading-[1.15]">
          Veja o impacto real da IA no seu escritório
        </h3>
      </div>

      {/* 3 KPI cards */}
      <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <KPICard
          Icon={Clock}
          label="Horas/mês liberadas"
          value={`${resultado.totalHorasLiberadas}h`}
          tint="emerald"
        />
        <KPICard
          Icon={TrendingDown}
          label="Economia/mês"
          value={formatR$(resultado.economiaMensal)}
          tint="blue"
        />
        <KPICard
          Icon={Users}
          label="Equivalente a"
          value={`${resultado.fteEquivalente} FTE`}
          tint="amber"
        />
      </div>

      {/* Economia anual em destaque */}
      <div
        className="mt-4 rounded-2xl p-5 lg:p-6 text-center"
        style={{
          backgroundColor: "oklch(0.13 0.012 122)",
          border: "1px solid oklch(0.35 0.04 125 / 0.5)",
        }}
      >
        <p className="text-[11.5px] uppercase tracking-[0.2em] font-semibold text-muted-foreground">
          Economia projetada em 12 meses
        </p>
        <p
          className="num-display mt-2 text-[36px] lg:text-[48px] leading-none"
          style={{ color: "var(--color-primary)" }}
        >
          {formatR$(resultado.economiaAnual)}
        </p>
      </div>

      {/* Tabela tarefa por tarefa */}
      <div className="mt-7">
        <p className="text-[13.5px] font-semibold text-foreground">
          Veja a conta aberta, tarefa por tarefa
        </p>
        <div className="mt-3 overflow-x-auto -mx-2 px-2">
          <table className="w-full min-w-[440px] text-[13.5px]">
            <thead>
              <tr className="text-[11.5px] uppercase tracking-[0.14em] text-muted-foreground border-b border-border">
                <th className="text-left py-2.5 pr-2 font-semibold">Tarefa</th>
                <th className="text-right py-2.5 px-2 font-semibold">Hoje</th>
                <th className="text-right py-2.5 px-2 font-semibold">Com IA</th>
                <th className="text-right py-2.5 pl-2 font-semibold">Economia</th>
              </tr>
            </thead>
            <tbody>
              {resultado.porTarefa.map((t) => (
                <tr key={t.key} className="border-b border-border/60">
                  <td className="py-3 pr-2 text-foreground">{t.label}</td>
                  <td className="py-3 px-2 text-right text-sage">{t.horasHoje}h</td>
                  <td className="py-3 px-2 text-right text-sage">{t.horasComIA}h</td>
                  <td
                    className="py-3 pl-2 text-right font-bold"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {formatR$(t.economiaR$)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-[11.5px] text-muted-foreground italic">
          Percentuais de redução baseados em benchmarks do setor contábil (40% a 75% conforme a
          tarefa).
        </p>
      </div>

      {/* Recomendações */}
      <div className="mt-7">
        <p className="text-[13.5px] font-semibold text-foreground flex items-center gap-2">
          <Sparkles className="h-4 w-4" strokeWidth={2} style={{ color: "var(--color-primary)" }} />
          Por onde começar (baseado no seu gargalo)
        </p>
        <div className="mt-3 space-y-2.5">
          {recs.map((r, i) => (
            <div
              key={r.title}
              className="rounded-xl border border-border p-4 flex items-start gap-3"
              style={{ backgroundColor: "oklch(0.18 0.025 122 / 0.5)" }}
            >
              <span
                className="num-display shrink-0 inline-flex h-7 w-7 items-center justify-center rounded-full text-[13px]"
                style={{
                  backgroundColor: "oklch(0.75 0.20 122 / 0.14)",
                  border: "1px solid oklch(0.75 0.20 122 / 0.45)",
                  color: "var(--color-primary)",
                }}
              >
                {i + 1}
              </span>
              <div>
                <p className="text-[14.5px] font-bold text-foreground">{r.title}</p>
                <p className="mt-1 text-[13px] text-sage leading-[1.5]">{r.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA final */}
      <div
        className="mt-7 rounded-2xl p-5 lg:p-6"
        style={{
          background: "linear-gradient(135deg, oklch(0.35 0.06 125), oklch(0.45 0.1 122))",
          border: "1px solid oklch(0.75 0.20 122 / 0.55)",
        }}
      >
        <p className="text-[16px] lg:text-[18px] font-bold text-foreground">
          Quer ajuda para implementar?
        </p>
        <p className="mt-1.5 text-[13.5px] text-foreground/85 leading-[1.55]">
          Nosso time analisa o seu diagnóstico e monta uma proposta personalizada pro seu
          escritório.
        </p>
        <a
          href="https://wa.me/5511999999999"
          target="_blank"
          rel="noreferrer noopener"
          className="mt-4 inline-flex items-center gap-2 rounded-full px-5 py-3 text-[14px] font-bold transition-transform hover:-translate-y-0.5"
          style={{
            backgroundColor: "oklch(0.99 0.005 110)",
            color: "oklch(0.18 0.02 122)",
            boxShadow: "0 10px 24px -10px oklch(0 0 0 / 0.5)",
          }}
        >
          <MessageCircle className="h-4 w-4" strokeWidth={2.5} />
          Falar com um especialista
        </a>
      </div>

      {/* Score interno — comentado, vai pro CRM mas não pra tela */}
      <p className="sr-only" aria-hidden>
        Internal score: {score.total}/100 ({score.tier})
      </p>
    </div>
  );
}

function KPICard({
  Icon,
  label,
  value,
  tint,
}: {
  Icon: typeof Clock;
  label: string;
  value: string;
  tint: "emerald" | "blue" | "amber";
}) {
  const tintMap = {
    emerald: { bg: "oklch(0.75 0.20 122 / 0.12)", border: "oklch(0.75 0.20 122 / 0.45)" },
    blue: { bg: "oklch(0.55 0.12 240 / 0.14)", border: "oklch(0.55 0.12 240 / 0.45)" },
    amber: { bg: "oklch(0.75 0.16 80 / 0.14)", border: "oklch(0.75 0.16 80 / 0.45)" },
  } as const;
  const t = tintMap[tint];
  return (
    <div
      className="rounded-2xl p-4 lg:p-5"
      style={{ backgroundColor: t.bg, border: `1px solid ${t.border}` }}
    >
      <Icon className="h-4 w-4 text-foreground/80" strokeWidth={2} />
      <p className="mt-2 text-[10.5px] uppercase tracking-[0.18em] font-semibold text-muted-foreground">
        {label}
      </p>
      <p className="num-display mt-1.5 text-[24px] lg:text-[30px] leading-none text-foreground">
        {value}
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
 * Reusable form fields
 * ────────────────────────────────────────────────────────── */

interface FieldTextProps {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
}
function FieldText({
  id,
  label,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
  autoComplete,
}: FieldTextProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="text-[12px] uppercase tracking-[0.14em] font-semibold text-muted-foreground"
      >
        {label}
        {required && <span className="text-[var(--color-primary)] ml-1">·</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="mt-1.5 w-full rounded-lg px-4 py-2.5 text-[15px] text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40"
        style={{
          backgroundColor: "oklch(0.12 0.012 122 / 0.6)",
          border: "1px solid oklch(0.55 0.06 122 / 0.4)",
        }}
      />
    </div>
  );
}

interface FieldNumberProps {
  id: string;
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  helpText?: string;
}
function FieldNumber({ id, label, value, onChange, min = 0, helpText }: FieldNumberProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="text-[12px] uppercase tracking-[0.14em] font-semibold text-muted-foreground"
      >
        {label}
      </label>
      <input
        id={id}
        type="number"
        value={value}
        min={min}
        onChange={(e) => onChange(Math.max(min, Number(e.target.value) || 0))}
        className="mt-1.5 w-full rounded-lg px-4 py-2.5 text-[15px] text-foreground focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40"
        style={{
          backgroundColor: "oklch(0.12 0.012 122 / 0.6)",
          border: "1px solid oklch(0.55 0.06 122 / 0.4)",
        }}
      />
      {helpText && (
        <p className="mt-1.5 text-[11.5px] text-muted-foreground leading-[1.4]">{helpText}</p>
      )}
    </div>
  );
}
