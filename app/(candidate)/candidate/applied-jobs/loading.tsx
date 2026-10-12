import AppliedJobsCardSkeleton from "./_components/applied-jobs-card-skeleton";

export default function AppliedJobsLoading() {
  return (
    <div
      className="w-full space-y-4 sm:space-y-6 animate-pulse select-none"
      role="status"
      aria-label="Loading applications..."
    >
      {/* 1. Page Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="size-5 xs:size-6 sm:size-7 rounded bg-forest/20 shrink-0" />
            <div className="h-6 xs:h-7 sm:h-8 w-36 xs:w-44 sm:w-48 bg-zinc-200 rounded" />
          </div>
          <div className="h-3.5 sm:h-4 w-64 sm:w-[440px] max-w-full bg-zinc-200/60 rounded mt-1.5" />
        </div>
      </div>

      {/* 2. AppliedJobsTabs skeleton */}
      <div className="space-y-3">
        {/* Primary bar: Search + scrollable tabs */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2.5 sm:gap-3 p-2 rounded bg-white border border-zinc-200/80 shadow-2xs">
          {/* Search field */}
          <div className="relative flex-1 min-w-0 flex items-center gap-3 pl-3 py-1.5 sm:py-2">
            <div className="size-4 rounded bg-zinc-200/70 shrink-0" />
            <div className="h-4 w-full max-w-xs bg-zinc-100 rounded" />
          </div>

          {/* Tabs area */}
          <div className="relative flex items-center min-w-0 max-w-full pt-1.5 lg:pt-0 border-t lg:border-t-0 border-zinc-100 gap-1">
            {/* Tab pills: All Applications • Under Review • Shortlisted • Interviewing • Offer/Hired • Archived */}
            {[88, 100, 84, 92, 88, 68].map((w, i) => (
              <div
                key={i}
                className={`h-7 rounded shrink-0 ${i === 0 ? "bg-[#EDF6F1] border border-[#C2E4D2]/60" : "bg-zinc-50 border border-zinc-200/60"}`}
                style={{ width: `${w}px` }}
              />
            ))}
          </div>
        </div>

        {/* Secondary bar: Sort selector + results count */}
        <div className="flex items-center justify-between gap-2.5 px-2.5 sm:px-3 py-2 rounded bg-white border border-zinc-200/80 shadow-2xs">
          {/* Sort dropdown */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-zinc-50 border border-zinc-200/80">
            <div className="size-3.5 rounded bg-zinc-200/70 shrink-0" />
            <div className="h-3 w-10 bg-zinc-200/50 rounded" />
            <div className="h-3.5 w-24 bg-zinc-200/70 rounded" />
          </div>
          {/* Results count */}
          <div className="h-3.5 w-32 bg-zinc-200/60 rounded" />
        </div>
      </div>

      {/* 3. Application Card Skeletons */}
      <div className="grid grid-cols-1 gap-4 sm:gap-5">
        {[1, 2, 3].map((i) => (
          <AppliedJobsCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
