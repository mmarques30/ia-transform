import { motion } from "framer-motion";
import * as React from "react";
import { cn } from "@/lib/utils";

const iapTheme =
  "[--ic-background:#d5e95a] [--ic-foreground:#0a0c07] [--ic-primary:#0a0c07] [--ic-card:oklch(0.75_0.2_122)] [--ic-card-foreground:#0a0c07] [--ic-border:rgba(139,155,58,0.35)] [--ic-muted:oklch(0.72_0.19_122)] [--ic-muted-foreground:#0a0c07] [--ic-ring:rgba(200,224,64,0.35)] [--ic-accent:rgba(200,224,64,0.12)] [--ic-accent-foreground:#d5e95a] [--color-background:var(--ic-background)] [--color-foreground:var(--ic-foreground)] [--color-primary:var(--ic-primary)] [--color-card:var(--ic-card)] [--color-card-foreground:var(--ic-card-foreground)] [--color-border:var(--ic-border)] [--color-muted:var(--ic-muted)] [--color-muted-foreground:var(--ic-muted-foreground)] [--color-ring:var(--ic-ring)] [--color-accent:var(--ic-accent)] [--color-accent-foreground:var(--ic-accent-foreground)]";

const FILL_DURATION = 0.5;
const FILL_EASE = [0.16, 1, 0.3, 1] as const;

type ButtonHTMLAttributesForMotion = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  | "onAnimationEnd"
  | "onAnimationIteration"
  | "onAnimationStart"
  | "onDrag"
  | "onDragEnd"
  | "onDragEnter"
  | "onDragExit"
  | "onDragLeave"
  | "onDragOver"
  | "onDragStart"
  | "onDrop"
>;

function getCoverDiameter(width: number, height: number, x: number, y: number) {
  return Math.ceil(
    2 *
      Math.max(
        Math.hypot(x, y),
        Math.hypot(width - x, y),
        Math.hypot(x, height - y),
        Math.hypot(width - x, height - y)
      )
  );
}

function assignRef<T>(ref: React.ForwardedRef<T>, value: T | null) {
  if (typeof ref === "function") {
    ref(value);
    return;
  }
  if (ref) {
    ref.current = value;
  }
}

function hasTextContent(node: React.ReactNode): boolean {
  if (typeof node === "string" || typeof node === "number") {
    return String(node).trim().length > 0;
  }
  if (Array.isArray(node)) {
    return node.some(hasTextContent);
  }
  if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
    return hasTextContent(node.props.children);
  }
  return false;
}

type OriginButtonProps = ButtonHTMLAttributesForMotion & {
  children?: React.ReactNode;
  loading?: boolean;
};

const OriginButton = React.forwardRef<HTMLButtonElement, OriginButtonProps>(
  (
    {
      children,
      className,
      disabled = false,
      loading = false,
      type = "button",
      onBlur,
      onClick,
      onFocus,
      onKeyDown,
      onKeyUp,
      onPointerCancel,
      onPointerDown,
      onPointerEnter,
      onPointerLeave,
      onPointerUp,
      ...props
    },
    ref
  ) => {
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const isDisabled = Boolean(disabled || loading);
    const [hovered, setHovered] = React.useState(false);
    const [isPressed, setIsPressed] = React.useState(false);
    const [origin, setOrigin] = React.useState({ x: 0, y: 0 });
    const [coverSize, setCoverSize] = React.useState(0);

    const ariaLabel = props["aria-label"];
    const ariaLabelledBy = props["aria-labelledby"];

    React.useEffect(() => {
      if (process.env.NODE_ENV === "production") return;
      if (
        hasTextContent(children) ||
        ariaLabel?.trim() ||
        ariaLabelledBy?.trim()
      ) return;
      console.warn(
        "OriginButton: provide visible label text or aria-label / aria-labelledby so the control has an accessible name."
      );
    }, [ariaLabel, ariaLabelledBy, children]);

    const updateOrigin = React.useCallback((x: number, y: number) => {
      const node = buttonRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      setOrigin({ x, y });
      setCoverSize(getCoverDiameter(rect.width, rect.height, x, y));
    }, []);

    const updateOriginFromPointer = React.useCallback(
      (event: React.PointerEvent<HTMLButtonElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        updateOrigin(event.clientX - rect.left, event.clientY - rect.top);
      },
      [updateOrigin]
    );

    const updateOriginFromCenter = React.useCallback(() => {
      const node = buttonRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      updateOrigin(rect.width / 2, rect.height / 2);
    }, [updateOrigin]);

    const showFill = !isDisabled && (hovered || isPressed);

    React.useLayoutEffect(() => {
      const node = buttonRef.current;
      if (!(node && showFill)) return;

      const measure = () => {
        const rect = node.getBoundingClientRect();
        setCoverSize(
          getCoverDiameter(rect.width, rect.height, origin.x, origin.y)
        );
      };
      measure();

      const observer = new ResizeObserver(measure);
      observer.observe(node);

      const fonts = document.fonts;
      if (fonts?.ready) {
        fonts.ready.then(measure).catch(() => undefined);
      }
      return () => observer.disconnect();
    }, [showFill, origin.x, origin.y]);

    const fillTransition = { duration: FILL_DURATION, ease: FILL_EASE };

    const setMergedRef = React.useCallback(
      (node: HTMLButtonElement | null) => {
        buttonRef.current = node;
        assignRef(ref, node);
      },
      [ref]
    );

    return (
      <motion.button
        {...props}
        aria-busy={loading || undefined}
        className={cn(
          iapTheme,
          "relative inline-flex h-12 cursor-pointer touch-manipulation select-none items-center justify-center overflow-hidden rounded-xl px-8 font-bold text-[14px] lg:text-[15px] uppercase tracking-[0.06em]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-[#080a07]",
          "disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        style={{
          background: showFill ? "var(--ic-card)" : "linear-gradient(180deg, #d5e95a, #7a8f30)",
          color: showFill ? "#d5e95a" : "#0a0c07",
          boxShadow:
            "0 0 0 5px rgba(200,224,64,0.12), 0 20px 40px -12px rgba(200,224,64,0.4), inset 0 -2px 0 rgba(0,0,0,0.18)",
          transition: showFill
            ? "color 200ms cubic-bezier(0.16,1,0.3,1) 180ms"
            : "color 150ms cubic-bezier(0.16,1,0.3,1)",
        }}
        data-pressed={isPressed ? "true" : "false"}
        disabled={isDisabled}
        onBlur={(event) => {
          onBlur?.(event);
          setIsPressed(false);
          if (!event.defaultPrevented) {
            setHovered(false);
          }
        }}
        onClick={onClick}
        onFocus={(event) => {
          onFocus?.(event);
          if (isDisabled || event.defaultPrevented) return;
          if (event.currentTarget.matches(":focus-visible")) {
            updateOriginFromCenter();
            setHovered(true);
          }
        }}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (
            event.defaultPrevented ||
            isDisabled ||
            event.repeat ||
            (event.key !== " " && event.key !== "Enter")
          ) return;
          if (event.key === " ") event.preventDefault();
          updateOriginFromCenter();
          setIsPressed(true);
          setHovered(true);
        }}
        onKeyUp={(event) => {
          onKeyUp?.(event);
          if (event.key === " " || event.key === "Enter") {
            setIsPressed(false);
            if (!event.currentTarget.matches(":focus-visible")) {
              setHovered(false);
            }
          }
        }}
        onPointerCancel={(event) => {
          onPointerCancel?.(event);
          setIsPressed(false);
        }}
        onPointerDown={(event) => {
          onPointerDown?.(event);
          if (event.defaultPrevented || isDisabled || event.button !== 0) return;
          updateOriginFromPointer(event);
          setIsPressed(true);
          setHovered(true);
        }}
        onPointerEnter={(event) => {
          onPointerEnter?.(event);
          if (isDisabled || event.defaultPrevented) return;
          updateOriginFromPointer(event);
          setHovered(true);
        }}
        onPointerLeave={(event) => {
          onPointerLeave?.(event);
          setHovered(false);
          setIsPressed(false);
        }}
        onPointerUp={(event) => {
          onPointerUp?.(event);
          setIsPressed(false);
        }}
        ref={setMergedRef}
        type={type}
        whileTap={isDisabled ? undefined : { scale: 0.985 }}
      >
        <motion.span
          animate={{ scale: showFill && coverSize > 0 ? 1 : 0 }}
          aria-hidden
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
          initial={false}
          style={{
            height: coverSize,
            left: origin.x,
            top: origin.y,
            width: coverSize,
            background: "#0a0c07",
          }}
          transition={fillTransition}
        />
        <span className="relative z-10 inline-flex items-center justify-center gap-2.5">
          {children}
        </span>
      </motion.button>
    );
  }
);
OriginButton.displayName = "OriginButton";

export { OriginButton };
export type { OriginButtonProps };
