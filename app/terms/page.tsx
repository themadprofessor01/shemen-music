import { PageShell } from "@/components/PageShell";

export default function TermsPage() {
  return (
    <>
      <PageShell eyebrow="Legal" title="Terms & Services">
        Please read these terms carefully before using ShemenMusic.
      </PageShell>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="prose prose-sm max-w-none flex flex-col gap-6 text-sm leading-relaxed" style={{ color: "var(--foreground)" }}>
          <section>
            <h2 className="font-bold text-base mb-2">1. Acceptance of Terms</h2>
            <p style={{ color: "var(--muted)" }}>By accessing and using ShemenMusic, you accept and agree to be bound by the terms and provisions of this agreement. This platform is provided for personal, non-commercial use.</p>
          </section>
          <section>
            <h2 className="font-bold text-base mb-2">2. Use of Content</h2>
            <p style={{ color: "var(--muted)" }}>All music, recordings, and media available on ShemenMusic are for personal devotional and ministry use only. Redistribution, resale, or commercial licensing requires written permission from the respective copyright holders.</p>
          </section>
          <section>
            <h2 className="font-bold text-base mb-2">3. Downloads</h2>
            <p style={{ color: "var(--muted)" }}>Downloads provided through this platform are for personal, non-commercial ministry use. You may not redistribute downloaded files without explicit written permission from ShemenMusic or the relevant rights holders.</p>
          </section>
          <section>
            <h2 className="font-bold text-base mb-2">4. Account Responsibility</h2>
            <p style={{ color: "var(--muted)" }}>You are responsible for maintaining the confidentiality of your account credentials. ShemenMusic reserves the right to terminate accounts that violate these terms.</p>
          </section>
          <section>
            <h2 className="font-bold text-base mb-2">5. Intellectual Property</h2>
            <p style={{ color: "var(--muted)" }}>All content on ShemenMusic, including but not limited to music recordings, artwork, and text, is owned by or licensed to ShemenMusic and is protected by applicable copyright laws.</p>
          </section>
          <section>
            <h2 className="font-bold text-base mb-2">6. Contact</h2>
            <p style={{ color: "var(--muted)" }}>For questions regarding these terms, contact us at <a href="mailto:contact@shemenmusic.com" className="underline">contact@shemenmusic.com</a>.</p>
          </section>
          <p className="text-xs" style={{ color: "var(--muted)" }}>@2024 ShemenMusic. All Rights Reserved.</p>
        </div>
      </div>
    </>
  );
}
