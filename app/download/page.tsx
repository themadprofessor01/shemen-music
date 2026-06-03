import Link from "next/link";

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
    <div className="ref-page">
      <h1 className="ref-title">Download Everything</h1>
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {offers.map((offer) => (
          <div key={offer.title} className="rounded border bg-white p-8" style={{ borderColor: "var(--border)" }}>
            <p className="text-sm font-semibold text-[var(--muted)]">Download All</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight">{offer.title}</h2>
            <p className="mt-5 min-h-20 leading-7 text-[var(--muted)]">{offer.text}</p>
            <p className="mt-8 text-4xl font-black">Free</p>
            <a
              href={offer.href}
              className="mt-8 inline-flex rounded-full border px-6 py-3 text-sm font-bold"
              style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
            >
              Download Now
            </a>
          </div>
        ))}
      </div>
      <div className="mt-10 text-sm text-[var(--muted)]">
        <Link href="/terms">Service Terms</Link>
        <span> - </span>
        <Link href="/privacy">Cookie Warnings</Link>
      </div>
    </div>
  );
}
