"use client";

import Image from "next/image";
import { useState } from "react";

interface Props {
  src?: string | null;
  alt: string;
  coverColor: string;
  size: number;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
  sizes?: string;
  quality?: number;
}

export function CoverImage({ src, alt, coverColor, size, className = "", style = {}, priority = false, sizes, quality = 70 }: Props) {
  const [imgFailed, setImgFailed] = useState(false);
  const fallbackBg = `linear-gradient(135deg, ${coverColor}, ${coverColor}88)`;

  if (!src || imgFailed) {
    return <div style={{ width: "100%", height: "100%", background: fallbackBg, ...style }} className={className} />;
  }

  return (
    <div style={{ position: "absolute", inset: 0, background: coverColor, ...style }} className={className}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes ?? `${size}px`}
        quality={quality}
        style={{ objectFit: "cover" }}
        priority={priority}
        onError={() => setImgFailed(true)}
      />
    </div>
  );
}
