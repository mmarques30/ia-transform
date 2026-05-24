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

void main() {
  vec2 uv = vUv;
  vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
  vec2 p = (uv - 0.5) * aspect * 1.6;

  float t = uTime * 0.03;

  /* Scroll desloca o campo (as linhas "fluem" conforme rola) */
  p.y += uScroll * 0.18;

  /* Mouse empurra o campo sutilmente */
  vec2 mouseInfluence = (uMouse - 0.5) * aspect;
  float mouseDist = length(p - mouseInfluence * 1.6);
  p += normalize(mouseInfluence * 1.6 - p + 0.001) * 0.10 * exp(-mouseDist * 1.5);

  /* Campo topográfico — fbm animado lentamente */
  float field = fbm(p + vec2(t, t * 0.6));

  /* Linhas de contorno (topographic map) — assinatura do landonorris.
     Pega onde o campo cruza níveis igualmente espaçados. Largura fixa
     (sem fwidth pra evitar dependência de derivatives no WebGL). */
  float levels = 7.0;
  float v = field * levels;
  float lineDist = abs(fract(v) - 0.5);
  float contour = 1.0 - smoothstep(0.0, 0.06, lineDist);

  /* Blobs orgânicos suaves — regiões altas do campo */
  float blob = smoothstep(0.15, 0.85, field);

  /* Cores da marca */
  vec3 limeColor = vec3(0.72, 0.86, 0.18);
  vec3 olive = vec3(0.30, 0.40, 0.10);
  vec3 charcoalA = vec3(0.085, 0.092, 0.082);
  vec3 charcoalB = vec3(0.11, 0.13, 0.075);

  /* Tom base varia com o scroll → cada "dobra" ganha leve mudança de
     temperatura, como as transições de cor do landonorris. */
  float zone = sin(uScroll * 0.45) * 0.5 + 0.5;
  vec3 base = mix(charcoalA, charcoalB, zone);

  vec3 color = base;
  /* Blobs olive suaves */
  color += olive * blob * 0.16;
  /* Linhas de contorno em lime */
  color += limeColor * contour * 0.14;
  /* Realce lime onde linha + blob coincidem */
  color += limeColor * contour * blob * 0.10;

  /* Vinheta sutil */
  float vignette = smoothstep(1.5, 0.3, length((uv - 0.5) * vec2(1.0, 1.35)));
  color *= 0.85 + vignette * 0.15;

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
