import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import MusicPlayer from "@/components/MusicPlayer";
import MobileNav from "@/components/MobileNav";
import { PlayerProvider } from "@/components/MusicPlayerContext";
import { SearchProvider } from "@/components/SearchContext";
import SearchOverlay from "@/components/SearchOverlay";
import { LikesProvider } from "@/components/LikesContext";
import { SessionRestore } from "@/components/SessionRestore";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "ShemenMusic — Church Music & Instrumentals",
  description: "Worship music, praise instrumentals, and gospel tracks from Shemen Music.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <PlayerProvider>
          <LikesProvider>
            <SearchProvider>
              <div className="flex min-h-screen">
                {/* Sidebar — hidden on mobile, visible md+ */}
                <Sidebar />

                {/* Main content — no left margin on mobile, 192px on md+ */}
                <div className="flex-1 min-w-0 md:ml-48 mb-16 md:mb-20">
                  <TopBar />
                  <main className="pt-16">{children}</main>
                </div>
              </div>

              <SessionRestore />
              <SearchOverlay />
              <MusicPlayer />

              {/* Bottom nav — visible on mobile only */}
              <MobileNav />
            </SearchProvider>
          </LikesProvider>
        </PlayerProvider>
      </body>
    </html>
  );
}
