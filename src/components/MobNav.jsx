import React from "react";
import { T } from "../theme";

const NOISE_SVG_INLINE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E")`;

export function MobNav({ active, onNav }) {
  const items = [
    { id: "home", label: "Home", icon: "\u2b21", c: T.accent },
    { id: "services", label: "Services", icon: "\u25c7", c: T.purple },
    { id: "solutions", label: "Solutions", icon: "\u25c6", c: T.green },
    { id: "work", label: "Work", icon: "\u25a6", c: T.gold },
    { id: "ai", label: "AI", icon: "\u25cf", c: T.pink },
    { id: "contact", label: "Contact", icon: "\u25ce", c: T.green },
  ];

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: "rgba(18,20,26,.95)",
        backdropFilter: "blur(24px) saturate(1.4)",
        WebkitBackdropFilter: "blur(24px) saturate(1.4)",
        borderTop: `1px solid rgba(255,255,255,.06)`,
        display: "flex",
        padding: "4px 8px max(4px,env(safe-area-inset-bottom))",
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
        }}
      />
      {items.map((it) => {
        const on = active === it.id;
        return (
          <button
            key={it.id}
            onClick={() => onNav(it.id)}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              background: on
                ? `linear-gradient(180deg,${it.c}12,transparent)`
                : "none",
              border: "none",
              cursor: "pointer",
              padding: "8px 0 6px",
              borderRadius: 8,
              margin: "0 2px",
              transition: "all .25s cubic-bezier(0.34, 1.56, 0.64, 1)",
              position: "relative",
            }}
          >
            {on && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: "25%",
                  right: "25%",
                  height: 2,
                  borderRadius: 1,
                  background: it.c,
                  boxShadow: `0 0 8px ${it.c}60`,
                }}
              />
            )}
            <span
              style={{
                fontSize: 16,
                color: on ? it.c : T.mute,
                transition: "all .25s cubic-bezier(0.34, 1.56, 0.64, 1)",
                filter: on ? `drop-shadow(0 0 4px ${it.c}40)` : "none",
                transform: on
                  ? "scale(1.15) translateY(-1px)"
                  : "scale(1)",
              }}
            >
              {it.icon}
            </span>
            <span
              style={{
                fontSize: 8,
                letterSpacing: 1,
                fontFamily: T.mono,
                fontWeight: on ? 700 : 400,
                color: on ? it.c : "rgba(255,255,255,.2)",
              }}
            >
              {it.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
