import CandidateJobCardSkeleton from "@/app/(candidate)/candidate/_components/candidate-job-card-skeleton";

export default function SavedJobsLoading() {
  return (
    <div
      className="w-full space-y-3 xs:space-y-4 sm:space-y-6 animate-pulse select-none"
      role="status"
      aria-label="Loading saved jobs..."
    >
      {/* 1. Page Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="size-5 xs:size-6 sm:size-7 rounded bg-forest/20 shrink-0" />
            <div className="h-6 xs:h-7 sm:h-8 w-28 xs:w-36 sm:w-40 bg-zinc-200 rounded" />
          </div>
          <div className="h-3.5 sm:h-4 w-64 sm:w-[440px] max-w-full bg-zinc-200/60 rounded mt-1.5" />
        </div>
      </div>

      {/* 2. Filter & Search Bar Skeleton */}
      <div className="space-y-0 bg-white rounded border border-zinc-200/80 shadow-xs">
        {/* Top Row: Search + Sort + Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-3 sm:p-3.5 border-b border-zinc-100">
          {/* Search input */}
          <div className="relative flex-1 min-w-0 flex items-center gap-2 px-2.5 py-2 rounded bg-zinc-50 border border-zinc-200/70">
            <div className="size-4 rounded bg-zinc-200/70 shrink-0" />
            <div className="h-3.5 w-full bg-zinc-100 rounded" />
          </div>

          {/* Sort + action buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="h-9 w-36 rounded bg-zinc-50 border border-zinc-200/70" />
            <div className="h-9 w-28 rounded bg-zinc-50 border border-zinc-200/70" />
            <div className="h-9 w-9 rounded bg-zinc-50 border border-zinc-200/70" />
          </div>
        </div>

        {/* Scrollable Tab Pills Row */}
        <div className="flex items-center gap-2 p-3 sm:p-3.5 overflow-x-auto">
          {[72, 64, 56, 64, 96].map((w, i) => (
            <div
              key={i}
              className={`h-7 rounded shrink-0 ${i === 0 ? "bg-forest/15" : "bg-zinc-100"}`}
              style={{ width: `${w}px` }}
            />
          ))}
        </div>
      </div>

      {/* 3. Salary Benchmark Comparison Skeleton */}
      <div className="relative rounded bg-gradient-to-br from-white via-[#F6FAF7] to-[#EDF6F1]/40 border border-[#C2E4D2] p-4 sm:p-5 shadow-2xs space-y-3.5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="size-7 sm:size-8 rounded bg-forest/10 shrink-0" />
            <div className="space-y-1">
              <div className="flex items-center gap-1.5">
                <div className="h-4 w-44 bg-zinc-200 rounded" />
                <div className="h-4 w-20 rounded-full bg-forest/15" />
              </div>
              <div className="h-3 w-48 bg-zinc-200/50 rounded" />
            </div>
          </div>
          <div className="size-7 rounded bg-zinc-100 border border-zinc-200/60 shrink-0" />
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded p-3 border border-zinc-200/60 space-y-1.5">
              <div className="flex items-center gap-1.5">
                <div className="size-3.5 rounded bg-zinc-200/70 shrink-0" />
                <div className="h-2.5 w-16 bg-zinc-200/70 rounded" />
              </div>
              <div className="h-4 w-20 bg-zinc-200 rounded" />
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="space-y-1.5">
          <div className="h-2.5 w-full bg-zinc-100 rounded-full overflow-hidden">
            <div className="h-full w-2/3 bg-[#C2E4D2]/60 rounded-full" />
          </div>
          <div className="flex justify-between">
            <div className="h-2.5 w-8 bg-zinc-200/50 rounded" />
            <div className="h-2.5 w-12 bg-zinc-200/50 rounded" />
            <div className="h-2.5 w-8 bg-zinc-200/50 rounded" />
          </div>
        </div>
      </div>

      {/* 4. Jobs Cards Feed Skeleton */}
      <div className="grid grid-cols-1 gap-3 sm:gap-4">
        {[1, 2, 3, 4].map((i) => (
          <CandidateJobCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
