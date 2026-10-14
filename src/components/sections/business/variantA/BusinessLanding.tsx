import { BgDobra } from "@/components/BgDobra";
import { Hero } from "@/components/sections/business/variantA/Hero";
import { Problem } from "@/components/sections/business/variantA/Problem";
import { Comparison } from "@/components/sections/business/variantA/Comparison";
import { MetodoAplicaBook } from "@/components/sections/business/variantA/MetodoAplicaBook";
import { ContaQueNinguemFaz } from "@/components/sections/business/variantA/ContaQueNinguemFaz";
import { Team } from "@/components/sections/business/variantA/Team";
import { ValueStrip } from "@/components/sections/business/variantA/ValueStrip";
import { ParaQuem } from "@/components/sections/business/variantA/ParaQuem";
import { FAQ } from "@/components/sections/business/variantA/FAQ";
import { Testimonials } from "@/components/sections/business/variantB/Testimonials";
import { DiagnosticoModalProvider } from "@/components/sections/business/variantB/DiagnosticoModal";
import { Footer } from "@/components/sections/Footer";
import { LpLocaleProvider, type LpLocale } from "@/lib/lpLocale";

export interface BusinessLandingProps {
  /** H1 do hero. Omitido = copy da /. */
  heroTitle?: React.ReactNode;
  /** Sub-headline do hero. Omitido = copy da /. */
  heroSubtitle?: React.ReactNode;
  /** Slug fixo da rota, enviado sempre como `landing_page`. Default "home". */
  landingPage?: string;
  /**
   * Idioma/mercado da LP. Default pt-br (Brasil). pt-us e en trocam a copy
   * de todas as dobras e o form (slug, faixas, telefone, obrigado).
   */
  locale?: LpLocale;
}

/**
 * Composição da LP Business (/ e variantes /iaplicada-*). As variantes
 * trocam só H1 + sub-headline do hero e o utm_content default do form;
 * todo o resto é idêntico por construção.
 *
 * Ordem das dobras:
 *  Hero → ValueStrip → Problem → Comparison → MetodoAplicaBook
 *  → ContaQueNinguemFaz → Testimonials → Team → ParaQuem → FAQ → Footer
 */
export function BusinessLanding({
  heroTitle,
  heroSubtitle,
  landingPage = "home",
  locale = "pt-br",
}: BusinessLandingProps) {
  return (
    <LpLocaleProvider locale={locale}>
      <DiagnosticoModalProvider>
        <main className="min-h-screen text-foreground" style={{ backgroundColor: "#0a0c07" }}>
          <Hero title={heroTitle} subtitle={heroSubtitle} landingPage={landingPage} />

          <ValueStrip />

          <BgDobra intensity="media">
            <Problem />
          </BgDobra>

          <Comparison />

          <MetodoAplicaBook />

          <ContaQueNinguemFaz />

          <Testimonials />

          <Team />

          <ParaQuem />

          <FAQ />

          <Footer />
        </main>
      </DiagnosticoModalProvider>
    </LpLocaleProvider>
  );
}
