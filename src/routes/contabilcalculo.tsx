import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/contabilcalculo/Hero";
import { DorResposta } from "@/components/sections/contabilcalculo/DorResposta";
import { Calculadora } from "@/components/sections/contabilcalculo/Calculadora";
import { FAQ } from "@/components/sections/contabilcalculo/FAQ";
import { CTAFinal } from "@/components/sections/contabilcalculo/CTAFinal";
import { Footer } from "@/components/sections/Footer";

/**
 * /contabilcalculo — LP focada 100% no diagnóstico.
 *
 * Estrutura enxuta, sem Authority/Quem entrega — essa LP é pra captar
 * lead via calculadora, não pra apresentar a IAplicada. Authority vive
 * nas LPs principais (/, /contabil, /contabil02).
 *
 *   1. Hero — proposta + mockup lateral
 *   2. DorResposta — dor narrativa + virada
 *   3. Calculadora — heart interativo + 6 frentes visuais
 *   4. FAQ — accordion focado no resultado/benefício
 *   5. CTAFinal — fechamento
 *
 * Form submission: calculadora posta no form-submit (slug
 * business-contabil) com fields da calc + scores no raw_data.
 */

const PAGE_BG = "oklch(0.14 0.018 122)";

export const Route = createFileRoute("/contabilcalculo")({
  head: () => ({
    meta: [
      {
        title:
          "Calculadora de IA pra Escritório Contábil · IAplicada · Em 3 minutos",
      },
      {
        name: "description",
        content:
          "Em 3 minutos, descubra quantas horas e quantos R$ seu escritório contábil pode recuperar com IA. Diagnóstico gratuito, resultado na hora, sem cartão de crédito.",
      },
      {
        property: "og:title",
        content: "Calculadora de IA pra Escritório Contábil · IAplicada",
      },
      {
        property: "og:description",
        content:
          "Em 3 minutos, descubra quantas horas (e quantos R$) seu escritório pode recuperar com IA. Sem cartão.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#FAFAF7" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ContabilCalculoLanding,
});

function ContabilCalculoLanding() {
  return (
    <main
      className="min-h-screen text-foreground"
      style={{ backgroundColor: PAGE_BG }}
    >
      <Header homePath="/contabilcalculo" />
      <Hero />
      <DorResposta />
      <Calculadora />
      <FAQ />
      <CTAFinal />
      <Footer />
    </main>
  );
}
