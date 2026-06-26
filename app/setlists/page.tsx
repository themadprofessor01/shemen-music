"use client";

import { useState, useEffect, useRef } from "react";
import { Plus, Play, Trash2, ChevronUp, ChevronDown, X, ListMusic, Search } from "lucide-react";
import { tracks as allTracks, cleanTitle, type Track } from "@/lib/data";
import { usePlayer } from "@/components/MusicPlayerContext";

interface Setlist {
  id: string;
  name: string;
  trackIds: string[];
  createdAt: number;
}

const STORAGE_KEY = "shemen-setlists";

function loadSetlists(): Setlist[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function saveSetlists(lists: Setlist[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lists));
}

const trackMap = new Map(allTracks.map((t) => [t.id, t]));

export default function SetlistsPage() {
  const { play, setQueue } = usePlayer();
  const [setlists, setSetlists] = useState<Setlist[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState("");
  const [search, setSearch] = useState("");
  const nameInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setSetlists(loadSetlists());
  }, []);

  const activeSetlist = setlists.find((s) => s.id === activeId) ?? null;

  function createSetlist() {
    if (!newName.trim()) return;
    const next: Setlist = {
      id: Date.now().toString(),
      name: newName.trim(),
      trackIds: [],
      createdAt: Date.now(),
    };
    const updated = [...setlists, next];
    setSetlists(updated);
    saveSetlists(updated);
    setActiveId(next.id);
    setNewName("");
    setCreating(false);
  }

  function deleteSetlist(id: string) {
    const updated = setlists.filter((s) => s.id !== id);
    setSetlists(updated);
    saveSetlists(updated);
    if (activeId === id) setActiveId(null);
  }

  function updateActive(updater: (s: Setlist) => Setlist) {
    setSetlists((prev) => {
      const next = prev.map((s) => (s.id === activeId ? updater(s) : s));
      saveSetlists(next);
      return next;
    });
  }

  function addTrack(trackId: string) {
    if (!activeSetlist) return;
    if (activeSetlist.trackIds.includes(trackId)) return;
    updateActive((s) => ({ ...s, trackIds: [...s.trackIds, trackId] }));
  }

  function removeTrack(trackId: string) {
    updateActive((s) => ({ ...s, trackIds: s.trackIds.filter((id) => id !== trackId) }));
  }

  function moveTrack(index: number, dir: -1 | 1) {
    if (!activeSetlist) return;
    const arr = [...activeSetlist.trackIds];
    const swapIdx = index + dir;
    if (swapIdx < 0 || swapIdx >= arr.length) return;
    [arr[index], arr[swapIdx]] = [arr[swapIdx], arr[index]];
    updateActive((s) => ({ ...s, trackIds: arr }));
  }

  function playSetlist(setlist: Setlist) {
    const tracksToPlay = setlist.trackIds
      .map((id) => trackMap.get(id))
      .filter(Boolean) as Track[];
    if (!tracksToPlay.length) return;
    setQueue(tracksToPlay);
    play(tracksToPlay[0]);
  }

  const searchResults = search.length > 0
    ? allTracks.filter(
        (t) =>
          cleanTitle(t.title).toLowerCase().includes(search.toLowerCase()) ||
          (t.artist ?? "").toLowerCase().includes(search.toLowerCase())
      )
    : allTracks;

  return (
    <div className="min-h-screen" style={{ color: "var(--foreground)" }}>
      {/* Header */}
      <div className="px-6 py-8 border-b" style={{ borderColor: "var(--border)" }}>
        <div className="flex items-center gap-3 mb-1">
          <ListMusic size={24} style={{ color: "var(--accent)" }} />
          <h1 className="text-2xl font-black">Setlists</h1>
        </div>
        <p className="text-sm" style={{ color: "var(--muted)" }}>Build ordered playlists for services & events</p>
      </div>

      <div className="flex min-h-[calc(100vh-120px)]">
        {/* Sidebar — setlist list */}
        <div
          className="w-56 flex-shrink-0 border-r p-4 flex flex-col gap-2"
          style={{ borderColor: "var(--border)" }}
        >
          {setlists.map((s) => (
            <div key={s.id} className="group flex items-center gap-1">
              <button
                onClick={() => setActiveId(s.id)}
                className="flex-1 text-left text-sm px-3 py-2 rounded-lg transition-colors truncate"
                style={{
                  background: s.id === activeId ? "var(--accent-dim)" : "transparent",
                  color: s.id === activeId ? "var(--accent)" : "var(--foreground)",
                  fontWeight: s.id === activeId ? 700 : 400,
                }}
              >
                {s.name}
                <span className="ml-1 text-xs opacity-40">({s.trackIds.length})</span>
              </button>
              <button
                onClick={() => deleteSetlist(s.id)}
                className="opacity-0 group-hover:opacity-50 hover:!opacity-100 transition-opacity p-1 flex-shrink-0"
                style={{ color: "var(--foreground)" }}
                aria-label="Delete setlist"
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))}

          {creating ? (
            <form
              onSubmit={(e) => { e.preventDefault(); createSetlist(); }}
              className="flex flex-col gap-2"
            >
              <input
                ref={nameInputRef}
                autoFocus
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Setlist name…"
                className="px-3 py-2 text-sm rounded-lg border"
                style={{
                  background: "var(--surface2)",
                  borderColor: "var(--border)",
                  color: "var(--foreground)",
                  outline: "none",
                }}
              />
              <div className="flex gap-1">
                <button
                  type="submit"
                  className="flex-1 text-xs py-1.5 rounded-lg font-bold"
                  style={{ background: "var(--accent)", color: "white" }}
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={() => { setCreating(false); setNewName(""); }}
                  className="px-2 py-1.5 rounded-lg text-xs"
                  style={{ background: "var(--surface2)", color: "var(--foreground)" }}
                >
                  <X size={12} />
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setCreating(true)}
              className="flex items-center gap-1.5 text-sm px-3 py-2 rounded-lg transition-colors"
              style={{ color: "var(--accent)" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--accent-dim)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <Plus size={14} /> New Setlist
            </button>
          )}
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col md:flex-row min-w-0">
          {activeSetlist ? (
            <>
              {/* Track order */}
              <div className="flex-1 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-black">{activeSetlist.name}</h2>
                    <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
                      {activeSetlist.trackIds.length} track{activeSetlist.trackIds.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                  {activeSetlist.trackIds.length > 0 && (
                    <button
                      onClick={() => playSetlist(activeSetlist)}
                      className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold"
                      style={{ background: "#0c1823", color: "white" }}
                    >
                      <Play size={14} /> Play All
                    </button>
                  )}
                </div>

                {activeSetlist.trackIds.length === 0 ? (
                  <div
                    className="border-2 border-dashed rounded-2xl p-12 text-center"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <ListMusic size={32} className="mx-auto mb-3" style={{ color: "var(--muted)" }} />
                    <p className="text-sm" style={{ color: "var(--muted)" }}>
                      Search for tracks on the right to add them here
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-1">
                    {activeSetlist.trackIds.map((trackId, idx) => {
                      const track = trackMap.get(trackId);
                      if (!track) return null;
                      const cover = track.coverImage || track.imageUrl;
                      return (
                        <div
                          key={trackId}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
                          style={{ background: "var(--surface2)" }}
                        >
                          <span className="text-xs w-5 text-right flex-shrink-0" style={{ color: "var(--muted)" }}>
                            {idx + 1}
                          </span>
                          <div style={{ width: 32, height: 32, borderRadius: 6, overflow: "hidden", flexShrink: 0 }}>
                            {cover
                              ? <img src={cover} alt="" style={{ width: 32, height: 32, objectFit: "cover" }} />
                              : <div style={{ width: 32, height: 32, background: track.coverColor }} />
                            }
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium truncate" style={{ color: "var(--foreground)" }}>
                              {cleanTitle(track.title)}
                            </p>
                            <p className="text-xs truncate" style={{ color: "var(--muted)" }}>{track.artist}</p>
                          </div>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <button
                              onClick={() => moveTrack(idx, -1)}
                              disabled={idx === 0}
                              style={{ color: "var(--muted)", opacity: idx === 0 ? 0.2 : 0.6, padding: 2 }}
                            >
                              <ChevronUp size={14} />
                            </button>
                            <button
                              onClick={() => moveTrack(idx, 1)}
                              disabled={idx === activeSetlist.trackIds.length - 1}
                              style={{
                                color: "var(--muted)",
                                opacity: idx === activeSetlist.trackIds.length - 1 ? 0.2 : 0.6,
                                padding: 2,
                              }}
                            >
                              <ChevronDown size={14} />
                            </button>
                            <button
                              onClick={() => removeTrack(trackId)}
                              style={{ color: "var(--muted)", opacity: 0.5, padding: 2 }}
                              aria-label="Remove from setlist"
                            >
                              <X size={13} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Track search / add */}
              <div
                className="w-72 flex-shrink-0 border-l p-4"
                style={{ borderColor: "var(--border)" }}
              >
                <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "var(--muted)" }}>
                  Add Tracks
                </p>
                <div className="relative mb-3">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--muted)" }} />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search tracks…"
                    className="w-full pl-8 pr-3 py-2 text-sm rounded-lg border"
                    style={{
                      background: "var(--surface2)",
                      borderColor: "var(--border)",
                      color: "var(--foreground)",
                      outline: "none",
                    }}
                  />
                </div>
                <div className="flex flex-col gap-0.5 overflow-y-auto" style={{ maxHeight: "60vh" }}>
                  {searchResults.map((track) => {
                    const added = activeSetlist.trackIds.includes(track.id);
                    const cover = track.coverImage || track.imageUrl;
                    return (
                      <button
                        key={track.id}
                        onClick={() => addTrack(track.id)}
                        disabled={added}
                        className="flex items-center gap-2.5 px-2 py-2 rounded-lg text-left transition-colors w-full"
                        style={{
                          background: added ? "var(--accent-dim)" : "transparent",
                          opacity: added ? 0.6 : 1,
                          cursor: added ? "default" : "pointer",
                        }}
                        onMouseEnter={(e) => { if (!added) (e.currentTarget as HTMLElement).style.background = "var(--surface2)"; }}
                        onMouseLeave={(e) => { if (!added) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                      >
                        <div style={{ width: 28, height: 28, borderRadius: 5, overflow: "hidden", flexShrink: 0 }}>
                          {cover
                            ? <img src={cover} alt="" style={{ width: 28, height: 28, objectFit: "cover" }} />
                            : <div style={{ width: 28, height: 28, background: track.coverColor }} />
                          }
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-medium truncate" style={{ color: "var(--foreground)" }}>
                            {cleanTitle(track.title)}
                          </p>
                          <p className="text-xs truncate" style={{ color: "var(--muted)" }}>{track.artist}</p>
                        </div>
                        {added && (
                          <span className="text-xs flex-shrink-0" style={{ color: "var(--accent)" }}>✓</span>
                        )}
                      </button>
                    );
                  })}
                  {search.length > 0 && searchResults.length === 0 && (
                    <p className="text-xs text-center py-4" style={{ color: "var(--muted)" }}>No results</p>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center p-8 text-center">
              <div>
                <ListMusic size={48} className="mx-auto mb-4" style={{ color: "var(--muted)", opacity: 0.3 }} />
                <p className="text-sm" style={{ color: "var(--muted)" }}>
                  {setlists.length === 0
                    ? "Create your first setlist using the button on the left"
                    : "Select a setlist to view and edit it"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
