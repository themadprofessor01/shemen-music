import { Download, Music, HeartHandshake } from "lucide-react";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { tracks } from "@/lib/data";

const instrumentalTracks = tracks.filter((t) => t.category === "instrumental");
const worshipTracks = tracks.filter((t) => t.category === "worship");

export default function DownloadPage() {
  return (
    <>
      <PageShell eyebrow="Free Downloads" title="Download Everything">
        Get all ShemenMusic tracks offline — completely free. Download individual songs or grab the full collection at once.
      </PageShell>

      {/* Big download cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-14 grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
        {/* Card 1 — Instrumental */}
        <div
          className="rounded-3xl border p-8 flex flex-col gap-5 shadow-lg"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        >
          <div className="flex items-start justify-between gap-3">
            <div
              className="h-14 w-14 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: "var(--accent)", color: "#fff" }}
            >
              <Music size={26} />
            </div>
            <span
              className="text-xs font-black tracking-widest px-3 py-1 rounded-full mt-1"
              style={{ background: "var(--surface2)", color: "var(--accent)" }}
            >
              FREE
            </span>
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-black tracking-tight">Download All</h2>
            <p className="text-sm leading-6" style={{ color: "var(--foreground-muted)" }}>
              Download all ShemenMusic Instrumental Tracks and keep them offline
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <span
              className="text-xs font-semibold px-3 py-1 rounded-full border"
              style={{ borderColor: "var(--border)", color: "var(--foreground-muted)" }}
            >
              {instrumentalTracks.length} tracks
            </span>
          </div>

          <Link
            href="#"
            className="mt-auto flex items-center justify-center gap-2 rounded-2xl px-6 py-4 text-sm font-bold transition-opacity hover:opacity-85 active:opacity-70"
            style={{ background: "var(--accent)", color: "#fff" }}
          >
            <Download size={18} />
            Download Now
          </Link>
        </div>

        {/* Card 2 — Praise & Worship */}
        <div
          className="rounded-3xl border p-8 flex flex-col gap-5 shadow-lg"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        >
          <div className="flex items-start justify-between gap-3">
            <div
              className="h-14 w-14 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: "var(--premium)", color: "#fff" }}
            >
              <HeartHandshake size={26} />
            </div>
            <span
              className="text-xs font-black tracking-widest px-3 py-1 rounded-full mt-1"
              style={{ background: "var(--surface2)", color: "var(--accent)" }}
            >
              FREE
            </span>
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-black tracking-tight">Download All</h2>
            <p className="text-sm leading-6" style={{ color: "var(--foreground-muted)" }}>
              Download all praise and worship Tracks and keep them offline
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <span
              className="text-xs font-semibold px-3 py-1 rounded-full border"
              style={{ borderColor: "var(--border)", color: "var(--foreground-muted)" }}
            >
              527 tracks
            </span>
          </div>

          <Link
            href="#"
            className="mt-auto flex items-center justify-center gap-2 rounded-2xl px-6 py-4 text-sm font-bold transition-opacity hover:opacity-85 active:opacity-70"
            style={{ background: "var(--premium)", color: "#fff" }}
          >
            <Download size={18} />
            Download Now
          </Link>
        </div>
      </div>

      {/* Individual track list */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-14 pb-16 space-y-3">
        <h2 className="text-xl font-bold mb-4">Individual Tracks</h2>
        {tracks.map((track) => (
          <div
            key={track.id}
            className="flex items-center justify-between gap-4 rounded-2xl border p-4"
            style={{ background: "var(--surface)", borderColor: "var(--border)" }}
          >
            <div className="min-w-0 flex-1">
              <p className="font-semibold truncate">{track.title}</p>
              <p className="text-xs mt-0.5" style={{ color: "var(--foreground-muted)" }}>
                {track.size} &middot; {track.duration}
              </p>
            </div>
            <Link
              href={track.downloadUrl ?? "#"}
              className="h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 transition-opacity hover:opacity-80"
              style={{ background: "var(--accent)", color: "#fff" }}
              aria-label={`Download ${track.title}`}
              download
            >
              <Download size={17} />
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
