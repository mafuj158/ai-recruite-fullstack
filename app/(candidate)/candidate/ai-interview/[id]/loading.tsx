export default function AIInterviewDetailLoading() {
  return (
    <div
      className="w-full space-y-3 xs:space-y-4 sm:space-y-5 animate-pulse select-none"
      role="status"
      aria-label="Loading AI Pre-Screening Session..."
    >
      {/* 1. Page Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="size-5 xs:size-6 sm:size-7 rounded bg-forest/20 shrink-0" />
            <div className="h-6 xs:h-7 sm:h-8 w-52 xs:w-64 sm:w-80 bg-zinc-200 rounded" />
          </div>
          <div className="h-3.5 sm:h-4 w-56 sm:w-[420px] max-w-full bg-zinc-200/60 rounded mt-1.5" />
        </div>
      </div>

      {/* 2. InterviewSessionHeader — Back button + Job context + 4-step stepper */}
      <div className="bg-white border border-zinc-200/80 rounded p-3.5 sm:p-4 shadow-2xs space-y-3">
        {/* Top bar: back + job context pill */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-100">
          <div className="h-8 w-44 rounded border border-zinc-200 bg-white shadow-2xs" />
          <div className="flex items-center gap-2">
            <div className="h-3 w-24 bg-zinc-200/60 rounded" />
            <div className="h-6 w-48 rounded bg-zinc-100" />
          </div>
        </div>

        {/* Stepper: 4 steps — 2-col on mobile, 4-col on sm+ */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
          {[
            { active: true, label: "Introduction & Setup" },
            { active: false, label: "Questions & Recording" },
            { active: false, label: "AI Evaluation" },
            { active: false, label: "Performance Report" },
          ].map((step, i) => (
            <div
              key={i}
              className={`p-2 rounded border ${
                step.active
                  ? "border-forest bg-[#F0F7F4]"
                  : "border-zinc-200/70 bg-zinc-50/50"
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <div
                  className={`size-4 rounded-full border shrink-0 ${
                    step.active
                      ? "bg-forest/20 border-forest/30"
                      : "bg-zinc-100 border-zinc-200"
                  }`}
                />
                <div className="h-2.5 w-6 bg-zinc-200/60 rounded" />
              </div>
              <div
                className={`h-3 rounded ${
                  step.active ? "w-28 bg-forest/20" : "w-24 bg-zinc-200/50"
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 3. StepWelcomeAndDevice skeleton (default first step) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 xl:gap-6 items-start">

        {/* Left: Interview Context Card */}
        <div className="lg:col-span-7 xl:col-span-8 bg-white rounded p-5 sm:p-6 border border-zinc-200/80 shadow-xs space-y-5">
          {/* Company header */}
          <div className="flex items-start gap-4">
            <div className="size-12 rounded bg-zinc-50 border border-zinc-200 shrink-0" />
            <div className="space-y-1.5 flex-1">
              <div className="h-5 sm:h-6 w-48 sm:w-64 bg-zinc-200 rounded" />
              <div className="h-3 w-36 bg-zinc-200/60 rounded" />
              <div className="flex flex-wrap gap-1.5 pt-0.5">
                <div className="h-5 w-16 rounded bg-zinc-100 border border-zinc-200/60" />
                <div className="h-5 w-20 rounded bg-zinc-100 border border-zinc-200/60" />
                <div className="h-5 w-14 rounded bg-zinc-100 border border-zinc-200/60" />
              </div>
            </div>
          </div>

          {/* What to expect section */}
          <div className="space-y-2.5">
            <div className="h-4 w-36 bg-zinc-200 rounded" />
            <div className="space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="size-4 rounded bg-forest/10 border border-forest/20 shrink-0 mt-0.5" />
                  <div className={`h-3 bg-zinc-200/60 rounded ${i % 2 === 0 ? "w-full" : "w-5/6"}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Question overview row */}
          <div className="pt-3 border-t border-zinc-100 grid grid-cols-3 gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-zinc-50/80 rounded p-3 border border-zinc-200/60 space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <div className="size-4 rounded bg-forest/15 shrink-0" />
                  <div className="h-3 w-14 bg-zinc-200/70 rounded" />
                </div>
                <div className="h-4 w-8 bg-zinc-200 rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Device Preview Card + Answer Mode Selector */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-4">
          {/* Device preview card */}
          <div className="bg-white rounded p-4 sm:p-5 border border-zinc-200/80 shadow-xs space-y-4">
            <div className="h-4 w-32 bg-zinc-200 rounded" />
            {/* Camera preview area */}
            <div className="aspect-video w-full rounded-lg bg-zinc-100 border border-zinc-200" />
            {/* Device status rows */}
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded bg-zinc-50 border border-zinc-200/60">
                  <div className="flex items-center gap-2">
                    <div className="size-4 rounded bg-zinc-200 shrink-0" />
                    <div className="h-3 w-20 bg-zinc-200/70 rounded" />
                  </div>
                  <div className="h-5 w-16 rounded bg-emerald-50 border border-emerald-200/50" />
                </div>
              ))}
            </div>
          </div>

          {/* Answer mode selector */}
          <div className="bg-white rounded p-4 sm:p-5 border border-zinc-200/80 shadow-xs space-y-3">
            <div className="h-4 w-40 bg-zinc-200 rounded" />
            <div className="space-y-2">
              <div className="p-3 rounded-lg border-2 border-forest/30 bg-[#F0F7F4]/50 space-y-1">
                <div className="flex items-center gap-2">
                  <div className="size-4 rounded-full bg-forest/20 border border-forest/30" />
                  <div className="h-3.5 w-28 bg-zinc-200 rounded" />
                </div>
                <div className="h-2.5 w-full bg-zinc-200/50 rounded ml-6" />
              </div>
              <div className="p-3 rounded-lg border border-zinc-200/70 bg-zinc-50/50 space-y-1">
                <div className="flex items-center gap-2">
                  <div className="size-4 rounded-full bg-zinc-100 border border-zinc-200" />
                  <div className="h-3.5 w-32 bg-zinc-200 rounded" />
                </div>
                <div className="h-2.5 w-4/5 bg-zinc-200/50 rounded ml-6" />
              </div>
            </div>
            {/* Start button */}
            <div className="h-11 w-full rounded bg-forest/20 mt-2" />
          </div>
        </div>
      </div>
    </div>
  );
}
