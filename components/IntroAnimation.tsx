"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

export default function IntroAnimation() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const logo = logoRef.current;
    const glow = glowRef.current;
    if (!overlay || !logo) return;

    const isMobile = window.innerWidth < 768;

    // Sidebar logo resting position: px-4 (16px) padding-left, py-5 (20px) padding-top
    // Intro logo is 220px wide; sidebar logo is 140px wide → scale = 140/220
    const sidebarCenterX = 16 + 70;   // left offset + half of 140px logo
    const sidebarCenterY = 20 + 16;   // top offset + ~half of logo height
    const finalX = isMobile ? 0 : sidebarCenterX - window.innerWidth / 2;
    const finalY = isMobile ? -24 : sidebarCenterY - window.innerHeight / 2;
    const finalScale = isMobile ? 0.5 : 140 / 220;

    // Make visible
    gsap.set(overlay, { autoAlpha: 1 });

    const tl = gsap.timeline({
      onComplete: () => gsap.set(overlay, { display: "none" }),
    });

    // 1. Logo fades + rises in
    tl.fromTo(
      logo,
      { opacity: 0, scale: 0.78, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 1.0, ease: "expo.out" }
    );

    // Glow blooms in alongside logo
    if (glow) {
      tl.fromTo(
        glow,
        { opacity: 0, scale: 0.4 },
        { opacity: 1, scale: 1, duration: 1.4, ease: "power2.out" },
        "<"
      );
      // Subtle pulse while logo is centered
      tl.to(glow, { opacity: 0.6, scale: 1.08, duration: 0.9, yoyo: true, repeat: 1, ease: "sine.inOut" }, "+=0.15");
    }

    // 2. Logo flies to sidebar position (desktop) or shrinks out (mobile)
    tl.to(logo, {
      x: finalX,
      y: finalY,
      scale: finalScale,
      opacity: isMobile ? 0 : 1,
      duration: 0.85,
      ease: "power3.inOut",
    }, isMobile ? "-=0.1" : "+=0");

    // 3. Overlay fades out
    tl.to(overlay, {
      opacity: 0,
      duration: isMobile ? 0.35 : 0.5,
      ease: "power2.in",
    }, "-=0.35");
  }, []);

  return (
    <div
      ref={overlayRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--surface)",
        visibility: "hidden",
        opacity: 0,
        pointerEvents: "none",
      }}
    >
      {/* Ambient glow */}
      <div
        ref={glowRef}
        aria-hidden
        style={{
          position: "absolute",
          width: 480,
          height: 220,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at center, rgba(7,93,158,0.22) 0%, rgba(90,171,220,0.1) 45%, transparent 75%)",
          filter: "blur(48px)",
          pointerEvents: "none",
        }}
      />

      {/* Logo */}
      <div ref={logoRef} style={{ position: "relative", zIndex: 1 }}>
        <Image
          src="/logo.png"
          alt="ShemenMusic"
          width={220}
          height={44}
          priority
          style={{ filter: "var(--logo-filter, none)", display: "block" }}
        />
      </div>
    </div>
  );
}
