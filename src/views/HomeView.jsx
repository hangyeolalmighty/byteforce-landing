import React, { useState, useCallback, useRef } from "react";
import { T, mob } from "../theme";
import { ChromeMesh } from "../components/ChromeMesh";
import { MetalBtn } from "../components/MetalBtn";
import { Steel } from "../components/Steel";
import { Type } from "../components/Type";
import { ServiceCycler } from "../components/ServiceCycler";
import { SOLUTIONS } from "../data/solutions";

export function HomeView({ navTo }) {
  const [typed, sT] = useState(false);
  const [nameHov, sNH] = useState(false);
  const [spotX, sSX] = useState(50);
  const [spotY, sSY] = useState(50);
  const containerRef = useRef(null);

  // Spotlight cursor — radial gradient follows mouse
  const onMouseMove = useCallback((e) => {
    if (mob || !containerRef.current) return;
    const r = containerRef.current.getBoundingClientRect();
    sSX(e.clientX - r.left);
    sSY(e.clientY - r.top);
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={onMouseMove}
      style={{
        padding: mob ? 20 : 44,
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
        maxWidth: 760,
        margin: "0 auto",
      }}
    >
      {/* Spotlight cursor effect — Vercel/Linear style */}
      {!mob && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(600px at ${spotX}px ${spotY}px, rgba(74,158,255,.04), transparent 70%)`,
            pointerEvents: "none",
            zIndex: 1,
            transition: "background .05s linear",
          }}
        />
      )}
      {/* Noise grain texture — analog depth */}
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
      {/* Ambient glow orbs */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "10%",
          width: mob ? 200 : 400,
          height: mob ? 200 : 400,
          borderRadius: "50%",
          background: "radial-gradient(circle,rgba(74,158,255,.06),transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          animation: "ambientFloat 8s ease infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          right: "5%",
          width: mob ? 150 : 300,
          height: mob ? 150 : 300,
          borderRadius: "50%",
          background: "radial-gradient(circle,rgba(124,92,252,.05),transparent 70%)",
          filter: "blur(50px)",
          pointerEvents: "none",
          animation: "ambientFloat 10s ease infinite reverse",
        }}
      />

      <ChromeMesh />

      <div style={{ position: "relative", zIndex: 2 }}>
        {/* BF Logo Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 20,
            animation: "stagger .5s ease forwards",
            opacity: 0,
            animationDelay: ".05s",
          }}
        >
          <div
            style={{
              position: "relative",
              width: 40,
              height: 40,
              borderRadius: 10,
              background: T.metalGradSubtle,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: `1px solid ${T.border}`,
              boxShadow: "0 2px 8px rgba(0,0,0,.2),inset 0 1px 0 rgba(255,255,255,.08)",
            }}
          >
            <span
              style={{
                fontFamily: T.mono,
                fontSize: 13,
                fontWeight: 900,
                background: T.metalText,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: 1,
              }}
            >
              BF
            </span>
            {/* Mini laser border on badge */}
            <div
              style={{
                position: "absolute",
                inset: -1,
                borderRadius: 11,
                padding: 1,
                background:
                  "conic-gradient(from var(--laser-angle,0deg),#4A9EFF,#7C5CFC,#DB2777,#C9A84C,#34D399,#22D3EE,#4A9EFF)",
                WebkitMask: "linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                animation: "laserSpin 3s linear infinite, nameGlow 3s ease infinite",
                opacity: 0.4,
              }}
            />
          </div>
          <div
            style={{
              fontFamily: T.mono,
              fontSize: 8,
              color: T.mute,
              letterSpacing: 7,
            }}
          >
            AI CONSULTING & TECHNOLOGY
          </div>
        </div>

        {/* Name with shimmer + chromatic aberration hover */}
        <div
          onMouseEnter={() => !mob && sNH(true)}
          onMouseLeave={() => sNH(false)}
          style={{
            fontSize: mob ? "clamp(36px,9vw,52px)" : "clamp(44px,5vw,68px)",
            fontWeight: 900,
            letterSpacing: 3,
            lineHeight: 1,
            background: nameHov
              ? "linear-gradient(90deg,#555B68,#8A919E,#E8ECF2,#fff,#E8ECF2,#8A919E,#555B68)"
              : T.metalText,
            backgroundSize: nameHov ? "200% 100%" : "100% 100%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter:
              "drop-shadow(0 2px 4px rgba(0,0,0,.2)) drop-shadow(0 0 20px rgba(196,202,214,.18)) drop-shadow(0 0 40px rgba(74,158,255,.08))",
            animation: nameHov
              ? "textShimmer 2s ease-in-out infinite, nameGlow 3s ease infinite"
              : "stagger .6s ease forwards, nameGlow 3s ease infinite 1s",
            opacity: nameHov ? 1 : 0,
            animationDelay: nameHov ? "0s" : ".15s",
            position: "relative",
            cursor: "default",
            transition: "text-shadow .3s ease",
            textShadow: nameHov
              ? "-2px 0 rgba(74,158,255,.3), 2px 0 rgba(219,39,119,.3), 0 0 20px rgba(196,202,214,.15)"
              : "none",
          }}
        >
          이한결
        </div>

        {/* Title */}
        <div
          style={{
            fontFamily: T.mono,
            fontSize: mob ? 11 : 14,
            color: T.chrome,
            letterSpacing: 4,
            marginTop: 8,
            marginBottom: 36,
            animation: "stagger .6s ease forwards",
            opacity: 0,
            animationDelay: ".25s",
          }}
        >
          AI Specialist · CEO, BYTEFORCE
        </div>

        {/* Typing hero text */}
        <div
          style={{
            fontSize: mob ? 13 : 16,
            color: T.sub,
            lineHeight: 2.2,
            maxWidth: 480,
            animation: "stagger .6s ease forwards",
            opacity: 0,
            animationDelay: ".35s",
          }}
        >
          {!typed ? (
            <Type
              text="기술과 전략 사이에서, AI가 실제로 작동하는 지점을 설계합니다."
              speed={25}
              onDone={() => sT(true)}
            />
          ) : (
            <span>기술과 전략 사이에서, AI가 실제로 작동하는 지점을 설계합니다.</span>
          )}
        </div>

        {/* Service cycler */}
        {typed && (
          <div
            style={{
              marginTop: 16,
              fontSize: mob ? 14 : 17,
              animation: "stagger .5s ease forwards",
              opacity: 0,
              animationDelay: ".1s",
            }}
          >
            <ServiceCycler />
          </div>
        )}

        {/* Stats cards — slide from left */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: typed ? 28 : 44 }}>
          {[
            { v: "32+", l: "YEARS" },
            { v: "서울연구원", l: "AI ADVISORY" },
            { v: "선거 캠페인", l: "CAMPAIGN" },
            { v: "Nexon", l: "GAMING" },
          ].map((c, i) => (
            <Steel
              key={i}
              style={{
                padding: "12px 16px",
                minWidth: mob ? 68 : 90,
                animation: "slideInLeft .5s ease forwards",
                opacity: 0,
                animationDelay: `${0.5 + i * 0.08}s`,
              }}
            >
              <div
                style={{
                  fontSize: mob ? 15 : 20,
                  fontWeight: 800,
                  background: T.metalText,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {c.v}
              </div>
              <div
                style={{
                  fontFamily: T.mono,
                  fontSize: 7,
                  color: T.mute,
                  letterSpacing: 2,
                  marginTop: 3,
                }}
              >
                {c.l}
              </div>
            </Steel>
          ))}
        </div>

        {/* CTA buttons with laser border */}
        <div
          style={{
            display: "flex",
            gap: 10,
            marginTop: 32,
            animation: "stagger .6s ease forwards",
            opacity: 0,
            animationDelay: ".9s",
          }}
        >
          {[
            { label: "CONTACT", href: "mailto:ceo@byteforce.ai.kr", color: null },
            { label: "CALL", href: "tel:010-9741-9217", color: T.accent },
          ].map((btn, i) => (
            <div
              key={i}
              className="laser-btn"
              style={{ position: "relative", borderRadius: 8, padding: 2 }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: 8,
                  padding: 2,
                  background:
                    "conic-gradient(from var(--laser-angle,0deg),#4A9EFF,#7C5CFC,#DB2777,#C9A84C,#34D399,#22D3EE,#4A9EFF)",
                  WebkitMask: "linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                  animation: "laserSpin 3s linear infinite",
                  opacity: 0.6,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: -2,
                  borderRadius: 10,
                  padding: 4,
                  background:
                    "conic-gradient(from var(--laser-angle,0deg),#4A9EFF40,#7C5CFC40,#DB277740,#C9A84C40,#34D39940,#22D3EE40,#4A9EFF40)",
                  WebkitMask: "linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                  animation: "laserSpin 3s linear infinite",
                  filter: "blur(4px)",
                  opacity: 0.4,
                }}
              />
              <MetalBtn
                size="lg"
                color={btn.color}
                onClick={() => (window.location.href = btn.href)}
                style={{ position: "relative", zIndex: 2 }}
              >
                {btn.label}
              </MetalBtn>
            </div>
          ))}
        </div>

        {/* Solutions mini-banner */}
        {typed && SOLUTIONS.length > 0 && (
          <div
            style={{
              marginTop: 28,
              animation: "stagger .5s ease forwards",
              opacity: 0,
              animationDelay: "1.1s",
            }}
          >
            <div
              style={{
                fontFamily: T.mono,
                fontSize: 7,
                color: T.mute,
                letterSpacing: 3,
                marginBottom: 8,
              }}
            >
              OUR SOLUTIONS
            </div>
            <div style={{ display: "flex", gap: 8, overflowX: "auto" }}>
              {SOLUTIONS.map((s, i) => {
                const coming = s.status === "COMING SOON";
                return (
                  <div
                    key={i}
                    onClick={() => {
                      if (navTo) navTo("solutions");
                      else if (!coming) window.open(s.url, "_blank");
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "8px 14px",
                      borderRadius: 8,
                      background: T.surface,
                      border: `1px solid ${T.border}`,
                      cursor: "pointer",
                      minWidth: mob ? 160 : "auto",
                      flexShrink: 0,
                      transition: "all .2s",
                      opacity: coming ? 0.5 : 1,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = s.color + "30";
                      e.currentTarget.style.boxShadow = `0 2px 12px ${s.color}10`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = T.border;
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    {!coming && (
                      <div
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: "50%",
                          background: T.green,
                          boxShadow: `0 0 4px ${T.green}`,
                          flexShrink: 0,
                        }}
                      />
                    )}
                    <span
                      style={{
                        fontFamily: T.mono,
                        fontSize: 10,
                        fontWeight: 600,
                        color: T.text,
                        letterSpacing: 0.5,
                      }}
                    >
                      {s.name}
                    </span>
                    <span
                      style={{
                        fontSize: 9,
                        color: T.sub,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {s.tagline}
                    </span>
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
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
