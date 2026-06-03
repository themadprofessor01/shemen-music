"use client";

import Link from "next/link";
import { useState } from "react";
import { Music2 } from "lucide-react";

export default function LoginPage() {
  const [mode, setMode] = useState<"signin" | "register">("signin");

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-12">
      <div
        className="w-full max-w-sm rounded-3xl p-8"
        style={{ background: "var(--surface)", border: "1px solid var(--border)", boxShadow: "0 24px 60px rgba(12,24,35,0.12)" }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 justify-center mb-8">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "var(--accent)" }}>
            <Music2 size={18} className="text-white" />
          </div>
          <span className="font-bold text-lg" style={{ color: "var(--foreground)" }}>
            shemen<span style={{ color: "var(--accent)" }}>MUSIC</span>
          </span>
        </div>

        {/* Tabs */}
        <div className="flex rounded-xl p-1 mb-6" style={{ background: "var(--surface2)" }}>
          {(["signin", "register"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className="flex-1 py-2 rounded-lg text-sm font-semibold transition-all"
              style={{
                background: mode === m ? "var(--background)" : "transparent",
                color: mode === m ? "var(--foreground)" : "var(--muted)",
                boxShadow: mode === m ? "0 2px 8px rgba(12,24,35,0.08)" : "none",
              }}
            >
              {m === "signin" ? "Sign In" : "Sign Up"}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
          {mode === "register" && (
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold" style={{ color: "var(--muted)" }}>Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full rounded-xl px-4 py-3 text-sm outline-none"
                style={{ background: "var(--surface2)", border: "1px solid var(--border)", color: "var(--foreground)" }}
              />
            </div>
          )}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold" style={{ color: "var(--muted)" }}>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-xl px-4 py-3 text-sm outline-none"
              style={{ background: "var(--surface2)", border: "1px solid var(--border)", color: "var(--foreground)" }}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold" style={{ color: "var(--muted)" }}>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-xl px-4 py-3 text-sm outline-none"
              style={{ background: "var(--surface2)", border: "1px solid var(--border)", color: "var(--foreground)" }}
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-xl text-sm font-bold text-white mt-2 transition-opacity hover:opacity-85"
            style={{ background: "linear-gradient(135deg, var(--ink, #0c1823), var(--blue-deep, #083557))" }}
          >
            {mode === "signin" ? "Sign In" : "Create Account"}
          </button>
        </form>

        <p className="text-center text-xs mt-6" style={{ color: "var(--muted)" }}>
          By continuing you agree to our{" "}
          <Link href="/terms" className="underline hover:opacity-80">Terms</Link> and{" "}
          <Link href="/privacy" className="underline hover:opacity-80">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
}
