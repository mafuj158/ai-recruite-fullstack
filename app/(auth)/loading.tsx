export default function AuthLoading() {
  return (
    <div
      className="w-full animate-pulse select-none"
      role="status"
      aria-label="Loading authentication page"
    >
      {/* User / Shield Icon Badge Skeleton */}
      <div className="size-13 sm:size-16 rounded-full bg-[#EDF6F1] flex items-center justify-center mx-auto mb-3 sm:mb-4">
        <div className="size-9 sm:size-11 rounded-full bg-white border border-[#D5E6DC] flex items-center justify-center shadow-2xs">
          <div className="size-4 rounded-full bg-forest/20" />
        </div>
      </div>

      {/* Heading & Subtitle Skeleton */}
      <div className="space-y-2 mb-4 sm:mb-6 text-center">
        <div className="h-6 sm:h-7 w-44 sm:w-56 bg-zinc-200 rounded mx-auto" />
        <div className="h-3.5 w-52 sm:w-64 max-w-full bg-zinc-100 rounded mx-auto" />
      </div>

      {/* Role Switcher Skeleton */}
      <div className="h-10 sm:h-11 w-full bg-zinc-100/90 rounded p-1 flex gap-1 mb-4 sm:mb-5">
        <div className="flex-1 h-full bg-white rounded shadow-2xs flex items-center justify-center">
          <div className="h-3 w-16 sm:w-20 bg-zinc-200 rounded" />
        </div>
        <div className="flex-1 h-full rounded flex items-center justify-center">
          <div className="h-3 w-16 sm:w-20 bg-zinc-200/60 rounded" />
        </div>
      </div>

      {/* Form Fields Skeleton */}
      <div className="space-y-3 sm:space-y-4">
        {/* Field 1 (Email / Username) */}
        <div className="space-y-1.5">
          <div className="h-3.5 w-24 bg-zinc-200 rounded" />
          <div className="h-10 sm:h-11 w-full bg-zinc-50 border border-zinc-200/80 rounded" />
        </div>

        {/* Field 2 (Password) */}
        <div className="space-y-1.5">
          <div className="h-3.5 w-20 bg-zinc-200 rounded" />
          <div className="h-10 sm:h-11 w-full bg-zinc-50 border border-zinc-200/80 rounded" />
          <div className="flex justify-end pt-0.5">
            <div className="h-3 w-24 bg-zinc-100 rounded" />
          </div>
        </div>

        {/* Submit Button Skeleton */}
        <div className="h-10 sm:h-11 w-full bg-forest/20 rounded mt-4" />
      </div>

      {/* Bottom Switch Link Skeleton */}
      <div className="mt-4 sm:mt-6 flex items-center justify-center gap-1.5">
        <div className="h-3.5 w-36 sm:w-44 bg-zinc-100 rounded" />
        <div className="h-3.5 w-16 sm:w-20 bg-forest/20 rounded" />
      </div>
    </div>
  );
}
