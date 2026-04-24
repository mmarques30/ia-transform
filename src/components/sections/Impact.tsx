import { Reveal } from "@/components/Reveal";
import { ChevronRight } from "lucide-react";

const IMPACTS = [
  "Menos tarefas manuais",
  "Menos retrabalho",
  "Mais visibilidade",
  "Mais segurança nas decisões",
  "Menos dependência do dono",
  "Crescimento com controle",
];

export function Impact() {
  return (
    <section className="py-[100px] lg:py-[140px] bg-background">
      <div className="container-page">
        <Reveal>
          <div className="text-center mb-14">
            <a href="#top" className="cta-primary inline-flex">
              Entender como funciona o diagnóstico
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
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start max-w-[1100px] mx-auto card-soft p-8 lg:p-12">
          <div>
            <Reveal>
              <h2 className="h-mix text-[32px] sm:text-[40px] lg:text-[48px] text-foreground">
                Quando a empresa
                <br />
                deixa de operar
                <br />
                <em>no improviso,</em>
                <br />o impacto é imediato.
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-8 text-[15.5px] text-sage leading-[1.65] max-w-[440px]">
                O Business é uma solução de estruturação operacional com Inteligência Artificial
                aplicada, criada para empresas que precisam organizar a casa antes de escalar.
              </p>
            </Reveal>
          </div>

          <div>
            <Reveal delay={0.15}>
              <ul className="space-y-4">
                {IMPACTS.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[17px] text-foreground">
                    <ChevronRight
                      className="h-4 w-4 shrink-0"
                      style={{ color: "var(--color-primary)" }}
                      strokeWidth={2.5}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.25}>
              <p
                className="mt-10 text-[18px] lg:text-[20px] font-bold leading-[1.4]"
                style={{ color: "var(--color-primary)" }}
              >
                Clareza gera controle.
                <br />
                Controle gera crescimento sustentável.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
