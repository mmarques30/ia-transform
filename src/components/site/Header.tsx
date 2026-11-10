import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { CtaButton, scrollToId, useOpenForm } from "./primitives";

export const NAV = [
  { id: "plataforma", label: "Plataforma" },
  { id: "metodo", label: "Método" },
  { id: "jornada", label: "Como funciona" },
  { id: "cases", label: "Cases" },
  { id: "sobre", label: "Sobre" },
  { id: "faq", label: "FAQ" },
];

/**
 * Header fixo. No topo fica transparente; ao rolar vira uma pílula de
 * vidro. Os links fazem scroll-spy (indicador desliza até a seção ativa).
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const navRef = useRef<HTMLDivElement>(null);
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);
  const openForm = useOpenForm();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
      let current: string | null = null;
      for (const item of NAV) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) current = item.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav || !active) {
      setPill(null);
      return;
    }
    const link = nav.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (link) setPill({ left: link.offsetLeft, width: link.offsetWidth });
  }, [active]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    setTimeout(() => scrollToId(id), open ? 250 : 0);
  };

  return (
    <>
      <header className={`st-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="st-header-inner">
          <a
            href="#top"
            className="st-header-logo"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            aria-label="IAplicada, voltar ao topo"
          >
            <img src="/brand/iaplicada-logo-dark.webp" alt="IAplicada" width={118} height={28} />
          </a>

          <nav className="st-nav" ref={navRef} aria-label="Principal">
            {pill && (
              <span
                className="st-nav-pill"
                style={{ transform: `translateX(${pill.left}px)`, width: pill.width }}
                aria-hidden
              />
            )}
            {NAV.map((item) => (
              <a
                key={item.id}
                data-id={item.id}
                href={`#${item.id}`}
                className={`st-nav-link ${active === item.id ? "is-active" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  go(item.id);
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="st-header-actions">
            <span className="st-status">
              <span className="st-status-dot" /> Vagas abertas
            </span>
            <CtaButton size="sm">Diagnóstico gratuito</CtaButton>
            <button
              type="button"
              className="st-burger"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        <span
          className="st-header-progress"
          style={{ transform: `scaleX(${progress})` }}
          aria-hidden
        />
      </header>

      <div className={`st-mobile-menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <div className="st-mobile-menu-glow" aria-hidden />
        <nav aria-label="Menu mobile">
          {NAV.map((item, i) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              style={{ transitionDelay: open ? `${80 + i * 50}ms` : "0ms" }}
              onClick={(e) => {
                e.preventDefault();
                go(item.id);
              }}
              tabIndex={open ? 0 : -1}
            >
              <span className="st-mono">0{i + 1}</span>
              {item.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          className="st-btn st-btn--primary st-btn--lg st-mobile-cta"
          tabIndex={open ? 0 : -1}
          onClick={() => {
            setOpen(false);
            openForm();
          }}
        >
          <span className="st-btn-label">Solicitar diagnóstico gratuito</span>
        </button>
      </div>
    </>
  );
}
