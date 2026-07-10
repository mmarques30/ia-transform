import { useEffect, useState } from "react";
import { PainelBlocaz } from "./PainelBlocaz";
import { PainelAtlas } from "./PainelAtlas";
import { PainelRotaSul } from "./PainelRotaSul";

/**
 * PainelClientesShowcase — carrossel com tabs dos 3 painéis
 * V1 (Blocaz · indústria), V2 (Atlas · serviços) e V3 (Rota Sul ·
 * logística).
 *
 * Encaixe: dentro do AppShowcase (LP-B) no lugar do phone mockup.
 * O usuário troca de tab manualmente clicando no chip; auto-rotação
 * de 8s roda pra dar dinamismo, mas pausa assim que o usuário
 * interage (evita "arrastar" a atenção fora do momento).
 */

type TabKey = "industria" | "servicos" | "logistica";

interface Tab {
  key: TabKey;
  label: string;
  detail: string;
  render: () => React.ReactNode;
}

const TABS: Tab[] = [
  {
    key: "industria",
    label: "Indústria",
    detail: "Blocaz Pré-Moldados",
    render: () => <PainelBlocaz />,
  },
  {
    key: "servicos",
    label: "Serviços",
    detail: "Atlas Contábil",
    render: () => <PainelAtlas />,
  },
  {
    key: "logistica",
    label: "Logística",
    detail: "Rota Sul Transportes",
    render: () => <PainelRotaSul />,
  },
];

const AUTO_ROTATE_MS = 8000;

export function PainelClientesShowcase() {
  const [active, setActive] = useState<TabKey>(TABS[0].key);
  const [userInteracted, setUserInteracted] = useState(false);

  useEffect(() => {
    if (userInteracted) return;
    const id = window.setInterval(() => {
      setActive((current) => {
        const idx = TABS.findIndex((t) => t.key === current);
        return TABS[(idx + 1) % TABS.length].key;
      });
    }, AUTO_ROTATE_MS);
    return () => window.clearInterval(id);
  }, [userInteracted]);

  const activeTab = TABS.find((t) => t.key === active) ?? TABS[0];

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center gap-2 mb-5">
        {TABS.map((t) => {
          const isActive = t.key === active;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => {
                setActive(t.key);
                setUserInteracted(true);
              }}
              className={`px-3.5 py-2 rounded-full text-[11.5px] font-bold uppercase tracking-[0.14em] transition-colors`}
              style={{
                background: isActive ? "rgba(200,224,64,0.14)" : "rgba(255,255,255,0.04)",
                color: isActive ? "var(--color-primary)" : "var(--color-sage)",
                border: `1px solid ${isActive ? "rgba(200,224,64,0.4)" : "rgba(255,255,255,0.1)"}`,
                fontFamily: '"JetBrains Mono", ui-monospace, Menlo, monospace',
                boxShadow: isActive ? "0 0 20px -8px rgba(200,224,64,0.5)" : "none",
              }}
            >
              {t.label}
              <span className="ml-2 opacity-60 font-medium normal-case tracking-normal text-[10px]">
                {t.detail}
              </span>
            </button>
          );
        })}
      </div>

      {/*
       * Rendering: key={active} força o React a desmontar/remontar quando
       * a tab muda — isso faz o IntersectionObserver do useIapIn rodar de
       * novo e as animações de entrada tocarem em cada troca de tab.
       */}
      <div key={activeTab.key}>{activeTab.render()}</div>
    </div>
  );
}
