"use client";

import Link from "next/link";
import { FiCalendar, FiSearch, FiRefreshCw, FiArrowRight } from "react-icons/fi";

interface CandidateInterviewsEmptyStateProps {
  isFiltered: boolean;
  onResetFilters: () => void;
}

export function CandidateInterviewsEmptyState({
  isFiltered,
  onResetFilters,
}: CandidateInterviewsEmptyStateProps) {
  return (
    <div className="bg-white rounded p-8 sm:p-12 border border-zinc-200/80 text-center space-y-4 shadow-2xs">
      <div className="size-12 sm:size-14 rounded-2xl bg-forest/10 text-forest mx-auto flex items-center justify-center">
        {isFiltered ? (
          <FiSearch className="size-6 sm:size-7" />
        ) : (
          <FiCalendar className="size-6 sm:size-7" />
        )}
      </div>

      <div className="space-y-1.5 max-w-md mx-auto">
        <h3 className="text-base sm:text-lg font-bold text-zinc-900">
          {isFiltered ? "No matching interviews found" : "No scheduled interviews yet"}
        </h3>
        <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">
          {isFiltered
            ? "We couldn't find any scheduled sessions matching your search or status filter. Try clearing your filters."
            : "When employers review your application and invite you to an interview round, your scheduled meetings, video conference links, and panel details will appear here."}
        </p>
      </div>

      <div className="pt-2 flex items-center justify-center gap-3 flex-wrap">
        {isFiltered ? (
          <button
            type="button"
            onClick={onResetFilters}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 text-xs sm:text-sm font-semibold transition-colors shadow-2xs cursor-pointer"
          >
            <FiRefreshCw className="size-3.5" />
            <span>Reset Filters</span>
          </button>
        ) : (
          <div className="flex items-center gap-2.5 flex-wrap justify-center">
            <Link
              href="/candidate/applied-jobs"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-forest text-white hover:bg-[#1b3027] text-xs sm:text-sm font-semibold transition-colors shadow-2xs cursor-pointer"
            >
              <span>View Submitted Applications</span>
              <FiArrowRight className="size-4" />
            </Link>
            <Link
              href="/candidate/ai-interview"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 text-xs sm:text-sm font-semibold transition-colors shadow-2xs cursor-pointer"
            >
              <span>Take AI Pre-Screening</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
