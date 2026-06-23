import type { ReactNode } from "react";

export function PageShell({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="px-4 py-9 sm:px-8 lg:px-14 space-y-8">
      <header className="space-y-3 text-center">
        {eyebrow && <p className="text-sm font-semibold" style={{ color: "var(--accent)" }}>{eyebrow}</p>}
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight">{title}</h1>
        {children && <div className="max-w-2xl mx-auto text-sm sm:text-base leading-7 opacity-65">{children}</div>}
      </header>
    </div>
  );
}
