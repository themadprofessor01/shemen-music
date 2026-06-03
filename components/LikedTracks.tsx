"use client";

import { EmptyState } from "@/components/EmptyState";
import { TrackList } from "@/components/TrackList";
import { useLikes } from "@/components/LikesContext";
import { tracks } from "@/lib/data";

export function LikedTracks() {
  const { liked } = useLikes();
  const likedTracks = tracks.filter((track) => liked.has(track.id));

  if (!likedTracks.length) {
    return (
      <EmptyState eyebrow="Saved For Later" title="Your private collection is waiting." actionHref="/instrumentals" actionLabel="Find tracks to save">
        Tap the heart on any release to build a refined listening shelf for service prep, rehearsal, or quiet devotion.
      </EmptyState>
    );
  }

  return <TrackList tracks={likedTracks} />;
}
