"use client";

type AdSize = "leaderboard" | "rectangle" | "banner";

const sizes: Record<AdSize, { w: number; h: number; label: string }> = {
  leaderboard: { w: 728, h: 90, label: "728×90" },
  rectangle:   { w: 300, h: 250, label: "300×250" },
  banner:      { w: 320, h: 50, label: "320×50" },
};

export function AdBanner({ size = "leaderboard" }: { size?: AdSize }) {
  const { w, h, label } = sizes[size];

  return (
    <div className="flex justify-center my-4">
      <div
        style={{
          width: "100%",
          maxWidth: w,
          height: h,
          border: "1px dashed var(--border)",
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--surface2)",
          color: "var(--foreground-muted)",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          opacity: 0.5,
        }}
      >
        Ad · {label}
      </div>
      {/* Replace above div with this once AdSense is configured:
      <ins
        className="adsbygoogle"
        style={{ display: "block", width: w, height: h }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot="XXXXXXXXXX"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      */}
    </div>
  );
}
