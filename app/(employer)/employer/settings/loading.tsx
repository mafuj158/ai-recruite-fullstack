export default function SettingsLoading() {
  return (
    <div className="w-full bg-white rounded p-4 sm:p-6 lg:p-8 border border-zinc-200/80 shadow-xs space-y-5 sm:space-y-6 lg:space-y-7 animate-pulse">
      {/* Top Section Header & Media Skeleton */}
      <div className="space-y-4">
        <div className="space-y-2">
          {/* Section Heading */}
          <div className="h-5 w-48 bg-zinc-200 rounded" />
          {/* Subtitle / Description */}
          <div className="h-3.5 w-72 max-w-full bg-zinc-100 rounded" />
        </div>

        {/* Media / Avatar Upload Placeholder */}
        <div className="flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-3 sm:gap-5 pt-2">
          <div className="w-19 h-19 sm:size-24 rounded bg-zinc-100 border border-zinc-200/80 flex items-center justify-center shrink-0">
            <div className="size-6 sm:size-8 rounded-full bg-zinc-200/70" />
          </div>
          <div className="space-y-2 flex-1 max-w-sm flex flex-col items-center sm:items-start">
            <div className="h-4 w-36 bg-zinc-200 rounded" />
            <div className="h-3 w-56 max-w-full bg-zinc-100 rounded" />
            <div className="h-7 w-28 bg-zinc-100 border border-zinc-200/60 rounded mt-1" />
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-100" />

      {/* Core Form Fields Skeleton */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <div className="h-4 w-36 bg-zinc-200 rounded" />
          <div className="h-3 w-20 bg-zinc-100 rounded" />
        </div>

        {/* 2-Column Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <div className="space-y-2">
            <div className="h-3.5 w-28 bg-zinc-200 rounded" />
            <div className="h-10 w-full bg-zinc-50 border border-zinc-200/70 rounded" />
          </div>
          <div className="space-y-2">
            <div className="h-3.5 w-24 bg-zinc-200 rounded" />
            <div className="h-10 w-full bg-zinc-50 border border-zinc-200/70 rounded" />
          </div>
          <div className="space-y-2">
            <div className="h-3.5 w-32 bg-zinc-200 rounded" />
            <div className="h-10 w-full bg-zinc-50 border border-zinc-200/70 rounded" />
          </div>
          <div className="space-y-2">
            <div className="h-3.5 w-30 bg-zinc-200 rounded" />
            <div className="h-10 w-full bg-zinc-50 border border-zinc-200/70 rounded" />
          </div>
        </div>

        {/* Textarea Placeholder */}
        <div className="space-y-2 pt-1">
          <div className="h-3.5 w-32 bg-zinc-200 rounded" />
          <div className="h-28 w-full bg-zinc-50 border border-zinc-200/70 rounded" />
        </div>
      </div>

      <div className="border-t border-zinc-100" />

      {/* Footer Action Buttons Skeleton */}
      <div className="flex items-center justify-end gap-3 pt-1">
        <div className="h-9 w-20 sm:w-24 bg-zinc-100 border border-zinc-200/60 rounded" />
        <div className="h-9 w-28 sm:w-36 bg-forest/20 rounded" />
      </div>
    </div>
  );
}