import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/contabil02/Hero";
import { Problem } from "@/components/sections/contabil02/Problem";
import { Solution } from "@/components/sections/contabil02/Solution";
import { Systems } from "@/components/sections/contabil02/Systems";
import { OliveWave } from "@/components/sections/contabil02/OliveWave";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { Process } from "@/components/sections/contabil02/Process";
import { Impact } from "@/components/sections/contabil02/Impact";
import { Comparison } from "@/components/sections/Comparison";
import { Authority } from "@/components/sections/Authority";
import { FAQ } from "@/components/sections/FAQ";
import { CTAFinal } from "@/components/sections/contabil02/CTAFinal";
import { Footer } from "@/components/sections/Footer";

/**
 * /contabil02 — duplicata da /contabil pra iteração / A/B test.
 *
 * Estrutura técnica idêntica e todas as melhorias recentes (in-app
 * WebView perf, mobile-first hero, Problem flow natural, Solution
 * arejada com stat cards, copy sem travessões, etc.).
 *
 * Componentes de seção foram clonados pra src/components/sections/contabil02/
 * — as duas LPs evoluem independentes. Sections compartilhadas
 * (ClientLogos, Authority, Comparison, FAQ, Header, Footer) continuam
 * sendo as mesmas, então melhorias nelas valem pras duas LPs.
 *
 * Submissão de form: reusa HeroFormContabil (mesma slug, mesma
 * Edge Function, mesma thank-you /contabil-thank-you). Leads das duas
 * LPs são distinguíveis no CRM pelo meta.page_url enviado no payload.
 */
export const Route = createFileRoute("/contabil02")({
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
  component: Contabil02Landing,
});

function Contabil02Landing() {
  return (
    <main className="min-h-screen text-foreground">
      <Header homePath="/contabil02" />
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
