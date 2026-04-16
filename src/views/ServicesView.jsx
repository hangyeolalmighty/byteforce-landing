import React, { useState } from "react";
import { T, mob } from "../theme";
import { Steel } from "../components/Steel";
import { SVC } from "../data/services";

export function ServicesView() {
  const [sel, sS] = useState(null);

  return (
    <div
      style={{
        padding: mob ? 16 : 32,
        height: "100%",
        overflow: "auto",
        maxWidth: 960,
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
        CAPABILITIES
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
        Services
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: mob ? "1fr" : "1fr 1fr",
          gap: 8,
        }}
      >
        {SVC.map((s, i) => {
          const on = sel === i;
          return (
            <div
              key={i}
              style={{
                animation: "stagger .5s ease forwards",
                opacity: 0,
                animationDelay: `${i * 0.06}s`,
              }}
            >
              <Steel
                accent={s.color}
                active={on}
                onClick={() => sS(on ? null : i)}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 6,
                  }}
                >
                  <span
                    style={{
                      color: on ? s.color : T.chrome,
                      fontSize: 11,
                    }}
                  >
                    {s.icon}
                  </span>
                  <span
                    style={{
                      fontFamily: T.mono,
                      fontSize: mob ? 11 : 13,
                      fontWeight: 600,
                      color: on ? s.color : T.text,
                      letterSpacing: 1,
                    }}
                  >
                    {s.name}
                  </span>
                </div>
                <div style={{ fontSize: 11, color: T.sub }}>{s.kr}</div>
                {on && (
                  <div
                    style={{
                      fontSize: 11,
                      color: T.sub,
                      marginTop: 8,
                      paddingTop: 8,
                      borderTop: `1px solid ${s.color}15`,
                      lineHeight: 1.7,
                      animation: "stagger .3s ease",
                    }}
                  >
                    {s.desc}
                  </div>
                )}
              </Steel>
            </div>
          );
        })}
      </div>
    </div>
  );
}
