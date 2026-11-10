import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react";
import { ArrowUpRight } from "lucide-react";
import { useDiagnosticoModal } from "@/components/sections/business/variantB/DiagnosticoModal";

/**
 * Primitivas do site institucional (/site). Tudo escopado em classes
 * `st-*` (ver site.css) pra não vazar nas LPs.
 */

/** Dispara uma vez quando o elemento entra no viewport. */
export function useInView<T extends Element>(threshold = 0.25) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, inView]);
  return { ref, inView };
}

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Fade-up ao entrar na tela. `delay` em ms. */
export function Rise({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "span";
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);
  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={`st-rise ${inView ? "is-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/** Número que conta de 0 até `to` quando aparece. */
export function CountUp({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1600,
}: {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.4);
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion()) {
      setValue(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 4);
      setValue(to * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  return (
    <span ref={ref} className="st-tabular">
      {prefix}
      {value.toLocaleString("pt-BR", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

/** Spotlight que segue o cursor (usa --mx/--my no CSS). */
export function spotlight(e: MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

/** Inclinação 3D leve com o cursor. */
export function useTilt<T extends HTMLElement>(max = 6) {
  const ref = useRef<T>(null);
  const onMouseMove = (e: MouseEvent<T>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--rx", `${(-py * max).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(px * max).toFixed(2)}deg`);
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  const onMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };
  return { ref, onMouseMove, onMouseLeave };
}

export function Eyebrow({ children, center = false }: { children: ReactNode; center?: boolean }) {
  return (
    <span className={`st-eyebrow ${center ? "st-eyebrow--center" : ""}`}>
      <span className="st-eyebrow-line" aria-hidden />
      {children}
      {center && <span className="st-eyebrow-line" aria-hidden />}
    </span>
  );
}

/** Abre o modal de diagnóstico (form). */
export function useOpenForm() {
  const modal = useDiagnosticoModal();
  return () => modal?.openModal();
}

export function CtaButton({
  children = "Solicitar diagnóstico",
  variant = "primary",
  size = "md",
  onClick,
  href,
  className = "",
  style,
}: {
  children?: ReactNode;
  variant?: "primary" | "ghost" | "dark";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  href?: string;
  className?: string;
  style?: CSSProperties;
}) {
  const openForm = useOpenForm();
  const cls = `st-btn st-btn--${variant} st-btn--${size} ${className}`;
  const inner = (
    <>
      <span className="st-btn-label">{children}</span>
      <span className="st-btn-icon" aria-hidden>
        <ArrowUpRight strokeWidth={2.4} />
      </span>
    </>
  );
  if (href) {
    return (
      <a href={href} className={cls} style={style} onMouseMove={spotlight}>
        {inner}
      </a>
    );
  }
  return (
    <button
      type="button"
      className={cls}
      style={style}
      onMouseMove={spotlight}
      onClick={onClick ?? openForm}
    >
      {inner}
    </button>
  );
}

/** Scroll suave até uma âncora, compensando o header fixo. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 72;
  window.scrollTo({ top: y, behavior: prefersReducedMotion() ? "auto" : "smooth" });
}

/** Onda que separa uma dobra escura de uma clara (estilo "fluid section"). */
export function Wave({
  flip = false,
  color = "var(--st-cream)",
}: {
  flip?: boolean;
  color?: string;
}) {
  return (
    <svg
      className={`st-wave ${flip ? "st-wave--flip" : ""}`}
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        d="M0,64 C180,120 360,10 620,40 C880,70 1040,118 1240,82 C1340,64 1400,40 1440,30 L1440,120 L0,120 Z"
        fill={color}
      />
    </svg>
  );
}
