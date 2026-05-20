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

function NumberedSection({
  n,
  label,
  children,
  onDark = false,
}: {
  n: string;
  label: string;
  children: React.ReactNode;
  onDark?: boolean;
}) {
  return (
    <div className="relative">
      <span
        aria-hidden
        className="pointer-events-none absolute top-10 lg:top-14 left-4 sm:left-6 lg:left-12 z-10 text-[11px] font-mono tracking-[0.18em] uppercase"
        style={{ color: onDark ? "oklch(1 0 0 / 0.55)" : "oklch(0 0 0 / 0.45)" }}
      >
        {n} / {label}
      </span>
      {children}
    </div>
  );
}

function BusinessLanding() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <NumberedSection n="01" label="O Problema"><Problem /></NumberedSection>
      <NumberedSection n="02" label="A Resposta"><Solution /></NumberedSection>
      <NumberedSection n="03" label="Sistemas"><Systems /></NumberedSection>
      <NumberedSection n="04" label="Diagnóstico" onDark><OliveWave /></NumberedSection>
      <NumberedSection n="05" label="Processo"><Process /></NumberedSection>
      <NumberedSection n="06" label="Impacto"><Impact /></NumberedSection>
      <NumberedSection n="07" label="Quem entrega"><Authority /></NumberedSection>
      <NumberedSection n="08" label="Para quem"><ICP /></NumberedSection>
      <NumberedSection n="09" label="Comparativo"><Comparison /></NumberedSection>
      <NumberedSection n="10" label="Dúvidas"><FAQ /></NumberedSection>
      <NumberedSection n="11" label="Próximo passo"><CTAFinal /></NumberedSection>
      <Footer />
    </main>
  );
}
