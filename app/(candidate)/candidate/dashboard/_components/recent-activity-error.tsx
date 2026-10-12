import { FiAlertCircle, FiRefreshCw } from "react-icons/fi";

interface RecentActivityErrorProps {
  message?: string;
  onRetry?: () => void;
}

export default function RecentActivityError({
  message = "Failed to load recent activity",
  onRetry,
}: RecentActivityErrorProps) {
  return (
    <div className="bg-rose-50/50 border border-rose-200/80 rounded p-5 text-center space-y-2.5">
      <div className="size-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
        <FiAlertCircle className="size-4" />
      </div>
      <div className="space-y-0.5">
        <p className="text-xs sm:text-sm font-semibold text-rose-700">{message}</p>
        <p className="text-[11px] text-zinc-500">
          Could not fetch latest updates. Please try again.
        </p>
      </div>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold bg-white hover:bg-rose-50 text-rose-700 border border-rose-200 transition-colors shadow-2xs cursor-pointer"
        >
          <FiRefreshCw className="size-3" />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
}
