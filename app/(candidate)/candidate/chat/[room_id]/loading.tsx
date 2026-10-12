export default function ChatRoomLoading() {
  return (
    <div
      className="h-full flex flex-col min-w-0 min-h-0 overflow-hidden bg-white animate-pulse select-none"
      role="status"
      aria-label="Loading chat messages..."
    >
      {/* 1. Header Skeleton */}
      <div className="h-15 sm:h-16 px-4 sm:px-6 border-b border-zinc-200/80 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="size-9 sm:size-10 rounded-full bg-zinc-200 shrink-0" />
          <div className="space-y-1.5">
            <div className="h-4 w-36 bg-zinc-200 rounded" />
            <div className="h-3 w-48 bg-zinc-100 rounded" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-8 w-24 bg-zinc-100 border border-zinc-200/70 rounded" />
          <div className="size-8 rounded bg-zinc-100" />
        </div>
      </div>

      {/* 2. Message Stream Skeleton */}
      <div className="flex-1 p-4 sm:p-6 space-y-4 overflow-hidden flex flex-col justify-end bg-zinc-50/40">
        {/* Incoming message */}
        <div className="flex items-start gap-2.5 max-w-lg">
          <div className="size-8 rounded-full bg-zinc-200 shrink-0" />
          <div className="space-y-1">
            <div className="h-16 w-72 bg-white border border-zinc-200/70 rounded-2xl rounded-tl-sm p-3" />
            <div className="h-2.5 w-16 bg-zinc-100 rounded ml-1" />
          </div>
        </div>

        {/* Outgoing message */}
        <div className="flex items-start justify-end gap-2.5 max-w-lg self-end">
          <div className="space-y-1 items-end flex flex-col">
            <div className="h-12 w-64 bg-forest/20 rounded-2xl rounded-tr-sm p-3" />
            <div className="h-2.5 w-16 bg-zinc-100 rounded mr-1" />
          </div>
        </div>

        {/* Incoming message with badge */}
        <div className="flex items-start gap-2.5 max-w-lg">
          <div className="size-8 rounded-full bg-zinc-200 shrink-0" />
          <div className="space-y-1">
            <div className="h-20 w-80 bg-white border border-zinc-200/70 rounded-2xl rounded-tl-sm p-3" />
            <div className="h-2.5 w-16 bg-zinc-100 rounded ml-1" />
          </div>
        </div>
      </div>

      {/* 3. Input Bar Skeleton */}
      <div className="p-3 sm:p-4 border-t border-zinc-200/80 bg-white space-y-3">
        {/* AI Prompts bar */}
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="h-6 w-32 bg-emerald-50 border border-emerald-200/70 rounded-full shrink-0" />
          <div className="h-6 w-36 bg-zinc-100 rounded-full shrink-0" />
          <div className="h-6 w-40 bg-zinc-100 rounded-full shrink-0" />
        </div>

        {/* Structured composer box */}
        <div className="rounded border border-zinc-200 bg-white overflow-hidden space-y-2">
          <div className="h-14 w-full p-3 bg-transparent" />
          <div className="h-10 px-3 py-2 bg-zinc-50/70 border-t border-zinc-100 flex items-center justify-between">
            <div className="h-5 w-20 bg-zinc-200/70 rounded" />
            <div className="flex items-center gap-2">
              <div className="h-7 w-20 bg-forest/10 rounded" />
              <div className="h-7 w-16 bg-forest/20 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
