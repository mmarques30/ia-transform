import { Reveal } from "@/components/Reveal";
import { ArrowUp } from "lucide-react";

export function CTAFinal() {
  return (
    <section
      id="cta-final"
      className="py-[100px] lg:py-[140px]"
      style={{ backgroundColor: "var(--color-surface)" }}
    >
      <div className="container-page">
        <div className="max-w-[820px] mx-auto text-center">
          <Reveal>
            <h2 className="h-mix text-[40px] sm:text-[48px] lg:text-[60px] text-foreground">
              Pronto pra <em>organizar</em>
              <br />
              sua empresa em 30 dias?
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-6 text-[16px] text-sage leading-[1.65] max-w-[520px] mx-auto">
              O diagnóstico estratégico é gratuito. Sem pitch. Sem deck. Você fala do seu contexto e
              devolvemos um mapa em até 1 semana.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <a href="#diagnostico-form" className="mt-10 cta-primary">
              <ArrowUp className="h-4 w-4" />
              Agendar diagnóstico
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
