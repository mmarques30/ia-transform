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

/* Símbolo IAplicada fiel ao SVG /brand/logo.svg:
   círculo externo com 2 pills (horizontal + vertical) cortando =
   formando 4 quadrantes/pétalas + diamond central pequeno. */
float iaSymbol(vec2 p, vec2 center, float scale, float rotation) {
  vec2 lp = (p - center) / scale;
  /* Rotação */
  float s = sin(rotation), co = cos(rotation);
  lp = vec2(lp.x * co - lp.y * s, lp.x * s + lp.y * co);

  /* Círculo principal com soft edge */
  float r = length(lp);
  float circle = 1.0 - smoothstep(0.40, 0.48, r);

  /* Pill horizontal — corta o círculo formando 2 pétalas (sup + inf) */
  float pillH = (1.0 - smoothstep(0.05, 0.075, abs(lp.y)))
              * (1.0 - smoothstep(0.42, 0.50, abs(lp.x)));

  /* Pill vertical — corta formando as outras 2 pétalas (esq + dir) */
  float pillV = (1.0 - smoothstep(0.05, 0.075, abs(lp.x)))
              * (1.0 - smoothstep(0.42, 0.50, abs(lp.y)));

  /* Diamond central pequeno re-adicionado */
  float d = abs(lp.x) + abs(lp.y);
  float diamond = 1.0 - smoothstep(0.06, 0.095, d);

  /* Símbolo = círculo MENOS as 2 pills MAIS o diamond central */
  return clamp(circle - (pillH + pillV) + diamond, 0.0, 1.0);
}

void main() {
  vec2 uv = vUv;
  vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
  vec2 p = (uv - 0.5) * aspect;

  /* Scroll offset desloca o campo verticalmente */
  float scrollOffset = uScroll * 0.15;

  /* Noise pra deformação orgânica */
  float n1 = snoise(p * 1.5 + uTime * 0.04);
  float n2 = snoise(p * 3.0 - uTime * 0.06);
  vec2 displace = vec2(n1, n2) * 0.08;

  /* Mouse pulls field sutil */
  vec2 mouseInfluence = (uMouse - 0.5) * aspect;
  float mouseDist = length(p - mouseInfluence);
  displace += normalize(mouseInfluence - p + 0.001) * 0.04 * exp(-mouseDist * 2.0);

  vec2 distorted = p + displace;

  /* 3 instâncias do símbolo em escalas/posições diferentes */
  float t = uTime * 0.05;
  float s1 = iaSymbol(distorted, vec2(-0.55, 0.35 - scrollOffset), 0.32,  t);
  float s2 = iaSymbol(distorted, vec2( 0.45, -0.20 - scrollOffset * 0.6), 0.55, -t * 0.7);
  float s3 = iaSymbol(distorted, vec2(-0.30, -0.60 + scrollOffset * 0.3), 0.28,  t * 1.3);

  float intensity = max(max(s1, s2), s3);

  /* Lime saturado (var(--primary) ≈ oklch(0.75 0.20 122)) — aprox sRGB */
  vec3 limeColor = vec3(0.72, 0.86, 0.18);
  vec3 olive = vec3(0.32, 0.42, 0.10);
  vec3 charcoal = vec3(0.10, 0.105, 0.10);

  /* Background charcoal com pétalas lime visíveis mas sutis (não competem
     com o conteúdo das sections). */
  vec3 color = charcoal;
  color += olive * intensity * 0.22;
  color += limeColor * pow(intensity, 3.0) * 0.12;

  /* Glow extra nos centros das pétalas */
  color += limeColor * smoothstep(0.85, 1.0, intensity) * 0.10;

  /* Vinheta sutil pra dar profundidade */
  float vignette = smoothstep(1.4, 0.4, length((uv - 0.5) * vec2(1.0, 1.4)));
  color *= 0.88 + vignette * 0.12;

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
      dpr: Math.min(window.devicePixelRatio, 1.5),
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

    const loop = () => {
      const elapsed = (performance.now() - start) / 1000;
      /* Easing pra suavizar mouse + scroll */
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;
      scroll += (targetScroll - scroll) * 0.08;

      program.uniforms.uTime.value = reduced ? 0 : elapsed;
      program.uniforms.uMouse.value = [mouseX, mouseY];
      program.uniforms.uScroll.value = scroll;
      renderer.render({ scene: mesh });
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("scroll", onScroll);
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
