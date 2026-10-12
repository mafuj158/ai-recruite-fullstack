"use client";

import { useState, useMemo } from "react";
import { LuSearch } from "react-icons/lu";
import type {
  AIInterviewListItem,
  AIInterviewTab,
} from "@/types/candidate/ai-interview.types";
import AIInterviewStatsCards from "./ai-interview-stats-cards";
import AIInterviewFilterBar, {
  AIInterviewSortOption,
} from "./ai-interview-filter-bar";
import AIInterviewListCard from "./ai-interview-list-card";

interface AIInterviewListViewProps {
  items: AIInterviewListItem[];
}

export default function AIInterviewListView({
  items = [],
}: AIInterviewListViewProps) {
  const [activeTab, setActiveTab] = useState<AIInterviewTab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<AIInterviewSortOption>("due_asc");

  // Tab counts
  const tabCounts: Record<AIInterviewTab, number> = useMemo(() => {
    return {
      all: items.length,
      pending: items.filter((i) => i.status === "pending").length,
      completed: items.filter((i) => i.status === "completed").length,
    };
  }, [items]);

  // Filter & Sort
  const filteredItems = useMemo(() => {
    let result = items.filter((item) => {
      // Tab filter
      if (activeTab === "pending" && item.status !== "pending") return false;
      if (activeTab === "completed" && item.status !== "completed") return false;

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesRole = item.jobTitle.toLowerCase().includes(query);
        const matchesCompany = item.companyName.toLowerCase().includes(query);
        const matchesDept = item.department.toLowerCase().includes(query);
        if (!matchesRole && !matchesCompany && !matchesDept) return false;
      }

      return true;
    });

    // Sorting
    result = [...result].sort((a, b) => {
      if (sortBy === "company_asc") {
        return a.companyName.localeCompare(b.companyName);
      }
      if (sortBy === "highest_score") {
        return (b.score || 0) - (a.score || 0);
      }
      if (sortBy === "due_asc") {
        if (a.status === "pending" && b.status !== "pending") return -1;
        if (b.status === "pending" && a.status !== "pending") return 1;
        return 0;
      }
      return b.id.localeCompare(a.id);
    });

    return result;
  }, [items, activeTab, searchQuery, sortBy]);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* 1. Metric Overview Cards */}
      <AIInterviewStatsCards items={items} />

      {/* 2. Primary Filter & Secondary Sort Bar */}
      <AIInterviewFilterBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        tabCounts={tabCounts}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
        totalFilteredCount={filteredItems.length}
      />

      {/* 3. Interview Cards Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredItems.map((item) => (
            <AIInterviewListCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white border border-zinc-200/80 rounded p-8 sm:p-12 text-center shadow-2xs space-y-3">
          <div className="size-12 rounded-full bg-zinc-100 text-zinc-400 flex items-center justify-center mx-auto">
            <LuSearch className="size-5" />
          </div>
          <h3 className="text-sm font-bold text-zinc-900">
            No Pre-Screening Interviews Found
          </h3>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto">
            {searchQuery
              ? `No pre-screenings match "${searchQuery}". Try searching with different keywords.`
              : "No pre-screenings available in this category right now."}
          </p>
          {(searchQuery || activeTab !== "all") && (
            <button
              type="button"
              onClick={() => {
                setActiveTab("all");
                setSearchQuery("");
              }}
              className="h-9 px-4 rounded border border-zinc-200 text-zinc-700 hover:bg-zinc-50 text-xs font-semibold cursor-pointer"
            >
              Clear Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}
