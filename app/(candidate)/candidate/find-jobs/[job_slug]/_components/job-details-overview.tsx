import {
  FiCheckCircle,
  FiAward,
  FiCode,
  FiGift,
  FiList,
} from "react-icons/fi";
import { CandidateJobDetail } from "@/types/candidate/job-details.types";

interface JobDetailsOverviewProps {
  job: CandidateJobDetail;
}

export default function JobDetailsOverview({ job }: JobDetailsOverviewProps) {
  return (
    <div className="space-y-5 sm:space-y-6">
      {/* 1. About the Role / Description */}
      <section className="bg-white rounded p-5 sm:p-6 border border-zinc-200/80 shadow-xs space-y-3">
        <h2 className="text-sm sm:text-base font-bold text-zinc-900 flex items-center gap-2">
          <FiList className="size-4 text-forest" />
          <span>About the Role</span>
        </h2>
        <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
          {job.description}
        </p>
      </section>

      {/* 2. Key Responsibilities */}
      <section className="bg-white rounded p-5 sm:p-6 border border-zinc-200/80 shadow-xs space-y-3.5">
        <h2 className="text-sm sm:text-base font-bold text-zinc-900 flex items-center gap-2">
          <FiCheckCircle className="size-4 text-forest" />
          <span>Key Responsibilities</span>
        </h2>
        <ul className="space-y-2.5">
          {job.responsibilities.map((resp, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-600 leading-relaxed"
            >
              <span className="size-1.5 rounded-full bg-forest mt-2 shrink-0" />
              <span>{resp}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 3. Requirements & Qualifications */}
      <section className="bg-white rounded p-5 sm:p-6 border border-zinc-200/80 shadow-xs space-y-3.5">
        <h2 className="text-sm sm:text-base font-bold text-zinc-900 flex items-center gap-2">
          <FiAward className="size-4 text-forest" />
          <span>Qualifications & Experience</span>
        </h2>
        <ul className="space-y-2.5">
          {job.requirements.map((req, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-600 leading-relaxed"
            >
              <span className="size-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
              <span>{req}</span>
            </li>
          ))}
        </ul>

        {/* Nice to haves */}
        {job.niceToHaves && job.niceToHaves.length > 0 && (
          <div className="pt-3 border-t border-zinc-100 space-y-2">
            <span className="text-xs font-bold text-zinc-700 uppercase tracking-wider block">
              Bonus Points / Nice to Have
            </span>
            <ul className="space-y-2">
              {job.niceToHaves.map((bonus, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-500 leading-relaxed"
                >
                  <span className="size-1.5 rounded-full bg-zinc-300 mt-2 shrink-0" />
                  <span>{bonus}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* 4. Tech Stack & Required Skills */}
      <section className="bg-white rounded p-5 sm:p-6 border border-zinc-200/80 shadow-xs space-y-3">
        <h2 className="text-sm sm:text-base font-bold text-zinc-900 flex items-center gap-2">
          <FiCode className="size-4 text-forest" />
          <span>Tech Stack & Core Competencies</span>
        </h2>
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {job.skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1.5 rounded text-xs font-semibold bg-zinc-50 text-zinc-800 border border-zinc-200/80 shadow-2xs"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* 5. Benefits & Perks */}
      <section className="bg-white rounded p-5 sm:p-6 border border-zinc-200/80 shadow-xs space-y-3.5">
        <h2 className="text-sm sm:text-base font-bold text-zinc-900 flex items-center gap-2">
          <FiGift className="size-4 text-forest" />
          <span>Benefits & What We Offer</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {job.benefits.map((benefit, idx) => (
            <div
              key={idx}
              className="p-3 rounded bg-zinc-50/70 border border-zinc-200/70 flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700 leading-relaxed"
            >
              <FiCheckCircle className="size-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{benefit}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
