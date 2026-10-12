export default function CandidateProfileLoading() {
  return (
    <div
      className="w-full space-y-4 sm:space-y-6 animate-pulse select-none"
      role="status"
      aria-label="Loading candidate profile..."
    >
      {/* 1. Header with Breadcrumbs, Avatar, Candidate Name & Stage Actions */}
      <div className="bg-white rounded p-4 sm:p-5 lg:p-6 border border-zinc-200/80 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-3 w-16 bg-zinc-200 rounded" />
          <div className="h-3 w-3 bg-zinc-200 rounded" />
          <div className="h-3 w-24 bg-zinc-200 rounded" />
          <div className="h-3 w-3 bg-zinc-200 rounded" />
          <div className="h-3 w-28 bg-forest/20 rounded" />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
          <div className="flex items-center gap-4">
            <div className="size-14 sm:size-16 rounded-full bg-zinc-200 shrink-0" />
            <div className="space-y-1.5">
              <div className="h-6 sm:h-7 w-48 bg-zinc-200 rounded" />
              <div className="h-4 w-64 bg-zinc-100 rounded" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-9 w-24 rounded bg-zinc-100" />
            <div className="h-9 w-32 rounded bg-forest/20" />
          </div>
        </div>
      </div>

      {/* 2. Candidate Metrics & Scorecard Cards */}
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

      {/* 3. 2-Column Profile Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 xl:gap-6 items-start">
        <div className="lg:col-span-8 bg-white rounded p-4 sm:p-6 border border-zinc-200/80 shadow-xs space-y-5">
          <div className="h-5 w-40 bg-zinc-200 rounded" />
          <div className="space-y-2">
            <div className="h-3.5 w-full bg-zinc-100 rounded" />
            <div className="h-3.5 w-5/6 bg-zinc-100 rounded" />
          </div>
          <div className="h-40 w-full bg-zinc-50 rounded border border-zinc-100" />
        </div>

        <div className="lg:col-span-4 bg-white rounded p-4 sm:p-6 border border-zinc-200/80 shadow-xs space-y-4">
          <div className="h-5 w-32 bg-zinc-200 rounded" />
          <div className="space-y-3">
            {[1, 2, 3, 4].map((k) => (
              <div key={k} className="h-10 w-full rounded bg-zinc-50 border border-zinc-100" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
