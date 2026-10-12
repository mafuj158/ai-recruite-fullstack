"use client";

import { useState, useMemo } from "react";
import toast from "react-hot-toast";
import { DUMMY_FIND_JOBS } from "../dummy";
import FindJobsSearchBar from "./find-jobs-search-bar";
import FindJobsFilterSidebar from "./find-jobs-filter-sidebar";
import CandidateJobCard from "@/app/(candidate)/candidate/_components/candidate-job-card";
import FindJobsEmptyState from "./find-jobs-empty-state";
import {
  CandidateJob,
  FindJobsFilters,
  FindJobsSortOption,
  WorkType,
  EmploymentType,
  ExperienceLevel,
} from "@/types/candidate/find-jobs.types";
import CandidateJobCardSkeleton from "../../_components/candidate-job-card-skeleton";
import FindJobsErrorState from "./find-jobs-error-state";

const INITIAL_FILTERS: FindJobsFilters = {
  searchTerm: "",
  workType: "all",
  employmentType: "all",
  experienceLevel: "all",
  minMatchScore: 0,
  sortBy: "match_desc",
};

export default function FindJobsClient() {
  const [jobs, setJobs] = useState<CandidateJob[]>(DUMMY_FIND_JOBS);
  const [filters, setFilters] = useState<FindJobsFilters>(INITIAL_FILTERS);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const isLoading = false;
  const isError = false;
  // Check if any filters are actively applied
  const hasActiveFilters = useMemo(() => {
    return (
      Boolean(filters.searchTerm.trim()) ||
      filters.workType !== "all" ||
      filters.employmentType !== "all" ||
      filters.experienceLevel !== "all" ||
      filters.minMatchScore > 0
    );
  }, [filters]);

  // Filter and sort jobs based on active criteria
  const filteredJobs = useMemo(() => {
    return jobs
      .filter((job) => {
        // Search term matching
        if (filters.searchTerm.trim()) {
          const query = filters.searchTerm.toLowerCase();
          const matchesTitle = job.title.toLowerCase().includes(query);
          const matchesCompany = job.company.toLowerCase().includes(query);
          const matchesSkill = job.skills.some((s) =>
            s.toLowerCase().includes(query)
          );
          const matchesDesc = job.description.toLowerCase().includes(query);
          if (!matchesTitle && !matchesCompany && !matchesSkill && !matchesDesc) {
            return false;
          }
        }

        // Work type filter
        if (filters.workType !== "all" && job.workType !== filters.workType) {
          return false;
        }

        // Employment type filter
        if (
          filters.employmentType !== "all" &&
          job.employmentType !== filters.employmentType
        ) {
          return false;
        }

        // Experience level filter
        if (
          filters.experienceLevel !== "all" &&
          job.experienceLevel !== filters.experienceLevel
        ) {
          return false;
        }

        // Minimum match score filter
        if (
          filters.minMatchScore > 0 &&
          job.matchScore < filters.minMatchScore
        ) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === "match_desc") {
          return b.matchScore - a.matchScore;
        }
        if (filters.sortBy === "salary_desc") {
          return b.salaryMax - a.salaryMax;
        }
        // "date_desc" fallback to preserve ID order or initial list order
        return a.id.localeCompare(b.id);
      });
  }, [jobs, filters]);

  // Overview stats calculation
  const stats = useMemo(() => {
    const remote = jobs.filter((j) => j.workType === "Remote").length;
    const highMatch = jobs.filter((j) => j.matchScore >= 90).length;
    return {
      remote,
      highMatch,
    };
  }, [jobs]);

  // Handlers for individual filter controls
  const handleSearchChange = (searchTerm: string) => {
    setFilters((prev) => ({ ...prev, searchTerm }));
  };

  const handleWorkTypeChange = (workType: "all" | WorkType) => {
    setFilters((prev) => ({ ...prev, workType }));
  };

  const handleEmploymentTypeChange = (
    employmentType: "all" | EmploymentType
  ) => {
    setFilters((prev) => ({ ...prev, employmentType }));
  };

  const handleExperienceLevelChange = (
    experienceLevel: "all" | ExperienceLevel
  ) => {
    setFilters((prev) => ({ ...prev, experienceLevel }));
  };

  const handleMinMatchScoreChange = (minMatchScore: number) => {
    setFilters((prev) => ({ ...prev, minMatchScore }));
  };

  const handleSortChange = (sortBy: FindJobsSortOption) => {
    setFilters((prev) => ({ ...prev, sortBy }));
  };

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
    toast.success("Filters reset to default");
  };

  const handleToggleSaveJob = (id: string) => {
    const target = jobs.find((j) => j.id === id);
    if (!target) return;

    const nextSaved = !target.isSaved;
    if (nextSaved) {
      toast.success(`Saved ${target.title} to bookmarks!`);
    } else {
      toast.success(`Removed ${target.title} from saved jobs.`);
    }

    setJobs((prev) =>
      prev.map((job) =>
        job.id === id ? { ...job, isSaved: nextSaved } : job
      )
    );
  };

  return (
    <div className="w-full space-y-4 sm:space-y-6">
      {/* 1. Search & Filter Bar (Employer My-Jobs / Candidates Pattern) */}
      <FindJobsSearchBar
        searchTerm={filters.searchTerm}
        onSearchChange={handleSearchChange}
        workType={filters.workType}
        onWorkTypeChange={handleWorkTypeChange}
        sortBy={filters.sortBy}
        onSortChange={handleSortChange}
        totalCount={filteredJobs.length}
        onOpenMobileFilters={() => setIsMobileFilterOpen(true)}
        hasActiveFilters={hasActiveFilters}
      />

      {/* 2. Main Layout: Left Filter Sidebar + Right Job Listings */}
      <div className="flex items-start gap-5 lg:gap-6">
        {/* Left Filter Sidebar */}
        <FindJobsFilterSidebar
          filters={filters}
          onWorkTypeChange={handleWorkTypeChange}
          onEmploymentTypeChange={handleEmploymentTypeChange}
          onExperienceLevelChange={handleExperienceLevelChange}
          onMinMatchScoreChange={handleMinMatchScoreChange}
          onReset={handleResetFilters}
          hasActiveFilters={hasActiveFilters}
          isOpen={isMobileFilterOpen}
          onClose={() => setIsMobileFilterOpen(false)}
        />

        {/* Right Content Area */}
        <div className="flex-1 min-w-0 space-y-4">
          {/* Quick Metrics & Reset Bar */}
          <div className="bg-white rounded px-3.5 py-2.5 border border-zinc-200/80 shadow-2xs flex items-center justify-between gap-2.5 flex-wrap">
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <span className="font-bold text-zinc-900">
                Showing {filteredJobs.length} {filteredJobs.length === 1 ? "Role" : "Roles"}
              </span>
              <span className="text-zinc-300">•</span>
              <span className="text-zinc-500">
                {stats.remote} Remote Available
              </span>
              <span className="text-zinc-300">•</span>
              <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                {stats.highMatch} High Fit (90%+)
              </span>
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-xs text-forest hover:underline font-semibold cursor-pointer"
              >
                Reset filters
              </button>
            )}
          </div>

          {/* Jobs Feed / Grid or Empty State */}
          {
            isLoading ? (
              <div className="grid grid-cols-1 gap-3.5 sm:gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <CandidateJobCardSkeleton key={i} />
                ))}
              </div>
            ) : isError ? (
              <FindJobsErrorState />
            ) :
              filteredJobs.length === 0 ? (
                <FindJobsEmptyState onReset={handleResetFilters} />
              ) : (
                <div className="grid grid-cols-1 gap-3.5 sm:gap-4">
                  {filteredJobs.map((job) => (
                    <CandidateJobCard
                      key={job.id}
                      job={job}
                      onToggleSave={handleToggleSaveJob}
                    />
                  ))}
                </div>
              )
          }
        </div>
      </div>
    </div>
  );
}
