"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import {
  LuSearch,
  LuCalendar,
  LuChevronLeft,
  LuChevronRight,
  LuX,
} from "react-icons/lu";
import { cn } from "@/lib/utils";
import type {
  InterviewFilterTab,
  InterviewDateFilter,
} from "@/types/employer/interviews.types";

interface InterviewsFilterBarProps {
  currentTab: InterviewFilterTab;
  onTabChange: (tab: InterviewFilterTab) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  dateFilter: InterviewDateFilter;
  onDateFilterChange: (df: InterviewDateFilter) => void;
  counts: {
    all: number;
    scheduled: number;
    completed: number;
    rescheduled: number;
    cancelled: number;
  };
}

export default function InterviewsFilterBar({
  currentTab,
  onTabChange,
  searchQuery,
  onSearchChange,
  dateFilter,
  onDateFilterChange,
  counts,
}: InterviewsFilterBarProps) {
  const tabsRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const tabs: { key: InterviewFilterTab; label: string; count: number }[] = [
    { key: "all", label: "All Sessions", count: counts.all },
    { key: "scheduled", label: "Scheduled", count: counts.scheduled },
    { key: "completed", label: "Completed", count: counts.completed },
    { key: "rescheduled", label: "Rescheduled", count: counts.rescheduled },
    { key: "cancelled", label: "Cancelled", count: counts.cancelled },
  ];

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
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2.5 sm:gap-3 p-2 rounded bg-white border border-zinc-200/80 shadow-2xs">
      {/* Search Input & Date Filter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 flex-1 min-w-0">
        {/* Search Field */}
        <div className="relative flex-1 min-w-0">
          <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search candidate, job title, or interviewer..."
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

        {/* Date Filter Dropdown Pill */}
        <div className="flex items-center gap-1.5 px-3 py-2 sm:py-1.5 rounded bg-zinc-50 border border-zinc-200/80 text-xs font-medium text-zinc-700 w-full sm:w-auto shrink-0">
          <LuCalendar className="size-3.5 text-zinc-400 shrink-0" />
          <span className="text-zinc-400">Date:</span>
          <select
            value={dateFilter}
            onChange={(e) =>
              onDateFilterChange(e.target.value as InterviewDateFilter)
            }
            className="bg-transparent text-zinc-800 font-semibold focus:outline-none cursor-pointer pr-1 text-xs w-full flex-1"
          >
            <option value="all">All Dates</option>
            <option value="today">Today</option>
            <option value="this_week">This Week</option>
            <option value="past">Past Sessions</option>
          </select>
        </div>
      </div>

      {/* Filter Tabs with Left & Right Arrow Navigation (Matches My Jobs & Candidates) */}
      <div className="relative flex items-center min-w-0 max-w-full pt-1.5 lg:pt-0 border-t lg:border-t-0 border-zinc-100">
        {/* Left Arrow Button */}
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

        {/* Tabs Scroll Area */}
        <div
          ref={tabsRef}
          className="flex items-center gap-1 overflow-x-auto scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden min-w-0 flex-1"
        >
          {tabs.map((tab) => {
            const isSelected = currentTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => onTabChange(tab.key)}
                className={cn(
                  "px-3 py-1.5 rounded text-xs font-medium transition-colors shrink-0 cursor-pointer flex items-center gap-1.5 whitespace-nowrap",
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
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Arrow Button */}
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
  );
}
