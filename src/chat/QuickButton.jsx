import React, { useState } from "react";
import { T } from "../theme";

export function QB({ label, icon, color, onClick }) {
  const [h, sH] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => sH(true)}
      onMouseLeave={() => sH(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "10px 14px",
        borderRadius: 20,
        background: h ? `${color}12` : `${color}06`,
        border: `1px solid ${h ? color + "35" : color + "18"}`,
        cursor: "pointer",
        transition: "all .2s",
        textAlign: "left",
        width: "100%",
        boxShadow: h ? `0 2px 12px ${color}15` : "none",
      }}
    >
      {icon && (
        <span style={{ fontSize: 10, color, flexShrink: 0 }}>{icon}</span>
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
