import { Reveal } from "@/components/Reveal";
import { ArrowUp } from "lucide-react";

export function CTAFinal() {
  return (
    <section id="cta-final" className="section-veil py-[100px] lg:py-[140px]">
      <div className="container-page">
        <div className="max-w-[820px] mx-auto text-center">
          <Reveal>
            <h2 className="h-mix text-[40px] sm:text-[48px] lg:text-[60px] text-foreground">
              60 minutos. Você sai com clareza do que está{" "}
              <em>custando sem aparecer.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-6 text-[16px] text-sage leading-[1.65] max-w-[520px] mx-auto">
              O diagnóstico é sem custo, sem follow-up insistente. Você sai com um mapa de onde a
              empresa perde hora — mesmo se a gente não fechar.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <a href="#diagnostico-form" className="mt-10 cta-primary">
              <ArrowUp className="h-4 w-4" />
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
