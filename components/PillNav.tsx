"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface PillNavItem {
  href: string;
  label: string;
  icon?: React.ReactNode;
  exact?: boolean;
}

interface PillNavProps {
  items: PillNavItem[];
  className?: string;
}

export default function PillNav({ items, className = "" }: PillNavProps) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const isFirst = useRef(true);

  const activeIndex = items.findIndex((item) =>
    item.exact
      ? pathname === item.href
      : pathname === item.href || pathname.startsWith(item.href + "/")
  );

  useEffect(() => {
    if (activeIndex < 0 || !pillRef.current || !containerRef.current) return;
    const activeEl = itemRefs.current[activeIndex];
    if (!activeEl) return;

    const cRect = containerRef.current.getBoundingClientRect();
    const iRect = activeEl.getBoundingClientRect();

    const props = {
      x: iRect.left - cRect.left,
      y: iRect.top - cRect.top,
      width: iRect.width,
      height: iRect.height,
    };

    if (isFirst.current) {
      gsap.set(pillRef.current, props);
      isFirst.current = false;
    } else {
      gsap.to(pillRef.current, { ...props, duration: 0.45, ease: "power2.inOut" });
    }
  }, [activeIndex]);

  return (
    <div ref={containerRef} className={`relative flex flex-col gap-0.5 ${className}`}>
      {/* Sliding pill */}
      <div
        ref={pillRef}
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          background: "var(--accent-dim, rgba(7,93,158,0.12))",
          borderRadius: 8,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {items.map((item, i) => {
        const isActive = i === activeIndex;
        return (
          <Link
            key={item.href}
            href={item.href}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            className="flex items-center gap-2.5 px-2 py-2 rounded-lg text-sm"
            style={{
              position: "relative",
              zIndex: 1,
              color: isActive ? "var(--accent)" : "var(--foreground-muted)",
              fontWeight: isActive ? 700 : 400,
              textDecoration: "none",
              transition: "color 0.3s ease",
            }}
          >
            {item.icon && (
              <span style={{ color: "var(--accent)", flexShrink: 0 }}>{item.icon}</span>
            )}
            <span className="leading-snug">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
