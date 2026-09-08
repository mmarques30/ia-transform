import { createFileRoute } from "@tanstack/react-router";
import { BusinessLanding } from "@/components/sections/business/variantA/BusinessLanding";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "IAplicada Business · Recupere o controle da operação e escale a receita",
      },
      {
        name: "description",
        content:
          "Em até 90 dias implementamos os sistemas de IA que automatizam o operacional e liberam seu time para crescer. Sem aumentar a folha.",
      },
      {
        property: "og:title",
        content: "IAplicada Business · Recupere o controle da operação e escale a receita",
      },
      {
        property: "og:description",
        content:
          "Construímos sistemas de IA sob medida que eliminam o trabalho manual que trava sua operação — para você escalar receita sem precisar contratar mais ninguém.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#0d0d0d" },
    ],
  }),
  component: BusinessLanding,
});
