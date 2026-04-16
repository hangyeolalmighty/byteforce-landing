import React, { useState, useEffect, useCallback } from "react";
import { T, mob } from "../theme";
import { BL } from "../data/boot-lines";

const GLITCH_CHARS = "!@#$%^&*()_+-=[]{}|;:<>?/~`01";

function ScrambleText({ text, delay = 0, color }) {
  const [display, setDisplay] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let timeout;
    timeout = setTimeout(() => {
      let iteration = 0;
      const len = text.length;
      const interval = setInterval(() => {
        setDisplay(
          text
            .split("")
            .map((char, i) => {
              if (char === " ") return " ";
              if (i < iteration) return char;
              return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
            })
            .join("")
        );
        iteration += 1;
        if (iteration > len) {
          clearInterval(interval);
          setDisplay(text);
          setDone(true);
        }
      }, 20);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, delay]);

  return (
    <div
      style={{
        fontSize: mob ? 10 : 11,
        color,
        marginBottom: 6,
        opacity: display ? 1 : 0,
        letterSpacing: 0.5,
        lineHeight: 1.8,
        fontVariantLigatures: "none",
        animation: done ? "none" : "scrambleIn .3s ease",
      }}
    >
      {display}
    </div>
  );
}

export function BootScreen({ onDone }) {
  const [lines, setLines] = useState([]);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    BL.forEach((l) => {
      setTimeout(() => setLines((p) => [...p, l]), l.d);
    });
    setTimeout(() => setFade(true), 2300);
    setTimeout(onDone, 2900);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#0A0C10",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: fade ? 0 : 1,
        transition: "opacity 0.6s",
        pointerEvents: fade ? "none" : "auto",
      }}
    >
      {/* Scanline overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "repeating-linear-gradient(0deg,rgba(0,0,0,.12) 0px,rgba(0,0,0,.12) 1px,transparent 1px,transparent 2px)",
          pointerEvents: "none",
          opacity: 0.3,
        }}
      />
      {/* Noise grain */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
          pointerEvents: "none",
          opacity: 0.5,
        }}
      />
      <div style={{ width: mob ? "90%" : 460, fontFamily: T.mono, position: "relative", zIndex: 2 }}>
        <div
          style={{
            fontSize: 10,
            color: T.mute,
            letterSpacing: 4,
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          SYSTEM BOOT
        </div>
        {lines.map((l, i) => (
          <ScrambleText key={i} text={l.t} delay={0} color={l.c} />
        ))}
        <div
          style={{
            marginTop: 20,
            height: 2,
            background: T.surface,
            borderRadius: 1,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              background: `linear-gradient(90deg, ${T.accent}, ${T.purple}, ${T.pink}, ${T.gold})`,
              backgroundSize: "300% 100%",
              borderRadius: 1,
              animation: "bootBar 2.2s ease forwards, meshFloat 2s ease infinite",
            }}
          />
        </div>
      </div>
    </div>
  );
}
