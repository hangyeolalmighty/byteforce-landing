import React, { useState, useRef } from "react";
import { T, mob } from "../theme";

// Spring easing curves (from naisser.ai.kr)
const SPRING = "cubic-bezier(0.34, 1.56, 0.64, 1)";
const SPRING_GENTLE = "cubic-bezier(0.25, 0.46, 0.45, 0.94)";

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
          ? `0 8px 32px rgba(0,0,0,.25),0 0 20px ${accent || "rgba(74,158,255,0)"}15,inset 0 1px 0 rgba(255,255,255,.07)`
          : active && accent
            ? `0 0 15px ${accent}15,inset 0 0 15px ${accent}05,inset 0 1px 0 rgba(255,255,255,.05)`
            : `0 1px 4px rgba(0,0,0,.1),inset 0 1px 0 rgba(255,255,255,.04)`,
        transition: `all .3s ${SPRING_GENTLE}`,
        transform: h && onClick ? "scale(1.01)" : "scale(1)",
        cursor: onClick ? "pointer" : "default",
        // Gentle pulse animation for active cards
        animation: active && accent ? "gentlePulse 3s ease infinite" : "none",
        "--pulse-color": accent ? `${accent}20` : "rgba(74,158,255,.15)",
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
      {/* Noise grain overlay — adds analog depth */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
          pointerEvents: "none",
          opacity: h ? 0.8 : 0.4,
          transition: "opacity .3s",
        }}
      />
      {/* Mouse-tracking highlight — enhanced with glow bloom */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: h
            ? `radial-gradient(ellipse at ${mx}% ${my}%,rgba(255,255,255,.05),transparent 50%)`
            : "transparent",
          pointerEvents: "none",
          transition: h ? "none" : "opacity .4s",
        }}
      />
      {/* Top edge highlight — brushed metal reflection */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "5%",
          right: "5%",
          height: h ? 2 : 1,
          background:
            h && accent
              ? `linear-gradient(90deg,transparent,${accent}50,transparent)`
              : `linear-gradient(90deg,transparent,rgba(196,202,214,${h ? 0.18 : 0.05}),transparent)`,
          pointerEvents: "none",
          transition: `all .3s ${SPRING_GENTLE}`,
        }}
      />
      {/* Metal sheen sweep on hover */}
      {h && !mob && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(110deg,transparent 30%,rgba(255,255,255,.03) 45%,rgba(255,255,255,.06) 50%,rgba(255,255,255,.03) 55%,transparent 70%)",
            backgroundSize: "200% 100%",
            animation: "metalSheen 1.5s ease forwards",
            pointerEvents: "none",
          }}
        />
      )}
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
            background: `radial-gradient(circle,${accent}08,transparent 70%)`,
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
            background: `radial-gradient(circle,${accent}18,transparent 70%)`,
            filter: "blur(15px)",
            pointerEvents: "none",
          }}
        />
      )}
      <div style={{ position: "relative", zIndex: 2 }}>{children}</div>
    </div>
  );
}
