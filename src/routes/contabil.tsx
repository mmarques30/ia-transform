import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/contabil")({
  staticData: { sitemap: false },
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
});
