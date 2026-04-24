import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { LogosBar } from "@/components/sections/LogosBar";
import { Problem } from "@/components/sections/Problem";
import { Approach } from "@/components/sections/Approach";
import { Process } from "@/components/sections/Process";
import { Formats } from "@/components/sections/Formats";
import { Comparison } from "@/components/sections/Comparison";
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
        title: "IAplicada Business · IA dentro da sua empresa, como entrega mensurável",
      },
      {
        name: "description",
        content:
          "Implementação de IA no operacional de empresas que já tentaram sozinhas e não sustentaram. Diagnóstico estratégico, construção sob demanda e acompanhamento contínuo. 6 vagas novas por trimestre.",
      },
      {
        property: "og:title",
        content: "IAplicada Business · IA aplicada ao operacional de empresas sérias",
      },
      {
        property: "og:description",
        content:
          "Diagnóstico, implementação e continuidade pra empresas de 50 a 2.000 pessoas. Sem hype. Sem ERP. Sem fábrica de software. Método, acompanhamento e métrica acordada.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#141A0B" },
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
      <Comparison />
      <Cases />
      <Authority />
      <ForWhom />
      <FAQ />
      <CTAFinal />
      <Footer />
    </main>
  );
}
