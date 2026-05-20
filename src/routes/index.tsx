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

const Hairline = () => (
  <div aria-hidden className="h-px w-full" style={{ backgroundColor: "oklch(0 0 0 / 0.06)" }} />
);

function BusinessLanding() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <Hairline />
      <Problem />
      <Hairline />
      <Solution />
      <Hairline />
      <Systems />
      <OliveWave />
      <Process />
      <Hairline />
      <Impact />
      <Hairline />
      <Authority />
      <Hairline />
      <ICP />
      <Hairline />
      <Comparison />
      <Hairline />
      <FAQ />
      <Hairline />
      <CTAFinal />
      <Footer />
    </main>
  );
}
