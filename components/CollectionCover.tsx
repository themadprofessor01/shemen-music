import { Lock } from "lucide-react";
import type { Playlist } from "@/lib/data";

export function CollectionCover({ playlist }: { playlist: Playlist }) {
  return (
    <div
      className="aspect-square relative overflow-hidden"
      style={{
        background: `linear-gradient(145deg, ${playlist.coverColor}, #0c1823 72%)`,
      }}
    >
      <div className="absolute inset-0 opacity-55" style={{ background: "radial-gradient(circle at 24% 18%, rgba(255,253,250,0.36), transparent 13rem)" }} />
      <div className="absolute inset-5 rounded-[1.6rem] border border-white/24" />
      <div className="absolute left-5 top-5 right-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/62">ShemenMusic</p>
        <h3 className="mt-4 max-w-[10rem] text-2xl font-black leading-none tracking-tight text-white">{playlist.title}</h3>
      </div>
      <div className="absolute bottom-5 left-5 premium-pill inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em]">
        <Lock size={11} />
        Private Set
      </div>
      <div className="absolute bottom-5 right-5 text-right text-xs font-semibold text-white/62">
        <p>{playlist.trackCount}</p>
        <p>tracks</p>
      </div>
      <div className="luxury-hover-reveal absolute inset-x-5 bottom-16 translate-y-2 rounded-full border border-white/14 bg-white/10 px-3 py-2 text-center text-[10px] font-bold uppercase tracking-[0.16em] text-white/74 opacity-0 backdrop-blur transition-all">
        Preview collection
      </div>
    </div>
  );
}
