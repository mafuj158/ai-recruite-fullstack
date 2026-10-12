"use client";

import { useState, useMemo } from "react";
import toast from "react-hot-toast";
import { SavedJobsFilterBar } from "./saved-jobs-filter-bar";
import { SavedJobsSalaryComparison } from "./saved-jobs-salary-comparison";
import CandidateJobCard from "@/app/(candidate)/candidate/_components/candidate-job-card";
import { SavedJobsEmptyState } from "./saved-jobs-empty-state";
import { ClearSavedJobsModal } from "./clear-saved-jobs-modal";
import { CANDIDATE_TARGET_SALARY, DUMMY_SAVED_JOBS } from "../dummy";
import { SalaryComparisonSummary, SavedJobFilterTab, SavedJobItem, SavedJobsSortOption } from "@/types/candidate/saved-jobs.types";

export default function SavedJobsClient() {
  const [jobs, setJobs] = useState<SavedJobItem[]>(DUMMY_SAVED_JOBS);
  const [activeTab, setActiveTab] = useState<SavedJobFilterTab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SavedJobsSortOption>("saved_desc");
  const [showSalaryComparison, setShowSalaryComparison] = useState(true);
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);

  // Tab counts based on all currently saved jobs
  const tabCounts = useMemo<Record<SavedJobFilterTab, number>>(() => {
    return {
      all: jobs.length,
      remote: jobs.filter((j) => j.workType === "Remote").length,
      hybrid: jobs.filter((j) => j.workType === "Hybrid").length,
      onsite: jobs.filter((j) => j.workType === "On-site").length,
      high_match: jobs.filter((j) => j.matchScore >= 90).length,
    };
  }, [jobs]);

  // Filter and sort jobs
  const filteredJobs = useMemo(() => {
    return jobs
      .filter((job) => {
        // Tab filter
        if (activeTab === "remote" && job.workType !== "Remote") return false;
        if (activeTab === "hybrid" && job.workType !== "Hybrid") return false;
        if (activeTab === "onsite" && job.workType !== "On-site") return false;
        if (activeTab === "high_match" && job.matchScore < 90) return false;

        // Query search
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = job.title.toLowerCase().includes(q);
          const matchCompany = job.company.toLowerCase().includes(q);
          const matchDepartment = job.department.toLowerCase().includes(q);
          const matchSkills = job.skills.some((s) => s.toLowerCase().includes(q));
          if (!matchTitle && !matchCompany && !matchDepartment && !matchSkills) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "match_desc") return b.matchScore - a.matchScore;
        if (sortBy === "salary_desc") return b.salaryMax - a.salaryMax;
        if (sortBy === "deadline_asc") {
          return (a.daysRemaining ?? Infinity) - (b.daysRemaining ?? Infinity);
        }
        // Default "saved_desc": preserve original seed order
        return 0;
      });
  }, [jobs, activeTab, searchQuery, sortBy]);

  // Salary comparison summary statistics
  const salarySummary = useMemo<SalaryComparisonSummary>(() => {
    if (jobs.length === 0) {
      return {
        candidateTargetSalary: CANDIDATE_TARGET_SALARY,
        avgSavedSalary: CANDIDATE_TARGET_SALARY,
        minSavedSalary: 0,
        maxSavedSalary: 0,
        aboveTargetCount: 0,
        atTargetCount: 0,
        belowTargetCount: 0,
      };
    }

    const avg =
      jobs.reduce(
        (acc, curr) =>
          acc + (curr.salaryAvg ?? (curr.salaryMin + curr.salaryMax) / 2),
        0
      ) / jobs.length;
    const min = Math.min(...jobs.map((j) => j.salaryMin));
    const max = Math.max(...jobs.map((j) => j.salaryMax));
    const above = jobs.filter(
      (j) =>
        (j.salaryAvg ?? (j.salaryMin + j.salaryMax) / 2) >
        CANDIDATE_TARGET_SALARY + 5000
    ).length;
    const below = jobs.filter(
      (j) =>
        (j.salaryAvg ?? (j.salaryMin + j.salaryMax) / 2) <
        CANDIDATE_TARGET_SALARY - 5000
    ).length;
    const at = jobs.length - above - below;

    return {
      candidateTargetSalary: CANDIDATE_TARGET_SALARY,
      avgSavedSalary: avg,
      minSavedSalary: min,
      maxSavedSalary: max,
      aboveTargetCount: above,
      atTargetCount: at,
      belowTargetCount: below,
    };
  }, [jobs]);

  // Handlers
  const handleRemoveJob = (id: string) => {
    const jobToRemove = jobs.find((j) => j.id === id);
    setJobs((prev) => prev.filter((j) => j.id !== id));
    toast.success(
      jobToRemove
        ? `Removed "${jobToRemove.title}" from saved jobs.`
        : "Job removed from bookmarks."
    );
  };

  const handleClearAll = () => {
    setJobs([]);
    toast.success("All saved jobs cleared.");
  };

  const handleResetFilters = () => {
    setActiveTab("all");
    setSearchQuery("");
    setSortBy("saved_desc");
  };

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* 1. Filter & Search Bar */}
      <SavedJobsFilterBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        tabCounts={tabCounts}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
        totalFilteredCount={filteredJobs.length}
        showSalaryComparison={showSalaryComparison}
        onToggleSalaryComparison={() => setShowSalaryComparison((prev) => !prev)}
        onOpenClearAllModal={() => setIsClearModalOpen(true)}
        hasSavedJobs={jobs.length > 0}
      />

      {/* 2. Salary Benchmark Comparison Visualizer (Collapsible) */}
      {showSalaryComparison && jobs.length > 0 && (
        <SavedJobsSalaryComparison
          summary={salarySummary}
          onClose={() => setShowSalaryComparison(false)}
        />
      )}

      {/* 3. Jobs Cards Feed or Empty State */}
      {filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 sm:gap-4">
          {filteredJobs.map((job) => (
            <CandidateJobCard
              key={job.id}
              job={job}
              candidateTargetSalary={CANDIDATE_TARGET_SALARY}
              onToggleSave={handleRemoveJob}
              showApplyButton={true}
            />
          ))}
        </div>
      ) : (
        <SavedJobsEmptyState
          isFiltered={jobs.length > 0 && (activeTab !== "all" || searchQuery !== "")}
          onResetFilters={handleResetFilters}
        />
      )}

      {/* 4. Clear All Confirmation Modal */}
      <ClearSavedJobsModal
        isOpen={isClearModalOpen}
        onClose={() => setIsClearModalOpen(false)}
        onConfirm={handleClearAll}
        count={jobs.length}
      />
    </div>
  );
}
