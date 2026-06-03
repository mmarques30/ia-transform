import { Reveal } from "@/components/Reveal";

/**
 * Seção 8 do brief — CTA INTERMEDIÁRIO.
 * "Mesma equipe. Carteira 2x." é o fecho do slide 4 do criativo. Recupera
 * quem já se convenceu no meio da página antes de bater o FAQ + CTA final.
 */
export function CTAIntermediate() {
  return (
    <section className="section-veil py-[80px] lg:py-[120px] relative overflow-hidden">
      <div className="container-page relative">
        <div className="max-w-[860px] mx-auto text-center">
          <Reveal>
            <h2
              className="h-mix text-[36px] sm:text-[48px] lg:text-[64px] text-foreground"
              style={{ lineHeight: 1.05 }}
            >
              Mesma equipe. <em>Carteira 2x.</em>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 text-[16px] lg:text-[18px] text-sage leading-[1.55] max-w-[580px] mx-auto">
              Sem contratar na mesma proporção da venda. Sem terceirizar a operação. Só com a IA
              fazendo o que hoje gasta hora do seu time.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-10 flex justify-center">
              <a href="#diagnostico-form" className="cta-primary">
                Quero ver onde meu escritório perde hora
                <span className="arrow">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden
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
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
