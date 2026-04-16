import React, { useState, useEffect } from "react";
import { T } from "../theme";

export function ServiceCycler() {
  const w = [
    { t: "생성형 AI 컨설팅", c: T.accent },
    { t: "AI 업무 자동화", c: T.gold },
    { t: "기업 AI 솔루션", c: T.pink },
    { t: "웹\u00b7앱\u00b7MVP 개발", c: T.purple },
    { t: "다국어 서비스", c: T.cyan },
    { t: "디지털 캠페인", c: T.green },
  ];
  const [idx, sI] = useState(0);
  const [vis, sV] = useState(true);
  const [glitch, sG] = useState(false);

  useEffect(() => {
    const iv = setInterval(() => {
      sG(true); // flash chromatic aberration
      sV(false);
      setTimeout(() => {
        sI((p) => (p + 1) % w.length);
        sV(true);
        sG(false);
      }, 350);
    }, 2800);
    return () => clearInterval(iv);
  }, []);

  return (
    <span
      style={{
        display: "inline-block",
        transition: "all .35s cubic-bezier(0.34, 1.56, 0.64, 1)",
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0) scale(1)" : "translateY(6px) scale(0.97)",
        filter: vis ? "blur(0)" : "blur(2px)",
        color: w[idx].c,
        fontWeight: 600,
        textShadow: glitch
          ? `-2px 0 ${w[idx].c}60, 2px 0 ${T.pink}40, 0 0 30px ${w[idx].c}30`
          : `0 0 24px ${w[idx].c}50, 0 0 48px ${w[idx].c}20`,
      }}
    >
      {w[idx].t}
    </span>
  );
}
