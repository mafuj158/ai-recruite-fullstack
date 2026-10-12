export default function EmployerRootLoading() {
  return (
    <div
      className="w-full space-y-3 xs:space-y-4 sm:space-y-6 animate-pulse select-none"
      role="status"
      aria-label="Loading employer portal..."
    >
      {/* 1. Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="size-5 xs:size-6 sm:size-7 rounded bg-forest/20 shrink-0" />
            <div className="h-6 xs:h-7 sm:h-8 w-44 sm:w-56 bg-zinc-200 rounded" />
          </div>
          <div className="h-3.5 sm:h-4 w-64 sm:w-120 max-w-full bg-zinc-200/60 rounded mt-1.5" />
        </div>
      </div>

      {/* 2. Top Stats Skeleton */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5 sm:gap-5">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white rounded p-4 sm:p-5 lg:p-6 border border-zinc-200/80 shadow-xs flex items-center justify-between gap-3"
          >
            <div className="space-y-1.5 flex-1">
              <div className="h-3 w-24 bg-zinc-200 rounded" />
              <div className="h-7 sm:h-8 w-16 bg-zinc-200 rounded" />
              <div className="h-2.5 w-28 bg-zinc-100 rounded" />
            </div>
            <div className="size-10 sm:size-12 rounded bg-zinc-100 shrink-0" />
          </div>
        ))}
      </div>

      {/* 3. Content Area Skeleton */}
      <div className="w-full bg-white rounded p-4 sm:p-6 border border-zinc-200/80 shadow-xs space-y-4 min-h-[300px]">
        <div className="h-5 w-44 bg-zinc-200 rounded" />
        <div className="h-3.5 w-72 bg-zinc-100 rounded" />
        <div className="h-48 w-full bg-zinc-50 rounded border border-zinc-100 mt-4" />
      </div>
    </div>
  );
}
