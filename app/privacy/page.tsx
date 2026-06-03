import { PageShell } from "@/components/PageShell";

export default function PrivacyPage() {
  return (
    <>
      <PageShell eyebrow="Legal" title="Privacy Policy">
        How ShemenMusic collects, uses, and protects your information.
      </PageShell>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex flex-col gap-6 text-sm leading-relaxed" style={{ color: "var(--foreground)" }}>
          <section>
            <h2 className="font-bold text-base mb-2">1. Information We Collect</h2>
            <p style={{ color: "var(--muted)" }}>We collect information you provide directly, such as your name and email when you register. We also collect usage data including tracks played and preferences to improve your experience.</p>
          </section>
          <section>
            <h2 className="font-bold text-base mb-2">2. How We Use Your Information</h2>
            <p style={{ color: "var(--muted)" }}>Your information is used to provide and improve our service, personalize your experience, and communicate with you about updates and new content.</p>
          </section>
          <section>
            <h2 className="font-bold text-base mb-2">3. Cookies</h2>
            <p style={{ color: "var(--muted)" }}>ShemenMusic uses cookies and similar technologies to remember your preferences, including liked tracks and playback position. These are stored locally on your device.</p>
          </section>
          <section>
            <h2 className="font-bold text-base mb-2">4. Data Sharing</h2>
            <p style={{ color: "var(--muted)" }}>We do not sell or share your personal data with third parties for marketing purposes. We may share anonymized usage statistics to improve our service.</p>
          </section>
          <section>
            <h2 className="font-bold text-base mb-2">5. Your Rights</h2>
            <p style={{ color: "var(--muted)" }}>You have the right to access, correct, or delete your personal data. Contact us at contact@shemenmusic.com to exercise these rights.</p>
          </section>
          <p className="text-xs" style={{ color: "var(--muted)" }}>Last updated: 2024. @2024 ShemenMusic.</p>
        </div>
      </div>
    </>
  );
}
