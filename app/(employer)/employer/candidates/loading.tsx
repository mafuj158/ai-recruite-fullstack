export default function CandidatesLoading() {
  return (
    <div
      className="w-full space-y-3 xs:space-y-4 sm:space-y-6 animate-pulse select-none"
      role="status"
      aria-label="Loading candidates..."
    >
      {/* 1. Page Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="size-5 xs:size-6 sm:size-7 rounded bg-forest/20 shrink-0" />
            <div className="h-6 xs:h-7 sm:h-8 w-36 xs:w-48 sm:w-56 bg-zinc-200 rounded" />
          </div>
          <div className="h-3.5 sm:h-4 w-64 sm:w-[460px] max-w-full bg-zinc-200/60 rounded mt-1.5" />
        </div>
      </div>

      {/* 2. Stats Summary Cards Skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white border border-[#DFE1E7] rounded p-3 sm:p-5 flex items-center justify-between shadow-xs"
          >
            <div className="space-y-1.5 flex-1 pr-2">
              <div className="h-3 w-24 bg-zinc-200 rounded" />
              <div className="h-6 sm:h-7 w-14 bg-zinc-200 rounded" />
              <div className="h-2.5 w-28 bg-zinc-100 rounded" />
            </div>
            <div className="size-9 sm:size-11 rounded bg-zinc-100 shrink-0" />
          </div>
        ))}
      </div>

      {/* 3. Filter Bar Skeleton */}
      <div className="space-y-2.5 bg-white border border-[#DFE1E7] rounded p-2.5 sm:p-3 shadow-xs">
        {/* Top Search + Select + Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <div className="flex-1 h-9 rounded bg-zinc-50 border border-zinc-200/70" />
          <div className="h-9 w-full sm:w-48 rounded bg-zinc-50 border border-zinc-200/70" />
          <div className="h-9 w-32 rounded bg-zinc-50 border border-zinc-200/70 hidden sm:block" />
          <div className="h-9 w-18 rounded bg-zinc-50 border border-zinc-200/70 hidden md:block" />
        </div>

        {/* Tab Pills Skeleton */}
        <div className="flex items-center gap-1.5 pt-1 overflow-x-auto">
          {[96, 140, 90, 85, 75, 75].map((w, i) => (
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

      {/* 4. Candidate Cards Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="bg-white border border-[#DFE1E7] rounded p-4 sm:p-5 shadow-xs space-y-3.5 flex flex-col justify-between"
          >
            <div className="space-y-3">
              {/* Header: Avatar, Name, Score */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="size-11 rounded-full bg-zinc-200 shrink-0" />
                  <div className="space-y-1.5 min-w-0">
                    <div className="h-4 w-32 bg-zinc-200 rounded" />
                    <div className="h-3 w-40 bg-zinc-100 rounded" />
                  </div>
                </div>
                <div className="h-6 w-16 rounded-full bg-forest/15 shrink-0" />
              </div>

              {/* Status Badge & Location */}
              <div className="flex items-center gap-2">
                <div className="h-5 w-24 rounded bg-zinc-100" />
                <div className="h-3.5 w-28 bg-zinc-100 rounded" />
              </div>

              {/* Skills Chips */}
              <div className="flex flex-wrap items-center gap-1.5">
                <div className="h-5 w-14 rounded bg-zinc-100" />
                <div className="h-5 w-16 rounded bg-zinc-100" />
                <div className="h-5 w-18 rounded bg-zinc-100" />
              </div>
            </div>

            {/* Footer Actions */}
            <div className="pt-3 border-t border-zinc-100 flex items-center justify-between gap-2">
              <div className="h-8 w-24 rounded bg-zinc-100" />
              <div className="h-8 w-28 rounded bg-forest/20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
