import { notFound } from "next/navigation";
import { CollectionCover } from "@/components/CollectionCover";
import { TrackList } from "@/components/TrackList";
import { PlayAllButton } from "@/components/PlayAllButton";
import { playlists, tracks } from "@/lib/data";

export function generateStaticParams() {
  return playlists.map((p) => ({ id: p.id }));
}

export default async function PlaylistPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const playlist = playlists.find((p) => p.id === id);
  if (!playlist) notFound();

  // Match tracks by title keywords defined in playlist.songs, fall back to a sample
  const keywords = (playlist.songs ?? []).map((s) => s.toLowerCase());
  const matched = keywords.length > 0
    ? tracks.filter((t) => keywords.some((kw) => t.title.toLowerCase().includes(kw)))
    : [];
  const playlistTracks = matched.length >= 4
    ? matched
    : tracks.filter((_, i) => i % playlists.length === playlists.findIndex((p) => p.id === id) || i < 2);

  return (
    <div>
      {/* Hero section */}
      <div className="relative w-full overflow-hidden" style={{ height: 280 }}>
        <div className="absolute inset-0">
          <CollectionCover playlist={playlist} />
        </div>
        {/* gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 60%)",
          }}
        />
        {/* text overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-5">
          <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">
            {playlist.title}
          </h1>
          <p className="text-sm text-white/70 mt-1">
            {playlist.trackCount} tracks &middot; {playlist.curator}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="px-4 sm:px-8 lg:px-14 py-5 flex items-center gap-4">
        <PlayAllButton tracks={playlistTracks} />
      </div>

      {/* Track list */}
      <div className="px-4 sm:px-8 lg:px-14 pb-12">
        <TrackList tracks={playlistTracks} />
      </div>
    </div>
  );
}
