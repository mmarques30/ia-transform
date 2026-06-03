import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/contabilcalculo/Hero";
import { DorResposta } from "@/components/sections/contabilcalculo/DorResposta";
import { Calculadora } from "@/components/sections/contabilcalculo/Calculadora";
import { AuthorityCompact } from "@/components/sections/contabilcalculo/AuthorityCompact";
import { FAQ } from "@/components/sections/contabilcalculo/FAQ";
import { CTAFinal } from "@/components/sections/contabilcalculo/CTAFinal";
import { Footer } from "@/components/sections/Footer";

/**
 * /contabilcalculo — versão one-page editorial.
 *
 * Estrutura como spread de magazine, sem dobras isoladas:
 *   1. Hero — manifesto + dashboard real com callouts dos resultados
 *   2. DorResposta — 2-col editorial (sequência narrativa + virada)
 *   3. Calculadora — heart interativo (warm bg + cards charcoal por
 *      dentro, cria "dark insert" estilo magazine)
 *   4. AuthorityCompact — typography hero dos 3 clientes + assinatura Mari
 *   5. FAQ — Q&A editorial 2-col, tudo aberto, sem accordion
 *   6. CTAFinal — manifesto curto de fechamento
 *
 * Background warm sepia-dark (oklch 0.14–0.16, hue 70) único pra essa
 * LP — diferencia visualmente das outras LPs contábeis (que usam
 * charcoal cool, hue 122). Continua dark, só ganha tom mais editorial.
 *
 * Form submission: calculadora posta no form-submit (slug
 * business-contabil) com fields da calc + scores no raw_data.
 */

// Brand charcoal (hue 122), não warm sepia. Coerente com as outras LPs.
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
      <AuthorityCompact />
      <FAQ />
      <CTAFinal />
      <Footer />
    </main>
  );
}
