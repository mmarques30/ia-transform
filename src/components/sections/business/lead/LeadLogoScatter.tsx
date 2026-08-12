import { useEffect, useRef } from "react";

const ICON_SIZE = 52;

interface PieceDef {
  clip: string;
  tx: number;
  ty: number;
  tz: number;
  rx: number;
  ry: number;
  rz: number;
}

const PIECES: PieceDef[] = [
  {
    clip: "polygon(0% 0%, 46.9% 0%, 46.9% 46.9%, 0% 46.9%)",
    tx: -90,
    ty: -70,
    tz: 50,
    rx: 30,
    ry: -20,
    rz: -25,
  },
  {
    clip: "polygon(53.1% 0%, 100% 0%, 100% 46.9%, 53.1% 46.9%)",
    tx: 90,
    ty: -60,
    tz: -40,
    rx: -25,
    ry: 30,
    rz: 20,
  },
  {
    clip: "polygon(53.1% 53.1%, 100% 53.1%, 100% 100%, 53.1% 100%)",
    tx: 80,
    ty: 70,
    tz: 60,
    rx: 20,
    ry: -25,
    rz: 30,
  },
  {
    clip: "polygon(0% 53.1%, 46.9% 53.1%, 46.9% 100%, 0% 100%)",
    tx: -80,
    ty: 60,
    tz: -50,
    rx: -20,
    ry: 20,
    rz: -30,
  },
  {
    clip: "polygon(50% 44.5%, 55.5% 50%, 50% 55.5%, 44.5% 50%)",
    tx: 0,
    ty: -40,
    tz: 100,
    rx: 40,
    ry: 0,
    rz: 50,
  },
];

const PARTICLE_COUNT = 10;
const PARTICLES = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
  const angle = (i / PARTICLE_COUNT) * Math.PI * 2;
  return {
    tx: Math.cos(angle) * (100 + (i % 3) * 30),
    ty: Math.sin(angle) * (80 + (i % 2) * 25),
    size: 2 + (i % 3),
  };
});

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function scatterCurve(progress: number): number {
  const p = Math.max(0, Math.min(1, progress));
  if (p <= 0.1) return 0;
  if (p >= 0.9) return 0;
  if (p <= 0.5) return easeInOutCubic((p - 0.1) / 0.4);
  return easeInOutCubic((0.9 - p) / 0.4);
}

function IconSvg({ index }: { index: number }) {
  return (
    <svg
      width={ICON_SIZE}
      height={ICON_SIZE}
      viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <mask
          id={`scatter-m-${index}`}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="128"
          height="128"
        >
          <rect width="128" height="128" fill="black" />
          <circle cx="64" cy="64" r="48" fill="white" />
          <rect x="60" y="10" width="8" height="108" rx="4" fill="black" />
          <rect x="10" y="60" width="108" height="8" rx="4" fill="black" />
          <polygon points="64,57 71,64 64,71 57,64" fill="white" />
        </mask>
      </defs>
      <rect
        width="128"
        height="128"
        fill="#8BAB23"
        mask={`url(#scatter-m-${index})`}
      />
    </svg>
  );
}

export function LeadLogoScatter() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pieceEls = useRef<(HTMLDivElement | null)[]>([]);
  const particleEls = useRef<(HTMLDivElement | null)[]>([]);
  const rafId = useRef(0);

  useEffect(() => {
    const hero = document.getElementById("lead-hero");
    const section2 = document.getElementById("lead-section2");
    const anchor = document.getElementById("lead-logo-anchor");
    if (!hero || !section2 || !anchor || !wrapperRef.current) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    function positionWrapper() {
      if (!wrapperRef.current || !anchor) return;
      const rect = anchor.getBoundingClientRect();
      wrapperRef.current.style.top = `${rect.top + rect.height / 2}px`;
    }

    positionWrapper();

    function tick() {
      if (!hero || !section2) return;

      const heroRect = hero.getBoundingClientRect();
      const scrollRange = heroRect.height * 0.85;
      const scrolled = -heroRect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollRange));

      const scatter = reducedMotion ? 0 : scatterCurve(progress);

      pieceEls.current.forEach((el, i) => {
        if (!el) return;
        const p = PIECES[i];
        el.style.transform = `translate3d(${p.tx * scatter}px,${p.ty * scatter}px,${p.tz * scatter}px) rotateX(${p.rx * scatter}deg) rotateY(${p.ry * scatter}deg) rotateZ(${p.rz * scatter}deg)`;
        el.style.opacity = String(1 - scatter * 0.15);
      });

      particleEls.current.forEach((el, i) => {
        if (!el) return;
        const p = PARTICLES[i];
        el.style.transform = `translate(-50%,-50%) translate3d(${p.tx * scatter}px,${p.ty * scatter}px,0)`;
        el.style.opacity = String(scatter * 0.55);
      });

      if (wrapperRef.current) {
        const s2Bottom = section2.getBoundingClientRect().bottom;
        wrapperRef.current.style.opacity =
          s2Bottom < -100 ? "0" : "1";
      }
    }

    function onScroll() {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(tick);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", () => {
      positionWrapper();
      tick();
    });
    tick();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      aria-hidden
      style={{
        position: "fixed",
        left: "50%",
        zIndex: 50,
        pointerEvents: "none",
        perspective: "800px",
        transition: "opacity 0.3s",
      }}
    >
      <div
        style={{
          position: "relative",
          width: ICON_SIZE,
          height: ICON_SIZE,
          transformStyle: "preserve-3d",
          transform: "translate(-50%, -50%)",
        }}
      >
        {PIECES.map((piece, i) => (
          <div
            key={i}
            ref={(el) => {
              pieceEls.current[i] = el;
            }}
            style={{
              position: "absolute",
              inset: 0,
              clipPath: piece.clip,
              willChange: "transform, opacity",
              transformStyle: "preserve-3d",
            }}
          >
            <IconSvg index={i} />
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
              background: "#8BAB23",
              opacity: 0,
              willChange: "transform, opacity",
            }}
          />
        ))}
      </div>
    </div>
  );
}
