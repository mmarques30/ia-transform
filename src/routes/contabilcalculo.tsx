import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/contabilcalculo/Hero";
import { Calculadora } from "@/components/sections/contabilcalculo/Calculadora";
import { Process } from "@/components/sections/contabilcalculo/Process";
import { AuthorityCompact } from "@/components/sections/contabilcalculo/AuthorityCompact";
import { FAQ } from "@/components/sections/contabilcalculo/FAQ";
import { CTAFinal } from "@/components/sections/contabilcalculo/CTAFinal";
import { Footer } from "@/components/sections/Footer";

/**
 * /contabilcalculo — LP da calculadora de IA pra contábil.
 *
 * Estrutura enxuta (6 dobras) focada na ferramenta interativa:
 *   Hero (com mockup visual do resultado)
 *   Calculadora (4 etapas + resultado)
 *   Process (3 passos com flow visual)
 *   AuthorityCompact (foto Mari + 1 parágrafo + cases)
 *   FAQ (4 perguntas essenciais)
 *   CTAFinal
 *
 * Removido vs versão inicial: Problem, Solution, ParaQuem (drop —
 * conteúdo absorvido pelo Hero e pela própria calculadora).
 *
 * Form submission: a calculadora posta pro form-submit com slug
 * "contabil-calculadora" (form dedicado, exige só firstname/email/phone
 * — o resto vai pra raw_data). Lead é distinguível no CRM pelo
 * page_url=/contabilcalculo + utm_term=contabil-calculo.
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
      <Calculadora />
      <Process />
      <AuthorityCompact />
      <FAQ />
      <CTAFinal />
      <Footer />
    </main>
  );
}
