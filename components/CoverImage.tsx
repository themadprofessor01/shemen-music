"use client";

import { useState } from "react";

interface Props {
  src?: string | null;
  alt: string;
  coverColor: string;
  size: number;
  className?: string;
  style?: React.CSSProperties;
}

export function CoverImage({ src, alt, coverColor, size, className = "", style = {} }: Props) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const fallbackBg = `linear-gradient(135deg, ${coverColor}, ${coverColor}88)`;

  if (!src || error) {
    return <div style={{ width: "100%", height: "100%", background: fallbackBg, ...style }} className={className} />;
  }

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", ...style }} className={className}>
      {!loaded && (
        <div
          className="luxury-skeleton"
          style={{ position: "absolute", inset: 0 }}
        />
      )}
      <img
        src={src}
        alt={alt}
        width={size}
        height={size}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />
    </div>
  );
}
