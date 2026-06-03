import { ListMusic } from "lucide-react";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { playlists } from "@/lib/data";

export default function PlaylistsPage() {
  return (
    <>
      <PageShell eyebrow={`${playlists.length} collections`} title="Playlists">
        Curated worship flows for prayer, Sunday mornings, soaking sessions, and praise gatherings.
      </PageShell>
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {playlists.map((playlist) => (
          <Link
            key={playlist.id}
            href={`/playlists/${playlist.id}`}
            className="rounded-2xl overflow-hidden group transition-transform hover:scale-[1.02]"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
          >
            <div className="h-36 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${playlist.coverColor}88, ${playlist.coverColor}22)` }}>
              <ListMusic size={34} style={{ color: playlist.coverColor }} />
            </div>
            <div className="p-4">
              <p className="font-semibold">{playlist.title}</p>
              <p className="text-sm opacity-55 mt-1">{playlist.trackCount} tracks</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
