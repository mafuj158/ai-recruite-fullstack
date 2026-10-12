"use client";

import Link from "next/link";
import {
  FiAward,
  FiCheckCircle,
  FiArrowRight,
  FiCheck,
  FiTrendingUp,
  FiArrowLeft,
  FiMessageSquare,
  FiCpu,
  FiCode,
  FiUsers,
} from "react-icons/fi";
import { LuSparkles } from "react-icons/lu";
import type { AIInterviewEvaluationReport } from "@/types/candidate/ai-interview.types";

interface StepAIReportProps {
  report: AIInterviewEvaluationReport;
  onBackToList: () => void;
}

export default function StepAIReport({
  report,
  onBackToList,
}: StepAIReportProps) {
  const getIcon = (name: string) => {
    switch (name) {
      case "message":
        return FiMessageSquare;
      case "code":
        return FiCode;
      case "cpu":
        return FiCpu;
      case "users":
        return FiUsers;
      default:
        return FiAward;
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* 1. Overall Score Banner */}
      <div className="bg-white border border-zinc-200/80 rounded p-4 sm:p-6 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-start gap-4">
            {/* Score Pill / Circle */}
            <div className="size-16 sm:size-20 rounded-full bg-[#F0F7F4] border-2 border-[#D5E6DC] flex flex-col items-center justify-center text-forest shrink-0 shadow-xs">
              <span className="text-xl sm:text-2xl font-black leading-none">
                {report.overallScore}
              </span>
              <span className="text-[10px] font-bold text-zinc-500 mt-0.5">
                / 100
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                  <FiCheck className="size-3" />
                  <span>{report.verdict}</span>
                </span>
                <span className="text-xs text-zinc-500 font-medium">
                  {report.jobTitle} • {report.companyName}
                </span>
              </div>

              <h2 className="text-base sm:text-lg font-bold text-zinc-900">
                AI Pre-Screening Evaluation Completed
              </h2>
              <p className="text-xs text-zinc-500">
                Completed {report.completedAt} • Duration: {report.durationFormatted}
              </p>
            </div>
          </div>

          {/* Top Actions */}
          <div className="flex items-center gap-2.5 shrink-0 self-end md:self-auto">
            <button
              type="button"
              onClick={onBackToList}
              className="h-9 px-3.5 rounded border border-zinc-200 text-zinc-700 hover:bg-zinc-50 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <FiArrowLeft className="size-3.5" />
              <span>All Pre-Screenings</span>
            </button>

            <Link
              href="/candidate/applied-jobs"
              className="h-9 px-4 rounded bg-forest hover:bg-[#1b3027] text-white text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
            >
              <span>Track Application</span>
              <FiArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Four Competency Pillars */}
      <div className="bg-white border border-zinc-200/80 rounded p-4 sm:p-5 shadow-2xs space-y-4">
        <h3 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
          <LuSparkles className="size-4 text-forest" />
          <span>Core Competency Breakdown</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {report.competencies.map((comp, idx) => {
            const Icon = getIcon(comp.iconName);
            return (
              <div
                key={idx}
                className="bg-zinc-50/70 border border-zinc-200/70 rounded p-3.5 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="size-7 rounded bg-white border border-zinc-200 flex items-center justify-center text-forest shadow-2xs">
                      <Icon className="size-3.5" />
                    </div>
                    <span className="text-xs font-bold text-zinc-900">
                      {comp.name}
                    </span>
                  </div>
                  <span className="text-xs font-extrabold text-forest">
                    {comp.score}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="h-2 w-full bg-zinc-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-forest rounded-full transition-all duration-500"
                    style={{ width: `${comp.score}%` }}
                  />
                </div>

                <p className="text-[11px] text-zinc-600 leading-snug">
                  {comp.assessment}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Strengths & Growth Areas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Strengths */}
        <div className="bg-white border border-zinc-200/80 rounded p-4 sm:p-5 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-emerald-700">
            <FiCheckCircle className="size-4 shrink-0" />
            <h4 className="text-xs sm:text-sm font-bold text-zinc-900">
              Key Strengths Observed
            </h4>
          </div>
          <ul className="space-y-2">
            {report.strengths.map((str, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-xs text-zinc-700 bg-emerald-50/40 border border-emerald-200/40 rounded p-2.5"
              >
                <FiCheck className="size-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{str}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Improvement Tips */}
        <div className="bg-white border border-zinc-200/80 rounded p-4 sm:p-5 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-blue-700">
            <FiTrendingUp className="size-4 shrink-0" />
            <h4 className="text-xs sm:text-sm font-bold text-zinc-900">
              Improvement Tips
            </h4>
          </div>
          <ul className="space-y-2">
            {report.growthAreas.map((tip, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-xs text-zinc-700 bg-blue-50/40 border border-blue-200/40 rounded p-2.5"
              >
                <LuSparkles className="size-3.5 text-blue-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 4. Question Highlights Recap */}
      <div className="bg-white border border-zinc-200/80 rounded p-4 sm:p-5 shadow-2xs space-y-3">
        <h4 className="text-xs sm:text-sm font-bold text-zinc-900">
          Response Transcripts & Extracted Highlights
        </h4>
        <div className="space-y-3">
          {report.transcripts.map((t, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded border border-zinc-200/70 bg-zinc-50/50 space-y-2"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-zinc-900">
                  Question {idx + 1}
                </span>
                <span className="text-zinc-500 font-mono text-[11px]">
                  {t.duration}
                </span>
              </div>
              <p className="text-xs text-zinc-700 italic">
                &ldquo;{t.question}&rdquo;
              </p>
              <p className="text-xs text-zinc-600 leading-relaxed">
                {t.answerSummary}
              </p>
              <div className="flex items-center gap-1.5 flex-wrap pt-1">
                {t.keyHighlights.map((hl, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-semibold bg-white border border-zinc-200 text-zinc-700 px-2 py-0.5 rounded"
                  >
                    ✓ {hl}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
