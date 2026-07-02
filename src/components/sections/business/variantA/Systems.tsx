import { Reveal } from "@/components/Reveal";
import { ArrowRight } from "lucide-react";

/**
 * Systems (LP-A / dobra 6) — grid de 2 GIFs lado a lado (empilhados no
 * mobile) mostrando dois sistemas reais entregues pela IAplicada:
 * o painel operacional da PSA Consultores e o CRM autônomo da
 * Borges & Zembruski. Substitui o antigo device showcase estático
 * (laptop + tablet com screenshot contábil) por movimento real.
 *
 * GIFs em /public/systems-v2/ (mesmos assets usados no carrossel v2
 * antigo — sobrescreve com originais se precisar).
 */

interface SystemCard {
  gifSrc: string;
  caption: string;
  alt: string;
}

const CARDS: SystemCard[] = [
  {
    gifSrc: "/systems-v2/post_sex_painel.gif",
    caption: "Painel operacional · PSA Consultores",
    alt: "Painel operacional PSA Consultores em ação",
  },
  {
    gifSrc: "/systems-v2/post_seg_crm.gif",
    caption: "CRM autônomo · Borges & Zembruski",
    alt: "CRM autônomo Borges & Zembruski em ação",
  },
];

export function Systems() {
  return (
    <section
      id="sistemas"
      className="section-veil py-[100px] lg:py-[140px] overflow-hidden relative"
    >
      <div className="container-page relative">
        <div className="max-w-[680px] mx-auto text-center">
          <Reveal>
            <span className="label-chip">
              <span className="dot" />
              Sistema em ação
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h-mix mt-6 text-[26px] sm:text-[32px] lg:text-[36px] text-foreground">
              Não vendemos slides.
              <br />
              <em>Entregamos o sistema rodando na sua operação.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-[16px] text-sage leading-[1.6] max-w-[520px] mx-auto">
              Painel construído com o nome da sua empresa, para o seu time, resolvendo os seus
              problemas específicos. Não um software genérico que o time precisa aprender.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="mt-14 lg:mt-20 grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-[1080px] mx-auto">
            {CARDS.map((card) => (
              <SystemGifCard key={card.gifSrc} card={card} />
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-14 text-center">
            <a
              href="#diagnostico-form"
              className="inline-flex items-center gap-2 text-foreground font-semibold text-[15px] hover:text-primary transition-colors"
            >
              Quero ver como ficaria no meu negócio
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SystemGifCard({ card }: { card: SystemCard }) {
  return (
    <figure className="flex flex-col gap-3">
      <div
        className="rounded-2xl overflow-hidden border"
        style={{
          borderColor: "oklch(0.32 0.02 122)",
          backgroundColor: "oklch(0.16 0.018 122)",
          boxShadow: "0 30px 60px -25px oklch(0 0 0 / 0.55)",
        }}
      >
        <img
          src={card.gifSrc}
          alt={card.alt}
          loading="lazy"
          decoding="async"
          className="block w-full h-auto"
        />
      </div>
      <figcaption
        className="text-[13px] uppercase font-semibold tracking-[0.08em] text-center text-sage"
      >
        {card.caption}
      </figcaption>
    </figure>
  );
}
