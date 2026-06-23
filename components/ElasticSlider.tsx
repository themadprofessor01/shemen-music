"use client";

import { useRef, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

interface ElasticSliderProps {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  startingValue?: number;
  defaultValue?: number;
  maxValue?: number;
  isStepped?: boolean;
  stepSize?: number;
  onChange?: (value: number) => void;
  className?: string;
}

export default function ElasticSlider({
  leftIcon,
  rightIcon,
  startingValue = 0,
  defaultValue = 50,
  maxValue = 100,
  isStepped = false,
  stepSize = 10,
  onChange,
  className = "",
}: ElasticSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const rawValue = useMotionValue(defaultValue);
  const springValue = useSpring(rawValue, { stiffness: 420, damping: 30, mass: 0.4 });

  const thumbLeft = useTransform(springValue, [startingValue, maxValue], ["0%", "100%"]);
  const fillWidth = useTransform(springValue, [startingValue, maxValue], ["0%", "100%"]);

  const clamp = (v: number) => Math.min(maxValue, Math.max(startingValue, v));

  const valueFromPointer = useCallback((clientX: number) => {
    const track = trackRef.current;
    if (!track) return rawValue.get();
    const rect = track.getBoundingClientRect();
    const pct = (clientX - rect.left) / rect.width;
    const raw = startingValue + pct * (maxValue - startingValue);
    if (isStepped) return clamp(Math.round(raw / stepSize) * stepSize);
    return clamp(raw);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startingValue, maxValue, isStepped, stepSize]);

  const commit = useCallback((val: number) => {
    rawValue.set(val);
    onChange?.(val);
  }, [rawValue, onChange]);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    const val = valueFromPointer(e.clientX);
    commit(val);
  }, [valueFromPointer, commit]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const val = valueFromPointer(e.clientX);
    commit(val);
  }, [valueFromPointer, commit]);

  const onPointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {leftIcon && (
        <span className="flex-shrink-0 opacity-50 hover:opacity-80 transition-opacity" style={{ color: "var(--foreground)" }}>
          {leftIcon}
        </span>
      )}

      <div
        ref={trackRef}
        className="relative flex-1 h-1.5 rounded-full cursor-pointer select-none"
        style={{ background: "rgba(12,24,35,0.15)" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        {/* Fill bar */}
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ width: fillWidth, background: "var(--accent, #075d9e)" }}
        />

        {/* Thumb */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full shadow-md cursor-grab active:cursor-grabbing"
          style={{
            left: thumbLeft,
            background: "#fff",
            border: "2px solid var(--accent, #075d9e)",
            boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
          }}
          whileHover={{ scale: 1.25 }}
          whileTap={{ scale: 1.4 }}
        />
      </div>

      {rightIcon && (
        <span className="flex-shrink-0 opacity-50 hover:opacity-80 transition-opacity" style={{ color: "var(--foreground)" }}>
          {rightIcon}
        </span>
      )}
    </div>
  );
}
