import { Reveal } from "@/components/Reveal";
import { ArrowUp } from "lucide-react";

export function CTAFinal() {
  return (
    <section id="cta-final" className="section-veil py-[100px] lg:py-[140px]">
      <div className="container-page">
        <div className="max-w-[820px] mx-auto text-center">
          <Reveal>
            <h2 className="h-mix text-[40px] sm:text-[48px] lg:text-[60px] text-foreground leading-[1.05]">
              30 minutos. Você sai com
              <br />
              <em>clareza do seu escritório.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-6 text-[16px] text-sage leading-[1.65] max-w-[560px] mx-auto">
              Sem genérico, sem enrolação. As 3 frentes que mais consomem hora, priorizadas, com
              tempo estimado de retorno.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <a href="#diagnostico-form" className="mt-10 cta-primary">
              <ArrowUp className="h-4 w-4" />
              Quero o diagnóstico
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
          <Reveal delay={0.15}>
            <p className="mt-5 text-[12px] uppercase tracking-[0.18em] font-semibold text-muted-foreground">
              Gratuito · 100% online · sem compromisso
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
