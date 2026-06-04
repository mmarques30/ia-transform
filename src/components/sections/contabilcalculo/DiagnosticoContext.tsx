import { createContext, useContext, useState, useCallback } from "react";
import type { ReactNode } from "react";

/**
 * Context que controla a abertura do modal da calculadora. Todos os
 * CTAs "Fazer meu diagnóstico" da página chamam open() pra abrir o
 * modal em vez de scrollar até a seção da calc.
 */

interface DiagnosticoContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const Ctx = createContext<DiagnosticoContextValue | null>(null);

export function DiagnosticoProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
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
