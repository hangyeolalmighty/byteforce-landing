import React, { useState, useRef, useCallback } from "react";
import { T, mob } from "../theme";
import { Steel } from "../components/Steel";
import { PJ } from "../data/projects";
import { CATS, catColors } from "../data/services";

export function WorkView() {
  const [cat, sCat] = useState("All");
  const [key, sKey] = useState(0);
  const [hov, sHov] = useState(null);
  const [titleHov, setTitleHov] = useState(false);
  const [spotX, setSpotX] = useState(50);
  const [spotY, setSpotY] = useState(50);
  const containerRef = useRef(null);
  const filtered = cat === "All" ? PJ : PJ.filter((p) => p.cat === cat);

  const onMouseMove = useCallback((e) => {
    if (mob || !containerRef.current) return;
    const r = containerRef.current.getBoundingClientRect();
    setSpotX(e.clientX - r.left);
    setSpotY(e.clientY - r.top);
  }, []);

  const changeCat = (c) => {
    sCat(c);
    sKey((k) => k + 1);
  };

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
          CASE STUDIES
        </div>

        {/* Header row */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 14,
            marginBottom: 8,
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
            Work
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: T.green,
                boxShadow: `0 0 6px ${T.green}`,
                animation: "statusPulse 2s ease infinite",
              }}
            />
            <span
              style={{
                fontFamily: T.mono,
                fontSize: 8,
                color: T.green,
                letterSpacing: 2,
              }}
            >
              LIVE
            </span>
          </div>
          <span
            style={{
              fontFamily: T.mono,
              fontSize: 9,
              color: T.mute,
              marginLeft: "auto",
            }}
          >
            {filtered.length}/{PJ.length}
          </span>
        </div>

        {/* Category filter tabs — glassmorphism wrapper */}
        <div
          style={{
            background: "rgba(18,20,26,.4)",
            backdropFilter: "blur(12px) saturate(1.3)",
            borderRadius: 12,
            padding: "8px 10px",
            marginBottom: 20,
            borderBottom: `1px solid ${T.border}`,
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 6,
              flexWrap: "wrap",
            }}
          >
            {CATS.map((c) => {
              const on = cat === c;
              const cc = catColors[c];
              return (
                <button
                  key={c}
                  onClick={() => changeCat(c)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: 20,
                    border: `1px solid ${on ? cc + "50" : T.border}`,
                    background: on ? `${cc}15` : "transparent",
                    cursor: "pointer",
                    transition: "all .25s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    boxShadow: on
                      ? `0 0 12px ${cc}20,inset 0 0 12px ${cc}08`
                      : "none",
                    transform: on ? "translateY(-1px)" : "none",
                  }}
                  onMouseEnter={(e) => {
                    if (!on) e.target.style.background = "rgba(255,255,255,.02)";
                  }}
                  onMouseLeave={(e) => {
                    if (!on) e.target.style.background = "transparent";
                  }}
                >
                  <span
                    style={{
                      fontFamily: T.mono,
                      fontSize: 9,
                      letterSpacing: 1.5,
                      fontWeight: on ? 700 : 400,
                      color: on ? cc : T.sub,
                    }}
                  >
                    {c}
                  </span>
                  {on && c !== "All" && (
                    <span
                      style={{
                        fontFamily: T.mono,
                        fontSize: 8,
                        color: cc,
                        marginLeft: 6,
                        opacity: 0.7,
                      }}
                    >
                      {filtered.length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bento grid */}
        <div
          key={key}
          style={{
            display: "grid",
            gridTemplateColumns: mob ? "1fr" : "repeat(3,1fr)",
            gap: 10,
          }}
        >
          {filtered.map((p, i) => {
            const big = !mob && p.feat;
            const isHov = hov === p.name && !mob;
            return (
              <div
                key={p.name}
                style={{
                  gridColumn: big ? "span 2" : "span 1",
                  animation: "stagger .4s ease forwards",
                  opacity: 0,
                  animationDelay: `${i * 0.04}s`,
                }}
                onMouseEnter={() => !mob && sHov(p.name)}
                onMouseLeave={() => sHov(null)}
              >
                <Steel
                  accent={p.color}
                  glow={p.live}
                  onClick={() => window.open(p.url, "_blank")}
                  style={{
                    cursor: "pointer",
                    height: "100%",
                    boxShadow: p.feat
                      ? `0 4px 24px ${p.color}12,0 0 0 1px ${p.color}10`
                      : `0 1px 4px rgba(0,0,0,.1),inset 0 1px 0 rgba(255,255,255,.02)`,
                    transition: "all .3s ease",
                  }}
                >
                  {/* Featured top accent line */}
                  {p.feat && (
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 2,
                        background: `linear-gradient(90deg,transparent,${p.color}60,transparent)`,
                        borderRadius: "8px 8px 0 0",
                      }}
                    />
                  )}

                  {/* Title row */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: big ? 10 : 8,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      {p.feat && (
                        <div
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background: p.color,
                            boxShadow: `0 0 8px ${p.color}80`,
                            flexShrink: 0,
                          }}
                        />
                      )}
                      <span
                        style={{
                          fontSize: big ? 17 : mob ? 13 : 15,
                          fontWeight: 700,
                          color: T.text,
                          letterSpacing: 0.5,
                        }}
                      >
                        {p.name}
                      </span>
                      {p.live && !p.feat && (
                        <div
                          style={{
                            width: 4,
                            height: 4,
                            borderRadius: "50%",
                            background: T.green,
                            boxShadow: `0 0 4px ${T.green}60`,
                          }}
                        />
                      )}
                    </div>
                    <span style={{ fontFamily: T.mono, fontSize: 9, color: p.color, opacity: 0.6 }}>
                      {"\u2197"}
                    </span>
                  </div>

                  {/* Description */}
                  <div
                    style={{
                      fontSize: big ? 13 : 11,
                      color: T.sub,
                      lineHeight: 1.6,
                      marginBottom: 10,
                    }}
                  >
                    {p.desc}
                  </div>

                  {/* Hover-expanded content */}
                  {isHov && (
                    <div
                      style={{
                        marginBottom: 10,
                        paddingTop: 8,
                        borderTop: `1px solid ${p.color}15`,
                        animation: "stagger .2s ease",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: T.mono,
                          fontSize: 9,
                          color: p.color,
                          opacity: 0.8,
                          letterSpacing: 0.5,
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        <span style={{ fontSize: 7, opacity: 0.6 }}>{"\u25cf"}</span>
                        {p.url.replace("https://", "")}
                      </div>
                    </div>
                  )}

                  {/* Tags */}
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap", alignItems: "center" }}>
                    <span
                      style={{
                        fontFamily: T.mono,
                        fontSize: isHov ? 8 : 7,
                        padding: isHov ? "3px 8px" : "2px 6px",
                        borderRadius: 3,
                        background: `${catColors[p.cat]}10`,
                        color: catColors[p.cat],
                        letterSpacing: 1,
                        opacity: 0.7,
                        transition: "all .2s",
                      }}
                    >
                      {p.cat}
                    </span>
                    {p.tags.map((t, j) => (
                      <span
                        key={j}
                        style={{
                          fontFamily: T.mono,
                          fontSize: isHov ? 9 : 8,
                          padding: isHov ? "3px 9px" : "2px 7px",
                          borderRadius: 4,
                          background: `${p.color}08`,
                          border: `1px solid ${p.color}${isHov ? "25" : "15"}`,
                          color: `${p.color}${isHov ? "" : "90"}`,
                          letterSpacing: 0.5,
                          transition: "all .2s",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                    {p.hasAdmin && (
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(p.adminUrl, "_blank");
                        }}
                        style={{
                          fontFamily: T.mono,
                          fontSize: 8,
                          padding: "2px 7px",
                          borderRadius: 4,
                          background: `${T.pink}12`,
                          border: `1px solid ${T.pink}25`,
                          color: T.pink,
                          cursor: "pointer",
                        }}
                      >
                        ADMIN
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
