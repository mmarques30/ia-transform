import { FOUNDER } from "@/config/brand";
import { Reveal } from "@/components/Reveal";

const TAGS = [
  "Mercado Livre",
  "Suzano",
  "Amor Gold",
  "11 anos como executiva",
  "Transformacao digital Latam",
];

export function LeadCredibility() {
  return (
    <section className="relative">
      <div className="section-veil">
        <div className="founder-section">
          <div className="founder-photo-col">
            <img
              src={FOUNDER.photoSrc}
              alt={FOUNDER.name}
              loading="lazy"
              decoding="async"
              className="founder-photo"
              onError={(e) => {
                const img = e.currentTarget;
                if (FOUNDER.photoFallback && img.src.includes(FOUNDER.photoSrc.split("/").pop()!)) {
                  img.src = FOUNDER.photoFallback;
                }
              }}
            />
          </div>

          <div className="founder-text-col">
            <Reveal>
              <span
                className="text-[11px] uppercase tracking-[0.2em] font-bold"
                style={{
                  color: "var(--color-primary)",
                  fontFamily: '"JetBrains Mono", ui-monospace, Menlo, monospace',
                }}
              >
                Quem criou
              </span>
            </Reveal>

            <Reveal delay={0.05}>
              <h2 className="mt-4 font-extrabold text-[26px] sm:text-[32px] lg:text-[38px] leading-[1.08] tracking-[-0.02em] text-foreground">
                11 anos vendo escala
                <br />
                de dentro.{" "}
                <em
                  style={{
                    fontFamily: '"Instrument Serif", serif',
                    color: "var(--color-primary)",
                    fontWeight: 500,
                  }}
                >
                  Agora aplicando
                  <br />
                  em empresas reais.
                </em>
              </h2>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="mt-6 text-[14px] lg:text-[14.5px] text-sage leading-[1.65] max-w-[560px]">
                Mariana Marques trabalhou por 11 anos como executiva em Mercado Livre, Suzano
                e Amor Gold — vendo de dentro como grandes operacoes usam tecnologia para
                crescer sem depender de pessoas-chave.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-4 text-[14px] lg:text-[14.5px] text-sage leading-[1.65] max-w-[560px]">
                Criou a IAplicada para trazer esse mesmo padrao para empresas de medio porte:
                software + IA + automacoes + integracoes, implementados, nao so ensinados.
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mt-7 flex flex-wrap gap-2">
                {TAGS.map((tag) => (
                  <span
                    key={tag}
                    className="px-3.5 py-1.5 text-[12px] font-medium"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      color: "var(--text-sage, #c4c8bc)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
