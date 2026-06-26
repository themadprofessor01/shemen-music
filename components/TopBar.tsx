"use client";

import Link from "next/link";
import Image from "next/image";

export default function TopBar() {
  return (
    <header
      className="fixed top-0 left-0 right-0 md:left-48 z-30 h-16 flex items-center px-4 md:px-6"
      style={{
        background: "var(--background)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      {/* Mobile logo — only shows when sidebar is hidden */}
      <Link href="/" className="md:hidden flex-shrink-0">
        <Image
          src="/logo.png"
          alt="ShemenMusic"
          width={120}
          height={17}
          className="h-6 w-auto"
          priority
        />
      </Link>
    </header>
  );
}
