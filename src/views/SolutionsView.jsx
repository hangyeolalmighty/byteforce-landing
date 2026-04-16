import React, { useState, useRef, useCallback } from "react";
import { T, mob } from "../theme";
import { Steel } from "../components/Steel";
import { SOLUTIONS } from "../data/solutions";

export function SolutionsView() {
  const [titleHov, setTitleHov] = useState(false);
  const [hovTag, setHovTag] = useState(null);
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
        maxWidth: 1060,
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
          OUR PRODUCTS
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 14,
            marginBottom: 24,
          }}
        >
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
            Solutions
          </span>
          <span
            style={{
              fontFamily: T.mono,
              fontSize: 9,
              color: T.mute,
            }}
          >
            {SOLUTIONS.filter((s) => s.status === "LIVE").length} LIVE
          </span>
        </div>

        {/* Bento grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: mob ? "1fr" : "repeat(3,1fr)",
            gap: 10,
          }}
        >
          {SOLUTIONS.map((s, i) => {
            const big = !mob && s.feat;
            const coming = s.status === "COMING SOON";

            return (
              <div
                key={s.name}
                style={{
                  gridColumn: big ? "span 2" : "span 1",
                  opacity: coming ? 0.6 : 1,
                  animation: "stagger .5s ease forwards",
                  animationDelay: `${i * 0.08}s`,
                }}
              >
                <Steel
                  accent={s.color}
                  glow={!coming}
                  onClick={
                    coming ? undefined : () => window.open(s.url, "_blank")
                  }
                  style={{
                    cursor: coming ? "default" : "pointer",
                    height: "100%",
                    boxShadow: big
                      ? `0 4px 24px ${s.color}12,0 0 0 1px ${s.color}10`
                      : undefined,
                  }}
                >
                  {/* Top accent line for featured — with shimmer sweep */}
                  {big && (
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 2,
                        background: `linear-gradient(90deg,transparent,${s.color}60,transparent)`,
                        backgroundSize: "200% 100%",
                        borderRadius: "8px 8px 0 0",
                        animation: "metalSheen 3s ease infinite",
                      }}
                    />
                  )}

                  {/* Header: icon + name + status */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      marginBottom: 6,
                    }}
                  >
                    <span
                      style={{
                        fontSize: big ? 16 : 13,
                        color: s.color,
                        filter: `drop-shadow(0 0 6px ${s.color}40)`,
                      }}
                    >
                      {s.icon}
                    </span>
                    <span
                      style={{
                        fontSize: big ? 18 : mob ? 14 : 16,
                        fontWeight: 700,
                        color: T.text,
                        letterSpacing: 0.5,
                      }}
                    >
                      {s.name}
                    </span>
                    {/* Status badge — glassmorphism */}
                    <span
                      style={{
                        marginLeft: "auto",
                        fontFamily: T.mono,
                        fontSize: 7,
                        padding: "2px 8px",
                        borderRadius: 10,
                        background: coming
                          ? `${T.mute}`
                          : `${s.color}15`,
                        color: coming ? T.sub : s.color,
                        letterSpacing: 1.5,
                        fontWeight: 600,
                        backdropFilter: "blur(8px) saturate(1.4)",
                        border: `1px solid ${coming ? T.border : s.color + "25"}`,
                      }}
                    >
                      {s.status}
                    </span>
                  </div>

                  {/* Tagline */}
                  <div
                    style={{
                      fontFamily: T.mono,
                      fontSize: 10,
                      color: s.color,
                      letterSpacing: 1,
                      opacity: 0.7,
                      marginBottom: 8,
                    }}
                  >
                    {s.tagline}
                  </div>

                  {/* Description */}
                  <div
                    style={{
                      fontSize: big ? 13 : 11,
                      color: T.sub,
                      lineHeight: 1.7,
                      marginBottom: 12,
                    }}
                  >
                    {s.desc}
                  </div>

                  {/* Tags — hover glow with spring easing */}
                  <div
                    style={{
                      display: "flex",
                      gap: 4,
                      flexWrap: "wrap",
                      alignItems: "center",
                    }}
                  >
                    {s.tags.map((t, j) => {
                      const tagKey = `${i}-${j}`;
                      const isHov = hovTag === tagKey;
                      return (
                        <span
                          key={j}
                          onMouseEnter={() => !mob && setHovTag(tagKey)}
                          onMouseLeave={() => setHovTag(null)}
                          style={{
                            fontFamily: T.mono,
                            fontSize: 8,
                            padding: isHov ? "3px 9px" : "2px 7px",
                            borderRadius: 4,
                            background: `${s.color}08`,
                            border: `1px solid ${s.color}${isHov ? "30" : "15"}`,
                            color: `${s.color}90`,
                            letterSpacing: 0.5,
                            transition: "all .25s cubic-bezier(0.34, 1.56, 0.64, 1)",
                            boxShadow: isHov ? `0 0 8px ${s.color}20` : "none",
                            cursor: "default",
                          }}
                        >
                          {t}
                        </span>
                      );
                    })}
                    {!coming && (
                      <span
                        style={{
                          fontFamily: T.mono,
                          fontSize: 9,
                          color: s.color,
                          opacity: 0.6,
                          marginLeft: "auto",
                        }}
                      >
                        {"\u2197"}
                      </span>
                    )}
                  </div>
                </Steel>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
