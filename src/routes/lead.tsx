import { createFileRoute } from "@tanstack/react-router";
import { LeadHero } from "@/components/sections/business/lead/LeadHero";
import { LeadProblem } from "@/components/sections/business/lead/LeadProblem";
import { LeadKitContent } from "@/components/sections/business/lead/LeadKitContent";
import { LeadCredibility } from "@/components/sections/business/lead/LeadCredibility";
import { LeadCtaFinal } from "@/components/sections/business/lead/LeadCtaFinal";
import { LeadModalProvider, useLeadModal } from "@/components/sections/business/lead/LeadFormModal";
import { Footer } from "@/components/sections/Footer";
import { LeadNav } from "@/components/sections/business/lead/LeadNav";
import { onSpotlightMove } from "@/components/lpx/spotlight";

export const Route = createFileRoute("/lead")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      {
        title: "Kit de Automacao com IA — IAplicada",
      },
      {
        name: "description",
        content:
          "Prompts, automacoes e agentes de IA prontos para usar na sua empresa — testados em operacoes reais, nao em teoria. Gratuito.",
      },
      {
        property: "og:title",
        content: "Kit de Automacao com IA — IAplicada",
      },
      {
        property: "og:description",
        content:
          "Prompts, automacoes e agentes de IA prontos para usar na sua empresa. Gratuito, acesso imediato.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://iaplicada.com/lead" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#080a07" },
    ],
    links: [{ rel: "canonical", href: "https://iaplicada.com/lead" }],
  }),
  component: LeadMagnetLanding,
});

function LeadMagnetLanding() {
  return (
    <LeadModalProvider>
      <LeadNavWithModal />
      <main className="lpx-main min-h-screen text-foreground" onPointerMove={onSpotlightMove}>
        <div className="lpx-grain" aria-hidden />
        <LeadHeroWithModal />
        <LeadProblemWithModal />
        <LeadKitContent />
        <LeadCredibilityWithModal />
        <LeadCtaFinalWithModal />
        <Footer />
      </main>
    </LeadModalProvider>
  );
}

function LeadNavWithModal() {
  const modal = useLeadModal();
  return <LeadNav onOpenModal={modal?.openModal ?? (() => {})} />;
}

function LeadHeroWithModal() {
  const modal = useLeadModal();
  return <LeadHero onOpenModal={modal?.openModal ?? (() => {})} />;
}

function LeadProblemWithModal() {
  const modal = useLeadModal();
  return <LeadProblem onOpenModal={modal?.openModal ?? (() => {})} />;
}

function LeadCredibilityWithModal() {
  const modal = useLeadModal();
  return <LeadCredibility onOpenModal={modal?.openModal ?? (() => {})} />;
}

function LeadCtaFinalWithModal() {
  const modal = useLeadModal();
  return <LeadCtaFinal onOpenModal={modal?.openModal ?? (() => {})} />;
}
