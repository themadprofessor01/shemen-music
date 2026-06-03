"use client";

import { useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, X } from "lucide-react";
import { usePlayer } from "@/components/MusicPlayerContext";
import Image from "next/image";


export default function MusicPlayer() {
  const { currentTrack, isPlaying, play, pause } = usePlayer();
  const [volume, setVolume] = useState(80);
  const [progress, setProgress] = useState(0);
  const [muted, setMuted] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  if (!currentTrack || dismissed) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-4 z-50 px-4"
    >
      <div
        className="mx-auto flex max-w-5xl flex-col gap-3 rounded-[1.6rem] border px-4 py-3 sm:flex-row sm:items-center sm:gap-5"
        style={{
          background: "rgba(255,253,250,0.78)",
          borderColor: "rgba(231,223,209,0.88)",
          boxShadow: "0 24px 70px rgba(12,24,35,0.2)",
          backdropFilter: "blur(24px)",
        }}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <Image src={currentTrack.imageUrl} alt="" width={52} height={52} className="h-[52px] w-[52px] rounded-2xl object-cover shadow-lg" />
          <div className="min-w-0">
            <p className="text-sm font-black truncate" style={{ color: "var(--foreground)" }}>{currentTrack.title}</p>
            <p className="text-xs truncate" style={{ color: "var(--muted)" }}>{currentTrack.artist}</p>
            <div className="mt-2 hidden sm:flex items-end gap-1">
              {Array.from({ length: 24 }).map((_, index) => (
                <span
                  key={index}
                  className="w-1 rounded-full"
                  style={{
                    height: 5 + ((index * 7) % 18),
                    background: index * 4 < progress ? "var(--premium)" : "rgba(12,24,35,0.13)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 sm:flex-shrink-0">
          <div className="flex items-center gap-4">
            <button className="opacity-50 hover:opacity-100 transition-opacity" style={{ color: "var(--foreground)" }} aria-label="Previous track">
              <SkipBack size={18} />
            </button>
            <button
              onClick={() => (isPlaying ? pause() : play(currentTrack))}
              className="w-11 h-11 rounded-full flex items-center justify-center transition-opacity hover:opacity-90"
              style={{ background: "linear-gradient(135deg, var(--ink), var(--blue-deep))", boxShadow: "0 14px 28px rgba(12,24,35,0.24)" }}
              aria-label={isPlaying ? "Pause track" : "Play track"}
            >
              {isPlaying ? <Pause size={16} className="text-white" /> : <Play size={16} className="text-white" style={{ marginLeft: 2 }} />}
            </button>
            <button className="opacity-50 hover:opacity-100 transition-opacity" style={{ color: "var(--foreground)" }} aria-label="Next track">
              <SkipForward size={18} />
            </button>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-64 max-w-full">
            <span className="text-xs w-7 text-right" style={{ color: "var(--muted)" }}>0:00</span>
            <input
              type="range"
              min={0}
              max={100}
              value={progress}
              onChange={(e) => setProgress(Number(e.target.value))}
              className="flex-1"
            />
            <span className="text-xs w-7" style={{ color: "var(--muted)" }}>{currentTrack.duration}</span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 flex-shrink-0">
          <button onClick={() => setMuted((m) => !m)} className="opacity-60 hover:opacity-100 transition-opacity" style={{ color: "var(--foreground)" }} aria-label={muted ? "Unmute" : "Mute"}>
            {muted ? <VolumeX size={17} /> : <Volume2 size={17} />}
          </button>
          <input
            type="range"
            min={0}
            max={100}
            value={muted ? 0 : volume}
            onChange={(e) => { setVolume(Number(e.target.value)); setMuted(false); }}
            className="w-20 hidden sm:block"
          />
          <button onClick={() => setDismissed(true)} className="opacity-35 hover:opacity-80 transition-opacity ml-1" style={{ color: "var(--foreground)" }} aria-label="Close player">
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
