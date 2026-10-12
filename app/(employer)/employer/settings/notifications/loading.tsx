export default function NotificationsSettingsLoading() {
  return (
    <div
      className="w-full bg-white rounded p-4 sm:p-6 lg:p-8 border border-zinc-200/80 shadow-xs space-y-6 animate-pulse select-none"
      role="status"
      aria-label="Loading notification settings..."
    >
      <div className="space-y-1.5">
        <div className="h-5 w-48 bg-zinc-200 rounded" />
        <div className="h-3.5 w-72 max-w-full bg-zinc-100 rounded" />
      </div>

      <div className="border-t border-zinc-100" />

      {/* Notification Toggle Rows */}
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="flex items-center justify-between p-3 sm:p-4 rounded bg-zinc-50/70 border border-zinc-200/60"
          >
            <div className="space-y-1.5 pr-4">
              <div className="h-4 w-44 bg-zinc-200 rounded" />
              <div className="h-3 w-64 max-w-full bg-zinc-100 rounded" />
            </div>
            <div className="h-6 w-11 rounded-full bg-zinc-200 shrink-0" />
          </div>
        ))}
      </div>

      <div className="border-t border-zinc-100" />

      <div className="flex justify-end pt-1">
        <div className="h-9 w-32 bg-forest/20 rounded" />
      </div>
    </div>
  );
}
