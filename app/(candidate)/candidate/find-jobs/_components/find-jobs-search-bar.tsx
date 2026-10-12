"use client";

import {
  LuSearch,
  LuBriefcase,
  LuSlidersHorizontal,
  LuX,
} from "react-icons/lu";
import {
  WorkType,
  FindJobsSortOption,
} from "@/types/candidate/find-jobs.types";

interface FindJobsSearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  workType: "all" | WorkType;
  onWorkTypeChange: (workType: "all" | WorkType) => void;
  sortBy: FindJobsSortOption;
  onSortChange: (sort: FindJobsSortOption) => void;
  totalCount: number;
  onOpenMobileFilters: () => void;
  hasActiveFilters: boolean;
}

export default function FindJobsSearchBar({
  searchTerm,
  onSearchChange,
  workType,
  onWorkTypeChange,
  sortBy,
  onSortChange,
  totalCount,
  onOpenMobileFilters,
  hasActiveFilters,
}: FindJobsSearchBarProps) {
  return (
    <div className="space-y-2.5 sm:space-y-3">
      {/* Primary Bar: Search Input (Follows Employer Side Design) */}
      <div className="flex items-center p-2 rounded bg-white border border-zinc-200/80 shadow-2xs">
        <div className="relative flex-1 min-w-0">
          <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-400 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search jobs by title, tech stack (React, Node...), company, or keyword..."
            className="w-full pl-9 pr-8 py-1.5 sm:py-2 text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-400 bg-transparent border-0 outline-none focus:ring-0"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              aria-label="Clear search"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-zinc-600 transition-colors cursor-pointer"
            >
              <LuX className="size-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Secondary Controls Bar: Work Type Filter, Sort Option, & Mobile Filter Trigger */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 px-2.5 sm:px-3 py-2 rounded bg-white border border-zinc-200/80 shadow-2xs">
        {/* Left: Quick Filters & Sort Dropdowns */}
        <div className="flex flex-wrap items-center gap-2 flex-1 min-w-0">
          {/* Work Type Filter Dropdown */}
          <div className="flex-1 sm:flex-initial flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-zinc-50 border border-zinc-200/80 text-xs font-medium text-zinc-700 min-w-[140px]">
            <LuBriefcase className="size-3.5 text-zinc-400 shrink-0" />
            <select
              value={workType}
              onChange={(e) =>
                onWorkTypeChange(e.target.value as "all" | WorkType)
              }
              className="bg-transparent text-zinc-800 font-semibold focus:outline-none cursor-pointer pr-1 text-xs truncate w-full sm:w-auto"
            >
              <option value="all">All Work Types ({totalCount})</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="On-site">On-site</option>
            </select>
          </div>

          {/* Sort Selector Dropdown */}
          <div className="flex-1 sm:flex-initial flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-zinc-50 border border-zinc-200/80 text-xs font-medium text-zinc-700 min-w-[140px]">
            <LuSlidersHorizontal className="size-3.5 text-zinc-400 shrink-0" />
            <span className="text-zinc-400 hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) =>
                onSortChange(e.target.value as FindJobsSortOption)
              }
              className="bg-transparent text-zinc-800 font-semibold focus:outline-none cursor-pointer pr-1 text-xs truncate w-full sm:w-auto"
            >
              <option value="match_desc">Highest AI Match</option>
              <option value="date_desc">Most Recent</option>
              <option value="salary_desc">Highest Salary</option>
            </select>
          </div>
        </div>

        {/* Right: Results Count & Mobile Filter Trigger */}
        <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0">
          <span className="text-xs text-zinc-500 font-medium">
            <strong className="text-zinc-900 font-bold">{totalCount}</strong>{" "}
            {totalCount === 1 ? "role" : "roles"}
          </span>

          {/* Mobile Filter Toggle */}
          <button
            type="button"
            onClick={onOpenMobileFilters}
            className="lg:hidden flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-zinc-50 border border-zinc-200/80 text-xs font-semibold text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer"
          >
            <LuSlidersHorizontal className="size-3.5 text-zinc-500" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="size-2 rounded-full bg-forest" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
