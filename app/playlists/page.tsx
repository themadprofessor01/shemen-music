import { CollectionCover } from "@/components/CollectionCover";
import { PageShell } from "@/components/PageShell";
import Link from "next/link";
import { playlists } from "@/lib/data";

export default function PlaylistsPage() {
  return (
    <>
      <PageShell eyebrow={`${playlists.length} curated collections`} title="Playlists" />
      <div className="px-4 pb-14 sm:px-8 lg:px-14">
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-5">
        {playlists.map((playlist) => (
          <Link
            key={playlist.id}
            href={`/playlists/${playlist.id}`}
            className="luxury-hover-card block overflow-hidden rounded-2xl"
            style={{ background: "var(--surface2)", border: "1px solid var(--border)" }}
          >
            <CollectionCover playlist={playlist} />
            <div className="p-4">
              <span className="block truncate text-sm font-bold">{playlist.title}</span>
              <span className="mt-1 block truncate text-xs" style={{ color: "var(--foreground-muted)" }}>{playlist.curator}</span>
            </div>
          </Link>
        ))}
        </div>
      </div>
    </>
  );
}
