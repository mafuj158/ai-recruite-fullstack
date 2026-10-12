export default function CandidateDashboardLoading() {
  return (
    <div
      className="w-full space-y-3 xs:space-y-4 sm:space-y-6 animate-pulse select-none"
      role="status"
      aria-label="Loading candidate dashboard..."
    >
      {/* 1. Page Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="size-5 xs:size-6 sm:size-7 rounded bg-forest/20 shrink-0" />
            <div className="h-6 xs:h-7 sm:h-8 w-48 xs:w-56 sm:w-64 bg-zinc-200 rounded" />
          </div>
          <div className="h-3.5 sm:h-4 w-64 sm:w-96 max-w-full bg-zinc-200/60 rounded mt-1.5" />
        </div>
      </div>

      {/* 2. Candidate Greeting Banner Skeleton */}
      <div className="relative overflow-hidden rounded bg-white border border-zinc-200/80 p-4 sm:p-5 lg:p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-5 relative z-10">
          {/* Left: Greeting & Status Info */}
          <div className="space-y-2 min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="h-5 sm:h-6 lg:h-7 w-48 sm:w-64 bg-zinc-200 rounded" />
              <div className="h-5 w-28 rounded-full bg-emerald-50 border border-emerald-200/60" />
            </div>

            <div className="h-3.5 w-full max-w-2xl bg-zinc-200/60 rounded" />

            {/* Quick Metrics Badges Placeholder */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-1">
              <div className="h-7 w-36 sm:w-40 rounded bg-zinc-50 border border-zinc-200/80" />
              <div className="h-7 w-36 sm:w-40 rounded bg-zinc-50 border border-zinc-200/80" />
            </div>
          </div>

          {/* Right: Quick Launch CTAs Placeholder */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-zinc-100">
            <div className="h-9 sm:h-10 w-28 rounded bg-forest/20" />
            <div className="h-9 sm:h-10 w-32 rounded bg-zinc-100 border border-zinc-200/70" />
          </div>
        </div>
      </div>

      {/* 3. 4 Overview Metric Stat Cards Skeleton */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5 sm:gap-5">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="bg-white rounded p-4 sm:p-5 lg:p-6 border border-zinc-200/80 shadow-xs flex items-center justify-between gap-3 sm:gap-4"
          >
            <div className="space-y-1.5 min-w-0 flex-1">
              <div className="h-3 sm:h-3.5 w-28 bg-zinc-200/70 rounded" />
              <div className="h-6 sm:h-7 lg:h-8 w-16 bg-zinc-200 rounded" />
              <div className="h-4 w-24 bg-emerald-50 border border-emerald-200/50 rounded" />
            </div>

            {/* Right Lime Badge Placeholder */}
            <div className="size-10 sm:size-11 lg:size-12 rounded-full bg-[#D2F34C]/30 ring-4 ring-[#D2F34C]/15 shrink-0" />
          </div>
        ))}
      </div>

      {/* 4. Application Pipeline Funnel & Quick Action Shortcuts Skeleton */}
      <div className="flex flex-col lg:flex-row w-full justify-between gap-4 sm:gap-6">
        {/* Left: Candidate Pipeline Card Skeleton */}
        <div className="w-full bg-white rounded p-4 sm:p-5 lg:p-6 border border-zinc-200/80 shadow-xs flex flex-col justify-between">
          {/* Header */}
          <div className="flex items-center justify-between gap-3 mb-4 sm:mb-5">
            <div>
              <div className="h-4 sm:h-5 w-36 bg-zinc-200 rounded" />
              <div className="h-3 w-52 sm:w-64 bg-zinc-200/60 rounded mt-1" />
            </div>
            <div className="h-3.5 w-16 bg-zinc-200/50 rounded" />
          </div>

          {/* 5-Stage Visual Timeline Cards Grid */}
          <div className="grid grid-cols-1 2xs:grid-cols-2 sm:grid-cols-3 2xl:grid-cols-5 gap-2.5 sm:gap-3">
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className="p-3 rounded-lg border border-zinc-200/80 bg-zinc-50/60 flex flex-col justify-between min-h-[92px]"
              >
                <div className="flex items-center justify-between gap-1 mb-2">
                  <div className="h-2.5 w-12 bg-zinc-200/70 rounded" />
                  <div className="size-5 rounded-full bg-white border border-zinc-200" />
                </div>
                <div>
                  <div className="h-3.5 w-20 bg-zinc-200 rounded" />
                  <div className="h-2.5 w-28 bg-zinc-200/50 rounded mt-1" />
                </div>
                <div className="w-full bg-zinc-200 h-1 rounded-full mt-2.5" />
              </div>
            ))}
          </div>

          {/* Footer Note */}
          <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs flex-wrap gap-2">
            <div className="h-3.5 w-52 bg-zinc-200/60 rounded" />
            <div className="h-3 w-24 bg-zinc-200/50 rounded" />
          </div>
        </div>

        {/* Right: Quick Actions Skeleton */}
        <div className="w-full lg:w-96 xl:w-115 shrink-0 bg-white rounded p-4 sm:p-5 lg:p-6 border border-zinc-200/80 shadow-xs flex flex-col justify-between">
          <div className="mb-3 sm:mb-4">
            <div className="h-4 sm:h-5 w-28 bg-zinc-200 rounded" />
            <div className="h-3 w-44 bg-zinc-200/60 rounded mt-1" />
          </div>

          {/* 2x2 Grid of Actions */}
          <div className="grid grid-cols-1 2xs:grid-cols-2 gap-2.5 sm:gap-3">
            {[1, 2, 3, 4].map((action) => (
              <div
                key={action}
                className="rounded bg-white border border-zinc-200/80 p-2.5 sm:p-3.5 lg:p-4 flex flex-col items-center justify-center text-center gap-2 shadow-xs"
              >
                <div className="size-8 sm:size-9 rounded bg-zinc-100" />
                <div className="h-3.5 w-20 bg-zinc-200 rounded" />
              </div>
            ))}
          </div>

          {/* Next Upcoming Interview Alert Placeholder */}
          <div className="mt-4 pt-3.5 border-t border-zinc-100">
            <div className="p-3 rounded-lg bg-[#EDF6F1]/60 border border-[#D5E6DC] flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="size-8 rounded-md bg-forest/20 shrink-0" />
                <div className="space-y-1 min-w-0">
                  <div className="h-3.5 w-32 bg-zinc-200 rounded" />
                  <div className="h-2.5 w-24 bg-zinc-200/60 rounded" />
                </div>
              </div>
              <div className="h-6 w-14 rounded bg-white border border-[#D5E6DC] shrink-0" />
            </div>
          </div>
        </div>
      </div>

      {/* 5. Top AI-Recommended Jobs Feed Skeleton */}
      <div className="w-full space-y-3 sm:space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <div className="h-4 sm:h-5 lg:h-6 w-44 sm:w-56 bg-zinc-200 rounded" />
            <div className="h-5 w-24 rounded bg-forest/10 border border-forest/15" />
          </div>
          <div className="h-3.5 w-24 bg-zinc-200/60 rounded" />
        </div>

        {/* 3 Jobs Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5 sm:gap-5">
          {[1, 2, 3].map((job) => (
            <div
              key={job}
              className="bg-white rounded p-4 sm:p-5 border border-zinc-200/80 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2.5 mb-3">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="size-10 rounded-lg bg-[#244034]/20 shrink-0" />
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="h-4 w-36 bg-zinc-200 rounded" />
                      <div className="h-3 w-24 bg-zinc-200/60 rounded" />
                    </div>
                  </div>
                  <div className="h-6 w-14 rounded-full bg-[#EDF6F1] border border-[#C2E4D2]/60 shrink-0" />
                </div>

                {/* Meta Chips */}
                <div className="flex items-center gap-2 sm:gap-3 mb-3.5">
                  <div className="h-3 w-16 bg-zinc-200/60 rounded" />
                  <div className="h-3 w-16 bg-zinc-200/60 rounded" />
                  <div className="h-3 w-20 bg-zinc-200/60 rounded" />
                </div>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  <div className="h-5 w-14 rounded bg-zinc-100 border border-zinc-200/60" />
                  <div className="h-5 w-18 rounded bg-zinc-100 border border-zinc-200/60" />
                  <div className="h-5 w-16 rounded bg-zinc-100 border border-zinc-200/60" />
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-zinc-100 flex items-center justify-between gap-2">
                <div className="h-3 w-20 bg-zinc-200/50 rounded" />
                <div className="h-7 w-24 rounded bg-forest/20" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Recent Application Activity Timeline Skeleton */}
      <div className="w-full bg-white rounded p-4 sm:p-5 lg:p-6 border border-zinc-200/80 shadow-xs space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between gap-2">
          <div>
            <div className="h-4 sm:h-5 w-44 sm:w-52 bg-zinc-200 rounded" />
            <div className="h-3 w-56 sm:w-72 bg-zinc-200/60 rounded mt-1" />
          </div>
          <div className="h-3 w-16 bg-zinc-200/50 rounded" />
        </div>

        {/* Timeline List */}
        <div className="divide-y divide-zinc-100">
          {[1, 2, 3, 4].map((act) => (
            <div
              key={act}
              className="py-3 sm:py-3.5 first:pt-1 last:pb-1 flex items-start justify-between gap-3 sm:gap-4 -mx-2 px-2"
            >
              <div className="flex items-start gap-3 min-w-0 flex-1">
                <div className="size-8 sm:size-9 rounded-lg bg-zinc-100 border border-zinc-200/60 shrink-0" />
                <div className="space-y-1.5 min-w-0 flex-1">
                  <div className="h-3.5 sm:h-4 w-44 sm:w-60 bg-zinc-200 rounded" />
                  <div className="h-3 w-64 sm:w-80 max-w-full bg-zinc-200/60 rounded" />
                </div>
              </div>

              <div className="space-y-1 text-right shrink-0">
                <div className="h-3 w-16 bg-zinc-200/50 rounded ml-auto" />
                <div className="h-3 w-8 bg-forest/15 rounded ml-auto" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
