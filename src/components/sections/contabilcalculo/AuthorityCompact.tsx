import { Reveal } from "@/components/Reveal";
import { FOUNDER } from "@/config/brand";

/**
 * Quem entrega — editorial typography, sem cards isolados.
 * 3 nomes de clientes como hero typographic (serif italic gigante)
 * numerados em sequência. Assinatura discreta da fundadora no rodapé.
 */
const SECTION_BG = "oklch(0.13 0.018 122)";
const SECTION_BORDER = "oklch(0.3 0.04 122 / 0.5)";

const CASES = [
  {
    n: "01",
    name: "PSA Consultores",
    line: "Agronegócio · Tributário. Painel multi-cliente que substituiu reunião de status por gestão por exceção.",
  },
  {
    n: "02",
    name: "Focus FinTax",
    line: "Recuperação tributária. 5 KPIs vivos, exportação direta. Fim do retrabalho mensal.",
  },
  {
    n: "03",
    name: "LCR Contabilidade",
    line: "Operação completa do escritório. Conciliação, apuração e atendimento rodando no fluxo do time.",
  },
];

export function AuthorityCompact() {
  return (
    <section
      id="quem-entrega"
      className="relative py-[80px] lg:py-[140px]"
      style={{ backgroundColor: SECTION_BG }}
    >
      <div className="container-page relative">
        {/* Topo — eyebrow + título editorial */}
        <Reveal>
          <p className="text-[11.5px] uppercase tracking-[0.22em] font-semibold text-muted-foreground">
            Quem entrega esse diagnóstico
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="h-mix mt-7 text-[36px] sm:text-[52px] lg:text-[72px] leading-[0.98] tracking-[-0.02em] text-foreground max-w-[860px]">
            +100 empresas. <em>+700 profissionais.</em>
            <br />
            Ecossistema rodando.
          </h2>
        </Reveal>

        {/* 3 clientes — typography hero, sem cards */}
        <div className="mt-16 lg:mt-24 grid lg:grid-cols-3 gap-12 lg:gap-10">
          {CASES.map((c, i) => (
            <Reveal key={c.name} delay={0.1 + i * 0.07}>
              <article className="relative">
                <p
                  className="num-display text-[24px] leading-none"
                  style={{
                    color: "oklch(0.55 0.08 125 / 0.6)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {c.n}
                </p>
                <p
                  className="mt-4 text-[28px] sm:text-[34px] lg:text-[40px] leading-[1.02] text-foreground"
                  style={{
                    fontFamily: '"Instrument Serif", serif',
                    fontStyle: "italic",
                    letterSpacing: "-0.015em",
                  }}
                >
                  {c.name}
                </p>
                <span
                  aria-hidden
                  className="block mt-4 mb-4 h-[1px] w-10"
                  style={{
                    background:
                      "linear-gradient(90deg, var(--color-primary), transparent)",
                  }}
                />
                <p className="text-[13.5px] lg:text-[14px] text-sage leading-[1.55]">
                  {c.line}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Assinatura Mari — strip horizontal discreto */}
        <Reveal delay={0.4}>
          <div
            className="mt-20 lg:mt-28 pt-7 flex items-center gap-5"
            style={{ borderTop: `1px solid ${SECTION_BORDER}` }}
          >
            <img
              src={FOUNDER.photoSrc}
              alt={FOUNDER.name}
              width={56}
              height={56}
              loading="lazy"
              decoding="async"
              className="rounded-full object-cover shrink-0"
              style={{
                width: 56,
                height: 56,
                objectPosition: "center 25%",
                border: "1px solid oklch(0.55 0.06 122 / 0.5)",
              }}
              onError={(e) => {
                const img = e.currentTarget;
                if (img.src !== FOUNDER.photoFallback) img.src = FOUNDER.photoFallback;
              }}
            />
            <div>
              <p
                className="text-[10.5px] uppercase tracking-[0.22em] font-semibold"
                style={{ color: "var(--color-primary)" }}
              >
                Fundadora · IAplicada
              </p>
              <p className="mt-1 text-[16px] lg:text-[18px] font-bold tracking-tight text-foreground">
                Mariana Marques
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
