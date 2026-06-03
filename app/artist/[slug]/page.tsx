"use client";

import { notFound } from "next/navigation";
import { artists, tracks, slugifyArtist, totalDuration, formatPlays } from "@/lib/data";
import { TrackList } from "@/components/TrackList";
import { Users } from "lucide-react";
import { use } from "react";

export default function ArtistPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const artist = artists.find((a) => a.slug === slug);

  // Also find tracks where slugifyArtist of the artist name matches slug
  const artistTracks = tracks.filter((t) => slugifyArtist(t.artist) === slug || t.artist.toLowerCase().includes(artist?.name.toLowerCase() ?? "___"));

  if (!artist && artistTracks.length === 0) notFound();

  const name = artist?.name ?? artistTracks[0]?.artist ?? slug;
  const bio = artist?.bio;
  const coverSrc = artistTracks[0]?.coverImage || artistTracks[0]?.imageUrl;
  const totalPlays = artistTracks.reduce((sum, t) => sum + t.plays, 0);

  return (
    <div>
      {/* Hero */}
      <div
        className="relative flex items-end px-8 pb-8"
        style={{ minHeight: 280, background: `linear-gradient(180deg, ${artistTracks[0]?.coverColor ?? "var(--surface2)"} 0%, var(--background) 100%)` }}
      >
        <div className="absolute inset-0 opacity-20" style={{ background: coverSrc ? `url(${coverSrc}) center/cover` : undefined }} />
        <div className="relative flex items-end gap-6">
          <div
            className="rounded-2xl overflow-hidden flex-shrink-0 shadow-xl"
            style={{ width: 120, height: 120, background: artistTracks[0]?.coverColor ?? "var(--surface2)" }}
          >
            {coverSrc && <img src={coverSrc} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--muted)" }}>Artist</p>
            <h1 className="text-4xl font-black" style={{ color: "var(--foreground)" }}>{name}</h1>
            <div className="flex items-center gap-4 mt-3 text-sm" style={{ color: "var(--muted)" }}>
              <span className="flex items-center gap-1"><Users size={13} />{formatPlays(totalPlays)} total plays</span>
              <span>{artistTracks.length} track{artistTracks.length !== 1 ? "s" : ""}</span>
              <span>{totalDuration(artistTracks)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bio */}
      {bio && (
        <div className="max-w-7xl mx-auto px-8 mt-6">
          <p className="max-w-2xl text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{bio}</p>
        </div>
      )}

      {/* Tracks */}
      <div className="max-w-7xl mx-auto px-4 mt-6">
        <TrackList tracks={artistTracks} />
      </div>
    </div>
  );
}
