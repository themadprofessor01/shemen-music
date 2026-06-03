interface Props {
  src?: string | null;
  alt: string;
  coverColor: string;
  size: number;
  className?: string;
  style?: React.CSSProperties;
}

export function CoverImage({ src, alt, coverColor, size, className = "", style = {} }: Props) {
  const fallbackBg = coverColor ? "#dfe2e5" : "#dfe2e5";

  if (!src) {
    return <div style={{ width: "100%", height: "100%", background: fallbackBg, ...style }} className={className} />;
  }

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", ...style }} className={className}>
      <img
        src={src}
        alt={alt}
        width={size}
        height={size}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
    </div>
  );
}
