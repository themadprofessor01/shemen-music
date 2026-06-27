import type { Metadata } from "next";
import Link from "next/link";
import { Download } from "lucide-react";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Download Everything — ShemenMusic",
  description: "Download free worship instrumentals and praise tracks from ShemenMusic. Complete collections available for church teams, worship leaders, and personal ministry use.",
  openGraph: {
    title: "Download Everything — ShemenMusic",
    description: "Free worship instrumental and praise track collections for download.",
    url: "https://shemenmusic.com/download",
    siteName: "ShemenMusic",
    type: "website",
  },
  alternates: { canonical: "https://shemenmusic.com/download" },
};

const offers = [
  {
    title: "Instrumental Tracks",
    text: "Download all official instrumental tracks in one place for rehearsal, worship, and ministry use.",
    href: "https://www.mediafire.com/file/0yk2rux4tfb7tmi/ALL_OFFICIAL_INSTRUMENTALS.zip/file",
    gradient: "linear-gradient(135deg, #0c1823 0%, #123655 54%, #0b1520 100%)",
    glow: "radial-gradient(circle at 78% 18%, rgba(7, 93, 158, 0.45), transparent 18rem)",
    iconBg: "rgba(7, 93, 158, 0.28)",
    iconColor: "#7bbfea",
  },
  {
    title: "Praise & Worship",
    text: "A large folder of praise and worship tracks prepared for church teams and personal devotion.",
    href: "https://www.mediafire.com/folder/72nebmytof0mv/Worship527Tracks",
    gradient: "linear-gradient(135deg, #1a0e00 0%, #4a2a00 52%, #160b00 100%)",
    glow: "radial-gradient(circle at 28% 18%, rgba(230, 194, 119, 0.48), transparent 18rem)",
    iconBg: "rgba(230, 194, 119, 0.2)",
    iconColor: "#e6c277",
  },
];

export default function DownloadPage() {
  return (
    <>
      <PageShell eyebrow="Free archive" title="Download Everything">
        Official ShemenMusic instrumental and worship collections prepared for rehearsal, devotion, and ministry use.
      </PageShell>
      <div className="px-4 pb-14 sm:px-8 lg:px-14">
        <div className="grid gap-8 md:grid-cols-2">
        {offers.map((offer) => (
          <div key={offer.title} className="luxury-hover-card relative overflow-hidden rounded-[2rem] p-8" style={{ background: offer.gradient, boxShadow: "0 24px 70px rgba(12,24,35,0.22)" }}>
            <div className="absolute inset-0 pointer-events-none" style={{ background: offer.glow }} />
            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-full" style={{ background: offer.iconBg, color: offer.iconColor }}>
                <Download size={19} />
              </div>
              <p className="mt-6 text-sm font-bold uppercase tracking-[0.16em]" style={{ color: "#e6c277" }}>Download All</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-white">{offer.title}</h2>
              <p className="mt-5 min-h-20 leading-7" style={{ color: "rgba(255,255,255,0.62)" }}>{offer.text}</p>
              <p className="mt-8 text-4xl font-black text-white">Free</p>
              <a
                href={offer.href}
                className="mt-8 inline-flex rounded-full px-6 py-3 text-sm font-bold"
                style={{ background: "linear-gradient(135deg, #b68a3a, #d4a853)", color: "#0c1823" }}
              >
                Download Now
              </a>
            </div>
          </div>
        ))}
        </div>
        <div className="mt-10 text-sm font-semibold text-[var(--muted)]">
          <Link href="/terms">Service Terms</Link>
          <span> - </span>
          <Link href="/privacy">Cookie Warnings</Link>
        </div>
      </div>
    </>
  );
}
