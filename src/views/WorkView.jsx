import React, { useState } from "react";
import { T, mob } from "../theme";
import { Steel } from "../components/Steel";
import { PJ } from "../data/projects";
import { CATS, catColors } from "../data/services";

export function WorkView() {
  const [cat, sCat] = useState("All");
  const [key, sKey] = useState(0);
  const filtered = cat === "All" ? PJ : PJ.filter((p) => p.cat === cat);

  const changeCat = (c) => {
    sCat(c);
    sKey((k) => k + 1);
  };

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
          style={{
            fontSize: mob ? 20 : 28,
            fontWeight: 800,
            background: T.metalText,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
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

      {/* Category filter tabs */}
      <div
        style={{
          display: "flex",
          gap: 6,
          marginBottom: 20,
          flexWrap: "wrap",
          paddingBottom: 12,
          borderBottom: `1px solid ${T.border}`,
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
                transition: "all .25s",
                boxShadow: on
                  ? `0 0 12px ${cc}20,inset 0 0 12px ${cc}08`
                  : "none",
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
          return (
            <div
              key={p.name}
              style={{
                gridColumn: big ? "span 2" : "span 1",
                animation: "stagger .4s ease forwards",
                opacity: 0,
                animationDelay: `${i * 0.04}s`,
              }}
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
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
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
                  <span
                    style={{
                      fontFamily: T.mono,
                      fontSize: 9,
                      color: p.color,
                      opacity: 0.6,
                    }}
                  >
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

                {/* Tags */}
                <div
                  style={{
                    display: "flex",
                    gap: 4,
                    flexWrap: "wrap",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: T.mono,
                      fontSize: 7,
                      padding: "2px 6px",
                      borderRadius: 3,
                      background: `${catColors[p.cat]}10`,
                      color: catColors[p.cat],
                      letterSpacing: 1,
                      opacity: 0.7,
                    }}
                  >
                    {p.cat}
                  </span>
                  {p.tags.map((t, j) => (
                    <span
                      key={j}
                      style={{
                        fontFamily: T.mono,
                        fontSize: 8,
                        padding: "2px 7px",
                        borderRadius: 4,
                        background: `${p.color}08`,
                        border: `1px solid ${p.color}15`,
                        color: `${p.color}90`,
                        letterSpacing: 0.5,
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
  );
}
