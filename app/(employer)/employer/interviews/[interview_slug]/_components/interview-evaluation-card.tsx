import {
  LuCircleCheck,
  LuCircleAlert,
  LuChartBar,
} from "react-icons/lu";
import type { InterviewItem } from "@/types/employer/interviews.types";

interface InterviewEvaluationCardProps {
  interview: InterviewItem;
}

export default function InterviewEvaluationCard({
  interview,
}: InterviewEvaluationCardProps) {
  const isCompleted = interview.status === "completed";

  if (!isCompleted) {
    return null;
  }

  return (
    <div className="bg-white rounded border border-zinc-200/80 p-4 sm:p-6 shadow-2xs space-y-4 sm:space-y-5">
      {/* Header with Overall Rating */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 pb-3 border-b border-zinc-100">
        <h3 className="text-sm sm:text-base font-bold text-zinc-900 flex items-center gap-2">
          <LuChartBar className="size-4 text-forest shrink-0" />
          <span>Session Evaluation & Scorecard</span>
        </h3>

        <div className="flex flex-wrap items-center gap-2">
          {interview.recommendation && (
            <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 sm:px-3 py-1 rounded bg-[#EDF6F1] text-forest border border-[#D5E6DC]">
              <LuCircleCheck className="size-3.5" />
              <span>{interview.recommendation}</span>
            </span>
          )}
          {interview.overallRating && (
            <span className="text-xs sm:text-sm font-bold text-zinc-900">
              Score: {interview.overallRating}/100
            </span>
          )}
        </div>
      </div>

      {/* Category Scorecards */}
      {interview.scorecards && interview.scorecards.length > 0 && (
        <div className="space-y-3.5">
          <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
            Competency Breakdown
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {interview.scorecards.map((card, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded border border-zinc-100 bg-zinc-50/70 space-y-2"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-zinc-800">{card.category}</span>
                  <span className="font-bold text-forest">{card.score}%</span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-zinc-200/80 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-forest h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${card.score}%` }}
                  />
                </div>

                <p className="text-xs text-zinc-500 leading-relaxed">
                  {card.feedback}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Strengths & Improvements */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        {/* Strengths */}
        {interview.strengths && interview.strengths.length > 0 && (
          <div className="p-3.5 rounded bg-[#EDF6F1]/50 border border-[#D5E6DC] space-y-2">
            <span className="text-xs font-bold text-forest flex items-center gap-1.5">
              <LuCircleCheck className="size-3.5" />
              <span>Observed Strengths</span>
            </span>
            <ul className="space-y-1.5 text-xs text-zinc-700">
              {interview.strengths.map((s, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-forest font-bold">•</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Improvements */}
        {interview.improvements && interview.improvements.length > 0 && (
          <div className="p-3.5 rounded bg-amber-50/50 border border-amber-200/60 space-y-2">
            <span className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
              <LuCircleAlert className="size-3.5" />
              <span>Areas for Development</span>
            </span>
            <ul className="space-y-1.5 text-xs text-zinc-700">
              {interview.improvements.map((imp, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>{imp}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
