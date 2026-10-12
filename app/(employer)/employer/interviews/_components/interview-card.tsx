"use client";

import Link from "next/link";
import {
  LuCalendar,
  LuVideo,
  LuExternalLink,
  LuSparkles,
  LuArrowRight,
  LuCircleCheck,
} from "react-icons/lu";
import { cn } from "@/lib/utils";
import type { InterviewItem, InterviewStatus } from "@/types/employer/interviews.types";

interface InterviewCardProps {
  interview: InterviewItem;
}

const STATUS_CONFIG: Record<
  InterviewStatus,
  { label: string; badgeClass: string; dotClass: string }
> = {
  scheduled: {
    label: "Scheduled",
    badgeClass: "bg-blue-50 text-blue-700 border-blue-200/80",
    dotClass: "bg-blue-500",
  },
  completed: {
    label: "Completed",
    badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
    dotClass: "bg-emerald-500",
  },
  rescheduled: {
    label: "Rescheduled",
    badgeClass: "bg-amber-50 text-amber-700 border-amber-200/80",
    dotClass: "bg-amber-500",
  },
  cancelled: {
    label: "Cancelled",
    badgeClass: "bg-zinc-100 text-zinc-600 border-zinc-200",
    dotClass: "bg-zinc-400",
  },
};

export default function InterviewCard({ interview }: InterviewCardProps) {
  const statusCfg = STATUS_CONFIG[interview.status];
  const initials = interview.candidateName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const isActionable =
    interview.status === "scheduled" || interview.status === "rescheduled";

  const handleAddToCalendar = () => {
    const title = encodeURIComponent(
      `Interview: ${interview.candidateName} - ${interview.jobTitle}`
    );
    const details = encodeURIComponent(
      `Candidate: ${interview.candidateName}\nRole: ${interview.jobTitle}\nMeeting Link: ${
        interview.meetingLink || "TBA"
      }\nNotes: ${interview.notes || "None"}`
    );
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}`;
    window.open(googleCalendarUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="bg-white rounded border border-zinc-200/80 p-3.5 sm:p-5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between gap-3.5 sm:gap-4">
      {/* Top Bar: Status & Platform on Left, Match Score on Right */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold border",
              statusCfg.badgeClass
            )}
          >
            <span className={cn("size-1.5 rounded-full", statusCfg.dotClass)} />
            {statusCfg.label}
          </span>

          <span className="inline-flex items-center gap-1 text-xs font-medium text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded">
            <LuVideo className="size-3 text-zinc-400" />
            <span className="capitalize">{interview.platform.replace("_", " ")}</span>
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-semibold bg-[#EDF6F1] text-forest border border-[#D5E6DC]">
            <LuSparkles className="size-3" />
            <span>{interview.matchScore}% Match</span>
          </span>

          {interview.overallRating && (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-forest bg-[#EDF6F1] border border-[#D5E6DC] px-2 py-0.5 rounded">
              <LuCircleCheck className="size-3 text-forest" />
              <span>Score: {interview.overallRating}%</span>
            </span>
          )}
        </div>
      </div>

      {/* Main Candidate & Job Info */}
      <div className="flex items-start gap-3 sm:gap-3.5">
        <div className="size-10 sm:size-11 rounded bg-forest text-lime font-bold text-xs sm:text-sm flex items-center justify-center shrink-0 shadow-2xs">
          {initials}
        </div>

        <div className="min-w-0 flex-1">
          <Link
            href={`/employer/interviews/${interview.slug}`}
            className="font-bold text-sm sm:text-base text-zinc-900 hover:text-forest transition-colors truncate block"
          >
            {interview.candidateName}
          </Link>

          <p className="text-xs text-zinc-500 truncate mt-0.5">
            Role: <span className="font-medium text-zinc-700">{interview.jobTitle}</span>
          </p>

          <p className="text-xs text-zinc-400 truncate mt-0.5">
            {interview.candidateHeadline}
          </p>
        </div>
      </div>

      {/* Schedule Details */}
      <div className="pt-3 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-1.5 sm:gap-2 text-xs text-zinc-600">
        <div className="flex flex-wrap items-center gap-1.5">
          <LuCalendar className="size-3.5 text-zinc-400 shrink-0" />
          <span className="font-semibold text-zinc-800">{interview.date}</span>
          <span className="text-zinc-300">•</span>
          <span>{interview.time}</span>
          <span className="text-zinc-400">({interview.duration})</span>
        </div>
        {interview.timezone && (
          <span className="text-zinc-400 text-[11px] shrink-0">{interview.timezone}</span>
        )}
      </div>

      {/* Footer Actions */}
      <div className="pt-3 border-t border-zinc-100 flex flex-col xs:flex-row items-stretch xs:items-center justify-between gap-2.5 sm:gap-3">
        <Link
          href={`/employer/interviews/${interview.slug}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-600 hover:text-forest transition-colors py-0.5"
        >
          <span>View Assessment & Details</span>
          <LuArrowRight className="size-3.5" />
        </Link>

        <div className="flex items-center gap-2">
          {isActionable && (
            <button
              type="button"
              onClick={handleAddToCalendar}
              className="inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded border border-zinc-200 bg-white text-zinc-700 hover:text-zinc-900 hover:bg-zinc-50 text-xs font-semibold transition-colors shadow-2xs cursor-pointer"
              title="Add to Google Calendar"
            >
              <LuCalendar className="size-3.5 text-forest" />
              <span>Add to Calendar</span>
            </button>
          )}

          {isActionable && interview.meetingLink ? (
            <a
              href={interview.meetingLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded bg-forest text-lime text-xs font-semibold hover:bg-forest/90 transition-all shadow-2xs text-center"
            >
              <LuVideo className="size-3.5" />
              <span>Join Meeting</span>
              <LuExternalLink className="size-3 opacity-70" />
            </a>
          ) : (
            <Link
              href={`/employer/interviews/${interview.slug}`}
              className="inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded border border-zinc-200 text-xs font-medium text-zinc-600 hover:bg-zinc-50 transition-colors text-center"
            >
              <span>Review Scorecard</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
