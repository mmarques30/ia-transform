export function QualifierStrip() {
  return (
    <div
      className="text-center px-5 py-3"
      style={{
        background: "linear-gradient(180deg, #3d3a10, #2a2808)",
        borderBottom: "1px solid rgba(200,224,64,0.15)",
      }}
    >
      <span
        className="text-[13px] sm:text-[15px] tracking-[-0.01em]"
        style={{
          fontFamily: '"Instrument Serif", serif',
          fontStyle: "italic",
          fontWeight: 500,
          color: "var(--color-primary)",
        }}
      >
        Exclusivo para donos de empresa com faturamento a partir de R$ 1 milhão/ano
      </span>
    </div>
  );
}
