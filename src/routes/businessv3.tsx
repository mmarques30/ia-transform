import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/business/variantC/Hero";
import { Problem } from "@/components/sections/business/variantC/Problem";
import { Solution } from "@/components/sections/business/Solution";
import { Systems } from "@/components/sections/business/variantC/Systems";
import { OliveWave } from "@/components/sections/business/OliveWave";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { Process } from "@/components/sections/business/Process";
import { Impact } from "@/components/sections/business/variantC/Impact";
import { Comparison } from "@/components/sections/Comparison";
import { Authority } from "@/components/sections/Authority";
import { FAQ } from "@/components/sections/FAQ";
import { CTAFinal } from "@/components/sections/business/variantC/CTAFinal";
import { Footer } from "@/components/sections/Footer";

/**
 * /businessv3 — variante C do refactor Business (phase 4 de 5).
 *
 * Ângulo LP-C: prova social pura — "90h liberadas. 5 sistemas.
 * Operação rodando." ICP: lead cético que precisa de caso real
 * pra acreditar.
 *
 * Mesma estrutura da /contabil (dark charcoal, h-mix), com
 * sections variant-specific em business/variantC/ (Hero, Problem,
 * Systems, Impact, CTAFinal) e shared em business/ root
 * (Solution=Método MAPA, Process=Jornada).
 *
 * noindex mantido — LP alternativa pra teste. Retirar quando
 * virar oficial.
 */
export const Route = createFileRoute("/businessv3")({
  head: () => ({
    meta: [
      {
        title: "IAplicada Business v3 · 90h liberadas. 5 sistemas. Operação rodando.",
      },
      {
        name: "description",
        content:
          "Não são promessas. São os números da Focus Fintax, PSA Consultores e CB Move Neuroscience. Diagnóstico gratuito de 60 minutos.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { name: "theme-color", content: "#0d0d0d" },
    ],
  }),
  component: BusinessV3Landing,
});

function BusinessV3Landing() {
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
      <Comparison />
      <FAQ />
      <CTAFinal />
      <Footer />
    </main>
  );
}
