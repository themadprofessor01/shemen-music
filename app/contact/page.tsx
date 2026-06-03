"use client";

import { PageShell } from "@/components/PageShell";
import { Mail, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <>
      <PageShell eyebrow="Get in touch" title="Contact Us">
        Questions, feedback, or licensing inquiries — we would love to hear from you.
      </PageShell>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div
          className="rounded-3xl p-8"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          {sent ? (
            <div className="flex flex-col items-center gap-4 py-8 text-center">
              <CheckCircle2 size={48} style={{ color: "var(--accent)" }} />
              <h3 className="text-xl font-black">Message sent!</h3>
              <p style={{ color: "var(--muted)" }}>Thank you for reaching out. We will get back to you soon.</p>
              <button
                onClick={() => setSent(false)}
                className="mt-2 text-sm underline hover:opacity-70"
                style={{ color: "var(--muted)" }}
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold" style={{ color: "var(--muted)" }}>Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  required
                  className="w-full rounded-xl px-4 py-3 text-sm outline-none"
                  style={{ background: "var(--surface2)", border: "1px solid var(--border)", color: "var(--foreground)" }}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold" style={{ color: "var(--muted)" }}>Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-xl px-4 py-3 text-sm outline-none"
                  style={{ background: "var(--surface2)", border: "1px solid var(--border)", color: "var(--foreground)" }}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold" style={{ color: "var(--muted)" }}>Message</label>
                <textarea
                  rows={5}
                  placeholder="How can we help?"
                  required
                  className="w-full rounded-xl px-4 py-3 text-sm outline-none resize-none"
                  style={{ background: "var(--surface2)", border: "1px solid var(--border)", color: "var(--foreground)" }}
                />
              </div>
              <button
                type="submit"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-85"
                style={{ background: "linear-gradient(135deg, var(--ink, #0c1823), var(--blue-deep, #083557))" }}
              >
                <Mail size={15} /> Send Message
              </button>
            </form>
          )}
        </div>

        <div className="mt-8 text-center text-sm" style={{ color: "var(--muted)" }}>
          Or email us directly at{" "}
          <a href="mailto:contact@shemenmusic.com" className="underline hover:opacity-80">
            contact@shemenmusic.com
          </a>
        </div>
      </div>
    </>
  );
}
