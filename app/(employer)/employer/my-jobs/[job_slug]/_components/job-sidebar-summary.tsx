import Link from "next/link";
import {
  LuDollarSign,
  LuMapPin,
  LuBuilding2,
  LuBriefcase,
  LuGraduationCap,
  LuCalendar,
  LuClock,
  LuSparkles,
  LuUsers,
  LuBookmarkCheck,
  LuUserCheck,
  LuUserX,
} from "react-icons/lu";
import { FiChevronRight } from "react-icons/fi";
import { cn } from "@/lib/utils";
import { EmployerJob } from "@/types/employer/my-jobs.types";

interface JobSidebarSummaryProps {
  job: EmployerJob;
}

export default function JobSidebarSummary({ job }: JobSidebarSummaryProps) {
  const isActive = job.status === "active";

  const pipelineStages = [
    {
      label: "Total Applicants",
      value: job.applicantsCount,
      icon: LuUsers,
      containerClassName: "bg-zinc-50/90 border-zinc-200/60",
      iconClassName: "text-zinc-500",
      valueClassName: "text-zinc-900 font-bold",
    },
    {
      label: "90%+ AI Match",
      value: job.topAiMatchesCount,
      icon: LuSparkles,
      containerClassName: "bg-[#EDF6F1]/80 border-[#D5E6DC]",
      iconClassName: "text-forest",
      valueClassName: "text-forest font-bold",
    },
    {
      label: "Shortlisted",
      value: job.shortlistedCount ?? 0,
      icon: LuBookmarkCheck,
      containerClassName: "bg-blue-50/40 border-blue-100",
      iconClassName: "text-blue-600",
      valueClassName: "text-blue-900 font-bold",
    },
    {
      label: "In Interview",
      value: job.interviewingCount,
      icon: LuCalendar,
      containerClassName: "bg-amber-50/40 border-amber-100",
      iconClassName: "text-amber-600",
      valueClassName: "text-amber-900 font-bold",
    },
    {
      label: "Hired",
      value: job.hiredCount ?? 0,
      icon: LuUserCheck,
      containerClassName: "bg-emerald-50/70 border-emerald-200/70",
      iconClassName: "text-emerald-700",
      valueClassName: "text-emerald-800 font-bold",
    },
    {
      label: "Rejected",
      value: job.rejectedCount ?? 0,
      icon: LuUserX,
      containerClassName: "bg-rose-50/40 border-rose-100",
      iconClassName: "text-rose-500",
      valueClassName: "text-rose-800 font-bold",
    },
  ];

  const roleFacts = [
    {
      label: "Salary Range",
      value: job.salaryRange,
      icon: LuDollarSign,
      isHighlight: true,
    },
    {
      label: "Department",
      value: job.department,
      icon: LuBuilding2,
    },
    {
      label: "Location",
      value: job.location,
      icon: LuMapPin,
    },
    {
      label: "Employment",
      value: job.employmentType,
      icon: LuBriefcase,
    },
    {
      label: "Experience",
      value: job.experienceLevel,
      icon: LuBriefcase,
    },
    {
      label: "Education",
      value: job.education || "Bachelor's Degree",
      icon: LuGraduationCap,
    },
    {
      label: "Deadline",
      value: job.applicationDeadline,
      subValue: isActive ? `${job.daysRemaining} days left` : undefined,
      icon: LuCalendar,
    },
    {
      label: "Posted",
      value: job.postedAt,
      icon: LuClock,
    },
  ];

  return (
    <aside className="space-y-6">
      {/* 1. Candidate Pipeline Quick Card */}
      <div className="bg-white rounded p-4 sm:p-5 lg:p-4 xl:p-6 border border-zinc-200/80 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-zinc-900">
              Candidate Pipeline
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Review and screen applicants
            </p>
          </div>
          <span className="size-8 rounded bg-[#EDF6F1] text-forest flex items-center justify-center shrink-0">
            <LuSparkles className="size-4" />
          </span>
        </div>

        {/* Funnel breakdown grid */}
        <div className="grid grid-cols-2 gap-2 sm:gap-2.5 pt-1">
          {pipelineStages.map((stage) => {
            const Icon = stage.icon;
            return (
              <div
                key={stage.label}
                className={cn(
                  "p-2.5 sm:p-3 rounded border flex flex-col justify-between gap-1.5 transition-all shadow-2xs",
                  stage.containerClassName
                )}
              >
                <div className="flex items-center justify-between gap-1 text-zinc-500">
                  <span className="text-[11px] sm:text-xs font-medium leading-tight">
                    {stage.label}
                  </span>
                  <Icon className={cn("size-3.5 shrink-0", stage.iconClassName)} />
                </div>
                <div className={cn("text-base sm:text-lg font-bold leading-none", stage.valueClassName)}>
                  {stage.value}
                </div>
              </div>
            );
          })}
        </div>

        <Link
          href={`/employer/my-jobs/${job.slug}/candidates`}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded text-xs sm:text-sm font-semibold text-white bg-forest hover:bg-forest/90 transition-colors shadow-xs group"
        >
          <LuUsers className="size-4" />
          <span>View Candidates ({job.applicantsCount})</span>
          <FiChevronRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* 2. Role Quick Facts Card */}
      <div className="bg-white rounded p-4 sm:p-5 lg:p-4 xl:p-6 border border-zinc-200/80 shadow-2xs space-y-4">
        <h3 className="text-sm sm:text-base font-semibold text-zinc-900">
          Role Quick Facts
        </h3>

        {/* Role facts grid */}
        <div className="grid grid-cols-2 gap-2 sm:gap-2.5 pt-1">
          {roleFacts.map((fact) => {
            const Icon = fact.icon;
            return (
              <div
                key={fact.label}
                className="p-2.5 sm:p-3 rounded bg-zinc-50/80 border border-zinc-200/70 flex flex-col justify-between gap-1.5 transition-all hover:border-zinc-300 shadow-2xs"
              >
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[10px] sm:text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
                    {fact.label}
                  </span>
                  <Icon className="size-3.5 text-zinc-400 shrink-0" />
                </div>

                <div className="min-w-0">
                  <div
                    className={cn(
                      "text-xs sm:text-sm font-semibold leading-snug break-words",
                      fact.isHighlight ? "text-forest font-bold" : "text-zinc-800"
                    )}
                  >
                    {fact.value}
                  </div>
                  {fact.subValue && (
                    <p className="text-[10px] sm:text-[11px] text-zinc-400 leading-tight mt-0.5">
                      {fact.subValue}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
