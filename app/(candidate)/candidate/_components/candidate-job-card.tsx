"use client";

import Link from "next/link";
import {
  FiMapPin,
  FiBriefcase,
  FiDollarSign,
  FiBookmark,
  FiClock,
  FiArrowRight,
  FiCheckCircle,
  FiAlertTriangle,
  FiCalendar,
} from "react-icons/fi";
import { LuSparkles } from "react-icons/lu";
import type { CandidateJob } from "@/types/candidate/find-jobs.types";

interface CandidateJobCardProps {
  job: CandidateJob;
  onToggleSave?: (id: string) => void;
  candidateTargetSalary?: number;
  showApplyButton?: boolean;
}

export default function CandidateJobCard({
  job,
  onToggleSave,
  candidateTargetSalary,
  showApplyButton = true,
}: CandidateJobCardProps) {
  const isExpired = job.status === "expired" || (job.daysRemaining !== undefined && job.daysRemaining <= 0);
  const isClosingSoon = job.daysRemaining !== undefined && job.daysRemaining <= 5 && job.daysRemaining > 0;

  const salaryDiff =
    candidateTargetSalary !== undefined && job.salaryMin !== undefined
      ? (job.salaryAvg || (job.salaryMin + job.salaryMax) / 2) - candidateTargetSalary
      : null;

  const getMatchScoreTheme = (score: number) => {
    if (score >= 90) return "bg-[#EDF6F1] text-forest border-[#C2E4D2]";
    if (score >= 80) return "bg-emerald-50 text-emerald-800 border-emerald-200";
    return "bg-zinc-100 text-zinc-700 border-zinc-200";
  };

  return (
    <div className="group relative bg-white hover:bg-zinc-50/50 rounded p-4 sm:p-5 border border-zinc-200/80 shadow-xs hover:shadow-md hover:border-zinc-300 transition-all duration-200 flex flex-col justify-between gap-3 sm:gap-4">
      {/* Top Header Row */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 sm:gap-3">
          {/* Avatar & Title & Company */}
          <div className="flex sm:flex-row flex-col items-start gap-3 min-w-0 flex-1">
            <div className="size-10 sm:size-11 rounded-xl bg-forest text-lime font-bold text-xs sm:text-sm flex items-center justify-center shrink-0 shadow-2xs border border-forest/15">
              {job.companyInitial}
            </div>

            <div className="min-w-0 flex-1 pr-10 sm:pr-0">
              <Link
                href={`/candidate/find-jobs/${job.slug}`}
                className="text-base sm:text-lg font-bold text-zinc-900 hover:text-forest transition-colors line-clamp-2 block leading-snug cursor-pointer"
              >
                {job.title}
              </Link>
              <div className="flex items-center gap-1.5 text-xs text-zinc-500 mt-0.5 flex-wrap">
                <span className="font-semibold text-zinc-700">{job.company}</span>
                <span>•</span>
                <span>{job.department}</span>
                {job.savedAt && (
                  <>
                    <span>•</span>
                    <span className="text-zinc-400">{job.savedAt}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right/Top Actions: Status Badge, AI Match & Bookmark Button */}
          <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0 w-full sm:w-auto">
            {/* Active vs Expired Status Badge */}
            {isExpired ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-zinc-100 text-zinc-500 border border-zinc-200/80 shadow-2xs">
                <span className="size-1.5 rounded-full bg-zinc-400" />
                Expired
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/70 shadow-2xs">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Active
              </span>
            )}

            {/* AI Match Score */}
            <div
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border shadow-2xs ${getMatchScoreTheme(
                job.matchScore
              )}`}
            >
              <LuSparkles className="size-3 shrink-0" />
              <span>{job.matchScore}% Match</span>
            </div>

            {/* Bookmark Action - Absolute top-right on small devices, static on sm+ */}
            {onToggleSave && (
              <button
                type="button"
                onClick={() => onToggleSave(job.id)}
                className={`absolute top-3.5 right-3.5 sm:static size-8 rounded-lg border flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                  job.isSaved
                    ? "bg-[#EDF6F1] text-forest border-[#C2E4D2] hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 shadow-2xs"
                    : "bg-white text-zinc-400 border-zinc-200/80 hover:text-zinc-700 hover:border-zinc-300"
                }`}
                title={job.isSaved ? "Remove from saved" : "Save this job"}
                aria-label={job.isSaved ? `Remove ${job.title} from saved` : `Save ${job.title}`}
              >
                <FiBookmark className={`size-3.5 ${job.isSaved ? "fill-current" : ""}`} />
              </button>
            )}
          </div>
        </div>

        {/* Primary Meta Grid - Clean Uniform Grid View */}
        <div className="grid grid-cols-1 2xs:grid-cols-2 md:grid-cols-4 gap-2 text-xs text-zinc-600">
          {/* 1. Location */}
          <div className="flex w-full items-center gap-1.5 px-2.5 py-1.5 rounded bg-zinc-50 border border-zinc-200/70 text-zinc-600 min-w-0">
            <FiMapPin className="size-3.5 text-zinc-400 shrink-0" />
            <span className="truncate font-medium">{job.location}</span>
          </div>

          {/* 2. Work Type */}
          <div
            className={`flex w-full items-center gap-1.5 px-2.5 py-1.5 rounded font-semibold border min-w-0 ${
              job.workType === "Remote"
                ? "bg-[#EDF6F1] text-forest border-[#C2E4D2]"
                : job.workType === "Hybrid"
                ? "bg-purple-50 text-purple-700 border-purple-200"
                : "bg-zinc-100 text-zinc-700 border-zinc-200"
            }`}
          >
            <span
              className={`size-1.5 rounded-full shrink-0 ${
                job.workType === "Remote"
                  ? "bg-emerald-500"
                  : job.workType === "Hybrid"
                  ? "bg-purple-500"
                  : "bg-zinc-400"
              }`}
            />
            <span className="truncate">{job.workType}</span>
          </div>

          {/* 3. Experience */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-zinc-50 border border-zinc-200/70 text-zinc-600 min-w-0">
            <FiBriefcase className="size-3.5 text-zinc-400 shrink-0" />
            <span className="truncate font-medium">{job.experienceLevel}</span>
          </div>

          {/* 4. Salary */}
          <div className="flex items-center justify-between gap-1.5 px-2.5 py-1.5 rounded bg-[#EDF6F1]/90 border border-[#C2E4D2] font-bold text-forest min-w-0">
            <div className="flex items-center gap-1 min-w-0 truncate">
              <FiDollarSign className="size-3.5 shrink-0" />
              <span className="truncate">{job.salaryRange}</span>
            </div>
            {salaryDiff !== null && (
              <span
                className={`text-[9px] font-bold px-1 py-0.2 rounded border shrink-0 ${
                  salaryDiff >= 0
                    ? "text-emerald-800 bg-emerald-100/80 border-emerald-200"
                    : "text-zinc-600 bg-white border-zinc-200"
                }`}
              >
                {salaryDiff >= 0
                  ? `+${Math.round(salaryDiff / 1000)}k`
                  : `-${Math.round(Math.abs(salaryDiff) / 1000)}k`}
              </span>
            )}
          </div>

          {/* 5. Application Deadline (if present) */}
          {job.applicationDeadline && (
            <div
              className={`col-span-full flex items-center gap-1.5 px-2.5 py-1.5 rounded border text-[11px] font-medium min-w-0 ${
                isExpired
                  ? "bg-rose-50 text-rose-700 border-rose-200"
                  : isClosingSoon
                  ? "bg-amber-50 text-amber-800 border-amber-200 font-semibold"
                  : "bg-zinc-50 text-zinc-600 border-zinc-200/70"
              }`}
            >
              {isClosingSoon ? (
                <FiAlertTriangle className="size-3 text-amber-600 shrink-0" />
              ) : (
                <FiCalendar className="size-3 text-zinc-400 shrink-0" />
              )}
              <span className="truncate">
                {isClosingSoon
                  ? `Closing in ${job.daysRemaining} days (${job.applicationDeadline})`
                  : `Deadline: ${job.applicationDeadline}`}
              </span>
            </div>
          )}
        </div>

        {/* Description Excerpt */}
        <p className="text-xs sm:text-sm text-zinc-600 line-clamp-2 leading-relaxed">
          {job.description}
        </p>

        {/* Required Skills Chips */}
        <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
          {job.skills.map((skill) => (
            <span
              key={skill}
              className="px-2 py-0.5 rounded text-[11px] font-medium bg-zinc-50 text-zinc-600 border border-zinc-200/70"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="pt-3.5 border-t border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
        <span className="inline-flex items-center gap-1 text-xs text-zinc-400">
          <FiClock className="size-3.5 shrink-0" />
          <span>{job.savedAt || `Posted ${job.postedAt}`}</span>
        </span>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Link
            href={`/candidate/find-jobs/${job.slug}`}
            className="w-full sm:w-auto justify-center px-3.5 py-1.5 rounded border border-[#DFE1E7] bg-white text-zinc-700 hover:text-zinc-900 hover:bg-zinc-50 text-xs font-semibold transition-colors shadow-2xs inline-flex items-center gap-1.5 cursor-pointer"
          >
            <span>View Details</span>
          </Link>

          {showApplyButton && (
            job.hasApplied ? (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-zinc-100 text-zinc-500 border border-zinc-200 text-xs font-semibold select-none">
                <FiCheckCircle className="size-3.5 text-emerald-600" />
                Applied
              </span>
            ) : (
              <Link
                href={`/candidate/find-jobs/${job.slug}?apply=true`}
                className="w-full sm:w-auto justify-center px-4 py-1.5 text-xs font-semibold text-white bg-forest hover:bg-[#1b3027] rounded transition-colors shadow-2xs inline-flex items-center gap-1.5 cursor-pointer group/apply"
              >
                <span>Apply Now</span>
                <FiArrowRight className="size-3.5 transition-transform group-hover/apply:translate-x-0.5" />
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
}
