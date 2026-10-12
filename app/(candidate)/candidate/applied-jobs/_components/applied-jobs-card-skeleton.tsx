/**
 * Skeleton for AppliedJobsCard.
 * Mirrors the exact structure:
 *  1. Card header (avatar + title/company + match pill + status badge)
 *  2. Meta pills row (location, workType, salary, applied date)
 *  3. Status notice banner
 *  4. 5-Stage timeline (horizontal on lg+, vertical on <lg)
 *  5. Footer actions (View Documents + Withdraw + View Job Details)
 */
export default function AppliedJobsCardSkeleton() {
  return (
    <div className="bg-white rounded-xl p-4 sm:p-5 border border-zinc-200/80 shadow-xs space-y-4 animate-pulse select-none">

      {/* 1. Card Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-100">
        {/* Left: Avatar + Title + Company */}
        <div className="flex items-start gap-3 min-w-0">
          <div className="size-11 rounded-xl bg-[#244034]/15 shrink-0" />
          <div className="min-w-0 space-y-1.5">
            <div className="h-5 sm:h-6 w-44 sm:w-64 bg-zinc-200 rounded" />
            <div className="h-3 w-28 bg-zinc-200/60 rounded" />
          </div>
        </div>

        {/* Right: AI Match + Status badges */}
        <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
          <div className="h-6 w-20 rounded-full bg-[#EDF6F1] border border-[#C2E4D2]/60" />
          <div className="h-6 w-24 rounded-full bg-amber-50 border border-amber-200/60" />
        </div>
      </div>

      {/* 2. Meta Pills Row */}
      <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1.5">
        <div className="flex items-center gap-1">
          <div className="size-3.5 rounded bg-zinc-200/60 shrink-0" />
          <div className="h-3 w-20 bg-zinc-200/60 rounded" />
        </div>
        <div className="h-3 w-3 rounded-full bg-zinc-200/40" />
        <div className="flex items-center gap-1">
          <div className="size-3.5 rounded bg-zinc-200/60 shrink-0" />
          <div className="h-3 w-14 bg-zinc-200/60 rounded" />
        </div>
        <div className="h-3 w-3 rounded-full bg-zinc-200/40" />
        <div className="flex items-center gap-1">
          <div className="size-3.5 rounded bg-zinc-200/60 shrink-0" />
          <div className="h-3 w-24 bg-zinc-200/70 rounded" />
        </div>
        <div className="h-3 w-3 rounded-full bg-zinc-200/40" />
        <div className="flex items-center gap-1">
          <div className="size-3.5 rounded bg-zinc-200/50 shrink-0" />
          <div className="h-3 w-28 bg-zinc-200/50 rounded" />
        </div>
      </div>

      {/* 3. Status Notice Banner */}
      <div className="p-3 rounded-lg bg-zinc-50/80 border border-zinc-200/70 flex items-center gap-2">
        <div className="size-2 rounded-full bg-forest/20 shrink-0" />
        <div className="h-3 w-56 sm:w-72 bg-zinc-200/60 rounded" />
      </div>

      {/* 4. 5-Stage Timeline Skeleton */}
      <div className="pt-2">
        {/* Desktop: Horizontal 5-col grid (lg+) */}
        <div className="hidden lg:grid grid-cols-5 gap-2 relative">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex flex-col relative">
              {/* Connector line */}
              {i < 5 && (
                <div className="absolute top-3.5 left-7 right-[-8px] h-0.5 z-0 bg-zinc-200" />
              )}
              {/* Stage icon + title */}
              <div className="flex items-center gap-2 relative z-10 mb-2">
                <div
                  className={`size-6 sm:size-7 rounded-full shrink-0 border ${
                    i === 1
                      ? "bg-emerald-600/20 border-emerald-200"
                      : i === 2
                      ? "bg-forest/15 ring-4 ring-forest/10 border-transparent"
                      : "bg-zinc-100 border-zinc-200"
                  }`}
                />
                <div className={`h-3 rounded bg-zinc-200/70 ${i === 1 ? "w-16" : i === 2 ? "w-20" : "w-14"}`} />
              </div>
              {/* Subtitle + date */}
              <div className="pl-8 space-y-1.5">
                <div className="h-2.5 w-20 bg-zinc-200/50 rounded" />
                <div className="h-2 w-16 bg-zinc-200/40 rounded" />
                {i === 2 && (
                  <div className="h-5 w-20 rounded bg-forest/15 mt-0.5" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: Vertical stack (<lg) */}
        <div className="lg:hidden space-y-3 relative pl-2">
          <div className="absolute left-5 top-3 bottom-3 w-0.5 bg-zinc-200" />
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-start gap-3 relative z-10">
              <div
                className={`size-6 sm:size-7 rounded-full shrink-0 border ${
                  i === 1
                    ? "bg-emerald-600/20 border-emerald-200"
                    : i === 2
                    ? "bg-forest/15 ring-4 ring-forest/10 border-transparent"
                    : "bg-zinc-100 border-zinc-200"
                }`}
              />
              <div className="flex-1 min-w-0 bg-zinc-50/70 p-2.5 rounded-lg border border-zinc-200/60 space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="h-3 w-24 bg-zinc-200 rounded" />
                  <div className="h-2.5 w-16 bg-zinc-200/50 rounded" />
                </div>
                <div className="h-2.5 w-36 bg-zinc-200/50 rounded" />
                {i === 2 && (
                  <div className="h-5 w-24 rounded bg-forest/15 mt-0.5" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Footer Actions */}
      <div className="pt-3 border-t border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
        {/* Left: View Documents + Withdraw */}
        <div className="flex items-center gap-2">
          <div className="h-7 sm:h-8 w-32 rounded bg-white border border-zinc-200/80 shadow-2xs" />
          <div className="h-7 sm:h-8 w-20 rounded border border-zinc-200/80" />
        </div>
        {/* Right: View Job Details */}
        <div className="h-7 sm:h-8 w-full sm:w-32 rounded-lg bg-forest/20 shadow-2xs" />
      </div>
    </div>
  );
}
