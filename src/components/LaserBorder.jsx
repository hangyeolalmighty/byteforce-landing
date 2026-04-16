import React from "react";
import { mob } from "../theme";

export function LaserBorder({ children }) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: mob ? "100dvh" : "100vh",
        overflow: "hidden",
        background: "#0A0C10",
      }}
    >
      {/* Solid laser ring */}
      <div
        className="laser-ring"
        style={{
          position: "absolute",
          inset: 0,
          padding: 1,
          background:
            "conic-gradient(from var(--laser-angle,0deg),#4A9EFF,#7C5CFC,#DB2777,#C9A84C,#34D399,#22D3EE,#4A9EFF)",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          animation: "laserSpin 4s linear infinite",
          opacity: 0.7,
        }}
      />
      {/* Blurred glow ring */}
      <div
        style={{
          position: "absolute",
          inset: -2,
          padding: 3,
          background:
            "conic-gradient(from var(--laser-angle,0deg),#4A9EFF40,#7C5CFC40,#DB277740,#C9A84C40,#34D39940,#22D3EE40,#4A9EFF40)",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          animation: "laserSpin 4s linear infinite",
          filter: "blur(6px)",
          opacity: 0.5,
        }}
      />
      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
}
