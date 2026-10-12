import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  LuSparkles,
  LuMapPin,
  LuBriefcase,
  LuCalendar,
  LuArrowRight,
  LuCheck,
  LuX,
  LuClock,
  LuAward,
  LuMic,
} from "react-icons/lu";
import { Candidate, CandidateStatus } from "@/types/employer/candidates.types";
import { cn } from "@/lib/utils";

interface CandidateCardProps {
  candidate: Candidate;
  jobSlug?: string;
  onStatusChange?: (candidateId: string, newStatus: CandidateStatus) => void;
  onViewProfile?: (candidate: Candidate) => void;
}

export const STATUS_CONFIG: Record<
  CandidateStatus,
  { label: string; badgeClass: string; icon: React.ComponentType<{ className?: string }> }
> = {
  under_review: {
    label: "Under Review",
    badgeClass: "bg-amber-50 text-amber-700 border-amber-200/90",
    icon: LuClock,
  },
  shortlisted: {
    label: "Shortlisted",
    badgeClass: "bg-blue-50 text-blue-700 border-blue-200/90",
    icon: LuCheck,
  },
  interview_scheduled: {
    label: "Interview Scheduled",
    badgeClass: "bg-purple-50 text-purple-700 border-purple-200/90",
    icon: LuCalendar,
  },
  hired: {
    label: "Hired",
    badgeClass: "bg-[#EDF6F1] text-forest border-[#C2E4D2]",
    icon: LuAward,
  },
  rejected: {
    label: "Rejected",
    badgeClass: "bg-rose-50 text-rose-700 border-rose-200/90",
    icon: LuX,
  },
};

export const STATUS_OPTIONS: { value: CandidateStatus; label: string; color: string }[] = [
  { value: "under_review", label: "Under Review", color: "bg-amber-50 text-amber-700 border-amber-200" },
  { value: "shortlisted", label: "Shortlisted", color: "bg-blue-50 text-blue-700 border-blue-200" },
  { value: "interview_scheduled", label: "Interview Scheduled", color: "bg-purple-50 text-purple-700 border-purple-200" },
  { value: "hired", label: "Hired", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  { value: "rejected", label: "Archived / Rejected", color: "bg-zinc-100 text-zinc-600 border-zinc-200" },
];

export default function CandidateCard({
  candidate,
  jobSlug,
  onStatusChange,
  onViewProfile,
}: CandidateCardProps) {
  const targetJobSlug = jobSlug || candidate.jobSlug || "senior-full-stack-developer";
  const statusInfo = STATUS_CONFIG[candidate.status] || STATUS_CONFIG.under_review;
  const StatusIcon = statusInfo.icon;

  // AI Match Pill Color Configuration
  const getMatchScoreBadge = (score: number) => {
    if (score >= 90) {
      return {
        bg: "bg-[#EDF6F1] text-forest border-[#C2E4D2]",
        bar: "bg-forest",
      };
    }
    if (score >= 80) {
      return {
        bg: "bg-emerald-50 text-emerald-800 border-emerald-200",
        bar: "bg-emerald-600",
      };
    }
    if (score >= 70) {
      return {
        bg: "bg-amber-50 text-amber-800 border-amber-200",
        bar: "bg-amber-500",
      };
    }
    return {
      bg: "bg-zinc-100 text-zinc-600 border-zinc-200",
      bar: "bg-zinc-400",
    };
  };

  const matchTheme = getMatchScoreBadge(candidate.matchScore);

  // Avatar initials
  const initials = candidate.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const profileUrl = `/employer/my-jobs/${targetJobSlug}/candidates/${candidate.slug}`;

  return (
    <div className="bg-white rounded border border-zinc-200/80 shadow-2xs hover:shadow-sm hover:border-zinc-300 transition-all p-3.5 sm:p-5 flex flex-col justify-between gap-3.5 sm:gap-4 overflow-hidden">
      {/* Top Details & Header */}
      <div className="space-y-3 sm:space-y-4">
        {/* Candidate Info + Match Score Pill */}
        <div className="flex items-start justify-between gap-2.5 sm:gap-3">
          <div className="flex items-start gap-2.5 sm:gap-3 min-w-0">
            {/* Initials Avatar */}
            <div className="size-10 sm:size-11 rounded bg-forest text-lime font-bold text-xs sm:text-sm flex items-center justify-center shrink-0 shadow-2xs">
              {initials}
            </div>

            <div className="min-w-0">
              {onViewProfile ? (
                <button
                  type="button"
                  onClick={() => onViewProfile(candidate)}
                  className="font-semibold text-sm sm:text-base text-zinc-900 hover:text-forest transition-colors truncate block text-left cursor-pointer"
                >
                  {candidate.name}
                </button>
              ) : (
                <Link
                  href={profileUrl}
                  className="font-semibold text-sm sm:text-base text-zinc-900 hover:text-forest transition-colors truncate block group"
                >
                  {candidate.name}
                </Link>
              )}
              <p className="text-xs text-zinc-500 truncate">{candidate.headline}</p>
              {candidate.currentCompany && (
                <p className="text-[11px] text-zinc-400 truncate">
                  Current: {candidate.currentCompany}
                </p>
              )}
              {candidate.jobTitle && (
                <span className="inline-block text-[11px] font-medium text-forest bg-[#EDF6F1] border border-[#D5E6DC] px-2 py-0.5 rounded mt-1 truncate max-w-full">
                  Applied for: {candidate.jobTitle}
                </span>
              )}
            </div>
          </div>

          {/* AI Match Badge */}
          <div
            className={cn(
              "shrink-0 inline-flex flex-col items-end px-2 py-1 sm:px-2.5 sm:py-1.5 rounded border text-right",
              matchTheme.bg
            )}
          >
            <div className="flex items-center gap-1 text-xs font-bold">
              <LuSparkles className="size-3 shrink-0" />
              <span>{candidate.matchScore}%</span>
            </div>
            <span className="text-[10px] uppercase tracking-wider font-semibold opacity-80">
              AI Match
            </span>
          </div>
        </div>

        {/* Metadata Chips: Location, Experience, Applied */}
        <div className="flex flex-wrap items-center gap-y-1 gap-x-2 sm:gap-x-3 text-xs text-zinc-500">
          <span className="inline-flex items-center gap-1">
            <LuMapPin className="size-3 text-zinc-400 shrink-0" />
            <span className="truncate max-w-[130px] sm:max-w-[160px]">{candidate.location}</span>
          </span>
          <span className="text-zinc-300">•</span>
          <span className="inline-flex items-center gap-1">
            <LuBriefcase className="size-3 text-zinc-400 shrink-0" />
            <span>{candidate.experienceYears}y exp</span>
          </span>
          <span className="text-zinc-300">•</span>
          <span className="inline-flex items-center gap-1 text-[11px]">
            <LuCalendar className="size-3 text-zinc-400 shrink-0" />
            <span>Applied {candidate.appliedAt}</span>
          </span>
        </div>

        {/* AI Insight Summary */}
        <div className="p-2.5 sm:p-3 rounded bg-[#F9FAF8] border border-zinc-200/70 text-xs text-zinc-600 space-y-1">
          <div className="flex items-center gap-1 font-semibold text-[11px] text-zinc-800">
            <LuSparkles className="size-3 text-forest shrink-0" />
            <span>AI Fit Assessment</span>
          </div>
          <p className="leading-relaxed line-clamp-2 text-zinc-600">
            &ldquo;{candidate.aiSummary}&rdquo;
          </p>
        </div>

        {/* AI Practice Interview Performance Strip */}
        {candidate.aiInterviewResult?.completed ? (
          <div className="p-2.5 rounded bg-[#EDF6F1]/70 border border-[#D5E6DC] flex items-start sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-start sm:items-center gap-2 min-w-0 flex-1">
              <div className="size-6 rounded bg-forest text-lime flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                <LuMic className="size-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-1 sm:gap-1.5">
                  <span className="font-bold text-forest text-xs whitespace-nowrap">
                    AI Interview: {candidate.aiInterviewResult.overallScore}%
                  </span>
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800 shrink-0">
                    {candidate.aiInterviewResult.recommendation}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[10px] text-zinc-500 mt-0.5">
                  <span>Confidence: <b className="text-blue-600 font-bold">{candidate.aiInterviewResult.confidenceScore}%</b></span>
                  <span>•</span>
                  <span>Comm: <b className="text-emerald-600 font-bold">{candidate.aiInterviewResult.communicationScore}%</b></span>
                  <span>•</span>
                  <span>EQ: <b className="text-purple-600 font-bold">{candidate.aiInterviewResult.emotionalIntelligenceScore}%</b></span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="px-3 py-2 rounded bg-zinc-50 border border-zinc-200/60 flex items-center justify-between text-[11px] text-zinc-400">
            <span className="inline-flex items-center gap-1.5">
              <LuMic className="size-3 text-zinc-400" />
              <span>AI Practice Interview:</span>
            </span>
            <span className="text-zinc-400 italic font-medium">Not taken yet</span>
          </div>
        )}

        {/* Skills Comparison: Matching vs Missing */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-medium text-zinc-500">
            <span>Key Skills Matched</span>
            <span>
              {candidate.matchingSkills.length} of{" "}
              {candidate.matchingSkills.length + candidate.missingSkills.length}
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {candidate.matchingSkills.slice(0, 4).map((skill) => (
              <span
                key={skill}
                className="px-2 py-0.5 rounded bg-[#EDF6F1] text-forest font-medium text-[11px] border border-[#D5E6DC]"
              >
                {skill}
              </span>
            ))}
            {candidate.matchingSkills.length > 4 && (
              <span className="px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-600 text-[11px]">
                +{candidate.matchingSkills.length - 4}
              </span>
            )}
            {candidate.missingSkills.slice(0, 2).map((skill) => (
              <span
                key={skill}
                className="px-2 py-0.5 rounded bg-zinc-100 text-zinc-400 text-[11px] border border-zinc-200/60 line-through"
                title={`Missing skill: ${skill}`}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer / Status Management & Navigation */}
      <div className="pt-3 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-2.5 mt-auto">
        {/* Status Dropdown / Badge */}
        <div className="flex items-center justify-between gap-1.5 min-w-0 w-full">
          <span
            className={cn(
              "inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-semibold border shrink-0",
              statusInfo.badgeClass
            )}
          >
            <StatusIcon className="size-3 shrink-0" />
            <span>{statusInfo.label}</span>
          </span>

          {/* Quick Stage Update Selector */}
          {onStatusChange && (
            <select
              value={candidate.status}
              onChange={(e) =>
                onStatusChange(candidate.id, e.target.value as CandidateStatus)
              }
              className="text-[11px] font-medium text-zinc-500 bg-transparent hover:text-zinc-900 border-none focus:outline-none cursor-pointer p-0 shrink-0 max-w-[130px] truncate"
              title="Change Candidate Stage"
            >
              <option value="under_review">Stage: Under Review</option>
              <option value="shortlisted">Stage: Shortlisted</option>
              <option value="interview_scheduled">Stage: Interview Scheduled</option>
              <option value="hired">Stage: Hired</option>
              <option value="rejected">Stage: Rejected</option>
            </select>
          )}
        </div>

        {/* Primary Action Button */}
        {onViewProfile ? (
          <Button
            type="button"
            onClick={() => onViewProfile(candidate)}
            variant="primary"
            size="sm"
            className="text-xs font-semibold gap-1 rounded px-2.5 sm:px-3 py-1.5 shadow-2xs cursor-pointer shrink-0 ml-auto sm:ml-0"
          >
            <span>Profile</span>
            <LuArrowRight className="size-3" />
          </Button>
        ) : (
          <Button
            isLink
            href={profileUrl}
            variant="primary"
            size="sm"
            className="text-xs font-semibold gap-1 rounded px-2.5 sm:px-3 py-1.5 shadow-2xs shrink-0 ml-auto sm:ml-0"
          >
            <span>Profile</span>
            <LuArrowRight className="size-3" />
          </Button>
        )}
      </div>
    </div>
  );
}
