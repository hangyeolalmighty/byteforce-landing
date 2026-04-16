import React, { useState } from "react";
import { T } from "../theme";

export function QB({ label, icon, color, onClick }) {
  const [h, sH] = useState(false);
  const [p, sP] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => sH(true)}
      onMouseLeave={() => { sH(false); sP(false); }}
      onMouseDown={() => sP(true)}
      onMouseUp={() => sP(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "10px 14px",
        borderRadius: 20,
        background: h ? `${color}12` : `${color}06`,
        border: `1px solid ${h ? color + "35" : color + "18"}`,
        cursor: "pointer",
        transition: "all .25s cubic-bezier(0.34, 1.56, 0.64, 1)",
        textAlign: "left",
        width: "100%",
        boxShadow: h ? `0 4px 16px ${color}20, inset 0 0 12px ${color}08` : "none",
        transform: p ? "scale(0.95)" : h ? "scale(1.02)" : "scale(1)",
      }}
    >
      {icon && (
        <span style={{
          fontSize: 10,
          color,
          flexShrink: 0,
          transition: "all .25s cubic-bezier(0.34, 1.56, 0.64, 1)",
          filter: h ? `drop-shadow(0 0 4px ${color}60)` : "none",
          transform: h ? "scale(1.15)" : "scale(1)",
        }}>{icon}</span>
      )}
      <span
        style={{
          fontSize: 12,
          color: h ? T.text : T.sub,
          fontFamily: T.font,
          transition: "color .2s",
          letterSpacing: 0.3,
        }}
      >
        {label}
      </span>
    </button>
  );
}
