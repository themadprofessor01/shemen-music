"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "shemen_liked_tracks";

type LikesState = {
  liked: Set<string>;
  toggle: (id: string) => void;
  isLiked: (id: string) => boolean;
};

const LikesContext = createContext<LikesState>({
  liked: new Set(),
  toggle: () => {},
  isLiked: () => false,
});

export function LikesProvider({ children }: { children: React.ReactNode }) {
  const [liked, setLiked] = useState<Set<string>>(new Set());

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setLiked(new Set(JSON.parse(stored)));
    } catch {}
  }, []);

  const toggle = useCallback((id: string) => {
    setLiked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...next])); } catch {}
      return next;
    });
  }, []);

  const isLiked = useCallback((id: string) => liked.has(id), [liked]);

  return (
    <LikesContext.Provider value={{ liked, toggle, isLiked }}>
      {children}
    </LikesContext.Provider>
  );
}

export const useLikes = () => useContext(LikesContext);
