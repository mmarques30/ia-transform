import { Reveal } from "@/components/Reveal";
import { ArrowRight } from "lucide-react";
import { CardStack, type CardStackItem } from "@/components/ui/card-stack";

/**
 * Systems — section "Sistemas que construímos" da LP /.
 *
 * Substituiu o grid editorial anterior pelo CardStack 3D (fan de cards
 * com drag/swipe + dots). Cada card representa uma das 5 entregas
 * personalizadas. Copy mantida idêntica ao briefing.
 */

interface SystemItem extends CardStackItem {
  tag: string;
  title: string;
  description: string;
  imageSrc: string;
}

const SYSTEMS: SystemItem[] = [
  {
    id: "arquitetura",
    tag: "Arquitetura",
    title: "Da proposta à obra num lugar só",
    description:
      "Propostas, contratos, CRM, financeiro e gestão de obra integrados. ROI de +225% de valor entregue sobre o contrato e ~90h/mês liberadas.",
    imageSrc: "/clients/quadra-arquitetura.webp",
  },
  {
    id: "varejo-tributario",
    tag: "Varejo",
    title: "Recuperação tributária no automático",
    description:
      "Diagnóstico tributário identifica créditos e impostos pagos a mais. Time fiscal opera com dashboard em vez de planilha e recupera milhões em impostos esquecidos.",
    imageSrc: "/clients/recuperacao-tributaria-varejo.webp",
  },
  {
    id: "contabil-fiscal",
    tag: "Contábil",
    title: "Catálogo de ferramentas fiscais consolidado",
    description:
      "Biblioteca única de regras, calculadoras e templates fiscais. Operação contábil para de garimpar legislação espalhada e ganha referência centralizada.",
    imageSrc: "/clients/catalogo-ferramentas-fiscais.webp",
  },
  {
    id: "industria-moveis",
    tag: "Indústria moveleira",
    title: "Proposta em 15 minutos, não em 1 dia",
    description:
      "Gerador de propostas, câmbio atualizado sozinho e documentação centralizada. Capacidade triplicada e ~75h/mês economizadas.",
    imageSrc: "/clients/industria-moveis-dashboard.webp",
  },
  {
    id: "comunidade-d2c",
    tag: "Comunidade D2C",
    title: "Comunidade engajada acoplada ao comercial",
    description:
      "Plataforma de comunidade integrada ao CRM. Conversas viram lead qualificado, indicação vira venda — tudo rastreado num dashboard único.",
    imageSrc: "/clients/uiara-comunidade.webp",
  },
];

export function Systems() {
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
              Sistemas reais já rodando, em diversos segmentos. Cada um construído em 4 a 12
              semanas. Arraste pra ver as entregas.
            </p>
          </Reveal>
        </div>
      </div>

      <Reveal delay={0.15}>
        <div className="relative mx-auto mt-14 lg:mt-20 w-full max-w-[1200px] px-4 lg:px-8">
          <CardStack
            items={SYSTEMS}
            cardWidth={520}
            cardHeight={360}
            overlap={0.5}
            spreadDeg={42}
            activeScale={1.04}
            inactiveScale={0.92}
            loop
            autoAdvance
            intervalMs={4500}
            pauseOnHover
            showDots
          />
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
