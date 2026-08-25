import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/contabil-thank-you")({
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
});
