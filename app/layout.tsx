import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import MusicPlayer from "@/components/MusicPlayer";
import { PlayerProvider } from "@/components/MusicPlayerContext";

export const metadata: Metadata = {
  title: "ShemenMusic — Church Music & Instrumentals",
  description: "Worship music, praise instrumentals, and gospel tracks from Shemen Music.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <PlayerProvider>
          <Navbar />
          <main className="pt-16 pb-28 min-h-screen">{children}</main>
          <MusicPlayer />
        </PlayerProvider>
      </body>
    </html>
  );
}
