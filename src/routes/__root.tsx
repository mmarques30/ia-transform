import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

const CLARITY_PROJECT_ID = "wpgxq27fhi";
const META_PIXEL_ID = "619312151238896";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "IAplicada Business · IA aplicada ao operacional da sua empresa" },
      {
        name: "description",
        content:
          "Programa de diagnóstico, construção e continuidade de IA aplicada pra empresas de 50 a 2.000 pessoas. A gente implementa — seu time opera.",
      },
      { name: "author", content: "IAplicada" },
      {
        property: "og:title",
        content: "IAplicada Business · IA entregue, rodando e medida",
      },
      {
        property: "og:description",
        content:
          "Diagnóstico em 2 semanas, sistemas de IA construídos sob medida, treinamento e handover. 6 vagas por trimestre.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "IAplicada Business · IA aplicada ao operacional da sua empresa" },
      { name: "twitter:title", content: "IAplicada Business · IA aplicada ao operacional da sua empresa" },
      { name: "description", content: "Não construímos por hype. Cada sistema é projetado pra resolver um problema operacional específico." },
      { property: "og:description", content: "Não construímos por hype. Cada sistema é projetado pra resolver um problema operacional específico." },
      { name: "twitter:description", content: "Não construímos por hype. Cada sistema é projetado pra resolver um problema operacional específico." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/fde05dc6-5082-4a73-81e9-b28976a83f73/id-preview-a4fc7d30--3e493d3c-70cb-40da-85f3-b2dbd161c1a9.lovable.app-1778460552018.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/fde05dc6-5082-4a73-81e9-b28976a83f73/id-preview-a4fc7d30--3e493d3c-70cb-40da-85f3-b2dbd161c1a9.lovable.app-1778460552018.png" },
    ],
    links: [
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      // Preload da folha de estilo do Google Fonts pra o browser baixar
      // mais cedo (paralelo com o resto do HTML). Reduz LCP em ~200-400ms
      // em conexões médias.
      {
        rel: "preload",
        as: "style",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap",
      },
      // Preload da logo (LCP candidate na maioria dos viewports)
      {
        rel: "preload",
        as: "image",
        href: "/brand/iaplicada-logo-light.png",
        fetchpriority: "high",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
    scripts: [
      // Microsoft Clarity — heatmaps, session replays, frustration signals
      {
        children: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY_PROJECT_ID}");`,
      },
      // Meta Pixel — conversões / remarketing Facebook/Instagram Ads
      {
        children: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {/* Meta Pixel — fallback noscript pra browsers sem JS / bots */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
