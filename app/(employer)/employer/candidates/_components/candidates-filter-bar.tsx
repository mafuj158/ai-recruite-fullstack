"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import {
  LuSearch,
  LuLayoutGrid,
  LuList,
  LuSlidersHorizontal,
  LuBriefcase,
  LuChevronLeft,
  LuChevronRight,
  LuX,
} from "react-icons/lu";
import { cn } from "@/lib/utils";
import {
  CandidateExplorerFilterTab,
  CandidateSortOption,
  CandidateViewMode,
} from "@/types/employer/candidates.types";
import { UNIQUE_JOBS_FILTER } from "../dummy";

interface CandidatesFilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  activeTab: CandidateExplorerFilterTab;
  onTabChange: (tab: CandidateExplorerFilterTab) => void;
  selectedJobId: string;
  onJobIdChange: (jobId: string) => void;
  sortBy: CandidateSortOption;
  onSortChange: (sort: CandidateSortOption) => void;
  viewMode: CandidateViewMode;
  onViewModeChange: (mode: CandidateViewMode) => void;
  tabCounts: Record<CandidateExplorerFilterTab, number>;
}

const TABS: { id: CandidateExplorerFilterTab; label: string }[] = [
  { id: "all", label: "All Candidates" },
  { id: "ai_recommended", label: "AI Recommended (85%+)" },
  { id: "shortlisted", label: "Shortlisted" },
  { id: "interview_scheduled", label: "Interviews" },
  { id: "hired", label: "Hired" },
  { id: "rejected", label: "Archived" },
];

export default function CandidatesFilterBar({
  searchTerm,
  onSearchChange,
  activeTab,
  onTabChange,
  selectedJobId,
  onJobIdChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  tabCounts,
}: CandidatesFilterBarProps) {
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
    <div className="space-y-3">
      {/* Primary Bar: Search Input & Status Tabs Bar (Follows My Jobs Pattern) */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2.5 sm:gap-3 p-2 rounded bg-white border border-zinc-200/80 shadow-2xs">
        {/* Search Field */}
        <div className="relative flex-1 min-w-0">
          <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-400 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search candidates by name, skills, title, or job role..."
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

        {/* Filter Tabs with Left & Right Arrow Navigation (Matches My Jobs) */}
        <div className="relative flex items-center min-w-0 max-w-full pt-2 lg:pt-0 border-t lg:border-t-0 border-zinc-100">
          {/* Left Arrow Button (shown when tabs overflow) */}
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

          {/* Tabs Scroll Area (Scrollbar completely hidden) */}
          <div
            ref={tabsRef}
            className="flex items-center gap-1 overflow-x-auto scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden min-w-0 flex-1"
          >
            {TABS.map((tab) => {
              const isSelected = activeTab === tab.id;
              const count = tabCounts[tab.id] ?? 0;

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

          {/* Right Arrow Button (shown when tabs overflow) */}
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

      {/* Secondary Controls Bar: Job Filter, Sort Option, and View Mode Toggle */}
      <div className="flex xs:flex-row flex-col-reverse items-center justify-between gap-2.5 px-2.5 sm:px-3 py-2 rounded bg-white border border-zinc-200/80 shadow-2xs">
        {/* Left: Job Filter & Sort Dropdowns */}
        <div className="flex flex-wrap items-center gap-2 flex-1 min-w-0">
          {/* Job Filter Dropdown */}
          <div className="flex-1 sm:flex-initial flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-zinc-50 border border-zinc-200/80 text-xs font-medium text-zinc-700 min-w-[140px]">
            <LuBriefcase className="size-3.5 text-zinc-400 shrink-0" />
            <select
              value={selectedJobId}
              onChange={(e) => onJobIdChange(e.target.value)}
              className="bg-transparent text-zinc-800 font-semibold focus:outline-none cursor-pointer pr-1 text-xs truncate w-full sm:w-auto"
            >
              {UNIQUE_JOBS_FILTER.map((job) => (
                <option key={job.value} value={job.value}>
                  {job.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Selector */}
          <div className="flex-1 sm:flex-initial flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-zinc-50 border border-zinc-200/80 text-xs font-medium text-zinc-700 min-w-[140px]">
            <LuSlidersHorizontal className="size-3.5 text-zinc-400 shrink-0" />
            <span className="text-zinc-400 hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as CandidateSortOption)}
              className="bg-transparent text-zinc-800 font-semibold focus:outline-none cursor-pointer pr-1 text-xs truncate w-full sm:w-auto"
            >
              <option value="match_desc">Highest AI Match</option>
              <option value="match_asc">Lowest Match</option>
              <option value="date_desc">Most Recent</option>
              <option value="name_asc">Name (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Right: View Toggle (Grid / Table) */}
        <div className="flex items-center gap-2 self-end shrink-0 ">
          <div className="flex items-center p-0.5 rounded bg-zinc-50 border border-zinc-200/80">
            <button
              type="button"
              onClick={() => onViewModeChange("cards")}
              className={cn(
                "p-1.5 rounded transition-colors cursor-pointer",
                viewMode === "cards"
                  ? "bg-forest text-white shadow-2xs"
                  : "text-zinc-400 hover:text-zinc-700"
              )}
              title="Card Grid View"
              aria-label="Card Grid View"
            >
              <LuLayoutGrid className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange("table")}
              className={cn(
                "p-1.5 rounded transition-colors cursor-pointer",
                viewMode === "table"
                  ? "bg-forest text-white shadow-2xs"
                  : "text-zinc-400 hover:text-zinc-700"
              )}
              title="Table View"
              aria-label="Table View"
            >
              <LuList className="size-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
