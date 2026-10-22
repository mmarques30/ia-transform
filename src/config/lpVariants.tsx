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
  /**
   * URL oficial (canonical) quando não é a própria rota. As /iaplicada-*
   * são variantes de anúncio quase iguais à home: apontam pra ela pra não
   * dividir a relevância da página principal no Google.
   */
  canonical?: string;
}

export const LP_VARIANTS = {
  crescimento: {
    slug: "iaplicada-crescimento",
    canonical: "https://iaplicada.com/",
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
    canonical: "https://iaplicada.com/",
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
    canonical: "https://iaplicada.com/",
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
  /**
   * Trilha A — brasileiro com empresa nos EUA. Mesma copy da contratacao;
   * o que muda (US$, WhatsApp internacional, form business-us) vem do
   * locale pt-us na rota.
   */
  usContratacao: {
    slug: "us-contratacao",
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
  /** Trilha EN — empresas americanas. Inglês, form business-en (locale en). */
  enContratacao: {
    slug: "en-contratacao",
    metaTitle:
      "IAplicada Business · You don't need to hire more people. You need operations that keep up.",
    metaDescription:
      "In up to 90 days we build the AI-powered software that handles the manual work that would otherwise mean more people on payroll. Adding fixed costs is the last thing your company needs right now.",
    heroTitle: (
      <>
        <span className="hero-b-h1-sans">You don't need to hire more&nbsp;people.</span>
        <br />
        <em className="hero-b-h1-em">You need operations that keep&nbsp;up.</em>
      </>
    ),
    heroSubtitle: (
      <>
        In up to <em style={{ color: "var(--color-primary)" }}>90 days</em> we build the AI-powered
        software that handles the manual work that would otherwise mean more people on payroll.
        Adding fixed costs is the last thing your company needs right now.
      </>
    ),
  },
} satisfies Record<string, LpVariant>;

export function variantHead(v: LpVariant) {
  const url = v.canonical ?? `https://iaplicada.com/${v.slug}`;
  return {
    meta: [
      { title: v.metaTitle },
      { name: "description", content: v.metaDescription },
      { property: "og:title", content: v.metaTitle },
      { property: "og:description", content: v.metaDescription },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#0d0d0d" },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
