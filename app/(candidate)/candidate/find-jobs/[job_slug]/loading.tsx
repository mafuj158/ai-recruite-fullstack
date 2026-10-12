export default function JobDetailsLoading() {
  return (
    <div
      className="w-full space-y-5 sm:space-y-6 animate-pulse select-none"
      role="status"
      aria-label="Loading job details..."
    >
      {/* 1. Breadcrumb & Back Link Skeleton */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5">
          <div className="size-3.5 rounded bg-zinc-200/70" />
          <div className="h-3.5 w-28 bg-zinc-200/60 rounded" />
        </div>
        <div className="flex items-center gap-1">
          <div className="size-3.5 rounded bg-zinc-200/50" />
          <div className="h-3 w-24 bg-zinc-200/50 rounded" />
        </div>
      </div>

      {/* 2. Main Header Banner Card Skeleton */}
      <div className="p-4 sm:p-6 rounded bg-white border border-zinc-200/80 shadow-xs flex flex-col md:flex-row md:items-start justify-between gap-4 sm:gap-6">
        {/* Left: Avatar + Title + Meta */}
        <div className="flex items-start gap-3.5 sm:gap-4 flex-1 min-w-0">
          <div className="size-12 sm:size-14 rounded-xl bg-[#244034]/15 shrink-0" />

          <div className="min-w-0 flex-1 space-y-1.5">
            {/* Title + Status badge */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="h-6 sm:h-7 w-48 sm:w-72 bg-zinc-200 rounded" />
              <div className="h-5 w-16 rounded bg-emerald-50 border border-emerald-200/70" />
            </div>

            {/* Company / dept / location meta chips */}
            <div className="flex items-center gap-2 flex-wrap pt-0.5">
              <div className="h-3.5 w-24 bg-zinc-200 rounded" />
              <div className="h-3 w-3 rounded-full bg-zinc-200/40" />
              <div className="h-3.5 w-20 bg-zinc-200/60 rounded" />
              <div className="h-3 w-3 rounded-full bg-zinc-200/40" />
              <div className="h-3.5 w-20 bg-zinc-200/60 rounded" />
              <div className="h-3 w-3 rounded-full bg-zinc-200/40" />
              <div className="h-5 w-16 rounded bg-zinc-100" />
            </div>
          </div>
        </div>

        {/* Right: AI Match Score + action buttons */}
        <div className="flex flex-wrap md:flex-col items-stretch sm:items-end justify-between md:justify-start gap-2.5 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-zinc-100">
          <div className="flex items-center gap-2">
            {/* AI Match pill */}
            <div className="h-7 w-28 rounded-full bg-[#EDF6F1] border border-[#C2E4D2]/60" />
            {/* Share button */}
            <div className="size-8 rounded-lg bg-zinc-50 border border-zinc-200/80" />
            {/* Bookmark button */}
            <div className="size-8 rounded-lg bg-zinc-50 border border-zinc-200/80" />
          </div>
          {/* Apply Now CTA */}
          <div className="h-9 sm:h-10 w-full sm:w-28 rounded bg-forest/20" />
        </div>
      </div>

      {/* 3. Responsive 2-Column Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 xl:gap-6 items-start">

        {/* LEFT Column: Overview sections (7 cols on lg, 8 cols on xl) */}
        <div className="lg:col-span-7 xl:col-span-8 min-w-0 space-y-5 sm:space-y-6">

          {/* About the Role section */}
          <div className="bg-white rounded p-5 sm:p-6 border border-zinc-200/80 shadow-xs space-y-3">
            {/* Section heading */}
            <div className="flex items-center gap-2">
              <div className="size-4 rounded bg-forest/20" />
              <div className="h-4 sm:h-5 w-32 bg-zinc-200 rounded" />
            </div>
            {/* Description text lines */}
            <div className="space-y-2">
              <div className="h-3 w-full bg-zinc-200/60 rounded" />
              <div className="h-3 w-full bg-zinc-200/60 rounded" />
              <div className="h-3 w-11/12 bg-zinc-200/60 rounded" />
              <div className="h-3 w-4/5 bg-zinc-200/60 rounded" />
              <div className="h-3 w-3/4 bg-zinc-200/50 rounded" />
            </div>
          </div>

          {/* Key Responsibilities section */}
          <div className="bg-white rounded p-5 sm:p-6 border border-zinc-200/80 shadow-xs space-y-3.5">
            <div className="flex items-center gap-2">
              <div className="size-4 rounded bg-forest/20" />
              <div className="h-4 sm:h-5 w-36 bg-zinc-200 rounded" />
            </div>
            <div className="space-y-2.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="size-1.5 rounded-full bg-forest/30 mt-2 shrink-0" />
                  <div className={`h-3 bg-zinc-200/60 rounded ${i % 3 === 0 ? "w-3/4" : i % 2 === 0 ? "w-full" : "w-11/12"}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Qualifications & Experience section */}
          <div className="bg-white rounded p-5 sm:p-6 border border-zinc-200/80 shadow-xs space-y-3.5">
            <div className="flex items-center gap-2">
              <div className="size-4 rounded bg-forest/20" />
              <div className="h-4 sm:h-5 w-44 bg-zinc-200 rounded" />
            </div>
            <div className="space-y-2.5">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="size-1.5 rounded-full bg-emerald-600/30 mt-2 shrink-0" />
                  <div className={`h-3 bg-zinc-200/60 rounded ${i % 2 === 0 ? "w-full" : "w-5/6"}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack / Skills section */}
          <div className="bg-white rounded p-5 sm:p-6 border border-zinc-200/80 shadow-xs space-y-3.5">
            <div className="flex items-center gap-2">
              <div className="size-4 rounded bg-forest/20" />
              <div className="h-4 sm:h-5 w-28 bg-zinc-200 rounded" />
            </div>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <div
                  key={i}
                  className={`h-7 rounded bg-zinc-100 border border-zinc-200/60 ${i % 3 === 0 ? "w-20" : i % 2 === 0 ? "w-16" : "w-24"}`}
                />
              ))}
            </div>
          </div>

          {/* Benefits section */}
          <div className="bg-white rounded p-5 sm:p-6 border border-zinc-200/80 shadow-xs space-y-3.5">
            <div className="flex items-center gap-2">
              <div className="size-4 rounded bg-forest/20" />
              <div className="h-4 sm:h-5 w-28 bg-zinc-200 rounded" />
            </div>
            <div className="space-y-2.5">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="size-1.5 rounded-full bg-zinc-300 mt-2 shrink-0" />
                  <div className={`h-3 bg-zinc-200/60 rounded ${i === 1 ? "w-3/4" : i === 2 ? "w-5/6" : "w-2/3"}`} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT Column: AI Insights + Sidebar (5 cols on lg, 4 cols on xl) */}
        <div className="lg:col-span-5 xl:col-span-4 min-w-0 space-y-4 sm:space-y-5">

          {/* AI Match Analysis Card */}
          <div className="bg-white rounded p-4 sm:p-5 border border-zinc-200/80 shadow-xs space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <div className="size-7 rounded-md bg-[#EDF6F1]" />
                <div className="space-y-1">
                  <div className="h-3.5 w-32 bg-zinc-200 rounded" />
                  <div className="h-2.5 w-44 bg-zinc-200/50 rounded" />
                </div>
              </div>
              <div className="h-5 w-20 rounded bg-emerald-50 border border-emerald-200/60" />
            </div>

            {/* Circular score + summary */}
            <div className="flex items-center gap-4 p-3 rounded-lg bg-[#F6FBF8] border border-[#C2E4D2]/60">
              <div className="size-14 rounded-full bg-zinc-100 border-4 border-emerald-200/50 shrink-0" />
              <div className="space-y-1.5 flex-1">
                <div className="h-3.5 w-24 bg-zinc-200 rounded" />
                <div className="h-2.5 w-full bg-zinc-200/60 rounded" />
                <div className="h-2.5 w-4/5 bg-zinc-200/50 rounded" />
              </div>
            </div>

            {/* Strengths matched */}
            <div className="space-y-2">
              <div className="h-3 w-28 bg-zinc-200/70 rounded" />
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="size-4 rounded bg-emerald-50 border border-emerald-200/50 shrink-0" />
                  <div className={`h-3 bg-zinc-200/60 rounded ${i === 1 ? "w-3/4" : i === 2 ? "w-2/3" : "w-4/5"}`} />
                </div>
              ))}
            </div>

            {/* Missing skills / gaps */}
            <div className="space-y-2">
              <div className="h-3 w-24 bg-zinc-200/70 rounded" />
              {[1, 2].map((i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="size-4 rounded bg-amber-50 border border-amber-200/50 shrink-0" />
                  <div className={`h-3 bg-zinc-200/60 rounded ${i === 1 ? "w-1/2" : "w-2/3"}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Job Overview Quick Facts Card */}
          <div className="bg-white rounded p-4 sm:p-5 border border-zinc-200/80 shadow-xs space-y-4">
            {/* Heading */}
            <div className="h-3.5 w-24 bg-zinc-200 rounded" />

            {/* Quick Facts list */}
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="size-4 rounded bg-zinc-100 shrink-0" />
                    <div className="h-3 w-24 bg-zinc-200/70 rounded" />
                  </div>
                  <div className={`h-3 bg-zinc-200 rounded ${i === 1 ? "w-28" : i === 2 ? "w-16" : i === 3 ? "w-20" : "w-24"}`} />
                </div>
              ))}
            </div>

            <div className="border-t border-zinc-100 pt-3 space-y-2.5">
              {/* Apply CTA */}
              <div className="h-10 w-full rounded bg-forest/20" />
              {/* Secondary links */}
              <div className="flex items-center justify-center gap-1">
                <div className="size-3.5 rounded bg-zinc-200/60" />
                <div className="h-3 w-32 bg-zinc-200/50 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
