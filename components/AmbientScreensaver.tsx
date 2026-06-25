"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePlayer } from "@/components/MusicPlayerContext";
import { cleanTitle } from "@/lib/data";

const IDLE_MS = 30_000;

// Simple particle type
type Particle = { x: number; y: number; vx: number; vy: number; r: number; opacity: number; color: string };

function useParticles(active: boolean, color: string) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!active) {
      cancelAnimationFrame(rafRef.current!);
      return;
    }
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width = window.innerWidth;
    const H = canvas.height = window.innerHeight;

    // Init particles
    particlesRef.current = Array.from({ length: 40 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -Math.random() * 0.6 - 0.2,
      r: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.1,
      color,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.opacity -= 0.001;
        if (p.y < -10 || p.opacity <= 0) {
          p.x = Math.random() * W;
          p.y = H + 10;
          p.vy = -Math.random() * 0.6 - 0.2;
          p.opacity = Math.random() * 0.5 + 0.1;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.opacity})`;
        ctx.fill();
      }
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current!);
  }, [active, color]);

  return canvasRef;
}

export default function AmbientScreensaver() {
  const { currentTrack, isPlaying } = usePlayer();
  const [active, setActive] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const color = currentTrack?.coverColor ?? "#075d9e";
  const canvasRef = useParticles(active, color);

  const reset = useCallback(() => {
    setActive(false);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setActive(true), IDLE_MS);
  }, []);

  useEffect(() => {
    if (!isPlaying) {
      clearTimeout(timerRef.current);
      setActive(false);
      return;
    }
    reset();
    const events = ["mousemove", "mousedown", "keydown", "touchstart", "wheel"] as const;
    const opts = { passive: true } as AddEventListenerOptions;
    events.forEach((e) => document.addEventListener(e, reset, opts));
    return () => {
      clearTimeout(timerRef.current);
      events.forEach((e) => document.removeEventListener(e, reset, opts as EventListenerOptions));
    };
  }, [isPlaying, reset]);

  if (!active || !currentTrack) return null;

  const coverSrc = currentTrack.coverImage || currentTrack.imageUrl;

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Ambient screensaver — click to dismiss"
      onClick={() => setActive(false)}
      onKeyDown={(e) => { if (e.key === "Escape" || e.key === "Enter" || e.key === " ") setActive(false); }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 300,
        cursor: "pointer",
        overflow: "hidden",
        animation: "screensaver-in 0.8s cubic-bezier(0.22,1,0.36,1) both",
      }}
    >
      {/* Blurred bg */}
      {coverSrc ? (
        <div
          style={{
            position: "absolute",
            inset: "-10%",
            backgroundImage: `url(${coverSrc})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(48px) brightness(0.35) saturate(1.8)",
          }}
        />
      ) : (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse at center, ${color}44 0%, #0c1823 70%)`,
          }}
        />
      )}
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)" }} />

      {/* Particles */}
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      />

      {/* Floating content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 0,
          animation: "screensaver-float 10s ease-in-out infinite alternate",
        }}
      >
        {coverSrc && (
          <img
            src={coverSrc}
            alt=""
            style={{
              width: 180,
              height: 180,
              borderRadius: 24,
              objectFit: "cover",
              marginBottom: 28,
              boxShadow: `0 40px 100px ${color}88, 0 0 0 1px rgba(255,255,255,0.08)`,
            }}
          />
        )}
        <p
          style={{
            color: "white",
            fontSize: 28,
            fontWeight: 900,
            textAlign: "center",
            maxWidth: 480,
            padding: "0 24px",
            textShadow: "0 2px 20px rgba(0,0,0,0.6)",
          }}
        >
          {cleanTitle(currentTrack.title)}
        </p>
        <p
          style={{
            color: "rgba(255,255,255,0.55)",
            fontSize: 15,
            marginTop: 8,
            letterSpacing: 1,
          }}
        >
          {currentTrack.artist}
        </p>

        {/* Pulsing dot to show playing */}
        <div style={{ display: "flex", gap: 5, marginTop: 28 }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.5)",
                animation: `screensaver-dot 1.4s ${i * 0.18}s ease-in-out infinite`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Dismiss hint */}
      <p
        style={{
          position: "absolute",
          bottom: 32,
          left: 0,
          right: 0,
          textAlign: "center",
          color: "rgba(255,255,255,0.3)",
          fontSize: 11,
          letterSpacing: 4,
          textTransform: "uppercase",
          animation: "screensaver-hint 2s 1s ease both",
        }}
      >
        Touch anywhere to continue
      </p>
    </div>
  );
}
