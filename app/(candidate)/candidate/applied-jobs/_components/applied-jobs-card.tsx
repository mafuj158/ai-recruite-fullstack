"use client";

import Link from "next/link";
import {
  FiMapPin,
  FiBriefcase,
  FiDollarSign,
  FiClock,
  FiArrowRight,
  FiFileText,
  FiTrash2,
} from "react-icons/fi";
import { LuSparkles } from "react-icons/lu";
import { AppliedJobsTimeline } from "./applied-jobs-timeline";
import type { CandidateApplication } from "@/types/candidate/applied-jobs.types";

interface AppliedJobsCardProps {
  application: CandidateApplication;
  onViewCoverLetter: (app: CandidateApplication) => void;
  onWithdraw: (app: CandidateApplication) => void;
}

export function AppliedJobsCard({
  application,
  onViewCoverLetter,
  onWithdraw,
}: AppliedJobsCardProps) {
  const getOverallStatusBadge = () => {
    switch (application.overallStatus) {
      case "hired":
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            Offer Extended
          </span>
        );
      case "interview":
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#EDF6F1] text-forest border border-[#C2E4D2]">
            Interviewing
          </span>
        );
      case "shortlisted":
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
            Shortlisted
          </span>
        );
      case "rejected":
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-zinc-100 text-zinc-600 border border-zinc-200">
            Archived
          </span>
        );
      case "review":
      default:
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
            Under Review
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-xl p-4 sm:p-5 border border-zinc-200/80 shadow-xs hover:border-zinc-300 transition-all space-y-4">
      {/* 1. Card Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-100">
        <div className="flex items-start gap-3 min-w-0">
          <div className="size-11 rounded-xl bg-forest text-lime font-bold text-sm flex items-center justify-center shrink-0 shadow-2xs border border-[#244034]/15">
            {application.companyInitial}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <Link
                href={`/candidate/find-jobs/${application.jobSlug}`}
                className="font-bold text-base sm:text-lg text-zinc-900 hover:text-forest transition-colors truncate"
              >
                {application.jobTitle}
              </Link>
            </div>
            <p className="text-xs font-semibold text-zinc-600 mt-0.5">
              {application.company}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
          {/* Match Score Badge */}
          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-[#EDF6F1] text-forest border border-[#C2E4D2]">
            <LuSparkles className="size-3" />
            <span>{application.matchScore}% Match</span>
          </div>

          {/* Status Badge */}
          {getOverallStatusBadge()}
        </div>
      </div>

      {/* 2. Meta Pills Row */}
      <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1.5 text-xs text-zinc-500">
        <span className="inline-flex items-center gap-1">
          <FiMapPin className="size-3.5 text-zinc-400" />
          <span>{application.location}</span>
        </span>
        <span className="text-zinc-300">•</span>
        <span className="inline-flex items-center gap-1">
          <FiBriefcase className="size-3.5 text-zinc-400" />
          <span>{application.workType}</span>
        </span>
        <span className="text-zinc-300">•</span>
        <span className="inline-flex items-center gap-1 font-bold text-forest">
          <FiDollarSign className="size-3.5" />
          <span>{application.salaryRange}</span>
        </span>
        <span className="text-zinc-300">•</span>
        <span className="inline-flex items-center gap-1 text-zinc-400">
          <FiClock className="size-3.5" />
          <span>Applied on {application.appliedAt}</span>
        </span>
      </div>

      {/* 3. Status Notice Banner (if any) */}
      {application.statusNotice && (
        <div className="p-3 rounded-lg bg-zinc-50/80 border border-zinc-200/70 text-xs text-zinc-700 flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2 min-w-0">
            <span className="size-2 rounded-full bg-forest animate-pulse shrink-0" />
            <span className="font-medium truncate">{application.statusNotice}</span>
          </div>
        </div>
      )}

      {/* 4. 5-Stage Interactive Timeline Visualizer */}
      <div className="pt-2">
        <AppliedJobsTimeline
          stages={application.stages}
          applicationId={application.id}
        />
      </div>

      {/* 5. Footer Actions */}
      <div className="pt-3 border-t border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onViewCoverLetter(application)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-zinc-700 hover:text-zinc-900 bg-white hover:bg-zinc-50 border border-zinc-200/80 rounded transition-colors cursor-pointer"
          >
            <FiFileText className="size-3.5 text-zinc-400" />
            <span>View Documents</span>
          </button>

          {application.overallStatus !== "rejected" &&
            application.overallStatus !== "hired" && (
              <button
                type="button"
                onClick={() => onWithdraw(application)}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold border border-zinc-200/80 text-zinc-500 hover:text-rose-600 transition-colors cursor-pointer"
              >
                <FiTrash2 className="size-3" />
                <span>Withdraw</span>
              </button>
            )}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/candidate/find-jobs/${application.jobSlug}`}
            className="w-full sm:w-auto justify-center px-3.5 py-1.5 text-xs font-semibold text-white bg-forest hover:bg-[#1b3027] rounded-lg transition-colors shadow-2xs inline-flex items-center gap-1.5 cursor-pointer"
          >
            <span>View Job Details</span>
            <FiArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AppliedJobsCard;
