export default function EmployerMyJobsLoading() {
  return (
    <div
      className="w-full space-y-3 xs:space-y-4 sm:space-y-6 animate-pulse select-none"
      role="status"
      aria-label="Loading my jobs..."
    >
      {/* 1. Page Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="size-5 xs:size-6 sm:size-7 rounded bg-forest/20 shrink-0" />
            <div className="h-6 xs:h-7 sm:h-8 w-32 xs:w-40 sm:w-48 bg-zinc-200 rounded" />
          </div>
          <div className="h-3.5 sm:h-4 w-64 sm:w-[480px] max-w-full bg-zinc-200/60 rounded mt-1.5" />
        </div>
        <div className="h-9 sm:h-10 w-28 sm:w-32 bg-forest/20 rounded shrink-0" />
      </div>

      {/* 2. Top Filter Bar Skeleton */}
      <div className="bg-white rounded p-3 sm:p-4 border border-zinc-200/80 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search */}
        <div className="flex-1 h-9 rounded bg-zinc-50 border border-zinc-200/70" />
        {/* Tab Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {[64, 75, 70, 75].map((w, i) => (
            <div
              key={i}
              className={`h-7 rounded shrink-0 ${
                i === 0 ? "bg-forest/15" : "bg-zinc-100"
              }`}
              style={{ width: `${w}px` }}
            />
          ))}
        </div>
      </div>

      {/* 3. Job Cards Grid Skeleton (6 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5 sm:gap-5">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="w-full bg-white rounded p-4 sm:p-5 lg:p-6 border border-zinc-200/80 shadow-xs flex flex-col justify-between gap-3.5 sm:gap-4"
          >
            <div className="space-y-3">
              {/* Title & Status */}
              <div className="flex items-start justify-between gap-3">
                <div className="h-5 w-44 bg-zinc-200 rounded" />
                <div className="h-5 w-18 rounded bg-emerald-100 shrink-0" />
              </div>

              {/* Meta details */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="h-3.5 w-24 bg-zinc-200 rounded" />
                <div className="h-3.5 w-28 bg-zinc-100 rounded" />
                <div className="h-3.5 w-20 bg-zinc-100 rounded" />
              </div>

              {/* Skills */}
              <div className="flex items-center gap-1.5 pt-1">
                <div className="h-5 w-14 rounded bg-zinc-100" />
                <div className="h-5 w-16 rounded bg-zinc-100" />
                <div className="h-5 w-14 rounded bg-zinc-100" />
              </div>
            </div>

            {/* Stats & Footer */}
            <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
              <div className="h-4 w-28 bg-zinc-200 rounded" />
              <div className="h-8 w-24 rounded bg-zinc-100" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
