import { CollectionCover } from "@/components/CollectionCover";
import Link from "next/link";
import { playlists } from "@/lib/data";

export default function PlaylistsPage() {
  return (
    <div className="ref-page">
      <h1 className="ref-title">Playlists</h1>
      <div className="ref-card-grid mt-10">
        {playlists.map((playlist) => (
          <Link
            key={playlist.id}
            href={`/playlists/${playlist.id}`}
            className="ref-card block"
          >
            <CollectionCover playlist={playlist} />
            <div className="ref-card-body">
              <span className="ref-card-title">{playlist.title}</span>
              <span className="ref-card-subtitle">{playlist.curator}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
