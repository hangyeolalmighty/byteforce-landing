// BYTEFORCE Design System — Cybertruck Stainless Steel
export const T = {
  bg: "#12141A",
  panel: "#181A22",
  surface: "#1E2028",
  surfaceHi: "#262830",
  border: "rgba(255,255,255,0.04)",
  borderHi: "rgba(255,255,255,0.09)",
  chrome: "#8A919E",
  chromeBright: "#C4CAD6",
  chromePeak: "#E8ECF2",
  chromeDim: "#555B68",
  metalGrad:
    "linear-gradient(135deg,#555B68 0%,#8A919E 25%,#C4CAD6 45%,#E8ECF2 50%,#C4CAD6 55%,#8A919E 75%,#555B68 100%)",
  metalGradSubtle:
    "linear-gradient(135deg,#3A3F4A 0%,#555B68 30%,#6B7280 50%,#555B68 70%,#3A3F4A 100%)",
  metalText:
    "linear-gradient(180deg,#E8ECF2 0%,#C4CAD6 30%,#8A919E 70%,#6B7280 100%)",
  brushed:
    "repeating-linear-gradient(90deg,transparent,transparent 1px,rgba(255,255,255,0.005) 1px,rgba(255,255,255,0.005) 2px)",
  accent: "#4A9EFF",
  purple: "#7C5CFC",
  gold: "#C9A84C",
  green: "#34D399",
  pink: "#DB2777",
  cyan: "#22D3EE",
  text: "#D0D5DE",
  sub: "rgba(255,255,255,0.38)",
  mute: "rgba(255,255,255,0.13)",
  font: "'Inter','Noto Sans KR',sans-serif",
  mono: "'JetBrains Mono',monospace",
};

export const mob =
  typeof window !== "undefined" && window.innerWidth < 900;

// Spring easing curves
export const SPRING = "cubic-bezier(0.34, 1.56, 0.64, 1)";
export const SPRING_GENTLE = "cubic-bezier(0.25, 0.46, 0.45, 0.94)";
export const SPRING_STIFF = "cubic-bezier(0.25, 1, 0.5, 1)";

// Glassmorphism presets
export const glass = {
  bg: "rgba(18,20,26,.6)",
  bgHeavy: "rgba(18,20,26,.85)",
  blur: "blur(20px) saturate(1.4)",
  border: "rgba(255,255,255,0.06)",
};

// Noise texture SVG (inline data URI)
export const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E")`;
