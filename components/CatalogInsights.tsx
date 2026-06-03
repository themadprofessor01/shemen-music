import { Activity, Download, Music2, Timer, Users } from "lucide-react";
import { formatPlays, totalDuration, type Track } from "@/lib/data";
import type { ReactNode } from "react";

export function CatalogInsights({ tracks, label = "Catalogue intelligence" }: { tracks: Track[]; label?: string }) {
  const totalPlays = tracks.reduce((sum, track) => sum + track.plays, 0);
  const downloads = tracks.filter((track) => track.downloadUrl).length;
  const artists = new Set(tracks.map((track) => track.artist)).size;

  return (
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <InsightCard icon={<Activity size={17} />} value={formatPlays(totalPlays)} label="Plays" detail={label} />
      <InsightCard icon={<Timer size={17} />} value={totalDuration(tracks)} label="Runtime" detail="Service-ready flow" />
      <InsightCard icon={<Download size={17} />} value={`${downloads}`} label="Downloads" detail="Direct file access" />
      <InsightCard icon={<Users size={17} />} value={`${artists}`} label="Artists" detail="Reference archive spread" />
    </section>
  );
}

function InsightCard({ icon, value, label, detail }: { icon: ReactNode; value: string; label: string; detail: string }) {
  return (
    <div className="rounded-[1.4rem] border p-4" style={{ background: "rgba(255,253,250,0.76)", borderColor: "var(--border)", boxShadow: "0 14px 34px rgba(33,26,16,0.07)" }}>
      <div className="flex items-center justify-between gap-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl text-[var(--premium)]" style={{ background: "var(--premium-soft)" }}>
          {icon}
        </span>
        <Music2 size={15} className="text-[var(--foreground-muted)] opacity-50" />
      </div>
      <p className="mt-5 text-2xl font-black tracking-tight">{value}</p>
      <p className="font-bold">{label}</p>
      <p className="mt-2 text-xs font-semibold text-[var(--muted)]">{detail}</p>
    </div>
  );
}
