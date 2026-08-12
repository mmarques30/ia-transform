interface MockupCard {
  src: string;
  label: string;
  pos: string;
}

const CARDS: MockupCard[] = [
  {
    src: "/mockups/mockup-prompts.png",
    label: "Prompts de IA",
    pos: "lead-mockup--tl",
  },
  {
    src: "/mockups/mockup-financeiro.png",
    label: "Financeiro IA",
    pos: "lead-mockup--tr",
  },
  {
    src: "/mockups/mockup-agente.png",
    label: "Agente Virtual",
    pos: "lead-mockup--bl",
  },
  {
    src: "/mockups/mockup-automacao.png",
    label: "Automacoes",
    pos: "lead-mockup--br",
  },
  {
    src: "/mockups/mockup-cadencia.png",
    label: "Cadencia B2B",
    pos: "lead-mockup--bc",
  },
];

export function LeadKitMockups() {
  return (
    <div className="lead-mockups" aria-hidden>
      {CARDS.map((c) => (
        <div key={c.pos} className={`lead-mockup ${c.pos}`}>
          <div className="lead-mockup__frame">
            <img
              src={c.src}
              alt=""
              loading="lazy"
              width={320}
              draggable={false}
            />
          </div>
          <span className="lead-mockup__label">{c.label}</span>
        </div>
      ))}
    </div>
  );
}
