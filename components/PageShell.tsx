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
    <div className="ref-page pb-0">
      <header>
        {eyebrow && <p className="mb-4 text-sm" style={{ color: "var(--muted)" }}>{eyebrow}</p>}
        <h1 className="ref-title">{title}</h1>
        {children && <div className="mt-7 max-w-2xl text-base leading-7 text-[var(--muted)]">{children}</div>}
      </header>
    </div>
  );
}
