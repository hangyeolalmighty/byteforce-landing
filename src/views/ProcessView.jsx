import React from "react";
import { T, mob } from "../theme";
import { Steel } from "../components/Steel";

export function ProcessView() {
  return (
    <div
      style={{
        padding: mob ? 16 : 32,
        height: "100%",
        overflow: "auto",
        maxWidth: 720,
        margin: "0 auto",
      }}
    >
      <div
        style={{
          fontFamily: T.mono,
          fontSize: 8,
          color: T.mute,
          letterSpacing: 7,
          marginBottom: 8,
        }}
      >
        WORKFLOW
      </div>
      <div
        style={{
          fontSize: mob ? 20 : 28,
          fontWeight: 800,
          marginBottom: 28,
          background: T.metalText,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Process
      </div>
      {[
        { n: "01", t: "Discovery", k: "비즈니스를 파악합니다", c: T.accent },
        { n: "02", t: "Design", k: "최적의 구조를 설계합니다", c: T.purple },
        { n: "03", t: "Build", k: "실제로 작동하게 만듭니다", c: T.gold },
        { n: "04", t: "Evolve", k: "함께 발전시킵니다", c: T.green },
      ].map((s, i) => (
        <div
          key={i}
          style={{
            animation: "stagger .5s ease forwards",
            opacity: 0,
            animationDelay: `${i * 0.1}s`,
          }}
        >
          <Steel accent={s.c} style={{ marginBottom: 8 }}>
            <div
              style={{ display: "flex", alignItems: "center", gap: 18 }}
            >
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: "50%",
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: T.metalGradSubtle,
                  border: `1px solid ${s.c}18`,
                  boxShadow: `0 2px 8px rgba(0,0,0,.15),inset 0 1px 0 rgba(255,255,255,.08)`,
                }}
              >
                <span
                  style={{
                    fontFamily: T.mono,
                    fontSize: 13,
                    fontWeight: 800,
                    color: s.c,
                  }}
                >
                  {s.n}
                </span>
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: 1 }}>
                  {s.t}
                </div>
                <div style={{ fontSize: 12, color: T.sub, marginTop: 2 }}>
                  {s.k}
                </div>
              </div>
            </div>
          </Steel>
        </div>
      ))}
    </div>
  );
}
