import { Reveal } from "@/components/Reveal";

interface SectionHeadProps {
  eyebrow: string;
  title: React.ReactNode;
  sub?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
  /** "xl": título grande com rótulo de linha, no padrão do site institucional. */
  size?: "md" | "xl";
}

/** Cabeçalho padrão das dobras: rótulo em pill, título grande e apoio. */
export function SectionHead({
  eyebrow,
  title,
  sub,
  align = "center",
  className = "",
  size = "md",
}: SectionHeadProps) {
  const center = align === "center";
  const xl = size === "xl";
  return (
    <div
      className={`${center ? "mx-auto text-center" : ""} ${xl ? "max-w-[980px]" : "max-w-[820px]"} ${className}`}
    >
      <Reveal>
        {xl ? (
          <span className={`lpx-eyebrow-line${center ? " lpx-eyebrow-line--center" : ""}`}>
            {eyebrow}
          </span>
        ) : (
          <span className="lpx-eyebrow">{eyebrow}</span>
        )}
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className={`lpx-h2 ${xl ? "lpx-h2--xl mt-5" : "mt-6"}`}>{title}</h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.1}>
          <p className={`lpx-lead mt-5 ${center ? "mx-auto" : ""}`}>{sub}</p>
        </Reveal>
      )}
    </div>
  );
}
