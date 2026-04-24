import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { LogosBar } from "@/components/sections/LogosBar";
import { Problem } from "@/components/sections/Problem";
import { Approach } from "@/components/sections/Approach";
import { Process } from "@/components/sections/Process";
import { Formats } from "@/components/sections/Formats";
import { Cases } from "@/components/sections/Cases";
import { Authority } from "@/components/sections/Authority";
import { ForWhom } from "@/components/sections/ForWhom";
import { FAQ } from "@/components/sections/FAQ";
import { CTAFinal } from "@/components/sections/CTAFinal";
import { Footer } from "@/components/sections/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "IAplicada Business · Implementação de IA no operacional da sua empresa",
      },
      {
        name: "description",
        content:
          "Implementação de IA que sustenta. Diagnóstico, execução e acompanhamento pra empresas que querem tirar IA do discurso e colocar no fluxo de trabalho.",
      },
      {
        property: "og:title",
        content: "IAplicada Business · IA aplicada ao operacional",
      },
      {
        property: "og:description",
        content:
          "Para empresas que já tentaram implementar IA sozinhas e não sustentaram. Diagnóstico, implementação e acompanhamento contínuo.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BusinessLanding,
});

function BusinessLanding() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <LogosBar />
      <Problem />
      <Approach />
      <Process />
      <Formats />
      <Cases />
      <Authority />
      <ForWhom />
      <FAQ />
      <CTAFinal />
      <Footer />
    </main>
  );
}
