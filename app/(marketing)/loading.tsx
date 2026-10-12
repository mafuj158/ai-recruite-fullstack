export default function MarketingLoading() {
  return (
    <div
      className="w-full overflow-hidden animate-pulse select-none"
      role="status"
      aria-label="Loading marketing page"
    >
      {/* 1. Hero Section Skeleton */}
      <section className="bg-forest w-full overflow-hidden">
        <div className="container flex flex-col lg:flex-row items-center lg:items-stretch gap-8 sm:gap-12 lg:gap-16 xl:gap-24 pt-24 sm:pt-32 lg:pt-48 pb-8 sm:pb-12 lg:pb-0">
          {/* Left Hero Content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left items-center lg:items-start">
            {/* Title Skeleton Lines */}
            <div className="space-y-3 w-full flex flex-col items-center lg:items-start mb-4">
              <div className="h-9 sm:h-12 md:h-14 lg:h-16 xl:h-20 bg-white/20 rounded w-4/5 sm:w-3/4 max-w-xl" />
              <div className="h-9 sm:h-12 md:h-14 lg:h-16 xl:h-20 bg-lime/40 rounded w-3/5 sm:w-1/2 max-w-md" />
            </div>

            {/* Subtitle Skeleton */}
            <div className="space-y-2.5 max-w-xl w-full flex flex-col items-center lg:items-start">
              <div className="h-3.5 sm:h-4 bg-white/15 rounded w-full" />
              <div className="h-3.5 sm:h-4 bg-white/15 rounded w-4/5" />
            </div>

            {/* CTA Button Skeleton */}
            <div className="h-11 sm:h-12 w-36 sm:w-44 bg-lime/40 rounded mt-6 sm:mt-10" />
          </div>

          {/* Right Hero Image Frame Skeleton */}
          <div className="w-full lg:w-1/2 h-72 sm:h-96 md:h-120 lg:h-auto lg:min-h-140 xl:min-h-170 bg-lime/30 pt-4 pl-4 sm:pt-6 sm:pl-6 lg:pt-8 lg:pl-8 rounded lg:rounded-none overflow-hidden relative">
            <div className="w-full h-full bg-forest/20 rounded-tl flex items-center justify-center">
              <div className="size-16 sm:size-20 rounded-full bg-white/10" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Dual CTA Cards Skeleton */}
      <section className="container grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 py-8 sm:py-12 lg:py-20">
        {/* Card 1: Employer */}
        <div className="p-6 sm:p-8 lg:p-11 rounded bg-zinc-100 border border-zinc-200/80 min-h-[250px] sm:min-h-[280px] flex justify-between items-center relative overflow-hidden">
          <div className="w-full max-w-[210px] xs:max-w-[260px] sm:max-w-xs md:max-w-sm flex flex-col space-y-3 z-10">
            <div className="h-6 sm:h-7 bg-zinc-300 rounded w-3/4" />
            <div className="h-3.5 sm:h-4 bg-zinc-200 rounded w-full" />
            <div className="h-3.5 sm:h-4 bg-zinc-200 rounded w-4/5" />
            <div className="h-9 sm:h-10 w-36 sm:w-44 bg-forest/25 rounded mt-4" />
          </div>
          <div className="w-28 h-28 xs:w-36 xs:h-36 sm:w-44 sm:h-44 absolute -bottom-2 right-2 bg-zinc-200/70 rounded" />
        </div>

        {/* Card 2: Candidate */}
        <div className="p-6 sm:p-8 lg:p-11 rounded bg-forest/80 min-h-[250px] sm:min-h-[280px] flex justify-between items-center relative overflow-hidden">
          <div className="w-full max-w-[210px] xs:max-w-[260px] sm:max-w-xs md:max-w-sm flex flex-col space-y-3 z-10">
            <div className="h-6 sm:h-7 bg-white/30 rounded w-3/4" />
            <div className="h-3.5 sm:h-4 bg-white/20 rounded w-full" />
            <div className="h-3.5 sm:h-4 bg-white/20 rounded w-4/5" />
            <div className="h-9 sm:h-10 w-36 sm:w-44 bg-lime/40 rounded mt-4" />
          </div>
          <div className="w-28 h-28 xs:w-36 xs:h-36 sm:w-44 sm:h-44 absolute -bottom-2 right-2 bg-white/10 rounded" />
        </div>
      </section>

      {/* 3. Popular Categories Skeleton */}
      <section className="bg-lime/40 py-8 sm:py-12 lg:py-20 xl:py-24">
        <div className="container">
          {/* Section Header */}
          <div className="max-w-2xl mb-6 sm:mb-10 space-y-3">
            <div className="h-7 sm:h-9 md:h-11 lg:h-12 bg-forest/20 rounded w-3/5" />
            <div className="h-3 sm:h-3.5 bg-forest/15 rounded w-full" />
            <div className="h-3 sm:h-3.5 bg-forest/15 rounded w-4/5" />
          </div>

          {/* Grid of 6 Category Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-white/80 rounded p-4 sm:p-5 flex flex-col items-center justify-center text-center space-y-2.5 shadow-2xs h-36 sm:h-40 md:h-44"
              >
                <div className="size-10 sm:size-11 rounded bg-forest/10" />
                <div className="h-3 w-3/4 bg-zinc-200 rounded" />
                <div className="h-2.5 w-1/2 bg-zinc-150 bg-zinc-100 rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. AI Tools Section Skeleton */}
      <section className="py-8 sm:py-12 lg:py-20 xl:py-24 bg-white overflow-hidden">
        <div className="container flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-10 lg:gap-14">
          {/* Left Column: Content & 6 Cards Grid */}
          <div className="w-full lg:w-[55%] flex flex-col">
            {/* Pill Badge Skeleton */}
            <div className="h-8 w-36 bg-zinc-100 rounded-full mb-4 sm:mb-6" />

            {/* Section Title Skeleton */}
            <div className="space-y-2 mb-6 sm:mb-8">
              <div className="h-7 sm:h-9 md:h-10 lg:h-11 bg-zinc-200 rounded w-4/5" />
              <div className="h-7 sm:h-9 md:h-10 lg:h-11 bg-zinc-200 rounded w-3/5" />
            </div>

            {/* 6 AI Tool Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-[#EFF3EF] rounded p-4 sm:p-5 flex flex-col space-y-3 border border-transparent"
                >
                  <div className="size-9 sm:size-10 rounded-full bg-forest/20" />
                  <div className="h-3.5 sm:h-4 bg-zinc-300 rounded w-3/4" />
                  <div className="space-y-1.5">
                    <div className="h-2.5 bg-zinc-200 rounded w-full" />
                    <div className="h-2.5 bg-zinc-200 rounded w-4/5" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Image Frame Skeleton */}
          <div className="w-full lg:w-[45%] mt-6 lg:mt-0">
            <div className="w-full h-72 sm:h-96 md:h-110 lg:h-130 rounded bg-zinc-100 border border-zinc-200/70 flex items-center justify-center">
              <div className="size-16 sm:size-20 rounded-full bg-zinc-200/60" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Employers Section Skeleton */}
      <section className="py-8 sm:py-12 lg:py-20 bg-zinc-50/60 border-t border-zinc-100 overflow-hidden">
        <div className="container flex flex-col lg:flex-row justify-center items-center gap-6 lg:gap-12">
          {/* Left Column: Content */}
          <div className="w-full lg:w-[52%] flex flex-col items-start space-y-4">
            <div className="h-3.5 sm:h-4 bg-forest/20 rounded w-24 mb-1" />
            <div className="space-y-2 w-full">
              <div className="h-7 sm:h-9 md:h-11 lg:h-12 bg-zinc-300 rounded w-4/5" />
              <div className="h-7 sm:h-9 md:h-11 lg:h-12 bg-zinc-300 rounded w-1/2" />
            </div>
            <div className="space-y-2 w-full max-w-lg">
              <div className="h-3.5 sm:h-4 bg-zinc-200 rounded w-full" />
              <div className="h-3.5 sm:h-4 bg-zinc-200 rounded w-4/5" />
            </div>

            {/* Checklist Items */}
            <div className="space-y-3 w-full pt-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="size-4.5 sm:size-5 rounded-full bg-forest/20 shrink-0" />
                  <div className="h-4 bg-zinc-200 rounded w-3/5" />
                </div>
              ))}
            </div>

            {/* Button */}
            <div className="h-10 sm:h-12 w-48 sm:w-56 bg-forest/25 rounded mt-4" />
          </div>

          {/* Right Column: Image Frame */}
          <div className="w-full lg:w-[48%] flex justify-center items-center mt-6 lg:mt-0">
            <div className="w-full h-64 sm:h-80 md:h-100 lg:h-120 xl:h-140 rounded bg-zinc-200/70 flex items-center justify-center">
              <div className="size-16 rounded-full bg-zinc-300/60" />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Candidates Section Skeleton */}
      <section className="py-8 sm:py-12 lg:py-20 bg-white overflow-hidden">
        <div className="container flex flex-col-reverse lg:flex-row justify-center items-center gap-6 lg:gap-12">
          {/* Left Column: Image Frame */}
          <div className="w-full lg:w-[48%] flex justify-center items-center mt-6 lg:mt-0">
            <div className="w-full h-64 sm:h-80 md:h-100 lg:h-120 xl:h-140 rounded bg-zinc-200/70 flex items-center justify-center">
              <div className="size-16 rounded-full bg-zinc-300/60" />
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="w-full lg:w-[52%] flex flex-col items-start space-y-4">
            <div className="h-3.5 sm:h-4 bg-forest/20 rounded w-28 mb-1" />
            <div className="h-7 sm:h-9 md:h-11 lg:h-12 bg-zinc-300 rounded w-3/4" />
            <div className="space-y-2 w-full max-w-lg">
              <div className="h-3.5 sm:h-4 bg-zinc-200 rounded w-full" />
              <div className="h-3.5 sm:h-4 bg-zinc-200 rounded w-4/5" />
            </div>

            {/* Checklist Items */}
            <div className="space-y-3 w-full pt-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="size-4.5 sm:size-5 rounded-full bg-forest/20 shrink-0" />
                  <div className="h-4 bg-zinc-200 rounded w-3/5" />
                </div>
              ))}
            </div>

            {/* Button */}
            <div className="h-10 sm:h-12 w-48 sm:w-56 bg-forest/25 rounded mt-4" />
          </div>
        </div>
      </section>
    </div>
  );
}