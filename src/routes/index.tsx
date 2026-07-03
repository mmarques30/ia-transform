import type { ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { IABackground, type IABackgroundIntensity } from "@/components/IABackground";
import { Hero } from "@/components/sections/business/variantA/Hero";
import { Ticker } from "@/components/sections/business/variantA/Ticker";
import { Problem } from "@/components/sections/business/variantA/Problem";
import { Solution } from "@/components/sections/business/Solution";
import { Systems } from "@/components/sections/business/variantA/Systems";
import { OliveWave } from "@/components/sections/business/OliveWave";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { Process } from "@/components/sections/business/Process";
import { Comparison } from "@/components/sections/Comparison";
import { Authority } from "@/components/sections/Authority";
import { FAQ } from "@/components/sections/FAQ";
import { CTAFinal } from "@/components/sections/business/variantA/CTAFinal";
import { Footer } from "@/components/sections/Footer";

/** FAQ reduzida da `/` — só 5 perguntas conforme spec de ajuste. */
const FAQ_ITEMS_LP_A = [
  {
    q: "Quanto dura um projeto?",
    a: "De 1 a 6 meses, conforme o escopo. A mentoria é um programa à parte e deve ser consultada direto com o time da IAplicada. A Mari abre vagas esporadicamente.",
  },
  {
    q: "Qual o investimento?",
    a: "A partir de R$ 9.997, dependendo do escopo e porte da operação. Valor fechado depois do diagnóstico.",
  },
  {
    q: "Substitui consultoria, agência ou fábrica de software?",
    a: "Depende do escopo contratado. Em muitos casos, sim: a IAplicada assume frentes que antes ficavam com consultoria, agência ou fábrica. Em outros, integramos com sistemas já implementados e trabalhamos lado a lado com times internos e fornecedores existentes.",
  },
  {
    q: "O time precisa ter base técnica?",
    a: "Não. Trabalhamos com líderes e operacionais. Parte técnica fica com a gente.",
  },
  {
    q: "O sistema fica com o nome da IAplicada ou da minha empresa?",
    a: "Com o nome da sua empresa. A URL, o branding e o painel são seus. A IAplicada constrói e depois o sistema é inteiramente seu, sem dependência de licença ou assinatura da gente.",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "IAplicada Business · O processo mais caro não aparece no DRE",
      },
      {
        name: "description",
        content:
          "Contratar mais gente não resolve. O custo mais alto da sua operação está escondido em horas gastas em planilha e retrabalho. A IAplicada encontra, calcula e constrói o sistema que elimina.",
      },
      {
        property: "og:title",
        content: "IAplicada Business · O processo mais caro não aparece no DRE",
      },
      {
        property: "og:description",
        content:
          "Contratar mais gente não resolve — o problema está no processo. Diagnóstico gratuito de 60 minutos.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#0d0d0d" },
    ],
  }),
  component: BusinessLanding,
});

/**
 * BgDobra — wrap section com a camada de fundo IABackground atrás
 * e o conteúdo em z-index positivo. Serve pra dobras que se
 * beneficiam do fundo escuro técnico da spec.
 *
 * Rule: apenas a `/` (LP-A) usa esse sistema; as outras LPs seguem
 * intactas. Não mexo em components shared — o wrapper resolve tudo
 * no route.
 */
function BgDobra({
  intensity,
  children,
}: {
  intensity: IABackgroundIntensity;
  children: ReactNode;
}) {
  return (
    <div className="relative overflow-hidden ia-dobra">
      <IABackground intensity={intensity} />
      <div className="relative" style={{ zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}

/**
 * Ritmo intercalado: dobras COM ia-bg (grid/glow/sparks) alternam com
 * dobras NEUTRAS (só palette bg + section-veil, sem camada técnica).
 * Isso quebra o "efeito colagem" (todas as dobras com o mesmo bg) e
 * dá um respiro visual entre os blocos densos.
 *
 * EFFECT ⟷ NEUTRAL cadência:
 *   Hero (alta)      → Ticker  → Problem (neutral)   → Solution (media)
 *   Systems (neutral) → OliveWave (media)  → ClientLogos (neutral) → Process (media)
 *   Authority (neutral) → Comparison (media) → FAQ (neutral) → CTAFinal (alta)
 */
function BusinessLanding() {
  return (
    <main className="min-h-screen text-foreground" style={{ backgroundColor: "#0a0c07" }}>
      <BgDobra intensity="alta">
        <Hero />
      </BgDobra>
      <Ticker />
      <Problem />
      <BgDobra intensity="media">
        <Solution />
      </BgDobra>
      <Systems />
      <BgDobra intensity="media">
        <OliveWave plainBg>
          <ClientLogos />
        </OliveWave>
      </BgDobra>
      <BgDobra intensity="media">
        <Process
          title={
            <>
              Em 30 dias, sua operação <em>pode rodar sozinha</em>.
            </>
          }
          hideChevrons
          hideJourney
        />
      </BgDobra>
      <Authority />
      <BgDobra intensity="media">
        <Comparison />
      </BgDobra>
      <FAQ items={FAQ_ITEMS_LP_A} />
      <BgDobra intensity="alta">
        <CTAFinal />
      </BgDobra>
      <Footer />
    </main>
  );
}
