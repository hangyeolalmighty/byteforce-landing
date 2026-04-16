import React, { useState, useEffect, useCallback, lazy, Suspense } from "react";
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
import { ScrollProgress } from "./components/ScrollProgress";

// Lazy-load AI chat — not needed at initial render
const AIChat = lazy(() => import("./chat/AIChat").then((m) => ({ default: m.AIChat })));
import { HomeView } from "./views/HomeView";
import { ServicesView } from "./views/ServicesView";
import { WorkView } from "./views/WorkView";
import { ProcessView } from "./views/ProcessView";
import { ContactView } from "./views/ContactView";
import { SolutionsView } from "./views/SolutionsView";

const AIFallback = () => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", gap: 6 }}>
    {[0, 1, 2].map((i) => (
      <div key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: T.metalGrad, animation: `dotPulse 1.2s ease ${i * 0.15}s infinite` }} />
    ))}
  </div>
);

const FONT_LINK =
  "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Noto+Sans+KR:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap";

// Section order for directional transitions
const SEC_ORDER = ["home", "services", "solutions", "work", "process", "contact"];

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
  const [dir, sDir] = useState("down"); // transition direction
  const [collapsed, sCol] = useState(() => {
    try { return localStorage.getItem("bf-sidebar") === "collapsed"; } catch { return false; }
  });
  const [visited, sVis] = useState(() => {
    try {
      const v = sessionStorage.getItem("bf-visited");
      return v ? JSON.parse(v) : { home: true };
    } catch { return { home: true }; }
  });

  // Track visited sections
  const markVisited = (id) => {
    sVis((prev) => {
      const next = { ...prev, [id]: true };
      try { sessionStorage.setItem("bf-visited", JSON.stringify(next)); } catch {}
      return next;
    });
  };

  const navTo = useCallback((id) => {
    if (id === "ai" && mob) {
      sAP(true);
      setTimeout(() => sAP(false), 500);
    }
    if (id === "ai") {
      sA(true);
    } else {
      // Determine direction
      const fromIdx = SEC_ORDER.indexOf(sec);
      const toIdx = SEC_ORDER.indexOf(id);
      sDir(toIdx >= fromIdx ? "down" : "up");
      sS(id);
      sA(false);
      markVisited(id);
    }
  }, [sec]);

  // Sidebar toggle
  const toggleSidebar = () => {
    sCol((p) => {
      const next = !p;
      try { localStorage.setItem("bf-sidebar", next ? "collapsed" : "expanded"); } catch {}
      return next;
    });
  };

  // Keyboard navigation
  useEffect(() => {
    if (!booted || mob) return;
    const handler = (e) => {
      // Don't capture when typing in input
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

      const keyMap = { "1": "home", "2": "services", "3": "solutions", "4": "work", "5": "process", "6": "contact" };
      if (keyMap[e.key]) {
        e.preventDefault();
        navTo(keyMap[e.key]);
      }
      if (e.key === "Escape") {
        sA(false);
      }
      if (e.key === "/" && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        sA(true);
        // Focus AI input after a tick
        setTimeout(() => {
          const inp = document.querySelector('input[placeholder]');
          if (inp) inp.focus();
        }, 100);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [booted, navTo]);

  const panelAnim = ai
    ? "panelIn .35s ease"
    : dir === "up"
      ? "panelUp .35s ease"
      : "panelDown .35s ease";

  const views = {
    home: <ScrollProgress color={T.accent}><HomeView navTo={navTo} /></ScrollProgress>,
    services: <ScrollProgress color={T.purple}><ServicesView navTo={navTo} /></ScrollProgress>,
    solutions: <ScrollProgress color={T.green}><SolutionsView /></ScrollProgress>,
    work: <ScrollProgress color={T.gold}><WorkView /></ScrollProgress>,
    process: <ScrollProgress color={T.green}><ProcessView /></ScrollProgress>,
    contact: <ScrollProgress color={T.cyan}><ContactView /></ScrollProgress>,
    ai: <Suspense fallback={<AIFallback />}><AIChat admin={adm} currentSection={sec} /></Suspense>,
  };

  const NAV_ITEMS = [
    { id: "home", icon: "\u2b21", label: "HOME", color: T.accent },
    { id: "services", icon: "\u25c7", label: "SERVICES", color: T.purple },
    { id: "solutions", icon: "\u25c6", label: "SOLUTIONS", color: T.green },
    { id: "work", icon: "\u25a6", label: "WORK", color: T.gold, badge: `${PJ.length}` },
    { id: "process", icon: "\u25a3", label: "PROCESS", color: T.green },
    { id: "contact", icon: "\u25ce", label: "CONTACT", color: T.cyan },
  ];

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
              <span style={{ fontFamily: T.mono, fontSize: 8, color: T.mute }}>{ts}</span>
            </div>
          </div>
          <div style={{ flex: 1, overflow: "hidden" }}>
            <div
              key={ai ? "ai" : sec}
              style={{
                height: "100%",
                animation: aiP ? "aiPulseIn .5s ease" : panelAnim,
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
  const sideW = collapsed ? 52 : 195;

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
        <div style={{ maxWidth: 1600, width: "100%", display: "flex", height: "100%" }}>
          <link href={FONT_LINK} rel="stylesheet" />
          <style>{styles}</style>

          {/* === Sidebar === */}
          <div
            style={{
              width: sideW,
              borderRight: `1px solid ${T.border}`,
              display: "flex",
              flexDirection: "column",
              flexShrink: 0,
              background: "rgba(18,20,26,.45)",
              backdropFilter: "blur(40px)",
              WebkitBackdropFilter: "blur(40px)",
              transition: "width .25s ease",
              overflow: "hidden",
            }}
          >
            {/* Logo */}
            <div style={{ padding: collapsed ? "22px 8px 18px" : "22px 18px 18px", borderBottom: `1px solid ${T.border}`, transition: "padding .25s" }}>
              <div
                className="logo-laser"
                style={{ position: "relative", display: "inline-block", padding: 1 }}
              >
                <div
                  style={{
                    fontFamily: T.mono,
                    fontSize: collapsed ? 11 : 14,
                    fontWeight: 900,
                    letterSpacing: collapsed ? 1 : 5,
                    background: T.metalGrad,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    position: "relative",
                    zIndex: 2,
                    transition: "all .25s",
                    whiteSpace: "nowrap",
                  }}
                >
                  {collapsed ? "BF" : "BYTEFORCE"}
                </div>
                <div
                  style={{
                    position: "absolute",
                    inset: -2,
                    borderRadius: 4,
                    padding: 2,
                    background:
                      "conic-gradient(from var(--laser-angle,0deg),#4A9EFF,#7C5CFC,#DB2777,#C9A84C,#34D399,#22D3EE,#4A9EFF)",
                    WebkitMask: "linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                    animation: "laserSpin 3s linear infinite",
                    opacity: 0.5,
                  }}
                />
              </div>
              {!collapsed && (
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
              )}
            </div>

            {/* Nav items */}
            <div style={{ flex: 1, padding: "14px 0", display: "flex", flexDirection: "column", gap: 1 }}>
              {NAV_ITEMS.map((n) => (
                <Nav
                  key={n.id}
                  {...n}
                  active={sec === n.id && !ai}
                  onClick={() => navTo(n.id)}
                  badge={collapsed ? null : n.badge}
                  visited={visited[n.id]}
                  collapsed={collapsed}
                />
              ))}
              <div style={{ height: 1, background: T.border, margin: "10px 18px" }} />
              <Nav
                icon={"\u25cf"}
                label="AI AGENT"
                active={ai}
                color={T.pink}
                onClick={() => sA((p) => !p)}
                collapsed={collapsed}
              />
            </div>

            {/* Footer with collapse toggle */}
            <div style={{ padding: collapsed ? "14px 8px" : "14px 18px", borderTop: `1px solid ${T.border}`, transition: "padding .25s" }}>
              {!collapsed && <StatusDot />}
              {!collapsed && (
                <div style={{ fontFamily: T.mono, fontSize: 9, color: T.sub, marginTop: 8 }}>{ts}</div>
              )}
              <div
                onClick={toggleSidebar}
                style={{
                  marginTop: collapsed ? 0 : 10,
                  fontFamily: T.mono,
                  fontSize: 10,
                  color: T.mute,
                  cursor: "pointer",
                  textAlign: "center",
                  padding: "4px 0",
                  borderRadius: 4,
                  transition: "all .2s",
                }}
                onMouseEnter={(e) => { e.target.style.color = T.sub; e.target.style.background = T.surface; }}
                onMouseLeave={(e) => { e.target.style.color = T.mute; e.target.style.background = "transparent"; }}
              >
                {collapsed ? "\u25b6" : "\u25c0"}
              </div>
            </div>
          </div>

          {/* === Main content === */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
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
              <div style={{ fontFamily: T.mono, fontSize: 10, color: T.sub, letterSpacing: 3, fontWeight: 500 }}>
                {ai ? "AI AGENT" : sec.toUpperCase()}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontFamily: T.mono, fontSize: 8, color: T.mute }}>BYTEFORCE.AI.KR</span>
                <div style={{ width: 1, height: 12, background: T.border }} />
                <span style={{ fontFamily: T.mono, fontSize: 8, color: T.mute }}>{ts}</span>
                <div style={{ width: 1, height: 12, background: T.border }} />
                <span
                  style={{ fontFamily: T.mono, fontSize: 7, color: T.mute, letterSpacing: 1 }}
                  title="Press 1-6 to navigate, / for AI, Esc to close"
                >
                  ⌨ 1-6 · / · ESC
                </span>
              </div>
            </div>

            {/* Content + AI sidebar */}
            <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
              <div style={{ flex: 1, overflow: "hidden" }}>
                <div
                  key={ai ? "ai" : sec}
                  style={{
                    height: "100%",
                    animation: panelAnim,
                  }}
                >
                  {ai ? <Suspense fallback={<AIFallback />}><AIChat admin={adm} currentSection={sec} /></Suspense> : views[sec]}
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
                    <span style={{ fontFamily: T.mono, fontSize: 9, color: T.pink, letterSpacing: 2, fontWeight: 500 }}>
                      AI AGENT
                    </span>
                    <MetalBtn size="sm" onClick={() => sA(true)}>EXPAND</MetalBtn>
                  </div>
                  <Suspense fallback={<AIFallback />}><AIChat admin={adm} currentSection={sec} /></Suspense>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </LaserBorder>
  );
}
