import React, { useState, useEffect } from "react";
import { T } from "../theme";

export function Type({ text, speed = 20, onDone = null }) {
  const [s, sS] = useState("");

  useEffect(() => {
    sS("");
    let i = 0;
    const iv = setInterval(() => {
      i++;
      sS(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(iv);
        onDone && onDone();
      }
    }, speed);
    return () => clearInterval(iv);
  }, [text]);

  return (
    <>
      {s}
      <span
        style={{
          animation: "blink .7s step-end infinite",
          color: T.accent,
          fontWeight: 300,
        }}
      >
        {"\u2502"}
      </span>
    </>
  );
}
