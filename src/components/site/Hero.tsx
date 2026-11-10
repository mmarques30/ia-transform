import { useEffect, useRef } from "react";
import { Bell, Check } from "lucide-react";
import { CtaButton, prefersReducedMotion, scrollToId } from "./primitives";

/**
 * Hero: palco com a fundadora + marca. A palavra IAPLICADA gigante fica
 * atrás da foto (ligada ao header), anéis orbitais giram em volta e
 * cards de vidro flutuam com parallax do mouse — cada card mostra um
 * pedaço do que o sistema faz (status, alerta da IA, métrica).
 */
export function SiteHero() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || prefersReducedMotion()) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        stage.style.setProperty("--px", x.toFixed(3));
        stage.style.setProperty("--py", y.toFixed(3));
      });
    };
    const onScroll = () => {
      stage.style.setProperty("--sy", String(Math.min(window.scrollY, 900)));
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="top" className="st-hero" ref={stageRef}>
      <div className="st-hero-bg" aria-hidden>
        <div className="st-hero-grid" />
        <div className="st-hero-beam" />
        <div className="st-hero-noise" />
      </div>

      <div className="st-hero-word" aria-hidden>
        IAPLICADA
      </div>

      <div className="st-container st-hero-inner">
        <div className="st-hero-copy">
          <h1 className="st-hero-title st-load" style={{ animationDelay: "80ms" }}>
            Faça o dobro com o time <em>que você já tem.</em>
          </h1>

          <p className="st-hero-sub st-load" style={{ animationDelay: "240ms" }}>
            Construímos o software com IA que automatiza sua operação de ponta a ponta em até{" "}
            <strong>90 dias</strong>.
          </p>

          <div className="st-hero-ctas st-load" style={{ animationDelay: "340ms" }}>
            <CtaButton size="lg">Solicitar diagnóstico gratuito</CtaButton>
            <button type="button" className="st-hero-link" onClick={() => scrollToId("plataforma")}>
              Ver o sistema
            </button>
          </div>
        </div>

        <div className="st-hero-stage" aria-hidden>
          <div className="st-hero-halo" />
          <svg className="st-orbits" viewBox="0 0 600 600">
            <g className="st-orbit st-orbit--a">
              <ellipse cx="300" cy="300" rx="285" ry="118" />
              <circle cx="15" cy="300" r="5" />
            </g>
            <g className="st-orbit st-orbit--b">
              <ellipse cx="300" cy="300" rx="250" ry="92" />
              <circle cx="550" cy="300" r="4" />
            </g>
          </svg>

          <img
            className="st-hero-mark"
            src="/brand/logo-petals.png"
            alt=""
            width={520}
            height={520}
          />
          <img
            className="st-hero-photo"
            src="/brand/mariana-transparente.webp"
            alt=""
            width={1080}
            height={1350}
            fetchPriority="high"
          />
          <div className="st-hero-floor" />

          {/* Só no mobile: selos do card de retrato */}
          <div className="st-hero-pill">
            <span className="st-status-dot" /> +50 empresas
          </div>
          <div className="st-hero-namecard">
            <img src="/brand/logo-mark.svg" alt="" width={30} height={30} />
            <span>
              <b>Mariana Marques</b>
              <small>Founder & CEO · IAplicada</small>
            </span>
          </div>

          <div className="st-float st-float--status">
            <div className="st-float-head">
              <span className="st-dots">
                <i />
                <i />
                <i />
              </span>
              <span className="st-mono">sistema · ativo</span>
            </div>
            <div className="st-float-ring">
              <span className="st-pulse" />
              <Check size={16} strokeWidth={3} />
            </div>
            <div className="st-float-title">Operação conectada</div>
            <div className="st-float-rows">
              <span>CRM</span>
              <b>sincronizado</b>
              <span>ERP</span>
              <b>sincronizado</b>
              <span>WhatsApp</span>
              <b>12 pedidos</b>
            </div>
          </div>

          <div className="st-float st-float--alert">
            <div className="st-float-icon">
              <Bell size={14} />
            </div>
            <div>
              <div className="st-mono st-float-kicker">Alerta da IA</div>
              <p>
                Cimento subiu 6%. Reajuste de <b>+4%</b> protege sua margem.
              </p>
              <span className="st-float-action">Aplicar reajuste</span>
            </div>
          </div>
        </div>
      </div>

      <div className="st-container">
        <ul className="st-hero-chips">
          <li>
            <span className="st-mono">01</span> MVP em até 30 dias
          </li>
          <li>
            <span className="st-mono">02</span> Sistema completo em 90 dias
          </li>
          <li>
            <span className="st-mono">03</span> Integra com o que você já usa
          </li>
          <li>
            <span className="st-mono">04</span> Diagnóstico gratuito
          </li>
        </ul>
      </div>
    </section>
  );
}
