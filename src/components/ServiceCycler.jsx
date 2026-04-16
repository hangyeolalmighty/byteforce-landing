import React, { useState, useEffect } from "react";
import { T } from "../theme";

export function ServiceCycler() {
  const w = [
    { t: "생성형 AI 컨설팅", c: T.accent },
    { t: "AI 업무 자동화", c: T.gold },
    { t: "기업 AI 솔루션", c: T.pink },
    { t: "웹\u00b7앱\u00b7MVP 개발", c: T.purple },
    { t: "다국어 서비스", c: T.cyan },
  ];
  const [idx, sI] = useState(0);
  const [vis, sV] = useState(true);

  useEffect(() => {
    const iv = setInterval(() => {
      sV(false);
      setTimeout(() => {
        sI((p) => (p + 1) % w.length);
        sV(true);
      }, 400);
    }, 2800);
    return () => clearInterval(iv);
  }, []);

  return (
    <span
      style={{
        display: "inline-block",
        transition: "all .4s",
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(8px)",
        color: w[idx].c,
        fontWeight: 600,
        textShadow: `0 0 24px ${w[idx].c}50,0 0 48px ${w[idx].c}20`,
      }}
    >
      {w[idx].t}
    </span>
  );
}
