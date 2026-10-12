"use client";

import { FiAward, FiCheckCircle, FiPlus, FiAlertCircle } from "react-icons/fi";
import type { ATSScoreMetrics } from "@/types/candidate/cv-manager.types";

interface ATSScoreCardProps {
  metrics: ATSScoreMetrics;
  onAddMissingKeyword: (keyword: string) => void;
}

export function ATSScoreCard({
  metrics,
  onAddMissingKeyword,
}: ATSScoreCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-emerald-700 bg-emerald-50 border-emerald-200";
    if (score >= 70) return "text-blue-700 bg-blue-50 border-blue-200";
    return "text-amber-700 bg-amber-50 border-amber-200";
  };

  const getScoreBarColor = (score: number) => {
    if (score >= 85) return "bg-forest";
    if (score >= 70) return "bg-blue-600";
    return "bg-amber-500";
  };

  return (
    <div className="bg-white rounded p-4 sm:p-6 border border-zinc-200/80 shadow-xs space-y-5">
      {/* 1. Header & Overall Score Gauge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-100">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-forest/10 text-forest flex items-center justify-center shrink-0">
            <FiAward className="size-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-zinc-900">
              AI ATS Optimization Score
            </h3>
            <p className="text-xs text-zinc-500">
              Evaluated against modern Applicant Tracking Systems (Workday, Greenhouse, Lever).
            </p>
          </div>
        </div>

        {/* Score Badge */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="text-right">
            <span className="text-2xl sm:text-3xl font-black text-zinc-900 leading-none">
              {metrics.overallScore}
            </span>
            <span className="text-xs text-zinc-400 font-semibold">/100</span>
            <p className="text-[10px] font-bold text-forest uppercase tracking-wider">
              Strong Match
            </p>
          </div>
        </div>
      </div>

      {/* 2. 4-Pillar Metric Bars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-3 rounded-lg bg-zinc-50/80 border border-zinc-200/60 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-zinc-700">Formatting</span>
            <span className="font-bold text-zinc-900">{metrics.formattingScore}%</span>
          </div>
          <div className="h-1.5 w-full bg-zinc-200 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${getScoreBarColor(metrics.formattingScore)}`}
              style={{ width: `${metrics.formattingScore}%` }}
            />
          </div>
          <span className="text-[10px] text-zinc-400 block">Single-column parse ready</span>
        </div>

        <div className="p-3 rounded-lg bg-zinc-50/80 border border-zinc-200/60 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-zinc-700">Role Relevance</span>
            <span className="font-bold text-zinc-900">{metrics.relevanceScore}%</span>
          </div>
          <div className="h-1.5 w-full bg-zinc-200 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${getScoreBarColor(metrics.relevanceScore)}`}
              style={{ width: `${metrics.relevanceScore}%` }}
            />
          </div>
          <span className="text-[10px] text-zinc-400 block">Senior engineering match</span>
        </div>

        <div className="p-3 rounded-lg bg-zinc-50/80 border border-zinc-200/60 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-zinc-700">Impact Metrics</span>
            <span className="font-bold text-zinc-900">{metrics.impactScore}%</span>
          </div>
          <div className="h-1.5 w-full bg-zinc-200 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${getScoreBarColor(metrics.impactScore)}`}
              style={{ width: `${metrics.impactScore}%` }}
            />
          </div>
          <span className="text-[10px] text-zinc-400 block">STAR metric density</span>
        </div>

        <div className="p-3 rounded-lg bg-zinc-50/80 border border-zinc-200/60 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-zinc-700">Keyword Density</span>
            <span className="font-bold text-zinc-900">{metrics.keywordScore}%</span>
          </div>
          <div className="h-1.5 w-full bg-zinc-200 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${getScoreBarColor(metrics.keywordScore)}`}
              style={{ width: `${metrics.keywordScore}%` }}
            />
          </div>
          <span className="text-[10px] text-zinc-400 block">Core skill occurrences</span>
        </div>
      </div>

      {/* 3. Strengths & Missing Keywords Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
        {/* Left: ATS Highlights */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block">
            ATS Parsed Strengths
          </span>
          <ul className="space-y-1.5 text-xs text-zinc-600">
            {metrics.strengths.map((str, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <FiCheckCircle className="size-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="leading-snug">{str}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: High Demand Missing Keywords */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1">
              <FiAlertCircle className="size-3" />
              Missing High-Demand Keywords
            </span>
            <span className="text-[10px] text-zinc-400">Click to add to draft</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {metrics.missingKeywords.map((kw) => (
              <button
                key={kw}
                type="button"
                onClick={() => onAddMissingKeyword(kw)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-medium transition-colors cursor-pointer"
                title={`Add ${kw} to resume suggestions`}
              >
                <FiPlus className="size-3" />
                <span>{kw}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
