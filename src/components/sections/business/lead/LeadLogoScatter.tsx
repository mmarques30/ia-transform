import { useEffect, useRef } from "react";

const LOGO_SRC = "/brand/Design sem nome (19).png";
const LOGO_SIZE = 52;

interface PetalDef {
  id: string;
  clip: string;
  tx: number;
  ty: number;
  tz: number;
  rx: number;
  ry: number;
  rz: number;
}

const PETALS: PetalDef[] = [
  { id: "tl", clip: "inset(0 50% 50% 0)", tx: -140, ty: -100, tz: 70, rx: 28, ry: -35, rz: -22 },
  { id: "tr", clip: "inset(0 0 50% 50%)", tx: 140, ty: -90, tz: -60, rx: -22, ry: 32, rz: 18 },
  { id: "bl", clip: "inset(50% 50% 0 0)", tx: -130, ty: 105, tz: -50, rx: -28, ry: -28, rz: 22 },
  { id: "br", clip: "inset(50% 0 0 50%)", tx: 120, ty: 110, tz: 60, rx: 22, ry: 35, rz: -18 },
];

const PARTICLE_COUNT = 8;
const PARTICLES = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
  const angle = (i / PARTICLE_COUNT) * Math.PI * 2;
  return {
    tx: Math.cos(angle) * (85 + (i % 3) * 22),
    ty: Math.sin(angle) * (70 + (i % 2) * 18),
    size: 2 + (i % 3),
  };
});

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function scatterAmount(progress: number): number {
  if (progress <= 0.02) return 0;
  if (progress <= 0.15) return easeInOutCubic((progress - 0.02) / 0.13);
  if (progress <= 0.3) return 1;
  if (progress <= 0.5) return 1 - easeInOutCubic((progress - 0.3) / 0.2);
  return 0;
}

export function LeadLogoScatter() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const petalEls = useRef<(HTMLDivElement | null)[]>([]);
  const particleEls = useRef<(HTMLDivElement | null)[]>([]);
  const rafId = useRef(0);

  useEffect(() => {
    const hero = document.getElementById("lead-hero");
    const anchor = document.getElementById("lead-logo-anchor");
    if (!hero || !anchor || !wrapperRef.current || !innerRef.current) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let heroH = hero.offsetHeight;

    function tick() {
      if (!hero || !wrapperRef.current || !innerRef.current || !anchor) return;

      const heroRect = hero.getBoundingClientRect();
      const progress = clamp(-heroRect.top / (heroH * 0.7), 0, 1.5);
      const scatter = reducedMotion ? 0 : scatterAmount(progress);

      const anchorRect = anchor.getBoundingClientRect();
      wrapperRef.current.style.left = `${anchorRect.left + anchorRect.width / 2}px`;
      wrapperRef.current.style.top = `${anchorRect.top + anchorRect.height / 2}px`;

      petalEls.current.forEach((el, i) => {
        if (!el) return;
        const p = PETALS[i];
        el.style.transform = `translate3d(${p.tx * scatter}px,${p.ty * scatter}px,${p.tz * scatter}px) rotateX(${p.rx * scatter}deg) rotateY(${p.ry * scatter}deg) rotateZ(${p.rz * scatter}deg)`;
        el.style.opacity = String(1 - scatter * 0.12);
      });

      particleEls.current.forEach((el, i) => {
        if (!el) return;
        const p = PARTICLES[i];
        el.style.transform = `translate(-50%,-50%) translate3d(${p.tx * scatter}px,${p.ty * scatter}px,0)`;
        el.style.opacity = String(scatter * 0.45);
      });

      const fade = progress > 0.35 ? 1 - clamp((progress - 0.35) / 0.15, 0, 1) : 1;
      wrapperRef.current.style.opacity = String(fade);
    }

    function onScroll() {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(tick);
    }

    function onResize() {
      heroH = hero!.offsetHeight;
      tick();
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    tick();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      aria-hidden
      style={{
        position: "fixed",
        zIndex: 40,
        pointerEvents: "none",
        perspective: "800px",
        transition: "opacity 0.25s",
      }}
    >
      <div
        ref={innerRef}
        style={{
          position: "relative",
          width: LOGO_SIZE,
          height: LOGO_SIZE,
          transformStyle: "preserve-3d",
          transform: "translate(-50%, -50%)",
        }}
      >
        {PETALS.map((petal, i) => (
          <div
            key={petal.id}
            ref={(el) => {
              petalEls.current[i] = el;
            }}
            style={{
              position: "absolute",
              inset: 0,
              willChange: "transform, opacity",
              transformStyle: "preserve-3d",
              clipPath: petal.clip,
            }}
          >
            <img
              src={LOGO_SRC}
              alt=""
              draggable={false}
              style={{ display: "block", width: "100%", height: "100%" }}
            />
          </div>
        ))}

        {PARTICLES.map((particle, i) => (
          <div
            key={`p-${i}`}
            ref={(el) => {
              particleEls.current[i] = el;
            }}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: particle.size,
              height: particle.size,
              borderRadius: "50%",
              background: "#8EAF28",
              opacity: 0,
              willChange: "transform, opacity",
            }}
          />
        ))}
      </div>
    </div>
  );
}
