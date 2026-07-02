import { Reveal } from "@/components/Reveal";
import { ArrowRight } from "lucide-react";

/**
 * Systems (LP-C / dobra 6) — grid de 3 GIFs de casos reais, um por
 * cliente com URL do painel identificando dono. Substitui o antigo
 * device showcase (laptop+tablet contabil).
 */

interface CaseGif {
  gifSrc: string;
  label: string;
  url: string;
  alt: string;
}

const CASES: CaseGif[] = [
  {
    gifSrc: "/systems-v2/post_sex_painel.gif",
    label: "PSA Consultores · BI Tributário",
    url: "psa.iaplicada.com.br",
    alt: "BI Tributário PSA Consultores em ação",
  },
  {
    gifSrc: "/systems-v2/post_qua_whatsapp.gif",
    label: "Borges & Zembruski · SDR Autônomo",
    url: "bz.iaplicada.com.br",
    alt: "SDR autônomo Borges & Zembruski em ação",
  },
  {
    gifSrc: "/systems-v2/conciliacao_ia.gif",
    label: "CB Move Neuroscience · ERP Clínico",
    url: "cbmove.iaplicada.com.br",
    alt: "ERP clínico CB Move Neuroscience em ação",
  },
];

export function Systems() {
  return (
    <section
      id="sistemas"
      className="section-veil py-[100px] lg:py-[140px] overflow-hidden relative"
    >
      <div className="container-page relative">
        <div className="max-w-[760px] mx-auto text-center">
          <Reveal>
            <span className="label-chip">
              <span className="dot" />
              Sistema em ação
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h-mix mt-6 text-[26px] sm:text-[32px] lg:text-[36px] text-foreground">
              Três empresas. Três sistemas.{" "}
              <em>Cada um com a URL e o nome do cliente.</em>
            </h2>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="mt-14 lg:mt-20 grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-[1200px] mx-auto">
            {CASES.map((c) => (
              <CaseGifCard key={c.gifSrc} caseItem={c} />
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-14 text-center">
            <a
              href="#diagnostico-form"
              className="inline-flex items-center gap-2 text-foreground font-semibold text-[15px] hover:text-primary transition-colors"
            >
              Quero um sistema assim no meu negócio
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CaseGifCard({ caseItem }: { caseItem: CaseGif }) {
  return (
    <figure className="flex flex-col gap-3">
      <p
        className="text-[12px] uppercase font-semibold tracking-[0.08em] text-center text-sage"
      >
        {caseItem.label}
      </p>
      <div
        className="rounded-2xl overflow-hidden border"
        style={{
          borderColor: "oklch(0.32 0.02 122)",
          backgroundColor: "oklch(0.16 0.018 122)",
          boxShadow: "0 30px 60px -25px oklch(0 0 0 / 0.55)",
        }}
      >
        <img
          src={caseItem.gifSrc}
          alt={caseItem.alt}
          loading="lazy"
          decoding="async"
          className="block w-full h-auto"
        />
      </div>
      <p
        className="text-[13px] font-mono text-center"
        style={{ color: "var(--color-primary)", opacity: 0.85 }}
      >
        {caseItem.url}
      </p>
    </figure>
  );
}
