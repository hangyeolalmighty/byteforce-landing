import React, { useState } from "react";
import { T, mob } from "./theme";
import { styles } from "./styles";
import { useClock } from "./hooks/useClock";
import { PJ } from "./data/projects";
import { BootScreen } from "./components/BootScreen";
import { StatusDot } from "./components/StatusDot";
import { Nav } from "./components/Nav";
import { MetalBtn } from "./components/MetalBtn";
import { MobNav } from "./components/MobNav";
import { LaserBorder } from "./components/LaserBorder";
import { AIChat } from "./chat/AIChat";
import { HomeView } from "./views/HomeView";
import { ServicesView } from "./views/ServicesView";
import { WorkView } from "./views/WorkView";
import { ProcessView } from "./views/ProcessView";
import { ContactView } from "./views/ContactView";

const FONT_LINK =
  "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Noto+Sans+KR:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap";

export default function App() {
  const [booted, sB] = useState(false);
  const [sec, sS] = useState("home");
  const [ai, sA] = useState(false);
  const [adm, sAd] = useState(false);
  const ck = useClock();
  const ts = ck.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const [aiP, sAP] = useState(false);

  const navTo = (id) => {
    if (id === "ai" && mob) {
      sAP(true);
      setTimeout(() => sAP(false), 500);
    }
    if (id === "ai") {
      sA(true);
    } else {
      sS(id);
      sA(false);
    }
  };

  const views = {
    home: <HomeView />,
    services: <ServicesView />,
    work: <WorkView />,
    process: <ProcessView />,
    contact: <ContactView />,
    ai: <AIChat admin={adm} currentSection={sec} />,
  };

  // === Boot Screen ===
  if (!booted)
    return (
      <>
        <link href={FONT_LINK} rel="stylesheet" />
        <style>{styles}</style>
        <BootScreen onDone={() => sB(true)} />
      </>
    );

  // === Mobile Layout ===
  if (mob)
    return (
      <LaserBorder>
        <div
          style={{
            background: T.bg,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            fontFamily: T.font,
            color: T.text,
            overflow: "hidden",
          }}
        >
          <link href={FONT_LINK} rel="stylesheet" />
          <style>{styles}</style>
          {/* Mobile header */}
          <div
            style={{
              padding: "10px 16px",
              background: "rgba(18,20,26,.92)",
              backdropFilter: "blur(24px)",
              borderBottom: `1px solid ${T.border}`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                fontFamily: T.mono,
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: 4,
                background: T.metalGrad,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              BYTEFORCE
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <StatusDot />
              <span
                style={{ fontFamily: T.mono, fontSize: 8, color: T.mute }}
              >
                {ts}
              </span>
            </div>
          </div>
          {/* Mobile content */}
          <div style={{ flex: 1, overflow: "hidden" }}>
            <div
              key={ai ? "ai" : sec}
              style={{
                height: "100%",
                overflow: "auto",
                animation: aiP
                  ? "aiPulseIn .5s ease"
                  : "panelIn .2s ease",
                paddingBottom: 64,
              }}
            >
              {ai ? views.ai : views[sec]}
            </div>
          </div>
          <MobNav active={ai ? "ai" : sec} onNav={navTo} />
        </div>
      </LaserBorder>
    );

  // === Desktop Layout ===
  return (
    <LaserBorder>
      <div
        style={{
          background: T.bg,
          height: "100%",
          display: "flex",
          justifyContent: "center",
          fontFamily: T.font,
          color: T.text,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            maxWidth: 1600,
            width: "100%",
            display: "flex",
            height: "100%",
          }}
        >
          <link href={FONT_LINK} rel="stylesheet" />
          <style>{styles}</style>

          {/* === Sidebar === */}
          <div
            style={{
              width: 195,
              borderRight: `1px solid ${T.border}`,
              display: "flex",
              flexDirection: "column",
              flexShrink: 0,
              background: "rgba(18,20,26,.45)",
              backdropFilter: "blur(40px)",
              WebkitBackdropFilter: "blur(40px)",
            }}
          >
            {/* Logo */}
            <div
              style={{
                padding: "22px 18px 18px",
                borderBottom: `1px solid ${T.border}`,
              }}
            >
              <div
                className="logo-laser"
                style={{
                  position: "relative",
                  display: "inline-block",
                  padding: 1,
                }}
              >
                <div
                  style={{
                    fontFamily: T.mono,
                    fontSize: 14,
                    fontWeight: 900,
                    letterSpacing: 5,
                    background: T.metalGrad,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    position: "relative",
                    zIndex: 2,
                  }}
                >
                  BYTEFORCE
                </div>
                <div
                  style={{
                    position: "absolute",
                    inset: -2,
                    borderRadius: 4,
                    padding: 2,
                    background:
                      "conic-gradient(from var(--laser-angle,0deg),#4A9EFF,#7C5CFC,#DB2777,#C9A84C,#34D399,#22D3EE,#4A9EFF)",
                    WebkitMask:
                      "linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                    animation: "laserSpin 3s linear infinite",
                    opacity: 0.5,
                  }}
                />
              </div>
              <div
                onClick={() => sAd((p) => !p)}
                style={{
                  fontFamily: T.mono,
                  fontSize: 8,
                  color: T.mute,
                  letterSpacing: 2,
                  marginTop: 5,
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.target.style.color = T.sub)}
                onMouseLeave={(e) => (e.target.style.color = T.mute)}
              >
                v6.1{adm ? " \u00b7 ADMIN" : ""}
              </div>
            </div>

            {/* Nav items */}
            <div
              style={{
                flex: 1,
                padding: "14px 0",
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              {[
                { id: "home", icon: "\u2b21", label: "HOME", color: T.accent },
                {
                  id: "services",
                  icon: "\u25c7",
                  label: "SERVICES",
                  color: T.purple,
                },
                {
                  id: "work",
                  icon: "\u25a6",
                  label: "WORK",
                  color: T.gold,
                  badge: `${PJ.length}`,
                },
                {
                  id: "process",
                  icon: "\u25a3",
                  label: "PROCESS",
                  color: T.green,
                },
                {
                  id: "contact",
                  icon: "\u25ce",
                  label: "CONTACT",
                  color: T.cyan,
                },
              ].map((n) => (
                <Nav
                  key={n.id}
                  {...n}
                  active={sec === n.id && !ai}
                  onClick={() => {
                    sS(n.id);
                    sA(false);
                  }}
                />
              ))}
              <div
                style={{
                  height: 1,
                  background: T.border,
                  margin: "10px 18px",
                }}
              />
              <Nav
                icon={"\u25cf"}
                label="AI AGENT"
                active={ai}
                color={T.pink}
                onClick={() => sA((p) => !p)}
              />
            </div>

            {/* Status footer */}
            <div
              style={{
                padding: "14px 18px",
                borderTop: `1px solid ${T.border}`,
              }}
            >
              <StatusDot />
              <div
                style={{
                  fontFamily: T.mono,
                  fontSize: 9,
                  color: T.sub,
                  marginTop: 8,
                }}
              >
                {ts}
              </div>
            </div>
          </div>

          {/* === Main content === */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* Top bar */}
            <div
              style={{
                height: 46,
                borderBottom: `1px solid ${T.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 28px",
                flexShrink: 0,
                background: "rgba(18,20,26,.5)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div
                style={{
                  fontFamily: T.mono,
                  fontSize: 10,
                  color: T.sub,
                  letterSpacing: 3,
                  fontWeight: 500,
                }}
              >
                {ai ? "AI AGENT" : sec.toUpperCase()}
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: 12 }}
              >
                <span
                  style={{
                    fontFamily: T.mono,
                    fontSize: 8,
                    color: T.mute,
                  }}
                >
                  BYTEFORCE.AI.KR
                </span>
                <div
                  style={{
                    width: 1,
                    height: 12,
                    background: T.border,
                  }}
                />
                <span
                  style={{
                    fontFamily: T.mono,
                    fontSize: 8,
                    color: T.mute,
                  }}
                >
                  {ts}
                </span>
              </div>
            </div>

            {/* Content + AI sidebar */}
            <div
              style={{ flex: 1, display: "flex", overflow: "hidden" }}
            >
              <div style={{ flex: 1, overflow: "hidden" }}>
                <div
                  key={ai ? "ai" : sec}
                  style={{
                    height: "100%",
                    overflow: "auto",
                    animation: "panelIn .35s ease",
                  }}
                >
                  {ai ? (
                    <AIChat admin={adm} currentSection={sec} />
                  ) : (
                    views[sec]
                  )}
                </div>
              </div>
              {!ai && (
                <div
                  style={{
                    width: 285,
                    borderLeft: `1px solid ${T.border}`,
                    display: "flex",
                    flexDirection: "column",
                    flexShrink: 0,
                    background: "rgba(18,20,26,.3)",
                    backdropFilter: "blur(20px)",
                  }}
                >
                  <div
                    style={{
                      padding: "13px 16px",
                      borderBottom: `1px solid ${T.border}`,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: T.mono,
                        fontSize: 9,
                        color: T.pink,
                        letterSpacing: 2,
                        fontWeight: 500,
                      }}
                    >
                      AI AGENT
                    </span>
                    <MetalBtn size="sm" onClick={() => sA(true)}>
                      EXPAND
                    </MetalBtn>
                  </div>
                  <AIChat admin={adm} currentSection={sec} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </LaserBorder>
  );
}
