import Link from "next/link";
import { LuSparkles, LuClock, LuUsers, LuBriefcase } from "react-icons/lu";
import { FiChevronRight } from "react-icons/fi";
import { cn } from "@/lib/utils";
import { EmployerJob } from "@/types/employer/my-jobs.types";

interface JobCardProps {
  job: EmployerJob;
  className?: string;
}

export default function JobCard({ job, className }: JobCardProps) {
  const isDraft = job.status === "draft";
  const isClosed = job.status === "closed";
  const isActive = job.status === "active";

  const visibleSkills = (job.skills || []).slice(0, 3);
  const extraSkillsCount = (job.skills || []).length - visibleSkills.length;

  return (
    <div
      className={cn(
        "w-full bg-white rounded p-4 sm:p-5 lg:p-6 border border-zinc-200/80 hover:border-zinc-300 hover:shadow-xs transition-all flex flex-col justify-between gap-3.5 sm:gap-4",
        className
      )}
    >
      {/* Top Section */}
      <div className="space-y-2.5 sm:space-y-3">
        {/* Title and Status Badge */}
        <div className="flex items-start justify-between gap-2.5 sm:gap-3">
          <Link
            href={`/employer/my-jobs/${job.slug}`}
            className="text-sm sm:text-base lg:text-lg font-semibold text-zinc-900 hover:text-forest transition-colors line-clamp-1"
          >
            {job.jobTitle}
          </Link>

          <span
            className={cn(
              "shrink-0 inline-flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs font-medium px-2 sm:px-2.5 py-0.5 rounded border",
              isActive && "bg-emerald-50 text-emerald-700 border-emerald-200/80",
              isDraft && "bg-amber-50 text-amber-700 border-amber-200/80",
              isClosed && "bg-zinc-100 text-zinc-600 border-zinc-200"
            )}
          >
            <span
              className={cn(
                "size-1.5 rounded-full",
                isActive && "bg-emerald-500 animate-pulse",
                isDraft && "bg-amber-500",
                isClosed && "bg-zinc-400"
              )}
            />
            <span className="capitalize">{job.status}</span>
          </span>
        </div>

        {/* Primary Meta row: Department, Location, Type, Experience, Salary */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] sm:text-xs text-zinc-500 leading-normal">
          <span className="font-medium text-zinc-800">{job.department}</span>
          <span className="text-zinc-300">•</span>
          <span>{job.location}</span>
          <span className="text-zinc-300">•</span>
          <span>{job.employmentType}</span>
          <span className="text-zinc-300">•</span>
          <span className="inline-flex items-center gap-1 text-zinc-600">
            <LuBriefcase className="size-3 text-zinc-400" />
            {job.experienceLevel}
          </span>
          <span className="text-zinc-300">•</span>
          <span className="font-semibold text-forest">{job.salaryRange}</span>
        </div>

        {/* Skills Tag Pills */}
        {visibleSkills.length > 0 && (
          <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 pt-0.5">
            {visibleSkills.map((skill) => (
              <span
                key={skill}
                className="px-1.5 sm:px-2 py-0.5 rounded bg-zinc-100/90 text-zinc-700 text-[10px] sm:text-[11px] font-medium border border-zinc-200/60"
              >
                {skill}
              </span>
            ))}
            {extraSkillsCount > 0 && (
              <span className="px-1 sm:px-1.5 py-0.5 rounded text-zinc-400 text-[10px] sm:text-[11px] font-medium">
                +{extraSkillsCount} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* Metrics Funnel Strip */}
      <div className="flex flex-col sm:grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-zinc-200/60 rounded bg-zinc-50/80 border border-zinc-100">
        <div className="flex items-center justify-between sm:flex-col sm:justify-center p-2 sm:p-2.5 sm:text-center">
          <div className="text-xs sm:text-[11px] text-zinc-500 font-medium">
            Applicants
          </div>
          <div className="text-xs sm:text-sm md:text-base font-bold text-zinc-900 sm:mt-0.5">
            {job.applicantsCount}
          </div>
        </div>

        <div className="flex items-center justify-between sm:flex-col sm:justify-center p-2 sm:p-2.5 sm:text-center">
          <div className="text-xs sm:text-[11px] text-forest font-medium flex items-center gap-1">
            <LuSparkles className="size-3 text-forest shrink-0" />
            <span>AI Match 90%+</span>
          </div>
          <div className="text-xs sm:text-sm md:text-base font-bold text-forest sm:mt-0.5">
            {job.topAiMatchesCount}
          </div>
        </div>

        <div className="flex items-center justify-between sm:flex-col sm:justify-center p-2 sm:p-2.5 sm:text-center">
          <div className="text-xs sm:text-[11px] text-zinc-500 font-medium">
            Interviewing
          </div>
          <div className="text-xs sm:text-sm md:text-base font-bold text-zinc-900 sm:mt-0.5">
            {job.interviewingCount}
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-2 pt-2.5 sm:pt-3 border-t border-zinc-100">
        <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-zinc-400 min-w-0">
          <LuClock className="size-3.5 shrink-0" />
          <span className="truncate">
            {isActive
              ? `${job.daysRemaining}d left • ${job.applicationDeadline}`
              : job.postedAt}
          </span>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-1.5 sm:gap-2 w-full sm:w-auto">
          <Link
            href={`/employer/my-jobs/${job.slug}`}
            className="inline-flex items-center gap-0.5 sm:gap-1 px-2.5 sm:px-3 py-1.5 rounded text-[11px] sm:text-xs font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
          >
            <span>Details</span>
            <FiChevronRight className="size-3 text-zinc-400" />
          </Link>

          <Link
            href={`/employer/my-jobs/${job.slug}/candidates`}
            className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded text-[11px] sm:text-xs font-semibold text-white bg-forest hover:bg-forest/90 transition-colors shadow-2xs"
          >
            <LuUsers className="size-3.5" />
            <span>Candidates</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
