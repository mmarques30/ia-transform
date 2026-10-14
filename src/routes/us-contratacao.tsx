import { createFileRoute } from "@tanstack/react-router";
import { BusinessLanding } from "@/components/sections/business/variantA/BusinessLanding";
import { LP_VARIANTS, variantHead } from "@/config/lpVariants";

const v = LP_VARIANTS.usContratacao;

/**
 * Trilha A: cópia da /iaplicada-contratacao pra brasileiro com empresa nos
 * EUA. Português, faturamento em US$, WhatsApp internacional; o lead entra
 * no form business-us e o obrigado é /thank-you-us (evento lead_us_pt).
 */
export const Route = createFileRoute("/us-contratacao")({
  staticData: { sitemap: true },
  head: () => variantHead(v),
  component: () => (
    <BusinessLanding
      heroTitle={v.heroTitle}
      heroSubtitle={v.heroSubtitle}
      landingPage={v.slug}
      locale="pt-us"
    />
  ),
});
