/**
 * Lê uma custom property CSS do `:root`.
 *
 * Retorna `fallback` quando não há DOM (renderização no servidor) ou quando a
 * variável não está definida — `getPropertyValue` devolve string vazia nesse
 * caso, e não `undefined`.
 */
export function getThemeColor(variable: string, fallback = ""): string {
  if (typeof document === "undefined") return fallback;

  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(variable)
    .trim();

  return value || fallback;
}
