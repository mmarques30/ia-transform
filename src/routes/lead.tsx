import { createFileRoute } from "@tanstack/react-router";
import { BgDobra } from "@/components/BgDobra";
import { LeadHero } from "@/components/sections/business/lead/LeadHero";
import { LeadProblem } from "@/components/sections/business/lead/LeadProblem";
import { LeadKitContent } from "@/components/sections/business/lead/LeadKitContent";
import { LeadCredibility } from "@/components/sections/business/lead/LeadCredibility";
import { LeadCtaFinal } from "@/components/sections/business/lead/LeadCtaFinal";
import {
  LeadModalProvider,
  useLeadModal,
} from "@/components/sections/business/lead/LeadFormModal";
import { Footer } from "@/components/sections/Footer";

export const Route = createFileRoute("/lead")({
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
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#080a07" },
    ],
  }),
  component: LeadMagnetLanding,
});

function LeadMagnetLanding() {
  return (
    <LeadModalProvider>
      <main className="min-h-screen text-foreground" style={{ backgroundColor: "#080a07" }}>
        <LeadNav />

        <LeadHeroWithModal />

        <Separator />

        <BgDobra intensity="media">
          <LeadProblemWithModal />
        </BgDobra>

        <Separator />

        <LeadKitContent />

        <Separator />

        <LeadCredibilityWithModal />

        <Separator />

        <LeadCtaFinalWithModal />

        <Footer />
      </main>
    </LeadModalProvider>
  );
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

function Separator() {
  return (
    <div className="lead-sep" aria-hidden>
      &#10038; &#10038; &#10038;
    </div>
  );
}

function LeadNav() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[200] flex items-center h-16 px-6 lg:px-16"
      style={{
        background: "rgba(8,10,7,0.88)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <a href="/lead" className="flex items-center gap-2.5 no-underline">
        <img
          src="/brand/iaplicada-logo-dark.png"
          alt="IAplicada"
          height={22}
          style={{ height: 22, width: "auto" }}
        />
      </a>
    </nav>
  );
}
