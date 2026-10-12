"use client";

import { useState, useMemo } from "react";
import { DUMMY_INTERVIEWS } from "../dummy";
import type {
  InterviewFilterTab,
  InterviewDateFilter,
} from "@/types/employer/interviews.types";
import InterviewsStatsHeader from "./interviews-stats-header";
import InterviewsFilterBar from "./interviews-filter-bar";
import InterviewCard from "./interview-card";
import EmptyInterviewsState from "./empty-interviews-state";

export default function InterviewsClient() {
  const [statusTab, setStatusTab] = useState<InterviewFilterTab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState<InterviewDateFilter>("all");

  const counts = useMemo(() => {
    return {
      all: DUMMY_INTERVIEWS.length,
      scheduled: DUMMY_INTERVIEWS.filter((i) => i.status === "scheduled").length,
      completed: DUMMY_INTERVIEWS.filter((i) => i.status === "completed").length,
      rescheduled: DUMMY_INTERVIEWS.filter((i) => i.status === "rescheduled").length,
      cancelled: DUMMY_INTERVIEWS.filter((i) => i.status === "cancelled").length,
      today: DUMMY_INTERVIEWS.filter((i) => i.date.toLowerCase().includes("today")).length,
    };
  }, []);

  const filteredInterviews = useMemo(() => {
    return DUMMY_INTERVIEWS.filter((item) => {
      // Status Tab filter
      if (statusTab !== "all" && item.status !== statusTab) {
        return false;
      }

      // Date Filter
      if (dateFilter === "today" && !item.date.toLowerCase().includes("today")) {
        return false;
      }
      if (
        dateFilter === "this_week" &&
        !item.date.toLowerCase().includes("today") &&
        !item.date.toLowerCase().includes("tomorrow") &&
        !item.date.toLowerCase().includes("sep")
      ) {
        return false;
      }
      if (dateFilter === "past" && item.status !== "completed" && item.status !== "cancelled") {
        return false;
      }

      // Search Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesCandidate = item.candidateName.toLowerCase().includes(q);
        const matchesJob = item.jobTitle.toLowerCase().includes(q);
        const matchesHeadline = item.candidateHeadline.toLowerCase().includes(q);
        return matchesCandidate || matchesJob || matchesHeadline;
      }

      return true;
    });
  }, [statusTab, searchQuery, dateFilter]);

  const handleResetFilters = () => {
    setStatusTab("all");
    setSearchQuery("");
    setDateFilter("all");
  };

  return (
    <div className="w-full space-y-3 xs:space-y-4 sm:space-y-6">
      {/* 1. Header & Summary Metric Counters */}
      <InterviewsStatsHeader counts={counts} />

      {/* 2. Filter Bar & Search */}
      <InterviewsFilterBar
        currentTab={statusTab}
        onTabChange={setStatusTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        dateFilter={dateFilter}
        onDateFilterChange={setDateFilter}
        counts={counts}
      />

      {/* 3. Interview Sessions Grid / Empty State */}
      {filteredInterviews.length > 0 ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-5 w-full">
          {filteredInterviews.map((interview) => (
            <InterviewCard key={interview.id} interview={interview} />
          ))}
        </div>
      ) : (
        <EmptyInterviewsState onReset={handleResetFilters} />
      )}
    </div>
  );
}
