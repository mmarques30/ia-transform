/**
 * Brilho que segue o cursor nos cards .lpx-spot: um único listener no
 * <main> atualiza --mx/--my do card sob o ponteiro (sem state, sem re-render).
 */
export function onSpotlightMove(e: React.PointerEvent<HTMLElement>) {
  if (e.pointerType !== "mouse") return;
  const card = (e.target as HTMLElement).closest<HTMLElement>(".lpx-spot");
  if (!card) return;
  const r = card.getBoundingClientRect();
  card.style.setProperty("--mx", `${e.clientX - r.left}px`);
  card.style.setProperty("--my", `${e.clientY - r.top}px`);
}
