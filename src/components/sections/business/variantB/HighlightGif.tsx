import { Reveal } from "@/components/Reveal";

/**
 * HighlightGif (LP-B) — GIF de destaque inserido entre a Problem
 * e a ClientLogos. Mostra a operação da Borges & Zembruski rodando
 * como âncora visual antes da faixa de logos que valida escala.
 */
export function HighlightGif() {
  return (
    <section className="section-veil py-[80px] lg:py-[120px]">
      <div className="container-page">
        <Reveal>
          <figure className="mx-auto flex flex-col gap-4" style={{ maxWidth: 720 }}>
            <div
              className="rounded-2xl overflow-hidden border"
              style={{
                borderColor: "oklch(0.32 0.02 122)",
                backgroundColor: "oklch(0.16 0.018 122)",
                boxShadow: "0 30px 60px -25px oklch(0 0 0 / 0.55)",
              }}
            >
              <img
                src="/systems-v2/post_seg_equipe_ia.gif"
                alt="Time de agentes IA rodando na operação da Borges & Zembruski"
                loading="lazy"
                decoding="async"
                className="block w-full h-auto"
              />
            </div>
            <figcaption
              className="text-[13px] uppercase font-semibold tracking-[0.08em] text-center text-sage"
            >
              Time de agentes IA · Borges &amp; Zembruski · operação rodando
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
