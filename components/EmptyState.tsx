import Link from "next/link";
import { ArrowUpRight, Disc3 } from "lucide-react";
import type { ReactNode } from "react";

type EmptyStateProps = {
  eyebrow?: string;
  title: string;
  children: ReactNode;
  actionHref?: string;
  actionLabel?: string;
};

export function EmptyState({ eyebrow = "Quiet Library", title, children, actionHref, actionLabel }: EmptyStateProps) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] p-8 text-center sm:p-12" style={{ background: "linear-gradient(145deg, rgba(255,253,250,0.94), rgba(246,241,232,0.9))", border: "1px solid var(--border)", boxShadow: "var(--shadow-soft)" }}>
      <div className="absolute left-1/2 top-0 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--premium-soft)] blur-3xl" />
      <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full" style={{ background: "var(--blue-soft)", color: "var(--blue)" }}>
        <Disc3 size={26} />
      </div>
      <p className="relative mt-6 text-xs font-bold uppercase tracking-[0.2em] text-[var(--premium)]">{eyebrow}</p>
      <h2 className="relative mx-auto mt-3 max-w-lg text-3xl font-black tracking-tight">{title}</h2>
      <p className="relative mx-auto mt-4 max-w-xl leading-7 text-[var(--muted)]">{children}</p>
      {actionHref && actionLabel && (
        <Link href={actionHref} className="relative mt-7 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-white" style={{ background: "linear-gradient(135deg, var(--ink), var(--blue-deep))" }}>
          {actionLabel}
          <ArrowUpRight size={16} />
        </Link>
      )}
    </div>
  );
}
