import React, { useState } from "react";
import { T, mob, SPRING_GENTLE } from "../theme";

export function Nav({
  icon,
  label,
  active,
  color,
  onClick,
  badge = null,
  visited = false,
  collapsed = false,
}) {
  const [h, sH] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => sH(true)}
      onMouseLeave={() => sH(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: collapsed ? 0 : 10,
        width: "100%",
        padding: collapsed ? "10px 0" : "10px 18px",
        justifyContent: collapsed ? "center" : "flex-start",
        background: active
          ? `linear-gradient(90deg,${color}08,transparent)`
          : h
          ? "rgba(255,255,255,.02)"
          : "transparent",
        border: "none",
        borderLeft: "2px solid transparent",
        borderImage: active
          ? `linear-gradient(180deg, transparent, ${color}, transparent) 1`
          : "none",
        cursor: "pointer",
        transition: "all .25s " + SPRING_GENTLE,
        textAlign: "left",
        borderRadius: 0,
        position: "relative",
        boxShadow: active ? `-4px 0 12px ${color}20` : "none",
      }}
    >
      <span
        style={{
          fontSize: 12,
          width: 18,
          textAlign: "center",
          color: active ? color : T.mute,
          transition: "all .25s " + SPRING_GENTLE,
          filter: h
            ? `drop-shadow(0 0 4px ${color}40)`
            : active
            ? `drop-shadow(0 0 3px ${color}50)`
            : "none",
          transform: h ? "scale(1.15)" : "scale(1)",
          position: "relative",
        }}
      >
        {icon}
        {/* Visited indicator dot */}
        {visited && !active && (
          <span
            style={{
              position: "absolute",
              top: -2,
              right: -2,
              width: 3,
              height: 3,
              borderRadius: "50%",
              background: color,
              opacity: 0.5,
            }}
          />
        )}
      </span>
      {!mob && !collapsed && (
        <span
          style={{
            fontFamily: T.mono,
            fontSize: 10,
            letterSpacing: 2,
            fontWeight: active ? 600 : 400,
            color: active ? color : h ? T.text : T.sub,
            transition: "color .25s " + SPRING_GENTLE,
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </span>
      )}
      {badge && !collapsed && (
        <span
          style={{
            position: "absolute",
            right: 14,
            top: "50%",
            transform: "translateY(-50%)",
            fontFamily: T.mono,
            fontSize: 7,
            padding: "2px 5px",
            borderRadius: 3,
            background: `${color}18`,
            color,
            letterSpacing: 0.5,
          }}
        >
          {badge}
        </span>
      )}
    </button>
  );
}
