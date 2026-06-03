import { Reveal } from "@/components/Reveal";
import { FOUNDER } from "@/config/brand";

/**
 * Sobre a IAplicada — versão editorial one-page.
 *
 * 3 bandas verticais sequenciais, sem cards isolados:
 *
 *   1. VISÃO DA FUNDADORA
 *      Foto da Mariana 3/4 portrait à esquerda, manifesto + bio à
 *      direita. Quote tipográfica forte como gancho.
 *
 *   2. ECOSSISTEMA
 *      Manifesto curto explicando o que é a IAplicada + 3 stats
 *      gigantes (+100 empresas / +700 profissionais / +80 implementações).
 *
 *   3. RESULTADOS CONECTADOS
 *      3 cases reais (Focus FinTax / PSA Consultores / LCR Contabilidade)
 *      com nome em typography hero + outcome quantificado que prova o
 *      que a fundadora prometeu.
 *
 * Compartilhada por /, /contabil e /contabil02.
 */

const CASES = [
  {
    n: "01",
    name: "Focus FinTax",
    vertical: "Recuperação tributária",
    outcome: "5 KPIs vivos de recuperação. Exportação direta. Fim do retrabalho mensal.",
    metric: "−68% tempo de fechamento",
  },
  {
    n: "02",
    name: "PSA Consultores",
    vertical: "Agronegócio · Tributário",
    outcome:
      "Painel multi-cliente com filtros por urgência. Reunião de status virou gestão por exceção.",
    metric: "+84% capacidade de carteira",
  },
  {
    n: "03",
    name: "LCR Contabilidade",
    vertical: "Operação completa",
    outcome:
      "Conciliação, apuração e atendimento rodando no fluxo do time. Sem trocar de sistema.",
    metric: "+700 profissionais ativos",
  },
];

export function Authority() {
  return (
    <section
      id="time"
      className="section-veil py-[100px] lg:py-[160px] relative overflow-hidden"
    >
      <div className="container-page relative">
        {/* ════════════════ BANDA 1: VISÃO DA FUNDADORA ════════════════ */}
        <div className="grid lg:grid-cols-[5fr_7fr] gap-10 lg:gap-16 items-start">
          {/* FOTO — 3/4 portrait, sem moldura cartesiana */}
          <Reveal>
            <div className="relative">
              <div
                className="relative aspect-[3/4] w-full max-w-[440px] mx-auto lg:mx-0 rounded-2xl overflow-hidden"
                style={{
                  border: "1px solid oklch(0.55 0.06 122 / 0.5)",
                  boxShadow:
                    "0 36px 80px -30px oklch(0 0 0 / 0.7), 0 0 80px -30px oklch(0.75 0.20 122 / 0.35)",
                }}
              >
                <img
                  src={FOUNDER.photoSrc}
                  alt={FOUNDER.name}
                  width={440}
                  height={585}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                  onError={(e) => {
                    const img = e.currentTarget;
                    if (img.src.includes(FOUNDER.photoSrc.split("/").pop()!)) {
                      img.src = FOUNDER.photoFallback;
                    }
                  }}
                />
              </div>
              {/* Tag inferior na foto */}
              <div className="mt-5 flex items-center gap-3">
                <span
                  aria-hidden
                  className="h-[1px] w-8"
                  style={{
                    background: "linear-gradient(90deg, var(--color-primary), transparent)",
                  }}
                />
                <p className="text-[10.5px] uppercase tracking-[0.22em] font-semibold text-muted-foreground">
                  Fundadora · IAplicada · Desde 2022
                </p>
              </div>
            </div>
          </Reveal>

          {/* MANIFESTO + BIO */}
          <Reveal delay={0.1}>
            <div className="lg:pt-6">
              <p
                className="text-[11.5px] uppercase tracking-[0.22em] font-semibold"
                style={{ color: "var(--color-primary)" }}
              >
                Visão da fundadora
              </p>

              {/* Quote-hero — manifesto tipográfico */}
              <p
                className="mt-6 lg:mt-7 text-[34px] sm:text-[44px] lg:text-[58px] leading-[1.02] tracking-[-0.025em] text-foreground"
                style={{ fontFamily: '"Instrument Serif", serif' }}
              >
                <span
                  className="opacity-50 mr-2 align-top text-[44px] sm:text-[56px] lg:text-[72px]"
                  aria-hidden
                  style={{ color: "var(--color-primary)" }}
                >
                  &ldquo;
                </span>
                <em>{FOUNDER.manifesto}</em>
              </p>

              <p className="mt-8 text-[15.5px] lg:text-[17px] text-sage leading-[1.6] max-w-[560px]">
                {FOUNDER.bio}
              </p>

              <div className="mt-7 flex items-center gap-4">
                <p className="text-[15px] lg:text-[16px] font-bold tracking-tight text-foreground">
                  {FOUNDER.name}
                </p>
                <span aria-hidden className="text-muted-foreground">·</span>
                <p className="text-[12.5px] uppercase tracking-[0.18em] font-semibold text-muted-foreground">
                  {FOUNDER.role}
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ════════════════ BANDA 2: ECOSSISTEMA ════════════════ */}
        <Reveal delay={0.15}>
          <div className="mt-20 lg:mt-32 pt-14 lg:pt-20 border-t border-border">
            <div className="max-w-[820px]">
              <p
                className="text-[11.5px] uppercase tracking-[0.22em] font-semibold"
                style={{ color: "var(--color-primary)" }}
              >
                Ecossistema IAplicada
              </p>
              <h2 className="h-mix mt-6 lg:mt-8 text-[34px] sm:text-[44px] lg:text-[60px] leading-[0.98] tracking-[-0.02em] text-foreground">
                Operação real. <em>Em produção.</em>
              </h2>
              <p className="mt-7 text-[15.5px] lg:text-[18px] text-sage leading-[1.6] max-w-[640px]">
                A IAplicada não vende slide. Implementa IA dentro do fluxo da empresa, com a
                equipe que já está lá, sob a marca do cliente. Vertical contábil, fintech,
                indústria, varejo — todos rodando.
              </p>
            </div>

            <div className="mt-12 lg:mt-16 grid grid-cols-3 gap-4 lg:gap-12">
              <BigStat value="+100" label="Empresas no ecossistema" />
              <BigStat value="+700" label="Profissionais usando IA" />
              <BigStat value="+80" label="Implementações em produção" />
            </div>
          </div>
        </Reveal>

        {/* ════════════════ BANDA 3: RESULTADOS CONECTADOS ════════════════ */}
        <Reveal delay={0.2}>
          <div className="mt-20 lg:mt-32 pt-14 lg:pt-20 border-t border-border">
            <div className="max-w-[820px]">
              <p
                className="text-[11.5px] uppercase tracking-[0.22em] font-semibold"
                style={{ color: "var(--color-primary)" }}
              >
                Resultados que provam
              </p>
              <h2 className="h-mix mt-6 lg:mt-8 text-[34px] sm:text-[44px] lg:text-[60px] leading-[0.98] tracking-[-0.02em] text-foreground">
                3 clientes. <em>3 operações rodando.</em>
              </h2>
            </div>

            <div className="mt-12 lg:mt-16 grid lg:grid-cols-3 gap-10 lg:gap-12">
              {CASES.map((c) => (
                <article key={c.name} className="relative">
                  <p
                    className="num-display text-[20px] leading-none"
                    style={{
                      color: "oklch(0.55 0.08 125 / 0.6)",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {c.n}
                  </p>
                  <p
                    className="mt-3 text-[28px] sm:text-[34px] lg:text-[38px] leading-[1.02] text-foreground"
                    style={{
                      fontFamily: '"Instrument Serif", serif',
                      fontStyle: "italic",
                      letterSpacing: "-0.015em",
                    }}
                  >
                    {c.name}
                  </p>
                  <p className="mt-2 text-[10.5px] uppercase tracking-[0.18em] font-semibold text-muted-foreground">
                    {c.vertical}
                  </p>
                  <span
                    aria-hidden
                    className="block mt-5 mb-5 h-[1px] w-12"
                    style={{
                      background:
                        "linear-gradient(90deg, var(--color-primary), transparent)",
                    }}
                  />
                  <p className="text-[14px] lg:text-[14.5px] text-sage leading-[1.55]">
                    {c.outcome}
                  </p>
                  {/* Métrica conectada — chip olive embaixo */}
                  <div
                    className="mt-5 inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[12px] font-bold"
                    style={{
                      backgroundColor: "oklch(0.75 0.20 122 / 0.14)",
                      border: "1px solid oklch(0.75 0.20 122 / 0.45)",
                      color: "var(--color-primary)",
                    }}
                  >
                    <span aria-hidden>↗</span>
                    {c.metric}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function BigStat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p
        className="num-display text-[36px] sm:text-[52px] lg:text-[72px] leading-none"
        style={{
          color: "var(--color-primary)",
          letterSpacing: "-0.025em",
        }}
      >
        {value}
      </p>
      <p className="mt-3 text-[10.5px] lg:text-[12px] uppercase tracking-[0.16em] font-semibold text-muted-foreground leading-tight">
        {label}
      </p>
    </div>
  );
}
