import { Download } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { tracks } from "@/lib/data";

export default function DownloadPage() {
  return (
    <>
      <PageShell eyebrow={`${tracks.length} files ready`} title="Download Everything">
        Choose single songs now. A full ZIP bundle can be wired in when the master audio files are added.
      </PageShell>
      <div className="max-w-7xl mx-auto px-4 grid gap-3">
        {tracks.map((track) => (
          <div
            key={track.id}
            className="flex items-center justify-between gap-4 rounded-2xl border p-4"
            style={{ background: "var(--surface)", borderColor: "var(--border)" }}
          >
            <div className="min-w-0">
              <p className="font-semibold truncate">{track.title}</p>
              <p className="text-sm opacity-55">{track.size} · {track.duration}</p>
            </div>
            <button
              className="h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 hover:opacity-85"
              style={{ background: "var(--gold)", color: "#050505" }}
              aria-label={`Download ${track.title}`}
            >
              <Download size={17} />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
