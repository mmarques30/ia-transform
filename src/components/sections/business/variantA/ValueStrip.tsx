import { BrainCircuit, ChartNoAxesCombined, Gauge, TrendingUp } from "lucide-react";
import { useLpCopy, type LpCopy } from "@/lib/lpLocale";

/**
 * Faixa de valores: painel de vidro que sobe por cima do fim do hero,
 * com os quatro ganhos do sistema (ícone + título + uma linha).
 */

const ICONS = [ChartNoAxesCombined, BrainCircuit, Gauge, TrendingUp];

const ITEMS: LpCopy<Array<{ title: string; text: string }>> = {
  "pt-br": [
    { title: "Decisão com dados", text: "Os números da operação num painel só" },
    { title: "IA que aprende", text: "Treinada no jeito que seu time trabalha" },
    { title: "Execução sem gargalo", text: "A rotina roda sem depender de você" },
    { title: "Escala sem contratar", text: "Mais volume com o mesmo time" },
  ],
  en: [
    { title: "Data-driven decisions", text: "Your operation's numbers in one dashboard" },
    { title: "AI that learns", text: "Trained on how your team works" },
    { title: "Bottleneck-free execution", text: "Routine work runs without you" },
    { title: "Scale without hiring", text: "More volume with the same team" },
  ],
};

export function ValueStrip() {
  const items = useLpCopy(ITEMS);
  return (
    <div className="lpx-valuebar">
      <div className="lpx-wrap">
        <ul className="lpx-valuebar-inner">
          {items.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <li key={item.title} className="lpx-valuebar-item">
                <span className="lpx-icon">
                  <Icon className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[15px] font-semibold tracking-[-0.01em] text-[var(--lpx-text)]">
                    {item.title}
                  </span>
                  <span className="mt-0.5 block text-[13px] leading-snug text-[var(--lpx-muted)]">
                    {item.text}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
