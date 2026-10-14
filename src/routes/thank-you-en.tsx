import { createFileRoute } from "@tanstack/react-router";
import { ThankYouIntl, thankYouHead } from "@/components/ThankYouIntl";

interface ThankYouSearch {
  eid?: string;
}

/** Obrigado da /en-contratacao. Dispara Lead + lead_us_en. */
export const Route = createFileRoute("/thank-you-en")({
  staticData: { sitemap: false },
  validateSearch: (search: Record<string, unknown>): ThankYouSearch => ({
    eid: typeof search.eid === "string" ? search.eid : undefined,
  }),
  head: () => thankYouHead("en"),
  component: function ThankYouPage() {
    const { eid } = Route.useSearch();
    return <ThankYouIntl market="en" eid={eid} />;
  },
});
