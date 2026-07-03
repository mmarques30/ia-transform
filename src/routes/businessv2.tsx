import { createFileRoute } from "@tanstack/react-router";
import { BgDobra } from "@/components/BgDobra";
import { Hero } from "@/components/sections/business/variantB/Hero";
import { Ticker } from "@/components/sections/business/variantB/Ticker";
import { Problem } from "@/components/sections/business/variantB/Problem";
import { Solution } from "@/components/sections/business/Solution";
import { Systems } from "@/components/sections/business/variantB/Systems";
import { OliveWave } from "@/components/sections/business/OliveWave";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { Process } from "@/components/sections/business/Process";
import { Comparison } from "@/components/sections/Comparison";
import { Authority } from "@/components/sections/Authority";
import { FAQ } from "@/components/sections/FAQ";
import { CTAFinal } from "@/components/sections/business/variantB/CTAFinal";
import { Footer } from "@/components/sections/Footer";

/** FAQ reduzida da `/businessv2` — só 5 perguntas conforme spec. */
const FAQ_ITEMS_LP_B = [
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

/**
 * /businessv2 — variante B (phase 3 + 7 ajustes pontuais).
 *
 * Ajustes recentes (aplica LP-A → LP-B):
 * - Header removido inteiro do JSX (sem barra superior)
 * - Ticker novo em variantB/Ticker.tsx (5 cases nomeados)
 * - HighlightGif entre Problem e ClientLogos
 * - Impact rewritten com 3 cases auditados (PSA, Quadra,
 *   Turystar)
 * - H2 sizes reduzidos pra 36/32/26 em variantB/*
 * - FAQ passa lista de 5 items via prop `items`
 * - Método MAPA → APLICA já em Solution shared
 * - Authority counters ajustados (shared: 11 Sistemas /
 *   110+ Usuários / 150+ Processos)
 */
export const Route = createFileRoute("/businessv2")({
  head: () => ({
    meta: [
      {
        title: "IAplicada Business · Sua operação não escala se depende de gente",
      },
      {
        name: "description",
        content:
          "Empresas de serviço que cresceram sem digitalizar chegam no mesmo ponto: cada cliente novo é mais trabalho manual. A IAplicada transforma isso — do diagnóstico ao sistema.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { name: "theme-color", content: "#0d0d0d" },
    ],
  }),
  component: BusinessV2Landing,
});

/**
 * Cadência intercalada (mesmo sistema da LP `/`): EFFECT ⟷ NEUTRAL.
 * ClientLogos vira children do OliveWave (edge-to-edge, sem fundo
 * separado). Process é mantido porque o CTAFinal da LP-B tem copy
 * próprio ("60 minutos. Você sai com o mapa da sua operação").
 */
function BusinessV2Landing() {
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
          <ClientLogos transparent />
        </OliveWave>
      </BgDobra>
      <BgDobra intensity="media">
        <Process
          title={
            <>
              Em 30 dias, sua operação{" "}
              <em className="whitespace-nowrap">pode rodar sozinha</em>.
            </>
          }
          hideChevrons
          hideJourneyHeading
        />
      </BgDobra>
      <Authority />
      <BgDobra intensity="media">
        <Comparison />
      </BgDobra>
      <FAQ items={FAQ_ITEMS_LP_B} />
      <BgDobra intensity="alta">
        <CTAFinal />
      </BgDobra>
      <Footer />
    </main>
  );
}
