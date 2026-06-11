import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { lazy, useEffect, useState } from "react";

import appCss from "../styles.css?url";
import { isInAppBrowser } from "../lib/useEnv";

/**
 * BrandBackground (WebGL via OGL) é lazy pra não pesar o entry chunk
 * com a lib de WebGL (~25 kB gzip) e o shader code. Renderiza após o
 * first paint — visualmente um piscar de ~50ms antes do BG entrar, mas
 * o LCP da página é a Hero (que NÃO depende do BG).
 */
const BrandBackground = lazy(() =>
  import("../components/BrandBackground").then((m) => ({
    default: m.BrandBackground,
  })),
);

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
      // Fonts agora são self-hosted em /fonts/ (ver @font-face no
      // styles.css). Preload só da Inter (a fonte mais usada — body,
      // headings sans), que é a única requerida no first paint.
      // Os 2 Instrument Serif (h-mix com <em>) carregam normal sem
      // preload — bloqueariam o critical path por bytes que só
      // aparecem em poucos elementos italicizados.
      {
        rel: "preload",
        as: "font",
        href: "/fonts/inter-latin.woff2",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      // Preload da logo (LCP candidate na maioria dos viewports).
      // WebP em vez do PNG: 19 kB vs 39 kB (-51% no download crítico).
      // Browsers sem suporte a WebP (raríssimos hoje) ignoram o preload
      // e baixam o PNG via fallback do <picture> no Logo component.
      {
        rel: "preload",
        as: "image",
        href: "/brand/iaplicada-logo-dark.webp",
        type: "image/webp",
        fetchpriority: "high",
      },
      // (Removidos preconnect/dns-prefetch pra clarity.ms — o tag agora
      //  carrega via /c/tag/<id> do nosso próprio domínio, então a
      //  conexão pra clarity.ms é feita server-side pelo Worker.
      //  Manter os hints faria o browser abrir conexão TLS pra fora
      //  desnecessariamente.)
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
      //
      // Tag carregado via /c/tag/<id> (proxy do nosso próprio domínio
      // implementado em src/server-entry.ts). Bypass de adblockers
      // que bloqueiam *.clarity.ms na lista padrão (uBlock, Brave,
      // AdBlock Plus). O Worker proxia pra clarity.ms e reescreve as
      // URLs internas do SDK pra rotear tudo via /c/*.
      {
        children: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="/c/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script",(function(){var p=(window.location&&window.location.pathname)||"";if(p.indexOf("/contabilcalculo")===0)return "${CLARITY_PROJECT_ID_CONTABILCALCULO}";if(p.indexOf("/contabil02")===0)return "${CLARITY_PROJECT_ID_CONTABIL02}";if(p.indexOf("/contabil")===0)return "${CLARITY_PROJECT_ID_CONTABIL}";return "${CLARITY_PROJECT_ID_BUSINESS}";})());try{if(window.location&&window.location.hostname==="iaplicada.com"){window.clarity("set","environment","production");}else{window.clarity("set","environment","preview");}}catch(e){}`,
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
  /** Mostra o BrandBackground só APÓS o first paint, pra não bloquear
   *  o critical path. Visualmente o BG entra ~50ms depois — usuário
   *  raramente percebe e o LCP da Hero não depende dele. */
  const [showBg, setShowBg] = useState(false);

  useEffect(() => {
    // Lenis adiciona inércia ao scroll. Bom no desktop, mas no WebView
    // do IG/FB ele briga com o gesto nativo de swipe-back e deixa o
    // scroll "borrachudo". Pulamos init nesse contexto.
    //
    // motion.ts traz GSAP + ScrollTrigger + SplitText + Lenis (~70 kB
    // gzip total). Dynamic import dentro do useEffect tira esses
    // bytes do entry chunk — eles entram em chunk separado que carrega
    // em paralelo com o resto, sem bloquear LCP.
    if (isInAppBrowser()) return;
    let cleanup: (() => void) | undefined;
    import("../lib/motion")
      .then(({ initLenis, destroyLenis }) => {
        initLenis();
        cleanup = destroyLenis;
      })
      .catch((err) => {
        console.warn("[motion] failed to load Lenis/GSAP", err);
      });

    // BrandBackground entra após o primeiro frame (rAF garante que o
    // browser já pintou o HTML inicial). Reduzido o trabalho no main
    // thread durante a hidratação inicial.
    const raf = requestAnimationFrame(() => setShowBg(true));

    return () => {
      cancelAnimationFrame(raf);
      cleanup?.();
    };
  }, []);
  return (
    <>
      {showBg && <BrandBackground />}
      <Outlet />
    </>
  );
}
