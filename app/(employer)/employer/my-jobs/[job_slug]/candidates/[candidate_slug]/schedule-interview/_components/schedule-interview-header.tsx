import Link from "next/link";
import { LuArrowLeft, LuCalendar } from "react-icons/lu";
import { JobFlowBreadcrumb } from "@/components/shared/job-flow-breadcrumb";

interface ScheduleInterviewHeaderProps {
  candidateName: string;
  candidateSlug: string;
  jobSlug: string;
  jobTitle: string;
}

export default function ScheduleInterviewHeader({
  candidateName,
  candidateSlug,
  jobSlug,
  jobTitle,
}: ScheduleInterviewHeaderProps) {
  return (
    <div className="space-y-4">
      {/* Breadcrumbs */}
      <JobFlowBreadcrumb
        job={{ slug: jobSlug, jobTitle }}
        candidate={{ slug: candidateSlug, name: candidateName }}
        step="interview"
      />

      {/* Back Link */}
      <div>
        <Link
          href={`/employer/my-jobs/${jobSlug}/candidates/${candidateSlug}`}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
        >
          <LuArrowLeft className="size-4" />
          <span>Back to Candidate Profile</span>
        </Link>
      </div>

      {/* Hero Banner with Calendar Icon */}
      <div className="bg-[#EAF2ED] border border-[#D5E5DA] rounded p-5 sm:p-6 flex items-center gap-4 shadow-2xs">
        <div className="size-12 sm:size-14 rounded bg-forest text-lime flex items-center justify-center shrink-0 shadow-sm">
          <LuCalendar className="size-6 sm:size-7" />
        </div>
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight">
            Schedule Interview
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 mt-0.5">
            Set up an interview with{" "}
            <span className="font-semibold text-zinc-900">{candidateName}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
