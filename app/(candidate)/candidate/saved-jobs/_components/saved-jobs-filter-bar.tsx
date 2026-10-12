"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import {
  LuSearch,
  LuX,
  LuChevronLeft,
  LuChevronRight,
  LuSlidersHorizontal,
} from "react-icons/lu";
import { FiTrendingUp, FiTrash2 } from "react-icons/fi";
import { cn } from "@/lib/utils";
import { SavedJobFilterTab, SavedJobsSortOption } from "@/types/candidate/saved-jobs.types";

interface SavedJobsFilterBarProps {
  activeTab: SavedJobFilterTab;
  onTabChange: (tab: SavedJobFilterTab) => void;
  tabCounts: Record<SavedJobFilterTab, number>;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: SavedJobsSortOption;
  onSortChange: (sort: SavedJobsSortOption) => void;
  totalFilteredCount: number;
  showSalaryComparison: boolean;
  onToggleSalaryComparison: () => void;
  onOpenClearAllModal: () => void;
  hasSavedJobs: boolean;
}

const TABS: { id: SavedJobFilterTab; label: string }[] = [
  { id: "all", label: "All Saved" },
  { id: "remote", label: "Remote" },
  { id: "hybrid", label: "Hybrid" },
  { id: "onsite", label: "On-site" },
  { id: "high_match", label: "High Match (90%+)" },
];

export function SavedJobsFilterBar({
  activeTab,
  onTabChange,
  tabCounts,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  totalFilteredCount,
  showSalaryComparison,
  onToggleSalaryComparison,
  onOpenClearAllModal,
  hasSavedJobs,
}: SavedJobsFilterBarProps) {
  const tabsRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollability = useCallback(() => {
    const el = tabsRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 2);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 2);
  }, []);

  useEffect(() => {
    const el = tabsRef.current;
    if (!el) return;

    checkScrollability();
    el.addEventListener("scroll", checkScrollability, { passive: true });
    window.addEventListener("resize", checkScrollability);

    const resizeObserver = new ResizeObserver(() => {
      checkScrollability();
    });
    resizeObserver.observe(el);

    return () => {
      el.removeEventListener("scroll", checkScrollability);
      window.removeEventListener("resize", checkScrollability);
      resizeObserver.disconnect();
    };
  }, [checkScrollability]);

  const handleScroll = (direction: "left" | "right") => {
    const el = tabsRef.current;
    if (!el) return;
    const scrollAmount = 140;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const hasOverflow = canScrollLeft || canScrollRight;

  return (
    <div className="space-y-2.5 sm:space-y-3">
      {/* 1. Primary Filter Bar: Search Input & Category Tabs */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2.5 sm:gap-3 p-2 rounded bg-white border border-zinc-200/80 shadow-2xs">
        {/* Search Field */}
        <div className="relative flex-1 min-w-0">
          <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search saved jobs by title, company, or skills..."
            className="w-full pl-9 pr-8 py-1.5 sm:py-2 text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-400 bg-transparent border-0 outline-none focus:ring-0"
          />
          {searchQuery && (
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

        {/* Filter Tabs with Left & Right Arrow Navigation */}
        <div className="relative flex items-center min-w-0 max-w-full pt-1.5 lg:pt-0 border-t lg:border-t-0 border-zinc-100">
          {hasOverflow && (
            <button
              type="button"
              onClick={() => handleScroll("left")}
              disabled={!canScrollLeft}
              aria-label="Scroll tabs left"
              className={cn(
                "shrink-0 size-7 flex items-center justify-center rounded bg-zinc-50 border border-zinc-200/80 transition-all mr-1 select-none",
                canScrollLeft
                  ? "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 cursor-pointer active:scale-95 shadow-2xs"
                  : "text-zinc-300 opacity-40 cursor-not-allowed"
              )}
            >
              <LuChevronLeft className="size-3.5" />
            </button>
          )}

          <div
            ref={tabsRef}
            className="flex items-center gap-1 overflow-x-auto scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden min-w-0 flex-1"
          >
            {TABS.map((tab) => {
              const isSelected = activeTab === tab.id;
              const count = tabCounts[tab.id] || 0;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => onTabChange(tab.id)}
                  className={cn(
                    "px-2.5 sm:px-3 py-1.5 rounded text-xs font-medium transition-colors shrink-0 cursor-pointer flex items-center gap-1.5 whitespace-nowrap",
                    isSelected
                      ? "bg-[#EDF6F1] text-forest font-semibold"
                      : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50"
                  )}
                >
                  <span>{tab.label}</span>
                  <span
                    className={cn(
                      "text-[10px] px-1.5 py-0.2 rounded",
                      isSelected
                        ? "bg-forest/15 text-forest font-bold"
                        : "bg-zinc-100 text-zinc-500"
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {hasOverflow && (
            <button
              type="button"
              onClick={() => handleScroll("right")}
              disabled={!canScrollRight}
              aria-label="Scroll tabs right"
              className={cn(
                "shrink-0 size-7 flex items-center justify-center rounded bg-zinc-50 border border-zinc-200/80 transition-all ml-1 select-none",
                canScrollRight
                  ? "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 cursor-pointer active:scale-95 shadow-2xs"
                  : "text-zinc-300 opacity-40 cursor-not-allowed"
              )}
            >
              <LuChevronRight className="size-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 2. Secondary Control Bar: Sorting, Result Count, Salary Tool & Clear All */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 px-2.5 sm:px-3 py-2 rounded bg-white border border-zinc-200/80 shadow-2xs text-xs">
        {/* Left: Sort Selector */}
        <div className="flex items-center justify-between sm:justify-start gap-1.5 px-2.5 py-1.5 rounded bg-zinc-50 border border-zinc-200/80 font-medium text-zinc-700 w-full sm:w-auto">
          <div className="flex items-center gap-1.5">
            <LuSlidersHorizontal className="size-3.5 text-zinc-400 shrink-0" />
            <span className="text-zinc-400">Sort:</span>
          </div>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SavedJobsSortOption)}
            className="bg-transparent text-zinc-800 font-semibold focus:outline-none cursor-pointer text-xs ml-auto sm:ml-0"
          >
            <option value="saved_desc">Recently Saved</option>
            <option value="match_desc">Highest AI Match</option>
            <option value="salary_desc">Highest Salary</option>
            <option value="salary_asc">Lowest Salary</option>
            <option value="deadline_asc">Closing Soonest</option>
          </select>
        </div>

        {/* Right: Actions (Salary Comparison Toggle, Count, Clear All) */}
        <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3 w-full sm:w-auto">
          {/* Salary Benchmark Widget Toggle */}
          <button
            type="button"
            onClick={onToggleSalaryComparison}
            className={cn(
              "inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded border text-xs font-semibold transition-colors cursor-pointer",
              showSalaryComparison
                ? "bg-forest/10 border-forest/30 text-forest"
                : "bg-zinc-50 border-zinc-200 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
            )}
          >
            <FiTrendingUp className="size-3.5" />
            <span>Salary Benchmark</span>
          </button>

          {/* Results Count */}
          <span className="text-zinc-500 font-medium hidden md:inline">
            Showing <strong className="text-zinc-900 font-semibold">{totalFilteredCount}</strong>{" "}
            {totalFilteredCount === 1 ? "job" : "jobs"}
          </span>

          {/* Clear All Saved Button */}
          {hasSavedJobs && (
            <button
              type="button"
              onClick={onOpenClearAllModal}
              className="inline-flex items-center gap-1 text-zinc-400 hover:text-rose-600 hover:bg-rose-50 px-2 py-1 rounded transition-colors cursor-pointer"
              title="Clear all saved jobs"
            >
              <FiTrash2 className="size-3.5" />
              <span className="text-xs">Clear All</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
