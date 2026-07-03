import { Reveal } from "@/components/Reveal";

export function CTAFinal() {
  return (
    <section id="cta-final" className="section-veil py-[100px] lg:py-[140px]">
      <div className="container-page">
        <div className="max-w-[820px] mx-auto text-center">
          <Reveal>
            <h2 className="h-mix text-[28px] sm:text-[36px] lg:text-[44px] text-foreground">
              Em 30 dias, sua operação <em>pode rodar sozinha</em>.
            </h2>
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
