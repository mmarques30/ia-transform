import { Reveal } from "@/components/Reveal";

/**
 * CTAFinal (LP-A) — dedicado ao ângulo de "problema/dor" da LP `/`:
 * o custo mais alto da operação está escondido em processo manual.
 * Reforça o offer do diagnóstico (60 min, sem custo, sem follow-up)
 * ancorando no ganho concreto: sair com o número. Estrutura igual à
 * LP-B/C (título + descrição + botão), mas copy dedicada.
 */
export function CTAFinal() {
  return (
    <section id="cta-final" className="section-veil py-[100px] lg:py-[140px]">
      <div className="container-page">
        <div className="max-w-[820px] mx-auto text-center">
          <Reveal>
            <h2 className="h-mix text-[28px] sm:text-[36px] lg:text-[44px] text-foreground">
              60 minutos. Você sai com o número do custo{" "}
              <em className="whitespace-nowrap">invisível.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-6 text-[17px] sm:text-[18px] text-sage leading-[1.65] max-w-[560px] mx-auto">
              O diagnóstico é sem custo, sem follow-up insistente. Você sai sabendo onde está o
              gargalo, quanto ele custa por mês e o que muda ao resolver, mesmo se a gente não
              fechar.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <a href="#diagnostico-form" className="mt-10 cta-primary">
              Quero o diagnóstico do meu negócio
              <span className="arrow">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 7H12M12 7L7 2M12 7L7 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
