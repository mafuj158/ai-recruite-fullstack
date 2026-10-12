export default function AIInterviewLoading() {
  return (
    <div
      className="w-full space-y-3 xs:space-y-4 sm:space-y-6 animate-pulse select-none"
      role="status"
      aria-label="Loading AI Pre-Screening Interviews..."
    >
      {/* 1. Page Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="size-5 xs:size-6 sm:size-7 rounded bg-forest/20 shrink-0" />
            <div className="h-6 xs:h-7 sm:h-8 w-44 xs:w-56 sm:w-72 bg-zinc-200 rounded" />
          </div>
          <div className="h-3.5 sm:h-4 w-64 sm:w-[500px] max-w-full bg-zinc-200/60 rounded mt-1.5" />
        </div>
      </div>

      {/* 2. AIInterviewStatsCards — 4-col grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          "amber-50 border-amber-200/60",
          "[#F0F7F4] border-[#D5E6DC]/70",
          "emerald-50 border-emerald-200/60",
          "blue-50 border-blue-200/60",
        ].map((colors, i) => (
          <div
            key={i}
            className="bg-white border border-zinc-200/80 rounded p-3.5 sm:p-4 shadow-2xs flex flex-col justify-between gap-3"
          >
            <div className="flex items-center justify-between">
              <div className="h-3 w-24 bg-zinc-200/70 rounded" />
              <div
                className={`size-7 sm:size-8 rounded border bg-${colors.split(" ")[0]} ${colors.split(" ")[1]}`}
              />
            </div>
            <div className="space-y-1">
              <div className="h-5 sm:h-6 w-10 bg-zinc-200 rounded" />
              <div className="h-2.5 w-28 bg-zinc-200/50 rounded" />
            </div>
          </div>
        ))}
      </div>

      {/* 3. AIInterviewFilterBar */}
      <div className="space-y-2.5 sm:space-y-3">
        {/* Primary bar: Search + tabs */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2.5 p-2 rounded bg-white border border-zinc-200/80 shadow-2xs">
          <div className="flex items-center gap-3 flex-1 min-w-0 pl-3 py-1.5 sm:py-2">
            <div className="size-4 rounded bg-zinc-200/70 shrink-0" />
            <div className="h-4 w-full max-w-sm bg-zinc-100 rounded" />
          </div>
          {/* 3 tab pills: All Pre-Screenings • Action Required • Completed Reports */}
          <div className="flex items-center gap-1 pt-1.5 lg:pt-0 border-t lg:border-t-0 border-zinc-100">
            {[104, 100, 112].map((w, i) => (
              <div
                key={i}
                className={`h-7 rounded shrink-0 ${
                  i === 0
                    ? "bg-[#EDF6F1] border border-[#C2E4D2]/60"
                    : "bg-zinc-50 border border-zinc-200/60"
                }`}
                style={{ width: `${w}px` }}
              />
            ))}
          </div>
        </div>

        {/* Secondary bar: Sort + results count */}
        <div className="flex items-center justify-between gap-2.5 px-2.5 sm:px-3 py-2 rounded bg-white border border-zinc-200/80 shadow-2xs">
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-zinc-50 border border-zinc-200/80">
            <div className="size-3.5 rounded bg-zinc-200/70 shrink-0" />
            <div className="h-3 w-10 bg-zinc-200/50 rounded" />
            <div className="h-3.5 w-28 bg-zinc-200/70 rounded" />
          </div>
          <div className="h-3.5 w-28 bg-zinc-200/60 rounded" />
        </div>
      </div>

      {/* 4. Interview Cards Grid — 2-col on md+ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white border border-zinc-200/80 rounded p-4 sm:p-5 shadow-2xs flex flex-col justify-between gap-4"
          >
            {/* Card header: company logo + title + status badge */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3.5">
                {/* Company logo box */}
                <div className="size-11 sm:size-12 rounded bg-zinc-50 border border-zinc-200/80 shrink-0" />
                <div className="space-y-1.5">
                  {/* company • dept */}
                  <div className="flex items-center gap-1.5">
                    <div className="h-3 w-20 bg-zinc-200/70 rounded" />
                    <div className="h-2.5 w-2.5 rounded-full bg-zinc-200/40" />
                    <div className="h-3 w-16 bg-zinc-200/60 rounded" />
                  </div>
                  {/* Job title */}
                  <div className="h-4 sm:h-5 w-40 sm:w-48 bg-zinc-200 rounded" />
                  {/* exp level • applied date */}
                  <div className="h-2.5 w-36 bg-zinc-200/50 rounded" />
                </div>
              </div>
              {/* Status badge: amber (pending) for odd, emerald (completed) for even */}
              <div
                className={`h-7 w-28 rounded border shrink-0 ${
                  i % 2 !== 0
                    ? "bg-amber-50 border-amber-200/70"
                    : "bg-emerald-50 border-emerald-200/70"
                }`}
              />
            </div>

            {/* Middle specs: questions • duration • deadline */}
            <div className="pt-2 pb-1 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <div className="size-3.5 rounded bg-forest/20 shrink-0" />
                  <div className="h-3 w-20 bg-zinc-200/60 rounded" />
                </div>
                <div className="h-3.5 w-px bg-zinc-200" />
                <div className="flex items-center gap-1.5">
                  <div className="size-3.5 rounded bg-forest/20 shrink-0" />
                  <div className="h-3 w-16 bg-zinc-200/60 rounded" />
                </div>
                <div className="h-3.5 w-px bg-zinc-200" />
                <div className="flex items-center gap-1.5">
                  <div className="size-3.5 rounded bg-amber-200/60 shrink-0" />
                  <div className="h-3 w-20 bg-zinc-200/50 rounded" />
                </div>
              </div>
              {/* Verdict pill (completed cards) */}
              {i % 2 === 0 && (
                <div className="h-5 w-24 rounded bg-emerald-50 border border-emerald-200/50" />
              )}
            </div>

            {/* Footer CTA */}
            <div className="pt-2 border-t border-zinc-100 flex items-center justify-end">
              <div
                className={`h-9 w-36 rounded shadow-2xs ${
                  i % 2 !== 0 ? "bg-forest/20" : "bg-[#F0F7F4] border border-[#D5E6DC]"
                }`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
