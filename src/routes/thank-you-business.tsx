import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/thank-you-business")({
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
});
