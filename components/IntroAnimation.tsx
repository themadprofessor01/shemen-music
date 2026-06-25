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
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 0,
        opacity: phase === "exit" ? 0 : 1,
        transition: phase === "exit" ? "opacity 0.65s cubic-bezier(0.4,0,0.2,1)" : "none",
        pointerEvents: phase === "exit" ? "none" : "auto",
      }}
    >
      {/* Ambient glow behind logo */}
      <div
        style={{
          position: "absolute",
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(90,171,220,0.18) 0%, transparent 70%)",
          animation: "intro-glow 2s ease-in-out infinite alternate",
        }}
      />

      {/* Logo */}
      <div
        style={{
          animation: phase === "enter" ? "intro-logo-in 0.7s cubic-bezier(0.22,1,0.36,1) both" : undefined,
          position: "relative",
        }}
      >
        <Image
          src="/logo.png"
          alt="ShemenMusic"
          width={200}
          height={30}
          priority
          style={{
            filter: "brightness(0) invert(1)",
            width: 200,
            height: "auto",
          }}
        />
      </div>

      {/* Tagline */}
      <p
        style={{
          color: "rgba(255,255,255,0.35)",
          fontSize: 11,
          letterSpacing: 5,
          textTransform: "uppercase",
          marginTop: 20,
          fontWeight: 500,
          animation: phase === "enter"
            ? "intro-text-in 0.7s 0.3s cubic-bezier(0.22,1,0.36,1) both"
            : undefined,
        }}
      >
        Worship Music
      </p>

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
