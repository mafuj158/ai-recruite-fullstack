export default function EmployerDashboardLoading() {
  return (
    <div
      className="w-full space-y-3 xs:space-y-4 sm:space-y-6 animate-pulse select-none"
      role="status"
      aria-label="Loading employer dashboard..."
    >
      {/* 1. Page Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="size-5 xs:size-6 sm:size-7 rounded bg-forest/20 shrink-0" />
            <div className="h-6 xs:h-7 sm:h-8 w-44 sm:w-56 bg-zinc-200 rounded" />
          </div>
          <div className="h-3.5 sm:h-4 w-64 sm:w-[480px] max-w-full bg-zinc-200/60 rounded mt-1.5" />
        </div>
      </div>

      {/* 2. Stats Cards Skeleton (4 Cards) */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5 sm:gap-5">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white rounded p-4 sm:p-5 lg:p-6 border border-zinc-200/80 shadow-xs flex items-center justify-between gap-3 sm:gap-4"
          >
            <div className="space-y-1.5 flex-1">
              <div className="h-3 w-24 bg-zinc-200 rounded" />
              <div className="h-7 sm:h-8 w-16 bg-zinc-200 rounded" />
              <div className="h-2.5 w-28 bg-zinc-100 rounded" />
            </div>
            <div className="size-10 sm:size-12 rounded bg-zinc-100 shrink-0" />
          </div>
        ))}
      </div>

      {/* 3. Middle Section: Funnel Chart + Quick Actions */}
      <div className="flex flex-col lg:flex-row w-full justify-between gap-4 sm:gap-6">
        {/* Funnel Chart Skeleton */}
        <div className="flex-1 bg-white rounded p-4 sm:p-5 lg:p-6 border border-zinc-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="h-4 sm:h-5 w-44 bg-zinc-200 rounded" />
              <div className="h-3 w-56 bg-zinc-100 rounded" />
            </div>
            <div className="h-8 w-24 rounded bg-zinc-100" />
          </div>
          {/* Chart Bars Skeleton */}
          <div className="h-56 sm:h-64 flex items-end justify-between gap-3 sm:gap-6 pt-6 px-2">
            {[85, 65, 45, 25, 15].map((h, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-forest/15 rounded-t"
                  style={{ height: `${h}%` }}
                />
                <div className="h-2.5 w-12 bg-zinc-200 rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions Skeleton */}
        <div className="w-full lg:w-96 xl:w-115 shrink-0 bg-white rounded p-4 sm:p-5 lg:p-6 border border-zinc-200/80 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-1">
            <div className="h-4 sm:h-5 w-32 bg-zinc-200 rounded" />
            <div className="h-3 w-48 bg-zinc-100 rounded" />
          </div>
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-zinc-50 border border-zinc-200/70 rounded p-3 sm:p-4 flex flex-col items-center justify-center gap-2"
              >
                <div className="size-6 sm:size-8 rounded bg-zinc-200/70" />
                <div className="h-3 w-20 bg-zinc-200 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Active Job Postings Skeleton */}
      <div className="w-full space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-5 sm:h-6 w-36 sm:w-44 bg-zinc-200 rounded" />
            <div className="h-4 w-16 bg-forest/15 rounded" />
          </div>
          <div className="h-4 w-20 bg-zinc-200 rounded" />
        </div>

        {/* 3 Job Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5 sm:gap-5">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded p-4 sm:p-5 border border-zinc-200/80 shadow-xs space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1.5 flex-1">
                    <div className="h-4 sm:h-5 w-40 bg-zinc-200 rounded" />
                    <div className="h-3 w-28 bg-zinc-100 rounded" />
                  </div>
                  <div className="h-5 w-16 bg-emerald-100 rounded-full shrink-0" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-5 w-20 rounded bg-zinc-100" />
                  <div className="h-5 w-24 rounded bg-zinc-100" />
                </div>
              </div>

              {/* Stats & Footer */}
              <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
                <div className="h-4 w-24 bg-zinc-200 rounded" />
                <div className="h-8 w-24 rounded bg-zinc-100" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
