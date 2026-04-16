import React, { useState } from "react";
import { T, mob } from "../theme";
import { ChromeMesh } from "../components/ChromeMesh";
import { MetalBtn } from "../components/MetalBtn";
import { Steel } from "../components/Steel";
import { Type } from "../components/Type";
import { ServiceCycler } from "../components/ServiceCycler";

export function HomeView() {
  const [typed, sT] = useState(false);

  return (
    <div
      style={{
        padding: mob ? 20 : 44,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
        maxWidth: 760,
        margin: "0 auto",
      }}
    >
      {/* Ambient glow orbs */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "10%",
          width: mob ? 200 : 400,
          height: mob ? 200 : 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(74,158,255,.06),transparent 70%)",
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
          background:
            "radial-gradient(circle,rgba(124,92,252,.05),transparent 70%)",
          filter: "blur(50px)",
          pointerEvents: "none",
          animation: "ambientFloat 10s ease infinite reverse",
        }}
      />

      <ChromeMesh />

      <div style={{ position: "relative", zIndex: 2 }}>
        {/* Tagline */}
        <div
          style={{
            fontFamily: T.mono,
            fontSize: 8,
            color: T.mute,
            letterSpacing: 7,
            marginBottom: 28,
            animation: "stagger .5s ease forwards",
            opacity: 0,
            animationDelay: ".1s",
          }}
        >
          AI CONSULTING & TECHNOLOGY
        </div>

        {/* Name with glow */}
        <div
          style={{
            fontSize: mob
              ? "clamp(36px,9vw,52px)"
              : "clamp(44px,5vw,68px)",
            fontWeight: 900,
            letterSpacing: 3,
            lineHeight: 1,
            background: T.metalText,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter:
              "drop-shadow(0 2px 4px rgba(0,0,0,.2)) drop-shadow(0 0 20px rgba(196,202,214,.18)) drop-shadow(0 0 40px rgba(74,158,255,.08))",
            animation:
              "stagger .6s ease forwards, nameGlow 3s ease infinite 1s",
            opacity: 0,
            animationDelay: ".2s",
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
            marginBottom: 40,
            animation: "stagger .6s ease forwards",
            opacity: 0,
            animationDelay: ".3s",
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
            animationDelay: ".4s",
          }}
        >
          {!typed ? (
            <Type
              text="기술과 전략 사이에서, AI가 실제로 작동하는 지점을 설계합니다."
              speed={25}
              onDone={() => sT(true)}
            />
          ) : (
            <span>
              기술과 전략 사이에서, AI가 실제로 작동하는 지점을 설계합니다.
            </span>
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

        {/* Stats cards */}
        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            marginTop: typed ? 28 : 44,
          }}
        >
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
                animation: "stagger .5s ease forwards",
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
            {
              label: "CONTACT",
              href: "mailto:ceo@byteforce.ai.kr",
              color: null,
            },
            {
              label: "CALL",
              href: "tel:010-9741-9217",
              color: T.accent,
            },
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
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0)",
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
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0)",
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
      </div>
    </div>
  );
}
