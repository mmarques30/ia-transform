/**
 * Dados estruturados (schema.org em JSON-LD) pra buscadores e IAs.
 *
 * Google, ChatGPT, Perplexity e afins leem esse bloco pra saber QUEM é a
 * IAplicada (Organization), quem fundou (Person) e O QUE ela vende
 * (Service), sem depender de interpretar o layout. Só fatos que já estão
 * nas páginas: nada aqui pode prometer o que a LP não promete.
 */

const SITE = "https://iaplicada.com";
export const ORG_ID = `${SITE}/#organization`;
const FOUNDER_ID = `${SITE}/#mariana-marques`;

/** Grafo do site inteiro: empresa, fundadora e o próprio site. */
export const SITE_GRAPH = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: "IAplicada",
      url: `${SITE}/`,
      logo: `${SITE}/brand/iaplicada-logo-dark.png`,
      email: "comercial@iaplicada.com",
      telephone: "+55-11-95056-6101",
      slogan: "#menoshypemaisentrega",
      description:
        "A IAplicada constrói software com inteligência artificial sob medida para automatizar a operação de empresas, em até 90 dias, com o Método APLICA.",
      founder: { "@id": FOUNDER_ID },
      knowsAbout: [
        "Inteligência artificial aplicada a negócios",
        "Automação de processos",
        "Software sob medida",
        "Integração de sistemas",
        "Transformação digital",
      ],
    },
    {
      "@type": "Person",
      "@id": FOUNDER_ID,
      name: "Mariana Marques",
      jobTitle: "Founder & CEO",
      worksFor: { "@id": ORG_ID },
      description:
        "11 anos como executiva em Mercado Livre, Suzano e AngloGold, liderando transformação digital na América Latina. Fundou a IAplicada e criou a metodologia APLICA.",
      sameAs: [
        "https://www.linkedin.com/in/marianamarquescabral/",
        "https://www.instagram.com/marimarquescb/",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: `${SITE}/`,
      name: "IAplicada",
      publisher: { "@id": ORG_ID },
      inLanguage: "pt-BR",
    },
  ],
};

/** Serializa pra <script type="application/ld+json"> sem quebrar o HTML. */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
