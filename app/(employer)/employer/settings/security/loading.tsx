export default function SecuritySettingsLoading() {
  return (
    <div
      className="w-full space-y-4 sm:space-y-6 lg:space-y-8 animate-pulse select-none"
      role="status"
      aria-label="Loading security settings..."
    >
      {/* 1. Change Password Section Skeleton */}
      <div className="w-full bg-white rounded p-4 sm:p-6 lg:p-8 border border-zinc-200/80 shadow-xs space-y-5">
        <div className="space-y-1.5">
          <div className="h-5 w-40 bg-zinc-200 rounded" />
          <div className="h-3.5 w-64 max-w-full bg-zinc-100 rounded" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
          <div className="space-y-2 col-span-full">
            <div className="h-3.5 w-32 bg-zinc-200 rounded" />
            <div className="h-10 w-full bg-zinc-50 border border-zinc-200/70 rounded" />
          </div>
          <div className="space-y-2">
            <div className="h-3.5 w-28 bg-zinc-200 rounded" />
            <div className="h-10 w-full bg-zinc-50 border border-zinc-200/70 rounded" />
          </div>
          <div className="space-y-2">
            <div className="h-3.5 w-32 bg-zinc-200 rounded" />
            <div className="h-10 w-full bg-zinc-50 border border-zinc-200/70 rounded" />
          </div>
        </div>
        <div className="flex justify-end pt-2">
          <div className="h-9 w-36 bg-forest/20 rounded" />
        </div>
      </div>

      {/* 2. Two-Factor Authentication Skeleton */}
      <div className="w-full bg-white rounded p-4 sm:p-6 lg:p-8 border border-zinc-200/80 shadow-xs flex items-start justify-between gap-4">
        <div className="space-y-1.5 max-w-xl">
          <div className="h-5 w-48 bg-zinc-200 rounded" />
          <div className="h-3.5 w-72 max-w-full bg-zinc-100 rounded" />
        </div>
        <div className="h-6 w-11 rounded-full bg-zinc-200 shrink-0" />
      </div>

      {/* 3. Active Sessions Skeleton */}
      <div className="w-full bg-white rounded p-4 sm:p-6 lg:p-8 border border-zinc-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1.5">
            <div className="h-5 w-36 bg-zinc-200 rounded" />
            <div className="h-3.5 w-60 bg-zinc-100 rounded" />
          </div>
          <div className="h-8 w-28 rounded bg-zinc-100 border border-zinc-200/60" />
        </div>
        <div className="space-y-3 pt-2">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="p-3 rounded bg-zinc-50 border border-zinc-200/60 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="size-8 rounded bg-zinc-200/70" />
                <div className="space-y-1">
                  <div className="h-3.5 w-32 bg-zinc-200 rounded" />
                  <div className="h-2.5 w-44 bg-zinc-100 rounded" />
                </div>
              </div>
              <div className="h-6 w-16 rounded bg-zinc-200/50" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
