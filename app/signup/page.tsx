"use client";

import Link from "next/link";
import { Music2 } from "lucide-react";

export default function SignUpPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-16"
      style={{ background: "var(--background)" }}
    >
      <div
        className="w-full max-w-md rounded-3xl border shadow-lg p-8 sm:p-10 space-y-7"
        style={{ background: "var(--surface)", borderColor: "var(--border)" }}
      >
        {/* Logo */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div
            className="h-14 w-14 rounded-2xl flex items-center justify-center"
            style={{ background: "var(--accent)", color: "#fff" }}
          >
            <Music2 size={28} />
          </div>
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: "var(--accent)" }}>
              ShemenMusic
            </p>
            <h1 className="text-2xl font-black tracking-tight">Create your account</h1>
          </div>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold" style={{ color: "var(--foreground-muted)" }}>
              Full name
            </label>
            <input
              type="text"
              autoComplete="name"
              placeholder="Your name"
              className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all focus:ring-2"
              style={{
                background: "var(--surface2)",
                borderColor: "var(--border)",
                color: "var(--foreground)",
              }}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold" style={{ color: "var(--foreground-muted)" }}>
              Email address
            </label>
            <input
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all focus:ring-2"
              style={{
                background: "var(--surface2)",
                borderColor: "var(--border)",
                color: "var(--foreground)",
              }}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold" style={{ color: "var(--foreground-muted)" }}>
              Password
            </label>
            <input
              type="password"
              autoComplete="new-password"
              placeholder="Create a strong password"
              className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all focus:ring-2"
              style={{
                background: "var(--surface2)",
                borderColor: "var(--border)",
                color: "var(--foreground)",
              }}
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl py-3.5 text-sm font-bold tracking-wide transition-opacity hover:opacity-85 active:opacity-70 mt-2"
            style={{ background: "var(--accent)", color: "#fff" }}
          >
            Create Account
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="h-px flex-1" style={{ background: "var(--border)" }} />
          <span className="text-xs font-medium" style={{ color: "var(--foreground-muted)" }}>
            or continue with
          </span>
          <div className="h-px flex-1" style={{ background: "var(--border)" }} />
        </div>

        {/* Google button */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-3 rounded-xl border py-3.5 text-sm font-semibold transition-all hover:opacity-80"
          style={{ background: "var(--surface)", borderColor: "var(--border)", color: "var(--foreground)" }}
        >
          <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
            <path fill="#4285F4" d="M44.5 20H24v8h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6-6C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"/>
            <path fill="#34A853" d="M6.3 14.7l7 5.1C15.1 16.4 19.2 14 24 14c3.1 0 5.9 1.1 8.1 2.9l6-6C34.6 4.1 29.6 2 24 2c-7.6 0-14.2 4.2-17.7 10.7z"/>
            <path fill="#FBBC05" d="M24 46c5.8 0 10.8-1.9 14.7-5.2l-6.8-5.6C29.9 36.6 27.1 37 24 37c-6.1 0-10.7-3.1-11.9-8l-6.9 5.4C8.9 41.8 16 46 24 46z"/>
            <path fill="#EA4335" d="M44.5 20H24v8h11.8c-1 3-3.2 5.4-6.2 7.2l6.8 5.6C41.2 37.1 45 31.1 45 24c0-1.3-.2-2.7-.5-4z"/>
          </svg>
          Continue with Google
        </button>

        {/* Sign in link */}
        <p className="text-center text-xs" style={{ color: "var(--foreground-muted)" }}>
          Already have an account?{" "}
          <Link
            href="/signin"
            className="font-semibold transition-opacity hover:opacity-70"
            style={{ color: "var(--accent)" }}
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
