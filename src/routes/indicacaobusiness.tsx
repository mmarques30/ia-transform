import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/sections/Header";
import { usePageViewBeacon } from "@/hooks/usePageViewBeacon";
import { Hero } from "@/components/sections/indicacaobusiness/Hero";
import { Footer } from "@/components/sections/Footer";
import { Toaster } from "@/components/ui/sonner";

/**
 * /indicacaobusiness — LP de programa de indicação Business.
 *
 * Versão simplificada (uma única dobra): pitch da indicação à esquerda,
 * form de indicação à direita. Submete pra Edge Function
 * `referral-submit` (no-verify-jwt, público) com payload
 * `{ product: "business", referrer_*, referrals[] }`.
 *
 * Toaster local (sonner) pra success/error feedback do form.
 */
export const Route = createFileRoute("/indicacaobusiness")({
  head: () => ({
    meta: [
      {
        title: "Indique e ganhe mentoria · IAplicada Business",
      },
      {
        name: "description",
        content:
          "Conhece um empresário que se beneficiaria de IA no negócio? Indique e ganhe até 1,5 hora de mentoria exclusiva.",
      },
      {
        property: "og:title",
        content: "Indique e ganhe mentoria · IAplicada Business",
      },
      {
        property: "og:description",
        content:
          "Indique quem merece conhecer a IAplicada. A gente cuida do resto — e ainda te recompensa por isso.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#FAFAF7" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: IndicacaoBusinessLanding,
});

function IndicacaoBusinessLanding() {
  usePageViewBeacon();
  return (
    <main className="min-h-screen text-foreground">
      <Header homePath="/indicacaobusiness" hideCta nav={[]} badgeLabel="Business" />
      <Hero />
      <Footer />
      <Toaster position="top-center" richColors closeButton />
    </main>
  );
}
