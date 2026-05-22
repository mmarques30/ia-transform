import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { ICP } from "@/components/sections/ICP";
import { Problem } from "@/components/sections/Problem";
import { Solution } from "@/components/sections/Solution";
import { Systems } from "@/components/sections/Systems";
import { OliveWave } from "@/components/sections/OliveWave";
import { Process } from "@/components/sections/Process";
import { Impact } from "@/components/sections/Impact";
import { Comparison } from "@/components/sections/Comparison";
import { Authority } from "@/components/sections/Authority";
import { FAQ } from "@/components/sections/FAQ";
import { CTAFinal } from "@/components/sections/CTAFinal";
import { Footer } from "@/components/sections/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "IAplicada Business · Sua empresa organizada em 30 dias em um único lugar",
      },
      {
        name: "description",
        content:
          "Plataforma de gestão e automação com IA aplicada, sob medida para a sua operação. Sem DEV. Sem soluções engessadas.",
      },
      {
        property: "og:title",
        content: "IAplicada Business · Sua empresa organizada em 30 dias",
      },
      {
        property: "og:description",
        content:
          "Estruturação operacional com IA para empresas que precisam organizar a casa antes de escalar.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#FAFAF7" },
    ],
  }),
  component: BusinessLanding,
});

const SpacerM = () => <div aria-hidden className="h-12 lg:h-16" />;
const SpacerL = () => <div aria-hidden className="h-20 lg:h-28" />;

/**
 * Wrapper temporário durante o redesign Lote 5. Aplica paleta light
 * em sections que ainda não foram migradas pro dark editorial.
 * Cada section vai sair daqui conforme o Lote 5.2/5.3 avança.
 */
const LegacyLight = ({ children }: { children: React.ReactNode }) => (
  <div data-theme="light">{children}</div>
);

function BusinessLanding() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <SpacerL />
      <LegacyLight>
        <Problem />
        <SpacerM />
        <Solution />
        <SpacerL />
        <Systems />
      </LegacyLight>
      <OliveWave />
      <SpacerL />
      <LegacyLight>
        <Process />
        <SpacerM />
        <Impact />
        <SpacerL />
        <Authority />
      </LegacyLight>
      <SpacerM />
      <ICP />
      <SpacerL />
      <LegacyLight>
        <Comparison />
        <SpacerM />
        <FAQ />
        <SpacerL />
        <CTAFinal />
      </LegacyLight>
      <Footer />
    </main>
  );
}
