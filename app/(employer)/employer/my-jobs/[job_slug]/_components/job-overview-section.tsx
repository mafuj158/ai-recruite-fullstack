import { LuCode, LuGraduationCap, LuCheck } from "react-icons/lu";
import { EmployerJob } from "@/types/employer/my-jobs.types";

interface JobOverviewSectionProps {
  job: EmployerJob;
}

export default function JobOverviewSection({ job }: JobOverviewSectionProps) {
  return (
    <div className="space-y-6">
      {/* 1. Job Description */}
      <div className="bg-white rounded p-5 sm:p-6 lg:p-7 border border-zinc-200/80 shadow-2xs space-y-3.5">
        <h2 className="text-base sm:text-lg font-semibold text-zinc-900">
          About the Role
        </h2>
        <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed whitespace-pre-line">
          {job.jobDescription}
        </p>
      </div>

      {/* 2. Core Responsibilities */}
      {job.coreResponsibilities && job.coreResponsibilities.length > 0 && (
        <div className="bg-white rounded p-5 sm:p-6 lg:p-7 border border-zinc-200/80 shadow-2xs space-y-4">
          <h2 className="text-base sm:text-lg font-semibold text-zinc-900">
            Core Responsibilities
          </h2>
          <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-600">
            {job.coreResponsibilities.map((resp, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="size-5 rounded-full bg-[#EDF6F1] text-forest flex items-center justify-center shrink-0 mt-0.5">
                  <LuCheck className="size-3" />
                </span>
                <span className="leading-relaxed">{resp}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 3. Required Tech Stack & Skills */}
      <div className="bg-white rounded p-5 sm:p-6 lg:p-7 border border-zinc-200/80 shadow-2xs space-y-4">
        <div className="flex items-center gap-2">
          <div className="size-7 rounded bg-forest/10 text-forest flex items-center justify-center shrink-0">
            <LuCode className="size-4" />
          </div>
          <h2 className="text-base sm:text-lg font-semibold text-zinc-900">
            Required Skills & Competencies
          </h2>
        </div>

        <div className="flex flex-wrap gap-2">
          {job.skills && job.skills.length > 0 ? (
            job.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 rounded bg-[#EDF6F1] text-forest border border-[#D5E6DC] text-xs font-semibold"
              >
                {skill}
              </span>
            ))
          ) : (
            <span className="text-xs text-zinc-400">No specific skills listed</span>
          )}
        </div>
      </div>

      {/* 4. Education & Experience Qualifications */}
      <div className="bg-white rounded p-5 sm:p-6 lg:p-7 border border-zinc-200/80 shadow-2xs space-y-4">
        <div className="flex items-center gap-2">
          <div className="size-7 rounded bg-forest/10 text-forest flex items-center justify-center shrink-0">
            <LuGraduationCap className="size-4" />
          </div>
          <h2 className="text-base sm:text-lg font-semibold text-zinc-900">
            Qualifications & Experience
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-3.5 rounded bg-zinc-50 border border-zinc-100 space-y-1">
            <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
              Experience Level
            </span>
            <p className="text-sm font-semibold text-zinc-900">
              {job.experienceLevel}
            </p>
          </div>

          <div className="p-3.5 rounded bg-zinc-50 border border-zinc-100 space-y-1">
            <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
              Education Requirement
            </span>
            <p className="text-sm font-semibold text-zinc-900">
              {job.education || "Bachelor's Degree or equivalent experience"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
