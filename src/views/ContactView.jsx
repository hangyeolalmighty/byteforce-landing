import React, { useState } from "react";
import { T, mob } from "../theme";
import { Steel } from "../components/Steel";
import { Toast } from "../components/Toast";

export function ContactView() {
  const [toast, sT] = useState("");
  const [show, sS] = useState(false);

  const cp = async (t, l) => {
    try {
      await navigator.clipboard.writeText(t);
      sT(`${l} 복사됨`);
      sS(true);
      setTimeout(() => sS(false), 2000);
    } catch (e) {}
  };

  return (
    <div
      style={{
        padding: mob ? 16 : 32,
        minHeight: "100%",
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
        CONNECT
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
        Contact
      </div>
      {[
        {
          l: "EMAIL",
          v: "ceo@byteforce.ai.kr",
          h: "mailto:ceo@byteforce.ai.kr",
          c: T.accent,
          copy: true,
        },
        {
          l: "TEL",
          v: "010-9741-9217",
          h: "tel:010-9741-9217",
          c: T.green,
          copy: true,
        },
        {
          l: "WEB",
          v: "byteforce.ai.kr",
          h: "https://byteforce.ai.kr",
          c: T.purple,
        },
      ].map((c, i) => (
        <div
          key={i}
          style={{
            marginBottom: 8,
            animation: "stagger .5s ease forwards",
            opacity: 0,
            animationDelay: `${i * 0.08}s`,
          }}
        >
          <Steel
            accent={c.c}
            onClick={c.copy ? () => cp(c.v, c.l) : undefined}
          >
            <div
              style={{ display: "flex", alignItems: "center", gap: 14 }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: T.metalGradSubtle,
                  border: `1px solid ${c.c}25`,
                  boxShadow: `0 0 8px ${c.c}15`,
                  flexShrink: 0,
                }}
              />
              <div>
                <div
                  style={{
                    fontFamily: T.mono,
                    fontSize: 8,
                    color: T.mute,
                    letterSpacing: 3,
                    marginBottom: 3,
                  }}
                >
                  {c.l}
                </div>
                <div style={{ fontSize: 14, color: T.sub }}>{c.v}</div>
              </div>
              {c.copy && (
                <span
                  style={{
                    marginLeft: "auto",
                    fontFamily: T.mono,
                    fontSize: 8,
                    color: T.mute,
                  }}
                >
                  COPY
                </span>
              )}
            </div>
          </Steel>
        </div>
      ))}
      <Steel
        style={{
          marginTop: 4,
          animation: "stagger .5s ease forwards",
          opacity: 0,
          animationDelay: ".3s",
        }}
      >
        <div
          style={{
            fontFamily: T.mono,
            fontSize: 8,
            color: T.mute,
            letterSpacing: 3,
            marginBottom: 8,
          }}
        >
          LOCATION
        </div>
        <div style={{ fontSize: 13, color: T.sub, lineHeight: 2 }}>
          부산광역시 해운대구
          <br />
          해운대해변로 203
          <br />
          오션타워 608호
        </div>
      </Steel>
      <Toast msg={toast} show={show} />
    </div>
  );
}
