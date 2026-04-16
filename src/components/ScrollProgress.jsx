import React, { useState, useRef, useCallback } from "react";
import { T } from "../theme";

/**
 * Wraps a scrollable view and shows a 2px accent progress bar at the top.
 * Uses onScroll for real-time updates — no IntersectionObserver needed.
 */
export function ScrollProgress({ color = T.accent, children }) {
  const [pct, setPct] = useState(0);
  const ref = useRef(null);

  const onScroll = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    setPct(max > 0 ? (el.scrollTop / max) * 100 : 0);
  }, []);

  return (
    <div style={{ height: "100%", position: "relative", overflow: "hidden" }}>
      {/* Progress bar — sticky at top */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: 2,
          width: `${pct}%`,
          background: `linear-gradient(90deg, ${color}80, ${color})`,
          boxShadow: pct > 0 ? `0 0 8px ${color}40` : "none",
          zIndex: 10,
          transition: "width .08s linear",
          borderRadius: "0 1px 1px 0",
        }}
      />
      <div
        ref={ref}
        onScroll={onScroll}
        style={{ height: "100%", overflow: "auto" }}
      >
        {children}
      </div>
    </div>
  );
}
