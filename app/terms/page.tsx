import { PageShell } from "@/components/PageShell";

export default function TermsPage() {
  return (
    <>
      <PageShell eyebrow="Legal" title="Terms &amp; Services">
        Please read these terms carefully before using ShemenMusic.
      </PageShell>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex flex-col gap-6 text-sm leading-relaxed" style={{ color: "var(--foreground)" }}>
          <p style={{ color: "var(--muted)" }}>
            By visiting, accessing, or using our site, you signify that you have the right, authority and capacity to enter into this Agreement, that you have read and understand this Agreement, and that YOU AGREE TO ABIDE BY ALL OF THE TERMS AND CONDITIONS OF THIS AGREEMENT, INCLUDING AUTO-RENEWALS OF YOUR SUBSCRIPTION AND PROVISIONS GOVERNING DISPUTE RESOLUTION. PLEASE READ THESE TERMS CAREFULLY. IF YOU DO NOT AGREE, DO NOT ACCESS OR USE THE SERVICES.
          </p>

          <section>
            <h2 className="font-bold text-base mb-2">Introduction</h2>
            <p style={{ color: "var(--muted)" }}>
              This document (the &ldquo;Terms&rdquo;) together with the U.S. Privacy Policy (collectively the &ldquo;Agreement&rdquo;) sets out the terms and conditions governing visits, access and use of the service by the end user (&ldquo;you&rdquo;). The term &ldquo;you&rdquo; includes additional registered users whenever permitted under the applicable subscription, visitors, and others who access or use any of the Services.
            </p>
            <p className="mt-3" style={{ color: "var(--muted)" }}>
              The &ldquo;Services&rdquo; means the service branded our site, that are compatible for similarly situated digital music services. These may include, but are not limited to websites and applications for desktops, tablets and mobile handsets, set-top boxes and stereo equipment. The Services also include your ability to edit certain Service Content.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-base mb-2">Content restrictions</h2>
            <p style={{ color: "var(--muted)" }}>
              The Services contains content, such as sound recordings, audiovisual works, other video or audio works, clips, images, graphics, text, software, works of authorship, files, documents, applications, artwork, trademarks, trade names, metadata, album titles, sound recording titles, artist names, intellectual property, or materials relating thereto or any other materials, and their selection, coordination and arrangement (collectively, the &ldquo;Service Content&rdquo;). The Service Content is the property of our site and/or third parties and is protected by copyright under both United States and foreign laws.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-base mb-2">User content</h2>
            <p style={{ color: "var(--muted)" }}>
              To the extent allowed by the Services, any musical works (sound recordings and underlying musical compositions), audiovisual works (including but not limited to MTV style premium music videos, clips and so called &ldquo;behind the scenes&rdquo; audiovisual content), other video or audio works, images, graphics, text, works of authorship, files, documents, applications, artwork, trademarks, trade names, metadata, album titles, sound recording titles, artist names, intellectual property, or materials relating thereto or any other materials that you submit to the Service (&ldquo;User Content&rdquo;) are generated, owned and controlled solely by you and/or your licensees. We do not claim any intellectual property ownership rights in any User Content. After directly sending (&ldquo;submitting&rdquo;) your User Content to the Services, you continue to retain any intellectual property ownership rights that you may have in your User Content, subject to the license below.
            </p>
          </section>

          <p className="text-xs" style={{ color: "var(--muted)" }}>© 2025 ShemenMusic. All Rights Reserved.</p>
        </div>
      </div>
    </>
  );
}
