import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
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
  Minus,
  Plus,
  MessageSquare,
  FileSpreadsheet,
  Receipt,
  FileText,
  UserPlus,
  BarChart3,
  ZapOff,
  Zap,
  CheckCircle,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { FORM_ENDPOINT, FORM_HEADERS, captureTrafficContext } from "@/lib/formSubmit";
import { useDiagnostico } from "./DiagnosticoContext";

/* ─────────────────────────────────────────────────────────────
 * CONSTANTES
 * ────────────────────────────────────────────────────────── */

/**
 * Slug do form configurado no CRM com mapeamentos automáticos:
 *   colaboradores → contacts.numero_de_liderados
 *   tier → contacts.lead_tier
 *   lead_score → contacts.lead_score
 *   economia_mensal → contacts.economia_mensal
 *   gargalo_principal → contacts.gargalo_principal
 * Demais campos (horas_*, fit_score, pain_score, etc) ficam em
 * form_submissions.raw_data acessíveis via SQL.
 */
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

const GARGALOS: Array<{ key: GargaloKey; label: string; Icon: LucideIcon }> = [
  { key: "atendimento", label: "Atendimento e dúvidas", Icon: MessageSquare },
  { key: "conciliacao", label: "Conciliação e lançamentos", Icon: FileSpreadsheet },
  { key: "apuracao", label: "Apuração e revisões", Icon: Receipt },
  { key: "guias", label: "Guias e obrigações", Icon: FileText },
  { key: "onboarding", label: "Onboarding de novos clientes", Icon: UserPlus },
  { key: "relatorios", label: "Relatórios gerenciais", Icon: BarChart3 },
];

const MATURIDADES: Array<{ key: MaturidadeKey; label: string; Icon: LucideIcon }> = [
  { key: "nao-usamos", label: "Não usamos", Icon: ZapOff },
  { key: "testando", label: "Testando", Icon: Zap },
  { key: "ja-usamos", label: "Já usamos", Icon: CheckCircle },
];

/**
 * Recomendações priorizadas por gargalo. Cada uma é uma capability real
 * da IAplicada, não genérica. Tag de hora-economizada estimada por
 * recomendação ajuda o lead a sentir o tamanho do ganho concreto.
 */
const RECOMENDACOES: Record<
  GargaloKey,
  Array<{ tag: string; title: string; text: string; impact: string }>
> = {
  atendimento: [
    {
      tag: "Agente de WhatsApp",
      title: "Atendente IA treinado nos documentos do escritório",
      text: "Responde 24/7 com tom da casa, sabe quando escalar pra humano. Cliente não precisa esperar pra saber se a guia já saiu.",
      impact: "~70% das dúvidas resolvidas sem o time",
    },
    {
      tag: "Triagem fiscal",
      title: "Classificação automática de e-mails por intenção",
      text: "Lê e identifica se é dúvida fiscal, pedido de guia, problema de cliente. Prioriza, redireciona e responde os simples sozinho.",
      impact: "Time deixa de abrir 60% dos e-mails recebidos",
    },
    {
      tag: "Base conversacional",
      title: "RAG dos manuais e regras fiscais do escritório",
      text: "Carrega PDFs, planilhas e regras do escritório. Cliente pergunta em linguagem natural, IA responde citando a fonte certa.",
      impact: "Cada cliente vira self-service de 1ª linha",
    },
  ],
  conciliacao: [
    {
      tag: "Lançamentos por contexto",
      title: "Classificação contábil aprendida do histórico do escritório",
      text: "IA estuda os lançamentos antigos por cliente, identifica os padrões e classifica novos em lote — auditável e revisável.",
      impact: "75% dos lançamentos sem toque humano",
    },
    {
      tag: "Match extrato × lançamento",
      title: "Conciliação bancária em lote por contexto",
      text: "Cruza extrato, NF e lançamento por valor, data, descrição e padrões. Sinaliza só o que precisa de olho humano.",
      impact: "Equipe fecha mês 2 dias antes do prazo",
    },
    {
      tag: "Validador de outliers",
      title: "Detecção de anomalias antes do fechamento",
      text: "Compara cliente contra cliente e contra o histórico dele. Pega divergência, fraude e erro de digitação antes do envio.",
      impact: "Reduz a 0 o risco de erro fiscal",
    },
  ],
  apuracao: [
    {
      tag: "Apuração assistida",
      title: "Cálculo de impostos com memória automática",
      text: "Lê o movimento já classificado, aplica o regime certo, gera apuração e memória de cálculo em PDF pronta pra cliente.",
      impact: "De 1 dia para 30 minutos por cliente",
    },
    {
      tag: "Conferência cruzada",
      title: "Cruzamento automático notas × extrato × obrigações",
      text: "Compara as 3 fontes, sinaliza inconsistência por cliente com prioridade. Sem precisar fechar tudo manualmente.",
      impact: "70% menos retrabalho na revisão",
    },
    {
      tag: "Pré-revisão por cliente",
      title: "Ranking dos clientes que precisam de olho humano",
      text: "IA prioriza quem tem mais inconsistência, quem mudou de regime, quem está próximo de auto-arbitramento. Time revisa só os críticos.",
      impact: "Sênior foca onde tem risco real",
    },
  ],
  guias: [
    {
      tag: "Emissão automatizada",
      title: "Geração e envio de guias com calendário próprio",
      text: "Gera guia de cada obrigação, anexa documentos, programa o envio antes do prazo. Cliente recebe sem cobrar.",
      impact: "0 guias atrasadas por esquecimento",
    },
    {
      tag: "Anexação inteligente",
      title: "Organização automática de documentos por obrigação",
      text: "Lê PDFs, identifica o que é (DARF, NF, extrato), arquiva por obrigação e cliente. Acesso instantâneo na próxima vez.",
      impact: "Tempo de busca de doc cai pra zero",
    },
    {
      tag: "Validação fiscal",
      title: "Checagem da guia contra a apuração antes do envio",
      text: "Confere se valor, código e cliente batem com a apuração. Se não bater, pausa e avisa o time.",
      impact: "Erro fiscal vira exceção, não rotina",
    },
  ],
  onboarding: [
    {
      tag: "Onboarding via WhatsApp",
      title: "Cliente novo responde no WhatsApp, IA cadastra",
      text: "Faz as 12 perguntas de cadastro em conversa natural, valida CNPJ, regime e documentos exigidos. Em 30 min, cadastro completo.",
      impact: "Onboarding de 5 dias vira 1 hora",
    },
    {
      tag: "Importação ERP-to-ERP",
      title: "Migração inteligente do sistema antigo do cliente",
      text: "Lê backup ou exportação do sistema anterior. Mapeia plano de contas, histórico de saldos, classifica e importa pro fluxo do escritório.",
      impact: "Migração que levava semanas vira 1 dia",
    },
    {
      tag: "Contratação automatizada",
      title: "Geração de contrato + nota com dados validados",
      text: "Pega CNPJ, regime, porte, gera contrato com cláusulas certas e nota de honorário no padrão do escritório.",
      impact: "Cliente novo entra no fluxo em horas",
    },
  ],
  relatorios: [
    {
      tag: "Relatório com narrativa",
      title: "DRE, fluxo e indicadores com análise em linguagem natural",
      text: "Gera o relatório padrão + um parágrafo explicando o que mudou no mês, o que vale atenção e onde o cliente deveria agir.",
      impact: "Relatório vira consultoria embutida",
    },
    {
      tag: "Painel cliente-pronto",
      title: "Portal do cliente com KPIs vivos atualizados pela IA",
      text: "Cliente entra e vê DRE, fluxo, comparação mês a mês. Tudo atualizado sem ninguém puxar planilha.",
      impact: "Reuniões mensais ficam mais ricas",
    },
    {
      tag: "Alertas proativos",
      title: "IA antecipa o que o cliente vai perguntar",
      text: "Detecta variação relevante (queda de margem, atraso de fornecedor, mudança de regime) e dispara alerta antes do cliente ligar.",
      impact: "Escritório vira parceiro estratégico",
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
  // Dots como progress refinado em vez de barra chunky
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        {Array.from({ length: TOTAL_ETAPAS - 1 }).map((_, i) => {
          const active = i === etapa;
          const done = i < etapa;
          return (
            <span key={i} className="flex items-center">
              <span
                className="block h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: active ? 28 : 8,
                  backgroundColor: done || active
                    ? "var(--color-primary)"
                    : "oklch(0.3 0.04 122 / 0.4)",
                }}
              />
              {i < TOTAL_ETAPAS - 2 && (
                <span
                  className="mx-1.5 h-[1px] w-3"
                  style={{
                    backgroundColor: "oklch(0.3 0.04 122 / 0.4)",
                  }}
                />
              )}
            </span>
          );
        })}
      </div>
      <span className="text-[10.5px] uppercase tracking-[0.2em] font-semibold text-muted-foreground">
        Etapa {etapa + 1} de {TOTAL_ETAPAS - 1}
      </span>
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
  const { isOpen, open, close } = useDiagnostico();
  const [etapa, setEtapa] = useState<number>(0);
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
      className="relative py-[100px] lg:py-[160px] overflow-hidden scroll-mt-24"
    >
      <div className="container-page relative">
            <div className="text-center max-w-[1000px] mx-auto">
              <Reveal>
                <h2
                  className="h-mix text-[40px] sm:text-[54px] lg:text-[80px] leading-[0.96] text-foreground"
                  style={{ letterSpacing: "-0.035em" }}
                >
                  Quanto a IA pode
                  <br />
                  <em>devolver</em> pro seu escritório.
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-8 lg:mt-10 text-[16px] lg:text-[19px] text-sage leading-[1.55] max-w-[620px] mx-auto">
                  Conta aberta tarefa por tarefa. Você ajusta com a sua realidade e vê o
                  resultado completo na tela em 3 minutos.
                </p>
              </Reveal>
            </div>

            {/* 6 frentes — tech-cards centralizados */}
            <Reveal delay={0.14}>
              <div className="mt-16 lg:mt-24 max-w-[1100px] mx-auto">
                <p className="text-center text-[11px] uppercase tracking-[0.22em] font-bold text-muted-foreground">
                  6 frentes que a calculadora avalia
                </p>
                <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4">
                  {[
                    { Icon: FileSpreadsheet, label: "Conciliação" },
                    { Icon: MessageSquare, label: "Atendimento" },
                    { Icon: Receipt, label: "Apuração" },
                    { Icon: FileText, label: "Guias" },
                    { Icon: UserPlus, label: "Onboarding" },
                    { Icon: BarChart3, label: "Relatórios" },
                  ].map((f) => (
                    <div
                      key={f.label}
                      className="tech-card p-4 lg:p-5 flex flex-col items-center text-center gap-3"
                    >
                      <span
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl"
                        style={{
                          backgroundColor: "oklch(0.75 0.20 122 / 0.14)",
                          border: "1px solid oklch(0.75 0.20 122 / 0.4)",
                        }}
                      >
                        <f.Icon
                          className="h-4 w-4"
                          strokeWidth={2}
                          style={{ color: "var(--color-primary)" }}
                        />
                      </span>
                      <p className="text-[13px] font-bold text-foreground tracking-tight leading-tight">
                        {f.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Fluxo de entregáveis — padrão /contabil/Solution
                (3 colunas com num + h3 + texto curto, sem cards pesados) */}
            <Reveal delay={0.2}>
              <div className="mt-14 lg:mt-20 max-w-[1100px] mx-auto">
                <p className="text-center text-[11.5px] uppercase tracking-[0.22em] font-semibold text-muted-foreground">
                  Você sai daqui com
                </p>
                <div className="mt-7 grid md:grid-cols-3 gap-5 lg:gap-8 max-w-[960px] mx-auto">
                  {[
                    {
                      n: "01",
                      title: "Cenário atual quantificado",
                      text: "Total de horas que sua equipe gasta hoje em tarefas automatizáveis, em R$ pelo seu custo real.",
                    },
                    {
                      n: "02",
                      title: "Conta aberta, tarefa por tarefa",
                      text: "Quanto cada rotina contábil custa hoje, quanto custaria com IA e quanto sobra de margem.",
                    },
                    {
                      n: "03",
                      title: "3 frentes priorizadas",
                      text: "Onde começar pra ter o maior ROI no seu caso específico, baseado no seu gargalo declarado.",
                    },
                  ].map((step) => (
                    <div key={step.n} className="text-left">
                      <div className="flex items-center gap-3">
                        <span
                          className="num-display text-[14px] tracking-wider"
                          style={{ color: "var(--color-primary)" }}
                        >
                          {step.n}
                        </span>
                        <span
                          className="h-[1px] flex-1"
                          style={{
                            background:
                              "linear-gradient(90deg, var(--color-primary), transparent)",
                          }}
                        />
                      </div>
                      <h3 className="mt-4 text-[16px] lg:text-[18px] font-bold tracking-tight text-foreground leading-[1.3]">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-[13.5px] text-sage leading-[1.55]">{step.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.28}>
              <div className="mt-12 lg:mt-16 flex justify-center">
                <button type="button" onClick={open} className="cta-primary">
                  Começar diagnóstico
                  <span className="arrow">
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </span>
                </button>
              </div>
            </Reveal>
      </div>

      {/* Modal — abre quando qualquer CTA da página chama open().
          Renderiza wizard (etapa < 4) ou resultado (etapa === 4)
          via portal pra escapar do stacking context da section. */}
      <DiagnosticoModal isOpen={isOpen} onClose={close}>
        {etapa < 4 && (
          <div>
            <ProgressBar etapa={etapa} />

            <div className="mt-9 lg:mt-12">
              {etapa === 0 && <LeadGateStep lead={lead} setLead={setLead} />}
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
          </div>
        )}

        {etapa === 4 && (
          <ResultadoStep
            lead={lead}
            resultado={resultado}
            score={score}
            gargalo={gargalo}
            onRestart={() => setEtapa(0)}
          />
        )}
      </DiagnosticoModal>
    </section>
  );
}

/**
 * Modal full-screen com backdrop blur. Renderiza via portal pra escapar
 * do stacking context da section. Fecha ao clicar fora ou no X. Bloqueia
 * scroll do body enquanto aberto.
 */
function DiagnosticoModal({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen || typeof document === "undefined") return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[200] flex items-start sm:items-center justify-center p-3 sm:p-6 lg:p-8"
      style={{
        backgroundColor: "oklch(0.06 0 0 / 0.82)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
      onClick={onClose}
    >
      {/* X close button — fixed na viewport, sempre acessível. */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Fechar diagnóstico"
        className="fixed top-4 right-4 lg:top-6 lg:right-6 z-[210] inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:opacity-90"
        style={{
          backgroundColor: "oklch(0.20 0.025 122)",
          border: "1px solid oklch(0.55 0.06 122 / 0.5)",
          color: "oklch(0.95 0.012 110)",
        }}
      >
        <X className="h-4 w-4" strokeWidth={2.5} />
      </button>

      {/* Card com max-height limitada à viewport — overflow-y-auto
          DENTRO do card. Esse é o pattern bulletproof: o card vira
          o scroll context, não o overlay. Evita o conflito de scroll
          entre body, overlay e card. */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[960px] rounded-2xl flex flex-col"
        style={{
          backgroundColor: "oklch(0.14 0.018 122)",
          border: "1px solid oklch(0.55 0.06 122 / 0.35)",
          boxShadow: "0 40px 80px -20px oklch(0 0 0 / 0.7)",
          maxHeight: "calc(100vh - 24px)",
        }}
      >
        <div
          className="overflow-y-auto overscroll-contain px-6 sm:px-8 lg:px-10 pb-6 sm:pb-8 lg:pb-10 pt-16 lg:pt-20 rounded-2xl"
          style={{
            WebkitOverflowScrolling: "touch",
          }}
        >
          {children}
        </div>
      </div>
    </div>,
    document.body,
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
          label="Custo médio por hora da equipe"
          helpText="Salário + encargos. Padrão do mercado: R$ 50 a R$ 80/hora."
          value={escritorio.custoHora}
          min={1}
          step={5}
          prefix="R$"
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

      <div className="mt-6 space-y-3">
        {TASKS.map((t) => (
          <div
            key={t.key}
            className="flex items-center justify-between gap-3 rounded-xl px-4 py-3"
            style={{ backgroundColor: "oklch(0.12 0.012 122 / 0.45)" }}
          >
            <label
              htmlFor={`h-${t.key}`}
              className="text-[13.5px] lg:text-[14.5px] text-foreground flex-1 leading-tight"
            >
              {t.label}
            </label>
            <Stepper
              id={`h-${t.key}`}
              value={horas[t.key]}
              onChange={(v) => setHoras({ ...horas, [t.key]: v })}
              suffix="h"
            />
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

      {/* Gargalo — cards 2x3 com ícone */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {GARGALOS.map((g) => {
          const active = gargalo === g.key;
          return (
            <button
              key={g.key}
              type="button"
              onClick={() => setGargalo(g.key)}
              className="text-center rounded-xl px-3 py-4 transition-all hover:-translate-y-0.5"
              style={{
                backgroundColor: active
                  ? "oklch(0.75 0.20 122 / 0.14)"
                  : "oklch(0.12 0.012 122 / 0.5)",
                border: active
                  ? "1.5px solid oklch(0.75 0.20 122 / 0.65)"
                  : "1px solid oklch(0.55 0.06 122 / 0.3)",
              }}
            >
              <span
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg"
                style={{
                  backgroundColor: active
                    ? "oklch(0.75 0.20 122 / 0.2)"
                    : "oklch(0.18 0.025 122 / 0.5)",
                }}
              >
                <g.Icon
                  className="h-4 w-4"
                  strokeWidth={2}
                  style={{
                    color: active ? "var(--color-primary)" : "oklch(0.6 0.04 122)",
                  }}
                />
              </span>
              <p
                className="mt-2.5 text-[12.5px] leading-[1.25]"
                style={{
                  color: active ? "var(--color-primary)" : "var(--color-foreground)",
                  fontWeight: active ? 700 : 500,
                }}
              >
                {g.label}
              </p>
            </button>
          );
        })}
      </div>

      {/* Maturidade — cards com ícones */}
      <div className="mt-8 pt-6 border-t border-border">
        <p className="text-[14.5px] font-semibold text-foreground">
          Vocês já usam alguma ferramenta com IA hoje?
        </p>
        <div className="mt-4 grid grid-cols-3 gap-2.5">
          {MATURIDADES.map((m) => {
            const active = maturidade === m.key;
            return (
              <button
                key={m.key}
                type="button"
                onClick={() => setMaturidade(m.key)}
                className="text-center rounded-xl px-3 py-4 transition-all hover:-translate-y-0.5"
                style={{
                  backgroundColor: active
                    ? "oklch(0.75 0.20 122 / 0.14)"
                    : "oklch(0.12 0.012 122 / 0.5)",
                  border: active
                    ? "1.5px solid oklch(0.75 0.20 122 / 0.65)"
                    : "1px solid oklch(0.55 0.06 122 / 0.3)",
                }}
              >
                <m.Icon
                  className="mx-auto h-5 w-5"
                  strokeWidth={2}
                  style={{
                    color: active ? "var(--color-primary)" : "oklch(0.6 0.04 122)",
                  }}
                />
                <p
                  className="mt-2 text-[13px]"
                  style={{
                    color: active ? "var(--color-primary)" : "var(--color-foreground)",
                    fontWeight: active ? 700 : 500,
                  }}
                >
                  {m.label}
                </p>
              </button>
            );
          })}
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
  onRestart,
}: {
  lead: LeadData;
  resultado: CalculoResultado;
  score: Score;
  gargalo: GargaloKey;
  onRestart?: () => void;
}) {
  const recs = RECOMENDACOES[gargalo];
  const primeiroNome = lead.nome.trim().split(/\s+/)[0] || "você";
  const reducaoPct = Math.round(
    (resultado.totalHorasLiberadas / resultado.totalHorasAtuais) * 100,
  );
  return (
    <div>
      {/* RESULT DASHBOARD — widget integrado tipo scorecard.
          Esquerda: número principal + KPIs secundários.
          Direita: ring chart de redução + comparação Hoje/Com IA
          numa barra horizontal visual.
          Substitui o banner cream "comum" + comparison row separados. */}
      <ResultDashboard
        primeiroNome={primeiroNome}
        resultado={resultado}
        reducaoPct={reducaoPct}
      />

      {/* Tabela tarefa por tarefa com barras de progresso */}
      <div className="mt-7">
        <p className="text-[12px] uppercase tracking-[0.18em] font-semibold text-muted-foreground">
          Conta aberta, tarefa por tarefa
        </p>
        <div className="mt-4 space-y-2.5">
          {resultado.porTarefa.map((t) => {
            const pctRed = t.horasHoje
              ? Math.round(((t.horasHoje - t.horasComIA) / t.horasHoje) * 100)
              : 0;
            return (
              <div
                key={t.key}
                className="rounded-xl p-3.5 lg:p-4"
                style={{
                  backgroundColor: "oklch(0.18 0.025 122 / 0.45)",
                  border: "1px solid oklch(0.55 0.06 122 / 0.25)",
                }}
              >
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <p className="text-[13px] lg:text-[14px] font-semibold text-foreground flex-1 min-w-0">
                    {t.label}
                  </p>
                  <p
                    className="text-[13.5px] lg:text-[14.5px] font-bold whitespace-nowrap"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {formatR$(t.economiaR$)}/mês
                  </p>
                </div>
                {/* Progress bar visual: ocupação atual vs com IA */}
                <div className="mt-2.5 flex items-center gap-2.5">
                  <span className="text-[10.5px] text-muted-foreground tabular-nums w-12">
                    {t.horasHoje}h
                  </span>
                  <div
                    className="flex-1 h-2 rounded-full overflow-hidden relative"
                    style={{ backgroundColor: "oklch(0.10 0.012 122 / 0.7)" }}
                  >
                    {/* Barra completa "hoje" — base translúcida */}
                    <div
                      className="absolute inset-y-0 left-0 h-full"
                      style={{
                        width: "100%",
                        backgroundColor: "oklch(0.55 0.06 122 / 0.3)",
                      }}
                    />
                    {/* Barra "com IA" — ocupação reduzida em olive */}
                    <div
                      className="absolute inset-y-0 left-0 h-full transition-all duration-700"
                      style={{
                        width: `${(t.horasComIA / t.horasHoje) * 100}%`,
                        background:
                          "linear-gradient(90deg, oklch(0.75 0.20 122 / 0.65), oklch(0.55 0.16 122 / 0.55))",
                      }}
                    />
                  </div>
                  <span
                    className="text-[10.5px] font-bold tabular-nums w-12 text-right"
                    style={{ color: "var(--color-primary)" }}
                  >
                    −{pctRed}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <p className="mt-3 text-[11px] text-muted-foreground italic">
          Percentuais de redução baseados em benchmarks de +80 implementações da IAplicada.
        </p>
      </div>

      {/* Recomendações — cards dark com mini-mockup CLARO flutuando.
          Inspiração visual FINANCIA SaaS dashboard: mini KPI tile +
          micro bar chart sobrepostos no canto superior direito do card
          criam contraste claro/escuro e cara de produto real. */}
      <div className="mt-8">
        <p className="text-[12px] uppercase tracking-[0.18em] font-semibold text-muted-foreground flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5" strokeWidth={2} style={{ color: "var(--color-primary)" }} />
          Por onde começar · o que a IAplicada constrói pro seu gargalo
        </p>
        <div className="mt-4 lg:mt-5 space-y-4 lg:space-y-5">
          {recs.map((r, i) => (
            <div
              key={r.title}
              className="rounded-2xl p-5 lg:p-6 relative overflow-visible"
              style={{
                backgroundColor: "oklch(0.18 0.025 122 / 0.55)",
                border: "1px solid oklch(0.55 0.06 122 / 0.35)",
              }}
            >
              <div className="flex items-start gap-3.5 lg:pr-[180px]">
                <span
                  className="num-display shrink-0 inline-flex h-8 w-8 items-center justify-center rounded-full text-[13.5px]"
                  style={{
                    backgroundColor: "oklch(0.75 0.20 122 / 0.18)",
                    border: "1px solid oklch(0.75 0.20 122 / 0.55)",
                    color: "var(--color-primary)",
                  }}
                >
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <span
                    className="inline-block text-[9.5px] uppercase tracking-[0.16em] font-semibold px-2 py-0.5 rounded"
                    style={{
                      backgroundColor: "oklch(0.10 0.012 122 / 0.65)",
                      color: "oklch(0.78 0.08 125)",
                      border: "1px solid oklch(0.55 0.06 122 / 0.4)",
                    }}
                  >
                    {r.tag}
                  </span>
                  <p className="mt-2 text-[14.5px] lg:text-[15.5px] font-bold text-foreground leading-tight">
                    {r.title}
                  </p>
                  <p className="mt-2 text-[13px] text-sage leading-[1.55]">{r.text}</p>
                  <div
                    className="mt-3 inline-flex items-center gap-1.5 text-[11.5px] font-semibold rounded-md px-2 py-1"
                    style={{
                      backgroundColor: "oklch(0.75 0.20 122 / 0.12)",
                      color: "var(--color-primary)",
                    }}
                  >
                    <TrendingDown className="h-3 w-3" strokeWidth={2.5} />
                    {r.impact}
                  </div>
                </div>
              </div>

              {/* MOCKUP CLARO — desktop only, posicionado top-right
                  sobrepondo levemente a borda do card. Mobile esconde
                  pra não sobrecarregar. */}
              <RecMockup index={i} impact={r.impact} tag={r.tag} />
            </div>
          ))}
        </div>
      </div>

      {/* Como a IAplicada implementaria isso — TIMELINE QUE CRIA URGÊNCIA */}
      <div className="mt-12 lg:mt-16 pt-10 lg:pt-12 border-t border-border">
        <p className="text-[10.5px] uppercase tracking-[0.22em] font-semibold text-muted-foreground">
          A trilha
        </p>
        <h3
          className="mt-4 text-[26px] sm:text-[34px] lg:text-[42px] leading-[1.02] tracking-[-0.02em] text-foreground"
          style={{ fontFamily: '"Instrument Serif", serif' }}
        >
          Como a IAplicada leva você
          <br />
          <em>do diagnóstico ao R$ {Math.round(resultado.economiaAnual / 1000)}k.</em>
        </h3>

        <div className="mt-10 lg:mt-12 grid lg:grid-cols-3 gap-6 lg:gap-8 relative">
          {/* Linha conectora desktop */}
          <span
            aria-hidden
            className="hidden lg:block absolute top-6 left-[16.67%] right-[16.67%] h-[1px]"
            style={{
              background:
                "linear-gradient(90deg, transparent, oklch(0.55 0.08 125 / 0.5) 20%, oklch(0.55 0.08 125 / 0.5) 80%, transparent)",
            }}
          />
          {[
            {
              n: "Semana 1",
              title: "Diagnóstico aprofundado + primeira rotina",
              text: "Validamos o cenário deste diagnóstico com sua equipe e colocamos a 1ª automação em produção.",
            },
            {
              n: "Semanas 2 a 7",
              title: "Rotinas prioritárias automatizadas",
              text: `Atacamos primeiro o gargalo (${gargalo}) e depois as próximas. Documentação e treino acontecem junto.`,
            },
            {
              n: "Semana 8",
              title: "Time autônomo. A gente sai.",
              text: "Seu time opera sozinho as rotinas. Você fica com o ganho mensal recorrente.",
            },
          ].map((step, i) => (
            <div key={step.n} className="relative">
              {/* Bolinha numerada — fica em cima da linha conectora */}
              <span
                className="num-display relative z-10 inline-flex h-12 w-12 items-center justify-center rounded-full text-[14px]"
                style={{
                  backgroundColor: "var(--color-background)",
                  border: "1.5px solid var(--color-primary)",
                  color: "var(--color-primary)",
                }}
              >
                {i + 1}
              </span>
              <p
                className="mt-5 text-[11px] uppercase tracking-[0.22em] font-semibold"
                style={{ color: "var(--color-primary)" }}
              >
                {step.n}
              </p>
              <p className="mt-3 text-[16px] lg:text-[18px] font-bold tracking-tight text-foreground leading-[1.25]">
                {step.title}
              </p>
              <p className="mt-2.5 text-[13.5px] text-sage leading-[1.55]">{step.text}</p>
            </div>
          ))}
        </div>

        {/* Métrica de urgência embaixo da timeline */}
        <div
          className="mt-10 lg:mt-12 inline-flex items-center gap-2.5 rounded-full px-4 py-2"
          style={{
            backgroundColor: "oklch(0.75 0.20 122 / 0.12)",
            border: "1px solid oklch(0.75 0.20 122 / 0.45)",
          }}
        >
          <span
            className="num-display text-[18px] leading-none"
            style={{ color: "var(--color-primary)" }}
          >
            R$ {Math.round(resultado.economiaMensal / 1000)}k
          </span>
          <span className="text-[12px] uppercase tracking-[0.14em] font-semibold text-foreground/85">
            de economia/mês deixados na mesa por cada mês que você espera
          </span>
        </div>
      </div>

      {/* CTA FINAL — bloco premium de conversão */}
      <div
        className="mt-12 lg:mt-16 rounded-3xl overflow-hidden relative"
        style={{
          background: "linear-gradient(135deg, oklch(0.16 0.04 122), oklch(0.22 0.06 122))",
          border: "1.5px solid oklch(0.75 0.20 122 / 0.55)",
          boxShadow: "0 30px 60px -25px oklch(0.75 0.20 122 / 0.35)",
        }}
      >
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 100% at 50% 0%, oklch(0.75 0.20 122 / 0.18), transparent 70%)",
          }}
        />
        <div className="relative p-7 lg:p-12">
          <h3
            className="text-[28px] sm:text-[36px] lg:text-[46px] leading-[1.02] tracking-[-0.02em] text-foreground"
            style={{ fontFamily: '"Instrument Serif", serif' }}
          >
            Quero ver isso{" "}
            <em>rodando no meu escritório.</em>
          </h3>
          <p className="mt-5 text-[14.5px] lg:text-[16px] text-foreground/85 leading-[1.55] max-w-[560px]">
            Em 30 minutos com a Mari e o time, montamos a proposta personalizada pro seu
            escritório com base nesse diagnóstico — quais rotinas, em que ordem, com que
            ROI esperado.
          </p>

          <div className="mt-7 lg:mt-9 flex flex-col sm:flex-row gap-3">
            <a
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-[14px] font-bold transition-transform hover:-translate-y-0.5"
              style={{
                backgroundColor: "var(--color-primary)",
                color: "oklch(0.14 0.02 122)",
                boxShadow: "0 12px 28px -10px oklch(0.75 0.2 122 / 0.55)",
              }}
            >
              <MessageCircle className="h-4 w-4" strokeWidth={2.5} />
              Falar agora pelo WhatsApp
            </a>
            <a
              href="https://wa.me/5511999999999?text=Quero%20agendar%2030%20min%20com%20a%20Mari"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-[14px] font-semibold transition-colors"
              style={{
                backgroundColor: "transparent",
                color: "var(--color-foreground)",
                border: "1px solid oklch(1 0 0 / 0.25)",
              }}
            >
              Agendar 30 min com a Mari
              <span aria-hidden>→</span>
            </a>
          </div>

          <p className="mt-5 text-[11px] uppercase tracking-[0.18em] font-semibold text-muted-foreground">
            Sem custo · Sem compromisso · Resposta em até 1 dia útil
          </p>
        </div>
      </div>

      {/* Refazer diagnóstico — reset opcional */}
      {onRestart && (
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={onRestart}
            className="text-[11.5px] uppercase tracking-[0.18em] font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            Refazer diagnóstico
          </button>
        </div>
      )}

      {/* Score interno — comentado, vai pro CRM mas não pra tela */}
      <p className="sr-only" aria-hidden>
        Internal score: {score.total}/100 ({score.tier})
      </p>
    </div>
  );
}

/**
 * Dashboard widget visual do resultado — substitui o banner cream simples
 * que parecia "comum". Composição:
 * - Left col: número anual gigante + KPIs secundários (horas, FTE, R$/mês)
 * - Right col: donut/ring chart com % de redução central + barra
 *   horizontal "Hoje" vs "Com IA"
 * Tudo num único card cream com stripe olive lateral.
 */
function ResultDashboard({
  primeiroNome,
  resultado,
  reducaoPct,
}: {
  primeiroNome: string;
  resultado: CalculoResultado;
  reducaoPct: number;
}) {
  const INK = "oklch(0.14 0.02 122)";
  const MUTED = "oklch(0.42 0.04 125)";
  const SUBTLE = "oklch(0.32 0.04 125)";
  const RULE = "oklch(0.85 0.02 110)";
  const OLIVE = "oklch(0.55 0.18 122)";

  // Donut: stroke-dasharray pra % de redução
  const RADIUS = 70;
  const CIRC = 2 * Math.PI * RADIUS;
  const dashLen = (reducaoPct / 100) * CIRC;

  const horasComIA = resultado.totalHorasAtuais - resultado.totalHorasLiberadas;

  return (
    <div
      className="relative rounded-2xl overflow-hidden"
      style={{
        backgroundColor: "oklch(0.97 0.012 110)",
        border: "1px solid oklch(0.75 0.20 122 / 0.4)",
      }}
    >
      <span
        aria-hidden
        className="absolute top-0 bottom-0 left-0 w-[5px]"
        style={{ backgroundColor: "var(--color-primary)" }}
      />

      <div className="relative p-7 lg:p-10 pl-8 lg:pl-12">
        {/* Header bar */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <span
            className="inline-flex items-center gap-2 text-[10.5px] uppercase tracking-[0.22em] font-semibold"
            style={{ color: SUBTLE }}
          >
            <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={2.5} />
            Diagnóstico de {primeiroNome}
          </span>
          <span
            className="text-[10px] uppercase tracking-[0.2em] font-bold rounded px-2 py-1"
            style={{ backgroundColor: INK, color: "oklch(0.97 0.012 110)" }}
          >
            Projeção · 12 meses
          </span>
        </div>

        {/* HERO STAT — número anual gigante esquerda + donut direita */}
        <div className="mt-8 lg:mt-10 grid lg:grid-cols-[1.3fr_1fr] gap-6 lg:gap-10 items-center">
          <div>
            <p
              className="text-[11.5px] uppercase tracking-[0.2em] font-semibold"
              style={{ color: SUBTLE }}
            >
              Economia anual recuperável
            </p>
            <p
              className="num-display mt-3 text-[52px] sm:text-[68px] lg:text-[88px] leading-[0.9]"
              style={{ color: INK, letterSpacing: "-0.035em" }}
            >
              {formatR$(resultado.economiaAnual)}
            </p>
          </div>

          {/* Donut grande centralizado na coluna direita */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative" style={{ width: 160, height: 160 }}>
              <svg
                width="160"
                height="160"
                viewBox="0 0 160 160"
                style={{ transform: "rotate(-90deg)" }}
              >
                <circle
                  cx="80"
                  cy="80"
                  r={RADIUS}
                  fill="none"
                  stroke={RULE}
                  strokeWidth="13"
                />
                <circle
                  cx="80"
                  cy="80"
                  r={RADIUS}
                  fill="none"
                  stroke={OLIVE}
                  strokeWidth="13"
                  strokeLinecap="round"
                  strokeDasharray={`${dashLen} ${CIRC}`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p
                  className="num-display text-[36px] lg:text-[42px] leading-none"
                  style={{ color: INK, letterSpacing: "-0.025em" }}
                >
                  −{reducaoPct}%
                </p>
                <p
                  className="mt-1.5 text-[8.5px] uppercase tracking-[0.2em] font-bold"
                  style={{ color: MUTED }}
                >
                  do tempo
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* KPI STRIP — 3 colunas simples embaixo */}
        <div
          className="mt-8 lg:mt-10 pt-6 grid grid-cols-3 gap-4 lg:gap-8"
          style={{ borderTop: `1px solid ${RULE}` }}
        >
          <KpiBlock label="Horas liberadas" value={resultado.totalHorasLiberadas} suffix="h/mês" inkColor={INK} mutedColor={MUTED} />
          <KpiBlock label="Equivale a" value={resultado.fteEquivalente} suffix="FTE" inkColor={INK} mutedColor={MUTED} />
          <div>
            <p
              className="text-[10.5px] uppercase tracking-[0.18em] font-semibold"
              style={{ color: MUTED }}
            >
              Hoje → Com IA
            </p>
            <p
              className="num-display mt-1 text-[20px] lg:text-[26px] leading-none whitespace-nowrap"
              style={{ color: INK }}
            >
              {resultado.totalHorasAtuais}h
              <span className="mx-1.5 text-[14px]" style={{ color: MUTED }}>
                →
              </span>
              <span style={{ color: OLIVE }}>{horasComIA}h</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function KpiBlock({
  label,
  value,
  suffix,
  inkColor,
  mutedColor,
}: {
  label: string;
  value: number | string;
  suffix: string;
  inkColor: string;
  mutedColor: string;
}) {
  return (
    <div>
      <p
        className="text-[10.5px] uppercase tracking-[0.18em] font-semibold"
        style={{ color: mutedColor }}
      >
        {label}
      </p>
      <p
        className="num-display mt-1 text-[20px] lg:text-[26px] leading-none"
        style={{ color: inkColor }}
      >
        {value}
        <span className="ml-1 text-[11px] font-semibold align-middle" style={{ color: mutedColor }}>
          {suffix}
        </span>
      </p>
    </div>
  );
}

/**
 * Card de comparação "Hoje vs Com IA" no topo do resultado.
 * tone="dim" pra estado atual (cinza), tone="primary" pra estado futuro
 * (olive). Cria contraste visual imediato.
 */
function ComparisonCard({
  label,
  value,
  subValue,
  tone,
}: {
  label: string;
  value: string;
  subValue: string;
  tone: "dim" | "primary";
}) {
  const isP = tone === "primary";
  return (
    <div
      className="rounded-2xl p-4 lg:p-5"
      style={{
        backgroundColor: isP
          ? "oklch(0.75 0.20 122 / 0.12)"
          : "oklch(0.13 0.02 122 / 0.6)",
        border: isP
          ? "1.5px solid oklch(0.75 0.20 122 / 0.55)"
          : "1px solid oklch(0.55 0.06 122 / 0.3)",
      }}
    >
      <p
        className="text-[10.5px] uppercase tracking-[0.2em] font-semibold"
        style={{
          color: isP ? "var(--color-primary)" : "oklch(0.7 0.02 115)",
        }}
      >
        {label}
      </p>
      <p
        className="num-display mt-1.5 text-[22px] lg:text-[28px] leading-none"
        style={{ color: isP ? "var(--color-primary)" : "var(--color-foreground)" }}
      >
        {value}
      </p>
      <p
        className="mt-2 text-[11.5px] leading-tight"
        style={{ color: isP ? "var(--color-foreground)" : "oklch(0.65 0.015 115)" }}
      >
        {subValue}
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
  step?: number;
  helpText?: string;
  prefix?: string;
}
function FieldNumber({
  id,
  label,
  value,
  onChange,
  min = 0,
  step = 1,
  helpText,
  prefix,
}: FieldNumberProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="text-[12.5px] lg:text-[13px] font-semibold text-foreground"
      >
        {label}
      </label>
      <div className="mt-2 flex items-center gap-3">
        <Stepper id={id} value={value} onChange={onChange} min={min} step={step} prefix={prefix} large />
      </div>
      {helpText && (
        <p className="mt-2 text-[11.5px] text-muted-foreground leading-[1.4]">{helpText}</p>
      )}
    </div>
  );
}

/**
 * Stepper interativo — input numérico com botões + / - de cada lado.
 * Touch-friendly e mais intuitivo que digitar.
 */
interface StepperProps {
  id: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  step?: number;
  suffix?: string;
  prefix?: string;
  large?: boolean;
}
function Stepper({
  id,
  value,
  onChange,
  min = 0,
  step = 1,
  suffix,
  prefix,
  large,
}: StepperProps) {
  const dec = () => onChange(Math.max(min, value - step));
  const inc = () => onChange(value + step);
  return (
    <div
      className={`inline-flex items-stretch rounded-xl overflow-hidden ${large ? "w-full" : ""}`}
      style={{
        backgroundColor: "oklch(0.10 0.012 122 / 0.55)",
        border: "1px solid oklch(0.55 0.06 122 / 0.4)",
      }}
    >
      <button
        type="button"
        onClick={dec}
        aria-label="Diminuir"
        className="flex items-center justify-center w-10 lg:w-11 transition-colors hover:bg-foreground/5"
        style={{ color: "var(--color-primary)" }}
      >
        <Minus className="h-4 w-4" strokeWidth={2.5} />
      </button>
      <div className="flex-1 flex items-center justify-center gap-1.5 px-2 py-2.5 min-w-[80px]">
        {prefix && (
          <span className="text-[12.5px] text-muted-foreground">{prefix}</span>
        )}
        <input
          id={id}
          type="number"
          inputMode="numeric"
          min={min}
          value={value}
          onChange={(e) => onChange(Math.max(min, Number(e.target.value) || 0))}
          className={`no-spinner bg-transparent text-center font-bold text-foreground focus:outline-none ${large ? "text-[18px] lg:text-[22px] w-full" : "text-[16px] w-14"}`}
          style={{ minWidth: 0 }}
        />
        {suffix && (
          <span className="text-[11.5px] uppercase tracking-[0.12em] font-semibold text-muted-foreground">
            {suffix}
          </span>
        )}
      </div>
      <button
        type="button"
        onClick={inc}
        aria-label="Aumentar"
        className="flex items-center justify-center w-10 lg:w-11 transition-colors hover:bg-foreground/5"
        style={{ color: "var(--color-primary)" }}
      >
        <Plus className="h-4 w-4" strokeWidth={2.5} />
      </button>
    </div>
  );
}

/**
 * Mini-mockup claro (estilo FINANCIA SaaS dashboard) que flutua no canto
 * superior direito dos cards de recomendação. Cria contraste alto contra
 * o fundo escuro da calculadora e dá cara de produto real.
 *
 * Variante por index: 0 = mini bar chart, 1 = mini line trend,
 * 2 = mini KPI stack. Rotaciona pra não ficar repetitivo entre as 3
 * recomendações exibidas por gargalo.
 */
function RecMockup({
  index,
  impact,
  tag,
}: {
  index: number;
  impact: string;
  tag: string;
}) {
  const pctMatch = impact.match(/(\d{2,3})\s?%/);
  const pct = pctMatch ? pctMatch[1] : "75";

  const CREAM = "oklch(0.97 0.012 110)";
  const INK = "oklch(0.14 0.02 122)";
  const MUTED = "oklch(0.55 0.05 125)";
  const OLIVE = "oklch(0.55 0.18 122)";
  const RULE = "oklch(0.88 0.02 110)";

  const variant = index % 3;

  return (
    <div
      aria-hidden
      className="hidden lg:block absolute z-10 rounded-[10px] overflow-hidden"
      style={{
        top: -14,
        right: -10,
        width: 168,
        backgroundColor: CREAM,
        border: `1px solid ${RULE}`,
        boxShadow:
          "0 18px 36px -14px oklch(0 0 0 / 0.55), 0 4px 10px -4px oklch(0 0 0 / 0.4)",
      }}
    >
      {/* Header tipo browser bar minimalista */}
      <div
        className="flex items-center gap-1.5 px-2.5 py-1.5"
        style={{ borderBottom: `1px solid ${RULE}` }}
      >
        <span className="flex gap-[3px]">
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "oklch(0.78 0.12 25)" }} />
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "oklch(0.85 0.12 85)" }} />
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "oklch(0.78 0.12 135)" }} />
        </span>
        <span
          className="ml-auto text-[7.5px] uppercase tracking-[0.14em] font-bold"
          style={{ color: MUTED }}
        >
          IAplicada
        </span>
      </div>

      <div className="px-3 pt-2.5 pb-3">
        <p
          className="text-[7.5px] uppercase tracking-[0.16em] font-semibold truncate"
          style={{ color: MUTED }}
        >
          {tag}
        </p>

        {variant === 0 && (
          // KPI principal + delta verde
          <>
            <div className="mt-1 flex items-end gap-1">
              <span
                className="num-display text-[22px] leading-none"
                style={{ color: INK, letterSpacing: "-0.02em" }}
              >
                −{pct}%
              </span>
            </div>
            {/* Mini barras decrescentes */}
            <div className="mt-2.5 flex items-end gap-[3px] h-[26px]">
              {[18, 16, 13, 10, 7, 5, 4].map((h, k) => (
                <span
                  key={k}
                  className="flex-1 rounded-[1.5px]"
                  style={{
                    height: h,
                    backgroundColor: k > 3 ? OLIVE : "oklch(0.78 0.04 120)",
                  }}
                />
              ))}
            </div>
            <div
              className="mt-2 pt-1.5 flex items-center justify-between"
              style={{ borderTop: `1px solid ${RULE}` }}
            >
              <span className="text-[7.5px] font-semibold" style={{ color: MUTED }}>
                Mês
              </span>
              <span className="text-[7.5px] font-bold" style={{ color: OLIVE }}>
                ↓ esforço
              </span>
            </div>
          </>
        )}

        {variant === 1 && (
          // Trend line + 2 KPIs empilhados
          <>
            <div className="mt-1">
              <span
                className="num-display text-[20px] leading-none"
                style={{ color: INK, letterSpacing: "-0.02em" }}
              >
                {pct}%
              </span>
              <span
                className="ml-1 text-[8px] font-semibold uppercase tracking-[0.1em]"
                style={{ color: MUTED }}
              >
                auto
              </span>
            </div>
            <svg
              viewBox="0 0 140 36"
              className="mt-2 w-full"
              preserveAspectRatio="none"
              style={{ height: 36 }}
            >
              <polyline
                points="2,28 22,24 42,26 62,18 82,14 102,9 122,6 138,3"
                fill="none"
                stroke={OLIVE}
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <polyline
                points="2,28 22,24 42,26 62,18 82,14 102,9 122,6 138,3 138,36 2,36"
                fill={OLIVE}
                fillOpacity="0.12"
                stroke="none"
              />
            </svg>
            <div
              className="mt-2 pt-1.5 grid grid-cols-2 gap-1"
              style={{ borderTop: `1px solid ${RULE}` }}
            >
              <div>
                <p className="text-[7px] font-semibold uppercase" style={{ color: MUTED }}>
                  Atual
                </p>
                <p className="num-display text-[10px]" style={{ color: INK }}>
                  100%
                </p>
              </div>
              <div>
                <p className="text-[7px] font-semibold uppercase" style={{ color: MUTED }}>
                  Meta
                </p>
                <p className="num-display text-[10px]" style={{ color: OLIVE }}>
                  {100 - Number(pct)}%
                </p>
              </div>
            </div>
          </>
        )}

        {variant === 2 && (
          // 3 linhas de "checklist" + percentual final
          <>
            <div className="mt-1.5 space-y-1.5">
              {[
                { label: "Cliente A", w: 92 },
                { label: "Cliente B", w: 76 },
                { label: "Cliente C", w: 58 },
              ].map((row) => (
                <div key={row.label}>
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-semibold" style={{ color: INK }}>
                      {row.label}
                    </span>
                    <span className="text-[7.5px]" style={{ color: MUTED }}>
                      {row.w}%
                    </span>
                  </div>
                  <div
                    className="mt-0.5 h-[3px] rounded-full overflow-hidden"
                    style={{ backgroundColor: "oklch(0.92 0.02 110)" }}
                  >
                    <span
                      className="block h-full"
                      style={{ width: `${row.w}%`, backgroundColor: OLIVE }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div
              className="mt-2.5 pt-1.5 flex items-center justify-between"
              style={{ borderTop: `1px solid ${RULE}` }}
            >
              <span className="text-[7.5px] font-semibold uppercase" style={{ color: MUTED }}>
                Cobertura
              </span>
              <span className="num-display text-[12px]" style={{ color: INK }}>
                {pct}%
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
