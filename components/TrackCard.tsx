"use client";

import Link from "next/link";
import { Download, MoreVertical, Pause, Play, Plus, Users } from "lucide-react";
import { CoverImage } from "@/components/CoverImage";
import { Equalizer } from "@/components/Equalizer";
import { LikeButton } from "@/components/LikeButton";
import { ShareButton } from "@/components/ShareButton";
import { usePlayer } from "@/components/MusicPlayerContext";
import type { Track } from "@/lib/data";
import { formatPlays, getStationSlug, slugifyArtist } from "@/lib/data";

function stationHref(track: Track) {
  const slug = getStationSlug(track);
  return slug ? `/station/${slug}` : "/instrumentals";
}

function artistHref(track: Track) {
  return `/artist/${slugifyArtist(track.artist.split("&")[0].trim())}`;
}

function CoverArt({ track }: { track: Track }) {
  return (
    <CoverImage
      src={track.coverImage || track.imageUrl}
      alt={track.title}
      coverColor={track.coverColor}
      size={300}
    />
  );
}

export function TrackCardLarge({ track }: { track: Track }) {
  const { currentTrack, isPlaying, toggle, setQueue } = usePlayer();
  const active = currentTrack?.id === track.id;

  function playTrack(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    setQueue([track]);
    toggle(track);
  }

  return (
    <Link href={stationHref(track)} className="ref-card group block">
      <div className="ref-card-art">
        <CoverArt track={track} />
        <button className="ref-play-overlay" onClick={playTrack} aria-label={`${active && isPlaying ? "Pause" : "Play"} ${track.title}`}>
          <span className="ref-icon-button ref-play-button">
            {active && isPlaying ? <Pause size={17} /> : <Play size={17} style={{ marginLeft: 2 }} />}
          </span>
        </button>
      </div>
      <div className="ref-card-body">
        <span className="ref-card-title">{track.title}</span>
        <span className="ref-card-subtitle">{track.artist}</span>
      </div>
    </Link>
  );
}

export function TrackCardGrid({ track }: { track: Track }) {
  return <TrackCardLarge track={track} />;
}

export function TrackRow({ track, index }: { track: Track; index: number }) {
  const { currentTrack, isPlaying, toggle, setQueue } = usePlayer();
  const active = currentTrack?.id === track.id;

  function handlePlay(event: React.MouseEvent) {
    event.stopPropagation();
    setQueue([track]);
    toggle(track);
  }

  return (
    <div className="group grid grid-cols-[28px_30px_1fr_auto] items-center gap-4 border-t px-3 py-3 first:border-t-0" style={{ borderColor: "var(--border)" }}>
      <span className="text-center text-sm text-[var(--muted)]">{index + 1}</span>
      <button className="ref-icon-button text-[var(--muted)]" onClick={handlePlay} aria-label={`${active && isPlaying ? "Pause" : "Play"} ${track.title}`}>
        {active && isPlaying ? <Equalizer trackId={track.id} size={16} /> : <Plus size={18} />}
      </button>
      <div className="min-w-0">
        <Link href={stationHref(track)} className="block truncate text-base font-medium text-[var(--foreground)]">
          {track.title}
        </Link>
        <Link href={artistHref(track)} className="block truncate text-sm text-[var(--muted)]">
          {track.artist}
        </Link>
      </div>
      <div className="flex items-center gap-5 text-sm text-[var(--muted)]">
        <a href={track.downloadUrl ?? "#"} aria-label={`Download ${track.title}`} className="hidden sm:inline-flex">
          <Download size={15} />
        </a>
        <LikeButton trackId={track.id} size={16} />
        <ShareButton track={track} size={15} />
        <span className="hidden items-center gap-1 md:inline-flex"><Users size={13} />{formatPlays(track.plays)}</span>
        <span className="w-10 text-right">{track.duration}</span>
        <MoreVertical size={15} className="hidden sm:block" />
      </div>
    </div>
  );
}
