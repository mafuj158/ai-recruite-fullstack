"use client";

import {
  FiDollarSign,
  FiMapPin,
  FiBriefcase,
  FiClock,
  FiUsers,
  FiExternalLink,
} from "react-icons/fi";
import { CandidateJobDetail } from "@/types/candidate/job-details.types";

interface JobDetailsSidebarProps {
  job: CandidateJobDetail;
  onApplyClick: () => void;
}

export default function JobDetailsSidebar({
  job,
  onApplyClick,
}: JobDetailsSidebarProps) {
  const isExpired = job.status === "expired";

  const quickFacts = [
    {
      label: "Compensation",
      value: job.salaryRange,
      icon: FiDollarSign,
      highlight: true,
    },
    {
      label: "Work Arrangement",
      value: job.workType,
      icon: FiMapPin,
    },
    {
      label: "Experience Level",
      value: job.experienceLevel,
      icon: FiBriefcase,
    },
    {
      label: "Employment Type",
      value: job.employmentType,
      icon: FiClock,
    },
    {
      label: "Department",
      value: job.department,
      icon: FiBriefcase,
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* 1. Job Quick Facts Card */}
      <div className="bg-white rounded p-4 sm:p-5 border border-zinc-200/80 shadow-xs space-y-4">
        <h3 className="text-xs sm:text-sm font-bold text-zinc-900 uppercase tracking-wider">
          Job Overview
        </h3>

        <div className="space-y-3">
          {quickFacts.map((fact, idx) => {
            const Icon = fact.icon;
            return (
              <div
                key={idx}
                className="flex items-center justify-between gap-3 text-xs pb-2.5 border-b border-zinc-100 last:border-0 last:pb-0"
              >
                <div className="flex items-center gap-2 text-zinc-500">
                  <Icon className="size-3.5 text-zinc-400" />
                  <span>{fact.label}</span>
                </div>
                <span
                  className={`font-semibold text-right ${
                    fact.highlight ? "text-forest font-bold" : "text-zinc-800"
                  }`}
                >
                  {fact.value}
                </span>
              </div>
            );
          })}
        </div>

        {/* Apply CTA Button in Sidebar */}
        <div className="pt-2">
          <button
            type="button"
            onClick={onApplyClick}
            disabled={isExpired}
            className={`w-full py-2.5 px-4 rounded text-xs sm:text-sm font-semibold transition-all shadow-2xs cursor-pointer ${
              isExpired
                ? "bg-zinc-100 text-zinc-400 border border-zinc-200/80 cursor-not-allowed"
                : "text-white bg-forest hover:bg-[#1b3027] hover:shadow-xs active:scale-[0.99]"
            }`}
          >
            {isExpired ? "Position Expired" : "Apply to this Position"}
          </button>
        </div>
      </div>

      {/* 2. Company Profile Card */}
      <div className="bg-white rounded p-4 sm:p-5 border border-zinc-200/80 shadow-xs space-y-3">
        <h3 className="text-xs sm:text-sm font-bold text-zinc-900 uppercase tracking-wider">
          About {job.company}
        </h3>

        <p className="text-xs text-zinc-600 leading-relaxed">
          {job.companyOverview}
        </p>

        <div className="pt-3 border-t border-zinc-100 space-y-2 text-xs">
          <div className="flex items-center justify-between text-zinc-600">
            <span className="flex items-center gap-1.5 text-zinc-500">
              <FiUsers className="size-3.5" />
              Company Size
            </span>
            <span className="font-semibold text-zinc-800">{job.companySize}</span>
          </div>

          <div className="flex items-center justify-between text-zinc-600">
            <span className="flex items-center gap-1.5 text-zinc-500">
              <FiExternalLink className="size-3.5" />
              Website
            </span>
            <a
              href={job.companyWebsite}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-forest hover:underline cursor-pointer"
            >
              Visit Website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
