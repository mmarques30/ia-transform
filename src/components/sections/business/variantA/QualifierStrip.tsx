export function QualifierStrip() {
  return (
    <div
      className="text-center px-5 py-3.5"
      style={{
        background: "linear-gradient(180deg, #dfc04a, #c8a82e)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <span
        className="text-[16px] sm:text-[19px] tracking-[-0.01em]"
        style={{
          fontFamily: '"Instrument Serif", serif',
          fontStyle: "italic",
          fontWeight: 700,
          color: "#1a1c10",
        }}
      >
        Exclusivo para donos de empresa com faturamento a partir de R$ 1 milhão/ano
      </span>
    </div>
  );
}
