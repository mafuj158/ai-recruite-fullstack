"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { FiBriefcase, FiArrowRight } from "react-icons/fi";
import toast from "react-hot-toast";
import { DUMMY_APPLICATIONS } from "./dummy";
import { AppliedJobsTabs } from "./applied-jobs-tabs";
import { AppliedJobsCard } from "./applied-jobs-card";
import { AppliedJobsCoverLetterModal } from "./applied-jobs-cover-letter-modal";
import { AppliedJobsWithdrawModal } from "./applied-jobs-withdraw-modal";
import type {
  CandidateApplication,
  ApplicationFilterTab,
} from "@/types/candidate/applied-jobs.types";

export function AppliedJobsClient() {
  const [applications, setApplications] =
    useState<CandidateApplication[]>(DUMMY_APPLICATIONS);
  const [activeTab, setActiveTab] = useState<ApplicationFilterTab>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"latest" | "highest_match">("latest");

  // Modal states
  const [previewApp, setPreviewApp] = useState<CandidateApplication | null>(null);
  const [withdrawApp, setWithdrawApp] = useState<CandidateApplication | null>(null);

  // Tab counts
  const tabCounts = useMemo(() => {
    return {
      all: applications.length,
      review: applications.filter((a) => a.overallStatus === "review").length,
      shortlisted: applications.filter((a) => a.overallStatus === "shortlisted")
        .length,
      interview: applications.filter((a) => a.overallStatus === "interview")
        .length,
      hired: applications.filter((a) => a.overallStatus === "hired").length,
      rejected: applications.filter((a) => a.overallStatus === "rejected").length,
    };
  }, [applications]);

  // Filtered and sorted applications
  const filteredApplications = useMemo(() => {
    return applications
      .filter((app) => {
        // Tab filter
        if (activeTab !== "all" && app.overallStatus !== activeTab) {
          return false;
        }

        // Search query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = app.jobTitle.toLowerCase().includes(q);
          const matchCompany = app.company.toLowerCase().includes(q);
          if (!matchTitle && !matchCompany) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "highest_match") {
          return b.matchScore - a.matchScore;
        }
        return 0; // maintain latest default order
      });
  }, [applications, activeTab, searchQuery, sortBy]);

  const handleWithdrawConfirm = (appId: string) => {
    setApplications((prev) =>
      prev.map((a) =>
        a.id === appId
          ? {
              ...a,
              overallStatus: "rejected" as const,
              statusNotice: "Application withdrawn by candidate.",
              stages: a.stages.map((s) =>
                s.status === "in_progress" ? { ...s, status: "rejected" as const } : s
              ),
            }
          : a
      )
    );
    toast.success("Application successfully withdrawn.");
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Filter Tabs & Search Bar */}
      <AppliedJobsTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        tabCounts={tabCounts}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
        totalFilteredCount={filteredApplications.length}
      />

      {/* Applications List or Empty State */}
      {filteredApplications.length === 0 ? (
        <div className="bg-white rounded-xl p-8 sm:p-12 text-center border border-zinc-200/80 space-y-4">
          <div className="size-14 rounded-full bg-zinc-100 text-zinc-400 flex items-center justify-center mx-auto">
            <FiBriefcase className="size-7" />
          </div>
          <div className="space-y-1.5 max-w-sm mx-auto">
            <h4 className="text-base font-bold text-zinc-900">
              No applications found
            </h4>
            <p className="text-xs text-zinc-500 leading-relaxed">
              {searchQuery.trim()
                ? `No applications matching "${searchQuery}". Try clearing your search.`
                : "You don't have any applications in this status yet."}
            </p>
          </div>

          <div className="pt-2">
            {searchQuery.trim() ? (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="px-4 py-2 text-xs font-semibold text-zinc-700 bg-zinc-100 hover:bg-zinc-200 rounded-lg transition-colors cursor-pointer"
              >
                Clear Search
              </button>
            ) : (
              <Link
                href="/candidate/find-jobs"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-forest hover:bg-[#1b3027] rounded-lg transition-colors shadow-2xs cursor-pointer"
              >
                <span>Browse Active Jobs</span>
                <FiArrowRight className="size-3.5" />
              </Link>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:gap-5">
          {filteredApplications.map((application) => (
            <AppliedJobsCard
              key={application.id}
              application={application}
              onViewCoverLetter={(app) => setPreviewApp(app)}
              onWithdraw={(app) => setWithdrawApp(app)}
            />
          ))}
        </div>
      )}

      {/* Cover Letter Modal */}
      <AppliedJobsCoverLetterModal
        application={previewApp}
        isOpen={Boolean(previewApp)}
        onClose={() => setPreviewApp(null)}
      />

      {/* Withdraw Modal */}
      <AppliedJobsWithdrawModal
        application={withdrawApp}
        isOpen={Boolean(withdrawApp)}
        onClose={() => setWithdrawApp(null)}
        onConfirmWithdraw={handleWithdrawConfirm}
      />
    </div>
  );
}

export default AppliedJobsClient;
