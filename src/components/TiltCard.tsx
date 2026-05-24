import { useRef, type CSSProperties, type ReactNode } from "react";

/**
 * Wrapper que adiciona efeito 3D tilt no hover seguindo o cursor.
 * Cria perspective + transform via inline style updated em mousemove.
 * Inclui glow lime sutil que segue o cursor pra reforçar profundidade.
 * Respeita prefers-reduced-motion (desliga o tilt mas mantém estrutura).
 */
interface TiltCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Intensidade máxima do tilt em graus. Default 8. */
  maxTilt?: number;
}

export function TiltCard({ children, className, style, maxTilt = 8 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const tiltX = (y - 0.5) * -2 * maxTilt;
    const tiltY = (x - 0.5) * 2 * maxTilt;

    el.style.transform = `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(0)`;

    if (glowRef.current) {
      glowRef.current.style.opacity = "1";
      glowRef.current.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, oklch(0.75 0.20 122 / 0.18) 0%, transparent 50%)`;
    }
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)";
    if (glowRef.current) glowRef.current.style.opacity = "0";
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transformStyle: "preserve-3d",
        transition: "transform 0.18s cubic-bezier(0.22, 1, 0.36, 1)",
        willChange: "transform",
        ...style,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{
          opacity: 0,
          transition: "opacity 0.25s ease",
        }}
      />
    </div>
  );
}
