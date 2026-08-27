const ITEMS = [
  "Decisão com dados",
  "IA que aprende",
  "Execução sem gargalo",
  "Escala sem contratar",
];

export function ValueStrip() {
  return (
    <div className="value-strip">
      <div className="value-strip-inner">
        {ITEMS.map((item, i) => (
          <div key={i} className="value-strip-item">
            <span className="value-strip-text">{item}</span>
            {i < ITEMS.length - 1 && <span className="value-strip-divider" aria-hidden />}
          </div>
        ))}
      </div>
    </div>
  );
}
