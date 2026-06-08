import { createContext, useContext, useState, useCallback, useRef } from "react";
import type { ReactNode } from "react";

/**
 * Context que controla a abertura do modal da calculadora. Todos os
 * CTAs "Fazer meu diagnóstico" da página chamam open() pra abrir o
 * modal em vez de scrollar até a seção da calc.
 *
 * Dispara `calc_modal_open` no Clarity na primeira abertura — pra
 * fechar o loop de tracking junto com `calc_lead_gate_submit` e
 * `calc_submit_success` da Calculadora.
 */

type ClarityFn = (action: string, ...args: unknown[]) => void;
function trackClarity(action: string, ...args: unknown[]): void {
  if (typeof window === "undefined") return;
  const fn = (window as unknown as { clarity?: ClarityFn }).clarity;
  if (typeof fn !== "function") return;
  try {
    fn(action, ...args);
  } catch (err) {
    console.warn("[clarity] tracking failed", err);
  }
}

interface DiagnosticoContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const Ctx = createContext<DiagnosticoContextValue | null>(null);

export function DiagnosticoProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const openFired = useRef(false);
  const open = useCallback(() => {
    setIsOpen(true);
    if (!openFired.current) {
      openFired.current = true;
      trackClarity("event", "calc_modal_open");
    }
  }, []);
  const close = useCallback(() => setIsOpen(false), []);
  return <Ctx.Provider value={{ isOpen, open, close }}>{children}</Ctx.Provider>;
}

export function useDiagnostico() {
  const ctx = useContext(Ctx);
  if (!ctx) {
    throw new Error("useDiagnostico must be used within DiagnosticoProvider");
  }
  return ctx;
}
