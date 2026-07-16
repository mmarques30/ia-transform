import { createFileRoute } from "@tanstack/react-router";
import { BgDobra } from "@/components/BgDobra";
import { Hero } from "@/components/sections/business/variantA/Hero";
import { Problem } from "@/components/sections/business/variantA/Problem";
import { MetodoAplicaBook } from "@/components/sections/business/variantA/MetodoAplicaBook";
import { AppShowcase } from "@/components/sections/business/variantA/AppShowcase";
import { MentorMari } from "@/components/sections/business/variantA/MentorMari";
import { Guarantee } from "@/components/sections/business/variantA/Guarantee";
import { Urgency } from "@/components/sections/business/variantA/Urgency";
import { Manifesto } from "@/components/sections/business/variantA/Manifesto";
import { FinalForm } from "@/components/sections/business/variantA/FinalForm";
import { QualifierStrip } from "@/components/sections/business/variantA/QualifierStrip";
import { Testimonials } from "@/components/sections/business/variantB/Testimonials";
import { SelectedClients } from "@/components/sections/business/variantB/SelectedClients";
import { DiagnosticoModalProvider } from "@/components/sections/business/variantB/DiagnosticoModal";
import { Footer } from "@/components/sections/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "IAplicada Business · Recupere o controle da operação e escale a receita",
      },
      {
        name: "description",
        content:
          "Em até 90 dias implementamos os sistemas de IA que automatizam o operacional e liberam seu time para crescer. Sem aumentar a folha.",
      },
      {
        property: "og:title",
        content: "IAplicada Business · Recupere o controle da operação e escale a receita",
      },
      {
        property: "og:description",
        content:
          "Construímos sistemas de IA sob medida que eliminam o trabalho manual que trava sua operação — para você escalar receita sem precisar contratar mais ninguém.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#0d0d0d" },
    ],
  }),
  component: BusinessLanding,
});

/**
 * / (LP-A) — mesma estrutura da /businessv2, copy própria pro ângulo
 * "recuperar o controle e escalar sem contratar". Componentes que só
 * mudam de copy foram duplicados em variantA/; componentes onde a
 * copy é a mesma (Testimonials, SelectedClients, DiagnosticoModal)
 * são reusados diretamente de variantB.
 *
 * Ordem espelha o fluxo da v2:
 *  01 Hero (QualifierStrip + form inline + fluxo SVG no bg)
 *  02 Problem (ChaosCards + 2-col bullets + CTA glow)
 *  03 Testimonials (reusa v2 — 9 depoimentos reais)
 *  04 SelectedClients (reusa v2 — stats com count-up)
 *  05 MetodoAplicaBook (trilha vertical A·P·L·I·C·A)
 *  06 AppShowcase (tabs de painéis)
 *  07 MentorMari (foto full-bleed + credenciais)
 *  08 Guarantee (lista editorial dos 3 entregáveis)
 *  09 Urgency (banda vermelha "custo de esperar")
 *  10 Manifesto (fecho editorial)
 *  11 FinalForm (HeroForm inline no fim)
 *  12 QualifierStrip rodapé
 *  13 Footer
 */
function BusinessLanding() {
  return (
    <DiagnosticoModalProvider>
      <main className="min-h-screen text-foreground" style={{ backgroundColor: "#0a0c07" }}>
        <Hero />

        <BgDobra intensity="media">
          <Problem />
        </BgDobra>

        <Testimonials />

        <BgDobra intensity="media">
          <SelectedClients />
        </BgDobra>

        <BgDobra intensity="media">
          <MetodoAplicaBook />
        </BgDobra>

        <AppShowcase />

        <MentorMari />

        <BgDobra intensity="media">
          <Guarantee />
        </BgDobra>

        <Urgency />

        <Manifesto />

        <FinalForm />

        <QualifierStrip />

        <Footer />
      </main>
    </DiagnosticoModalProvider>
  );
}
