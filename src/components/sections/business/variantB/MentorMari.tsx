import { FOUNDER } from "@/config/brand";
import { CtaGlow } from "@/components/sections/business/variantB/CtaGlow";

/**
 * MentorMari (LP-B) — dobra "QUEM LIDERA A IAPLICADA".
 *
 * Grid 38/62 travado com CSS namespaceado `.founder-*` no styles.css
 * (max-height 620px, foto object-position 50% 22% pra mostrar busto/
 * ombros sem close no rosto, overlay ::after fazendo bleed pra
 * #0d0f08 do painel de texto). Coluna direita tem padding fixo
 * 72/48/72/72 pra copy respirar sem esticar a seção.
 *
 * Copy final: eyebrow QUEM LIDERA A IAPLICADA + headline "A IAplicada
 * nasceu dentro de operações reais." + 4 bullets curtos (Mariana,
 * 11 anos exec, Latam, +40 sistemas) + parágrafo curto sobre bagagem
 * corporativa + CTA glow. As frases antigas em 1ª pessoa (que
 * atribuíam o diagnóstico só à Mari) foram removidas — o
 * posicionamento agora é ela + time.
 */

const BULLETS: string[] = [
  "Mariana Marques · Fundadora da IAplicada",
  "11 anos como executiva, com passagens por Mercado Livre, Suzano e Amor Gold",
  "Liderou frentes de transformação digital e melhoria de processos em escala Latam",
  "+40 sistemas implementados pelo time IAplicada",
];

export function MentorMari() {
  return (
    <section id="mentora" className="relative">
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
            <span
              className="text-[11px] uppercase tracking-[0.2em] font-bold"
              style={{
                color: "var(--color-primary)",
                fontFamily: '"JetBrains Mono", ui-monospace, Menlo, monospace',
              }}
            >
              Quem lidera a IAplicada
            </span>
            <h2 className="mt-4 font-extrabold text-[26px] sm:text-[32px] lg:text-[38px] leading-[1.08] tracking-[-0.02em] text-foreground">
              A IAplicada nasceu dentro de
              <br />
              <span style={{ color: "var(--color-primary)" }}>operações reais.</span>
            </h2>

            <ul className="mt-6 flex flex-col gap-2.5">
              {BULLETS.map((b) => (
                <MentorItem key={b}>{b}</MentorItem>
              ))}
            </ul>

            <p className="mt-6 text-[14px] lg:text-[14.5px] text-sage leading-[1.55] max-w-[560px]">
              Antes da IAplicada, Mariana passou{" "}
              <strong className="text-foreground font-semibold">11 anos no corporativo</strong>{" "}
              liderando transformação digital e reestruturação de processos, gerando impacto
              financeiro em operações de grande escala. Hoje, ela e um time de especialistas em
              operação e IA aplicam essa bagagem em PMEs — do diagnóstico à implementação, com o{" "}
              <strong className="text-foreground font-semibold">Método APLICA</strong>, refinado em
              mais de 40 sistemas entregues.
            </p>

            <div className="mt-7">
              <CtaGlow size="lg">Agendar diagnóstico com a IAplicada →</CtaGlow>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MentorItem({ children }: { children: React.ReactNode }) {
  return (
    <li
      className="grid items-baseline gap-3 text-[14px] lg:text-[14.5px] leading-[1.4] text-foreground"
      style={{ gridTemplateColumns: "16px 1fr" }}
    >
      <span
        aria-hidden
        className="inline-block h-2 w-2 rounded-full mt-2"
        style={{ border: "1.5px solid var(--color-primary)" }}
      />
      <span className="whitespace-nowrap overflow-hidden text-ellipsis">{children}</span>
    </li>
  );
}
