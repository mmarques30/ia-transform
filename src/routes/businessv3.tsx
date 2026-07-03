import { createFileRoute } from "@tanstack/react-router";
import { BgDobra } from "@/components/BgDobra";
import { Hero } from "@/components/sections/business/variantC/Hero";
import { Ticker } from "@/components/sections/business/variantC/Ticker";
import { Problem } from "@/components/sections/business/variantC/Problem";
import { Solution } from "@/components/sections/business/Solution";
import { Systems } from "@/components/sections/business/variantC/Systems";
import { OliveWave } from "@/components/sections/business/OliveWave";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { Process } from "@/components/sections/business/Process";
import { Comparison } from "@/components/sections/Comparison";
import { Authority } from "@/components/sections/Authority";
import { FAQ } from "@/components/sections/FAQ";
import { CTAFinal } from "@/components/sections/business/variantC/CTAFinal";
import { Footer } from "@/components/sections/Footer";

/** FAQ reduzida da `/businessv3` — 5 perguntas conforme spec. */
const FAQ_ITEMS_LP_C = [
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
 * /businessv3 — variante C (phase 4 + 7 ajustes de prova social).
 *
 * Ajustes recentes:
 * - Header removido inteiro do JSX
 * - Hero: label-chip → img light logo, texto simplificado
 *   (1 apoio + linha muted "+40 empresas já operam")
 * - Ticker (variantC/Ticker) entre Hero e Problem, 5 cases
 * - Systems reescrita com 3 GIFs (PSA / Borges & Zembruski /
 *   CB Move) + URLs identificadas
 * - Problem: 4 cards atualizados com dados reais (PSA operação
 *   fragmentada, CB Move captação manual, Borges SDR humano)
 * - Impact reescrita com 3 cases auditados + stamps
 * - CTAFinal novo copy citando PSA
 * - H2 sizes reduzidos pra 36/32/26
 * - FAQ com 5 items
 * - Método APLICA / Authority counters (11 Sistemas / 110+
 *   Usuários / 150+ Processos) já em shared
 */
export const Route = createFileRoute("/businessv3")({
  head: () => ({
    meta: [
      {
        title: "IAplicada Business · Sua equipe ainda faz o que nossos sistemas já fazem sozinhos.",
      },
      {
        name: "description",
        content:
          "Não são promessas. São os números da PSA, Borges & Zembruski, CB Move e Quadra Arquitetura. Diagnóstico gratuito de 60 minutos.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { name: "theme-color", content: "#0d0d0d" },
    ],
  }),
  component: BusinessV3Landing,
});

/**
 * Cadência intercalada (mesmo sistema da LP `/`): EFFECT ⟷ NEUTRAL.
 * ClientLogos vira children do OliveWave (edge-to-edge). Process é
 * mantido porque o CTAFinal da LP-C tem copy próprio (PSA 85%→94%).
 */
function BusinessV3Landing() {
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
              Em 30 dias, sua operação <em>pode rodar sozinha</em>.
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
      <FAQ items={FAQ_ITEMS_LP_C} />
      <BgDobra intensity="alta">
        <CTAFinal />
      </BgDobra>
      <Footer />
    </main>
  );
}
