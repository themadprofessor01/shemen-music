import Link from "next/link";
import { Download } from "lucide-react";
import { PageShell } from "@/components/PageShell";

const offers = [
  {
    title: "Instrumental Tracks",
    text: "Download all official instrumental tracks in one place for rehearsal, worship, and ministry use.",
    href: "https://www.mediafire.com/file/0yk2rux4tfb7tmi/ALL_OFFICIAL_INSTRUMENTALS.zip/file",
  },
  {
    title: "Praise & Worship",
    text: "A large folder of praise and worship tracks prepared for church teams and personal devotion.",
    href: "https://www.mediafire.com/folder/72nebmytof0mv/Worship527Tracks",
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
          <div key={offer.title} className="luxury-hover-card rounded-[2rem] p-8" style={{ background: "var(--surface2)", border: "1px solid var(--border)", boxShadow: "var(--shadow-card)" }}>
            <div className="flex h-12 w-12 items-center justify-center rounded-full" style={{ background: "var(--premium-soft)", color: "var(--premium)" }}>
              <Download size={19} />
            </div>
            <p className="mt-6 text-sm font-bold uppercase tracking-[0.16em] text-[var(--premium)]">Download All</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight">{offer.title}</h2>
            <p className="mt-5 min-h-20 leading-7 text-[var(--muted)]">{offer.text}</p>
            <p className="mt-8 text-4xl font-black">Free</p>
            <a
              href={offer.href}
              className="mt-8 inline-flex rounded-full px-6 py-3 text-sm font-bold text-white"
              style={{ background: "linear-gradient(135deg, var(--ink), var(--blue-deep))" }}
            >
              Download Now
            </a>
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
