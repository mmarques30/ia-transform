import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/indicacaobusiness")({
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
});
