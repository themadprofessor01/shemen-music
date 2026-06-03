import type { Playlist } from "@/lib/data";

export function CollectionCover({ playlist }: { playlist: Playlist }) {
  return (
    <div className="ref-card-art">
      <div
        className="h-full w-full"
        style={{
          background:
            playlist.coverColor === "placeholder"
              ? "#dfe2e5"
              : `linear-gradient(135deg, ${playlist.coverColor}, #d9d2df 58%, #efe9e2)`,
        }}
      >
        {playlist.coverColor !== "placeholder" && (
          <div className="flex h-full flex-col justify-between p-4">
            <div className="max-w-[9rem] rounded-md bg-white/36 px-2 py-1 text-2xl font-black uppercase leading-none tracking-tight text-[#111]">
              {playlist.title.split(" ").slice(0, 2).join(" ")}
            </div>
            <p className="text-xs font-bold uppercase text-black/72">Official Instrumental</p>
          </div>
        )}
      </div>
    </div>
  );
}
