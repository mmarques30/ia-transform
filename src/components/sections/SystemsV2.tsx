import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { Reveal } from "@/components/Reveal";

/**
 * SystemsV2 — variante da seção "Sistemas que construímos" pra LP
 * /businessv2.
 *
 * Substitui o CardStack 3D por um carrossel horizontal limpo
 * (embla-carousel) com snap. Inspirado em
 * https://21st.dev/community/components/reuno-ui/card-carousel/default
 * mas adaptado à paleta cream/cocoa da brand, com tipografia
 * Fraunces nos títulos e tag/descrição cocoa-soft.
 *
 * Cada card tem um visual no topo (GIF mostrando o produto em ação)
 * e bloco de texto embaixo (tag + título serif + descrição). Os
 * GIFs ficam em /public/systems-v2/ — precisam ser uploadados nesse
 * caminho. Enquanto não existem, cai num placeholder cream-dark.
 */

interface SystemCard {
  id: string;
  tag: string;
  title: string;
  description: string;
  /** Path absoluto em /public — formato .gif esperado */
  gifSrc: string;
}

const SYSTEMS: SystemCard[] = [
  {
    id: "painel",
    tag: "Painel estratégico",
    title: "Portfólio que enxerga gargalos",
    description:
      "Funil comercial, distribuição de setores e indicadores do negócio num painel só. O gargalo aparece sozinho.",
    gifSrc: "/systems-v2/01-painel.gif",
  },
  {
    id: "triagem",
    tag: "Triagem com IA",
    title: "Lead qualificado no automático",
    description:
      "Agente conversa no tom da sua marca, qualifica e organiza antes de você entrar. Não envia sozinho — espera seu OK.",
    gifSrc: "/systems-v2/02-triagem-lead.gif",
  },
  {
    id: "pipeline",
    tag: "CRM",
    title: "Pipeline que move sozinho",
    description:
      "Lead entra via formulário, proposta sai em PDF, alerta de lead frio dispara automático. Você só fecha.",
    gifSrc: "/systems-v2/03-pipeline-comercial.gif",
  },
  {
    id: "conciliacao",
    tag: "Contábil",
    title: "Conciliação processada com IA",
    description:
      "Sobe o extrato, IA classifica receita, despesa e categoria. Relatórios prontos sem digitar nada.",
    gifSrc: "/systems-v2/04-conciliacao.gif",
  },
  {
    id: "equipe-ia",
    tag: "Time de agentes",
    title: "A equipe de IA que roda a operação",
    description:
      "Cada agente tem um nome e uma função. Um faz, outro confere, outro vigia — quase ninguém constrói o que vigia.",
    gifSrc: "/systems-v2/05-equipe-ia.gif",
  },
];

export function SystemsV2() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    loop: true,
    skipSnaps: false,
    containScroll: "trimSnaps",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback((api: typeof emblaApi) => {
    if (!api) return;
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect(emblaApi);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (i: number) => emblaApi?.scrollTo(i),
    [emblaApi],
  );

  return (
    <section
      id="sistemas"
      className="relative overflow-hidden section-pad-academy"
      style={{ backgroundColor: "var(--academy-cream)" }}
    >
      <div className="container-wide-academy">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 max-w-[1100px]">
          <div className="max-w-[620px]">
            <Reveal>
              <span className="eyebrow">Sistemas que construímos</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="h-section mt-6">
                Não vendemos slides.
                <br />
                <span className="serif-italic">Entregamos a operação rodando.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p
              className="text-[16px] leading-[1.55] max-w-[380px]"
              style={{ color: "var(--academy-cocoa-soft)" }}
            >
              Cada card mostra um pedaço da operação rodando de verdade dentro da IAplicada.
              Arraste pra ver as entregas.
            </p>
          </Reveal>
        </div>
      </div>

      <Reveal delay={0.15}>
        <div className="relative mx-auto mt-14 lg:mt-20 w-full">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-5 lg:gap-7 px-4 lg:px-[max(2rem,calc((100vw-1100px)/2))]">
              {SYSTEMS.map((item) => (
                <CarouselCard key={item.id} item={item} />
              ))}
            </div>
          </div>

          <div className="container-wide-academy">
            <div className="mt-8 flex items-center justify-center gap-6">
              <button
                type="button"
                onClick={scrollPrev}
                aria-label="Anterior"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors"
                style={{
                  backgroundColor: "var(--academy-offwhite)",
                  border: "1px solid var(--academy-border)",
                  color: "var(--academy-cocoa)",
                }}
              >
                <ArrowLeft className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-2">
                {scrollSnaps.map((_, i) => {
                  const on = i === selectedIndex;
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => scrollTo(i)}
                      aria-label={`Ir pro card ${i + 1}`}
                      className="h-2 rounded-full transition-all"
                      style={{
                        width: on ? 22 : 8,
                        backgroundColor: on
                          ? "var(--academy-cocoa)"
                          : "var(--academy-border)",
                      }}
                    />
                  );
                })}
              </div>

              <button
                type="button"
                onClick={scrollNext}
                aria-label="Próximo"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors"
                style={{
                  backgroundColor: "var(--academy-offwhite)",
                  border: "1px solid var(--academy-border)",
                  color: "var(--academy-cocoa)",
                }}
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <div className="mt-14 text-center">
          <a
            href="#diagnostico-form"
            className="inline-flex items-center gap-2 font-semibold text-[15px] transition-colors"
            style={{ color: "var(--academy-cocoa)" }}
          >
            Quero um sistema personalizado pra minha operação
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </Reveal>
    </section>
  );
}

function CarouselCard({ item }: { item: SystemCard }) {
  return (
    <article
      className="shrink-0 rounded-2xl overflow-hidden flex flex-col"
      style={{
        width: "min(520px, 88vw)",
        backgroundColor: "var(--academy-offwhite)",
        border: "1px solid var(--academy-border)",
        boxShadow: "0 24px 60px -28px rgba(13, 13, 13, 0.18)",
      }}
    >
      <div
        className="relative w-full"
        style={{
          aspectRatio: "1 / 1",
          backgroundColor: "var(--academy-cream-dark)",
        }}
      >
        <img
          src={item.gifSrc}
          alt={item.title}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
          onError={(e) => {
            // Esconde o img quando o GIF ainda não foi uploadado;
            // o bg cream-dark do wrapper aparece como placeholder.
            (e.target as HTMLImageElement).style.visibility = "hidden";
          }}
        />
      </div>

      <div className="p-6 lg:p-7">
        <div
          className="text-[10.5px] uppercase tracking-[0.18em] font-semibold"
          style={{ color: "var(--academy-brand-dark)" }}
        >
          {item.tag}
        </div>
        <h3
          className="mt-3 text-[22px] lg:text-[26px] leading-[1.15]"
          style={{
            fontFamily: '"Fraunces", Georgia, serif',
            fontWeight: 500,
            letterSpacing: "-0.02em",
            color: "var(--academy-cocoa)",
          }}
        >
          {item.title}
        </h3>
        <p
          className="mt-3 text-[14.5px] leading-[1.55]"
          style={{ color: "var(--academy-cocoa-soft)" }}
        >
          {item.description}
        </p>
      </div>
    </article>
  );
}
