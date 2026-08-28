import { createFileRoute } from "@tanstack/react-router";
import { BgDobra } from "@/components/BgDobra";
import { Hero } from "@/components/sections/business/variantB/Hero";
import { Problem } from "@/components/sections/business/variantB/Problem";
import { Testimonials } from "@/components/sections/business/variantB/Testimonials";
import { SelectedClients } from "@/components/sections/business/variantB/SelectedClients";
import { MetodoAplicaBook } from "@/components/sections/business/variantB/MetodoAplicaBook";
import { AppShowcase } from "@/components/sections/business/variantB/AppShowcase";
import { MentorMari } from "@/components/sections/business/variantB/MentorMari";
import { Guarantee } from "@/components/sections/business/variantB/Guarantee";
import { Urgency } from "@/components/sections/business/variantB/Urgency";
import { Manifesto } from "@/components/sections/business/variantB/Manifesto";
import { FinalForm } from "@/components/sections/business/variantB/FinalForm";
import { QualifierStrip } from "@/components/sections/business/variantB/QualifierStrip";
import { DiagnosticoModalProvider } from "@/components/sections/business/variantB/DiagnosticoModal";
import { Footer } from "@/components/sections/Footer";

/**
 * /businessv2 — LP-B refeita no formato Acelerador Empresarial
 * (aceleradorempresarial.com.br) adaptada ao branding IAplicada.
 *
 * Ordem das seções (fiel ao mockup V5 aprovado no spec):
 *   01 Hero (qualifier strip + texto + mockup do painel + CTA glow)
 *   02 Problem (polígono + 2-col + CTA glow)
 *   03 Testimonials (colagem de screenshots simulados)
 *   04 SelectedClients (grid 4-col de fundadores/logos)
 *   05 MetodoAplicaBook (book 3D dark + copy)
 *   06 AppShowcase (phone + backdrop lime + copy)
 *   07 MentorMari (foto full-bleed esquerda + credenciais + CTA glow)
 *   08 Guarantee (carta cartório + carimbo lime "diagnóstico sem custo")
 *   09 Urgency (banda vermelha "4 slots/semana" + CTA glow)
 *   10 Manifesto (equação editorial serif italic)
 *   11 FinalForm (form embedded no fim — HeroForm inline)
 *   12 QualifierStrip rodapé
 *   13 Footer padrão
 *
 * Componentes shared (Solution / Process / OliveWave / Comparison /
 * Authority / FAQ / Ticker / Systems / Impact / CTAFinal antigo) foram
 * REMOVIDOS do fluxo — a LP-B agora tem narrativa própria, mais curta
 * e focada em conversão (todo CTA aponta pra /businessv2/diagnostico).
 */
export const Route = createFileRoute("/businessv2")({
  head: () => ({
    meta: [
      {
        title: "IAplicada Business · Sua operação pode rodar sozinha em até 60 dias",
      },
      {
        name: "description",
        content:
          "Método APLICA + sistema sob medida no seu domínio. Diagnóstico sem custo, feito por um sócio da IAplicada. Exclusivo pra empresas com faturamento acima de R$1MM/ano.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { name: "theme-color", content: "#0d0d0d" },
    ],
  }),
  component: BusinessV2Landing,
});

/**
 * Cadência intercalada (mesmo sistema da LP `/`): BgDobra alta em
 * seções de alta intensidade (Hero, Urgency, form CTA) e média em
 * seções de conteúdo.
 *
 * Hero, Testimonials, MentorMari e Guarantee NÃO recebem BgDobra
 * externa — eles têm fundo próprio integrado (radial glow, gradient,
 * painel escuro).
 */
function BusinessV2Landing() {
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
