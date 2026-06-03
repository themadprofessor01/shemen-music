import { PageShell } from "@/components/PageShell";

export const metadata = { title: "Privacy Policy – ShemenMusic" };

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-bold tracking-tight">{title}</h2>
      <div className="text-sm sm:text-base leading-7 space-y-3" style={{ color: "var(--foreground-muted)" }}>
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <PageShell eyebrow="Legal" title="Privacy Policy" />

      <div className="max-w-3xl mx-auto px-4 sm:px-8 lg:px-14 pb-20 space-y-10">
        {/* Intro */}
        <div
          className="rounded-2xl border p-6 sm:p-8 text-sm sm:text-base leading-7"
          style={{ background: "var(--surface)", borderColor: "var(--border)", color: "var(--foreground-muted)" }}
        >
          <p>
            Your privacy matters to us. This policy explains what information ShemenMusic collects, how it is used,
            and the choices you have regarding your data.
          </p>
        </div>

        <Section title="Who We Are">
          <p>
            ShemenMusic is a worship music platform dedicated to providing free instrumental and praise &amp; worship
            tracks to the global body of Christ. Our website address is{" "}
            <a
              href="https://shemenmusic.com"
              className="underline underline-offset-2 transition-opacity hover:opacity-70"
              style={{ color: "var(--accent)" }}
            >
              shemenmusic.com
            </a>
            .
          </p>
        </Section>

        <Section title="Personal Data We Collect">
          <p>
            <strong style={{ color: "var(--foreground)" }}>Comment forms:</strong> When you leave a comment, we
            collect the data shown in the form as well as your IP address and browser user-agent string. This
            information is used to help with spam detection.
          </p>
          <p>
            <strong style={{ color: "var(--foreground)" }}>Gravatar:</strong> An anonymised hash of your email
            address may be provided to the Gravatar service to check whether you use it. The Gravatar service
            privacy policy is available at gravatar.com/privacy.
          </p>
          <p>
            <strong style={{ color: "var(--foreground)" }}>Cookies:</strong> If you leave a comment, you may opt
            to save your name, email address, and website in cookies for convenience. These cookies last for one
            year. If you have an account and log in, a temporary login cookie is set (lasting two days) to
            determine whether your browser accepts cookies.
          </p>
          <p>
            We do not sell, trade, or rent your personal data to third parties.
          </p>
        </Section>

        <Section title="Embedded Content from Other Websites">
          <p>
            Pages on this site may include embedded content — such as videos, images, or articles — from other
            websites. Embedded content from other websites behaves in exactly the same way as if you had visited
            that website directly.
          </p>
          <p>
            These websites may collect data about you, use cookies, embed additional third-party tracking, and
            monitor your interaction with that embedded content. ShemenMusic has no control over the data practices
            of these third-party services.
          </p>
        </Section>

        <Section title="Your Rights">
          <p>
            If you have an account on this site or have left comments, you may request an exported file of the
            personal data we hold about you, including any data you have provided to us.
          </p>
          <p>
            You may also request that we erase any personal data we hold about you. This does not include data we
            are obliged to keep for administrative, legal, or security purposes.
          </p>
          <p>
            To exercise these rights, please contact us through the website&apos;s contact form.
          </p>
        </Section>

        {/* Footer */}
        <footer
          className="border-t pt-8 text-xs text-center"
          style={{ borderColor: "var(--border)", color: "var(--foreground-muted)" }}
        >
          Copyright &copy; 2024 ShemenMusic. All Rights Reserved.
        </footer>
      </div>
    </>
  );
}
