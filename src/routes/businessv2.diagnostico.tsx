import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/businessv2/diagnostico")({
  staticData: { sitemap: false },
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
});
