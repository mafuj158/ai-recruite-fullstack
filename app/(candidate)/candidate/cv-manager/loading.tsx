export default function CVManagerLoading() {
  return (
    <div
      className="w-full space-y-3 xs:space-y-4 sm:space-y-6 animate-pulse select-none"
      role="status"
      aria-label="Loading CV Manager..."
    >
      {/* 1. Page Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="size-5 xs:size-6 sm:size-7 rounded bg-forest/20 shrink-0" />
            <div className="h-6 xs:h-7 sm:h-8 w-44 xs:w-56 sm:w-64 bg-zinc-200 rounded" />
          </div>
          <div className="h-3.5 sm:h-4 w-64 sm:w-[480px] max-w-full bg-zinc-200/60 rounded mt-1.5" />
        </div>
      </div>

      {/* 2. CVOverviewCard Skeleton */}
      <div className="bg-white rounded p-4 sm:p-6 border border-zinc-200/80 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6">
        {/* File Meta Info: icon + filename + meta */}
        <div className="flex items-start sm:items-center gap-3.5 sm:gap-4 min-w-0">
          <div className="size-12 sm:size-14 rounded-xl bg-forest/15 shrink-0" />
          <div className="min-w-0 space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="h-5 sm:h-6 w-40 sm:w-56 bg-zinc-200 rounded" />
              <div className="h-5 w-36 rounded-full bg-[#EDF6F1] border border-[#C2E4D2]/60" />
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3.5 w-20 bg-zinc-200/60 rounded" />
              <div className="h-3 w-3 rounded-full bg-zinc-200/40" />
              <div className="h-3.5 w-28 bg-zinc-200/60 rounded" />
            </div>
          </div>
        </div>

        {/* Action Buttons: Download PDF, Replace CV, Generate with AI */}
        <div className="flex items-center gap-2.5 flex-wrap pt-2 lg:pt-0 border-t lg:border-t-0 border-zinc-100 shrink-0">
          <div className="h-9 w-28 rounded border border-zinc-200 bg-white shadow-2xs" />
          <div className="h-9 w-24 rounded border border-zinc-200 bg-white shadow-2xs" />
          <div className="h-9 w-32 rounded bg-forest/20 shadow-2xs" />
        </div>
      </div>

      {/* 3. ATSScoreCard Skeleton */}
      <div className="bg-white rounded p-4 sm:p-6 border border-zinc-200/80 shadow-xs space-y-5">
        {/* 3a. Header & Overall Score */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-100">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-forest/10 shrink-0" />
            <div className="space-y-1.5">
              <div className="h-5 w-44 sm:w-56 bg-zinc-200 rounded" />
              <div className="h-3.5 w-64 sm:w-80 max-w-full bg-zinc-200/50 rounded" />
            </div>
          </div>
          {/* Score badge */}
          <div className="flex items-end gap-1 self-start sm:self-auto">
            <div className="h-8 sm:h-10 w-14 bg-zinc-200 rounded" />
            <div className="h-4 w-6 bg-zinc-200/60 rounded mb-0.5" />
          </div>
        </div>

        {/* 3b. 4-Pillar Metric Bars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {["Formatting", "Role Relevance", "Impact Metrics", "Keyword Density"].map((label, i) => (
            <div key={i} className="p-3 rounded-lg bg-zinc-50/80 border border-zinc-200/60 space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="h-3 w-20 bg-zinc-200/70 rounded" />
                <div className="h-3 w-8 bg-zinc-200 rounded" />
              </div>
              <div className="h-1.5 w-full bg-zinc-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-forest/30"
                  style={{ width: `${[92, 78, 85, 80][i]}%` }}
                />
              </div>
              <div className="h-2.5 w-28 bg-zinc-200/40 rounded" />
            </div>
          ))}
        </div>

        {/* 3c. Strengths & Missing Keywords 2-col */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          {/* Left: ATS Parsed Strengths */}
          <div className="space-y-2">
            <div className="h-3 w-32 bg-zinc-200/70 rounded" />
            <div className="space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="size-3.5 rounded bg-emerald-200/70 shrink-0 mt-0.5" />
                  <div className={`h-3 bg-zinc-200/60 rounded ${i % 2 === 0 ? "w-full" : "w-5/6"}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Missing Keywords */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <div className="size-3 rounded bg-amber-200 shrink-0" />
                <div className="h-3 w-44 bg-zinc-200/70 rounded" />
              </div>
              <div className="h-2.5 w-20 bg-zinc-200/40 rounded" />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {[52, 48, 64, 56, 44, 60].map((w, i) => (
                <div
                  key={i}
                  className="h-7 rounded bg-amber-50 border border-amber-200/60"
                  style={{ width: `${w}px` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. AICVDiffEditor Skeleton */}
      <div className="bg-white rounded p-4 sm:p-6 border border-zinc-200/80 shadow-xs space-y-5">
        {/* 4a. Header & Section Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-100">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Title */}
            <div className="flex items-center gap-1.5 mr-2">
              <div className="size-4 rounded bg-forest/20" />
              <div className="h-5 w-44 bg-zinc-200 rounded" />
            </div>
            {/* Section tab pills */}
            <div className="flex items-center gap-1 bg-zinc-100 p-0.5 rounded">
              {[88, 104, 128, 100].map((w, i) => (
                <div
                  key={i}
                  className={`h-6 rounded ${i === 0 ? "bg-white shadow-2xs" : ""}`}
                  style={{ width: `${w}px` }}
                />
              ))}
            </div>
          </div>
          {/* Accept All button */}
          <div className="h-8 w-40 rounded bg-forest/20 shadow-2xs self-start sm:self-auto" />
        </div>

        {/* 4b. 3 Suggestion diff cards */}
        <div className="space-y-4">
          {[1, 2, 3].map((card) => (
            <div
              key={card}
              className="rounded-xl border border-zinc-200/80 shadow-2xs bg-white p-4 sm:p-5 space-y-3.5"
            >
              {/* Card top row: section pill + title + status */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="h-5 w-20 rounded bg-zinc-100" />
                  <div className="h-4 w-48 sm:w-64 bg-zinc-200 rounded" />
                </div>
                <div className="h-5 w-28 rounded-full bg-emerald-100 border border-emerald-200/60 self-start sm:self-auto" />
              </div>

              {/* Side-by-side diff columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {/* Left: Original (rose tint) */}
                <div className="rounded-lg p-3 sm:p-3.5 bg-rose-50/40 border border-rose-200/50 space-y-1.5">
                  <div className="h-2.5 w-32 bg-rose-200/70 rounded" />
                  <div className="space-y-1.5">
                    <div className="h-3 w-full bg-zinc-200/60 rounded" />
                    <div className="h-3 w-5/6 bg-zinc-200/50 rounded" />
                    <div className="h-3 w-4/5 bg-zinc-200/50 rounded" />
                  </div>
                </div>

                {/* Right: AI Enhanced (emerald tint) */}
                <div className="rounded-lg p-3 sm:p-3.5 bg-emerald-50/50 border border-emerald-200/60 space-y-1.5">
                  <div className="h-2.5 w-36 bg-emerald-200/70 rounded" />
                  <div className="space-y-1.5">
                    <div className="h-3 w-full bg-zinc-200/60 rounded" />
                    <div className="h-3 w-full bg-zinc-200/50 rounded" />
                    <div className="h-3 w-3/4 bg-zinc-200/50 rounded" />
                  </div>
                </div>
              </div>

              {/* AI Reasoning pill */}
              <div className="flex items-start gap-1.5 bg-zinc-50/70 p-2.5 rounded border border-zinc-200/50">
                <div className="size-3.5 rounded bg-forest/20 shrink-0 mt-0.5" />
                <div className="space-y-1.5 flex-1">
                  <div className="h-2.5 w-full bg-zinc-200/60 rounded" />
                  <div className="h-2.5 w-4/5 bg-zinc-200/40 rounded" />
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-end gap-2 pt-1 border-t border-zinc-100">
                <div className="h-7 w-20 rounded bg-zinc-100" />
                <div className="h-7 w-24 rounded bg-zinc-100" />
                <div className="h-7 w-28 rounded bg-forest/20" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
