import { useState, useEffect } from "react";

export function useClock() {
  const [t, s] = useState(new Date());
  useEffect(() => {
    const i = setInterval(() => s(new Date()), 1000);
    return () => clearInterval(i);
  }, []);
  return t;
}
