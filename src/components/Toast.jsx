import React from "react";
import { T, mob } from "../theme";

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
        backdropFilter: "blur(12px)",
        transition: "all .3s",
        pointerEvents: "none",
        zIndex: 100,
        boxShadow: `0 4px 20px rgba(52,211,153,0.1)`,
      }}
    >
      {msg}
    </div>
  );
}
