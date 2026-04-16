import React, { useState, useRef, useCallback } from "react";
import { T, mob } from "../theme";
import { Steel } from "../components/Steel";

const STEPS = [
  { n: "01", t: "Discovery", k: "비즈니스를 파악합니다", c: T.accent },
  { n: "02", t: "Design", k: "최적의 구조를 설계합니다", c: T.purple },
  { n: "03", t: "Build", k: "실제로 작동하게 만듭니다", c: T.gold },
  { n: "04", t: "Evolve", k: "함께 발전시킵니다", c: T.green },
];

export function ProcessView() {
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
          WORKFLOW
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
            Process
          </span>
        </div>

        {STEPS.map((s, i) => {
          const nextColor = i < STEPS.length - 1 ? STEPS[i + 1].c : null;
          return (
            <React.Fragment key={i}>
              <div
                style={{
                  animation: "stagger .5s ease forwards",
                  opacity: 0,
                  animationDelay: `${i * 0.1}s`,
                }}
              >
                <Steel accent={s.c} style={{ marginBottom: 0 }}>
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
                        boxShadow: `0 0 12px ${s.c}15, 0 2px 8px rgba(0,0,0,.15), inset 0 1px 0 rgba(255,255,255,.08)`,
                        animation: "gentlePulse 3s ease infinite",
                        "--pulse-color": s.c + "20",
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
              {/* Vertical timeline connector */}
              {nextColor && (
                <div
                  style={{
                    width: 2,
                    height: 20,
                    marginLeft: 21,
                    background: `linear-gradient(180deg, ${s.c}40, ${nextColor}40)`,
                    boxShadow: `0 0 8px ${s.c}15`,
                  }}
                />
              )}
              {!nextColor && <div style={{ height: 8 }} />}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
