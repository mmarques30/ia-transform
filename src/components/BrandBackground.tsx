import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle } from "ogl";

/**
 * Background WebGL com identidade da marca IAplicada (4 pétalas + diamond
 * central). Shader fragment renderiza o símbolo em escala grande no fundo,
 * com displacement por noise + offset por scroll/mouse. Fica fixed atrás
 * de todas as sections (z-index -10).
 *
 * Inspirado em landonorris.com. Lib: OGL (~10KB gzipped vs Three.js 150KB).
 */

const VERTEX_SHADER = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uScroll;

varying vec2 vUv;

/* Simplex noise pra distorção orgânica. Versão compacta. */
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                     -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
        + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

/* Fractal Brownian Motion — soma de oitavas de noise pra um campo
   orgânico e suave (base das linhas topográficas estilo landonorris). */
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * snoise(p);
    p = p * 2.0 + vec2(13.7, 7.3);
    a *= 0.5;
  }
  return v;
}

/* Símbolo IAplicada (logo): círculo + 2 pills (cruz) + diamond central.
   Retorna preenchimento suave 0..1. */
float iaSymbol(vec2 lp, float scale) {
  lp /= scale;
  float r = length(lp);
  float circle = 1.0 - smoothstep(0.40, 0.45, r);
  float pillH = (1.0 - smoothstep(0.05, 0.07, abs(lp.y)))
              * (1.0 - smoothstep(0.42, 0.47, abs(lp.x)));
  float pillV = (1.0 - smoothstep(0.05, 0.07, abs(lp.x)))
              * (1.0 - smoothstep(0.42, 0.47, abs(lp.y)));
  float d = abs(lp.x) + abs(lp.y);
  float diamond = 1.0 - smoothstep(0.06, 0.09, d);
  return clamp(circle - (pillH + pillV) + diamond, 0.0, 1.0);
}

void main() {
  vec2 uv = vUv;
  vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
  vec2 p = (uv - 0.5) * aspect;

  float t = uTime * 0.035;
  vec2 m = (uMouse - 0.5);

  /* Fluxo vertical contínuo — conecta as dobras (a luz "atravessa" as
     seções conforme o scroll, sem reiniciar). */
  vec2 q = p * 1.05;
  q.y += uScroll * 0.45;
  q += m * 0.06;

  /* Campo de aurora — fbm em camadas, deformado por si mesmo (domain
     warping). Gera manchas de luz difusas e fluidas, SEM linhas/bordas. */
  float n1 = fbm(q + vec2(t * 0.6, t * 0.35));
  float n2 = fbm(q * 1.6 + vec2(-t * 0.4, t * 0.5) + n1 * 0.8);
  float n3 = fbm(q * 0.7 - vec2(t * 0.25, 0.0) + n2 * 0.4);

  /* Glows suaves (gradientes, não contornos) */
  float auroraA = smoothstep(-0.2, 0.9, n1);
  float auroraB = smoothstep(0.0, 1.0, n2);
  float core = pow(smoothstep(0.35, 1.0, n3), 2.0);

  vec3 limeColor = vec3(0.72, 0.86, 0.18);
  vec3 olive = vec3(0.28, 0.40, 0.10);
  vec3 charcoal = vec3(0.082, 0.090, 0.078);

  vec3 color = charcoal;
  color += olive * auroraA * 0.18;          /* base olive difusa */
  color += olive * auroraB * 0.10;          /* segunda camada */
  color += limeColor * core * 0.10;         /* realces lime nos núcleos */

  /* Vinheta sutil pra concentrar a luz no centro */
  float vignette = smoothstep(1.7, 0.2, length((uv - 0.5) * vec2(1.0, 1.25)));
  color *= 0.82 + vignette * 0.18;

  gl_FragColor = vec4(color, 1.0);
}
`;

export function BrandBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new Renderer({
      alpha: false,
      antialias: false,
      // DPR 1 — o fundo é difuso, não precisa de retina; corta ~55% dos
      // pixels por frame (alívio direto de GPU/main-thread → INP).
      dpr: 1,
    });
    const gl = renderer.gl;
    const canvas = gl.canvas as HTMLCanvasElement;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    containerRef.current.appendChild(canvas);

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: VERTEX_SHADER,
      fragment: FRAGMENT_SHADER,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: [window.innerWidth, window.innerHeight] },
        uMouse: { value: [0.5, 0.5] },
        uScroll: { value: 0 },
      },
    });
    const mesh = new Mesh(gl, { geometry, program });

    const resize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      program.uniforms.uResolution.value = [window.innerWidth, window.innerHeight];
    };
    resize();
    window.addEventListener("resize", resize);

    /* Mouse tracking — normalized 0..1 */
    let targetMouseX = 0.5;
    let targetMouseY = 0.5;
    const onMouse = (e: MouseEvent) => {
      targetMouseX = e.clientX / window.innerWidth;
      targetMouseY = 1 - e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", onMouse);

    /* Scroll progress 0..N viewports */
    let targetScroll = 0;
    const onScroll = () => {
      targetScroll = window.scrollY / window.innerHeight;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    let raf = 0;
    let mouseX = 0.5;
    let mouseY = 0.5;
    let scroll = 0;
    const start = performance.now();
    let last = 0;
    const FRAME_MS = 1000 / 30; // throttle ~30fps (fundo lento, imperceptível)

    const renderFrame = (now: number) => {
      mouseX += (targetMouseX - mouseX) * 0.036;
      mouseY += (targetMouseY - mouseY) * 0.036;
      scroll += (targetScroll - scroll) * 0.12;
      program.uniforms.uTime.value = (now - start) / 1000;
      program.uniforms.uMouse.value = [mouseX, mouseY];
      program.uniforms.uScroll.value = scroll;
      renderer.render({ scene: mesh });
    };

    /* prefers-reduced-motion: pinta um frame estático e não inicia o loop
       — zero trabalho contínuo na main thread. */
    if (reduced) {
      renderFrame(performance.now());
    } else {
      const loop = (now: number) => {
        raf = requestAnimationFrame(loop);
        if (now - last < FRAME_MS) return; // cap a 30fps
        last = now;
        renderFrame(now);
      };
      raf = requestAnimationFrame(loop);
    }

    /* Pausa o loop quando a aba está em background (não desperdiça frames). */
    const onVisibility = () => {
      if (reduced) return;
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else if (!raf) {
        last = 0;
        const loop = (now: number) => {
          raf = requestAnimationFrame(loop);
          if (now - last < FRAME_MS) return;
          last = now;
          renderFrame(now);
        };
        raf = requestAnimationFrame(loop);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
      style={{ backgroundColor: "var(--color-background)" }}
    />
  );
}
