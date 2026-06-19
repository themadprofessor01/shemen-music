"use client";

// AdBanner — drop-in ad placement component.
// To activate Google AdSense: replace the inner div with your <ins class="adsbygoogle"> tag
// and add the AdSense script to app/layout.tsx <head>.
//
// Sizes:
//   leaderboard  — 728×90  (top of page, desktop)
//   rectangle    — 300×250 (sidebar / between sections)
//   banner       — 320×50  (mobile)

type AdSize = "leaderboard" | "rectangle" | "banner";

const dimensions: Record<AdSize, { w: number; h: number; label: string }> = {
  leaderboard: { w: 728, h: 90,  label: "728×90" },
  rectangle:   { w: 300, h: 250, label: "300×250" },
  banner:      { w: 320, h: 50,  label: "320×50" },
};

export function AdBanner({
  size = "rectangle",
  className = "",
  slot,
}: {
  size?: AdSize;
  className?: string;
  /** Google AdSense data-ad-slot value — when provided, renders real AdSense markup */
  slot?: string;
}) {
  const { w, h, label } = dimensions[size];

  // ── Real AdSense (uncomment when you have a publisher ID) ──────────────────
  // if (slot) {
  //   return (
  //     <div className={`overflow-hidden flex justify-center ${className}`}>
  //       <ins
  //         className="adsbygoogle"
  //         style={{ display: "block", width: w, height: h }}
  //         data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"   // ← your publisher ID
  //         data-ad-slot={slot}
  //         data-ad-format="fixed"
  //       />
  //     </div>
  //   );
  // }
  // ──────────────────────────────────────────────────────────────────────────

  // Placeholder shown until AdSense is configured
  return (
    <div
      className={`flex items-center justify-center rounded-xl overflow-hidden ${className}`}
      style={{
        width: "100%",
        maxWidth: w,
        height: h,
        background: "var(--surface2)",
        border: "1px dashed var(--border)",
        margin: "0 auto",
      }}
    >
      <span className="text-[10px] font-semibold uppercase tracking-widest select-none" style={{ color: "var(--foreground-muted)" }}>
        Advertisement · {label}
      </span>
    </div>
  );
}
