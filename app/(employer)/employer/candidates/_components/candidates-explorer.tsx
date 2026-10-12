"use client";

import { useState, useMemo } from "react";
import toast from "react-hot-toast";
import {
  Candidate,
  CandidateExplorerFilterTab,
  CandidateSortOption,
  CandidateStatus,
  CandidateViewMode,
  CandidateStatsSummary,
} from "@/types/employer/candidates.types";
import { TOP_LEVEL_CANDIDATES } from "../dummy";
import CandidatesStatsBar from "./candidates-stats-bar";
import CandidatesFilterBar from "./candidates-filter-bar";
import CandidateCard, {
  STATUS_CONFIG,
} from "@/app/(employer)/employer/_components/candidate-card";
import CandidateExplorerTable from "./candidate-explorer-table";
import CandidateDetailDrawer from "./candidate-detail-drawer";
import { FiSearch } from "react-icons/fi";

export default function CandidatesExplorer() {
  const [candidates, setCandidates] = useState<Candidate[]>(TOP_LEVEL_CANDIDATES);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<CandidateExplorerFilterTab>("all");
  const [selectedJobId, setSelectedJobId] = useState("all");
  const [sortBy, setSortBy] = useState<CandidateSortOption>("match_desc");
  const [viewMode, setViewMode] = useState<CandidateViewMode>("cards");
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  // Stats Summary
  const stats = useMemo<CandidateStatsSummary>(() => {
    const total = candidates.length;
    const aiRecommended = candidates.filter((c) => c.matchScore >= 85).length;
    const interviewScheduled = candidates.filter(
      (c) => c.status === "interview_scheduled"
    ).length;
    const avgMatchScore = Math.round(
      candidates.reduce((sum, c) => sum + c.matchScore, 0) / (total || 1)
    );

    return {
      total,
      aiRecommended,
      interviewScheduled,
      avgMatchScore,
    };
  }, [candidates]);

  // Tab Badge Counts
  const tabCounts = useMemo<Record<CandidateExplorerFilterTab, number>>(() => {
    return {
      all: candidates.length,
      ai_recommended: candidates.filter((c) => c.matchScore >= 85).length,
      shortlisted: candidates.filter((c) => c.status === "shortlisted").length,
      interview_scheduled: candidates.filter(
        (c) => c.status === "interview_scheduled"
      ).length,
      hired: candidates.filter((c) => c.status === "hired").length,
      rejected: candidates.filter((c) => c.status === "rejected").length,
    };
  }, [candidates]);

  // Status Change Handler with Toast
  const handleStatusChange = (id: string, newStatus: CandidateStatus) => {
    const candidate = candidates.find((c) => c.id === id);
    if (!candidate) return;

    setCandidates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );

    // Keep drawer in sync if open
    setSelectedCandidate((prev) =>
      prev && prev.id === id ? { ...prev, status: newStatus } : prev
    );

    const statusLabel =
      STATUS_CONFIG[newStatus]?.label || newStatus;
    toast.success(`Updated ${candidate.name}'s status to ${statusLabel}`);
  };

  // Filter & Sort Pipeline
  const filteredCandidates = useMemo(() => {
    return candidates
      .filter((cand) => {
        // Tab Filter
        if (activeTab === "ai_recommended") {
          if (cand.matchScore < 85) return false;
        } else if (activeTab !== "all") {
          if (cand.status !== activeTab) return false;
        }

        // Job Filter
        if (selectedJobId !== "all") {
          if (cand.jobId !== selectedJobId) return false;
        }

        // Search Filter
        if (searchTerm.trim()) {
          const query = searchTerm.toLowerCase();
          const matchName = cand.name.toLowerCase().includes(query);
          const matchHeadline = cand.headline.toLowerCase().includes(query);
          const matchSkills = cand.skills.some((s) =>
            s.toLowerCase().includes(query)
          );
          const matchJob = cand.jobTitle?.toLowerCase().includes(query);
          const matchCompany = cand.currentCompany
            ?.toLowerCase()
            .includes(query);

          if (
            !matchName &&
            !matchHeadline &&
            !matchSkills &&
            !matchJob &&
            !matchCompany
          ) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "match_desc") return b.matchScore - a.matchScore;
        if (sortBy === "match_asc") return a.matchScore - b.matchScore;
        if (sortBy === "name_asc") return a.name.localeCompare(b.name);
        return 0; // default order
      });
  }, [candidates, activeTab, selectedJobId, searchTerm, sortBy]);

  return (
    <div className="space-y-4 sm:space-y-6 w-full">
      {/* KPI Stats Bar */}
      <CandidatesStatsBar
        stats={stats}
        onFilterAiRecommended={() => setActiveTab("ai_recommended")}
        onFilterInterviews={() => setActiveTab("interview_scheduled")}
      />

      {/* Filter & Search Bar */}
      <CandidatesFilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        selectedJobId={selectedJobId}
        onJobIdChange={setSelectedJobId}
        sortBy={sortBy}
        onSortChange={setSortBy}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        tabCounts={tabCounts}
      />

      {/* Candidate Listings / Empty State */}
      {filteredCandidates.length === 0 ? (
        <div className="bg-white border border-[#DFE1E7] rounded p-8 sm:p-12 text-center shadow-xs">
          <div className="size-12 sm:size-14 rounded bg-zinc-100 flex items-center justify-center mx-auto text-zinc-400 mb-3 sm:mb-4">
            <FiSearch className="size-5 sm:size-6" />
          </div>
          <h3 className="text-sm sm:text-base font-semibold text-zinc-900">
            No candidates found
          </h3>
          <p className="text-xs sm:text-sm text-zinc-500 max-w-sm mx-auto mt-1 mb-5">
            No candidate matches your active search keywords or filter criteria. Try clearing filters.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchTerm("");
              setActiveTab("all");
              setSelectedJobId("all");
            }}
            className="px-4 py-2 rounded bg-forest text-white text-xs font-semibold hover:bg-[#1b3027] transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === "cards" ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-5 w-full">
          {filteredCandidates.map((candidate) => (
            <CandidateCard
              key={candidate.id}
              candidate={candidate}
              jobSlug={candidate.jobSlug}
              onViewProfile={setSelectedCandidate}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      ) : (
        <CandidateExplorerTable
          candidates={filteredCandidates}
          onSelectCandidate={setSelectedCandidate}
          onStatusChange={handleStatusChange}
        />
      )}

      {/* Detail Slide-over Drawer */}
      <CandidateDetailDrawer
        candidate={selectedCandidate}
        isOpen={Boolean(selectedCandidate)}
        onClose={() => setSelectedCandidate(null)}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}
