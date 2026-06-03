import { Reveal } from "@/components/Reveal";
import { FOUNDER } from "@/config/brand";

/**
 * Authority compacta — single block com foto + nome + 1 parágrafo +
 * pílulas com cases enterprise. Substitui o Authority de 4-quadrant
 * na /contabilcalculo pra reduzir dobras de texto.
 */
const ENTERPRISE_REFS = ["Mercado Livre", "Suzano", "AngloGold Ashanti"];

export function AuthorityCompact() {
  return (
    <section
      id="time"
      className="section-veil py-[64px] lg:py-[110px] relative overflow-hidden"
    >
      <div className="container-page relative max-w-[980px]">
        <Reveal>
          <div
            className="rounded-3xl border p-6 lg:p-10 grid sm:grid-cols-[120px_1fr] lg:grid-cols-[160px_1fr] gap-5 lg:gap-8 items-center"
            style={{
              backgroundColor: "oklch(0.18 0.025 122 / 0.45)",
              borderColor: "oklch(0.55 0.06 122 / 0.4)",
            }}
          >
            {/* Foto */}
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

            {/* Texto */}
            <div>
              <p
                className="text-[10.5px] uppercase tracking-[0.2em] font-semibold"
                style={{ color: "var(--color-primary)" }}
              >
                Quem está te entregando esse diagnóstico
              </p>
              <p className="mt-2 text-[17px] lg:text-[20px] font-bold text-foreground tracking-tight">
                Mariana Marques, fundadora da IAplicada.
              </p>
              <p className="mt-3 text-[14px] lg:text-[15px] text-sage leading-[1.6]">
                A IAplicada é uma empresa nativa de IA aplicada a negócios. Já passaram pela
                metodologia +700 profissionais e +100 empresas. O diagnóstico foi montado com
                base nos números reais de escritórios contábeis que já rodam atendimento,
                onboarding e tarefas operacionais com agentes inteligentes.
              </p>

              {/* Cases enterprise — strip horizontal */}
              <div className="mt-5 pt-4 border-t border-border flex flex-wrap items-center gap-x-5 gap-y-2">
                <p className="text-[10.5px] uppercase tracking-[0.18em] font-semibold text-muted-foreground">
                  De onde vem o método
                </p>
                {ENTERPRISE_REFS.map((n) => (
                  <span
                    key={n}
                    className="text-[13px] font-bold tracking-tight text-foreground"
                  >
                    {n}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
