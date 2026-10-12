import Link from "next/link";
import {
  LuVideo,
  LuExternalLink,
  LuSparkles,
  LuUser,
  LuArrowLeft,
} from "react-icons/lu";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";
import type { InterviewItem, InterviewStatus } from "@/types/employer/interviews.types";

interface InterviewDetailHeaderProps {
  interview: InterviewItem;
}

const STATUS_CONFIG: Record<
  InterviewStatus,
  { label: string; badgeClass: string; dotClass: string }
> = {
  scheduled: {
    label: "Scheduled",
    badgeClass: "bg-blue-50 text-blue-700 border-blue-200",
    dotClass: "bg-blue-500",
  },
  completed: {
    label: "Completed",
    badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
    dotClass: "bg-emerald-500",
  },
  rescheduled: {
    label: "Rescheduled",
    badgeClass: "bg-amber-50 text-amber-700 border-amber-200",
    dotClass: "bg-amber-500",
  },
  cancelled: {
    label: "Cancelled",
    badgeClass: "bg-zinc-100 text-zinc-600 border-zinc-200",
    dotClass: "bg-zinc-400",
  },
};

export default function InterviewDetailHeader({
  interview,
}: InterviewDetailHeaderProps) {
  const statusCfg = STATUS_CONFIG[interview.status];
  const initials = interview.candidateName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const isActionable =
    interview.status === "scheduled" || interview.status === "rescheduled";

  const breadcrumbItems = [
    { label: "Dashboard", href: "/employer/dashboard" },
    { label: "Interviews", href: "/employer/interviews" },
    {
      label: `${interview.candidateName} • ${interview.jobTitle}`,
      maxWidth: "max-w-[120px] 2xs:max-w-[170px] sm:max-w-xs md:max-w-md",
    },
  ];

  return (
    <div className="space-y-4">
      {/* 1. Breadcrumbs */}
      <Breadcrumb items={breadcrumbItems} />

      {/* 2. Header Card */}
      <div className="bg-white rounded border border-zinc-200/80 p-4 sm:p-6 shadow-2xs space-y-4">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          {/* Candidate Profile Info */}
          <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-3.5 min-w-0">
            <div className="size-12 sm:size-14 rounded-full bg-forest text-lime font-bold text-base sm:text-lg flex items-center justify-center shrink-0 shadow-2xs">
              {initials}
            </div>

            <div className="min-w-0 space-y-1">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2.5">
                <h1 className="text-lg sm:text-xl font-bold text-zinc-900 tracking-tight">
                  {interview.candidateName}
                </h1>

                {/* Status Badge */}
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold border",
                    statusCfg.badgeClass
                  )}
                >
                  <span className={cn("size-1.5 rounded-full", statusCfg.dotClass)} />
                  {statusCfg.label}
                </span>

                {/* AI Match */}
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-[#EDF6F1] text-forest border border-[#D5E6DC]">
                  <LuSparkles className="size-3" />
                  <span>{interview.matchScore}% Match</span>
                </span>
              </div>

              <p className="text-xs sm:text-sm text-zinc-600 font-medium">
                {interview.candidateHeadline}
              </p>

              <p className="text-xs text-zinc-400">
                Target Role:{" "}
                <span className="font-semibold text-zinc-700">
                  {interview.jobTitle}
                </span>{" "}
                • {interview.jobDepartment}
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full xl:w-auto shrink-0 pt-3 xl:pt-0 border-t xl:border-t-0 border-zinc-100">
            <Link
              href={`/employer/my-jobs/${interview.jobSlug}/candidates/${interview.candidateSlug}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded border border-zinc-200/80 bg-white hover:bg-zinc-50 text-zinc-700 transition-colors shadow-2xs text-center whitespace-nowrap"
            >
              <LuUser className="size-3.5 text-zinc-500 shrink-0" />
              <span>Candidate Profile</span>
            </Link>

            {isActionable && interview.meetingLink && (
              <a
                href={interview.meetingLink}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded bg-forest text-lime text-xs font-bold hover:bg-forest/90 transition-all shadow-xs text-center whitespace-nowrap"
              >
                <LuVideo className="size-4 shrink-0" />
                <span>Join Call</span>
                <LuExternalLink className="size-3 opacity-70 shrink-0" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
