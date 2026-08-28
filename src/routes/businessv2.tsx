import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/businessv2")({
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
});
