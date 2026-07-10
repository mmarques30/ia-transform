import { useEffect, useRef, useState } from "react";

/**
 * useIapIn — hook que retorna { ref, isIn } pra ativar as animações
 * de entrada dos painéis (classes `.iap-in` do styles.css).
 *
 * Substitui o IntersectionObserver do <script> do arquivo HTML
 * mockups_painel_lp_businessv2.html — mesmo threshold 0.25, mesma
 * regra "unobserve after first intersection".
 *
 * Uso:
 *   const { ref, isIn } = useIapIn();
 *   return <div ref={ref} className={`iap-device ${isIn ? "iap-in" : ""}`}>
 */
export function useIapIn(threshold = 0.25): {
  ref: React.RefObject<HTMLDivElement | null>;
  isIn: boolean;
} {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isIn, setIsIn] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setIsIn(true);
            io.unobserve(e.target);
            break;
          }
        }
      },
      { threshold },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, isIn };
}
