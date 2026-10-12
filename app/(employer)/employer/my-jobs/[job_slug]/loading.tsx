export default function JobDetailsLoading() {
  return (
    <div
      className="w-full space-y-4 sm:space-y-6 animate-pulse select-none"
      role="status"
      aria-label="Loading job details..."
    >
      {/* 1. Header with Breadcrumbs, Title, Status & Actions */}
      <div className="bg-white rounded p-4 sm:p-5 lg:p-6 border border-zinc-200/80 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <div className="h-3 w-16 bg-zinc-200 rounded" />
          <div className="h-3 w-3 bg-zinc-200 rounded" />
          <div className="h-3 w-28 bg-zinc-200 rounded" />
          <div className="h-3 w-3 bg-zinc-200 rounded" />
          <div className="h-3 w-36 bg-forest/20 rounded" />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <div className="space-y-1.5">
            <div className="h-6 sm:h-7 w-64 bg-zinc-200 rounded" />
            <div className="flex items-center gap-2">
              <div className="h-4 w-24 bg-zinc-100 rounded" />
              <div className="h-4 w-32 bg-zinc-100 rounded" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-9 w-24 rounded bg-zinc-100" />
            <div className="h-9 w-36 rounded bg-forest/20" />
          </div>
        </div>
      </div>

      {/* 2. Funnel KPI Metrics Strip */}
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

      {/* 3. 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 xl:gap-6 items-start">
        {/* Left Column: Job Overview & Description */}
        <div className="lg:col-span-7 xl:col-span-8 bg-white rounded p-4 sm:p-6 border border-zinc-200/80 shadow-xs space-y-4">
          <div className="h-5 w-44 bg-zinc-200 rounded" />
          <div className="space-y-2">
            <div className="h-3.5 w-full bg-zinc-100 rounded" />
            <div className="h-3.5 w-5/6 bg-zinc-100 rounded" />
            <div className="h-3.5 w-4/6 bg-zinc-100 rounded" />
          </div>
          <div className="pt-4 border-t border-zinc-100 space-y-3">
            <div className="h-4 w-36 bg-zinc-200 rounded" />
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <div key={s} className="h-6 w-18 rounded bg-zinc-100" />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Pipeline Access & Role Quick Facts */}
        <div className="lg:col-span-5 xl:col-span-4 bg-white rounded p-4 sm:p-6 border border-zinc-200/80 shadow-xs space-y-4">
          <div className="h-5 w-36 bg-zinc-200 rounded" />
          <div className="space-y-3">
            {[1, 2, 3, 4].map((f) => (
              <div key={f} className="flex justify-between items-center py-1">
                <div className="h-3.5 w-24 bg-zinc-100 rounded" />
                <div className="h-3.5 w-28 bg-zinc-200 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
