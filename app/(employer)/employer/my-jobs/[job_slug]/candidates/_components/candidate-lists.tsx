"use client";

import { useState, useMemo } from "react";
import toast from "react-hot-toast";
import { EmployerJob } from "@/types/employer/my-jobs.types";
import {
  Candidate,
  CandidateFilterTab,
  CandidateSortOption,
  CandidateStatus,
  CandidateViewMode,
} from "@/types/employer/candidates.types";
import { DUMMY_CANDIDATES } from "../dummy";
import CandidateHeader from "./candidate-header";
import CandidateFilterBar from "./candidate-filter-bar";
import CandidateCard, { STATUS_CONFIG } from "../../../../_components/candidate-card";
import CandidateTable from "./candidate-table";
import EmptyCandidatesState from "./empty-candidates-state";

interface JobCandidateListsProps {
  job: EmployerJob;
  jobSlug: string;
}

export default function JobCandidateLists({
  job,
  jobSlug,
}: JobCandidateListsProps) {
  const [candidates, setCandidates] = useState<Candidate[]>(DUMMY_CANDIDATES);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<CandidateFilterTab>("all");
  const [sortBy, setSortBy] = useState<CandidateSortOption>("match_desc");
  const [viewMode, setViewMode] = useState<CandidateViewMode>("cards");

  // Dynamic counts for tab badges
  const counts = useMemo<Record<CandidateFilterTab, number>>(() => {
    return {
      all: candidates.length,
      under_review: candidates.filter((c) => c.status === "under_review").length,
      shortlisted: candidates.filter((c) => c.status === "shortlisted").length,
      interview_scheduled: candidates.filter((c) => c.status === "interview_scheduled").length,
      hired: candidates.filter((c) => c.status === "hired").length,
      rejected: candidates.filter((c) => c.status === "rejected").length,
    };
  }, [candidates]);

  // Count of candidates matching >= 90%
  const topAiMatchesCount = useMemo(() => {
    return candidates.filter((c) => c.matchScore >= 90).length;
  }, [candidates]);

  // Status Change Handler with Toast
  const handleStatusChange = (
    candidateId: string,
    newStatus: CandidateStatus
  ) => {
    const candidate = candidates.find((c) => c.id === candidateId);
    if (!candidate) return;

    setCandidates((prev) =>
      prev.map((c) => (c.id === candidateId ? { ...c, status: newStatus } : c))
    );

    const statusLabel = STATUS_CONFIG[newStatus].label;
    toast.success(`Updated ${candidate.name}'s status to ${statusLabel}`);
  };

  // Reset all filters
  const handleReset = () => {
    setSearchTerm("");
    setActiveTab("all");
    setSortBy("match_desc");
  };

  // Filter & Sort Pipeline
  const filteredCandidates = useMemo(() => {
    return candidates
      .filter((candidate) => {
        // Tab Stage Filter
        if (activeTab !== "all" && candidate.status !== activeTab) {
          return false;
        }

        // Search Keyword Filter
        if (searchTerm.trim()) {
          const query = searchTerm.toLowerCase();
          const matchesName = candidate.name.toLowerCase().includes(query);
          const matchesHeadline = candidate.headline
            .toLowerCase()
            .includes(query);
          const matchesEmail = candidate.email.toLowerCase().includes(query);
          const matchesSkill =
            candidate.skills.some((s) => s.toLowerCase().includes(query)) ||
            candidate.matchingSkills.some((s) =>
              s.toLowerCase().includes(query)
            );
          const matchesCompany = candidate.currentCompany
            ?.toLowerCase()
            .includes(query);

          if (
            !matchesName &&
            !matchesHeadline &&
            !matchesEmail &&
            !matchesSkill &&
            !matchesCompany
          ) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "match_desc":
            return b.matchScore - a.matchScore;
          case "match_asc":
            return a.matchScore - b.matchScore;
          case "name_asc":
            return a.name.localeCompare(b.name);
          case "date_desc":
          default:
            return 0;
        }
      });
  }, [candidates, activeTab, searchTerm, sortBy]);

  const hasActiveFilters = searchTerm.trim().length > 0 || activeTab !== "all";

  return (
    <div className="w-full space-y-6">
      {/* 1. Header with Breadcrumbs, Job Summary & Match Stats */}
      <CandidateHeader
        job={job}
        totalApplicants={candidates.length}
        topAiMatchesCount={topAiMatchesCount}
      />

      {/* 2. Filter Bar: Search, Stage Tabs, Sort, & Grid/Table Toggle */}
      <CandidateFilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        sortBy={sortBy}
        onSortChange={setSortBy}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        counts={counts}
      />

      {/* 3. Candidate Results or Empty State */}
      {filteredCandidates.length === 0 ? (
        <EmptyCandidatesState
          onReset={handleReset}
          hasFilters={hasActiveFilters}
        />
      ) : viewMode === "cards" ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-5 w-full">
          {filteredCandidates.map((candidate) => (
            <CandidateCard
              key={candidate.id}
              candidate={candidate}
              jobSlug={jobSlug}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      ) : (
        <CandidateTable
          candidates={filteredCandidates}
          jobSlug={jobSlug}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
}