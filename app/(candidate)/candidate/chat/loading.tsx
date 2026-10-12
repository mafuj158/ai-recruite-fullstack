export default function ChatLoading() {
  return (
    <div
      className="w-full h-[calc(100dvh-6rem)] sm:h-[calc(100dvh-6.5rem)] lg:h-[calc(100dvh-7rem)] overflow-hidden animate-pulse select-none"
      role="status"
      aria-label="Loading candidate messages..."
    >
      <div className="bg-white border-y sm:border border-zinc-200/80 rounded-none sm:rounded overflow-hidden shadow-2xs h-full max-h-full flex min-h-0">
        {/* Left Sidebar: Conversations List Skeleton */}
        <div className="w-full md:w-80 lg:w-96 shrink-0 h-full min-h-0 border-r border-zinc-200/80 flex flex-col">
          {/* Header & Search Bar */}
          <div className="p-3.5 sm:p-4 border-b border-zinc-100 space-y-3">
            <div className="flex items-center justify-between">
              <div className="h-5 w-24 bg-zinc-200 rounded" />
              <div className="h-5 w-16 bg-zinc-100 rounded-full" />
            </div>
            <div className="h-9 w-full rounded bg-zinc-50 border border-zinc-200/80" />
            {/* Filter pills */}
            <div className="flex items-center gap-1.5 pt-0.5">
              <div className="h-6 w-12 bg-forest/20 rounded-full" />
              <div className="h-6 w-16 bg-zinc-100 rounded-full" />
              <div className="h-6 w-16 bg-zinc-100 rounded-full" />
            </div>
          </div>

          {/* Conversation list items */}
          <div className="flex-1 divide-y divide-zinc-100 overflow-hidden">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`p-3 sm:p-3.5 flex items-start gap-3 ${i === 1 ? "bg-forest/5" : ""
                  }`}
              >
                <div className="size-10 rounded-full bg-zinc-200 shrink-0" />
                <div className="flex-1 min-w-0 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="h-4 w-28 bg-zinc-200 rounded" />
                    <div className="h-3 w-12 bg-zinc-100 rounded" />
                  </div>
                  <div className="h-3 w-36 bg-zinc-100 rounded" />
                  <div className="h-3 w-48 bg-zinc-100/70 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Active Chat Pane Skeleton */}
        <div className="hidden md:flex flex-1 flex-col h-full min-w-0 min-h-0 overflow-hidden">
          {/* Chat Header */}
          <div className="h-16 px-4 sm:px-6 border-b border-zinc-200/80 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-zinc-200 shrink-0" />
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

          {/* Message Stream */}
          <div className="flex-1 p-4 sm:p-6 space-y-4 overflow-hidden flex flex-col justify-end">
            {/* Incoming message */}
            <div className="flex items-start gap-2.5 max-w-lg">
              <div className="size-8 rounded-full bg-zinc-200 shrink-0" />
              <div className="space-y-1">
                <div className="h-16 w-72 bg-zinc-100 border border-zinc-200/70 rounded-2xl rounded-tl-sm p-3" />
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
                <div className="h-20 w-80 bg-zinc-100 border border-zinc-200/70 rounded-2xl rounded-tl-sm p-3" />
                <div className="h-2.5 w-16 bg-zinc-100 rounded ml-1" />
              </div>
            </div>
          </div>

          {/* Input Bar Skeleton */}
          <div className="p-3 sm:p-4 border-t border-zinc-200/80 bg-white space-y-2.5">
            {/* AI Prompts bar */}
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="h-6 w-32 bg-emerald-50 border border-emerald-200/70 rounded-full shrink-0" />
              <div className="h-6 w-40 bg-zinc-100 rounded-full shrink-0" />
              <div className="h-6 w-36 bg-zinc-100 rounded-full shrink-0" />
            </div>

            {/* Textarea + Action buttons */}
            <div className="flex items-end gap-2">
              <div className="h-12 flex-1 rounded bg-zinc-50 border border-zinc-200" />
              <div className="size-10 bg-forest/20 rounded shrink-0" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
