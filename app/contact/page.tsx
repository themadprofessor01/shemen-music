import { PageShell } from "@/components/PageShell";
import { Mail } from "lucide-react";

export default function ContactPage() {
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
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold" style={{ color: "var(--muted)" }}>Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full rounded-xl px-4 py-3 text-sm outline-none"
                style={{ background: "var(--surface2)", border: "1px solid var(--border)", color: "var(--foreground)" }}
              />
            </div>
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
              <label className="text-xs font-semibold" style={{ color: "var(--muted)" }}>Message</label>
              <textarea
                rows={5}
                placeholder="How can we help?"
                className="w-full rounded-xl px-4 py-3 text-sm outline-none resize-none"
                style={{ background: "var(--surface2)", border: "1px solid var(--border)", color: "var(--foreground)" }}
              />
            </div>
            <button
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-85"
              style={{ background: "linear-gradient(135deg, var(--ink, #0c1823), var(--blue-deep, #083557))" }}
            >
              <Mail size={15} /> Send Message
            </button>
          </div>
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
