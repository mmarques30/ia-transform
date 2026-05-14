import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

interface SystemCase {
  tag: string;
  title: string;
  text: string;
  img: string;
  alt: string;
}

const SYSTEMS: SystemCase[] = [
  {
    tag: "Arquitetura",
    title: "Tarefas por obra em um lugar só",
    text:
      "Cronograma, KPIs em tempo real e IA que responde sobre status, financeiro e atrasos sem abrir planilha.",
    img: "/clients/quadra-arquitetura.png",
    alt: "Painel de Tarefas por Obra da Quadra Arquitetura",
  },
  {
    tag: "Tributário",
    title: "Resumo financeiro de recuperação",
    text:
      "5 KPIs vivos, progresso de compensação e exportação direta pra Excel e PDF — fim do retrabalho mensal.",
    img: "/clients/focus-tax.png",
    alt: "Dashboard de resumo financeiro da Focus Tax",
  },
  {
    tag: "Fiscal",
    title: "Catálogo único de ferramentas",
    text:
      "15+ ferramentas categorizadas por área fiscal, com manual integrado. Zero troca de contexto.",
    img: "/clients/catalogo-ferramentas-fiscais.png",
    alt: "Catálogo de ferramentas fiscais",
  },
  {
    tag: "Operação",
    title: "Painel estratégico multi-cliente",
    text:
      "Filtros por urgência, KPIs vivos e alerta priorizado das tarefas atrasadas. Reunião de status virou gestão por exceção.",
    img: "/clients/psa-tax.png",
    alt: "Painel estratégico de operação tributária da PSA TAX",
  },
  {
    tag: "Comunidade",
    title: "Plataforma editorial + mentora IA",
    text:
      "Fórum categorizado, rituais da semana, diretório de membras e a Uiara — IA que responde dúvidas 24/7.",
    img: "/clients/uiara-comunidade.png",
    alt: "Plataforma de comunidade Uiara",
  },
  {
    tag: "Indústria",
    title: "Dashboard executivo de margem",
    text:
      "Receita faturada, margem real por pedido, saldo a receber e tendência mensal — tudo numa tela.",
    img: "/clients/industria-moveis-dashboard.png",
    alt: "Dashboard executivo de uma indústria de móveis",
  },
];

export function Systems() {
  return (
    <section
      id="sistemas"
      className="py-[100px] lg:py-[140px] overflow-hidden"
      style={{ backgroundColor: "var(--color-surface)" }}
    >
      <div className="container-page">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 max-w-[1100px]">
          <div className="max-w-[620px]">
            <Reveal>
              <span className="label-chip">
                <span className="dot" />
                Sistemas que construímos
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="h-mix mt-6 text-[36px] sm:text-[44px] lg:text-[52px] text-foreground">
                Não vendemos slides.
                <br />
                <em>Entregamos a operação rodando.</em>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="text-[16px] text-sage leading-[1.55] max-w-[360px]">
              Seis sistemas reais já rodando — de arquitetura a indústria. Cada um construído em 4
              a 12 semanas.
            </p>
          </Reveal>
        </div>
      </div>

      <Reveal delay={0.15}>
        <SystemsCarousel />
      </Reveal>

      <div className="container-page">
        <Reveal delay={0.2}>
          <div className="mt-12 text-center">
            <a
              href="#diagnostico-form"
              className="inline-flex items-center gap-2 text-foreground font-semibold text-[15px] hover:text-primary transition-colors"
            >
              Quero construir um desses pra minha operação
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SystemsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  function updateNav() {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateNav();
    el.addEventListener("scroll", updateNav, { passive: true });
    window.addEventListener("resize", updateNav);
    return () => {
      el.removeEventListener("scroll", updateNav);
      window.removeEventListener("resize", updateNav);
    };
  }, []);

  function scrollByCard(dir: -1 | 1) {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-system-card]");
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.9;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  }

  return (
    <div className="mt-12 lg:mt-14 relative">
      {/* Track full-bleed: usa padding inline pra alinhar o primeiro card
          ao container-page e deixa os próximos vazarem pra fora da viewport. */}
      <div
        ref={trackRef}
        className="systems-track flex gap-6 overflow-x-auto scroll-smooth pb-4"
        style={{
          scrollSnapType: "x mandatory",
          paddingInline: "max(1.25rem, calc((100vw - 1240px) / 2))",
          scrollPaddingInline: "max(1.25rem, calc((100vw - 1240px) / 2))",
        }}
      >
        {SYSTEMS.map((s) => (
          <article
            key={s.title}
            data-system-card
            className="group shrink-0 rounded-xl border border-border bg-card overflow-hidden flex flex-col transition-shadow hover:shadow-lg"
            style={{
              width: "min(86vw, 640px)",
              scrollSnapAlign: "start",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <div
              className="aspect-[16/9] relative overflow-hidden border-b border-border"
              style={{ backgroundColor: "var(--color-surface)" }}
            >
              <img
                src={s.img}
                alt={s.alt}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
            </div>
            <div className="p-6 lg:p-7 flex flex-col grow">
              <p className="text-[11px] uppercase tracking-[0.14em] text-primary font-semibold">
                {s.tag}
              </p>
              <h3 className="mt-2 text-[20px] lg:text-[22px] font-semibold text-foreground leading-snug">
                {s.title}
              </h3>
              <p className="mt-2 text-[14.5px] text-sage leading-[1.55]">{s.text}</p>
            </div>
          </article>
        ))}
      </div>

      {/* Botões de nav — desktop apenas */}
      <div className="container-page mt-5 hidden md:flex items-center justify-end gap-2">
        <CarouselButton
          aria-label="Card anterior"
          disabled={!canPrev}
          onClick={() => scrollByCard(-1)}
        >
          <ChevronLeft className="h-4 w-4" strokeWidth={2.5} />
        </CarouselButton>
        <CarouselButton
          aria-label="Próximo card"
          disabled={!canNext}
          onClick={() => scrollByCard(1)}
        >
          <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
        </CarouselButton>
      </div>
    </div>
  );
}

function CarouselButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground transition-all hover:border-primary hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-border disabled:hover:text-foreground"
      {...props}
    >
      {children}
    </button>
  );
}
