/**
 * Leva até o formulário do hero e coloca o cursor no primeiro campo.
 * O foco espera o scroll suave terminar pra não dar salto na tela.
 */
export function scrollToForm() {
  const top = document.getElementById("top");
  top?.scrollIntoView({ behavior: "smooth", block: "start" });
  window.setTimeout(() => {
    const first = document.getElementById("firstname") as HTMLInputElement | null;
    first?.focus({ preventScroll: true });
  }, 700);
}
