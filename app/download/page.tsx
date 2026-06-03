"use client";

import { tracks } from "@/lib/data";
import { Download, Music2 } from "lucide-react";
import { formatPlays } from "@/lib/data";

function DownloadRow({ track, index }: { track: typeof tracks[0]; index: number }) {
  const bg = `linear-gradient(135deg, ${track.coverColor}, ${track.coverColor2 ?? track.coverColor + "88"})`;

  return (
    <div
      className="flex items-center gap-4 px-3 py-3 rounded-xl transition-colors"
      style={{ border: "1px solid transparent" }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--surface2)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
    >
      <span className="w-8 text-center text-sm flex-shrink-0" style={{ color: "var(--foreground-muted)" }}>{index + 1}</span>

      <div className="w-9 h-9 rounded-lg flex-shrink-0 overflow-hidden">
        {track.coverImage ? (
          <img src={track.coverImage} alt={track.title} width={36} height={36} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <div style={{ width: "100%", height: "100%", background: bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Music2 size={14} className="text-white opacity-60" />
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate" style={{ color: "var(--foreground)" }}>{track.title}</p>
        <p className="text-xs truncate" style={{ color: "var(--foreground-muted)" }}>{track.artist}</p>
      </div>

      <div className="hidden sm:flex items-center gap-4 text-xs flex-shrink-0" style={{ color: "var(--foreground-muted)" }}>
        <span>{formatPlays(track.plays)} plays</span>
        <span>{track.size}</span>
        <span>{track.duration}</span>
      </div>

      <a
        href={track.downloadUrl ?? track.stationUrl ?? "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold flex-shrink-0 transition-opacity hover:opacity-80"
        style={{ background: "var(--accent)", color: "#fff" }}
        onClick={(e) => e.stopPropagation()}
      >
        <Download size={12} />
        <span className="hidden sm:inline">Download</span>
      </a>
    </div>
  );
}

export default function DownloadPage() {
  return (
    <div className="px-6 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2" style={{ color: "var(--foreground)" }}>Download Everything</h1>
        <p className="text-sm" style={{ color: "var(--foreground-muted)" }}>
          {tracks.length} tracks available — free downloads for ministry use
        </p>
      </div>

      {/* Header row */}
      <div className="flex items-center gap-4 px-3 pb-2 mb-1 text-xs font-medium border-b" style={{ color: "var(--foreground-muted)", borderColor: "var(--border)" }}>
        <span className="w-8 text-center">#</span>
        <span className="w-9 flex-shrink-0" />
        <span className="flex-1">Title</span>
        <span className="hidden sm:flex items-center gap-4">
          <span className="w-20">Plays</span>
          <span className="w-14">Size</span>
          <span className="w-10">Time</span>
        </span>
        <span className="w-20 text-right">Action</span>
      </div>

      <div className="flex flex-col">
        {tracks.map((track, i) => (
          <DownloadRow key={track.id} track={track} index={i} />
        ))}
      </div>
    </div>
  );
}
