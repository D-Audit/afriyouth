/**
 * Raw token values for places that cannot read CSS variables
 * (generated social images, the web manifest and the browser theme colour).
 * Keep these in sync with the @theme block in src/app/globals.css.
 */
export const tokens = {
  canvas: "#f5f5f7",
  sand: "#ececf3",
  ink: "#0d0624",
  muted: "#55516b",
  night: "#0d0624",
  accent: "#0301ff",
  duke: "#0200a7",
  pink: "#c723df",
} as const;
