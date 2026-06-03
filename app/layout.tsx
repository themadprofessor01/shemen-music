import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import MusicPlayer from "@/components/MusicPlayer";
import { PlayerProvider } from "@/components/MusicPlayerContext";
import { LikesProvider } from "@/components/LikesContext";
import { SessionRestore } from "@/components/SessionRestore";
import { LuxuryFooter } from "@/components/LuxuryFooter";

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
            <div className="app-shell">
              <Sidebar />
              <div className="app-content">
                <TopBar />
                <main className="app-main">{children}</main>
                <LuxuryFooter />
              </div>
            </div>
            <SessionRestore />
            <MusicPlayer />
          </LikesProvider>
        </PlayerProvider>
      </body>
    </html>
  );
}
