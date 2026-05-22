import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

let registered = false;
let lenisInstance: Lenis | null = null;

function registerPluginsOnce() {
  if (registered) return;
  gsap.registerPlugin(ScrollTrigger, SplitText);
  registered = true;
}

export function initLenis(): Lenis | null {
  if (typeof window === "undefined") return null;
  if (lenisInstance) return lenisInstance;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return null;

  registerPluginsOnce();

  lenisInstance = new Lenis({
    duration: 1.1,
    easing: (t: number) => 1 - Math.pow(1 - t, 3),
    smoothWheel: true,
    touchMultiplier: 1.2,
  });

  lenisInstance.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenisInstance?.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  return lenisInstance;
}

export function destroyLenis() {
  if (!lenisInstance) return;
  lenisInstance.destroy();
  lenisInstance = null;
}

export function revealChars(
  target: HTMLElement,
  opts: { delay?: number; stagger?: number; rotateX?: number; once?: boolean } = {},
) {
  registerPluginsOnce();
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return null;

  const split = new SplitText(target, { type: "chars,words" });
  const tween = gsap.from(split.chars, {
    opacity: 0,
    rotateX: opts.rotateX ?? -75,
    y: 12,
    duration: 0.7,
    ease: "power3.out",
    stagger: opts.stagger ?? 0.018,
    delay: opts.delay ?? 0,
    scrollTrigger: {
      trigger: target,
      start: "top 85%",
      once: opts.once ?? true,
    },
  });
  return { split, tween };
}

export function pinSection(
  target: HTMLElement,
  opts: { endOffset?: string; pinSpacing?: boolean } = {},
) {
  registerPluginsOnce();
  return ScrollTrigger.create({
    trigger: target,
    start: "top top",
    end: opts.endOffset ?? "+=200%",
    pin: true,
    pinSpacing: opts.pinSpacing ?? true,
  });
}

export { gsap, ScrollTrigger };
