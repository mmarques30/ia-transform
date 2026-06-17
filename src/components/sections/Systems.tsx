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
    title: "Da proposta à obra num lugar só",
    text:
      "Propostas, contratos, CRM, financeiro e gestão de obra integrados. ROI de +225% de valor entregue sobre o contrato e ~90h/mês liberadas.",
    img: "/clients/quadra-arquitetura.webp",
    alt: "Painel integrado de proposta, contrato e obra — Quadra Arquitetura",
  },
  {
    tag: "Saúde",
    title: "Cresceu 3x sem inchar o administrativo",
    text:
      "Prontuário, agenda, cobrança e nota fiscal ligados. Clínica saiu de 30 para 100+ pacientes (+233%) sem contratar mais gente no admin.",
    img: "/clients/recuperacao-tributaria-varejo.webp",
    alt: "Dashboard de gestão de clínica com agenda e cobrança integradas",
  },
  {
    tag: "Jurídico",
    title: "Qualificação de lead no automático",
    text:
      "CRM com lead qualificado e entregue pro advogado, follow-up sozinho no WhatsApp. Economia de ~R$60k/ano e ~160h/mês liberadas.",
    img: "/clients/catalogo-ferramentas-fiscais.webp",
    alt: "CRM jurídico com qualificação automática de leads",
  },
  {
    tag: "Indústria de Transportes",
    title: "Proposta em 15 minutos, não em 1 dia",
    text:
      "Gerador de propostas, câmbio atualizado sozinho e documentação centralizada. Capacidade triplicada e ~75h/mês economizadas.",
    img: "/clients/industria-moveis-dashboard.webp",
    alt: "Sistema de propostas com câmbio automatizado",
  },
  {
    tag: "Turismo",
    title: "Operadora inteira em um sistema",
    text:
      "ERP, transfer, financeiro e comercial rodando com volume real. 17.886 vendas e 20.958 passageiros sob gestão, ~200h/mês automatizadas.",
    img: "/clients/uiara-comunidade.webp",
    alt: "ERP integrado de operadora de turismo com transfer e comercial",
  },
];

export function Systems() {
  return (
    <section
      id="sistemas"
      className="section-veil py-[100px] lg:py-[140px] overflow-hidden relative"
    >
      <div className="container-page relative">
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
            <p className="text-[16px] text-sage leading-[1.55] max-w-[380px]">
              Sistemas reais já rodando, em diversos segmentos. Cada um construído em 4 a 12
              semanas. Conheça algumas das nossas entregas personalizadas.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Grid mais largo que o container padrão pra caber mais cards por
          dobra (estilo galeria landonorris), sem ficar centralizado/estreito. */}
      <div className="relative mx-auto w-full max-w-[1440px] px-6 lg:px-10">
        <SystemsGrid />

        <Reveal delay={0.2}>
          <div className="mt-14 text-center">
            <a
              href="#diagnostico-form"
              className="inline-flex items-center gap-2 text-foreground font-semibold text-[15px] hover:text-primary transition-colors"
            >
              Quero um sistema personalizado pra minha operação
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * Grid de sistemas — cards fixos em 2 colunas (estilo galeria editorial).
 * No hover: a imagem ganha ênfase (zoom sutil + overlay escuro some),
 * borda lime e leve elevação. Cantos cortados (linguagem geométrica
 * da marca). Stagger reveal por índice.
 */
function SystemsGrid() {
  return (
    <div className="mt-12 lg:mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
      {SYSTEMS.map((s, i) => {
        const isDarkScreenshot = s.tag === "Fiscal";
        return (
          <Reveal key={s.title} delay={i * 0.06}>
            <article
              className="group relative border border-border bg-card overflow-hidden flex flex-col h-full transition-all duration-300 hover:border-primary/50 hover:-translate-y-1"
              style={{
                boxShadow: "var(--shadow-card)",
                clipPath:
                  "polygon(22px 0, 100% 0, 100% calc(100% - 22px), calc(100% - 22px) 100%, 0 100%, 0 22px)",
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
                  width={520}
                  height={293}
                  loading="lazy"
                  decoding="async"
                  className={`absolute inset-0 w-full h-full transition-transform duration-500 ease-out group-hover:scale-[1.05] ${
                    isDarkScreenshot ? "object-contain p-4" : "object-cover object-top"
                  }`}
                />
                {/* Overlay escuro que some no hover → dá ênfase à imagem */}
                <div
                  aria-hidden
                  className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-0"
                  style={{ backgroundColor: "oklch(0.14 0.018 122 / 0.35)" }}
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
          </Reveal>
        );
      })}
    </div>
  );
}
