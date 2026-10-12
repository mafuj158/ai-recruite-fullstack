interface RecentActivitySkeletonProps {
  count?: number;
}

export default function RecentActivitySkeleton({
  count = 4,
}: RecentActivitySkeletonProps) {
  return (
    <div className="divide-y divide-zinc-100">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="py-3.5 first:pt-1 last:pb-1 flex items-start justify-between gap-3 sm:gap-4 animate-pulse"
        >
          <div className="flex items-start gap-3 min-w-0 flex-1">
            <div className="size-8 sm:size-9 rounded-lg bg-zinc-200 shrink-0" />
            <div className="space-y-1.5 min-w-0 flex-1">
              <div className="h-4 w-40 sm:w-56 bg-zinc-200 rounded" />
              <div className="h-3 w-52 sm:w-72 bg-zinc-100 rounded" />
            </div>
          </div>
          <div className="space-y-1.5 shrink-0 flex flex-col items-end">
            <div className="h-3 w-14 bg-zinc-100 rounded" />
            <div className="h-3 w-8 bg-zinc-200 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
