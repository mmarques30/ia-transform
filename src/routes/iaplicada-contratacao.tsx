import { createFileRoute } from "@tanstack/react-router";
import { BusinessLanding } from "@/components/sections/business/variantA/BusinessLanding";
import { LP_VARIANTS, variantHead } from "@/config/lpVariants";

const v = LP_VARIANTS.contratacao;

export const Route = createFileRoute("/iaplicada-contratacao")({
  head: () => variantHead(v),
  component: () => (
    <BusinessLanding heroTitle={v.heroTitle} heroSubtitle={v.heroSubtitle} utmContent={v.slug} />
  ),
});
