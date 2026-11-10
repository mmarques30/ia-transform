import { DiagnosticoModalProvider } from "@/components/sections/business/variantB/DiagnosticoModal";
import { SiteHeader } from "./Header";
import { SiteHero } from "./Hero";
import { CompareSection, ProblemSection, StatsBand } from "./Sections";
import { PlatformSection } from "./Platform";
import { JourneySection, MethodSection } from "./Method";
import { CalculatorSection, CasesSection, TestimonialsSection } from "./Proof";
import { AboutSection, AudienceSection, FaqSection, FinalCtaSection, SiteFooter } from "./About";

/**
 * Site institucional da IAplicada (/site).
 *
 * Estrutura (inspirada na arquitetura de páginas de programa executivo:
 * hero → números → problema → solução → método → jornada → prova →
 * quem lidera → para quem → CTA com detalhes → FAQ):
 *
 *  Header fixo (scroll-spy) → Hero (fundadora + marca) → Métricas/logos
 *  → Problema → Antes x Depois → Plataforma (dashboard + bento)
 *  → Método APLICA → Jornada (dobra clara) → Calculadora → Cases
 *  → Depoimentos → Sobre/Time (dobra clara) → Para quem → CTA final
 *  → FAQ → Footer
 *
 * Todo CTA abre o mesmo modal de diagnóstico (HeroForm, slug business,
 * landing_page "site" derivado da rota).
 */
export function SiteLanding() {
  return (
    <DiagnosticoModalProvider>
      <div className="st-root">
        <SiteHeader />
        <main>
          <SiteHero />
          <StatsBand />
          <ProblemSection />
          <CompareSection />
          <PlatformSection />
          <MethodSection />
          <JourneySection />
          <CalculatorSection />
          <CasesSection />
          <TestimonialsSection />
          <AboutSection />
          <AudienceSection />
          <FinalCtaSection />
          <FaqSection />
        </main>
        <SiteFooter />
      </div>
    </DiagnosticoModalProvider>
  );
}
