/**
 * Skeleton for CandidateInterviewCard.
 * Mirrors exact structure:
 *  1. Header (avatar + job title/company/dept + status badge)
 *  2. Round name pill
 *  3. Schedule & platform meta row
 *  4. Instructions collapsible bar
 *  5. Footer (Add to Calendar + Message Employer | Join Meeting)
 */
export default function CandidateInterviewCardSkeleton() {
  return (
    <div className="group relative bg-white rounded p-4 sm:p-5 border border-zinc-200/80 shadow-xs flex flex-col justify-between gap-4 animate-pulse select-none">
      <div className="space-y-3">
        {/* 1. Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 sm:gap-3">
          {/* Avatar + Title + Company */}
          <div className="flex items-start gap-3 min-w-0 flex-1">
            <div className="size-10 sm:size-11 rounded-xl bg-[#244034]/15 shrink-0" />
            <div className="min-w-0 flex-1 space-y-1.5">
              <div className="h-5 sm:h-6 w-44 sm:w-60 bg-zinc-200 rounded" />
              <div className="flex items-center gap-1.5 flex-wrap">
                <div className="h-3 w-24 bg-zinc-200/70 rounded" />
                <div className="h-2.5 w-2.5 rounded-full bg-zinc-200/50" />
                <div className="h-3 w-20 bg-zinc-200/50 rounded" />
              </div>
            </div>
          </div>

          {/* Status badge */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="h-7 w-24 rounded bg-[#EDF6F1] border border-[#C2E4D2]/60" />
          </div>
        </div>

        {/* 2. Round Name Pill */}
        <div className="h-7 w-40 rounded bg-zinc-50 border border-zinc-200/80" />

        {/* 3. Schedule & Platform Meta */}
        <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1.5">
          <div className="flex items-center gap-1.5">
            <div className="size-3.5 rounded bg-forest/20 shrink-0" />
            <div className="h-3 w-24 bg-zinc-200/70 rounded" />
          </div>
          <div className="h-3 w-3 rounded-full bg-zinc-200/40" />
          <div className="flex items-center gap-1.5">
            <div className="size-3.5 rounded bg-zinc-200/50 shrink-0" />
            <div className="h-3 w-28 bg-zinc-200/60 rounded" />
          </div>
          <div className="h-3 w-3 rounded-full bg-zinc-200/40" />
          <div className="h-5 w-24 rounded bg-blue-50 border border-blue-200/60" />
        </div>

        {/* 4. Instructions collapsible bar */}
        <div className="rounded border border-zinc-200/70 bg-zinc-50/60 px-3 py-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="size-3.5 rounded bg-forest/20 shrink-0" />
            <div className="h-3 w-36 bg-zinc-200/60 rounded" />
          </div>
          <div className="size-3.5 rounded bg-zinc-200/50 shrink-0" />
        </div>
      </div>

      {/* 5. Footer Actions */}
      <div className="pt-3.5 border-t border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Left: Add to Calendar + Message Employer */}
        <div className="flex items-center gap-2">
          <div className="h-8 w-32 rounded border border-zinc-200 bg-white shadow-2xs" />
          <div className="h-8 w-32 rounded border border-zinc-200 bg-white shadow-2xs" />
        </div>
        {/* Right: Join Meeting CTA */}
        <div className="h-9 w-full sm:w-32 rounded bg-forest/20 shadow-2xs" />
      </div>
    </div>
  );
}
