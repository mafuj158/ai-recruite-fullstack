"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  LuSearch,
  LuPlus,
  LuChevronLeft,
  LuChevronRight,
} from "react-icons/lu";
import { cn } from "@/lib/utils";
import { JobFilterTab } from "@/types/employer/my-jobs.types";

interface JobFilterBarProps {
  currentTab: JobFilterTab;
  onTabChange: (tab: JobFilterTab) => void;
  searchQuery: string;
  onSearchChange: (val: string) => void;
  counts: {
    all: number;
    active: number;
    draft: number;
    closed: number;
  };
}

export default function JobFilterBar({
  currentTab,
  onTabChange,
  searchQuery,
  onSearchChange,
  counts,
}: JobFilterBarProps) {
  const tabsRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const tabs: { key: JobFilterTab; label: string; count: number }[] = [
    { key: "all", label: "All Jobs", count: counts.all },
    { key: "active", label: "Active", count: counts.active },
    { key: "draft", label: "Drafts", count: counts.draft },
    { key: "closed", label: "Closed", count: counts.closed },
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
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 sm:gap-3 p-2 rounded bg-white border border-zinc-200/80 shadow-2xs">
      {/* Search Input */}
      <div className="relative flex-1 min-w-0">
        <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by job title or department..."
          className="w-full pl-9 pr-4 py-1.5 sm:py-2 text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-400 bg-transparent border-0 outline-none focus:ring-0"
        />
      </div>

      {/* Filter Tabs with Left & Right Arrow Navigation */}
      <div className="relative flex items-center min-w-0 max-w-full pt-1.5 md:pt-0 border-t md:border-t-0 border-zinc-100">
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
                      ? "bg-forest/15 text-forest"
                      : "bg-zinc-100 text-zinc-500"
                  )}
                >
                  {tab.count}
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
  );
}
