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
  // Default true no SSR + primeiro paint pra evitar que tudo fique
  // opacity:0 antes do observer disparar (percebido como "página
  // carregando"). Content acima da dobra segue visível sem flicker.
  // Content abaixo da dobra é invisibilizado pelo observer no mount
  // (assíncrono, fora do viewport — usuário não vê o flicker) e reaparece
  // via fade quando entra na viewport.
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Snapshot inicial: se o elemento já está fora do viewport no
    // mount, esconde pra que a entrada seja animada quando o user
    // rolar até ele. Se está dentro, mantém visível (default true).
    const rect = el.getBoundingClientRect();
    const inViewportOnMount =
      rect.bottom > 0 && rect.top < window.innerHeight;
    if (!inViewportOnMount) setVisible(false);

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
