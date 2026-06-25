"use client";

import { useEffect, useRef } from "react";
import { usePlayer } from "@/components/MusicPlayerContext";

function hexToRgb(hex: string): string {
  const clean = hex.replace("#", "");
  if (clean.length !== 6) return "7, 93, 158";
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}

export default function DynamicColorAtmosphere() {
  const { currentTrack } = usePlayer();
  const prevColorRef = useRef<string>("#075d9e");
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const color = currentTrack?.coverColor ?? "#075d9e";
    if (color === prevColorRef.current) return;
    prevColorRef.current = color;

    const rgb = hexToRgb(color);
    document.documentElement.style.setProperty("--cover-color", color);
    document.documentElement.style.setProperty("--cover-color-rgb", rgb);

    if (overlayRef.current) {
      overlayRef.current.style.background = `
        radial-gradient(ellipse at top right, rgba(${rgb}, 0.13) 0%, transparent 55%),
        radial-gradient(ellipse at bottom left, rgba(${rgb}, 0.07) 0%, transparent 45%)
      `;
    }
  }, [currentTrack?.coverColor]);

  return (
    <div
      ref={overlayRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        transition: "background 2s ease",
        background: "radial-gradient(ellipse at top right, rgba(7,93,158,0.13) 0%, transparent 55%), radial-gradient(ellipse at bottom left, rgba(7,93,158,0.07) 0%, transparent 45%)",
      }}
      aria-hidden="true"
    />
  );
}
