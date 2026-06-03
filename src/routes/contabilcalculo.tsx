import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/contabilcalculo/Hero";
import { Problem } from "@/components/sections/contabilcalculo/Problem";
import { Solution } from "@/components/sections/contabilcalculo/Solution";
import { Calculadora } from "@/components/sections/contabilcalculo/Calculadora";
import { Process } from "@/components/sections/contabilcalculo/Process";
import { ParaQuem } from "@/components/sections/contabilcalculo/ParaQuem";
import { Authority } from "@/components/sections/Authority";
import { FAQ } from "@/components/sections/contabilcalculo/FAQ";
import { CTAFinal } from "@/components/sections/contabilcalculo/CTAFinal";
import { Footer } from "@/components/sections/Footer";

/**
 * /contabilcalculo — LP da calculadora de economia com IA pra
 * escritórios contábeis. Mais objetiva que /contabil — toda a copy
 * gira em torno do diagnóstico de 3 minutos.
 *
 * Estrutura (mais enxuta que /contabil/contabil02):
 *   Hero (CTA pra calculadora)
 *   Problem (você sabe quanto perde?)
 *   Solution (virada + 4 entregáveis)
 *   Calculadora (placeholder em PR 1; ferramenta real em PR 2)
 *   Process (3 passos)
 *   ParaQuem (ICP positivo + negativo)
 *   Authority (compartilhada, sem fork)
 *   FAQ (forkada com perguntas da calculadora)
 *   CTAFinal (3 min · R$ 0)
 *
 * Form submission: a calculadora (PR 2) vai postar pro mesmo
 * form-submit com fields extras (colaboradores, horas/tarefa, gargalo,
 * scores). utm_term automático já é "contabil-calculo" (definido em
 * HeroFormContabil.tsx — vamos reusar a mesma lógica).
 *
 * SEO: noindex/nofollow por enquanto. Calculadora é mais funcional
 * pra Ads do que SEO orgânico.
 */
export const Route = createFileRoute("/contabilcalculo")({
  head: () => ({
    meta: [
      {
        title:
          "Calculadora de IA pra Escritório Contábil · IAplicada · Em 3 minutos",
      },
      {
        name: "description",
        content:
          "Em 3 minutos, descubra quantas horas e quantos R$ seu escritório contábil pode recuperar com IA. Diagnóstico gratuito, resultado na hora, sem cartão de crédito.",
      },
      {
        property: "og:title",
        content: "Calculadora de IA pra Escritório Contábil · IAplicada",
      },
      {
        property: "og:description",
        content:
          "Em 3 minutos, descubra quantas horas (e quantos R$) seu escritório pode recuperar com IA. Sem cartão.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#FAFAF7" },
      // LP de calculadora é mais funcional pra Ads do que pra SEO
      // orgânico. Remova quando quiser indexar.
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ContabilCalculoLanding,
});

function ContabilCalculoLanding() {
  return (
    <main className="min-h-screen text-foreground">
      <Header homePath="/contabilcalculo" />
      <Hero />
      <Problem />
      <Solution />
      <Calculadora />
      <Process />
      <ParaQuem />
      <Authority />
      <FAQ />
      <CTAFinal />
      <Footer />
    </main>
  );
}
