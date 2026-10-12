"use client";

import { useState, useMemo } from "react";
import { FiCalendar, FiClock, FiVideo, FiArrowUpRight } from "react-icons/fi";
import { DUMMY_CANDIDATE_INTERVIEWS } from "../dummy";
import type {
  CandidateInterviewItem,
  CandidateInterviewFilterTab,
  CandidateInterviewSortOption,
} from "@/types/candidate/interviews.types";
import { CandidateInterviewsFilterBar } from "./candidate-interviews-filter-bar";
import { CandidateInterviewCard } from "./candidate-interview-card";
import { CandidateInterviewsEmptyState } from "./candidate-interviews-empty-state";

export function CandidateInterviewsClient() {
  const [interviews, setInterviews] = useState<CandidateInterviewItem[]>(
    DUMMY_CANDIDATE_INTERVIEWS
  );
  const [activeTab, setActiveTab] =
    useState<CandidateInterviewFilterTab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] =
    useState<CandidateInterviewSortOption>("date_asc");

  // Tab counts
  const tabCounts = useMemo(() => {
    return {
      all: interviews.length,
      upcoming: interviews.filter((i) => i.status === "upcoming").length,
      completed: interviews.filter((i) => i.status === "completed").length,
      cancelled: interviews.filter((i) => i.status === "cancelled").length,
    };
  }, [interviews]);

  // Filtered & Sorted Interviews
  const filteredInterviews = useMemo(() => {
    return interviews
      .filter((item) => {
        // Tab filter
        if (activeTab !== "all" && item.status !== activeTab) {
          return false;
        }

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchesTitle = item.jobTitle.toLowerCase().includes(q);
          const matchesCompany = item.company.toLowerCase().includes(q);
          const matchesDept = item.department.toLowerCase().includes(q);
          const matchesRound = item.roundName.toLowerCase().includes(q);
          if (!matchesTitle && !matchesCompany && !matchesDept && !matchesRound) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "date_asc") {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        }
        if (sortBy === "date_desc") {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
        if (sortBy === "company_asc") {
          return a.company.localeCompare(b.company);
        }
        return 0;
      });
  }, [interviews, activeTab, searchQuery, sortBy]);

  // Nearest upcoming interview for the banner
  const nextUpcoming = useMemo(() => {
    return interviews
      .filter((i) => i.status === "upcoming")
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];
  }, [interviews]);

  // Handlers
  const handleAddToCalendar = (interview: CandidateInterviewItem) => {
    const title = encodeURIComponent(
      `Interview: ${interview.jobTitle} - ${interview.company}`
    );
    const details = encodeURIComponent(
      `Round: ${interview.roundName}\nCompany: ${interview.company}\nMeeting Link: ${
        interview.meetingLink || "TBA"
      }\nNotes: ${interview.notes || "None"}`
    );
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}`;
    window.open(googleCalendarUrl, "_blank", "noopener,noreferrer");
  };

  const handleResetFilters = () => {
    setActiveTab("all");
    setSearchQuery("");
    setSortBy("date_asc");
  };

  const isFiltered = activeTab !== "all" || searchQuery.trim().length > 0;

  return (
    <div className="space-y-6">
      {/* Next Upcoming Interview Alert Banner */}
      {nextUpcoming && activeTab !== "completed" && activeTab !== "cancelled" && (
        <div className="bg-forest/5 border border-forest/20 rounded p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="size-10 rounded-xl bg-forest text-lime flex items-center justify-center shrink-0 shadow-2xs">
              <FiCalendar className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-bold uppercase tracking-wider text-forest bg-forest/10 px-2 py-0.5 rounded">
                  Next Scheduled Round
                </span>
                {nextUpcoming.isTomorrow && (
                  <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                    Tomorrow
                  </span>
                )}
              </div>
              <h3 className="text-sm sm:text-base font-bold text-zinc-900 mt-1">
                {nextUpcoming.roundName} with {nextUpcoming.company}
              </h3>
              <p className="text-xs text-zinc-600 mt-0.5 flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1 font-medium text-zinc-700">
                  <FiClock className="size-3 text-zinc-400" />
                  {nextUpcoming.date} at {nextUpcoming.time} ({nextUpcoming.duration})
                </span>
                <span>•</span>
                <span className="inline-flex items-center gap-1 font-medium text-zinc-700">
                  <FiVideo className="size-3 text-zinc-400" />
                  {nextUpcoming.platform === "google_meet"
                    ? "Google Meet"
                    : nextUpcoming.platform === "zoom"
                    ? "Zoom Video"
                    : nextUpcoming.platform === "teams"
                    ? "Microsoft Teams"
                    : "In-Person"}
                </span>
              </p>
            </div>
          </div>

          {nextUpcoming.meetingLink && (
            <a
              href={nextUpcoming.meetingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded bg-forest text-white hover:bg-[#1b3027] text-xs sm:text-sm font-semibold transition-colors shrink-0 shadow-2xs cursor-pointer"
            >
              <span>Join Meeting</span>
              <FiArrowUpRight className="size-4" />
            </a>
          )}
        </div>
      )}

      {/* Filter and Tab Bar */}
      <CandidateInterviewsFilterBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        tabCounts={tabCounts}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
        totalFilteredCount={filteredInterviews.length}
      />

      {/* Interviews List or Empty State */}
      {filteredInterviews.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {filteredInterviews.map((interview) => (
            <CandidateInterviewCard
              key={interview.id}
              interview={interview}
              onAddToCalendar={handleAddToCalendar}
            />
          ))}
        </div>
      ) : (
        <CandidateInterviewsEmptyState
          isFiltered={isFiltered}
          onResetFilters={handleResetFilters}
        />
      )}
    </div>
  );
}
