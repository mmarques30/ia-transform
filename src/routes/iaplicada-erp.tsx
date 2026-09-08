import { createFileRoute } from "@tanstack/react-router";
import { BusinessLanding } from "@/components/sections/business/variantA/BusinessLanding";
import { LP_VARIANTS, variantHead } from "@/config/lpVariants";

const v = LP_VARIANTS.erp;

export const Route = createFileRoute("/iaplicada-erp")({
  head: () => variantHead(v),
  component: () => (
    <BusinessLanding heroTitle={v.heroTitle} heroSubtitle={v.heroSubtitle} utmContent={v.slug} />
  ),
});
