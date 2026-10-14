import { createContext, useContext } from "react";

/**
 * Idioma/mercado da LP Business.
 *
 *  - pt-br: LP brasileira (/, /iaplicada-*). Default de todo componente.
 *  - pt-us: brasileiro com empresa nos EUA (/us-contratacao). Português,
 *           faturamento em US$, WhatsApp internacional.
 *  - en:    empresas americanas (/en-contratacao). Inglês, contato por e-mail.
 *
 * Os componentes da LP guardam a própria copy por idioma (LpCopy) e leem o
 * idioma do provider. Fora do provider é sempre pt-br, então a LP brasileira
 * renderiza exatamente o que renderizava antes.
 */
export type LpLocale = "pt-br" | "pt-us" | "en";

/** Copy de um componente por idioma. pt-us omitido = mesma copy do pt-br. */
export interface LpCopy<T> {
  "pt-br": T;
  "pt-us"?: T;
  en: T;
}

const LpLocaleContext = createContext<LpLocale>("pt-br");

export function LpLocaleProvider({
  locale,
  children,
}: {
  locale: LpLocale;
  children: React.ReactNode;
}) {
  return <LpLocaleContext.Provider value={locale}>{children}</LpLocaleContext.Provider>;
}

export function useLpLocale(): LpLocale {
  return useContext(LpLocaleContext);
}

export function pickLpCopy<T>(copy: LpCopy<T>, locale: LpLocale): T {
  return copy[locale] ?? copy["pt-br"];
}

export function useLpCopy<T>(copy: LpCopy<T>): T {
  return pickLpCopy(copy, useLpLocale());
}
