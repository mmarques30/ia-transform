import { useEffect, useRef, useState, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/**
 * Anima a entrada do conteúdo (fade-up) quando chega no viewport.
 *
 * Implementação enxuta com IntersectionObserver + classe CSS, sem
 * framer-motion. Framer v12 adicionava ~50KB gzipado de runtime e era a
 * maior fonte de trabalho na main-thread durante hidratação —
 * impactando o INP (310ms reportado pelo Clarity).
 *
 * API mantida: `<Reveal delay={0.1}>...</Reveal>`. As ~100 chamadas
 * espalhadas pelas sections continuam funcionando sem mudanças.
 *
 * Respeita `prefers-reduced-motion` (CSS desliga a transição
 * automaticamente em .reveal).
 */
export function Reveal({ children, delay = 0, className = "" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-80px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal${visible ? " reveal-in" : ""}${className ? " " + className : ""}`}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
