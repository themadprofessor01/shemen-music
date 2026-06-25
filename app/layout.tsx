import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import MusicPlayer from "@/components/MusicPlayer";
import { PlayerProvider } from "@/components/MusicPlayerContext";
import { SearchProvider } from "@/components/SearchContext";
import SearchOverlay from "@/components/SearchOverlay";
import { LikesProvider } from "@/components/LikesContext";
import { SessionRestore } from "@/components/SessionRestore";
import { KeyboardShortcuts } from "@/components/KeyboardShortcuts";
import IntroAnimation from "@/components/IntroAnimation";
import DynamicColorAtmosphere from "@/components/DynamicColorAtmosphere";
import AmbientScreensaver from "@/components/AmbientScreensaver";
import FloatingMiniPlayer from "@/components/FloatingMiniPlayer";
import { tracks } from "@/lib/data";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

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
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Establish connections to audio/image origin early */}
        <link rel="preconnect" href="https://shemenmusic.com" />
        <link rel="dns-prefetch" href="https://shemenmusic.com" />
      </head>
      <body className={inter.className}>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: `(function(){try{if(localStorage.getItem('theme')==='dark')document.documentElement.classList.add('dark');}catch(e){}})()` }}
        />
        <PlayerProvider>
          <LikesProvider>
            <SearchProvider>
              {/* Intro animation — plays on every page load */}
              <IntroAnimation />

              {/* Dynamic color atmosphere from current track */}
              <DynamicColorAtmosphere />

              {/* Ambient screensaver after 30s idle while playing */}
              <AmbientScreensaver />

              {/* Floating mini player appears when user scrolls down */}
              <FloatingMiniPlayer />

              <div className="flex min-h-screen" style={{ position: "relative", zIndex: 1 }}>
                {/* Sidebar — hidden on mobile, visible md+ */}
                <Sidebar />

                {/* Main content — no left margin on mobile, 192px on md+ */}
                <div className="flex-1 min-w-0 md:ml-48 mb-16 md:mb-20">
                  <TopBar />
                  <main className="pt-16">{children}</main>
                </div>
              </div>

              <KeyboardShortcuts />
              <SessionRestore tracks={tracks} />
              <SearchOverlay tracks={tracks} />
              <MusicPlayer />
            </SearchProvider>
          </LikesProvider>
        </PlayerProvider>
        <Analytics />
      </body>
    </html>
  );
}
