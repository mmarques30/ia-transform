import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/contabil02")({
  staticData: { sitemap: false },
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
});
