export default function JobCandidatesLoading() {
  return (
    <div
      className="w-full space-y-4 sm:space-y-6 animate-pulse select-none"
      role="status"
      aria-label="Loading job candidates..."
    >
      {/* 1. Breadcrumbs & Job Header Skeleton */}
      <div className="bg-white rounded p-4 sm:p-5 lg:p-6 border border-zinc-200/80 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <div className="h-3 w-16 bg-zinc-200 rounded" />
          <div className="h-3 w-3 bg-zinc-200 rounded" />
          <div className="h-3 w-28 bg-zinc-200 rounded" />
          <div className="h-3 w-3 bg-zinc-200 rounded" />
          <div className="h-3 w-20 bg-forest/20 rounded" />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <div className="space-y-1.5">
            <div className="h-6 sm:h-7 w-56 bg-zinc-200 rounded" />
            <div className="flex items-center gap-2">
              <div className="h-4 w-24 bg-zinc-100 rounded" />
              <div className="h-4 w-32 bg-zinc-100 rounded" />
            </div>
          </div>
          <div className="h-9 w-32 rounded bg-forest/20" />
        </div>
      </div>

      {/* 2. Candidate Stats Skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white border border-[#DFE1E7] rounded p-3 sm:p-5 flex items-center justify-between shadow-xs"
          >
            <div className="space-y-1.5 flex-1 pr-2">
              <div className="h-3 w-20 bg-zinc-200 rounded" />
              <div className="h-6 sm:h-7 w-12 bg-zinc-200 rounded" />
              <div className="h-2.5 w-24 bg-zinc-100 rounded" />
            </div>
            <div className="size-9 sm:size-11 rounded bg-zinc-100 shrink-0" />
          </div>
        ))}
      </div>

      {/* 3. Candidate Table / List Skeleton */}
      <div className="bg-white border border-[#DFE1E7] rounded p-4 sm:p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex-1 h-9 rounded bg-zinc-50 border border-zinc-200/70" />
          <div className="h-9 w-40 rounded bg-zinc-50 border border-zinc-200/70" />
        </div>
        <div className="space-y-2 pt-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-16 w-full rounded bg-zinc-50 border border-zinc-100 flex items-center justify-between p-3"
            >
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-zinc-200 shrink-0" />
                <div className="space-y-1">
                  <div className="h-4 w-32 bg-zinc-200 rounded" />
                  <div className="h-3 w-44 bg-zinc-100 rounded" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-6 w-16 rounded-full bg-forest/15" />
                <div className="h-8 w-24 rounded bg-zinc-100 hidden sm:block" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
