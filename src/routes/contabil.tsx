import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/contabil")({
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
});
