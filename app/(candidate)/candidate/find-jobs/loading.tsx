import CandidateJobCardSkeleton from "@/app/(candidate)/candidate/_components/candidate-job-card-skeleton";

export default function FindJobsLoading() {
  return (
    <div
      className="w-full space-y-3 xs:space-y-4 sm:space-y-6 animate-pulse select-none"
      role="status"
      aria-label="Loading find jobs..."
    >
      {/* 1. Page Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="size-5 xs:size-6 sm:size-7 rounded bg-forest/20 shrink-0" />
            <div className="h-6 xs:h-7 sm:h-8 w-28 xs:w-36 sm:w-44 bg-zinc-200 rounded" />
          </div>
          <div className="h-3.5 sm:h-4 w-72 sm:w-[480px] max-w-full bg-zinc-200/60 rounded mt-1.5" />
        </div>
      </div>

      {/* 2. Search Bar Area */}
      <div className="space-y-2.5 sm:space-y-3">
        {/* Primary Bar: Search Input */}
        <div className="flex items-center p-2 rounded bg-white border border-zinc-200/80 shadow-2xs gap-2">
          <div className="relative flex-1 min-w-0 flex items-center gap-3 pl-2 py-1.5 sm:py-2">
            <div className="size-4 rounded bg-zinc-200/70 shrink-0" />
            <div className="h-4 w-full max-w-lg bg-zinc-100 rounded" />
          </div>
        </div>

        {/* Secondary Controls Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 px-2.5 sm:px-3 py-2 rounded bg-white border border-zinc-200/80 shadow-2xs">
          <div className="flex flex-wrap items-center gap-2 flex-1 min-w-0">
            <div className="h-8 w-40 bg-zinc-50 border border-zinc-200/80 rounded" />
            <div className="h-8 w-40 bg-zinc-50 border border-zinc-200/80 rounded" />
          </div>
          <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0">
            <div className="h-3.5 w-16 bg-zinc-200/60 rounded" />
            <div className="h-8 w-24 bg-zinc-50 border border-zinc-200/70 rounded lg:hidden" />
          </div>
        </div>
      </div>

      {/* 3. Main Layout: Filter Sidebar (desktop) + Right Content */}
      <div className="flex items-start gap-5 lg:gap-6">
        {/* Left Filter Sidebar Skeleton — exact match to sidebar layout */}
        <aside className="hidden lg:block w-72 xl:w-80 shrink-0 sticky top-20 self-start">
          <div className="bg-white rounded p-4 sm:p-5 border border-zinc-200/80 shadow-xs space-y-5">
            {/* Header */}
            <div className="pb-3 border-b border-zinc-200/80">
              <div className="h-4 w-24 bg-zinc-200 rounded" />
            </div>

            {/* 1. Work Location (2x2 Grid Skeleton) */}
            <div className="space-y-2">
              <div className="h-3 w-28 bg-zinc-200/80 rounded" />
              <div className="grid grid-cols-2 gap-1.5">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-8 rounded border border-zinc-200/70 bg-zinc-50 flex items-center justify-center px-2.5"
                  >
                    <div className="h-3 w-14 bg-zinc-200/70 rounded" />
                  </div>
                ))}
              </div>
            </div>

            {/* 2. AI Compatibility (Stacked Buttons with Badges Skeleton) */}
            <div className="space-y-2 pt-1 border-t border-zinc-100">
              <div className="flex items-center gap-1.5">
                <div className="size-3.5 rounded bg-zinc-200/70" />
                <div className="h-3 w-32 bg-zinc-200/80 rounded" />
              </div>
              <div className="flex flex-col gap-1.5">
                {/* Any Match */}
                <div className="h-8 w-full rounded border border-zinc-200/70 bg-zinc-50 flex items-center px-3">
                  <div className="h-3 w-20 bg-zinc-200/70 rounded" />
                </div>
                {/* 80%+ High Fit */}
                <div className="h-8 w-full rounded border border-zinc-200/70 bg-zinc-50 flex items-center justify-between px-3">
                  <div className="h-3 w-24 bg-zinc-200/70 rounded" />
                  <div className="h-4 w-10 rounded bg-emerald-100/60" />
                </div>
                {/* 90%+ Top Fit */}
                <div className="h-8 w-full rounded border border-zinc-200/70 bg-zinc-50 flex items-center justify-between px-3">
                  <div className="h-3 w-24 bg-zinc-200/70 rounded" />
                  <div className="h-4 w-10 rounded bg-emerald-100/60" />
                </div>
              </div>
            </div>

            {/* 3. Experience Level (5 Stacked Buttons Skeleton) */}
            <div className="space-y-2 pt-1 border-t border-zinc-100">
              <div className="h-3 w-32 bg-zinc-200/80 rounded" />
              <div className="flex flex-col gap-1.5">
                {["w-20", "w-14", "w-20", "w-16", "w-28"].map((w, idx) => (
                  <div
                    key={idx}
                    className="h-8 w-full rounded border border-zinc-200/70 bg-zinc-50 flex items-center px-3"
                  >
                    <div className={`h-3 ${w} bg-zinc-200/70 rounded`} />
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Engagement Type (4 Stacked Buttons Skeleton) */}
            <div className="space-y-2 pt-1 border-t border-zinc-100">
              <div className="h-3 w-32 bg-zinc-200/80 rounded" />
              <div className="flex flex-col gap-1.5">
                {["w-28", "w-18", "w-16", "w-18"].map((w, idx) => (
                  <div
                    key={idx}
                    className="h-8 w-full rounded border border-zinc-200/70 bg-zinc-50 flex items-center px-3"
                  >
                    <div className={`h-3 ${w} bg-zinc-200/70 rounded`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Right Content Area */}
        <div className="flex-1 min-w-0 space-y-4">
          {/* Quick Metrics & Reset Bar */}
          <div className="bg-white rounded px-3.5 py-2.5 border border-zinc-200/80 shadow-2xs flex items-center justify-between gap-2.5 flex-wrap">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="h-3.5 w-20 bg-zinc-200 rounded" />
              <div className="h-3 w-3 rounded-full bg-zinc-200/50" />
              <div className="h-3.5 w-28 bg-zinc-200/60 rounded" />
              <div className="h-3 w-3 rounded-full bg-zinc-200/50" />
              <div className="h-5 w-28 bg-emerald-50 border border-emerald-200/60 rounded" />
            </div>
          </div>

          {/* 5 Job Card Skeletons */}
          <div className="grid grid-cols-1 gap-3.5 sm:gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <CandidateJobCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
