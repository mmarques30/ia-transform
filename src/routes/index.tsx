import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { LogosBar } from "@/components/sections/LogosBar";
import { Problem } from "@/components/sections/Problem";
import { Approach } from "@/components/sections/Approach";
import { Systems } from "@/components/sections/Systems";
import { Process } from "@/components/sections/Process";
import { Cases } from "@/components/sections/Cases";
import { Comparison } from "@/components/sections/Comparison";
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
          "Diagnóstico, construção e continuidade de IA aplicada. 6 novas empresas por trimestre.",
      },
      {
        property: "og:title",
        content: "IAplicada Business · IA aplicada ao operacional",
      },
      {
        property: "og:description",
        content:
          "Sistemas de IA construídos, entregues e rodando no seu operacional em 3 a 12 semanas.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#FAFAF7" },
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
      <Systems />
      <Approach />
      <Process />
      <Cases />
      <Comparison />
      <Authority />
      <ForWhom />
      <FAQ />
      <CTAFinal />
      <Footer />
    </main>
  );
}
