import { FiSearch, FiRotateCcw } from "react-icons/fi";

interface FindJobsEmptyStateProps {
  onReset: () => void;
}

export default function FindJobsEmptyState({ onReset }: FindJobsEmptyStateProps) {
  return (
    <div className="w-full bg-white rounded p-8 sm:p-12 border border-zinc-200/80 shadow-xs flex flex-col items-center justify-center text-center space-y-3">
      <div className="size-12 sm:size-14 rounded-full bg-zinc-100 text-zinc-500 flex items-center justify-center">
        <FiSearch className="size-6 text-zinc-400" />
      </div>

      <div className="max-w-md space-y-1">
        <h3 className="text-base font-bold text-zinc-900">
          No matching jobs found
        </h3>
        <p className="text-xs sm:text-sm text-zinc-500">
          We couldn&apos;t find any roles matching your current search terms or filter criteria. Try adjusting your filters or search for broader keywords.
        </p>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded bg-forest text-white text-xs font-semibold hover:bg-[#1b3027] transition-colors shadow-2xs cursor-pointer"
      >
        <FiRotateCcw className="size-3.5" />
        <span>Reset All Filters</span>
      </button>
    </div>
  );
}
