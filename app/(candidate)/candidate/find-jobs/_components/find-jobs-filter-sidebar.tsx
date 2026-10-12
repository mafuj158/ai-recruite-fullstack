"use client";

import { FiX, FiRotateCcw } from "react-icons/fi";
import { LuSparkles } from "react-icons/lu";
import {
  FindJobsFilters,
  WorkType,
  EmploymentType,
  ExperienceLevel,
} from "@/types/candidate/find-jobs.types";

interface FindJobsFilterSidebarProps {
  filters: FindJobsFilters;
  onWorkTypeChange: (workType: "all" | WorkType) => void;
  onEmploymentTypeChange: (employmentType: "all" | EmploymentType) => void;
  onExperienceLevelChange: (experienceLevel: "all" | ExperienceLevel) => void;
  onMinMatchScoreChange: (score: number) => void;
  onReset: () => void;
  hasActiveFilters: boolean;
  isOpen: boolean;
  onClose: () => void;
}

const WORK_TYPES: { label: string; value: "all" | WorkType }[] = [
  { label: "All Types", value: "all" },
  { label: "Remote", value: "Remote" },
  { label: "Hybrid", value: "Hybrid" },
  { label: "On-site", value: "On-site" },
];

const MATCH_THRESHOLDS = [
  { label: "Any Match", value: 0 },
  { label: "80%+ High Fit", value: 80 },
  { label: "90%+ Top Fit", value: 90 },
];

const EXPERIENCE_LEVELS: { label: string; value: "all" | ExperienceLevel }[] = [
  { label: "All Levels", value: "all" },
  { label: "Junior", value: "Junior" },
  { label: "Mid-Level", value: "Mid-Level" },
  { label: "Senior", value: "Senior" },
  { label: "Lead / Architect", value: "Lead" },
];

const EMPLOYMENT_TYPES: { label: string; value: "all" | EmploymentType }[] = [
  { label: "All Engagements", value: "all" },
  { label: "Full-time", value: "Full-time" },
  { label: "Contract", value: "Contract" },
  { label: "Part-time", value: "Part-time" },
];

export default function FindJobsFilterSidebar({
  filters,
  onWorkTypeChange,
  onEmploymentTypeChange,
  onExperienceLevelChange,
  onMinMatchScoreChange,
  onReset,
  hasActiveFilters,
  isOpen,
  onClose,
}: FindJobsFilterSidebarProps) {
  const content = (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-200/80">
        <h3 className="text-sm font-bold text-zinc-900 tracking-tight">
          Filter Roles
        </h3>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="text-xs text-forest hover:underline font-semibold flex items-center gap-1 cursor-pointer"
          >
            <FiRotateCcw className="size-3" />
            <span>Reset All</span>
          </button>
        )}
      </div>

      {/* 1. Work Type Pills */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider block">
          Work Location
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {WORK_TYPES.map(({ label, value }) => {
            const active = filters.workType === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => onWorkTypeChange(value)}
                className={`px-2.5 py-1.5 rounded text-xs font-semibold text-center border transition-all cursor-pointer ${
                  active
                    ? "bg-forest text-white border-forest shadow-2xs"
                    : "bg-white text-zinc-700 border-zinc-200/80 hover:bg-zinc-50"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. AI Match Fit Filter */}
      <div className="space-y-2 pt-1 border-t border-zinc-100">
        <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider flex items-center gap-1">
          <LuSparkles className="size-3 text-forest" />
          <span>AI Compatibility</span>
        </label>
        <div className="flex flex-col gap-1.5">
          {MATCH_THRESHOLDS.map(({ label, value }) => {
            const active = filters.minMatchScore === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => onMinMatchScoreChange(value)}
                className={`w-full px-3 py-1.5 rounded text-xs font-medium text-left border transition-all flex items-center justify-between cursor-pointer ${
                  active
                    ? "bg-[#EDF6F1] text-forest border-[#C2E4D2] font-semibold"
                    : "bg-white text-zinc-600 border-zinc-200/80 hover:bg-zinc-50"
                }`}
              >
                <span>{label}</span>
                {value > 0 && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded font-bold bg-emerald-100/70 text-emerald-800">
                    {value}%+
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Experience Level */}
      <div className="space-y-2 pt-1 border-t border-zinc-100">
        <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider block">
          Experience Level
        </label>
        <div className="flex flex-col gap-1.5">
          {EXPERIENCE_LEVELS.map(({ label, value }) => {
            const active = filters.experienceLevel === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => onExperienceLevelChange(value)}
                className={`w-full px-3 py-1.5 rounded text-xs font-medium text-left border transition-all cursor-pointer ${
                  active
                    ? "bg-forest text-white border-forest shadow-2xs font-semibold"
                    : "bg-white text-zinc-600 border-zinc-200/80 hover:bg-zinc-50"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Employment Type */}
      <div className="space-y-2 pt-1 border-t border-zinc-100">
        <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider block">
          Engagement Type
        </label>
        <div className="flex flex-col gap-1.5">
          {EMPLOYMENT_TYPES.map(({ label, value }) => {
            const active = filters.employmentType === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => onEmploymentTypeChange(value)}
                className={`w-full px-3 py-1.5 rounded text-xs font-medium text-left border transition-all cursor-pointer ${
                  active
                    ? "bg-forest text-white border-forest shadow-2xs font-semibold"
                    : "bg-white text-zinc-600 border-zinc-200/80 hover:bg-zinc-50"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Sticky on scroll) */}
      <aside className="hidden lg:block w-72 xl:w-80 shrink-0 sticky top-20 self-start">
        <div className="bg-white rounded p-4 sm:p-5 border border-zinc-200/80 shadow-xs max-h-[calc(100vh-6rem)] overflow-y-auto">
          {content}
        </div>
      </aside>

      {/* Mobile Drawer (Collapsible) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <div
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-xs bg-white shadow-xl flex flex-col p-5 overflow-y-auto">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-zinc-100">
                <span className="font-bold text-sm text-zinc-900">Search Filters</span>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1 rounded text-zinc-400 hover:text-zinc-600"
                >
                  <FiX className="size-5" />
                </button>
              </div>
              {content}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
