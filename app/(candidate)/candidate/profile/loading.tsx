export default function ProfileLoading() {
  return (
    <div
      className="w-full space-y-5 sm:space-y-6 animate-pulse select-none"
      role="status"
      aria-label="Loading profile..."
    >
      {/* 1. Page Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="size-5 xs:size-6 sm:size-7 rounded bg-forest/20 shrink-0" />
            <div className="h-6 xs:h-7 sm:h-8 w-36 xs:w-44 sm:w-52 bg-zinc-200 rounded" />
          </div>
          <div className="h-3.5 sm:h-4 w-64 sm:w-[480px] max-w-full bg-zinc-200/60 rounded mt-1.5" />
        </div>
      </div>

      {/* 2. CandidateProfileBanner Skeleton */}
      <div className="p-4 sm:p-6 rounded bg-white border border-zinc-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
        {/* Left: Avatar + Identity */}
        <div className="flex items-start gap-4 sm:gap-5 min-w-0 flex-1">
          {/* Avatar circle with upload overlay */}
          <div className="size-16 sm:size-20 rounded-full bg-zinc-200 border-4 border-white shadow-sm shrink-0" />
          <div className="min-w-0 flex-1 space-y-1.5">
            {/* Name + status pill */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="h-6 sm:h-8 w-40 sm:w-56 bg-zinc-200 rounded" />
              <div className="h-5 w-28 rounded-full bg-emerald-50 border border-emerald-200/60" />
            </div>
            {/* Headline */}
            <div className="h-3.5 sm:h-4 w-56 sm:w-72 bg-zinc-200/60 rounded" />
            {/* Location */}
            <div className="flex items-center gap-1 pt-0.5">
              <div className="size-3 rounded bg-zinc-200/60 shrink-0" />
              <div className="h-3 w-28 bg-zinc-200/50 rounded" />
            </div>
          </div>
        </div>

        {/* Right: ATS Score pill */}
        <div className="flex items-center sm:items-end justify-between sm:justify-center shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-zinc-100">
          <div className="h-9 w-44 rounded bg-[#EDF6F1] border border-[#C2E4D2]/60" />
        </div>
      </div>

      {/* 3. Responsive 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">

        {/* Left Column (8 cols): Profile Form Sections */}
        <div className="lg:col-span-8 min-w-0 space-y-5 sm:space-y-6">

          {/* Section helper: renders a form section skeleton */}
          {/* 3a. Personal & Contact Information */}
          <section className="bg-white rounded p-4 sm:p-6 border border-zinc-200/80 shadow-xs space-y-4 sm:space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <div className="size-4 rounded bg-forest/20" />
                <div className="h-4 sm:h-5 w-52 bg-zinc-200 rounded" />
              </div>
              <div className="h-3 w-36 bg-zinc-200/50 rounded hidden sm:block" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="space-y-1.5">
                  <div className="h-3 w-20 bg-zinc-200/70 rounded" />
                  <div className="h-9 sm:h-10 w-full rounded bg-zinc-50 border border-zinc-200/80" />
                </div>
              ))}
            </div>
            <div className="flex justify-end pt-2">
              <div className="h-9 w-32 rounded bg-forest/20" />
            </div>
          </section>

          {/* 3b. Preferences & Availability */}
          <section className="bg-white rounded p-4 sm:p-6 border border-zinc-200/80 shadow-xs space-y-4 sm:space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <div className="size-4 rounded bg-forest/20" />
                <div className="h-4 sm:h-5 w-48 bg-zinc-200 rounded" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-1.5">
                  <div className="h-3 w-24 bg-zinc-200/70 rounded" />
                  <div className="h-9 sm:h-10 w-full rounded bg-zinc-50 border border-zinc-200/80" />
                </div>
              ))}
            </div>
            <div className="flex justify-end pt-2">
              <div className="h-9 w-36 rounded bg-forest/20" />
            </div>
          </section>

          {/* 3c. Technical & Soft Skills */}
          <section className="bg-white rounded p-4 sm:p-6 border border-zinc-200/80 shadow-xs space-y-4 sm:space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <div className="size-4 rounded bg-forest/20" />
                <div className="h-4 sm:h-5 w-44 bg-zinc-200 rounded" />
              </div>
            </div>
            {/* Skills tag area */}
            <div className="space-y-1.5">
              <div className="h-3 w-24 bg-zinc-200/70 rounded" />
              <div className="min-h-[60px] rounded bg-zinc-50 border border-zinc-200/80 p-3 flex flex-wrap gap-1.5">
                {[56, 72, 48, 64, 52, 80, 60].map((w, i) => (
                  <div key={i} className="h-6 rounded bg-zinc-200/70" style={{ width: `${w}px` }} />
                ))}
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="h-3 w-20 bg-zinc-200/70 rounded" />
              <div className="min-h-[48px] rounded bg-zinc-50 border border-zinc-200/80 p-3 flex flex-wrap gap-1.5">
                {[64, 48, 72, 56].map((w, i) => (
                  <div key={i} className="h-6 rounded bg-zinc-200/60" style={{ width: `${w}px` }} />
                ))}
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <div className="h-9 w-28 rounded bg-forest/20" />
            </div>
          </section>

          {/* 3d. Work Experience */}
          <section className="bg-white rounded p-4 sm:p-6 border border-zinc-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <div className="size-4 rounded bg-forest/20" />
                <div className="h-4 sm:h-5 w-36 bg-zinc-200 rounded" />
              </div>
              <div className="h-8 w-28 rounded bg-forest/15 border border-forest/20" />
            </div>
            {/* 2 experience entries */}
            {[1, 2].map((exp) => (
              <div key={exp} className="p-3.5 sm:p-4 rounded-lg border border-zinc-200/60 bg-zinc-50/50 space-y-2.5">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1.5 flex-1">
                    <div className="h-4 w-44 bg-zinc-200 rounded" />
                    <div className="h-3 w-32 bg-zinc-200/60 rounded" />
                    <div className="h-3 w-24 bg-zinc-200/50 rounded" />
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <div className="size-7 rounded bg-zinc-100 border border-zinc-200" />
                    <div className="size-7 rounded bg-zinc-100 border border-zinc-200" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="h-3 w-full bg-zinc-200/50 rounded" />
                  <div className="h-3 w-4/5 bg-zinc-200/40 rounded" />
                </div>
              </div>
            ))}
          </section>

          {/* 3e. Education */}
          <section className="bg-white rounded p-4 sm:p-6 border border-zinc-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <div className="size-4 rounded bg-forest/20" />
                <div className="h-4 sm:h-5 w-28 bg-zinc-200 rounded" />
              </div>
              <div className="h-8 w-24 rounded bg-forest/15 border border-forest/20" />
            </div>
            {[1, 2].map((edu) => (
              <div key={edu} className="p-3.5 sm:p-4 rounded-lg border border-zinc-200/60 bg-zinc-50/50 space-y-1.5">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1.5 flex-1">
                    <div className="h-4 w-48 bg-zinc-200 rounded" />
                    <div className="h-3 w-36 bg-zinc-200/60 rounded" />
                    <div className="h-3 w-20 bg-zinc-200/50 rounded" />
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <div className="size-7 rounded bg-zinc-100 border border-zinc-200" />
                    <div className="size-7 rounded bg-zinc-100 border border-zinc-200" />
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* 3f. Certifications */}
          <section className="bg-white rounded p-4 sm:p-6 border border-zinc-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <div className="size-4 rounded bg-forest/20" />
                <div className="h-4 sm:h-5 w-44 bg-zinc-200 rounded" />
              </div>
              <div className="h-8 w-28 rounded bg-forest/15 border border-forest/20" />
            </div>
            {[1, 2].map((cert) => (
              <div key={cert} className="p-3.5 sm:p-4 rounded-lg border border-zinc-200/60 bg-zinc-50/50 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="size-9 rounded-lg bg-[#EDF6F1] border border-[#C2E4D2]/60 shrink-0" />
                  <div className="space-y-1.5 min-w-0">
                    <div className="h-3.5 w-36 bg-zinc-200 rounded" />
                    <div className="h-3 w-24 bg-zinc-200/60 rounded" />
                    <div className="h-3 w-20 bg-zinc-200/50 rounded" />
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <div className="size-7 rounded bg-zinc-100 border border-zinc-200" />
                  <div className="size-7 rounded bg-zinc-100 border border-zinc-200" />
                </div>
              </div>
            ))}
          </section>
        </div>

        {/* Right Column (4 cols): Resume Card + Profile Strength — sticky */}
        <div className="lg:col-span-4 min-w-0 space-y-5 sm:space-y-6">

          {/* Active Resume Card */}
          <section className="bg-white rounded p-4 sm:p-5 border border-zinc-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <div className="size-4 rounded bg-forest/20" />
                <div className="h-3.5 sm:h-4 w-36 bg-zinc-200 rounded" />
              </div>
              <div className="h-5 w-20 rounded bg-emerald-50 border border-emerald-200/60" />
            </div>

            {/* Document info card */}
            <div className="p-4 rounded-xl bg-zinc-50/70 border border-zinc-200/80 space-y-3.5">
              <div className="flex items-start gap-3 min-w-0">
                <div className="size-11 rounded-xl bg-[#EDF6F1] border border-[#C2E4D2]/70 shrink-0" />
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="h-3.5 w-36 bg-zinc-200 rounded" />
                  <div className="h-3 w-28 bg-zinc-200/50 rounded" />
                </div>
              </div>

              {/* ATS score breakdown */}
              <div className="p-3 rounded-lg bg-white border border-zinc-200/70 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="h-3 w-24 bg-zinc-200/70 rounded" />
                  <div className="h-4 w-12 bg-zinc-200 rounded" />
                </div>
                <div className="h-2 w-full rounded-full bg-zinc-100 overflow-hidden">
                  <div className="h-full w-[88%] rounded-full bg-forest/25" />
                </div>
                <div className="grid grid-cols-2 gap-1.5 pt-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <div className="size-1.5 rounded-full bg-emerald-300/70 shrink-0" />
                      <div className="h-2.5 w-16 bg-zinc-200/60 rounded" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2">
              <div className="h-8 flex-1 rounded bg-zinc-50 border border-zinc-200/80" />
              <div className="h-8 flex-1 rounded bg-forest/20" />
            </div>
          </section>

          {/* Profile Strength Card */}
          <div className="bg-white rounded p-4 sm:p-5 border border-zinc-200/80 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
              <div className="flex items-center gap-1.5">
                <div className="size-3.5 rounded bg-forest/20" />
                <div className="h-3 w-28 bg-zinc-200/70 rounded" />
              </div>
              <div className="h-3 w-16 bg-forest/20 rounded" />
            </div>
            {/* Progress bar */}
            <div className="h-2 w-full rounded-full bg-zinc-100 overflow-hidden">
              <div className="h-full w-[95%] rounded-full bg-forest/25" />
            </div>
            <div className="h-3 w-full bg-zinc-200/50 rounded" />
            <div className="h-3 w-4/5 bg-zinc-200/40 rounded" />
            {/* Checklist items */}
            <div className="space-y-2 pt-1 border-t border-zinc-100">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-emerald-300/70 shrink-0" />
                  <div className="h-3 w-36 bg-zinc-200/60 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
