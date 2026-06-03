import { Reveal } from "@/components/Reveal";
import { FOUNDER } from "@/config/brand";
import { Building2, Receipt, FileSpreadsheet } from "lucide-react";

/**
 * Quem está entregando — Authority robusta da /contabilcalculo.
 *
 * Estrutura em 2 blocos:
 *  1. Topo: foto Mari + IAplicada como ecossistema de IA aplicada
 *     (+700 profissionais, +100 empresas, vertical contábil ativa)
 *  2. Base: 3 cases reais de escritórios/operações contábeis que já
 *     rodam com a IAplicada — PSA Consultores, Focus FinTax, LCR
 *     Contabilidade. Cada um com 1 frase de outcome concreto.
 *
 * Os outcomes vêm dos sistemas reais que a IAplicada entregou
 * (ver src/components/sections/Systems.tsx).
 */

const CONTABIL_CASES = [
  {
    name: "PSA Consultores",
    tagline: "Agronegócio · Tributário",
    outcome:
      "Painel multi-cliente com filtros por urgência e alerta de tarefas atrasadas. Reunião de status virou gestão por exceção.",
    Icon: Building2,
  },
  {
    name: "Focus FinTax",
    tagline: "Recuperação tributária",
    outcome:
      "5 KPIs vivos de recuperação, progresso de compensação e exportação direta pra Excel e PDF. Fim do retrabalho mensal.",
    Icon: Receipt,
  },
  {
    name: "LCR Contabilidade",
    tagline: "Operação completa",
    outcome:
      "Conciliação, apuração e atendimento rodando dentro do fluxo que o time já usava. Sem trocar de sistema, sem depender de TI.",
    Icon: FileSpreadsheet,
  },
];

export function AuthorityCompact() {
  return (
    <section
      id="quem-entrega"
      className="section-veil py-[80px] lg:py-[130px] relative overflow-hidden"
    >
      <div className="container-page relative max-w-[1080px]">
        {/* Header */}
        <div className="max-w-[760px] mx-auto text-center mb-12 lg:mb-16">
          <Reveal>
            <span className="label-chip">
              <span className="dot" />
              Quem está te entregando esse diagnóstico
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h-mix mt-6 text-[32px] sm:text-[40px] lg:text-[50px] leading-[1.05] text-foreground">
              Não é teoria. <em>É ecossistema rodando.</em>
            </h2>
          </Reveal>
        </div>

        {/* Bloco 1 — IAplicada + fundadora */}
        <Reveal>
          <div
            className="rounded-3xl border p-6 lg:p-10 grid sm:grid-cols-[120px_1fr] lg:grid-cols-[160px_1fr] gap-6 lg:gap-10 items-center"
            style={{
              backgroundColor: "oklch(0.18 0.025 122 / 0.5)",
              borderColor: "oklch(0.55 0.06 122 / 0.4)",
            }}
          >
            <div
              className="relative aspect-square w-[120px] sm:w-full lg:max-w-[160px] mx-auto rounded-2xl overflow-hidden"
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
                Fundada por <em className="text-primary">Mariana Marques</em>.
              </p>
              <p className="mt-4 text-[14px] lg:text-[15.5px] text-sage leading-[1.6]">
                A IAplicada implementa IA dentro da operação real. +700 profissionais e +100
                empresas já passaram pela metodologia. A vertical contábil é ativa: dezenas de
                escritórios rodam atendimento, onboarding e tarefas operacionais com agentes
                inteligentes. O diagnóstico que você vai receber foi montado com base nos
                números reais desses escritórios.
              </p>

              {/* Strip de stats agregados */}
              <div className="mt-5 pt-5 border-t border-border flex flex-wrap items-center gap-x-7 gap-y-2.5">
                <StatPill value="+700" label="Profissionais" />
                <StatPill value="+100" label="Empresas" />
                <StatPill value="+80" label="Implementações" />
              </div>
            </div>
          </div>
        </Reveal>

        {/* Bloco 2 — 3 cases contábeis reais */}
        <div className="mt-10 lg:mt-12">
          <Reveal>
            <p className="text-center text-[11.5px] uppercase tracking-[0.2em] font-semibold text-muted-foreground">
              Escritórios e operações contábeis com a IAplicada
            </p>
          </Reveal>
          <div className="mt-6 grid md:grid-cols-3 gap-3 lg:gap-4">
            {CONTABIL_CASES.map((c, i) => (
              <Reveal key={c.name} delay={0.08 + i * 0.06}>
                <div
                  className="rounded-2xl border border-border p-5 lg:p-6 h-full"
                  style={{ backgroundColor: "oklch(0.18 0.025 122 / 0.45)" }}
                >
                  <span
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{
                      backgroundColor: "oklch(0.75 0.20 122 / 0.14)",
                      border: "1px solid oklch(0.75 0.20 122 / 0.4)",
                    }}
                  >
                    <c.Icon
                      className="h-4.5 w-4.5"
                      strokeWidth={2}
                      style={{ color: "var(--color-primary)" }}
                    />
                  </span>
                  <p className="mt-4 text-[15.5px] font-bold tracking-tight text-foreground">
                    {c.name}
                  </p>
                  <p className="mt-0.5 text-[10.5px] uppercase tracking-[0.16em] font-semibold text-muted-foreground">
                    {c.tagline}
                  </p>
                  <p className="mt-3 text-[13.5px] text-sage leading-[1.55]">{c.outcome}</p>
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
