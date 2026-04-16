import React from "react";
import { T, mob } from "../theme";
import { Steel } from "../components/Steel";
import { SOLUTIONS } from "../data/solutions";

export function SolutionsView() {
  return (
    <div
      style={{
        padding: mob ? 16 : 32,
        height: "100%",
        overflow: "auto",
        maxWidth: 1060,
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
          style={{
            fontSize: mob ? 20 : 28,
            fontWeight: 800,
            background: T.metalText,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
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

      {/* Bento grid — first item (VibeSec) spans 2 columns if featured */}
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
                {/* Top accent line for featured */}
                {big && (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 2,
                      background: `linear-gradient(90deg,transparent,${s.color}60,transparent)`,
                      borderRadius: "8px 8px 0 0",
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
                  {/* Status badge */}
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

                {/* Tags */}
                <div
                  style={{
                    display: "flex",
                    gap: 4,
                    flexWrap: "wrap",
                    alignItems: "center",
                  }}
                >
                  {s.tags.map((t, j) => (
                    <span
                      key={j}
                      style={{
                        fontFamily: T.mono,
                        fontSize: 8,
                        padding: "2px 7px",
                        borderRadius: 4,
                        background: `${s.color}08`,
                        border: `1px solid ${s.color}15`,
                        color: `${s.color}90`,
                        letterSpacing: 0.5,
                      }}
                    >
                      {t}
                    </span>
                  ))}
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
  );
}
