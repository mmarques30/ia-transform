import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/business/variantB/Hero";
import { Problem } from "@/components/sections/business/variantB/Problem";
import { Solution } from "@/components/sections/business/Solution";
import { Systems } from "@/components/sections/business/variantB/Systems";
import { OliveWave } from "@/components/sections/business/OliveWave";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { Process } from "@/components/sections/business/Process";
import { Impact } from "@/components/sections/business/variantB/Impact";
import { Comparison } from "@/components/sections/Comparison";
import { Authority } from "@/components/sections/Authority";
import { FAQ } from "@/components/sections/FAQ";
import { CTAFinal } from "@/components/sections/business/variantB/CTAFinal";
import { Footer } from "@/components/sections/Footer";

/**
 * /businessv2 — variante B do refactor Business (phase 3 de 5).
 *
 * Ângulo LP-B: "De operação fragmentada a operação que escala."
 * ICP: empresa em crescimento que percebe que o modelo atual não
 * suporta mais clientes sem dor proporcional.
 *
 * Mesma estrutura de dobras da /contabil (dark charcoal, h-mix),
 * usando o shell business/ com sections variant-specific em
 * business/variantB/ (Hero, Problem, Systems, Impact, CTAFinal)
 * e shared em business/ root (Solution=Método MAPA, Process=Jornada).
 *
 * noindex mantido — LP alternativa pra teste. Retira no dia que
 * virar oficial.
 */
export const Route = createFileRoute("/businessv2")({
  head: () => ({
    meta: [
      {
        title: "IAplicada Business · Sua operação não escala se depende de gente",
      },
      {
        name: "description",
        content:
          "Empresas de serviço que cresceram sem digitalizar chegam no mesmo ponto: cada cliente novo é mais trabalho manual. A IAplicada transforma isso — do diagnóstico ao sistema.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { name: "theme-color", content: "#0d0d0d" },
    ],
  }),
  component: BusinessV2Landing,
});

function BusinessV2Landing() {
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
