export default function AiSettingsLoading() {
  return (
    <div
      className="w-full bg-white rounded p-4 sm:p-6 lg:p-8 border border-zinc-200/80 shadow-xs space-y-6 animate-pulse select-none"
      role="status"
      aria-label="Loading AI settings..."
    >
      <div className="space-y-1.5">
        <div className="h-5 w-44 bg-zinc-200 rounded" />
        <div className="h-3.5 w-80 max-w-full bg-zinc-100 rounded" />
      </div>

      <div className="border-t border-zinc-100" />

      {/* AI Matching Weight Sliders Skeleton */}
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-2 p-3 sm:p-4 rounded bg-zinc-50/70 border border-zinc-200/60">
            <div className="flex justify-between items-center">
              <div className="h-4 w-36 bg-zinc-200 rounded" />
              <div className="h-4 w-12 bg-forest/20 rounded" />
            </div>
            <div className="h-2 w-full bg-zinc-200 rounded-full" />
          </div>
        ))}
      </div>

      <div className="border-t border-zinc-100" />

      <div className="flex justify-end pt-1">
        <div className="h-9 w-32 bg-forest/20 rounded" />
      </div>
    </div>
  );
}
