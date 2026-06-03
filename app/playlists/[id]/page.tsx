import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { TrackList } from "@/components/TrackList";
import { playlists, tracks } from "@/lib/data";

export default async function PlaylistPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const playlist = playlists.find((item) => item.id === id);
  if (!playlist) notFound();

  const offset = playlists.findIndex((item) => item.id === id);
  const playlistTracks = tracks.filter((_, index) => index % playlists.length === offset || index < 2);

  return (
    <>
      <PageShell eyebrow={`${playlist.trackCount} tracks`} title={playlist.title}>
        A Shemen Music flow selected for this worship moment.
      </PageShell>
      <div className="max-w-7xl mx-auto px-4">
        <TrackList tracks={playlistTracks} />
      </div>
    </>
  );
}
