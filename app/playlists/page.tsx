import { CollectionCover } from "@/components/CollectionCover";
import { PageShell } from "@/components/PageShell";
import { SeasonalSection } from "@/components/SeasonalSection";
import Link from "next/link";
import { playlists, tracks } from "@/lib/data";
import { getSeasonalTheme, getSeasonalTracks } from "@/lib/seasonal";

export default function PlaylistsPage() {
  const theme = getSeasonalTheme();
  const seasonalTracks = getSeasonalTracks(theme, tracks);

  return (
    <>
      <PageShell title="Playlists">
        Curated worship flows
      </PageShell>
      <div className="px-4 sm:px-8 lg:px-14 pb-12">
        <SeasonalSection theme={theme} tracks={seasonalTracks} />

        <h2 className="text-xl font-black mb-4 mt-2">All Playlists</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {playlists.map((playlist) => (
            <Link
              key={playlist.id}
              href={`/playlists/${playlist.id}`}
              className="rounded-2xl overflow-hidden group transition-transform hover:scale-[1.02]"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              <CollectionCover playlist={playlist} />
              <div className="p-4">
                <p className="font-semibold leading-snug">{playlist.title}</p>
                <p className="text-sm mt-1" style={{ color: "var(--foreground-muted)" }}>
                  {playlist.trackCount} tracks
                </p>
                <p className="text-xs mt-0.5" style={{ color: "var(--foreground-muted)" }}>
                  {playlist.curator}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
