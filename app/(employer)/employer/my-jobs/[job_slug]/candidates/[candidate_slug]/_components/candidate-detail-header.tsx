import { Button } from "@/components/ui/button";
import {
  LuArrowLeft,
  LuSparkles,
  LuMapPin,
  LuBriefcase,
  LuCalendar,
  LuFileText,
  LuMessageSquare,
} from "react-icons/lu";
import { Candidate, CandidateStatus } from "@/types/employer/candidates.types";
import { EmployerJob } from "@/types/employer/my-jobs.types";
import { JobFlowBreadcrumb } from "@/components/shared/job-flow-breadcrumb";
import { STATUS_CONFIG } from "../../../../../_components/candidate-card";
import { cn } from "@/lib/utils";
import { FaArrowLeft } from "react-icons/fa6";

interface CandidateDetailHeaderProps {
  candidate: Candidate;
  job: EmployerJob;
  jobSlug: string;
  onStatusChange?: (newStatus: CandidateStatus) => void;
}

export default function CandidateDetailHeader({
  candidate,
  job,
  jobSlug,
  onStatusChange,
}: CandidateDetailHeaderProps) {
  const statusInfo = STATUS_CONFIG[candidate.status];
  const StatusIcon = statusInfo.icon;

  const initials = candidate.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const getMatchTheme = (score: number) => {
    if (score >= 90) return "bg-[#EDF6F1] text-forest border-[#C2E4D2]";
    if (score >= 80) return "bg-emerald-50 text-emerald-800 border-emerald-200";
    if (score >= 70) return "bg-amber-50 text-amber-800 border-amber-200";
    return "bg-zinc-100 text-zinc-600 border-zinc-200";
  };

  return (
    <div className="space-y-4">
      {/* Breadcrumbs */}
      <JobFlowBreadcrumb
        job={{ slug: jobSlug, jobTitle: job.jobTitle }}
        candidate={candidate}
        step="candidate"
      />

      {/* Main Header Container */}
      <div className="bg-white rounded border border-zinc-200/80 p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex w-full flex-col  xl:items-center justify-between gap-4">
          {/* Candidate Profile Info */}
          <div className="flex w-full xs:flex-row flex-col items-start gap-3 sm:gap-4 min-w-0">
            {/* Avatar */}
            <div className="size-14 rounded bg-forest text-lime font-bold text-lg flex items-center justify-center shrink-0 shadow-2xs">
              {initials}
            </div>

            <div className="min-w-0 space-y-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight">
                  {candidate.name}
                </h1>
                <span
                  className={cn(
                    "inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-bold border",
                    getMatchTheme(candidate.matchScore)
                  )}
                >
                  <LuSparkles className="size-3 shrink-0" />
                  <span>{candidate.matchScore}% Match</span>
                </span>
                <span
                  className={cn(
                    "inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-semibold border",
                    statusInfo.badgeClass
                  )}
                >
                  <StatusIcon className="size-3 shrink-0" />
                  <span>{statusInfo.label}</span>
                </span>
              </div>

              <p className="text-xs sm:text-sm text-zinc-600 font-medium truncate">
                {candidate.headline}
              </p>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-500 pt-0.5">
                <span className="inline-flex items-center gap-1">
                  <LuMapPin className="size-3 text-zinc-400 shrink-0" />
                  <span>{candidate.location}</span>
                </span>
                <span className="text-zinc-300">•</span>
                <span className="inline-flex items-center gap-1">
                  <LuBriefcase className="size-3 text-zinc-400 shrink-0" />
                  <span>{candidate.experienceYears} Years Experience</span>
                </span>
                <span className="text-zinc-300">•</span>
                <span className="inline-flex items-center gap-1">
                  <LuCalendar className="size-3 text-zinc-400 shrink-0" />
                  <span>Applied {candidate.appliedAt}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions & Navigation */}
          <div className="grid w-full grid-cols-1 sm:grid-cols-3 md:grid-cols-4  gap-2 self-start xl:self-center shrink-0 pt-3 xl:pt-0 border-t xl:border-t-0 border-zinc-100">
            {/* Stage Selector */}
            {onStatusChange && (
              <div className="flex items-center justify-between gap-1 px-3 py-2 rounded bg-zinc-50 border border-zinc-200 text-xs">
                <span className="text-zinc-500 font-medium">Stage:</span>
                <select
                  value={candidate.status}
                  onChange={(e) => onStatusChange(e.target.value as CandidateStatus)}
                  className="font-bold text-forest bg-transparent border-none cursor-pointer focus:outline-none"
                >
                  <option value="under_review">Under Review</option>
                  <option value="shortlisted">Shortlisted</option>
                  <option value="hired">Hired</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            )}

            <Button
              isLink
              href={`/employer/chat?candidate=${candidate.slug}`}
              variant="outline"
              size="md"
              className="border border-[#DFE1E7] bg-white hover:bg-zinc-50 text-zinc-700 rounded text-xs font-semibold gap-1.5 shadow-2xs"
              title={`Message ${candidate.name}`}
            >
              <LuMessageSquare className="size-3.5 text-zinc-500" />
              <span>Send Message</span>
            </Button>

            {candidate.resumeUrl && (
              <Button
                isLink
                href={candidate.resumeUrl}
                target="_blank"
                rel="noreferrer"
                variant="outline"
                size="md"
                className="border border-[#DFE1E7] bg-white hover:bg-zinc-50 text-zinc-700 rounded text-xs font-semibold gap-1.5 shadow-2xs"
                title={`Resume ${candidate.name}`}
              >
                <LuFileText className="size-3.5 text-zinc-500" />
                <span>Resume</span>
              </Button>
            )}
            {/* pipeline button  */}

            <Button
              isLink
              href={candidate.resumeUrl}
              target="_blank"
              rel="noreferrer"
              variant="outline"
              size="md"
              className="border border-[#DFE1E7] bg-white hover:bg-zinc-50 text-zinc-700 rounded text-xs font-semibold gap-1.5 shadow-2xs"
              title={`Pipeline ${candidate.name}`}
            >
              <FaArrowLeft className="size-3.5 text-zinc-500" />
              <span>Pipeline</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
