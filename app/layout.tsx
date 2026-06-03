import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import MusicPlayer from "@/components/MusicPlayer";
import { PlayerProvider } from "@/components/MusicPlayerContext";
import { SearchProvider } from "@/components/SearchContext";
import SearchOverlay from "@/components/SearchOverlay";
import { LikesProvider } from "@/components/LikesContext";
import { SessionRestore } from "@/components/SessionRestore";

export const metadata: Metadata = {
  title: "ShemenMusic — Church Music & Instrumentals",
  description: "Worship music, praise instrumentals, and gospel tracks from Shemen Music.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <PlayerProvider>
          <LikesProvider>
          <SearchProvider>
            <div style={{ display: "flex", minHeight: "100vh" }}>
              <Sidebar />
              <div style={{ flex: 1, marginLeft: "192px", marginBottom: "80px", minWidth: 0 }}>
                <TopBar />
                <main style={{ paddingTop: "64px" }}>{children}</main>
              </div>
            </div>
            <SessionRestore />
            <SearchOverlay />
            <MusicPlayer />
          </SearchProvider>
          </LikesProvider>
        </PlayerProvider>
      </body>
    </html>
  );
}
