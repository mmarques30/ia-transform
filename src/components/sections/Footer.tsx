import { Instagram, Linkedin, Mail, Phone } from "lucide-react";
import { Logo } from "@/components/Logo";
import { useLpCopy, type LpCopy } from "@/lib/lpLocale";

const SOCIAL = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/marianamarquescabral/", icon: Linkedin },
  { label: "Instagram", href: "https://www.instagram.com/marimarquescb/", icon: Instagram },
];

const COPY_PT_BR = {
  tagline: "Software com IA sob medida para empresas que querem escalar sem multiplicar o time.",
  contact: "Contato",
  social: "Redes",
  phoneLabel: "(11) 95056-6101",
  rights: "Todos os direitos reservados.",
};

const COPY: LpCopy<typeof COPY_PT_BR> = {
  "pt-br": COPY_PT_BR,
  // Fora do Brasil o telefone vai com o código do país.
  "pt-us": { ...COPY_PT_BR, phoneLabel: "+55 11 95056-6101" },
  en: {
    tagline:
      "Custom AI-powered software for companies that want to scale without multiplying headcount.",
    contact: "Contact",
    social: "Social",
    phoneLabel: "+55 11 95056-6101",
    rights: "All rights reserved.",
  },
};

/**
 * Rodapé: marca + frase à esquerda, contato e redes em colunas, barra
 * final com © e a hashtag. Usado na LP e nas páginas de obrigado.
 */
export function Footer() {
  const c = useLpCopy(COPY);
  return (
    <footer className="lpx-footer">
      <div className="lpx-wrap">
        <div className="grid grid-cols-2 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)] gap-x-6 gap-y-10 md:gap-8 py-14 lg:py-16">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <Logo size={24} />
              <span className="border-l border-white/15 pl-2.5 text-[12.5px] text-[var(--lpx-muted)]">
                Business
              </span>
            </div>
            <p className="mt-5 max-w-[38ch] text-[14.5px] leading-[1.65] text-[var(--lpx-muted)]">
              {c.tagline}
            </p>
          </div>

          <div>
            <p className="lpx-mono text-[11px] uppercase tracking-[0.16em] text-[var(--lpx-faint)]">
              {c.contact}
            </p>
            <ul className="mt-5 space-y-3 text-[14.5px]">
              <li>
                <a href="mailto:mariana@iaplicada.com" className="lpx-footer-link">
                  <Mail className="h-4 w-4" strokeWidth={1.8} aria-hidden />
                  mariana@iaplicada.com
                </a>
              </li>
              <li>
                <a href="tel:+5511950566101" className="lpx-footer-link">
                  <Phone className="h-4 w-4" strokeWidth={1.8} aria-hidden />
                  {c.phoneLabel}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="lpx-mono text-[11px] uppercase tracking-[0.16em] text-[var(--lpx-faint)]">
              {c.social}
            </p>
            <ul className="mt-5 space-y-3 text-[14.5px]">
              {SOCIAL.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lpx-footer-link"
                  >
                    <s.icon className="h-4 w-4" strokeWidth={1.8} aria-hidden />
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-t border-white/[0.07] py-6 text-[12.5px] text-[var(--lpx-faint)]">
          <span>© 2026 IAplicada. {c.rights}</span>
          <span className="lpx-mono text-[var(--lpx-lime)]">#menoshypemaisentrega</span>
        </div>
      </div>
    </footer>
  );
}
