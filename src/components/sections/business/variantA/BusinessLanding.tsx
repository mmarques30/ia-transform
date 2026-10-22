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
import { LpLocaleProvider, pickLpCopy, type LpCopy, type LpLocale } from "@/lib/lpLocale";
import { ORG_ID, jsonLd } from "@/lib/structuredData";

/** O que a LP vende, em schema.org (Service), no idioma da página. */
const SERVICE_COPY: LpCopy<{ serviceType: string; description: string; areaServed: string }> = {
  "pt-br": {
    serviceType: "Desenvolvimento de software com inteligência artificial sob medida",
    description:
      "Em até 90 dias a IAplicada constrói o software com IA que automatiza a operação da empresa de ponta a ponta, sob medida para o jeito que o negócio funciona. MVP funcional em até 30 dias, integrado ao que a empresa já usa (planilha, CRM, ERP, WhatsApp, e-mail). Diagnóstico gratuito.",
    areaServed: "Brazil",
  },
  "pt-us": {
    serviceType: "Desenvolvimento de software com inteligência artificial sob medida",
    description:
      "Em até 90 dias a IAplicada constrói o software com IA que automatiza a operação da empresa de ponta a ponta, sob medida para o jeito que o negócio funciona. MVP funcional em até 30 dias. Diagnóstico gratuito.",
    areaServed: "United States",
  },
  en: {
    serviceType: "Custom AI-powered software development",
    description:
      "In up to 90 days IAplicada builds the custom AI-powered software that automates a company's operations end to end. Working MVP in up to 30 days, integrated with the tools the company already uses. Free diagnostic.",
    areaServed: "United States",
  },
};

function serviceJsonLd(locale: LpLocale): string {
  const c = pickLpCopy(SERVICE_COPY, locale);
  return jsonLd({
    "@context": "https://schema.org",
    "@type": "Service",
    name: "IAplicada Business",
    serviceType: c.serviceType,
    description: c.description,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: c.areaServed },
    inLanguage: locale === "en" ? "en" : locale === "pt-us" ? "pt-US" : "pt-BR",
  });
}

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
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: serviceJsonLd(locale) }}
          />
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
