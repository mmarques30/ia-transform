import { createFileRoute } from "@tanstack/react-router";
import { ThankYouIntl, thankYouHead } from "@/components/ThankYouIntl";

interface ThankYouSearch {
  eid?: string;
}

/** Obrigado da /us-contratacao. Dispara Lead + lead_us_pt. */
export const Route = createFileRoute("/thank-you-us")({
  staticData: { sitemap: false },
  validateSearch: (search: Record<string, unknown>): ThankYouSearch => ({
    eid: typeof search.eid === "string" ? search.eid : undefined,
  }),
  head: () => thankYouHead("pt-us"),
  component: function ThankYouPage() {
    const { eid } = Route.useSearch();
    return <ThankYouIntl market="pt-us" eid={eid} />;
  },
});
