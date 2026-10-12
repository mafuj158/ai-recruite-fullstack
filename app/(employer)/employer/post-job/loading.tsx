export default function EmployerPostJobLoading() {
  return (
    <div
      className="w-full space-y-4 sm:space-y-6 animate-pulse select-none"
      role="status"
      aria-label="Loading job posting form..."
    >
      {/* 1. Page Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="size-5 xs:size-6 sm:size-7 rounded bg-forest/20 shrink-0" />
            <div className="h-6 xs:h-7 sm:h-8 w-44 sm:w-56 bg-zinc-200 rounded" />
          </div>
          <div className="h-3.5 sm:h-4 w-64 sm:w-[460px] max-w-full bg-zinc-200/60 rounded mt-1.5" />
        </div>
      </div>

      {/* 2. Basic Info Section Card Skeleton */}
      <div className="bg-white rounded p-4 sm:p-6 border border-zinc-200/80 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <div className="size-5 rounded bg-forest/20" />
          <div className="h-4 sm:h-5 w-36 bg-zinc-200 rounded" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <div className="h-3 w-20 bg-zinc-200 rounded" />
            <div className="h-10 w-full rounded bg-zinc-50 border border-zinc-200/70" />
          </div>
          <div className="space-y-1.5">
            <div className="h-3 w-24 bg-zinc-200 rounded" />
            <div className="h-10 w-full rounded bg-zinc-50 border border-zinc-200/70" />
          </div>
          <div className="space-y-1.5">
            <div className="h-3 w-20 bg-zinc-200 rounded" />
            <div className="h-10 w-full rounded bg-zinc-50 border border-zinc-200/70" />
          </div>
          <div className="space-y-1.5">
            <div className="h-3 w-28 bg-zinc-200 rounded" />
            <div className="h-10 w-full rounded bg-zinc-50 border border-zinc-200/70" />
          </div>
        </div>
      </div>

      {/* 3. Job Description Section Skeleton */}
      <div className="bg-white rounded p-4 sm:p-6 border border-zinc-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-5 rounded bg-forest/20" />
            <div className="h-4 sm:h-5 w-40 bg-zinc-200 rounded" />
          </div>
          <div className="h-8 w-32 rounded bg-forest/15" />
        </div>
        <div className="space-y-2">
          <div className="h-32 w-full rounded bg-zinc-50 border border-zinc-200/70" />
        </div>
      </div>

      {/* 4. Requirements & Skills Section Skeleton */}
      <div className="bg-white rounded p-4 sm:p-6 border border-zinc-200/80 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <div className="size-5 rounded bg-forest/20" />
          <div className="h-4 sm:h-5 w-44 bg-zinc-200 rounded" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <div className="h-3 w-28 bg-zinc-200 rounded" />
            <div className="h-10 w-full rounded bg-zinc-50 border border-zinc-200/70" />
          </div>
          <div className="space-y-1.5">
            <div className="h-3 w-24 bg-zinc-200 rounded" />
            <div className="h-10 w-full rounded bg-zinc-50 border border-zinc-200/70" />
          </div>
        </div>
        {/* Skills Tag Input Skeleton */}
        <div className="space-y-1.5">
          <div className="h-3 w-32 bg-zinc-200 rounded" />
          <div className="h-14 w-full rounded bg-zinc-50 border border-zinc-200/70 p-2 flex items-center gap-2">
            <div className="h-6 w-16 rounded bg-zinc-200" />
            <div className="h-6 w-20 rounded bg-zinc-200" />
            <div className="h-6 w-14 rounded bg-zinc-200" />
          </div>
        </div>
      </div>

      {/* 5. Compensation & AI Weights Section Skeleton */}
      <div className="bg-white rounded p-4 sm:p-6 border border-zinc-200/80 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <div className="size-5 rounded bg-forest/20" />
          <div className="h-4 sm:h-5 w-48 bg-zinc-200 rounded" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <div className="h-3 w-24 bg-zinc-200 rounded" />
            <div className="h-10 w-full rounded bg-zinc-50 border border-zinc-200/70" />
          </div>
          <div className="space-y-1.5">
            <div className="h-3 w-36 bg-zinc-200 rounded" />
            <div className="h-10 w-full rounded bg-zinc-50 border border-zinc-200/70" />
          </div>
        </div>
      </div>

      {/* 6. Form Footer Actions */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <div className="h-10 w-28 rounded bg-zinc-100 border border-zinc-200/70" />
        <div className="h-10 w-40 rounded bg-forest/20" />
      </div>
    </div>
  );
}
