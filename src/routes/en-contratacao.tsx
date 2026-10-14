import { createFileRoute } from "@tanstack/react-router";
import { BusinessLanding } from "@/components/sections/business/variantA/BusinessLanding";
import { LP_VARIANTS, variantHead } from "@/config/lpVariants";

const v = LP_VARIANTS.enContratacao;

/**
 * Trilha EN: cópia da /iaplicada-contratacao em inglês pra empresas
 * americanas. Contato por e-mail (campo de telefone sem WhatsApp); o lead
 * entra no form business-en e o obrigado é /thank-you-en (evento lead_us_en).
 */
export const Route = createFileRoute("/en-contratacao")({
  staticData: { sitemap: true },
  head: () => variantHead(v),
  component: () => (
    <BusinessLanding
      heroTitle={v.heroTitle}
      heroSubtitle={v.heroSubtitle}
      landingPage={v.slug}
      locale="en"
    />
  ),
});
