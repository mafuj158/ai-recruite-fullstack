import Link from "next/link";
import { LuArrowLeft, LuSparkles, LuBriefcase } from "react-icons/lu";
import { FiUsers } from "react-icons/fi";
import { EmployerJob } from "@/types/employer/my-jobs.types";
import { JobFlowBreadcrumb } from "@/components/shared/job-flow-breadcrumb";

interface CandidateHeaderProps {
  job: EmployerJob;
  totalApplicants: number;
  topAiMatchesCount: number;
}

export default function CandidateHeader({
  job,
  totalApplicants,
  topAiMatchesCount,
}: CandidateHeaderProps) {
  return (
    <div className="space-y-4">
      {/* Breadcrumbs */}
      <JobFlowBreadcrumb job={job} step="candidates" />

      {/* Main Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight flex items-center gap-2 sm:gap-2.5">
              <FiUsers className="size-6 sm:size-7 text-[#244034] shrink-0" />
              <span>Candidate Pipeline</span>
            </h1>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-[#EDF6F1] text-forest border border-[#D5E6DC] text-xs font-semibold">
              <LuSparkles className="size-3" />
              <span>{topAiMatchesCount} Top Matches (90%+)</span>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-zinc-500">
            <span className="font-semibold text-zinc-800">{job.jobTitle}</span>
            <span className="text-zinc-300">•</span>
            <span>{job.department}</span>
            <span className="text-zinc-300">•</span>
            <span>{job.location}</span>
            <span className="text-zinc-300">•</span>
            <span className="inline-flex items-center gap-1 text-zinc-600">
              <LuBriefcase className="size-3 text-zinc-400" />
              {job.experienceLevel}
            </span>
            <span className="text-zinc-300">•</span>
            <span className="font-medium text-zinc-700">
              {totalApplicants} total applicants
            </span>
          </div>
        </div>

        {/* Back Link to Job Details */}
        <Link
          href={`/employer/my-jobs/${job.slug}`}
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded border border-zinc-200/80 bg-white hover:bg-zinc-50 text-zinc-700 transition-colors shadow-2xs self-start sm:self-auto shrink-0"
        >
          <LuArrowLeft className="size-3.5 text-zinc-500" />
          <span>Job Details</span>
        </Link>
      </div>
    </div>
  );
}
