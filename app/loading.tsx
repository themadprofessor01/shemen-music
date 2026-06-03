function SkeletonBlock({ className = "" }: { className?: string }) {
  return <div className={`luxury-skeleton ${className}`} />;
}

export default function Loading() {
  return (
    <div className="px-4 py-9 sm:px-8 lg:px-14 space-y-14">
      <section className="rounded-[2rem] p-6 sm:p-9 lg:p-12 min-h-[460px]" style={{ background: "linear-gradient(135deg, #0c1823 0%, #123655 54%, #0b1520 100%)", boxShadow: "0 34px 90px rgba(12,24,35,0.18)" }}>
        <div className="grid lg:grid-cols-[0.92fr_1.08fr] gap-10 items-center">
          <div>
            <SkeletonBlock className="h-8 w-56 rounded-full bg-white/12" />
            <SkeletonBlock className="mt-7 h-16 w-72 rounded-2xl bg-white/12" />
            <SkeletonBlock className="mt-5 h-4 w-full max-w-xl rounded-full bg-white/12" />
            <SkeletonBlock className="mt-3 h-4 w-2/3 rounded-full bg-white/12" />
            <div className="mt-8 flex gap-3">
              <SkeletonBlock className="h-12 w-44 rounded-full bg-white/16" />
              <SkeletonBlock className="h-12 w-40 rounded-full bg-white/10" />
            </div>
          </div>
          <div className="relative min-h-[340px]">
            <SkeletonBlock className="absolute left-[28%] top-0 h-72 w-[54%] rounded-[1.5rem] bg-white/12" />
            <SkeletonBlock className="absolute left-0 top-[18%] h-56 w-[42%] rounded-[1.5rem] bg-white/10" />
            <SkeletonBlock className="absolute right-0 top-[24%] h-56 w-[42%] rounded-[1.5rem] bg-white/10" />
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        {[0, 1, 2].map((item) => (
          <SkeletonBlock key={item} className="h-24 rounded-3xl" />
        ))}
      </section>

      <section className="rounded-[2rem] p-6" style={{ background: "rgba(255,253,250,0.72)", border: "1px solid var(--border)" }}>
        <SkeletonBlock className="h-7 w-48 rounded-xl" />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[0, 1, 2, 3].map((item) => (
            <SkeletonBlock key={item} className="h-44 rounded-3xl" />
          ))}
        </div>
      </section>

      <section>
        <SkeletonBlock className="h-8 w-40 rounded-xl" />
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
          {[0, 1, 2, 3, 4].map((item) => (
            <SkeletonBlock key={item} className="aspect-[0.78] rounded-2xl" />
          ))}
        </div>
      </section>
    </div>
  );
}
