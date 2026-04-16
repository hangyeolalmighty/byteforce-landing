import React from "react";
import { T } from "../theme";

export function StatusDot() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <div style={{ position: "relative", width: 6, height: 6 }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: T.green,
            opacity: 0.4,
            animation: "pingPulse 2s ease infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 1,
            borderRadius: "50%",
            background: T.green,
            boxShadow: `0 0 6px ${T.green}`,
          }}
        />
      </div>
      <span
        style={{
          fontFamily: T.mono,
          fontSize: 8,
          color: T.sub,
          letterSpacing: 2,
        }}
      >
        ONLINE
      </span>
    </div>
  );
}
