import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { TrackList } from "@/components/TrackList";
import { CatalogInsights } from "@/components/CatalogInsights";
import { playlists, tracksForPlaylist } from "@/lib/data";

export default async function PlaylistPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const playlist = playlists.find((item) => item.id === id);
  if (!playlist) notFound();

  const playlistTracks = tracksForPlaylist(playlist);

  return (
    <>
      <PageShell eyebrow={`${playlist.trackCount} tracks`} title={playlist.title}>
        {playlist.description}
      </PageShell>
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        <CatalogInsights tracks={playlistTracks} label={playlist.curator} />
        <TrackList tracks={playlistTracks} />
      </div>
    </>
  );
}
