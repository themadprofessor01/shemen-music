import { PageShell } from "@/components/PageShell";

export const metadata = { title: "Terms of Service – ShemenMusic" };

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

export default function TermsPage() {
  return (
    <>
      <PageShell eyebrow="Legal" title="Terms of Service" />

      <div className="max-w-3xl mx-auto px-4 sm:px-8 lg:px-14 pb-20 space-y-10">
        {/* Intro card */}
        <div
          className="rounded-2xl border p-6 sm:p-8 text-sm sm:text-base leading-7"
          style={{ background: "var(--surface)", borderColor: "var(--border)", color: "var(--foreground-muted)" }}
        >
          <p>
            This agreement is between <strong style={{ color: "var(--foreground)" }}>ShemenMusic</strong> and its users.
            By accessing this site you confirm that you have read, understood, and agree to comply with all conditions
            set forth in these Terms of Service. If you do not agree, please discontinue use of the platform immediately.
          </p>
        </div>

        <Section title="Content Restrictions">
          <p>
            ShemenMusic&apos;s platform contains protected material including sound recordings, audiovisual works,
            images, graphics, text, and software. This content belongs to ShemenMusic and/or third parties and is
            protected under applicable copyright law.
          </p>
          <p>
            You may not reproduce, distribute, publicly perform, publicly display, or prepare derivative works from
            any content on this platform without prior written permission from ShemenMusic or the respective rights
            holder. Unauthorized use may result in termination of your access and legal action.
          </p>
          <p>
            Personal, non-commercial use is permitted where explicitly indicated (for example, tracks marked as free
            downloads). All other uses require explicit written consent.
          </p>
        </Section>

        <Section title="User Content">
          <p>
            Users retain full ownership of any material they submit, upload, or otherwise contribute to ShemenMusic.
            ShemenMusic does not claim any intellectual property ownership rights in User Content.
          </p>
          <p>
            By submitting content you grant ShemenMusic a non-exclusive, royalty-free licence to display and
            distribute that content solely in connection with operating the platform. You represent that you have
            all necessary rights to grant this licence.
          </p>
          <p>
            ShemenMusic reserves the right to remove any User Content that violates these Terms or that we determine,
            in our sole discretion, is harmful, offensive, or otherwise inappropriate.
          </p>
        </Section>

        <Section title="Disclaimer of Warranties">
          <p>
            The platform is provided &ldquo;as is&rdquo; without warranties of any kind, express or implied.
            ShemenMusic does not warrant that the service will be uninterrupted, error-free, or free of viruses
            or other harmful components.
          </p>
        </Section>

        <Section title="Changes to Terms">
          <p>
            ShemenMusic reserves the right to update these Terms at any time. Continued use of the platform after
            changes are posted constitutes your acceptance of the revised Terms. We encourage you to review this
            page periodically.
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
