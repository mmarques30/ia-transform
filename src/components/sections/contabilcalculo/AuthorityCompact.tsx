import { Reveal } from "@/components/Reveal";
import { FOUNDER } from "@/config/brand";

/**
 * Quem está entregando — Authority com peso visual real.
 *
 * Estrutura em 2 blocos:
 *  1. Topo: foto Mari + IAplicada como ecossistema (stats agregados)
 *  2. Base: 3 cases reais com thumbnail real do sistema entregue +
 *     outcome quantificado. Os screenshots vêm de /public/clients/
 *     (mesmos usados na seção Systems da LP /contabil).
 *
 * Pra LCR (que não tem screenshot próprio no repo) uso o mockup
 * genérico contabil-desktop.webp como placeholder neutro.
 */

const CONTABIL_CASES = [
  {
    n: "01",
    name: "PSA Consultores",
    tagline: "Agro · Tributário",
    outcome:
      "Painel multi-cliente com filtros por urgência e alertas. Reunião de status virou gestão por exceção.",
  },
  {
    n: "02",
    name: "Focus FinTax",
    tagline: "Recuperação tributária",
    outcome:
      "5 KPIs vivos de recuperação, progresso de compensação e exportação direta. Fim do retrabalho mensal.",
  },
  {
    n: "03",
    name: "LCR Contabilidade",
    tagline: "Operação completa do escritório",
    outcome:
      "Conciliação, apuração e atendimento rodando no fluxo do time. Sem trocar de sistema, sem depender de TI.",
  },
];

export function AuthorityCompact() {
  return (
    <section
      id="quem-entrega"
      className="section-veil py-[80px] lg:py-[120px] relative overflow-hidden"
    >
      <div className="container-page relative max-w-[1100px]">
        {/* Header */}
        <div className="max-w-[760px] mx-auto text-center mb-12 lg:mb-14">
          <Reveal>
            <span className="label-chip">
              <span className="dot" />
              Quem está te entregando esse diagnóstico
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h-mix mt-6 text-[32px] sm:text-[42px] lg:text-[54px] leading-[1.02] text-foreground">
              Não é teoria. <em>É ecossistema rodando.</em>
            </h2>
          </Reveal>
        </div>

        {/* Bloco 1 — IAplicada + fundadora */}
        <Reveal>
          <div
            className="rounded-3xl border p-6 lg:p-10 grid sm:grid-cols-[120px_1fr] lg:grid-cols-[180px_1fr] gap-6 lg:gap-10 items-center"
            style={{
              backgroundColor: "oklch(0.18 0.025 122 / 0.5)",
              borderColor: "oklch(0.55 0.06 122 / 0.4)",
            }}
          >
            <div
              className="relative aspect-square w-[120px] sm:w-full lg:max-w-[180px] mx-auto rounded-2xl overflow-hidden"
              style={{
                border: "1px solid oklch(0.55 0.06 122 / 0.5)",
                boxShadow: "0 18px 36px -18px oklch(0 0 0 / 0.55)",
              }}
            >
              <img
                src={FOUNDER.photoSrc}
                alt={FOUNDER.name}
                width={320}
                height={320}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
                style={{ objectPosition: "center 25%" }}
                onError={(e) => {
                  const img = e.currentTarget;
                  if (img.src !== FOUNDER.photoFallback) img.src = FOUNDER.photoFallback;
                }}
              />
            </div>

            <div>
              <p
                className="text-[10.5px] uppercase tracking-[0.2em] font-semibold"
                style={{ color: "var(--color-primary)" }}
              >
                Ecossistema IAplicada
              </p>
              <p className="mt-2 text-[18px] lg:text-[22px] font-bold text-foreground tracking-tight leading-[1.2]">
                Empresa nativa de IA aplicada a negócios.
                <br />
                Fundada por <em>Mariana Marques</em>.
              </p>
              <p className="mt-4 text-[14px] lg:text-[15.5px] text-sage leading-[1.6]">
                A IAplicada implementa IA dentro da operação real. +700 profissionais e +100
                empresas já passaram pela metodologia. A vertical contábil é ativa: dezenas de
                escritórios rodam atendimento, onboarding e tarefas operacionais com agentes
                inteligentes. O diagnóstico foi montado com base nos números reais desses
                escritórios.
              </p>

              <div className="mt-5 pt-5 border-t border-border flex flex-wrap items-center gap-x-7 gap-y-2.5">
                <StatPill value="+700" label="Profissionais" />
                <StatPill value="+100" label="Empresas" />
                <StatPill value="+80" label="Implementações" />
              </div>
            </div>
          </div>
        </Reveal>

        {/* Bloco 2 — 3 cases com tratamento tipográfico forte.
            Cada nome é o destaque visual: serif gigante + chip
            "Em produção" pulsando, + tagline + outcome.
            Sem screenshots: o emphasis vem do nome do cliente, não
            de mockup de dashboard. */}
        <div className="mt-10 lg:mt-14">
          <Reveal>
            <p className="text-center text-[11.5px] uppercase tracking-[0.22em] font-semibold text-muted-foreground">
              Escritórios e operações contábeis com a IAplicada
            </p>
          </Reveal>
          <div className="mt-7 grid md:grid-cols-3 gap-3 lg:gap-4">
            {CONTABIL_CASES.map((c, i) => (
              <Reveal key={c.name} delay={0.08 + i * 0.06}>
                <div
                  className="relative rounded-2xl border p-6 lg:p-7 h-full flex flex-col overflow-hidden group transition-transform hover:-translate-y-1"
                  style={{
                    backgroundColor: "oklch(0.13 0.018 122 / 0.75)",
                    borderColor: "oklch(0.55 0.06 122 / 0.4)",
                  }}
                >
                  {/* Número grande de canto — referência visual */}
                  <span
                    aria-hidden
                    className="absolute top-3 right-4 num-display text-[28px] lg:text-[36px] leading-none"
                    style={{ color: "oklch(0.55 0.08 125 / 0.35)" }}
                  >
                    {c.n}
                  </span>

                  {/* Chip "Em produção" com pulse */}
                  <span
                    className="inline-flex items-center gap-2 self-start text-[10px] uppercase tracking-[0.18em] font-semibold px-2.5 py-1 rounded-full"
                    style={{
                      backgroundColor: "oklch(0.75 0.20 122 / 0.14)",
                      border: "1px solid oklch(0.75 0.20 122 / 0.45)",
                      color: "var(--color-primary)",
                    }}
                  >
                    <span className="relative flex h-1.5 w-1.5">
                      <span
                        className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                        style={{ backgroundColor: "var(--color-primary)" }}
                      />
                      <span
                        className="relative inline-flex rounded-full h-1.5 w-1.5"
                        style={{ backgroundColor: "var(--color-primary)" }}
                      />
                    </span>
                    Em produção
                  </span>

                  {/* Nome — destaque tipográfico (serif italic gigante) */}
                  <p
                    className="mt-6 text-[26px] sm:text-[30px] lg:text-[34px] leading-[1.02] tracking-tight text-foreground"
                    style={{ fontFamily: '"Instrument Serif", serif', fontStyle: "italic" }}
                  >
                    {c.name}
                  </p>

                  <p className="mt-2 text-[10.5px] uppercase tracking-[0.16em] font-semibold text-muted-foreground">
                    {c.tagline}
                  </p>

                  {/* Linha separadora olive sutil */}
                  <span
                    aria-hidden
                    className="mt-5 h-[1px] w-12"
                    style={{
                      background:
                        "linear-gradient(90deg, var(--color-primary), transparent)",
                    }}
                  />

                  <p className="mt-5 text-[13.5px] lg:text-[14px] text-sage leading-[1.55] flex-1">
                    {c.outcome}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatPill({ value, label }: { value: string; label: string }) {
  return (
    <span className="inline-flex items-baseline gap-2">
      <span
        className="num-display text-[20px] lg:text-[24px] leading-none"
        style={{ color: "var(--color-primary)" }}
      >
        {value}
      </span>
      <span className="text-[10.5px] uppercase tracking-[0.18em] font-semibold text-muted-foreground">
        {label}
      </span>
    </span>
  );
}
