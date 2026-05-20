import { Reveal } from "@/components/Reveal";
import { ArrowRight } from "lucide-react";

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
    img: "/clients/quadra-arquitetura.webp",
    alt: "Painel de Tarefas por Obra da Quadra Arquitetura",
  },
  {
    tag: "Tributário",
    title: "Resumo financeiro de recuperação",
    text:
      "5 KPIs vivos, progresso de compensação e exportação direta pra Excel e PDF — fim do retrabalho mensal.",
    img: "/clients/focus-tax.webp",
    alt: "Dashboard de resumo financeiro da Focus Tax",
  },
  {
    tag: "Fiscal",
    title: "Catálogo único de ferramentas",
    text:
      "15+ ferramentas categorizadas por área fiscal, com manual integrado. Zero troca de contexto.",
    img: "/clients/catalogo-ferramentas-fiscais.webp",
    alt: "Catálogo de ferramentas fiscais",
  },
  {
    tag: "Operação",
    title: "Painel estratégico multi-cliente",
    text:
      "Filtros por urgência, KPIs vivos e alerta priorizado das tarefas atrasadas. Reunião de status virou gestão por exceção.",
    img: "/clients/psa-tax.webp",
    alt: "Painel estratégico de operação tributária da PSA TAX",
  },
  {
    tag: "Comunidade",
    title: "Plataforma editorial + mentora IA",
    text:
      "Fórum categorizado, rituais da semana, diretório de membras e a Uiara — IA que responde dúvidas 24/7.",
    img: "/clients/uiara-comunidade.webp",
    alt: "Plataforma de comunidade Uiara",
  },
  {
    tag: "Indústria",
    title: "Dashboard executivo de margem",
    text:
      "Receita faturada, margem real por pedido, saldo a receber e tendência mensal — tudo numa tela.",
    img: "/clients/industria-moveis-dashboard.webp",
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
              Quero um sistema assim pra minha operação
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * Carrossel de sistemas — marquee CSS GPU-accelerated.
 *
 * Os cards são duplicados (12) e o `.systems-loop` é traduzido de 0
 * a -50% via @keyframes (transform). Como a lista se repete, o usuário
 * não percebe o "rewind". Pausa em hover/focus via CSS, respeita
 * prefers-reduced-motion.
 */
function SystemsCarousel() {
  const loop = [...SYSTEMS, ...SYSTEMS];

  return (
    <div className="systems-viewport mt-12 lg:mt-14 relative overflow-hidden">
      <div className="systems-loop flex gap-6">
        {loop.map((s, i) => {
          // Card Fiscal: o screenshot original é dark mode — quebra a
          // paleta do carrossel (5 outros são light). Aplica wrapper
          // claro + object-contain + padding pra harmonizar moldura.
          const isDarkScreenshot = s.tag === "Fiscal";
          return (
          <article
            key={`${s.title}-${i}`}
            aria-hidden={i >= SYSTEMS.length}
            className="group shrink-0 rounded-xl border border-border bg-card overflow-hidden flex flex-col transition-shadow hover:shadow-lg"
            style={{
              width: "min(82vw, 520px)",
              boxShadow: "var(--shadow-card)",
              transform: "translateZ(0)",
            }}
          >
            <div
              className="aspect-[16/9] relative overflow-hidden border-b border-border"
              style={{
                backgroundColor: isDarkScreenshot
                  ? "oklch(0.97 0.012 115)"
                  : "var(--color-surface)",
              }}
            >
              <img
                src={s.img}
                alt={s.alt}
                loading="lazy"
                decoding="async"
                className={
                  isDarkScreenshot
                    ? "absolute inset-0 w-full h-full object-contain p-4"
                    : "absolute inset-0 w-full h-full object-cover object-top"
                }
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
          );
        })}
      </div>
    </div>
  );
}
