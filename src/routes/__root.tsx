import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { useEffect } from "react";

import appCss from "../styles.css?url";
import { initLenis, destroyLenis } from "../lib/motion";
import { BrandBackground } from "../components/BrandBackground";
import { isInAppBrowser } from "../lib/useEnv";

// IDs do Microsoft Clarity por LP. Cada projeto tem seu próprio dashboard
// com heatmaps/replays isolados pra não misturar funis. Default é o
// projeto da LP business — usado também por rotas que não casam com
// nenhum dos prefixos específicos abaixo.
//
// As rotas /contabil02 e /contabilcalculo são prefixadas por "/contabil",
// então o matching precisa ser feito do MAIS específico pro menos
// específico (ver runtime selector no script abaixo).
const CLARITY_PROJECT_ID_BUSINESS = "wpgxq27fhi"; // /
const CLARITY_PROJECT_ID_CONTABIL = "wxsk6a8ej4"; // /contabil (+ /contabil-thank-you)
const CLARITY_PROJECT_ID_CONTABIL02 = "x291ty5740"; // /contabil02
const CLARITY_PROJECT_ID_CONTABILCALCULO = "x291zkjjfi"; // /contabilcalculo
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
          "Programa de diagnóstico, construção e continuidade de IA aplicada pra empresas de 50 a 2.000 pessoas. A gente implementa. Seu time opera.",
      },
      { name: "author", content: "IAplicada" },
      {
        property: "og:title",
        content: "IAplicada Business · IA aplicada ao operacional da sua empresa",
      },
      {
        property: "og:description",
        content:
          "Não construímos por hype. Cada sistema é projetado pra resolver um problema operacional específico.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://iaplicada.com/" },
      { property: "og:image", content: "https://iaplicada.com/brand/capa_biz_sistemas.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "IAplicada Business · IA aplicada ao operacional da sua empresa",
      },
      {
        name: "twitter:description",
        content:
          "Não construímos por hype. Cada sistema é projetado pra resolver um problema operacional específico.",
      },
      { name: "twitter:image", content: "https://iaplicada.com/brand/capa_biz_sistemas.jpg" },
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
        href: "/brand/iaplicada-logo-dark.png",
        fetchpriority: "high",
      },
      // Preconnect/dns-prefetch pro Clarity — reduz latência da carga
      // do tag async (~80-150ms a menos em conexões médias). Importante
      // pra capturar sessões curtas onde o usuário sai antes do tag
      // terminar de carregar.
      { rel: "preconnect", href: "https://www.clarity.ms" },
      { rel: "dns-prefetch", href: "https://www.clarity.ms" },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
    scripts: [
      // Microsoft Clarity — heatmaps, session replays, frustration signals.
      // Inicializa cedo pra capturar a sessão desde o primeiro paint.
      //
      // Em ambiente de preview/iframe do Lovable o tráfego polui as
      // métricas (acessos do editor, não usuários reais). Sinaliza
      // environment=production só quando o hostname for o domínio real,
      // permitindo filtrar via segmento no dashboard do Clarity.
      //
      // Projeto Clarity escolhido em runtime pelo pathname. Matching
      // ordenado do MAIS específico → MENOS específico pra evitar
      // colisão de prefixos (/contabilcalculo e /contabil02 começam
      // com "/contabil"). Carrega um único tag por página (sem dupla
      // contagem).
      {
        children: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script",(function(){var p=(window.location&&window.location.pathname)||"";if(p.indexOf("/contabilcalculo")===0)return "${CLARITY_PROJECT_ID_CONTABILCALCULO}";if(p.indexOf("/contabil02")===0)return "${CLARITY_PROJECT_ID_CONTABIL02}";if(p.indexOf("/contabil")===0)return "${CLARITY_PROJECT_ID_CONTABIL}";return "${CLARITY_PROJECT_ID_BUSINESS}";})());try{if(window.location&&window.location.hostname==="iaplicada.com"){window.clarity("set","environment","production");}else{window.clarity("set","environment","preview");}}catch(e){}`,
      },
      // Meta Pixel — conversões / remarketing Facebook/Instagram Ads.
      // Define a função fbq() imediatamente (com fila) e dispara
      // init + PageView, mas atrasa o download do fbevents.js externo em
      // 2s pra não competir com o LCP. Quando o script carrega, a fila
      // é drenada e os eventos vão na ordem certa.
      {
        children: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.defer=!0;t.src=v;setTimeout(function(){s=b.getElementsByTagName(e)[0];if(s&&s.parentNode){s.parentNode.insertBefore(t,s);}else{b.head.appendChild(t);}},2000);}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`,
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
  useEffect(() => {
    // Lenis adiciona inércia ao scroll. Bom no desktop, mas no WebView
    // do IG/FB ele briga com o gesto nativo de swipe-back e deixa o
    // scroll "borrachudo". Pulamos init nesse contexto.
    if (isInAppBrowser()) return;
    initLenis();
    return () => destroyLenis();
  }, []);
  return (
    <>
      <BrandBackground />
      <Outlet />
    </>
  );
}
