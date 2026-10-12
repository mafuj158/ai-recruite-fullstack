"use client";

import { SalaryComparisonSummary } from "@/types/candidate/saved-jobs.types";
import {
  FiTrendingUp,
  FiDollarSign,
  FiTarget,
  FiCheckCircle,
  FiAlertTriangle,
  FiX,
} from "react-icons/fi";

interface SavedJobsSalaryComparisonProps {
  summary: SalaryComparisonSummary;
  onClose: () => void;
}

export function SavedJobsSalaryComparison({
  summary,
  onClose,
}: SavedJobsSalaryComparisonProps) {
  const formatCurrency = (val: number) => `$${Math.round(val / 1000)}k`;

  const diffFromTarget = summary.avgSavedSalary - summary.candidateTargetSalary;
  const isPositiveDiff = diffFromTarget >= 0;

  return (
    <div className="relative rounded bg-gradient-to-br from-white via-[#F6FAF7] to-[#EDF6F1]/40 border border-[#C2E4D2] p-4 sm:p-5 shadow-2xs space-y-3.5">
      {/* Header Row */}
      <div className="flex items-start justify-between gap-2.5">
        <div className="flex sm:flex-row flex-col items-start gap-2.5 min-w-0 flex-1">
          <div className="size-7 sm:size-8 rounded bg-forest/10 text-forest flex items-center justify-center shrink-0 mt-0.5">
            <FiTrendingUp className="size-4" />
          </div>
          <div className="min-w-0 flex-1 space-y-0.5">
            <div className="flex flex-wrap items-center gap-1.5">
              <h3 className="text-xs sm:text-sm font-bold text-zinc-900">
                Saved Jobs Compensation Benchmark
              </h3>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-forest text-white shrink-0">
                Live Insights
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-zinc-500 leading-relaxed">
              Comparing your saved job listings against your profile target salary of{" "}
              <strong className="text-zinc-800 font-semibold">
                {formatCurrency(summary.candidateTargetSalary)}/yr
              </strong>
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close salary benchmark"
          className="p-1 rounded text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer shrink-0"
        >
          <FiX className="size-4" />
        </button>
      </div>

      {/* 3 Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
        {/* Average Salary */}
        <div className="p-3 rounded bg-white border border-zinc-200/80 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-zinc-500 text-[11px] font-medium">
            <span>Average Saved Salary</span>
            <FiDollarSign className="size-3.5 text-forest" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-base sm:text-lg font-bold text-zinc-900">
              {formatCurrency(summary.avgSavedSalary)}
            </span>
            <span className="text-[11px] text-zinc-400">/year</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] font-semibold">
            {isPositiveDiff ? (
              <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                +{formatCurrency(diffFromTarget)} above target
              </span>
            ) : (
              <span className="text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                -{formatCurrency(Math.abs(diffFromTarget))} below target
              </span>
            )}
          </div>
        </div>

        {/* Salary Range Spread */}
        <div className="p-3 rounded bg-white border border-zinc-200/80 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-zinc-500 text-[11px] font-medium">
            <span>Market Spread Range</span>
            <FiTarget className="size-3.5 text-blue-600" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-base sm:text-lg font-bold text-zinc-900">
              {formatCurrency(summary.minSavedSalary)} - {formatCurrency(summary.maxSavedSalary)}
            </span>
          </div>
          <p className="text-[10px] text-zinc-500">
            Across your active bookmarked listings
          </p>
        </div>

        {/* Target Alignment Breakdown */}
        <div className="p-3 rounded bg-white border border-zinc-200/80 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-zinc-500 text-[11px] font-medium">
            <span>Target Alignment</span>
            <FiCheckCircle className="size-3.5 text-emerald-600" />
          </div>
          <div className="flex items-center gap-2 pt-0.5">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              <FiCheckCircle className="size-3" />
              {summary.aboveTargetCount} Exceed
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-zinc-700 bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200">
              {summary.atTargetCount} Meet
            </span>
            {summary.belowTargetCount > 0 && (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                <FiAlertTriangle className="size-3" />
                {summary.belowTargetCount}
              </span>
            )}
          </div>
          <p className="text-[10px] text-zinc-400">
            {summary.aboveTargetCount + summary.atTargetCount} roles match or beat target
          </p>
        </div>
      </div>
    </div>
  );
}
