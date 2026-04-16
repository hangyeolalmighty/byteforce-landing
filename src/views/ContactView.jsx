import React, { useState, useRef, useCallback } from "react";
import { T, mob } from "../theme";
import { Steel } from "../components/Steel";
import { Toast } from "../components/Toast";

export function ContactView() {
  const [toast, sT] = useState("");
  const [show, sS] = useState(false);
  const [titleHov, setTitleHov] = useState(false);
  const [spotX, setSpotX] = useState(50);
  const [spotY, setSpotY] = useState(50);
  const containerRef = useRef(null);

  const onMouseMove = useCallback((e) => {
    if (mob || !containerRef.current) return;
    const r = containerRef.current.getBoundingClientRect();
    setSpotX(e.clientX - r.left);
    setSpotY(e.clientY - r.top);
  }, []);

  const cp = async (t, l) => {
    try {
      await navigator.clipboard.writeText(t);
      sT(`${l} 복사됨`);
      sS(true);
      setTimeout(() => sS(false), 2000);
    } catch (e) {}
  };

  const items = [
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
  ];

  return (
    <div
      ref={containerRef}
      onMouseMove={onMouseMove}
      style={{
        padding: mob ? 16 : 32,
        minHeight: "100%",
        maxWidth: 720,
        margin: "0 auto",
        position: "relative",
      }}
    >
      {/* Spotlight cursor */}
      {!mob && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(600px at ${spotX}px ${spotY}px, rgba(74,158,255,.04), transparent 70%)`,
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
      )}
      {/* Noise grain */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E")`,
          pointerEvents: "none",
          zIndex: 1,
          opacity: 0.6,
        }}
      />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2 }}>
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
        <div style={{ marginBottom: 28 }}>
          <span
            onMouseEnter={() => !mob && setTitleHov(true)}
            onMouseLeave={() => setTitleHov(false)}
            style={{
              fontSize: mob ? 20 : 28,
              fontWeight: 800,
              background: titleHov
                ? "linear-gradient(90deg,#555B68,#8A919E,#E8ECF2,#fff,#E8ECF2,#8A919E,#555B68)"
                : T.metalText,
              backgroundSize: titleHov ? "200% 100%" : "100% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: titleHov ? "textShimmer 2s ease-in-out infinite" : "none",
              cursor: "default",
              transition: "all .3s",
            }}
          >
            Contact
          </span>
        </div>

        {items.map((c, i) => (
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
                    animation: "statusPulse 2s ease infinite",
                    animationDelay: `${i * 0.3}s`,
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
                  <div
                    style={{
                      fontSize: 14,
                      color: T.sub,
                      borderBottom: "2px solid transparent",
                      transition: "border-color .3s",
                      paddingBottom: 1,
                    }}
                  >
                    {c.v}
                  </div>
                </div>
                {c.copy && (
                  <span
                    style={{
                      marginLeft: "auto",
                      fontFamily: T.mono,
                      fontSize: 8,
                      color: T.mute,
                      transition: "color .3s, text-shadow .3s",
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
            backdropFilter: "blur(12px) saturate(1.4)",
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
            {"\ud83d\udccd"} LOCATION
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
    </div>
  );
}
