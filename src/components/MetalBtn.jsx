import React, { useState } from "react";
import { T } from "../theme";

export function MetalBtn({
  children,
  onClick,
  color = null,
  size = "md",
  full = false,
  disabled = false,
  style = {},
}) {
  const [h, sH] = useState(false);
  const [p, sP] = useState(false);
  const pad =
    size === "sm" ? "7px 12px" : size === "lg" ? "13px 28px" : "10px 18px";

  return (
    <button
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => !disabled && sH(true)}
      onMouseLeave={() => {
        sH(false);
        sP(false);
      }}
      onMouseDown={() => !disabled && sP(true)}
      onMouseUp={() => sP(false)}
      style={{
        padding: pad,
        borderRadius: 6,
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        background: color
          ? `linear-gradient(135deg,${color}30,${color}18,${color}30)`
          : T.metalGrad,
        color: color || "#1C1F26",
        fontSize: size === "sm" ? 9 : size === "lg" ? 12 : 11,
        fontFamily: T.mono,
        fontWeight: 700,
        letterSpacing: 1,
        opacity: disabled ? 0.4 : 1,
        boxShadow: p
          ? `0 1px 2px rgba(0,0,0,.3),inset 0 2px 4px rgba(0,0,0,.15)`
          : h
            ? `0 4px 16px rgba(0,0,0,.25),inset 0 1px 0 rgba(255,255,255,.2)`
            : `0 2px 8px rgba(0,0,0,.2),inset 0 1px 0 rgba(255,255,255,.15)`,
        transform: p
          ? "scale(.98) translateY(1px)"
          : h
            ? "translateY(-1px)"
            : "none",
        transition: "all .15s",
        width: full ? "100%" : "auto",
        ...style,
      }}
    >
      {children}
    </button>
  );
}
