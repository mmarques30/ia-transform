import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/sections/Header";
import { usePageViewBeacon } from "@/hooks/usePageViewBeacon";
import { Hero } from "@/components/sections/contabil02/Hero";
import { Problem } from "@/components/sections/contabil02/Problem";
import { Solution } from "@/components/sections/contabil02/Solution";
import { ParaQuem } from "@/components/sections/contabil02/ParaQuem";
import { Systems } from "@/components/sections/contabil02/Systems";
import { OliveWave } from "@/components/sections/contabil02/OliveWave";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { Process } from "@/components/sections/contabil02/Process";
import { Impact } from "@/components/sections/contabil02/Impact";
import { CTAIntermediate } from "@/components/sections/contabil02/CTAIntermediate";
import { Comparison } from "@/components/sections/Comparison";
import { Authority } from "@/components/sections/Authority";
import { FAQ } from "@/components/sections/contabil02/FAQ";
import { CTAFinal } from "@/components/sections/contabil02/CTAFinal";
import { Footer } from "@/components/sections/Footer";

/**
 * /contabil02 — LP IAplicada Contábil com SEO + GEO completo.
 *
 * Estrutura técnica idêntica à /contabil baseline mas com:
 * - Meta tags otimizadas pra "IA para contabilidade"
 * - 4 JSON-LD schemas (Organization, Service, FAQPage, Breadcrumb)
 *   pra ser citada por ChatGPT, Perplexity e Google AI Overviews
 * - Robots.txt + llms.txt na raiz (PR companion) liberando crawlers de IA
 *
 * O FAQPage schema bate palavra por palavra com o FAQ visível do
 * componente contabil02/FAQ.tsx. Se divergir, Google ignora o schema.
 *
 * Submissão de form: reusa HeroFormContabil. Leads das duas LPs são
 * distinguíveis no CRM pelo utm_term (contabil-v2 default em /contabil02).
 */

const CANONICAL_URL = "https://iaplicada.com/contabil02";
const OG_IMAGE = "https://iaplicada.com/brand/capa_biz_sistemas.jpg";

/**
 * Bloco 2 — Organization schema. Ajuda IA a reconhecer a IAplicada como
 * entidade (quem é, o que faz, onde achar).
 */
const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "IAplicada",
  url: "https://iaplicada.com",
  logo: "https://iaplicada.com/brand/iaplicada-logo-dark.png",
  description:
    "Consultoria especializada em implementação de inteligência artificial para escritórios contábeis brasileiros. Automatiza rotinas fiscais, de folha e de fechamento com o Método MAPA.",
  founder: {
    "@type": "Person",
    name: "Mariana Marques",
    jobTitle: "Fundadora",
    sameAs: [
      "https://www.linkedin.com/in/marianamarquescabral/",
      "https://www.instagram.com/marimarquescb/",
    ],
  },
  sameAs: [
    "https://www.linkedin.com/in/marianamarquescabral/",
    "https://www.instagram.com/marimarquescb/",
    "https://www.youtube.com/@iaplicadaa",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "equipe@iaplicada.com",
    contactType: "comercial",
    areaServed: "BR",
    availableLanguage: "Portuguese",
  },
};

/**
 * Bloco 3 — Service schema. Descreve o serviço (IA para contabilidade)
 * pra IA entender a oferta e citar nos resultados.
 */
const SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Implementação de inteligência artificial para escritórios contábeis",
  name: "Método MAPA, IA aplicada à contabilidade",
  provider: {
    "@type": "Organization",
    name: "IAplicada",
  },
  areaServed: {
    "@type": "Country",
    name: "Brasil",
  },
  audience: {
    "@type": "BusinessAudience",
    name: "Escritórios contábeis de 10 a 100 colaboradores, faturamento acima de R$ 1 milhão/ano",
  },
  description:
    "Automação de rotinas contábeis (lançamento, conciliação bancária, apuração de impostos e fechamento) usando inteligência artificial dentro do sistema que o escritório já usa. Primeira rotina em produção em 7 dias, time autônomo em 2 meses.",
};

/**
 * Bloco 4 — FAQPage schema. O MAIS IMPORTANTE pra GEO: IAs extraem
 * respostas daqui pra perguntas tipo "como usar IA na contabilidade".
 *
 * As perguntas e respostas devem bater palavra por palavra com o
 * componente contabil02/FAQ.tsx. Quando atualizar o FAQ visível,
 * atualize aqui também.
 */
const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Como a inteligência artificial pode ser usada em um escritório de contabilidade?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A IA aplicada à contabilidade automatiza rotinas operacionais como lançamento por contexto e regra, conciliação bancária em lote, apuração de impostos e fechamento mensal. Na IAplicada, isso é feito dentro do sistema que o escritório já usa (Domínio, Alterdata, Omie), sem trocar de ERP e sem depender de TI. A primeira rotina entra em produção em 7 dias e o time fica autônomo em 2 meses.",
      },
    },
    {
      "@type": "Question",
      name: "Qual a diferença entre usar ChatGPT e IA contábil aplicada?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ChatGPT é uma ferramenta genérica para tarefas pontuais, como escrever um e-mail. IA contábil aplicada é um sistema construído dentro do fluxo do escritório, com a equipe e sob o nome do escritório, que executa rotinas específicas como conciliação em lote e apuração. A diferença é que a IA aplicada vira processo operacional contínuo, não uma resposta avulsa.",
      },
    },
    {
      "@type": "Question",
      name: "Preciso trocar de sistema contábil para usar IA no escritório?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Não. A automação da IAplicada roda sobre os sistemas que o escritório já usa, como Domínio, Alterdata e Omie. Não é necessário trocar de ERP nem depender de uma equipe de TI.",
      },
    },
    {
      "@type": "Question",
      name: "Em quanto tempo a IA começa a funcionar no escritório contábil?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A primeira rotina automatizada entra em produção em 7 dias. O time atinge autonomia total em cerca de 2 meses (8 semanas), seguindo as etapas do Método MAPA: mapeamento, aplicação, padronização e acompanhamento.",
      },
    },
    {
      "@type": "Question",
      name: "Automatizar com IA é seguro para os dados dos clientes do escritório (LGPD)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sim. A operação fica sob o controle do escritório, dentro do seu próprio ambiente. A IAplicada assina NDA e estrutura a automação com governança e controle, respeitando a LGPD.",
      },
    },
    {
      "@type": "Question",
      name: "A IA pode errar nos lançamentos e gerar problema fiscal?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A automação da IAplicada trabalha por contexto e regra definidos junto com o escritório, com pontos de revisão e validação humana onde importa. O objetivo é reduzir o retrabalho e o risco de erro manual, mantendo o controle e a governança nas mãos do escritório. Nada entra em produção sem o time validar o padrão antes.",
      },
    },
    {
      "@type": "Question",
      name: "Meu time precisa saber programar para operar a IA?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Não. A IAplicada documenta cada processo e treina a equipe passo a passo. Ao final, o próprio time opera as rotinas automatizadas sozinho, sem conhecimento técnico de programação.",
      },
    },
  ],
};

/**
 * Bloco 5 — Breadcrumb schema. Hierarquia da página pra buscadores.
 */
const BREADCRUMB_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "IAplicada",
      item: "https://iaplicada.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "IA para Contabilidade",
      item: CANONICAL_URL,
    },
  ],
};

export const Route = createFileRoute("/contabil02")({
  head: () => ({
    meta: [
      {
        title:
          "IA para Contabilidade · Automação de Escritório Contábil em 7 Dias | IAplicada",
      },
      {
        name: "description",
        content:
          "IA aplicada à contabilidade: automatize conciliação, apuração e fechamento no fluxo que seu time já usa. Método MAPA, primeira rotina em 7 dias, time autônomo em 2 meses. Diagnóstico gratuito.",
      },
      {
        name: "keywords",
        content:
          "inteligência artificial contabilidade, IA para escritório contábil, automação contábil, automação fiscal, conciliação bancária automática, fechamento contábil IA, IA contábil aplicada",
      },
      { name: "author", content: "Mariana Marques · IAplicada" },
      { name: "language", content: "pt-BR" },
      // robots: index+follow agora que essa LP tem SEO/GEO completo.
      // Era noindex enquanto era duplicata da /contabil sem otimização.
      {
        name: "robots",
        content: "index, follow, max-image-preview:large, max-snippet:-1",
      },
      // Open Graph (WhatsApp, LinkedIn, Facebook)
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:url", content: CANONICAL_URL },
      {
        property: "og:title",
        content:
          "IA para Contabilidade · Automação de Escritório Contábil em 7 Dias",
      },
      {
        property: "og:description",
        content:
          "Cada cliente novo custa 1,5 funcionário. Até a IA entrar na conta. Automatize conciliação, apuração e fechamento no fluxo do seu time. Diagnóstico gratuito.",
      },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      // Twitter/X
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content:
          "IA para Contabilidade · Automação de Escritório Contábil em 7 Dias",
      },
      {
        name: "twitter:description",
        content:
          "Cada cliente novo custa 1,5 funcionário. Até a IA entrar na conta. Diagnóstico gratuito pra escritórios de 10 a 100 colaboradores.",
      },
      { name: "twitter:image", content: OG_IMAGE },
      { name: "theme-color", content: "#FAFAF7" },
    ],
    links: [
      { rel: "canonical", href: CANONICAL_URL },
    ],
    scripts: [
      // 4 JSON-LD schemas pra SEO + GEO.
      // Cada um vira <script type="application/ld+json"> no <head>.
      {
        type: "application/ld+json",
        children: JSON.stringify(ORGANIZATION_SCHEMA),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(SERVICE_SCHEMA),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(FAQ_SCHEMA),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(BREADCRUMB_SCHEMA),
      },
    ],
  }),
  component: Contabil02Landing,
});

function Contabil02Landing() {
  usePageViewBeacon();
  return (
    <main className="min-h-screen text-foreground">
      <Header homePath="/contabil02" />
      <Hero />
      <Problem />
      <Solution />
      <ParaQuem />
      <Authority />
      <Impact />
      <Systems />
      <OliveWave />
      <ClientLogos />
      <Process />
      <CTAIntermediate />
      <Comparison />
      <FAQ />
      <CTAFinal />
      <Footer />
    </main>
  );
}
