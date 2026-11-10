import { createFileRoute } from "@tanstack/react-router";
import siteCss from "../components/site/site.css?url";
import { SiteLanding } from "@/components/site/SiteLanding";

export const Route = createFileRoute("/site")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "IAplicada · Software com IA sob medida para a sua operação" },
      {
        name: "description",
        content:
          "A IAplicada constrói software com IA sob medida que automatiza a operação da sua empresa em até 90 dias, com o time que você já tem. MVP em 30 dias. Diagnóstico gratuito.",
      },
      { property: "og:title", content: "IAplicada · Faça o dobro com o time que você já tem" },
      {
        property: "og:description",
        content:
          "Software com IA sob medida, Método APLICA e sistema rodando em até 90 dias. Conheça a IAplicada.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://iaplicada.com/site" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#070806" },
    ],
    links: [
      { rel: "canonical", href: "https://iaplicada.com/site" },
      { rel: "stylesheet", href: siteCss },
      { rel: "preload", as: "image", href: "/brand/mariana-transparente.webp" },
    ],
  }),
  component: SiteLanding,
});
