import { Reveal } from "@/components/Reveal";

interface SectionHeadProps {
  eyebrow: string;
  title: React.ReactNode;
  sub?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
}

/** Cabeçalho padrão das dobras: rótulo em pill, título grande e apoio. */
export function SectionHead({
  eyebrow,
  title,
  sub,
  align = "center",
  className = "",
}: SectionHeadProps) {
  const center = align === "center";
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-[820px] ${className}`}>
      <Reveal>
        <span className="lpx-eyebrow">{eyebrow}</span>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="lpx-h2 mt-6">{title}</h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.1}>
          <p className={`lpx-lead mt-5 ${center ? "mx-auto" : ""}`}>{sub}</p>
        </Reveal>
      )}
    </div>
  );
}
