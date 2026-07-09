import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { X, CheckCircle2, MessageCircle, Clock } from "lucide-react";
import { HeroForm } from "@/components/HeroForm";
import { LogoMark } from "@/components/Logo";

/**
 * DiagnosticoModal (LP-B) — modal overlay com HeroForm dentro + estado
 * de sucesso resumido inline (sem redirecionar pra /thank-you-business).
 *
 * Motivação: os CTAs "Quero sair do operacional" espalhados pela LP
 * navegavam pra /businessv2/diagnostico (rota separada). Feedback:
 * abrir modal na hora reduz atrito (1 clique a menos, sem trocar de
 * página), e mostrar o thank-you resumido inline mantém a energia
 * do momento de conversão.
 *
 * A rota /businessv2/diagnostico continua existindo — pode ser bookmark,
 * link de anúncio direto, ou fallback pro caso do modal quebrar. E o
 * FinalForm inline no fim da LP continua com o comportamento antigo
 * (fill inline → redirect pra thank-you-business).
 *
 * Como funciona:
 *  1. Provider envolve a LP e mantém `open` state
 *  2. CtaGlow chama `openModal()` via hook — abre overlay
 *  3. HeroForm dentro do modal recebe `onSuccess` callback que troca
 *     a view pra estado de sucesso resumido
 *  4. Estado de sucesso mostra ícone + copy + próximos passos (não
 *     navega — user continua na LP com contexto)
 *  5. Fechar modal reseta pro estado inicial
 */

type ModalView = "form" | "success";

interface DiagnosticoModalContextValue {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const DiagnosticoModalContext = createContext<DiagnosticoModalContextValue | null>(null);

/** Hook consumido por CtaGlow. Retorna null se sem Provider — caller
 *  fallback pra Link com navegação tradicional. */
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
    // Reset view depois da animação de fechamento pra não ver flash de
    // conteúdo antigo se abrir de novo
    setTimeout(() => setView("form"), 250);
  }, []);

  // Bloqueia scroll do body quando aberto — evita scroll na LP atrás.
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  // ESC fecha modal.
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
          className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6 lg:py-10"
          style={{
            background: "rgba(5, 6, 4, 0.72)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
          }}
          onClick={(e) => {
            // Click no backdrop fecha; click no card interno não propaga.
            if (e.target === e.currentTarget) closeModal();
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="diagnostico-modal-title"
        >
          <div
            className="relative w-full max-w-[540px] max-h-[92vh] overflow-y-auto rounded-2xl"
            style={{
              background: "linear-gradient(180deg, rgba(20,24,13,0.98), rgba(15,17,9,0.98))",
              border: "1px solid rgba(200,224,64,0.25)",
              boxShadow: "0 40px 80px -20px rgba(0,0,0,0.7), 0 0 60px -10px rgba(200,224,64,0.15)",
            }}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 h-9 w-9 rounded-full flex items-center justify-center transition-colors"
              style={{
                background: "rgba(10,12,7,0.7)",
                border: "1px solid rgba(200,224,64,0.15)",
                color: "#a9adb1",
              }}
              aria-label="Fechar"
            >
              <X className="h-4 w-4" />
            </button>

            {view === "form" ? (
              <ModalFormView onSuccess={handleSuccess} />
            ) : (
              <ModalSuccessView onClose={closeModal} />
            )}
          </div>
        </div>
      )}
    </DiagnosticoModalContext.Provider>
  );
}

function ModalFormView({ onSuccess }: { onSuccess: () => void }) {
  return (
    <div className="p-6 lg:p-8">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 opacity-80">
          <LogoMark size={20} />
          <span className="text-[10.5px] uppercase tracking-[0.22em] font-bold text-foreground">
            IAplicada · Business
          </span>
        </div>
        <h2
          id="diagnostico-modal-title"
          className="mt-5 font-extrabold text-[22px] sm:text-[26px] lg:text-[30px] leading-[1.1] tracking-[-0.02em] text-foreground"
          style={{ textWrap: "balance" }}
        >
          Primeiro passo para{" "}
          <em
            style={{
              fontFamily: '"Instrument Serif", serif',
              color: "var(--color-primary)",
              fontWeight: 500,
            }}
          >
            sair do operacional.
          </em>
        </h2>
        <p className="mt-3 text-[13.5px] lg:text-[14px] text-sage leading-[1.55] max-w-[420px] mx-auto">
          Preencha abaixo. Chamamos por WhatsApp em até{" "}
          <strong className="text-foreground font-semibold">24h úteis</strong> pra agendar o
          diagnóstico com a Mari.
        </p>
      </div>

      <div className="mt-6">
        <HeroForm formSlug="business" onSuccess={onSuccess} />
      </div>

      <p className="mt-5 text-center text-[10.5px] uppercase tracking-[0.18em] font-bold text-muted-foreground">
        Sem compromisso. <span style={{ color: "var(--color-primary)" }}>100% confidencial.</span>
      </p>
    </div>
  );
}

function ModalSuccessView({ onClose }: { onClose: () => void }) {
  return (
    <div className="p-6 lg:p-8 text-center">
      <div
        className="mx-auto flex items-center justify-center h-16 w-16 rounded-full mb-5"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(200,224,64,0.25), rgba(200,224,64,0.05))",
          border: "2px solid rgba(200,224,64,0.5)",
        }}
      >
        <CheckCircle2
          className="h-8 w-8"
          style={{ color: "var(--color-primary)" }}
          strokeWidth={2.2}
        />
      </div>

      <h2
        className="font-extrabold text-[24px] sm:text-[28px] lg:text-[32px] leading-[1.1] tracking-[-0.02em] text-foreground"
        style={{ textWrap: "balance" }}
      >
        Recebemos suas{" "}
        <em
          style={{
            fontFamily: '"Instrument Serif", serif',
            color: "var(--color-primary)",
            fontWeight: 500,
          }}
        >
          respostas.
        </em>
      </h2>

      <p className="mt-4 text-[14px] lg:text-[15px] text-sage leading-[1.6] max-w-[440px] mx-auto">
        Um sócio da IAplicada vai revisar o que você preencheu e chamar por WhatsApp em até{" "}
        <strong className="text-foreground font-bold">24 horas úteis</strong> pra agendar o
        diagnóstico com a Mari.
      </p>

      <ul className="mt-7 mx-auto max-w-[380px] flex flex-col gap-3 text-left">
        <SuccessRow
          icon={<Clock className="h-4 w-4" />}
          title="Próximo contato"
          detail="WhatsApp em até 24h úteis"
        />
        <SuccessRow
          icon={<MessageCircle className="h-4 w-4" />}
          title="Diagnóstico"
          detail="60 min por vídeo · direto com a Mari"
        />
        <SuccessRow
          icon={<CheckCircle2 className="h-4 w-4" />}
          title="Material entregue"
          detail="Mapa da operação · playbook do próximo trimestre"
        />
      </ul>

      <button
        onClick={onClose}
        className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full text-[13px] font-bold uppercase tracking-[0.06em] transition-colors"
        style={{
          background: "rgba(200,224,64,0.08)",
          border: "1px solid rgba(200,224,64,0.35)",
          color: "var(--color-primary)",
        }}
      >
        Fechar
      </button>
    </div>
  );
}

function SuccessRow({
  icon,
  title,
  detail,
}: {
  icon: React.ReactNode;
  title: string;
  detail: string;
}) {
  return (
    <li
      className="flex items-start gap-3 p-3 rounded-lg"
      style={{
        background: "rgba(200,224,64,0.04)",
        border: "1px solid rgba(200,224,64,0.12)",
      }}
    >
      <span
        className="shrink-0 h-8 w-8 rounded-full flex items-center justify-center"
        style={{
          background: "rgba(200,224,64,0.1)",
          color: "var(--color-primary)",
        }}
      >
        {icon}
      </span>
      <div>
        <p
          className="text-[10px] uppercase tracking-[0.16em] font-bold"
          style={{
            color: "var(--color-primary)",
            fontFamily: '"JetBrains Mono", ui-monospace, Menlo, monospace',
          }}
        >
          {title}
        </p>
        <p className="mt-0.5 text-[13px] text-foreground leading-[1.4]">{detail}</p>
      </div>
    </li>
  );
}
