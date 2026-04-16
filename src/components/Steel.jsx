import React, { useState, useRef } from "react";
import { T, mob } from "../theme";

export function Steel({
  children,
  accent = null,
  onClick = null,
  active = false,
  glow = false,
  style = {},
}) {
  const [h, sH] = useState(false);
  const [mx, sMx] = useState(50);
  const [my, sMy] = useState(50);
  const ref = useRef(null);

  const onMM = (e) => {
    if (!ref.current || mob) return;
    const r = ref.current.getBoundingClientRect();
    sMx(((e.clientX - r.left) / r.width) * 100);
    sMy(((e.clientY - r.top) / r.height) * 100);
  };

  return (
    <div
      ref={ref}
      onClick={onClick}
      onMouseEnter={() => sH(true)}
      onMouseLeave={() => sH(false)}
      onMouseMove={onMM}
      style={{
        position: "relative",
        overflow: "hidden",
        padding: mob ? "14px 16px" : "20px 22px",
        borderRadius: 8,
        background: active
          ? `linear-gradient(145deg,${accent}08,${accent}04)`
          : T.surface,
        border: `1px solid ${active && accent ? accent + "20" : h ? T.borderHi : T.border}`,
        boxShadow: h
          ? `0 8px 32px rgba(0,0,0,.25),0 0 20px ${accent || "rgba(74,158,255,0)"}15,inset 0 1px 0 rgba(255,255,255,.05)`
          : `0 1px 4px rgba(0,0,0,.1),inset 0 1px 0 rgba(255,255,255,.02)`,
        transition: "all .35s",
        cursor: onClick ? "pointer" : "default",
        ...style,
      }}
    >
      {/* Brushed metal texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: T.brushed,
          pointerEvents: "none",
          opacity: 0.6,
        }}
      />
      {/* Mouse-tracking highlight */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at ${mx}% ${my}%,rgba(255,255,255,${h ? 0.04 : 0}),transparent 50%)`,
          pointerEvents: "none",
          transition: h ? "none" : "opacity .4s",
        }}
      />
      {/* Top edge highlight */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "5%",
          right: "5%",
          height: h ? 2 : 1,
          background:
            h && accent
              ? `linear-gradient(90deg,transparent,${accent}40,transparent)`
              : `linear-gradient(90deg,transparent,rgba(196,202,214,${h ? 0.15 : 0.04}),transparent)`,
          pointerEvents: "none",
          transition: "all .4s",
        }}
      />
      {/* Active center glow */}
      {active && accent && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 160,
            height: 160,
            borderRadius: "50%",
            background: `radial-gradient(circle,${accent}06,transparent 70%)`,
            transform: "translate(-50%,-50%)",
            filter: "blur(25px)",
            pointerEvents: "none",
          }}
        />
      )}
      {/* Corner glow for live items */}
      {glow && accent && (
        <div
          style={{
            position: "absolute",
            bottom: -30,
            right: -30,
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: `radial-gradient(circle,${accent}15,transparent 70%)`,
            filter: "blur(15px)",
            pointerEvents: "none",
          }}
        />
      )}
      <div style={{ position: "relative", zIndex: 2 }}>{children}</div>
    </div>
  );
}
