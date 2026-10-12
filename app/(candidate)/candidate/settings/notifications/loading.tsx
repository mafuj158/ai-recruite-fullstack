export default function CandidateNotificationsLoading() {
  return (
    <div
      className="w-full bg-white rounded p-4 sm:p-6 lg:p-8 border border-zinc-200/80 shadow-xs space-y-5 sm:space-y-6 lg:space-y-7 animate-pulse select-none"
      role="status"
      aria-label="Loading Notification Alerts settings..."
    >
      {/* 1. Notification Delivery Channels Skeleton */}
      <div className="space-y-4">
        <div className="space-y-1">
          <div className="h-5 w-60 sm:w-72 bg-zinc-200 rounded" />
          <div className="h-3.5 w-80 max-w-full bg-zinc-100 rounded" />
        </div>

        <div className="rounded border border-zinc-200/80 divide-y divide-zinc-100 overflow-hidden">
          {/* Email Channel */}
          <div className="p-3.5 sm:p-4 flex items-center justify-between gap-4">
            <div className="flex items-start gap-3 min-w-0">
              <div className="size-8 rounded bg-forest/10 shrink-0 mt-0.5" />
              <div className="space-y-1.5 min-w-0">
                <div className="h-4 w-36 bg-zinc-200 rounded" />
                <div className="h-3 w-72 max-w-full bg-zinc-100 rounded" />
              </div>
            </div>
            <div className="w-11 h-6 rounded-full bg-forest/20 shrink-0" />
          </div>

          {/* In-App Channel */}
          <div className="p-3.5 sm:p-4 flex items-center justify-between gap-4">
            <div className="flex items-start gap-3 min-w-0">
              <div className="size-8 rounded bg-forest/10 shrink-0 mt-0.5" />
              <div className="space-y-1.5 min-w-0">
                <div className="h-4 w-40 bg-zinc-200 rounded" />
                <div className="h-3 w-80 max-w-full bg-zinc-100 rounded" />
              </div>
            </div>
            <div className="w-11 h-6 rounded-full bg-forest/20 shrink-0" />
          </div>

          {/* Browser Push Channel */}
          <div className="p-3.5 sm:p-4 flex items-center justify-between gap-4">
            <div className="flex items-start gap-3 min-w-0">
              <div className="size-8 rounded bg-forest/10 shrink-0 mt-0.5" />
              <div className="space-y-1.5 min-w-0">
                <div className="h-4 w-48 bg-zinc-200 rounded" />
                <div className="h-3 w-72 max-w-full bg-zinc-100 rounded" />
              </div>
            </div>
            <div className="w-11 h-6 rounded-full bg-zinc-200 shrink-0" />
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-100" />

      {/* 2. Application Lifecycle & Recruiter Communications Skeleton */}
      <div className="space-y-4">
        <div className="space-y-1">
          <div className="h-5 w-72 sm:w-96 bg-zinc-200 rounded" />
          <div className="h-3.5 w-80 max-w-full bg-zinc-100 rounded" />
        </div>

        <div className="rounded border border-zinc-200/80 divide-y divide-zinc-100 overflow-hidden">
          {/* Status Updates */}
          <div className="p-3.5 sm:p-4 flex items-center justify-between gap-4">
            <div className="flex items-start gap-3 min-w-0">
              <div className="size-8 rounded bg-forest/10 shrink-0 mt-0.5" />
              <div className="space-y-1.5 min-w-0">
                <div className="h-4 w-48 bg-zinc-200 rounded" />
                <div className="h-3 w-80 max-w-full bg-zinc-100 rounded" />
              </div>
            </div>
            <div className="w-11 h-6 rounded-full bg-forest/20 shrink-0" />
          </div>

          {/* Interview Scheduling */}
          <div className="p-3.5 sm:p-4 flex items-center justify-between gap-4">
            <div className="flex items-start gap-3 min-w-0">
              <div className="size-8 rounded bg-forest/10 shrink-0 mt-0.5" />
              <div className="space-y-1.5 min-w-0">
                <div className="h-4 w-56 bg-zinc-200 rounded" />
                <div className="h-3 w-72 max-w-full bg-zinc-100 rounded" />
              </div>
            </div>
            <div className="w-11 h-6 rounded-full bg-forest/20 shrink-0" />
          </div>

          {/* Chat Messages */}
          <div className="p-3.5 sm:p-4 flex items-center justify-between gap-4">
            <div className="flex items-start gap-3 min-w-0">
              <div className="size-8 rounded bg-forest/10 shrink-0 mt-0.5" />
              <div className="space-y-1.5 min-w-0">
                <div className="h-4 w-44 bg-zinc-200 rounded" />
                <div className="h-3 w-80 max-w-full bg-zinc-100 rounded" />
              </div>
            </div>
            <div className="w-11 h-6 rounded-full bg-forest/20 shrink-0" />
          </div>

          {/* AI Insights */}
          <div className="p-3.5 sm:p-4 flex items-center justify-between gap-4">
            <div className="flex items-start gap-3 min-w-0">
              <div className="size-8 rounded bg-forest/10 shrink-0 mt-0.5" />
              <div className="space-y-1.5 min-w-0">
                <div className="h-4 w-52 bg-zinc-200 rounded" />
                <div className="h-3 w-80 max-w-full bg-zinc-100 rounded" />
              </div>
            </div>
            <div className="w-11 h-6 rounded-full bg-forest/20 shrink-0" />
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-100" />

      {/* 3. AI Job Match & Discovery Alerts Skeleton */}
      <div className="space-y-4">
        <div className="space-y-1">
          <div className="h-5 w-64 sm:w-80 bg-zinc-200 rounded" />
          <div className="h-3.5 w-80 max-w-full bg-zinc-100 rounded" />
        </div>

        <div className="rounded border border-zinc-200/80 divide-y divide-zinc-100 overflow-hidden">
          <div className="p-3.5 sm:p-4 flex items-center justify-between gap-4">
            <div className="flex items-start gap-3 min-w-0">
              <div className="size-8 rounded bg-forest/10 shrink-0 mt-0.5" />
              <div className="space-y-1.5 min-w-0">
                <div className="h-4 w-56 bg-zinc-200 rounded" />
                <div className="h-3 w-80 max-w-full bg-zinc-100 rounded" />
              </div>
            </div>
            <div className="w-11 h-6 rounded-full bg-forest/20 shrink-0" />
          </div>

          <div className="p-3.5 sm:p-4 space-y-4 bg-zinc-50/40">
            {/* Minimum Score Threshold Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="h-4 w-60 bg-zinc-200 rounded" />
                <div className="h-6 w-24 bg-[#EDF6F1] border border-[#C2E4D2] rounded" />
              </div>
              <div className="h-3 w-80 max-w-full bg-zinc-100 rounded" />
              <div className="h-2 w-full bg-zinc-200 rounded-lg my-2" />
              <div className="flex justify-between">
                <div className="h-2.5 w-24 bg-zinc-200/70 rounded" />
                <div className="h-2.5 w-28 bg-zinc-200/70 rounded" />
                <div className="h-2.5 w-24 bg-zinc-200/70 rounded" />
              </div>
            </div>

            {/* Delivery Frequency Radio Cards */}
            <div className="space-y-2.5 pt-2 border-t border-zinc-100">
              <div className="h-4 w-44 bg-zinc-200 rounded" />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="p-3 sm:p-3.5 rounded border border-zinc-200 bg-white space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="h-4 w-24 bg-zinc-200 rounded" />
                      <div className="size-4 rounded-full border-2 border-zinc-300" />
                    </div>
                    <div className="h-3 w-full bg-zinc-100 rounded" />
                  </div>
                ))}
              </div>
            </div>
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
