"use client";

import Link from "next/link";
import { FiBookmark, FiSearch, FiRefreshCw } from "react-icons/fi";

interface SavedJobsEmptyStateProps {
  isFiltered: boolean;
  onResetFilters: () => void;
}

export function SavedJobsEmptyState({
  isFiltered,
  onResetFilters,
}: SavedJobsEmptyStateProps) {
  return (
    <div className="bg-white rounded p-8 sm:p-12 border border-zinc-200/80 text-center space-y-4 shadow-2xs">
      <div className="size-12 sm:size-14 rounded-2xl bg-forest/10 text-forest mx-auto flex items-center justify-center">
        {isFiltered ? (
          <FiSearch className="size-6 sm:size-7" />
        ) : (
          <FiBookmark className="size-6 sm:size-7" />
        )}
      </div>

      <div className="space-y-1.5 max-w-md mx-auto">
        <h3 className="text-base sm:text-lg font-bold text-zinc-900">
          {isFiltered ? "No matching saved jobs found" : "No saved jobs yet"}
        </h3>
        <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">
          {isFiltered
            ? "We couldn't find any bookmarked jobs matching your current search or category filters. Try clearing your filters."
            : "Bookmark high-compatibility jobs as you explore the job board so you can compare compensation packages and apply when ready."}
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
          <Link
            href="/candidate/find-jobs"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-forest text-white hover:bg-[#1b3027] text-xs sm:text-sm font-semibold transition-colors shadow-2xs cursor-pointer"
          >
            <FiSearch className="size-4" />
            <span>Explore Recommended Jobs</span>
          </Link>
        )}
      </div>
    </div>
  );
}
