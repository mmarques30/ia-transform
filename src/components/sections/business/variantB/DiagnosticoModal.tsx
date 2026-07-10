import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { X, Check } from "lucide-react";
import { HeroForm } from "@/components/HeroForm";

/**
 * DiagnosticoModal (LP-B) — modal overlay com HeroForm dentro + estado
 * de sucesso resumido inline (sem redirecionar pra /thank-you-business).
 *
 * Refeito depois de feedback: "formato ficou péssimo, muito espaço a
 * ser aproveitado, uma barra scroller que não faz sentido".
 *
 * O problema era arquitetura: o HeroForm renderiza SEU PRÓPRIO card
 * creme com eyebrow ("Vagas limitadas por ciclo") + título ("Conte
 * sobre sua operação") + form. O modal antigo envolvia esse card em
 * OUTRO card escuro com OUTRO header — 2 cards nested, 2 headers, altura
 * total > viewport → scroller feio.
 *
 * Solução: modal vira só backdrop + close button + centralização. O
 * card creme do HeroForm é o próprio card visível do modal. Zero
 * duplicação. Se a Mari clicar em qualquer altura do modal, os
 * elementos que "eram do modal" (logo tag, headline, footer copy) saem
 * — o HeroForm já traz tudo. Sucess view herda o mesmo estilo creme
 * pra manter consistência visual.
 */

type ModalView = "form" | "success";

interface DiagnosticoModalContextValue {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const DiagnosticoModalContext = createContext<DiagnosticoModalContextValue | null>(null);

export function useDiagnosticoModal(): DiagnosticoModalContextValue | null {
  return useContext(DiagnosticoModalContext);
}

export function DiagnosticoModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<ModalView>("form");

  const openModal = useCallback(() => {
    setView("form");
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => setView("form"), 250);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeModal]);

  const handleSuccess = useCallback(() => {
    setView("success");
  }, []);

  return (
    <DiagnosticoModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6 lg:py-8 overflow-y-auto"
          style={{
            background: "rgba(5, 6, 4, 0.72)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="diagnostico-modal-title"
        >
          {/* Wrapper transparente — não desenha card próprio, só posiciona.
              O HeroForm dentro traz seu próprio card creme; a success view
              também tem card próprio matching o mesmo estilo. */}
          <div className="relative w-full max-w-[560px] my-auto">
            <button
              onClick={closeModal}
              className="absolute -top-3 -right-3 lg:-top-4 lg:-right-4 z-20 h-10 w-10 rounded-full flex items-center justify-center transition-transform hover:scale-110"
              style={{
                background: "#0a0c07",
                border: "2px solid #c8e040",
                color: "#c8e040",
                boxShadow: "0 8px 20px -4px rgba(0,0,0,0.6)",
              }}
              aria-label="Fechar"
            >
              <X className="h-4 w-4" strokeWidth={2.5} />
            </button>

            {view === "form" ? (
              <HeroForm formSlug="business" onSuccess={handleSuccess} />
            ) : (
              <ModalSuccessCard onClose={closeModal} />
            )}
          </div>
        </div>
      )}
    </DiagnosticoModalContext.Provider>
  );
}

/**
 * Card de sucesso — mesmo card creme do HeroForm pra manter
 * consistência visual na transição form → success.
 *
 * Redesign pro tom sênior/institucional pedido pelo fundador:
 *  - Retirados os icones colorados (Clock/MessageCircle/Sparkles) e
 *    os cards verdes ao redor deles — pareciam checklist infantil.
 *  - Substituídos por uma lista editorial: label mono uppercase em
 *    cima do valor, separada por hairline. Zero cor, zero ícone
 *    nas rows.
 *  - Copy atualizada: sócio "chama agora no WhatsApp" (não é mais
 *    "em até 24h úteis" — chamamos na hora) e diagnóstico agora é
 *    de 45 min (não 60).
 */
function ModalSuccessCard({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="rounded-[24px] overflow-hidden relative"
      style={{
        backgroundColor: "oklch(0.995 0.003 110)",
        border: "1px solid oklch(0.88 0.02 115)",
        boxShadow:
          "0 30px 60px -25px oklch(0.18 0.02 122 / 0.18), 0 10px 25px -10px oklch(0.18 0.02 122 / 0.08)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[24px]"
        style={{ boxShadow: "inset 0 1px 0 oklch(1 0 0 / 0.9)" }}
      />

      <div className="px-6 pt-8 pb-7 lg:px-10 lg:pt-10 lg:pb-9 text-center relative">
        {/* Check minimalista — ring fino em vez do disco verde. Comunica
            sucesso sem virar sticker de app infantil. */}
        <div
          className="mx-auto flex items-center justify-center h-12 w-12 rounded-full mb-5"
          style={{
            background: "transparent",
            border: "1.5px solid oklch(0.62 0.17 125)",
          }}
        >
          <Check className="h-5 w-5" strokeWidth={2.4} style={{ color: "oklch(0.55 0.17 125)" }} />
        </div>

        <h2
          id="diagnostico-modal-title"
          className="font-extrabold text-[22px] sm:text-[26px] lg:text-[28px] leading-[1.1] tracking-[-0.02em]"
          style={{ color: "oklch(0.18 0.02 122)", textWrap: "balance" }}
        >
          Recebemos suas respostas.
        </h2>

        <p
          className="mt-3 text-[13.5px] lg:text-[14.5px] leading-[1.55] max-w-[420px] mx-auto"
          style={{ color: "oklch(0.35 0.02 122)" }}
        >
          Um sócio da IAplicada chama{" "}
          <strong style={{ color: "oklch(0.18 0.02 122)", fontWeight: 700 }}>agora</strong> no
          WhatsApp. Deixa o celular por perto e prepara um resumo curto da sua operação — vai
          adiantar o diagnóstico.
        </p>

        <ul className="mt-7 mx-auto max-w-[420px] text-left">
          <SuccessRow title="Próximo contato" detail="WhatsApp em minutos" />
          <SuccessRow title="Diagnóstico" detail="45 min por vídeo · direto com a IAplicada" />
          <SuccessRow title="Material entregue" detail="Mapa da operação · playbook do trimestre" />
        </ul>

        <button
          onClick={onClose}
          className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full text-[13px] font-bold uppercase tracking-[0.06em] transition-colors"
          style={{
            background: "oklch(0.18 0.02 122)",
            color: "oklch(0.995 0.003 110)",
          }}
        >
          Fechar
        </button>
      </div>
    </div>
  );
}

function SuccessRow({ title, detail }: { title: string; detail: string }) {
  return (
    <li
      className="grid items-baseline gap-6 py-3"
      style={{
        gridTemplateColumns: "minmax(140px, auto) 1fr",
        borderTop: "1px solid oklch(0.88 0.02 115)",
      }}
    >
      <span
        className="text-[10px] uppercase tracking-[0.16em] font-bold"
        style={{
          color: "oklch(0.5 0.02 122)",
          fontFamily: '"JetBrains Mono", ui-monospace, Menlo, monospace',
        }}
      >
        {title}
      </span>
      <span
        className="text-[13.5px] leading-[1.35]"
        style={{ color: "oklch(0.18 0.02 122)", fontWeight: 500 }}
      >
        {detail}
      </span>
    </li>
  );
}
