import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { tracks, moods, formatPlays } from "@/lib/data";
import type { Track } from "@/lib/data";
import { TrackCardGrid } from "@/components/TrackCard";
import StationPlayer from "./StationPlayer";

export async function generateStaticParams() {
  return tracks.map((t) => ({ id: t.id }));
}

function WaveformBars({ trackId }: { trackId: string }) {
  const seed = trackId.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const bars = Array.from({ length: 48 }, (_, i) => {
    const v = ((seed + i * 13) % 19) + (i % 5) * 3;
    return 10 + (v % 36);
  });

  return (
    <div className="flex items-center gap-[3px]" aria-hidden="true" style={{ height: 56 }}>
      {bars.map((height, i) => (
        <span
          key={i}
          className="rounded-full flex-shrink-0"
          style={{
            width: 4,
            height,
            background:
              i < bars.length * 0.45
                ? `linear-gradient(180deg, var(--accent), rgba(7,93,158,0.5))`
                : "var(--border)",
            opacity: i < bars.length * 0.45 ? 1 : 0.7,
          }}
        />
      ))}
    </div>
  );
}

function TagPill({ label, color }: { label: string; color: string }) {
  return (
    <span
      className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
      style={{
        background: color + "22",
        color: color,
        border: `1px solid ${color}44`,
      }}
    >
      {label}
    </span>
  );
}

export default async function StationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const track = tracks.find((t) => t.id === id);
  if (!track) notFound();

  const mood = moods.find((m) => m.id === track.mood);

  // Related tracks: same category or same mood, exclude current, first 6
  const related = tracks
    .filter(
      (t) =>
        t.id !== track.id &&
        (t.category === track.category || (track.mood && t.mood === track.mood))
    )
    .slice(0, 6);

  const categoryLabel =
    track.category === "instrumental" ? "Instrumentals" : "Worship";

  const year = 2024;

  const coverSrc = track.coverImage || track.imageUrl;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-12">
      {/* ── Hero ── */}
      <section className="grid md:grid-cols-[300px_1fr] gap-8 items-start">
        {/* Cover art */}
        <div
          className="relative rounded-2xl overflow-hidden flex-shrink-0 shadow-2xl"
          style={{ width: 300, height: 300 }}
        >
          {coverSrc ? (
            <Image
              src={coverSrc}
              alt={track.title}
              fill
              sizes="300px"
              className="object-cover"
              priority
            />
          ) : (
            <div
              className="w-full h-full"
              style={{
                background: `linear-gradient(135deg, ${track.coverColor}, ${track.coverColor2 ?? track.coverColor})`,
              }}
            />
          )}
        </div>

        {/* Meta */}
        <div className="flex flex-col gap-4">
          <div>
            <Link
              href="/instrumentals"
              className="text-sm font-semibold hover:underline"
              style={{ color: "var(--accent)" }}
            >
              {track.artist}
            </Link>
            <h1 className="mt-1 text-3xl sm:text-4xl font-black tracking-tight leading-tight">
              {track.title}
            </h1>
          </div>

          {/* Meta pills */}
          <div className="flex flex-wrap gap-2">
            <TagPill label={categoryLabel} color="var(--accent)" />
            <span
              className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
              style={{
                background: "var(--surface2)",
                color: "var(--foreground-muted)",
                border: "1px solid var(--border)",
              }}
            >
              1 track
            </span>
            <span
              className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
              style={{
                background: "var(--surface2)",
                color: "var(--foreground-muted)",
                border: "1px solid var(--border)",
              }}
            >
              {track.duration}
            </span>
            <span
              className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
              style={{
                background: "var(--surface2)",
                color: "var(--foreground-muted)",
                border: "1px solid var(--border)",
              }}
            >
              {year}
            </span>
          </div>

          {/* Play button + stats — client component */}
          <StationPlayer track={track} />

          {/* Download link */}
          {track.downloadUrl && (
            <a
              href={track.downloadUrl}
              className="inline-flex items-center gap-2 w-fit rounded-full px-5 py-2.5 text-sm font-bold"
              style={{
                background: "var(--premium-soft)",
                color: "var(--premium)",
                border: "1px solid rgba(182,138,58,0.3)",
              }}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download ({track.size})
            </a>
          )}
        </div>
      </section>

      {/* ── Track variants list ── */}
      <section
        className="rounded-2xl p-5 sm:p-6"
        style={{ background: "var(--surface)", border: "1px solid var(--border)", boxShadow: "var(--shadow-card)" }}
      >
        <h2 className="text-xs font-bold uppercase tracking-[0.18em] mb-4" style={{ color: "var(--premium)" }}>
          Track Versions
        </h2>
        <TrackVariantRow track={track} />
      </section>

      {/* ── Waveform ── */}
      <section
        className="rounded-2xl p-5 sm:p-6"
        style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
      >
        <h2 className="text-xs font-bold uppercase tracking-[0.18em] mb-4" style={{ color: "var(--foreground-muted)" }}>
          Waveform Preview
        </h2>
        <WaveformBars trackId={track.id} />
      </section>

      {/* ── Lyrics ── */}
      <section
        className="rounded-2xl p-5 sm:p-6"
        style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
      >
        <h2 className="text-lg font-bold mb-3">Lyrics</h2>
        {track.lyrics ? (
          <pre className="whitespace-pre-wrap font-sans text-sm leading-7" style={{ color: "var(--foreground-muted)" }}>
            {track.lyrics}
          </pre>
        ) : (
          <p className="text-sm italic" style={{ color: "var(--foreground-muted)" }}>
            Lyrics coming soon.
          </p>
        )}
      </section>

      {/* ── Tags ── */}
      <section>
        <h2 className="text-xs font-bold uppercase tracking-[0.18em] mb-3" style={{ color: "var(--foreground-muted)" }}>
          Tags
        </h2>
        <div className="flex flex-wrap gap-2">
          <TagPill label={categoryLabel} color="var(--accent)" />
          {mood && <TagPill label={mood.label} color={mood.color} />}
          <TagPill label="Worship Music" color="#2e7d32" />
          <TagPill label="Church" color="#6a1b9a" />
          <TagPill label="Gospel" color="#b71c1c" />
        </div>
      </section>

      {/* ── Discover More ── */}
      {related.length > 0 && (
        <section>
          <div className="flex items-end justify-between mb-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: "var(--premium)" }}>
                ShemenMusic
              </p>
              <h2 className="mt-1 text-2xl font-black tracking-tight">Discover More</h2>
            </div>
            <Link
              href="/instrumentals"
              className="text-sm font-medium hover:opacity-75"
              style={{ color: "var(--accent)" }}
            >
              See all
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {related.map((t) => (
              <TrackCardGrid key={t.id} track={t} />
            ))}
          </div>
        </section>
      )}

      {/* ── Social share ── */}
      <section
        className="rounded-2xl p-5 sm:p-6"
        style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
      >
        <h2 className="text-xs font-bold uppercase tracking-[0.18em] mb-4" style={{ color: "var(--foreground-muted)" }}>
          Share this track
        </h2>
        <SocialShare track={track} />
      </section>

      {/* ── Comments ── */}
      <section
        className="rounded-2xl p-5 sm:p-6"
        style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
      >
        <h2 className="text-lg font-bold mb-6">Comments</h2>
        <CommentsForm trackTitle={track.title} />
      </section>
    </div>
  );
}

/* ─── Sub-components (server-renderable) ───────────────────────── */

function TrackVariantRow({ track }: { track: Track }) {
  return (
    <div
      className="flex items-center justify-between gap-4 rounded-xl px-4 py-3"
      style={{ background: "var(--surface2)", border: "1px solid var(--border)" }}
    >
      {/* Left: title */}
      <div className="flex items-center gap-3 min-w-0">
        <div
          className="w-9 h-9 rounded-lg flex-shrink-0 overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${track.coverColor}, ${track.coverColor2 ?? track.coverColor})`,
          }}
        >
          {(track.coverImage || track.imageUrl) && (
            <Image
              src={track.coverImage || track.imageUrl}
              alt=""
              width={36}
              height={36}
              className="object-cover w-full h-full"
            />
          )}
        </div>
        <p className="text-sm font-medium truncate" style={{ color: "var(--foreground)" }}>
          {track.title}
        </p>
      </div>

      {/* Right: stats */}
      <div
        className="hidden sm:flex items-center gap-4 flex-shrink-0 text-xs"
        style={{ color: "var(--foreground-muted)" }}
      >
        <span className="flex items-center gap-1">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          {formatPlays(track.plays)}
        </span>
        <span className="flex items-center gap-1">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          {Math.round(track.plays * 0.12)}
        </span>
        <span className="flex items-center gap-1">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          {Math.round(track.plays * 0.03)}
        </span>
        <span>{track.duration}</span>
      </div>
    </div>
  );
}

function SocialShare({ track }: { track: Track }) {
  const text = encodeURIComponent(`Listen to "${track.title}" by ${track.artist}`);
  const url = encodeURIComponent(`https://shemenmusic.com/three/station/${track.id}/`);

  const socials = [
    {
      label: "Instagram",
      href: `https://www.instagram.com/`,
      color: "#e1306c",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      color: "#1877f2",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
    },
    {
      label: "X / Twitter",
      href: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      color: "#000000",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${text}%20${url}`,
      color: "#25d366",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      ),
    },
    {
      label: "Telegram",
      href: `https://t.me/share/url?url=${url}&text=${text}`,
      color: "#0088cc",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {socials.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${s.label}`}
          className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-transform hover:scale-105"
          style={{
            background: s.color + "15",
            color: s.color,
            border: `1px solid ${s.color}30`,
          }}
        >
          {s.icon}
          {s.label}
        </a>
      ))}
    </div>
  );
}

function CommentsForm({ trackTitle }: { trackTitle: string }) {
  return (
    <form
      onSubmit={undefined}
      className="space-y-4"
      aria-label={`Leave a comment on ${trackTitle}`}
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-[0.14em]" style={{ color: "var(--foreground-muted)" }}>
            Name
          </label>
          <input
            type="text"
            name="name"
            required
            placeholder="Your name"
            className="rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2"
            style={{
              background: "var(--surface2)",
              border: "1px solid var(--border)",
              color: "var(--foreground)",
            }}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-[0.14em]" style={{ color: "var(--foreground-muted)" }}>
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            placeholder="your@email.com"
            className="rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2"
            style={{
              background: "var(--surface2)",
              border: "1px solid var(--border)",
              color: "var(--foreground)",
            }}
          />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold uppercase tracking-[0.14em]" style={{ color: "var(--foreground-muted)" }}>
          Comment
        </label>
        <textarea
          name="comment"
          required
          rows={4}
          placeholder="Share your thoughts on this track…"
          className="rounded-xl px-4 py-2.5 text-sm resize-none outline-none focus:ring-2"
          style={{
            background: "var(--surface2)",
            border: "1px solid var(--border)",
            color: "var(--foreground)",
          }}
        />
      </div>
      <button
        type="submit"
        className="rounded-full px-6 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
        style={{ background: "linear-gradient(135deg, var(--ink), var(--blue-deep))" }}
      >
        Post Comment
      </button>
    </form>
  );
}
