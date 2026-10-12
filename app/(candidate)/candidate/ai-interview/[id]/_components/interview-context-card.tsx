import Image from "next/image";
import { FiClock, FiHelpCircle, FiAward, FiShield } from "react-icons/fi";
import { LuSparkles } from "react-icons/lu";
import type { AIInterviewJobContext } from "@/types/candidate/ai-interview.types";

interface InterviewContextCardProps {
  job: AIInterviewJobContext;
}

export default function InterviewContextCard({ job }: InterviewContextCardProps) {
  return (
    <div className="bg-white border border-zinc-200/80 rounded p-4 sm:p-5 shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-100">
        <div className="flex items-start gap-3.5">
          <div className="size-12 rounded bg-zinc-50 border border-zinc-200/80 overflow-hidden relative shrink-0">
            <Image
              src={job.companyLogo}
              alt={job.companyName}
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-[#F0F7F4] text-forest border border-[#D5E6DC]">
                <LuSparkles className="size-3" />
                <span>AI Pre-Screening</span>
              </span>
              <span className="text-xs text-zinc-500 font-medium">
                {job.department}
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-zinc-900 mt-1">
              {job.jobTitle}
            </h2>
            <p className="text-xs text-zinc-500 font-medium">
              {job.companyName} • {job.experienceLevel}
            </p>
          </div>
        </div>

        {/* Quick Highlights */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0 bg-zinc-50/80 border border-zinc-200/70 rounded px-3 py-2">
          <div className="flex items-center gap-1.5 text-xs text-zinc-700">
            <FiHelpCircle className="size-3.5 text-forest" />
            <span className="font-semibold text-zinc-900">{job.totalQuestions}</span> Questions
          </div>
          <div className="h-3.5 w-px bg-zinc-200" />
          <div className="flex items-center gap-1.5 text-xs text-zinc-700">
            <FiClock className="size-3.5 text-forest" />
            <span>~{job.estimatedDurationMinutes} Mins</span>
          </div>
        </div>
      </div>

      {/* AI Pre-Screening Explanation */}
      <div className="mt-3.5 p-3 rounded bg-zinc-50 border border-zinc-200/70 space-y-2">
        <p className="text-xs text-zinc-700 leading-relaxed">
          This short pre-screening interview helps <strong>{job.companyName}</strong> understand your <strong>skills</strong>, <strong>experience</strong>, and <strong>communication</strong> to evaluate your job application.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 border-t border-zinc-200/60 text-xs text-zinc-600">
          <div className="flex items-center gap-1.5 font-medium">
            <FiAward className="size-3.5 text-forest shrink-0" />
            <span>Role-Specific Skills</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <LuSparkles className="size-3.5 text-forest shrink-0" />
            <span>Practical Experience</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <FiShield className="size-3.5 text-forest shrink-0" />
            <span>Communication & Clarity</span>
          </div>
        </div>
      </div>
    </div>
  );
}
