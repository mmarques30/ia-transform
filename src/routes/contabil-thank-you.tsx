import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/contabil-thank-you")({
  staticData: { sitemap: false },
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
});
