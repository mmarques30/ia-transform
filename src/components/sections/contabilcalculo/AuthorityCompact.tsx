import { Reveal } from "@/components/Reveal";
import { FOUNDER } from "@/config/brand";

/**
 * Spread 04 — Quem entrega.
 *
 * Magazine layout art-director: foto Mariana à esquerda (3/4 portrait,
 * sem moldura cartesiana) + quote-hero serif italic à direita. Abaixo,
 * stats agregados + 3 cases em typography hero — tudo numa única
 * página editorial contínua.
 *
 * Bg charcoal padrão (sem section-veil) — flow contínuo.
 */

const SECTION_BORDER = "oklch(0.3 0.04 122 / 0.5)";

const CASES = [
  {
    n: "01",
    name: "Focus FinTax",
    vertical: "Recuperação tributária",
    outcome: "5 KPIs vivos. Exportação direta. Fim do retrabalho mensal.",
    metric: "−68% tempo de fechamento",
  },
  {
    n: "02",
    name: "PSA Consultores",
    vertical: "Agro · Tributário",
    outcome:
      "Painel multi-cliente com filtros por urgência. Reunião de status virou gestão por exceção.",
    metric: "+84% capacidade de carteira",
  },
  {
    n: "03",
    name: "LCR Contabilidade",
    vertical: "Operação completa",
    outcome:
      "Conciliação, apuração e atendimento no fluxo do time. Sem trocar de sistema.",
    metric: "+700 profissionais ativos",
  },
];

export function AuthorityCompact() {
  return (
    <section
      id="quem-entrega"
      className="relative py-[80px] lg:py-[140px]"
    >
      <div className="container-page relative">
        {/* Header de spread */}
        <Reveal>
          <div className="flex items-start justify-between gap-4 mb-14 lg:mb-20">
            <p className="text-[10.5px] uppercase tracking-[0.22em] font-semibold text-muted-foreground leading-tight">
              Spread 04 · Quem entrega
            </p>
            <p
              className="num-display text-[20px] lg:text-[24px] leading-none"
              style={{ color: "var(--color-primary)", letterSpacing: "-0.02em" }}
            >
              04
            </p>
          </div>
        </Reveal>

        {/* PARTE 1 — Foto Mari + quote-hero */}
        <div className="grid lg:grid-cols-[4fr_7fr] gap-10 lg:gap-16 items-start">
          <Reveal>
            <div className="relative">
              <div
                className="relative aspect-[3/4] w-full max-w-[380px] mx-auto lg:mx-0 rounded-2xl overflow-hidden"
                style={{
                  border: "1px solid oklch(0.55 0.06 122 / 0.5)",
                  boxShadow:
                    "0 36px 80px -30px oklch(0 0 0 / 0.7), 0 0 80px -30px oklch(0.75 0.20 122 / 0.35)",
                }}
              >
                <img
                  src={FOUNDER.photoSrc}
                  alt={FOUNDER.name}
                  width={380}
                  height={506}
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
              <div className="mt-5 flex items-center gap-3">
                <span
                  aria-hidden
                  className="h-[1px] w-8"
                  style={{
                    background:
                      "linear-gradient(90deg, var(--color-primary), transparent)",
                  }}
                />
                <p className="text-[10.5px] uppercase tracking-[0.22em] font-semibold text-muted-foreground">
                  Mariana Marques · Fundadora · Desde 2022
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="lg:pt-4">
              <p
                className="text-[28px] sm:text-[36px] lg:text-[44px] leading-[1.05] tracking-[-0.02em] text-foreground"
                style={{ fontFamily: '"Instrument Serif", serif' }}
              >
                <span
                  className="opacity-50 align-top text-[36px] sm:text-[44px] lg:text-[56px] mr-2"
                  aria-hidden
                  style={{ color: "var(--color-primary)" }}
                >
                  &ldquo;
                </span>
                <em>{FOUNDER.manifesto}</em>
              </p>

              <p className="mt-9 text-[15.5px] lg:text-[17px] text-sage leading-[1.6] max-w-[560px]">
                {FOUNDER.bio}
              </p>
            </div>
          </Reveal>
        </div>

        {/* PARTE 2 — Stats agregados */}
        <Reveal delay={0.2}>
          <div
            className="mt-20 lg:mt-28 pt-10 lg:pt-14 grid grid-cols-3 gap-4 lg:gap-12"
            style={{ borderTop: `1px solid ${SECTION_BORDER}` }}
          >
            <BigStat value="+100" label="Empresas no ecossistema" />
            <BigStat value="+700" label="Profissionais usando IA" />
            <BigStat value="+80" label="Implementações em produção" />
          </div>
        </Reveal>

        {/* PARTE 3 — 3 cases editorial */}
        <Reveal delay={0.26}>
          <div
            className="mt-20 lg:mt-28 pt-10 lg:pt-14"
            style={{ borderTop: `1px solid ${SECTION_BORDER}` }}
          >
            <p className="text-[10.5px] uppercase tracking-[0.22em] font-semibold text-muted-foreground">
              Operações rodando
            </p>
            <div className="mt-10 lg:mt-12 grid lg:grid-cols-3 gap-10 lg:gap-12">
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
        className="num-display text-[28px] sm:text-[40px] lg:text-[54px] leading-none"
        style={{ color: "var(--color-primary)", letterSpacing: "-0.025em" }}
      >
        {value}
      </p>
      <p className="mt-3 text-[10.5px] lg:text-[12px] uppercase tracking-[0.16em] font-semibold text-muted-foreground leading-tight">
        {label}
      </p>
    </div>
  );
}
