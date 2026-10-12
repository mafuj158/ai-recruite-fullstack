"use client";

import Link from "next/link";
import {
  FiCalendar,
  FiClock,
  FiVideo,
  FiExternalLink,
  FiMessageSquare,
  FiCheckCircle,
  FiXCircle,
  FiInfo,
  FiChevronDown,
} from "react-icons/fi";
import type { CandidateInterviewItem } from "@/types/candidate/interviews.types";

interface CandidateInterviewCardProps {
  interview: CandidateInterviewItem;
  onAddToCalendar: (interview: CandidateInterviewItem) => void;
}

export function CandidateInterviewCard({
  interview,
  onAddToCalendar,
}: CandidateInterviewCardProps) {
  const isUpcoming = interview.status === "upcoming";
  const isCompleted = interview.status === "completed";
  const isCancelled = interview.status === "cancelled";

  return (
    <div className="group relative bg-white hover:bg-zinc-50/50 rounded p-4 sm:p-5 border border-zinc-200/80 shadow-xs hover:shadow-md hover:border-zinc-300 transition-all duration-200 flex flex-col justify-between gap-4">
      {/* 1. Header Row */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 sm:gap-3">
          {/* Avatar, Title, Company */}
          <div className="flex items-start gap-3 min-w-0 flex-1">
            <div className="size-10 sm:size-11 rounded-xl bg-forest text-lime font-bold text-xs sm:text-sm flex items-center justify-center shrink-0 shadow-2xs border border-[#244034]/15">
              {interview.companyInitial}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <Link
                  href={`/candidate/find-jobs/${interview.jobSlug}`}
                  className="text-base sm:text-lg font-bold text-zinc-900 hover:text-forest transition-colors line-clamp-1 cursor-pointer"
                >
                  {interview.jobTitle}
                </Link>
                {interview.isTomorrow && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                    Happening Tomorrow
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-zinc-500 mt-0.5 flex-wrap">
                <span className="font-semibold text-zinc-700">{interview.company}</span>
                <span>•</span>
                <span>{interview.department}</span>
              </div>
            </div>
          </div>

          {/* Right Status Badge & Round Tag */}
          <div className="flex items-center gap-2 shrink-0">
            {isUpcoming && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold bg-[#EDF6F1] text-forest border border-[#C2E4D2]">
                <span className="size-1.5 rounded-full bg-forest animate-pulse" />
                Scheduled
              </span>
            )}
            {isCompleted && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold bg-zinc-100 text-zinc-700 border border-zinc-200">
                <FiCheckCircle className="size-3 text-emerald-600" />
                Completed
              </span>
            )}
            {isCancelled && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                <FiXCircle className="size-3 text-rose-600" />
                Cancelled
              </span>
            )}
          </div>
        </div>

        {/* Round Name Pill */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-50 border border-zinc-200/80 text-xs font-semibold text-zinc-800">
          <FiVideo className="size-3.5 text-forest" />
          <span>{interview.roundName}</span>
        </div>

        {/* Schedule & Platform Details Meta */}
        <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1.5 text-xs text-zinc-600 pt-0.5">
          <span className="inline-flex items-center gap-1.5 font-semibold text-zinc-900">
            <FiCalendar className="size-3.5 text-forest" />
            <span>{interview.date}</span>
          </span>
          <span className="text-zinc-300">•</span>
          <span className="inline-flex items-center gap-1.5 font-medium">
            <FiClock className="size-3.5 text-zinc-400" />
            <span>{interview.time} ({interview.duration})</span>
          </span>
          <span className="text-zinc-300">•</span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-200">
            <span>
              {interview.platform === "google_meet"
                ? "Google Meet"
                : interview.platform === "zoom"
                ? "Zoom Meeting"
                : "Virtual Video"}
            </span>
          </span>
        </div>

        {/* Optional Collapsible Meeting Instructions / Note */}
        {interview.notes && (
          <details className="group/note rounded border border-zinc-200/70 bg-zinc-50/60 overflow-hidden text-xs">
            <summary className="px-3 py-2 flex items-center justify-between cursor-pointer font-medium text-zinc-700 hover:text-forest select-none transition-colors">
              <span className="flex items-center gap-1.5 text-[11px] font-semibold">
                <FiInfo className="size-3.5 text-forest shrink-0" />
                <span>Instructions from Employer</span>
              </span>
              <FiChevronDown className="size-3.5 text-zinc-400 transition-transform duration-200 group-open/note:rotate-180 shrink-0" />
            </summary>
            <div className="px-3 py-2 text-zinc-600 text-[11px] leading-relaxed border-t border-zinc-200/50 bg-white">
              {interview.notes}
            </div>
          </details>
        )}

        {/* Feedback / Outcome (if completed) */}
        {isCompleted && interview.feedbackSummary && (
          <div className="p-3 rounded bg-blue-50/60 border border-blue-200/70 text-xs space-y-1">
            <span className="text-[11px] font-bold text-blue-800 uppercase tracking-wider flex items-center gap-1">
              <FiCheckCircle className="size-3" />
              Interview Update
            </span>
            <p className="text-zinc-600 text-[11px] leading-relaxed">
              {interview.feedbackSummary}
            </p>
          </div>
        )}
      </div>

      {/* Card Action Footer */}
      <div className="pt-3.5 border-t border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Left Actions: Add to Calendar & Message Employer */}
        <div className="flex items-center gap-2 flex-wrap">
          {isUpcoming && (
            <button
              type="button"
              onClick={() => onAddToCalendar(interview)}
              className="px-3 py-1.5 rounded border border-zinc-200 bg-white text-zinc-700 hover:text-zinc-900 hover:bg-zinc-50 text-xs font-semibold transition-colors shadow-2xs inline-flex items-center gap-1.5 cursor-pointer"
            >
              <FiCalendar className="size-3.5 text-forest" />
              <span>Add to Calendar</span>
            </button>
          )}

          <Link
            href="/candidate/chat"
            className="px-3 py-1.5 rounded border border-zinc-200 bg-white text-zinc-700 hover:text-zinc-900 hover:bg-zinc-50 text-xs font-semibold transition-colors shadow-2xs inline-flex items-center gap-1.5 cursor-pointer"
          >
            <FiMessageSquare className="size-3.5 text-zinc-400" />
            <span>Message Employer</span>
          </Link>
        </div>

        {/* Right Action: Join Meeting / View Details */}
        <div>
          {isUpcoming && interview.meetingLink ? (
            <a
              href={interview.meetingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-2 rounded bg-forest text-white hover:bg-[#1b3027] text-xs sm:text-sm font-semibold transition-colors shadow-2xs inline-flex items-center justify-center gap-2 cursor-pointer group/link"
            >
              <FiVideo className="size-4 text-lime" />
              <span>Join Meeting</span>
              <FiExternalLink className="size-3.5 transition-transform group-hover/link:translate-x-0.5" />
            </a>
          ) : (
            <Link
              href={`/candidate/find-jobs/${interview.jobSlug}`}
              className="w-full sm:w-auto px-4 py-1.5 rounded border border-[#DFE1E7] bg-white text-zinc-700 hover:text-zinc-900 hover:bg-zinc-50 text-xs font-semibold transition-colors shadow-2xs inline-flex items-center justify-center gap-1.5"
            >
              <span>View Job Details</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
