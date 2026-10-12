export default function CandidatePrivacyLoading() {
  return (
    <div
      className="w-full bg-white rounded p-4 sm:p-6 lg:p-8 border border-zinc-200/80 shadow-xs space-y-5 sm:space-y-6 lg:space-y-7 animate-pulse select-none"
      role="status"
      aria-label="Loading Privacy & Recruiter Visibility settings..."
    >
      {/* 1. Recruiter Search & Discovery Mode Skeleton */}
      <div className="space-y-4">
        <div className="space-y-1">
          <div className="h-5 w-64 sm:w-80 bg-zinc-200 rounded" />
          <div className="h-3.5 w-80 max-w-full bg-zinc-100 rounded" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-3.5 sm:p-4 rounded border border-zinc-200 bg-white space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="h-4 w-32 bg-zinc-200 rounded" />
                <div className="size-4 rounded-full border-2 border-zinc-300" />
              </div>
              <div className="space-y-1">
                <div className="h-3 w-full bg-zinc-100 rounded" />
                <div className="h-3 w-4/5 bg-zinc-100 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-zinc-100" />

      {/* 2. Blocked Companies & Employer Exclusions Skeleton */}
      <div className="space-y-4">
        <div className="space-y-1">
          <div className="h-5 w-72 sm:w-88 bg-zinc-200 rounded" />
          <div className="h-3.5 w-80 max-w-full bg-zinc-100 rounded" />
        </div>

        <div className="rounded border border-zinc-200/80 divide-y divide-zinc-100 overflow-hidden">
          {/* Automatically Exclude Current Employer */}
          <div className="p-3.5 sm:p-4 flex items-center justify-between gap-4">
            <div className="flex items-start gap-3 min-w-0">
              <div className="size-8 rounded bg-forest/10 shrink-0 mt-0.5" />
              <div className="space-y-1.5 min-w-0">
                <div className="h-4 w-60 bg-zinc-200 rounded" />
                <div className="h-3 w-80 max-w-full bg-zinc-100 rounded" />
              </div>
            </div>
            <div className="w-11 h-6 rounded-full bg-forest/20 shrink-0" />
          </div>

          {/* Specific Blocked Companies Area */}
          <div className="p-3.5 sm:p-4 space-y-3 bg-zinc-50/40">
            <div className="space-y-1">
              <div className="h-4 w-44 bg-zinc-200 rounded" />
              <div className="h-3 w-80 max-w-full bg-zinc-100 rounded" />
            </div>

            {/* Blocked Company Chips */}
            <div className="flex flex-wrap items-center gap-1.5 min-h-[30px]">
              <div className="h-6 w-24 rounded bg-rose-50 border border-rose-200/80" />
              <div className="h-6 w-28 rounded bg-rose-50 border border-rose-200/80" />
              <div className="h-6 w-20 rounded bg-rose-50 border border-rose-200/80" />
            </div>

            {/* Add Blocked Company Input Bar */}
            <div className="flex items-center gap-2 max-w-md pt-1">
              <div className="h-8 flex-1 rounded bg-zinc-100 border border-zinc-200/80" />
              <div className="h-8 w-16 bg-forest/20 rounded shrink-0" />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-100" />

      {/* 3. AI Data Privacy & Web Indexing Skeleton */}
      <div className="space-y-4">
        <div className="space-y-1">
          <div className="h-5 w-60 sm:w-72 bg-zinc-200 rounded" />
          <div className="h-3.5 w-80 max-w-full bg-zinc-100 rounded" />
        </div>

        <div className="rounded border border-zinc-200/80 divide-y divide-zinc-100 overflow-hidden">
          {/* Anonymized AI Optimization */}
          <div className="p-3.5 sm:p-4 flex items-center justify-between gap-4">
            <div className="flex items-start gap-3 min-w-0">
              <div className="size-8 rounded bg-forest/10 shrink-0 mt-0.5" />
              <div className="space-y-1.5 min-w-0">
                <div className="h-4 w-72 sm:w-96 bg-zinc-200 rounded" />
                <div className="h-3 w-80 max-w-full bg-zinc-100 rounded" />
              </div>
            </div>
            <div className="w-11 h-6 rounded-full bg-forest/20 shrink-0" />
          </div>

          {/* Search Engine Indexing */}
          <div className="p-3.5 sm:p-4 flex items-center justify-between gap-4">
            <div className="flex items-start gap-3 min-w-0">
              <div className="size-8 rounded bg-forest/10 shrink-0 mt-0.5" />
              <div className="space-y-1.5 min-w-0">
                <div className="h-4 w-64 bg-zinc-200 rounded" />
                <div className="h-3 w-80 max-w-full bg-zinc-100 rounded" />
              </div>
            </div>
            <div className="w-11 h-6 rounded-full bg-zinc-200 shrink-0" />
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-100" />

      {/* 4. Personal Data Archive Skeleton */}
      <div className="space-y-4">
        <div className="space-y-1">
          <div className="h-5 w-48 sm:w-56 bg-zinc-200 rounded" />
          <div className="h-3.5 w-80 max-w-full bg-zinc-100 rounded" />
        </div>

        <div className="rounded border border-zinc-200/80 p-3.5 sm:p-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1.5">
              <div className="h-4 w-44 bg-zinc-200 rounded" />
              <div className="h-3 w-80 max-w-full bg-zinc-100 rounded" />
            </div>
            <div className="h-9 w-full sm:w-36 bg-zinc-100 border border-zinc-200/70 rounded shrink-0" />
          </div>
        </div>
      </div>

      {/* Footer Actions Skeleton */}
      <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-2.5 sm:gap-3 pt-3.5 sm:pt-4 border-t border-zinc-100">
        <div className="h-9 w-full sm:w-20 bg-zinc-100 border border-zinc-200/70 rounded" />
        <div className="h-9 w-full sm:w-36 bg-forest/20 rounded" />
      </div>
    </div>
  );
}
