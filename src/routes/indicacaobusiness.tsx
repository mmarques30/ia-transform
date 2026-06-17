import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/indicacaobusiness/Hero";
import { Problem } from "@/components/sections/indicacaobusiness/Problem";
import { Solution } from "@/components/sections/indicacaobusiness/Solution";
import { Systems } from "@/components/sections/indicacaobusiness/Systems";
import { OliveWave } from "@/components/sections/indicacaobusiness/OliveWave";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { Process } from "@/components/sections/indicacaobusiness/Process";
import { Impact } from "@/components/sections/indicacaobusiness/Impact";
import { Comparison } from "@/components/sections/Comparison";
import { Authority } from "@/components/sections/Authority";
import { FAQ } from "@/components/sections/FAQ";
import { CTAFinal } from "@/components/sections/indicacaobusiness/CTAFinal";
import { Footer } from "@/components/sections/Footer";

/**
 * /indicacaobusiness — Duplicação da LP /contabil pro funil de indicação
 * Business. Estrutura visual idêntica. Sections vivem em
 * src/components/sections/indicacaobusiness/ pra permitir customização
 * futura de copy/imagens sem afetar a /contabil original.
 *
 * Form da LP usa o mesmo HeroFormContabil (slug business-contabil por
 * default — pode ser ajustado quando o CRM tiver pipeline próprio pra
 * indicação). UTM term default "indicacao-business" definido no
 * captureTrafficContext() do formSubmit.ts pra diferenciar leads dessa
 * LP no funil.
 */
export const Route = createFileRoute("/indicacaobusiness")({
  head: () => ({
    meta: [
      {
        title: "IA para escritório contábil · IAplicada · Primeira rotina em 7 dias",
      },
      {
        name: "description",
        content:
          "A IAplicada coloca o seu escritório contábil rodando com IA em 2 meses. Primeira rotina automatizada em 7 dias. Método aplicado, sem curso e sem software engessado.",
      },
      {
        property: "og:title",
        content: "IA para escritório contábil · IAplicada",
      },
      {
        property: "og:description",
        content:
          "Contratar mais um júnior não vai salvar o seu fechamento. Automatize conciliação, apuração e obrigações no fluxo que seu time já conhece.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#FAFAF7" },
    ],
  }),
  component: IndicacaoBusinessLanding,
});

function IndicacaoBusinessLanding() {
  return (
    <main className="min-h-screen text-foreground">
      <Header homePath="/indicacaobusiness" />
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
