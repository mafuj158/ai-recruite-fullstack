import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  LuMail,
  LuPhone,
  LuMapPin,
  LuBriefcase,
  LuDollarSign,
  LuExternalLink,
  LuCheck,
  LuX,
  LuClock,
  LuAward,
  LuSend,
  LuMessageSquare,
} from "react-icons/lu";
import { Candidate, CandidateStatus } from "@/types/employer/candidates.types";
import { EmployerJob } from "@/types/employer/my-jobs.types";
import { cn } from "@/lib/utils";

interface CandidateDetailSidebarProps {
  candidate: Candidate;
  job: EmployerJob;
  jobSlug: string;
  onStatusChange?: (newStatus: CandidateStatus) => void;
}

const STAGE_ACTIONS: {
  status: CandidateStatus;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  className: string;
}[] = [
  {
    status: "under_review",
    label: "Move to Under Review",
    icon: LuClock,
    className: "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100",
  },
  {
    status: "shortlisted",
    label: "Move to Shortlisted",
    icon: LuCheck,
    className: "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100",
  },
  {
    status: "hired",
    label: "Mark as Hired",
    icon: LuAward,
    className: "border-[#C2E4D2] bg-[#EDF6F1] text-forest hover:bg-[#DDEFE4]",
  },
  {
    status: "rejected",
    label: "Reject Candidate",
    icon: LuX,
    className: "border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100",
  },
];

export default function CandidateDetailSidebar({
  candidate,
  job,
  jobSlug,
  onStatusChange,
}: CandidateDetailSidebarProps) {
  const isShortlisted = candidate.status === "shortlisted";

  return (
    <div className="space-y-5">
      {/* 1. Send Interview Invitation Section */}
      <div className="bg-white rounded border border-zinc-200/80 p-5 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-bold text-zinc-900">
            Interview Invitation
          </h3>
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded ${
              isShortlisted
                ? "bg-emerald-100 text-emerald-800"
                : "bg-zinc-100 text-zinc-500"
            }`}
          >
            {isShortlisted ? "Active" : "Shortlisted Only"}
          </span>
        </div>

        {isShortlisted ? (
          <div className="space-y-2">
            <p className="text-[11px] text-zinc-600 leading-relaxed">
              Candidate is <strong>Shortlisted</strong>. You can now send an interview invitation.
            </p>
            <Button
              isLink
              href={`/employer/my-jobs/${jobSlug}/candidates/${candidate.slug}/schedule-interview`}
              variant="primary"
              size="lg"
              className="w-full text-xs font-bold gap-2 rounded"
            >
              <LuSend className="size-3.5" />
              <span>Send Interview Invitation</span>
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            <Button
              type="button"
              disabled
              variant="outline"
              size="lg"
              className="w-full text-xs font-semibold gap-2 rounded border border-zinc-200 bg-zinc-100 text-zinc-400 cursor-not-allowed opacity-60"
            >
              <LuSend className="size-3.5" />
              <span>Send Invitation (Shortlisted Only)</span>
            </Button>
            <p className="text-[11px] text-zinc-400 text-center leading-relaxed">
              Shortlist this candidate below to activate interview invitation.
            </p>
          </div>
        )}
      </div>

      {/* 2. Candidate Recruitment Stages (4 Options: Under Review, Shortlisted, Hired, Rejected) */}
      <div className="bg-white rounded border border-zinc-200/80 p-5 shadow-2xs space-y-3">
        <h3 className="text-xs sm:text-sm font-bold text-zinc-900">
          Recruitment Stages
        </h3>
        <p className="text-xs text-zinc-500">
          Move {candidate.name} across the 4 stages:
        </p>

        <div className="space-y-2 pt-1">
          {STAGE_ACTIONS.filter((act) => act.status !== candidate.status).map(
            (action) => {
              const Icon = action.icon;
              return (
                <Button
                  key={action.status}
                  type="button"
                  variant="outline"
                  size="md"
                  onClick={() => onStatusChange?.(action.status)}
                  className={cn(
                    "w-full text-xs font-semibold gap-2 rounded justify-center border",
                    action.className
                  )}
                >
                  <Icon className="size-3.5" />
                  <span>{action.label}</span>
                </Button>
              );
            }
          )}
        </div>
      </div>

      {/* 2. Candidate Contact Card */}
      <div className="bg-white rounded border border-zinc-200/80 p-5 shadow-2xs space-y-3">
        <h3 className="text-xs sm:text-sm font-bold text-zinc-900">
          Contact Details
        </h3>

        <div className="space-y-2.5 text-xs text-zinc-600">
          <div className="flex items-center gap-2">
            <LuMail className="size-3.5 text-zinc-400 shrink-0" />
            <a
              href={`mailto:${candidate.email}`}
              className="text-forest hover:underline truncate font-medium"
            >
              {candidate.email}
            </a>
          </div>

          {candidate.phone && (
            <div className="flex items-center gap-2">
              <LuPhone className="size-3.5 text-zinc-400 shrink-0" />
              <span className="text-zinc-700">{candidate.phone}</span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <LuMapPin className="size-3.5 text-zinc-400 shrink-0" />
            <span>{candidate.location}</span>
          </div>

          <div className="pt-2 border-t border-zinc-100">
            <Button
              isLink
              href={`/employer/chat?candidate=${candidate.slug}`}
              variant="outline"
              size="md"
              className="w-full text-xs font-semibold gap-2 rounded text-forest bg-[#EDF6F1] hover:bg-[#DDEFE4] border-[#C2E4D2]"
            >
              <LuMessageSquare className="size-3.5" />
              <span>Send In-App Message</span>
            </Button>
          </div>
        </div>
      </div>

      {/* 3. Job Context Card */}
      <div className="bg-white rounded border border-zinc-200/80 p-5 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-bold text-zinc-900">
            Target Job Opening
          </h3>
          <Link
            href={`/employer/my-jobs/${jobSlug}`}
            className="text-xs text-forest hover:underline inline-flex items-center gap-1 font-semibold"
          >
            <span>Details</span>
            <LuExternalLink className="size-3" />
          </Link>
        </div>

        <div className="space-y-2 text-xs">
          <p className="font-bold text-zinc-900">{job.jobTitle}</p>
          <div className="space-y-1.5 text-zinc-500">
            <div className="flex items-center gap-1.5">
              <LuBriefcase className="size-3 text-zinc-400" />
              <span>
                {job.department} • {job.employmentType}
              </span>
            </div>
            {job.salaryRange && (
              <div className="flex items-center gap-1.5">
                <LuDollarSign className="size-3 text-zinc-400" />
                <span>{job.salaryRange}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
