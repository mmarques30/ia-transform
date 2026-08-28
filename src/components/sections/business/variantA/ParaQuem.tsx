import { Reveal } from "@/components/Reveal";

const SEGMENTS = [
  {
    title: "Empresários,\nFundadores\ne Sócios",
    description:
      "Que estão presos no operacional, apagando incêndio todo dia, e querem um sistema que faça a empresa rodar sem depender deles no meio de tudo.",
  },
  {
    title: "Diretores de\nOperações e\nGestores de Área",
    description:
      "Que lideram times de qualquer área, seja comercial, financeiro, logística, CS, contábil ou qualquer outra, e precisam de automação que elimine processos manuais e retrabalho, funcionando do jeito que a equipe já trabalha.",
  },
];

export function ParaQuem() {
  return (
    <section
      className="para-quem-section"
      style={{
        background:
          "linear-gradient(180deg, #0c0f07 0%, #131710 50%, #0c0f07 100%)",
      }}
    >
      <div className="container-page">
        <div className="para-quem-inner">
          <Reveal>
            <h2 className="para-quem-title">
              Para{" "}
              <strong className="para-quem-title-em">quem</strong> é a
              IAplicada?
            </h2>
          </Reveal>

          <div className="para-quem-grid">
            {SEGMENTS.map((seg, i) => (
              <Reveal key={i} delay={0.08 + i * 0.1}>
                <div className="para-quem-card">
                  <h3 className="para-quem-card-title">
                    {seg.title.split("\n").map((line, j) => (
                      <span key={j}>
                        {line}
                        {j < seg.title.split("\n").length - 1 && <br />}
                      </span>
                    ))}
                  </h3>
                  <p className="para-quem-card-desc">{seg.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
