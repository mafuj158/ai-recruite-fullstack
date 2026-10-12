export default function OnboardingLoading() {
  return (
    <div
      className="w-full animate-pulse select-none"
      role="status"
      aria-label="Loading onboarding step"
    >
      {/* Top Stepper Indicator Skeleton */}
      <div className="flex flex-col items-center mb-8">
        <div className="flex items-center gap-3">
          {/* Step 1 Circle */}
          <div className="size-8 rounded-full bg-forest/25 flex items-center justify-center shadow-xs">
            <div className="size-3 rounded-full bg-forest/40" />
          </div>

          {/* Connecting Line */}
          <div className="w-16 sm:w-20 h-0.5 rounded-full bg-zinc-200" />

          {/* Step 2 Circle */}
          <div className="size-8 rounded-full bg-white border border-zinc-200 flex items-center justify-center">
            <div className="size-3 rounded-full bg-zinc-200" />
          </div>
        </div>

        {/* Step Label Placeholder */}
        <div className="h-3.5 w-48 sm:w-56 bg-zinc-200 rounded mt-3" />
      </div>

      {/* Main Card Skeleton */}
      <div className="bg-white border border-zinc-200/80 rounded p-4 xs:p-6 sm:p-8 shadow-sm space-y-5 sm:space-y-6">
        {/* Step Header Placeholder */}
        <div className="space-y-2 pb-1">
          <div className="h-6 sm:h-7 w-48 sm:w-60 bg-zinc-200 rounded" />
          <div className="h-3.5 w-64 sm:w-80 max-w-full bg-zinc-100 rounded" />
        </div>

        {/* Form Fields Skeletons */}
        <div className="space-y-4">
          {/* Full-width Field 1 */}
          <div className="space-y-1.5">
            <div className="h-3.5 w-24 bg-zinc-200 rounded" />
            <div className="h-10 sm:h-11 w-full bg-zinc-50 border border-zinc-200/70 rounded" />
          </div>

          {/* 2-Column Responsive Grid 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <div className="h-3.5 w-28 bg-zinc-200 rounded" />
              <div className="h-10 sm:h-11 w-full bg-zinc-50 border border-zinc-200/70 rounded" />
            </div>
            <div className="space-y-1.5">
              <div className="h-3.5 w-20 bg-zinc-200 rounded" />
              <div className="h-10 sm:h-11 w-full bg-zinc-50 border border-zinc-200/70 rounded" />
            </div>
          </div>

          {/* 2-Column Responsive Grid 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <div className="h-3.5 w-32 bg-zinc-200 rounded" />
              <div className="h-10 sm:h-11 w-full bg-zinc-50 border border-zinc-200/70 rounded" />
            </div>
            <div className="space-y-1.5">
              <div className="h-3.5 w-24 bg-zinc-200 rounded" />
              <div className="h-10 sm:h-11 w-full bg-zinc-50 border border-zinc-200/70 rounded" />
            </div>
          </div>

          {/* Textarea / Tags Area Placeholder */}
          <div className="space-y-1.5 pt-1">
            <div className="h-3.5 w-28 bg-zinc-200 rounded" />
            <div className="h-20 sm:h-24 w-full bg-zinc-50 border border-zinc-200/70 rounded" />
          </div>
        </div>

        {/* Footer Actions Skeleton */}
        <div className="flex items-center justify-between pt-3 border-t border-zinc-100">
          <div className="h-9 sm:h-10 w-20 sm:w-24 bg-zinc-100 border border-zinc-200/60 rounded" />
          <div className="h-9 sm:h-10 w-28 sm:w-32 bg-forest/25 rounded" />
        </div>
      </div>
    </div>
  );
}
