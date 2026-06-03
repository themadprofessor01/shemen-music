"use client";

import { notFound } from "next/navigation";
import { tracks, getStationSlug, formatPlays } from "@/lib/data";
import { usePlayer } from "@/components/MusicPlayerContext";
import { LikeButton } from "@/components/LikeButton";
import { ShareButton } from "@/components/ShareButton";
import { Equalizer } from "@/components/Equalizer";
import { Download, Play, Pause, Users, Clock, HardDrive } from "lucide-react";
import { use } from "react";

export default function StationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const track = tracks.find((t) => getStationSlug(t) === slug);
  if (!track) notFound();

  return <StationDetail slug={slug} />;
}

function StationDetail({ slug }: { slug: string }) {
  const track = tracks.find((t) => getStationSlug(t) === slug)!;
  const { currentTrack, isPlaying, toggle, setQueue } = usePlayer();
  const active = currentTrack?.id === track.id;
  const coverSrc = track.coverImage || track.imageUrl;

  function handlePlay() {
    setQueue(tracks);
    toggle(track);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row gap-8">
        {/* Cover art */}
        <div
          className="flex-shrink-0 rounded-2xl overflow-hidden shadow-xl"
          style={{ width: 240, height: 240, background: track.coverColor }}
        >
          {coverSrc && (
            <img src={coverSrc} alt={track.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--muted)" }}>
            {track.category === "worship" ? "Praise & Worship" : "Instrumental"}
          </p>
          <h1 className="text-3xl font-black leading-tight" style={{ color: "var(--foreground)" }}>{track.title}</h1>
          <p className="mt-2 text-lg" style={{ color: "var(--muted)" }}>{track.artist}</p>

          {/* Stats row */}
          <div className="flex items-center flex-wrap gap-4 mt-4 text-sm" style={{ color: "var(--muted)" }}>
            <span className="flex items-center gap-1"><Users size={14} />{formatPlays(track.plays)} plays</span>
            <span className="flex items-center gap-1"><Clock size={14} />{track.duration}</span>
            <span className="flex items-center gap-1"><HardDrive size={14} />{track.size}</span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center flex-wrap gap-3 mt-6">
            <button
              onClick={handlePlay}
              className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white transition-opacity hover:opacity-85"
              style={{ background: "linear-gradient(135deg, var(--ink), var(--blue-deep))" }}
            >
              {active && isPlaying
                ? <><Equalizer trackId={track.id} size={14} /> Pause</>
                : <><Play size={14} style={{ marginLeft: 1 }} /> Play</>
              }
            </button>
            {track.downloadUrl && (
              <a
                href={track.downloadUrl}
                className="flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition-opacity hover:opacity-85"
                style={{ background: "var(--surface2)", border: "1px solid var(--border)", color: "var(--foreground)" }}
              >
                <Download size={14} /> Download
              </a>
            )}
            <LikeButton trackId={track.id} size={18} />
            <ShareButton track={track} size={18} />
          </div>
        </div>
      </div>

      {/* Waveform placeholder */}
      <div className="mt-10 p-6 rounded-2xl" style={{ background: "var(--surface2)", border: "1px solid var(--border)" }}>
        <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--muted)" }}>Waveform</p>
        <div className="flex items-end gap-0.5 h-16">
          {Array.from({ length: 80 }, (_, i) => {
            const seed = track.id.split("").reduce((s, c) => s + c.charCodeAt(0), 0);
            const h = 8 + ((seed + i * 13) % 50);
            return (
              <span
                key={i}
                className="flex-1 rounded-sm"
                style={{ height: h, background: active && isPlaying ? "var(--accent)" : "rgba(12,24,35,0.18)" }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
