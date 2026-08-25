import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/contabil02")({
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
});
