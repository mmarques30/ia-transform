import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/business/variantA/Hero";
import { Problem } from "@/components/sections/business/variantA/Problem";
import { Solution } from "@/components/sections/business/Solution";
import { Systems } from "@/components/sections/business/variantA/Systems";
import { OliveWave } from "@/components/sections/business/OliveWave";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { Process } from "@/components/sections/business/Process";
import { Impact } from "@/components/sections/business/variantA/Impact";
import { Comparison } from "@/components/sections/Comparison";
import { Authority } from "@/components/sections/Authority";
import { FAQ } from "@/components/sections/FAQ";
import { CTAFinal } from "@/components/sections/business/variantA/CTAFinal";
import { Footer } from "@/components/sections/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "IAplicada Business · O processo mais caro não aparece no DRE",
      },
      {
        name: "description",
        content:
          "Contratar mais gente não resolve. O custo mais alto da sua operação está escondido em horas gastas em planilha e retrabalho. A IAplicada encontra, calcula e constrói o sistema que elimina.",
      },
      {
        property: "og:title",
        content: "IAplicada Business · O processo mais caro não aparece no DRE",
      },
      {
        property: "og:description",
        content:
          "Contratar mais gente não resolve — o problema está no processo. Diagnóstico gratuito de 60 minutos.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#0d0d0d" },
    ],
  }),
  component: BusinessLanding,
});

/**
 * LP `/` (Business, variante A) — refactor phase 2 do plano de 5 fases.
 *
 * Visual: dark charcoal (paleta base do site) — antes era academy-theme
 * cream. Estrutura de dobras alinhada com `/contabil`:
 *
 *   Hero (dobra 3 + ticker dobra 2 embutido)
 *   Problem (dobra 4)
 *   Solution (dobra 5 — Método MAPA, shared)
 *   Systems (dobra 6 — sistema em ação)
 *   OliveWave · ClientLogos (visuais)
 *   Process (dobra 8 — jornada semana a semana, shared)
 *   Impact (dobra 9 — ROI Focus Fintax)
 *   Comparison (dobra 11, shared) · Authority (dobra 10, shared)
 *   FAQ (dobra 12, shared) · CTAFinal (dobra 13)
 *
 * Copy variante A: "O processo mais caro não aparece no DRE".
 * `/businessv2` (variante B) e `/businessv3` (variante C) virão nas
 * fases 3 e 4.
 */
function BusinessLanding() {
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
