import React, { useRef, useEffect } from "react";
import { mob } from "../theme";

export function ChromeMesh() {
  const cv = useRef(null);
  const mouse = useRef({ x: -1, y: -1 });

  useEffect(() => {
    const c = cv.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    let W, H;
    const rs = () => {
      W = c.width = c.offsetWidth;
      H = c.height = c.offsetHeight;
    };
    rs();
    window.addEventListener("resize", rs);

    const onMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    const onLeave = () => {
      mouse.current.x = -1;
      mouse.current.y = -1;
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);

    const N = mob ? 25 : 65;
    const pts = Array.from({ length: N }, () => ({
      x: Math.random() * 2e3,
      y: Math.random() * 2e3,
      vx: (Math.random() - 0.5) * 0.04,
      vy: (Math.random() - 0.5) * 0.04,
      r: Math.random() * 2.2 + 0.5,
      ph: Math.random() * 6.28,
    }));

    let raf,
      t = 0;
    const draw = () => {
      t += 0.002;
      ctx.clearRect(0, 0, W, H);
      ctx.lineWidth = 0.4;
      for (let i = 0; i < N; i++) {
        const p = pts[i];
        p.x = (p.x + p.vx + Math.sin(t + p.ph) * 0.05 + W) % W;
        p.y = (p.y + p.vy + Math.cos(t + p.ph * 0.7) * 0.03 + H) % H;

        // Mouse repel
        if (mouse.current.x >= 0) {
          const dx = p.x - mouse.current.x;
          const dy = p.y - mouse.current.y;
          const d = Math.hypot(dx, dy);
          if (d < 150 && d > 0) {
            const force = (1 - d / 150) * 2;
            p.x += dx / d * force;
            p.y += dy / d * force;
          }
        }

        for (let j = i + 1; j < N; j++) {
          const q = pts[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 140) {
            ctx.strokeStyle = `rgba(${74 + Math.sin(t + i) * 30}, ${158 + Math.cos(t + j) * 30}, 255, ${(1 - d / 140) * 0.07})`;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
        const fl = 0.6 + Math.sin(t * 2 + p.ph) * 0.4;
        // Glow bloom behind node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 3, 0, 6.28);
        ctx.fillStyle = `rgba(74,158,255,${0.02 * fl})`;
        ctx.fill();
        // Main dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 6.28);
        ctx.fillStyle = `rgba(196,202,214,${0.12 * fl})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", rs);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={cv}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        opacity: 0.5,
      }}
    />
  );
}
