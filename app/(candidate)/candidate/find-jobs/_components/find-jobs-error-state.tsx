import { FiAlertCircle, FiRefreshCw } from "react-icons/fi";

interface FindJobsErrorStateProps {
  onRetry?: () => void;
  title?: string;
  message?: string;
}

export default function FindJobsErrorState({
  onRetry,
  title = "Failed to load jobs",
  message = "We encountered an issue while retrieving job listings. Please check your internet connection or try again.",
}: FindJobsErrorStateProps) {
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="w-full bg-white rounded p-8 sm:p-12 border border-zinc-200/80 shadow-xs flex flex-col items-center justify-center text-center space-y-3">
      {/* Icon Badge */}
      <div className="size-12 sm:size-14 rounded-full bg-rose-50 border border-rose-100 text-rose-500 flex items-center justify-center shadow-2xs">
        <FiAlertCircle className="size-6 text-rose-500" />
      </div>

      {/* Headline & Description */}
      <div className="max-w-md space-y-1">
        <h3 className="text-base font-bold text-zinc-900">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">
          {message}
        </p>
      </div>

      {/* Action Button */}
      <button
        type="button"
        onClick={handleRetry}
        className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded bg-forest text-white text-xs font-semibold hover:bg-[#1b3027] transition-colors shadow-2xs cursor-pointer"
      >
        <FiRefreshCw className="size-3.5" />
        <span>Try Again</span>
      </button>
    </div>
  );
}