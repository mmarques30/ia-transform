import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/contabilcalculo/Hero";
import { Metrics } from "@/components/sections/contabilcalculo/Metrics";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { DorResposta } from "@/components/sections/contabilcalculo/DorResposta";
import { Calculadora } from "@/components/sections/contabilcalculo/Calculadora";
import { FAQ } from "@/components/sections/contabilcalculo/FAQ";
import { CTAFinal } from "@/components/sections/contabilcalculo/CTAFinal";
import { DiagnosticoProvider } from "@/components/sections/contabilcalculo/DiagnosticoContext";
import { Footer } from "@/components/sections/Footer";

/**
 * /contabilcalculo — LP focada 100% no diagnóstico.
 *
 * Estrutura redesenhada inspirada em nextsense.io adaptada à marca
 * IAplicada (cores, fontes, menu preservados):
 *
 *   1. Hero — display oversized + mockup com whitespace
 *   2. ClientLogos — credibilidade imediata pós-hero
 *   3. Metrics — 4 números oversized (75% / 7d / 8sem / +80)
 *   4. DorResposta — 3 cards full-bleed + bloco "A virada"
 *   5. Calculadora — marketing intro + wizard em MODAL global
 *   6. CTAFinal — display type ascending oversized
 *   7. FAQ — 3 grupos com ícones de categoria
 *
 * O wizard da calc roda em modal full-screen disparado por qualquer
 * CTA "Fazer meu diagnóstico" da página. State (etapas + resultado)
 * vive na própria Calculadora; abertura controlada via
 * DiagnosticoProvider context.
 *
 * Form submission: calculadora posta no form-submit (slug
 * business-contabil) com fields da calc + scores no raw_data.
 */

const PAGE_BG = "oklch(0.14 0.018 122)";

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

/** Itens de menu específicos da /contabilcalculo — apontam só pras
 *  seções que existem nessa LP (a default nav tinha Sistemas/Abordagem/
 *  Time que não existem aqui e quebravam quando clicadas). */
const CONTABILCALCULO_NAV = [
  { href: "#cenario", label: "Cenário" },
  { href: "#benchmarks", label: "Benchmarks" },
  { href: "#calculadora", label: "Diagnóstico" },
  { href: "#faq", label: "FAQ" },
];

function ContabilCalculoLanding() {
  return (
    <DiagnosticoProvider>
      <main
        className="min-h-screen text-foreground"
        style={{ backgroundColor: PAGE_BG }}
      >
        <Header
          homePath="/"
          hideCta
          nav={CONTABILCALCULO_NAV}
          badgeLabel="Contábil"
        />
        <Hero />
        <ClientLogos />
        <Metrics />
        <DorResposta />
        <Calculadora />
        <CTAFinal />
        <FAQ />
        <Footer />
      </main>
    </DiagnosticoProvider>
  );
}
