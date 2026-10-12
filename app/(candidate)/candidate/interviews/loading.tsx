import CandidateInterviewCardSkeleton from "./_components/candidate-interview-card-skeleton";

export default function InterviewsLoading() {
  return (
    <div
      className="w-full space-y-3 xs:space-y-4 sm:space-y-6 animate-pulse select-none"
      role="status"
      aria-label="Loading interviews..."
    >
      {/* 1. Page Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="size-5 xs:size-6 sm:size-7 rounded bg-forest/20 shrink-0" />
            <div className="h-6 xs:h-7 sm:h-8 w-28 xs:w-36 sm:w-40 bg-zinc-200 rounded" />
          </div>
          <div className="h-3.5 sm:h-4 w-64 sm:w-115 max-w-full bg-zinc-200/60 rounded mt-1.5" />
        </div>
      </div>

      {/* 2. Next Upcoming Interview Alert Banner Skeleton */}
      <div className="bg-forest/5 border border-forest/20 rounded p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          {/* Calendar icon */}
          <div className="size-10 rounded-xl bg-forest/15 shrink-0" />
          <div className="space-y-1.5">
            {/* "Next Scheduled Round" label */}
            <div className="h-5 w-36 rounded bg-forest/10" />
            {/* Round name + company */}
            <div className="h-4 sm:h-5 w-52 sm:w-72 bg-zinc-200 rounded" />
            {/* Date + time + platform meta */}
            <div className="flex items-center gap-2 flex-wrap pt-0.5">
              <div className="flex items-center gap-1">
                <div className="size-3 rounded bg-zinc-200/60" />
                <div className="h-3 w-36 bg-zinc-200/60 rounded" />
              </div>
              <div className="h-2.5 w-2.5 rounded-full bg-zinc-200/40" />
              <div className="flex items-center gap-1">
                <div className="size-3 rounded bg-zinc-200/60" />
                <div className="h-3 w-20 bg-zinc-200/50 rounded" />
              </div>
            </div>
          </div>
        </div>
        {/* Join Meeting CTA */}
        <div className="h-10 sm:h-11 w-full sm:w-32 rounded bg-forest/20 shrink-0 shadow-2xs" />
      </div>

      {/* 3. Filter Bar Skeleton */}
      <div className="space-y-2.5 sm:space-y-3">
        {/* Primary bar: Search + scrollable tabs */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2.5 sm:gap-3 p-2 rounded bg-white border border-zinc-200/80 shadow-2xs">
          {/* Search field */}
          <div className="flex items-center gap-3 flex-1 min-w-0 pl-3 py-1.5 sm:py-2">
            <div className="size-4 rounded bg-zinc-200/70 shrink-0" />
            <div className="h-4 w-full max-w-sm bg-zinc-100 rounded" />
          </div>

          {/* Tab pills: All • Upcoming • Completed • Cancelled */}
          <div className="flex items-center gap-1 pt-1.5 lg:pt-0 border-t lg:border-t-0 border-zinc-100">
            {[72, 68, 76, 68].map((w, i) => (
              <div
                key={i}
                className={`h-7 rounded shrink-0 ${
                  i === 0
                    ? "bg-[#EDF6F1] border border-[#C2E4D2]/60"
                    : "bg-zinc-50 border border-zinc-200/60"
                }`}
                style={{ width: `${w + 16}px` }}
              />
            ))}
          </div>
        </div>

        {/* Secondary bar: Sort + results count */}
        <div className="flex items-center justify-between gap-2.5 px-2.5 sm:px-3 py-2 rounded bg-white border border-zinc-200/80 shadow-2xs">
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-zinc-50 border border-zinc-200/80">
            <div className="size-3.5 rounded bg-zinc-200/70 shrink-0" />
            <div className="h-3 w-10 bg-zinc-200/50 rounded" />
            <div className="h-3.5 w-24 bg-zinc-200/70 rounded" />
          </div>
          <div className="h-3.5 w-28 bg-zinc-200/60 rounded" />
        </div>
      </div>

      {/* 4. Interview Card Skeletons */}
      <div className="grid grid-cols-1 gap-4">
        {[1, 2, 3].map((i) => (
          <CandidateInterviewCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
