export default function CandidateJobCardSkeleton() {
  return (
    <div className="group relative bg-white rounded p-4 sm:p-5 border border-zinc-200/80 shadow-xs flex flex-col justify-between gap-3 sm:gap-4 animate-pulse select-none">
      {/* Top Header Row */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 sm:gap-3">
          {/* Avatar & Title & Company */}
          <div className="flex items-start gap-3 min-w-0 flex-1">
            {/* Company avatar */}
            <div className="size-10 sm:size-11 rounded-xl bg-[#244034]/15 shrink-0" />

            <div className="min-w-0 flex-1 space-y-1.5">
              {/* Job title */}
              <div className="h-5 sm:h-6 w-44 sm:w-64 bg-zinc-200 rounded" />
              {/* Company • dept meta */}
              <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                <div className="h-3 w-24 bg-zinc-200/70 rounded" />
                <div className="h-2.5 w-2.5 rounded-full bg-zinc-200/50" />
                <div className="h-3 w-20 bg-zinc-200/50 rounded" />
              </div>
            </div>
          </div>

          {/* Right Actions: Status badge + AI match + bookmark */}
          <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0 w-full sm:w-auto">
            {/* Status badge (Active) */}
            <div className="h-5 w-14 rounded bg-emerald-50 border border-emerald-200/60" />
            {/* AI match pill */}
            <div className="h-6 w-20 rounded-full bg-[#EDF6F1] border border-[#C2E4D2]/60" />
            {/* Bookmark button */}
            <div className="size-8 rounded-lg bg-zinc-50 border border-zinc-200/80" />
          </div>
        </div>

        {/* Primary Meta Row: location • work type • experience • salary • deadline */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <div className="flex items-center gap-1">
            <div className="size-3.5 rounded bg-zinc-200/60 shrink-0" />
            <div className="h-3 w-20 bg-zinc-200/60 rounded" />
          </div>
          <div className="h-3 w-3 rounded-full bg-zinc-200/40" />
          <div className="h-5 w-16 rounded bg-zinc-100 border border-zinc-200/60" />
          <div className="h-3 w-3 rounded-full bg-zinc-200/40" />
          <div className="flex items-center gap-1">
            <div className="size-3.5 rounded bg-zinc-200/60 shrink-0" />
            <div className="h-3 w-16 bg-zinc-200/60 rounded" />
          </div>
          <div className="h-3 w-3 rounded-full bg-zinc-200/40" />
          <div className="flex items-center gap-1">
            <div className="size-3.5 rounded bg-zinc-200/60 shrink-0" />
            <div className="h-3 w-24 bg-zinc-200/70 rounded" />
          </div>
        </div>

        {/* Description Excerpt: 2 lines */}
        <div className="space-y-1.5">
          <div className="h-3.5 w-full bg-zinc-200/60 rounded" />
          <div className="h-3.5 w-4/5 bg-zinc-200/50 rounded" />
        </div>

        {/* Required Skills Chips */}
        <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
          {[56, 72, 48, 64, 52].map((w, i) => (
            <div
              key={i}
              className="h-5 rounded bg-zinc-50 border border-zinc-200/70"
              style={{ width: `${w}px` }}
            />
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="pt-3.5 border-t border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
        {/* Posted time */}
        <div className="flex items-center gap-1">
          <div className="size-3.5 rounded bg-zinc-200/50 shrink-0" />
          <div className="h-3 w-20 bg-zinc-200/50 rounded" />
        </div>

        {/* Buttons: View Details + Apply Now */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="h-7 sm:h-8 w-full sm:w-24 rounded border border-zinc-200/80 bg-white shadow-2xs" />
          <div className="h-7 sm:h-8 w-full sm:w-24 rounded bg-forest/20 shadow-2xs" />
        </div>
      </div>
    </div>
  );
}
