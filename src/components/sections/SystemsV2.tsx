import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

/**
 * SystemsV2 — seção "Sistemas que construímos" da LP /businessv2.
 *
 * Carrossel Swiper com efeito coverflow (depth 3D) + autoplay,
 * adaptado da referência reuno-ui/card-carousel pra paleta cream
 * da marca. Cada card mostra um GIF da operação rodando + tag,
 * título Fraunces e descrição cocoa-soft.
 *
 * GIFs em /public/systems-v2/. Estilos do Swiper são sobrescritos
 * inline (cor dos dots, posição das setas) pra casar com a brand.
 */

interface SystemCard {
  id: string;
  tag: string;
  title: string;
  description: string;
  gifSrc: string;
}

const SYSTEMS: SystemCard[] = [
  {
    id: "painel",
    tag: "Painel estratégico",
    title: "Portfólio que enxerga gargalos",
    description:
      "Funil comercial, distribuição de setores e indicadores do negócio num painel só. O gargalo aparece sozinho.",
    gifSrc: "/systems-v2/post_sex_painel.gif",
  },
  {
    id: "triagem",
    tag: "Triagem com IA",
    title: "Lead qualificado no automático",
    description:
      "Agente conversa no tom da sua marca, qualifica e organiza antes de você entrar. Não envia sozinho — espera seu OK.",
    gifSrc: "/systems-v2/post_qua_whatsapp.gif",
  },
  {
    id: "pipeline",
    tag: "CRM",
    title: "Pipeline que move sozinho",
    description:
      "Lead entra via formulário, proposta sai em PDF, alerta de lead frio dispara automático. Você só fecha.",
    gifSrc: "/systems-v2/post_seg_crm.gif",
  },
  {
    id: "conciliacao",
    tag: "Contábil",
    title: "Conciliação processada com IA",
    description:
      "Sobe o extrato, IA classifica receita, despesa e categoria. Relatórios prontos sem digitar nada.",
    gifSrc: "/systems-v2/conciliacao_ia.gif",
  },
  {
    id: "equipe-ia",
    tag: "Time de agentes",
    title: "A equipe de IA que roda a operação",
    description:
      "Cada agente tem um nome e uma função. Um faz, outro confere, outro vigia — quase ninguém constrói o que vigia.",
    gifSrc: "/systems-v2/conciliacao_sistema.gif",
  },
];

const swiperBrandCss = `
  .systems-v2-swiper {
    padding: 24px 0 64px;
    overflow: visible;
  }
  .systems-v2-swiper .swiper-slide {
    width: min(520px, 88vw);
    height: auto;
  }
  .systems-v2-swiper .swiper-pagination {
    bottom: 0 !important;
  }
  .systems-v2-swiper .swiper-pagination-bullet {
    background-color: var(--academy-border);
    opacity: 1;
    width: 8px;
    height: 8px;
    transition: all 0.25s ease;
  }
  .systems-v2-swiper .swiper-pagination-bullet-active {
    background-color: var(--academy-cocoa);
    width: 22px;
    border-radius: 999px;
  }
  .systems-v2-swiper .swiper-button-prev,
  .systems-v2-swiper .swiper-button-next {
    color: var(--academy-cocoa);
    width: 40px;
    height: 40px;
    margin-top: -28px;
    background-color: var(--academy-offwhite);
    border: 1px solid var(--academy-border);
    border-radius: 999px;
    box-shadow: 0 6px 16px -6px rgba(13, 13, 13, 0.18);
  }
  .systems-v2-swiper .swiper-button-prev::after,
  .systems-v2-swiper .swiper-button-next::after {
    font-size: 14px;
    font-weight: 700;
  }
  .systems-v2-swiper .swiper-3d .swiper-slide-shadow-left,
  .systems-v2-swiper .swiper-3d .swiper-slide-shadow-right {
    background-image: none;
  }
`;

export function SystemsV2() {
  return (
    <section
      id="sistemas"
      className="relative overflow-hidden section-pad-academy"
      style={{ backgroundColor: "var(--academy-cream)" }}
    >
      <style>{swiperBrandCss}</style>

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
          <Swiper
            className="systems-v2-swiper"
            spaceBetween={30}
            effect="coverflow"
            grabCursor
            centeredSlides
            loop
            slidesPerView="auto"
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.2,
              slideShadows: false,
            }}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{ clickable: true }}
            navigation
            modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
          >
            {SYSTEMS.map((item) => (
              <SwiperSlide key={item.id}>
                <CarouselCard item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <div className="mt-10 text-center">
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
      className="rounded-2xl overflow-hidden flex flex-col h-full"
      style={{
        backgroundColor: "var(--academy-offwhite)",
        border: "1px solid var(--academy-border)",
        boxShadow: "0 24px 60px -28px rgba(13, 13, 13, 0.22)",
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
