import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/indicacaobusiness")({
  staticData: { sitemap: false },
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
});
