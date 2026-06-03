"use client";

import { Heart } from "lucide-react";
import { useLikes } from "@/components/LikesContext";

export function LikeButton({ trackId, size = 15 }: { trackId: string; size?: number }) {
  const { isLiked, toggle } = useLikes();
  const liked = isLiked(trackId);

  return (
    <button
      onClick={(e) => { e.stopPropagation(); toggle(trackId); }}
      className="transition-transform hover:scale-110 active:scale-95"
      aria-label={liked ? "Unlike" : "Like"}
      style={{ color: liked ? "#e53e3e" : "var(--muted)", lineHeight: 1 }}
    >
      <Heart
        size={size}
        fill={liked ? "#e53e3e" : "none"}
        strokeWidth={liked ? 0 : 1.8}
      />
    </button>
  );
}
