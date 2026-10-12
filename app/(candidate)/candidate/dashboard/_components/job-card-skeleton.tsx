interface JobCardSkeletonProps {
  count?: number;
}

export default function JobCardSkeleton({ count = 3 }: JobCardSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded p-4 sm:p-5 border border-zinc-200/80 shadow-xs animate-pulse flex flex-col justify-between min-h-55"
        >
          <div>
            {/* Top Row */}
            <div className="flex items-start justify-between gap-2.5 mb-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="size-10 rounded-lg bg-zinc-200 shrink-0" />
                <div className="space-y-1.5 min-w-0">
                  <div className="h-4 w-32 bg-zinc-200 rounded" />
                  <div className="h-3 w-20 bg-zinc-100 rounded" />
                </div>
              </div>
              <div className="h-6 w-14 bg-zinc-100 rounded-full shrink-0" />
            </div>

            {/* Meta Chips */}
            <div className="flex gap-2 mb-3.5">
              <div className="h-3.5 w-16 bg-zinc-100 rounded" />
              <div className="h-3.5 w-16 bg-zinc-100 rounded" />
              <div className="h-3.5 w-20 bg-zinc-100 rounded" />
            </div>

            {/* Skills Tags */}
            <div className="flex gap-1.5 mb-4">
              <div className="h-5 w-14 bg-zinc-100 rounded" />
              <div className="h-5 w-16 bg-zinc-100 rounded" />
              <div className="h-5 w-12 bg-zinc-100 rounded" />
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
            <div className="h-3 w-20 bg-zinc-100 rounded" />
            <div className="h-7 w-24 bg-zinc-200 rounded" />
          </div>
        </div>
      ))}
    </>
  );
}
