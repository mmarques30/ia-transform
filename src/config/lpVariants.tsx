/**
 * Variantes da LP Business em rotas paralelas (/iaplicada-*). Cada uma
 * herda a / inteira e troca só o H1 + sub-headline do hero. O slug vira
 * o utm_content default do form pra medir Lead→MQL por variante.
 */

const NOVENTA_DIAS = <em style={{ color: "var(--color-primary)" }}>90 dias</em>;

export interface LpVariant {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  heroTitle: React.ReactNode;
  heroSubtitle: React.ReactNode;
}

export const LP_VARIANTS = {
  crescimento: {
    slug: "iaplicada-crescimento",
    metaTitle: "IAplicada Business · Faturamento cresceu. Operação virou gargalo.",
    metaDescription:
      "Em até 90 dias construímos o software com IA que automatiza a operação sob medida pro jeito que a empresa funciona. Sem ERP engessado. Sem consultoria que some depois da apresentação.",
    heroTitle: (
      <>
        <span className="hero-b-h1-sans">Faturamento&nbsp;cresceu.</span>
        <br />
        <em className="hero-b-h1-em">Operação virou&nbsp;gargalo.</em>
      </>
    ),
    heroSubtitle: (
      <>
        Em até {NOVENTA_DIAS} construímos o software com IA que automatiza a operação sob medida pro
        jeito que a empresa funciona. Sem ERP engessado. Sem consultoria que some depois da
        apresentação.
      </>
    ),
  },
  erp: {
    slug: "iaplicada-erp",
    metaTitle: "IAplicada Business · Seu ERP arrumou o cadastro. Não arrumou a operação.",
    metaDescription:
      "Em até 90 dias construímos o software com IA que preenche o vazio entre o ERP e o que a empresa realmente precisa. Automações, integrações e agentes que fazem o trabalho manual que sobrou.",
    heroTitle: (
      <>
        <span className="hero-b-h1-sans">Seu ERP arrumou o&nbsp;cadastro.</span>
        <br />
        <em className="hero-b-h1-em">Não arrumou a&nbsp;operação.</em>
      </>
    ),
    heroSubtitle: (
      <>
        Em até {NOVENTA_DIAS} construímos o software com IA que preenche o vazio entre o ERP e o que
        a empresa realmente precisa. Automações, integrações e agentes que fazem o trabalho manual
        que sobrou.
      </>
    ),
  },
  contratacao: {
    slug: "iaplicada-contratacao",
    metaTitle:
      "IAplicada Business · Você não precisa contratar mais gente. Precisa da operação dando conta.",
    metaDescription:
      "Em até 90 dias construímos o software com IA que resolve o trabalho manual que hoje custaria mais gente na folha. Aumentar custo fixo é a última coisa que sua empresa precisa agora.",
    heroTitle: (
      <>
        <span className="hero-b-h1-sans">Você não precisa contratar mais&nbsp;gente.</span>
        <br />
        <em className="hero-b-h1-em">Precisa da operação dando&nbsp;conta.</em>
      </>
    ),
    heroSubtitle: (
      <>
        Em até {NOVENTA_DIAS} construímos o software com IA que resolve o trabalho manual que hoje
        custaria mais gente na folha. Aumentar custo fixo é a última coisa que sua empresa precisa
        agora.
      </>
    ),
  },
} satisfies Record<string, LpVariant>;

export function variantHead(v: LpVariant) {
  return {
    meta: [
      { title: v.metaTitle },
      { name: "description", content: v.metaDescription },
      { property: "og:title", content: v.metaTitle },
      { property: "og:description", content: v.metaDescription },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#0d0d0d" },
    ],
  };
}
