import Link from "next/link";
import {
  LuMail,
  LuPhone,
  LuMapPin,
  LuFileText,
  LuCheck,
  LuX,
  LuArrowUpRight,
} from "react-icons/lu";
import type { InterviewItem } from "@/types/employer/interviews.types";

interface InterviewDetailSidebarProps {
  interview: InterviewItem;
}

export default function InterviewDetailSidebar({
  interview,
}: InterviewDetailSidebarProps) {
  return (
    <div className="space-y-4 sm:space-y-5">
      {/* 1. Final Decision Actions */}
      <div className="bg-white rounded border border-zinc-200/80 p-4 sm:p-5 lg:p-4 shadow-2xs space-y-3 sm:space-y-3.5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
          Stage Actions
        </h4>

        <div className="space-y-2">
          <button
            type="button"
            className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-2.5 sm:px-3 rounded bg-forest text-lime text-xs font-bold hover:bg-forest/90 transition-all shadow-2xs cursor-pointer whitespace-nowrap"
          >
            <LuCheck className="size-3.5 shrink-0" />
            <span className="truncate">Advance Candidate / Offer</span>
          </button>

          <button
            type="button"
            className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-2.5 sm:px-3 rounded border border-red-200 bg-white hover:bg-red-50 text-red-600 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap"
          >
            <LuX className="size-3.5 shrink-0" />
            <span>Reject Candidate</span>
          </button>
        </div>
      </div>

      {/* 2. Candidate Contact Snapshot */}
      <div className="bg-white rounded border border-zinc-200/80 p-4 sm:p-5 lg:p-4 shadow-2xs space-y-3.5 sm:space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
          Candidate Contact
        </h4>

        <div className="space-y-2.5 text-xs">
          <div className="flex items-center gap-2.5 text-zinc-600">
            <LuMail className="size-4 text-zinc-400 shrink-0" />
            <a
              href={`mailto:${interview.candidateEmail}`}
              className="hover:text-forest transition-colors truncate"
            >
              {interview.candidateEmail}
            </a>
          </div>

          {interview.candidatePhone && (
            <div className="flex items-center gap-2.5 text-zinc-600">
              <LuPhone className="size-4 text-zinc-400 shrink-0" />
              <a
                href={`tel:${interview.candidatePhone}`}
                className="hover:text-forest transition-colors"
              >
                {interview.candidatePhone}
              </a>
            </div>
          )}

          <div className="flex items-center gap-2.5 text-zinc-600">
            <LuMapPin className="size-4 text-zinc-400 shrink-0" />
            <span className="truncate">{interview.candidateLocation}</span>
          </div>
        </div>

        <div className="pt-3 border-t border-zinc-100 flex items-center gap-2">
          <Link
            href={`/employer/my-jobs/${interview.jobSlug}/candidates/${interview.candidateSlug}`}
            className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 text-xs font-medium transition-colors"
          >
            <LuFileText className="size-3.5 text-zinc-500 shrink-0" />
            <span>View Full Resume & Profile</span>
          </Link>
        </div>
      </div>

      {/* 3. Associated Job Opening */}
      <div className="bg-white rounded border border-zinc-200/80 p-4 sm:p-5 lg:p-4 shadow-2xs space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
          Associated Job Opening
        </h4>

        <div className="space-y-1">
          <Link
            href={`/employer/my-jobs/${interview.jobSlug}`}
            className="font-bold text-xs sm:text-sm text-zinc-900 hover:text-forest transition-colors flex items-start justify-between gap-1 group"
          >
            <span className="leading-snug">{interview.jobTitle}</span>
            <LuArrowUpRight className="size-3.5 text-zinc-400 group-hover:text-forest transition-colors shrink-0 mt-0.5" />
          </Link>
          <p className="text-xs text-zinc-500">{interview.jobDepartment}</p>
        </div>

        <div className="pt-2">
          <Link
            href={`/employer/my-jobs/${interview.jobSlug}/candidates`}
            className="text-xs font-semibold text-forest hover:underline"
          >
            View Candidate Pipeline →
          </Link>
        </div>
      </div>
    </div>
  );
}
