import React from "react";
import { T, mob, SPRING } from "../theme";

const NOISE_SVG_INLINE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E")`;

export function Toast({ msg, show }) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: mob ? 80 : 30,
        left: "50%",
        transform: `translateX(-50%) translateY(${show ? 0 : 20}px)`,
        opacity: show ? 1 : 0,
        padding: "10px 20px",
        borderRadius: 8,
        background: "rgba(52,211,153,0.15)",
        border: `1px solid ${T.green}30`,
        color: T.green,
        fontFamily: T.mono,
        fontSize: 11,
        letterSpacing: 1,
        backdropFilter: "blur(12px) saturate(1.4)",
        WebkitBackdropFilter: "blur(12px) saturate(1.4)",
        transition: `all .4s ${SPRING}`,
        pointerEvents: "none",
        zIndex: 100,
        boxShadow: `0 4px 20px rgba(52,211,153,.15), 0 0 30px rgba(52,211,153,.08)`,
        overflow: "hidden",
      }}
    >
      {/* Noise texture overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: NOISE_SVG_INLINE,
          opacity: 0.3,
          pointerEvents: "none",
          borderRadius: 8,
        }}
      />
      <span style={{ position: "relative" }}>{"✓ "}{msg}</span>
    </div>
  );
}
