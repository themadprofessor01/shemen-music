import { Download } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { tracks, totalDuration } from "@/lib/data";

const instrumentals = tracks.filter((t) => t.category === "instrumental");
const worship = tracks.filter((t) => t.category === "worship");

export default function DownloadPage() {
  return (
    <>
      <PageShell eyebrow="Free downloads" title="Download Everything">
        Download all ShemenMusic tracks and keep them offline — free.
      </PageShell>
      <div className="max-w-3xl mx-auto px-4 py-8 grid gap-6">
        {/* Instrumental Tracks */}
        <div
          className="rounded-3xl p-8 flex flex-col sm:flex-row sm:items-center gap-6"
          style={{ background: "var(--surface)", border: "1px solid var(--border)", boxShadow: "var(--shadow-card)" }}
        >
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--muted)" }}>DOWNLOAD ALL</p>
            <h2 className="text-2xl font-black" style={{ color: "var(--foreground)" }}>Instrumental Tracks</h2>
            <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
              Download all ShemenMusic Instrumental Tracks and keep them offline
            </p>
            <p className="mt-3 text-xs font-semibold" style={{ color: "var(--muted)" }}>
              {instrumentals.length} tracks · {totalDuration(instrumentals)} · <span style={{ color: "var(--accent)" }}>Free</span>
            </p>
          </div>
          <a
            href="https://shemenmusic.com/three/instrumentals/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white flex-shrink-0 transition-opacity hover:opacity-85"
            style={{ background: "linear-gradient(135deg, var(--ink, #0c1823), var(--blue-deep, #083557))" }}
          >
            <Download size={15} /> Download Now
          </a>
        </div>

        {/* Praise & Worship */}
        <div
          className="rounded-3xl p-8 flex flex-col sm:flex-row sm:items-center gap-6"
          style={{ background: "var(--surface)", border: "1px solid var(--border)", boxShadow: "var(--shadow-card)" }}
        >
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--muted)" }}>DOWNLOAD ALL</p>
            <h2 className="text-2xl font-black" style={{ color: "var(--foreground)" }}>Praise &amp; Worship</h2>
            <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
              Download all praise and worship Tracks and keep them offline
            </p>
            <p className="mt-3 text-xs font-semibold" style={{ color: "var(--muted)" }}>
              {worship.length} tracks · {totalDuration(worship)} · <span style={{ color: "var(--accent)" }}>Free</span>
            </p>
          </div>
          <a
            href="https://shemenmusic.com/three/praise-worship-instrumentals/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white flex-shrink-0 transition-opacity hover:opacity-85"
            style={{ background: "linear-gradient(135deg, var(--ink, #0c1823), var(--blue-deep, #083557))" }}
          >
            <Download size={15} /> Download Now
          </a>
        </div>
      </div>
    </>
  );
}
