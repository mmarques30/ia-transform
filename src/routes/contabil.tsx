import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { ICP } from "@/components/sections/ICP";
import { Problem } from "@/components/sections/Problem";
import { Solution } from "@/components/sections/Solution";
import { Systems } from "@/components/sections/Systems";
import { OliveWave } from "@/components/sections/OliveWave";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { Process } from "@/components/sections/Process";
import { Impact } from "@/components/sections/Impact";
import { Comparison } from "@/components/sections/Comparison";
import { Authority } from "@/components/sections/Authority";
import { FAQ } from "@/components/sections/FAQ";
import { CTAFinal } from "@/components/sections/CTAFinal";
import { Footer } from "@/components/sections/Footer";

export const Route = createFileRoute("/contabil")({
  head: () => ({
    meta: [
      {
        title: "IAplicada Contábil · A operação do seu escritório contábil organizada",
      },
      {
        name: "description",
        content:
          "Plataforma de gestão e automação com IA aplicada, sob medida para escritórios contábeis. Sem DEV. Sem soluções engessadas.",
      },
      {
        property: "og:title",
        content: "IAplicada Contábil · O escritório organizado em 30 dias",
      },
      {
        property: "og:description",
        content:
          "Estruturação operacional com IA para escritórios contábeis que precisam organizar a casa antes de escalar.",
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
      <Hero formSlug="contabil" thankYouPath="/contabil-thank-you" />
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
