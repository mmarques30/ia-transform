import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/contabilcalculo/Hero";
import { Problem } from "@/components/sections/contabilcalculo/Problem";
import { Solution } from "@/components/sections/contabilcalculo/Solution";
import { Systems } from "@/components/sections/contabilcalculo/Systems";
import { OliveWave } from "@/components/sections/contabilcalculo/OliveWave";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { Process } from "@/components/sections/contabilcalculo/Process";
import { Impact } from "@/components/sections/contabilcalculo/Impact";
import { Comparison } from "@/components/sections/Comparison";
import { Authority } from "@/components/sections/Authority";
import { FAQ } from "@/components/sections/FAQ";
import { CTAFinal } from "@/components/sections/contabilcalculo/CTAFinal";
import { Footer } from "@/components/sections/Footer";

/**
 * /contabilcalculo — duplicata da /contabil pra iteração / A/B test.
 *
 * Estrutura técnica idêntica e todas as melhorias recentes (in-app
 * WebView perf, mobile-first hero, Problem flow natural, Solution
 * arejada, copy sem travessões, form auth headers, etc.).
 *
 * Componentes clonados pra src/components/sections/contabilcalculo/ —
 * essa LP evolui independente da /contabil baseline e da /contabil02.
 * Sections compartilhadas (ClientLogos, Authority, Comparison, FAQ,
 * Header, Footer) continuam sendo as mesmas, então melhorias nelas
 * valem pras 3 LPs.
 *
 * Submissão de form: reusa HeroFormContabil. Leads das 3 LPs são
 * distinguíveis no CRM pelo utm_term automático:
 *   /contabil          → contabil-v1
 *   /contabil02        → contabil-v2
 *   /contabilcalculo   → contabil-calculo
 */
export const Route = createFileRoute("/contabilcalculo")({
  head: () => ({
    meta: [
      {
        title: "IA para escritório contábil · IAplicada · Primeira rotina em 7 dias",
      },
      {
        name: "description",
        content:
          "A IAplicada coloca o seu escritório contábil rodando com IA em 2 meses. Primeira rotina automatizada em 7 dias. Método aplicado, sem curso e sem software engessado.",
      },
      {
        property: "og:title",
        content: "IA para escritório contábil · IAplicada",
      },
      {
        property: "og:description",
        content:
          "Contratar mais um júnior não vai salvar o seu fechamento. Automatize conciliação, apuração e obrigações no fluxo que seu time já conhece.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#FAFAF7" },
      // A/B variant: noindex até decidir qual versão vai pra SEO real.
      // Remova quando quiser indexar essa LP também.
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ContabilCalculoLanding,
});

function ContabilCalculoLanding() {
  return (
    <main className="min-h-screen text-foreground">
      <Header homePath="/contabilcalculo" />
      <Hero />
      <Problem />
      <Solution />
      <Systems />
      <OliveWave />
      <ClientLogos />
      <Process />
      <Impact />
      <Authority />
      <Comparison />
      <FAQ />
      <CTAFinal />
      <Footer />
    </main>
  );
}
