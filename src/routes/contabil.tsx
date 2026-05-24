import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/contabil/Hero";
import { ICP } from "@/components/sections/contabil/ICP";
import { Problem } from "@/components/sections/contabil/Problem";
import { Solution } from "@/components/sections/contabil/Solution";
import { Systems } from "@/components/sections/contabil/Systems";
import { OliveWave } from "@/components/sections/contabil/OliveWave";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { Process } from "@/components/sections/contabil/Process";
import { Impact } from "@/components/sections/contabil/Impact";
import { Comparison } from "@/components/sections/Comparison";
import { Authority } from "@/components/sections/Authority";
import { FAQ } from "@/components/sections/FAQ";
import { CTAFinal } from "@/components/sections/contabil/CTAFinal";
import { Footer } from "@/components/sections/Footer";

export const Route = createFileRoute("/contabil")({
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
    ],
  }),
  component: ContabilLanding,
});

function ContabilLanding() {
  return (
    <main className="min-h-screen text-foreground">
      <Header />
      <Hero />
      <Problem />
      <Solution />
      <Systems />
      <OliveWave />
      <ClientLogos />
      <Process />
      <Impact />
      <Authority />
      <ICP />
      <Comparison />
      <FAQ />
      <CTAFinal />
      <Footer />
    </main>
  );
}
