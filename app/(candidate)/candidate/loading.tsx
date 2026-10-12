export default function CandidateRootLoading() {
  return (
    <div
      className="w-full space-y-4 sm:space-y-6 animate-pulse select-none"
      role="status"
      aria-label="Loading candidate workspace..."
    >
      {/* 1. Page Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2.5">
            <div className="size-6 sm:size-7 rounded bg-zinc-200/80" />
            <div className="h-6 sm:h-7 w-44 sm:w-56 bg-zinc-200 rounded" />
            <div className="h-5 w-16 sm:w-20 rounded-full bg-forest/10 border border-forest/15" />
          </div>
          <div className="h-3.5 sm:h-4 w-64 sm:w-96 max-w-full bg-zinc-200/60 rounded" />
        </div>

        {/* Action Buttons Placeholder */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 self-start sm:self-auto pt-1 sm:pt-0">
          <div className="h-9 sm:h-10 w-24 sm:w-28 bg-white border border-zinc-200/80 rounded shadow-xs" />
          <div className="h-9 sm:h-10 w-28 sm:w-32 bg-forest/20 rounded shadow-xs" />
        </div>
      </div>

      {/* 2. Overview Metric Cards Grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white rounded p-4 sm:p-5 border border-zinc-200/80 shadow-xs flex items-center justify-between gap-3"
          >
            <div className="space-y-2 flex-1">
              <div className="h-3 w-24 bg-zinc-200/70 rounded" />
              <div className="h-6 sm:h-7 w-16 bg-zinc-200 rounded" />
              <div className="h-3.5 w-20 bg-emerald-50 rounded" />
            </div>
            <div className="size-10 sm:size-11 rounded-full bg-lime/25 ring-4 ring-lime/10 shrink-0" />
          </div>
        ))}
      </div>

      {/* 3. Main Workspace Container Skeleton */}
      <div className="bg-white rounded border border-zinc-200/80 shadow-xs p-4 sm:p-5 lg:p-6 space-y-4 sm:space-y-5">
        {/* Filter / Search Bar Skeleton */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-3 border-b border-zinc-100">
          <div className="flex items-center gap-2.5 flex-1 max-w-md">
            <div className="h-9 sm:h-10 w-full bg-zinc-50 border border-zinc-200/70 rounded" />
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <div className="h-9 sm:h-10 w-24 bg-zinc-50 border border-zinc-200/70 rounded" />
            <div className="h-9 sm:h-10 w-24 bg-zinc-50 border border-zinc-200/70 rounded" />
          </div>
        </div>

        {/* Tab / Category Pills Placeholder */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <div className="h-7 w-20 rounded bg-forest/15 shrink-0" />
          <div className="h-7 w-24 rounded bg-zinc-100 shrink-0" />
          <div className="h-7 w-20 rounded bg-zinc-100 shrink-0" />
          <div className="h-7 w-28 rounded bg-zinc-100 shrink-0" />
        </div>

        {/* Card / List Items Placeholder */}
        <div className="space-y-3 pt-1">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="p-4 sm:p-4.5 rounded-lg border border-zinc-200/70 bg-zinc-50/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3.5 min-w-0 flex-1">
                <div className="size-10 sm:size-11 rounded-lg bg-zinc-200/80 shrink-0" />
                <div className="space-y-2 min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="h-4 sm:h-4.5 w-40 sm:w-56 bg-zinc-200 rounded" />
                    <div className="h-4 w-16 bg-emerald-50 rounded-full" />
                  </div>
                  <div className="h-3 w-64 max-w-full bg-zinc-200/60 rounded" />
                  <div className="flex items-center gap-2 pt-0.5">
                    <div className="h-3 w-16 bg-zinc-200/50 rounded" />
                    <div className="h-3 w-20 bg-zinc-200/50 rounded" />
                    <div className="h-3 w-24 bg-zinc-200/50 rounded" />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-center">
                <div className="h-8 w-20 bg-white border border-zinc-200/80 rounded" />
                <div className="h-8 w-24 bg-forest/20 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
