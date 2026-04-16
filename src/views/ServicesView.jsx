import React, { useState } from "react";
import { T, mob } from "../theme";
import { Steel } from "../components/Steel";
import { SVC } from "../data/services";
import { PJ } from "../data/projects";

// Map service names to project categories
const SVC_TO_CAT = {
  "Generative AI": "AI",
  "AI Automation": "Automation",
  "AI Solutions": "AI",
  "Vibe Coding": "Platform",
  "Multilingual": null,
  "Digital Campaign": "Campaign",
};

export function ServicesView({ navTo }) {
  const [sel, sS] = useState(null);

  // Get related projects for a service
  const getRelated = (svcName) => {
    const cat = SVC_TO_CAT[svcName];
    if (!cat) return [];
    return PJ.filter((p) => p.cat === cat).slice(0, 3);
  };

  return (
    <div
      style={{
        padding: mob ? 16 : 32,
        minHeight: "100%",
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
          const cat = SVC_TO_CAT[s.name];
          const projCount = cat ? PJ.filter((p) => p.cat === cat).length : 0;
          const related = on ? getRelated(s.name) : [];

          return (
            <div
              key={i}
              style={{
                animation: "stagger .5s ease forwards",
                opacity: 0,
                animationDelay: `${i * 0.06}s`,
              }}
            >
              <Steel accent={s.color} active={on} onClick={() => sS(on ? null : i)}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 6,
                  }}
                >
                  <span style={{ color: on ? s.color : T.chrome, fontSize: 11 }}>
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
                  {/* Project count badge */}
                  {projCount > 0 && (
                    <span
                      style={{
                        fontFamily: T.mono,
                        fontSize: 7,
                        padding: "1px 5px",
                        borderRadius: 8,
                        background: `${s.color}12`,
                        color: s.color,
                        letterSpacing: 0.5,
                        marginLeft: "auto",
                        opacity: 0.7,
                      }}
                    >
                      {projCount}
                    </span>
                  )}
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

                    {/* Related projects */}
                    {related.length > 0 && (
                      <div style={{ marginTop: 10 }}>
                        <div
                          style={{
                            fontFamily: T.mono,
                            fontSize: 7,
                            color: T.mute,
                            letterSpacing: 2,
                            marginBottom: 6,
                          }}
                        >
                          RELATED PROJECTS
                        </div>
                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                          {related.map((p, j) => (
                            <span
                              key={j}
                              onClick={(e) => {
                                e.stopPropagation();
                                if (navTo) navTo("work");
                                else window.open(p.url, "_blank");
                              }}
                              style={{
                                fontFamily: T.mono,
                                fontSize: 9,
                                padding: "3px 8px",
                                borderRadius: 4,
                                background: `${p.color}10`,
                                border: `1px solid ${p.color}20`,
                                color: p.color,
                                cursor: "pointer",
                                transition: "all .2s",
                                letterSpacing: 0.5,
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.background = `${p.color}20`;
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.background = `${p.color}10`;
                              }}
                            >
                              {p.name} {"\u2197"}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
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
