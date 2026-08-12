export function QualifierStrip() {
  return (
    <div
      className="text-center px-5 py-3.5"
      style={{
        background: "linear-gradient(180deg, #c8a82e, #a68b1a)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <span
        className="text-[15px] sm:text-[17px] tracking-[-0.01em]"
        style={{
          fontFamily: '"Instrument Serif", serif',
          fontStyle: "italic",
          fontWeight: 700,
          color: "#0a0c07",
        }}
      >
        Exclusivo para donos de empresa com faturamento a partir de R$ 1 milhão/ano
      </span>
    </div>
  );
}
