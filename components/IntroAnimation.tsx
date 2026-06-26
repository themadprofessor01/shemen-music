"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function IntroAnimation() {
  const [phase, setPhase] = useState<"enter" | "hold" | "exit" | "done">("enter");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("hold"), 600);
    const t2 = setTimeout(() => setPhase("exit"), 2000);
    const t3 = setTimeout(() => setPhase("done"), 2700);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#0c1823",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: phase === "exit" ? 0 : 1,
        transition: phase === "exit" ? "opacity 0.65s cubic-bezier(0.4,0,0.2,1)" : "none",
        pointerEvents: phase === "exit" ? "none" : "auto",
      }}
    >
      {/* Logo — fades in from left to right */}
      <div
        style={{
          animation: phase === "enter" ? "intro-logo-ltr 0.8s cubic-bezier(0.22,1,0.36,1) both" : undefined,
        }}
      >
        <Image
          src="/logo.png"
          alt="ShemenMusic"
          width={360}
          height={52}
          priority
          style={{
            filter: "brightness(0) invert(1)",
            width: 360,
            height: "auto",
          }}
        />
      </div>

      {/* Loading bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: 2,
          background: "linear-gradient(90deg, #075d9e, #5aabdc)",
          animation: "intro-bar 2s cubic-bezier(0.4,0,0.2,1) both",
        }}
      />
    </div>
  );
}
