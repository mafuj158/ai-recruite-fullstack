export default function CandidateSecurityLoading() {
  return (
    <div
      className="w-full space-y-4 sm:space-y-6 lg:space-y-8 animate-pulse select-none"
      role="status"
      aria-label="Loading Account & Security settings..."
    >
      {/* 1. Account Contact & Security Section Skeleton */}
      <section className="bg-white rounded p-4 sm:p-6 lg:p-8 border border-zinc-200/80 shadow-xs space-y-4 sm:space-y-5">
        <div className="flex items-start justify-between gap-4 pb-3 sm:pb-4 border-b border-zinc-100">
          <div>
            <div className="flex items-center gap-2">
              <div className="size-7 sm:size-8 rounded bg-forest/10 flex items-center justify-center shrink-0" />
              <div className="h-5 w-56 sm:w-72 bg-zinc-200 rounded" />
            </div>
            <div className="h-3.5 w-64 sm:w-80 bg-zinc-100 rounded mt-2 ml-9 sm:ml-10" />
          </div>
        </div>

        <div className="space-y-4 sm:space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 lg:gap-5">
            {/* Email Field */}
            <div className="space-y-2">
              <div className="h-3.5 w-36 bg-zinc-200 rounded" />
              <div className="h-10 w-full bg-zinc-50 border border-zinc-200/70 rounded" />
            </div>
            {/* Phone Field */}
            <div className="space-y-2">
              <div className="h-3.5 w-44 bg-zinc-200 rounded" />
              <div className="h-10 w-full bg-zinc-50 border border-zinc-200/70 rounded" />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-1 sm:pt-2">
            <div className="h-9 w-full sm:w-36 bg-forest/20 rounded" />
          </div>
        </div>
      </section>

      {/* 2. Change Password Skeleton */}
      <section className="bg-white rounded p-4 sm:p-6 lg:p-8 border border-zinc-200/80 shadow-xs space-y-4 sm:space-y-6">
        <div className="flex items-start justify-between gap-4 pb-3 sm:pb-4 border-b border-zinc-100">
          <div>
            <div className="flex items-center gap-2">
              <div className="size-7 sm:size-8 rounded bg-forest/10 flex items-center justify-center shrink-0" />
              <div className="h-5 w-44 sm:w-56 bg-zinc-200 rounded" />
            </div>
            <div className="h-3.5 w-72 sm:w-96 bg-zinc-100 rounded mt-2 ml-9 sm:ml-10" />
          </div>
        </div>

        <div className="space-y-4 sm:space-y-5">
          {/* Current Password */}
          <div className="space-y-2">
            <div className="h-3.5 w-32 bg-zinc-200 rounded" />
            <div className="h-10 w-full bg-zinc-50 border border-zinc-200/70 rounded" />
          </div>

          {/* New & Confirm Password Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 lg:gap-5">
            <div className="space-y-2">
              <div className="h-3.5 w-28 bg-zinc-200 rounded" />
              <div className="h-10 w-full bg-zinc-50 border border-zinc-200/70 rounded" />
            </div>
            <div className="space-y-2">
              <div className="h-3.5 w-36 bg-zinc-200 rounded" />
              <div className="h-10 w-full bg-zinc-50 border border-zinc-200/70 rounded" />
            </div>
          </div>

          {/* Password Requirements Guide Skeleton */}
          <div className="p-3 sm:p-4 rounded bg-[#EDF6F1]/50 border border-[#D5E6DC]/70 space-y-2">
            <div className="flex items-center gap-2">
              <div className="size-3.5 bg-forest/20 rounded-full" />
              <div className="h-3.5 w-40 bg-forest/20 rounded" />
            </div>
            <div className="space-y-1.5 pl-5">
              <div className="flex items-center gap-2">
                <div className="size-1.5 rounded-full bg-zinc-300" />
                <div className="h-3 w-48 bg-zinc-200/70 rounded" />
              </div>
              <div className="flex items-center gap-2">
                <div className="size-1.5 rounded-full bg-zinc-300" />
                <div className="h-3 w-56 bg-zinc-200/70 rounded" />
              </div>
              <div className="flex items-center gap-2">
                <div className="size-1.5 rounded-full bg-zinc-300" />
                <div className="h-3 w-64 bg-zinc-200/70 rounded" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-1 sm:pt-2">
            <div className="h-9 w-full sm:w-36 bg-forest/20 rounded" />
          </div>
        </div>
      </section>

      {/* 3. Active Sessions & Signed-in Devices Skeleton */}
      <section className="bg-white rounded p-4 sm:p-6 lg:p-8 border border-zinc-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-zinc-100">
          <div className="flex items-center gap-2">
            <div className="size-7 sm:size-8 rounded bg-forest/10 flex items-center justify-center shrink-0" />
            <div>
              <div className="h-5 w-56 sm:w-72 bg-zinc-200 rounded" />
              <div className="h-3.5 w-60 sm:w-80 bg-zinc-100 rounded mt-1.5" />
            </div>
          </div>
          <div className="h-3.5 w-20 bg-zinc-100 rounded" />
        </div>

        <div className="space-y-2.5 sm:space-y-3">
          {/* Current Device Item */}
          <div className="p-3.5 sm:p-4 rounded border border-zinc-200/70 bg-zinc-50/60 flex items-center justify-between gap-3">
            <div className="space-y-1.5 min-w-0">
              <div className="flex items-center gap-2">
                <div className="h-4 w-40 bg-zinc-200 rounded" />
                <div className="h-4 w-20 bg-[#EDF6F1] border border-[#C2E4D2] rounded" />
              </div>
              <div className="h-3 w-52 bg-zinc-100 rounded" />
              <div className="h-2.5 w-24 bg-zinc-100/70 rounded" />
            </div>
          </div>

          {/* Secondary Device Item */}
          <div className="p-3.5 sm:p-4 rounded border border-zinc-200/70 bg-zinc-50/60 flex items-center justify-between gap-3">
            <div className="space-y-1.5 min-w-0">
              <div className="h-4 w-36 bg-zinc-200 rounded" />
              <div className="h-3 w-48 bg-zinc-100 rounded" />
              <div className="h-2.5 w-28 bg-zinc-100/70 rounded" />
            </div>
            <div className="h-8 w-16 bg-zinc-100 border border-zinc-200/70 rounded shrink-0" />
          </div>
        </div>
      </section>

      {/* 4. Danger Zone Skeleton */}
      <section className="bg-white rounded p-4 sm:p-6 lg:p-8 border border-red-200/90 shadow-xs space-y-4 sm:space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 sm:gap-4 pb-3 sm:pb-4 border-b border-red-100">
          <div>
            <div className="flex items-center gap-2">
              <div className="size-7 sm:size-8 rounded bg-red-100 flex items-center justify-center shrink-0" />
              <div className="h-5 w-28 bg-red-200 rounded" />
            </div>
            <div className="h-3.5 w-72 sm:w-96 bg-zinc-100 rounded mt-2 ml-9 sm:ml-10" />
          </div>
          <div className="h-6 w-28 bg-red-50 border border-red-200 rounded shrink-0" />
        </div>

        <div className="space-y-3 sm:space-y-4">
          {/* Action 1: Logout */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 p-3.5 sm:p-4 lg:p-5 rounded border border-zinc-200 bg-zinc-50/50">
            <div className="space-y-1.5">
              <div className="h-4 w-32 bg-zinc-200 rounded" />
              <div className="h-3 w-80 max-w-full bg-zinc-100 rounded" />
            </div>
            <div className="h-9 w-full sm:w-20 bg-zinc-200 rounded shrink-0" />
          </div>

          {/* Action 2: Permanent Delete */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 p-3.5 sm:p-4 lg:p-5 rounded border border-red-200 bg-red-50/30">
            <div className="space-y-1.5">
              <div className="h-4 w-52 bg-red-200 rounded" />
              <div className="h-3 w-96 max-w-full bg-zinc-100 rounded" />
            </div>
            <div className="h-9 w-full sm:w-28 bg-red-200 rounded shrink-0" />
          </div>
        </div>
      </section>
    </div>
  );
}
