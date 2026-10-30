import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * LP desativada: redireciona pra home mantendo a query string, pra anúncio
 * que ainda aponte pra cá não perder UTM, gclid nem fbclid.
 */
export const Route = createFileRoute("/iaplicada-crescimento")({
  staticData: { sitemap: false },
  beforeLoad: ({ location }) => {
    throw redirect({ href: `/${location.searchStr}` });
  },
});
