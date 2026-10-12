import { FiAlertCircle, FiRefreshCw } from "react-icons/fi";

interface RecommendedJobsErrorProps {
  message?: string;
  onRetry?: () => void;
}

export default function RecommendedJobsError({
  message = "Failed to load recommended jobs",
  onRetry,
}: RecommendedJobsErrorProps) {
  return (
    <div className="col-span-full bg-white border border-rose-200/80 rounded p-6 sm:p-8 text-center space-y-3 shadow-xs">
      <div className="size-10 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
        <FiAlertCircle className="size-5" />
      </div>
      <div className="space-y-1">
        <p className="text-sm font-semibold text-rose-600">{message}</p>
        <p className="text-xs text-zinc-500">
          Something went wrong while fetching jobs. Please try refreshing.
        </p>
      </div>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition-colors cursor-pointer"
        >
          <FiRefreshCw className="size-3" />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
}
