"use client";

import { useRef, useCallback } from "react";

export function useMagneticTilt(maxDeg = 8) {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const dy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    el.style.transition = "transform 0.08s ease";
    el.style.transform = `perspective(700px) rotateY(${dx * maxDeg}deg) rotateX(${-dy * maxDeg}deg) translateY(-4px) scale(1.02)`;
  }, [maxDeg]);

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)";
    el.style.transform = "perspective(700px) rotateY(0deg) rotateX(0deg) translateY(0) scale(1)";
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}
