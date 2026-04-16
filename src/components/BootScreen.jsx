import React, { useState, useEffect } from "react";
import { T, mob } from "../theme";
import { BL } from "../data/boot-lines";

export function BootScreen({ onDone }) {
  const [lines, setLines] = useState([]);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    BL.forEach((l) => {
      setTimeout(() => setLines((p) => [...p, l]), l.d);
    });
    setTimeout(() => setFade(true), 2300);
    setTimeout(onDone, 2900);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#0A0C10",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: fade ? 0 : 1,
        transition: "opacity 0.6s",
        pointerEvents: fade ? "none" : "auto",
      }}
    >
      <div style={{ width: mob ? "90%" : 460, fontFamily: T.mono }}>
        <div
          style={{
            fontSize: 10,
            color: T.mute,
            letterSpacing: 4,
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          SYSTEM BOOT
        </div>
        {lines.map((l, i) => (
          <div
            key={i}
            style={{
              fontSize: mob ? 10 : 11,
              color: l.c,
              marginBottom: 6,
              opacity: 0,
              animation: "bootLine 0.3s ease forwards",
              animationDelay: `${i * 0.05}s`,
              letterSpacing: 0.5,
              lineHeight: 1.8,
            }}
          >
            {l.t}
          </div>
        ))}
        <div
          style={{
            marginTop: 20,
            height: 2,
            background: T.surface,
            borderRadius: 1,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              background: T.metalGrad,
              borderRadius: 1,
              animation: "bootBar 2.2s ease forwards",
            }}
          />
        </div>
      </div>
    </div>
  );
}
