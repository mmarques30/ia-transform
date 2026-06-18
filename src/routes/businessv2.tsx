import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Solution } from "@/components/sections/Solution";
import { SystemsV2 } from "@/components/sections/SystemsV2";
import { OliveWave } from "@/components/sections/OliveWave";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { Impact } from "@/components/sections/Impact";
import { Comparison } from "@/components/sections/Comparison";
import { Authority } from "@/components/sections/Authority";
import { FAQ } from "@/components/sections/FAQ";
import { CTAFinal } from "@/components/sections/CTAFinal";
import { Footer } from "@/components/sections/Footer";

/**
 * /businessv2 — duplicata da LP / (academy theme).
 *
 * Mesma estrutura e components da home, criada como variante pra
 * teste/iteração visual independente. noindex pra evitar duplicate
 * content no SEO até a variante ser finalizada.
 */
export const Route = createFileRoute("/businessv2")({
  head: () => ({
    meta: [
      {
        title: "IAplicada Business v2 · Sua empresa organizada em 30 dias",
      },
      {
        name: "description",
        content:
          "Plataforma de gestão e automação com IA aplicada, sob medida para a sua operação. Sem DEV. Sem soluções engessadas.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { name: "theme-color", content: "#FAFAF7" },
    ],
  }),
  component: BusinessV2Landing,
});

function BusinessV2Landing() {
  return (
    <main className="academy-theme min-h-screen">
      <Header theme="light" />
      <Hero />
      <Problem />
      <Solution />
      <SystemsV2 />
      <OliveWave />
      <ClientLogos />
      <Impact />
      <Authority />
      <Comparison />
      <FAQ />
      <CTAFinal />
      <Footer />
    </main>
  );
}
