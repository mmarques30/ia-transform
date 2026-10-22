import { createFileRoute } from "@tanstack/react-router";
import { BusinessLanding } from "@/components/sections/business/variantA/BusinessLanding";

export const Route = createFileRoute("/")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      // Título e descrição dizem a categoria ("software com IA sob medida")
      // e o nome da marca: é o que o Google mostra e o que as IAs usam pra
      // entender do que a página trata.
      { title: "IAplicada · Software com IA sob medida para a sua operação" },
      {
        name: "description",
        content:
          "A IAplicada constrói software com IA sob medida que automatiza a operação da sua empresa em até 90 dias, sem aumentar a folha. Diagnóstico gratuito.",
      },
      {
        property: "og:title",
        content: "IAplicada · Software com IA sob medida para a sua operação",
      },
      {
        property: "og:description",
        content:
          "Construímos sistemas de IA sob medida que eliminam o trabalho manual que trava sua operação — para você escalar receita sem precisar contratar mais ninguém.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://iaplicada.com/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#0d0d0d" },
    ],
    links: [{ rel: "canonical", href: "https://iaplicada.com/" }],
  }),
  component: BusinessLanding,
});
