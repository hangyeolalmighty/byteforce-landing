import React from "react";
import { T } from "../theme";

export function StatusDot() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <div style={{ position: "relative", width: 6, height: 6 }}>
        {/* Third glow ring — slowest pulse */}
        <div
          style={{
            position: "absolute",
            inset: -2,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #34D399, #22D3EE)",
            opacity: 0.2,
            animation: "pingPulse 3s ease infinite",
          }}
        />
        {/* Outer pulse ring */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #34D399, #22D3EE)",
            opacity: 0.4,
            animation: "pingPulse 2s ease infinite",
          }}
        />
        {/* Core dot */}
        <div
          style={{
            position: "absolute",
            inset: 1,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #34D399, #22D3EE)",
            boxShadow: `0 0 6px ${T.green}`,
          }}
        />
      </div>
      <span
        style={{
          fontFamily: T.mono,
          fontSize: 8,
          letterSpacing: 2,
          background:
            "linear-gradient(90deg, rgba(255,255,255,.38), rgba(255,255,255,.55), rgba(255,255,255,.38))",
          backgroundSize: "200% 100%",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          animation: "textShimmer 3s ease-in-out infinite",
        }}
      >
        ONLINE
      </span>
    </div>
  );
}
