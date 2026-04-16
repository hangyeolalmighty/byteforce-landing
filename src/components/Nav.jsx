import React from "react";
import { T, mob } from "../theme";

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
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: collapsed ? 0 : 10,
        width: "100%",
        padding: collapsed ? "10px 0" : "10px 18px",
        justifyContent: collapsed ? "center" : "flex-start",
        background: active
          ? `linear-gradient(90deg,${color}08,transparent)`
          : "transparent",
        border: "none",
        borderLeft: active
          ? `2px solid ${color}`
          : "2px solid transparent",
        cursor: "pointer",
        transition: "all .2s",
        textAlign: "left",
        borderRadius: 0,
        position: "relative",
      }}
    >
      <span
        style={{
          fontSize: 12,
          width: 18,
          textAlign: "center",
          color: active ? color : T.mute,
          transition: "all .3s",
          filter: active ? `drop-shadow(0 0 3px ${color}50)` : "none",
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
            color: active ? T.text : T.sub,
            transition: "color .2s",
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
