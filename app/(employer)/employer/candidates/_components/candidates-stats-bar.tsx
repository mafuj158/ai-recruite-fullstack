import { FiUsers, FiAward, FiCalendar, FiTrendingUp } from "react-icons/fi";
import { CandidateStatsSummary } from "@/types/employer/candidates.types";

interface CandidatesStatsBarProps {
  stats: CandidateStatsSummary;
  onFilterAiRecommended: () => void;
  onFilterInterviews: () => void;
}

export default function CandidatesStatsBar({
  stats,
  onFilterAiRecommended,
  onFilterInterviews,
}: CandidatesStatsBarProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
      {/* Total Candidates */}
      <div className="bg-white border border-[#DFE1E7] rounded p-3 sm:p-5 flex items-center justify-between shadow-xs hover:border-zinc-300 transition-colors min-w-0">
        <div className="min-w-0 flex-1 pr-1.5">
          <p className="text-[11px] sm:text-xs font-medium text-zinc-500 uppercase tracking-wider truncate">
            Total Candidates
          </p>
          <p className="text-lg sm:text-2xl font-bold text-zinc-900 mt-0.5 sm:mt-1">
            {stats.total}
          </p>
          <span className="text-[10px] sm:text-xs text-zinc-400 truncate block">Across all active jobs</span>
        </div>
        <div className="size-9 sm:size-11 rounded bg-zinc-100 flex items-center justify-center text-zinc-600 shrink-0">
          <FiUsers className="size-4 sm:size-5" />
        </div>
      </div>

      {/* AI Recommended */}
      <div
        onClick={onFilterAiRecommended}
        className="bg-white border border-[#DFE1E7] rounded p-3 sm:p-5 flex items-center justify-between shadow-xs hover:border-emerald-300 transition-all cursor-pointer group min-w-0"
      >
        <div className="min-w-0 flex-1 pr-1.5">
          <p className="text-[11px] sm:text-xs font-medium text-emerald-700 uppercase tracking-wider flex items-center gap-1.5 truncate">
            <span className="size-1.5 sm:size-2 rounded bg-emerald-500 animate-pulse shrink-0" />
            AI Recommended
          </p>
          <p className="text-lg sm:text-2xl font-bold text-zinc-900 mt-0.5 sm:mt-1">
            {stats.aiRecommended}
          </p>
          <span className="text-[10px] sm:text-xs text-emerald-600 font-medium group-hover:underline truncate block">
            Score 85%+ • Click
          </span>
        </div>
        <div className="size-9 sm:size-11 rounded bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-100 transition-colors shrink-0">
          <FiAward className="size-4 sm:size-5" />
        </div>
      </div>

      {/* Interviews Scheduled */}
      <div
        onClick={onFilterInterviews}
        className="bg-white border border-[#DFE1E7] rounded p-3 sm:p-5 flex items-center justify-between shadow-xs hover:border-blue-300 transition-all cursor-pointer group min-w-0"
      >
        <div className="min-w-0 flex-1 pr-1.5">
          <p className="text-[11px] sm:text-xs font-medium text-blue-700 uppercase tracking-wider truncate">
            Interview Pipeline
          </p>
          <p className="text-lg sm:text-2xl font-bold text-zinc-900 mt-0.5 sm:mt-1">
            {stats.interviewScheduled}
          </p>
          <span className="text-[10px] sm:text-xs text-blue-600 font-medium group-hover:underline truncate block">
            Confirmed sessions
          </span>
        </div>
        <div className="size-9 sm:size-11 rounded bg-blue-50 text-blue-700 flex items-center justify-center group-hover:bg-blue-100 transition-colors shrink-0">
          <FiCalendar className="size-4 sm:size-5" />
        </div>
      </div>

      {/* Average Match Score */}
      <div className="bg-white border border-[#DFE1E7] rounded p-3 sm:p-5 flex items-center justify-between shadow-xs hover:border-zinc-300 transition-colors min-w-0">
        <div className="min-w-0 flex-1 pr-1.5">
          <p className="text-[11px] sm:text-xs font-medium text-zinc-500 uppercase tracking-wider truncate">
            Avg. Match Score
          </p>
          <p className="text-lg sm:text-2xl font-bold text-zinc-900 mt-0.5 sm:mt-1">
            {stats.avgMatchScore}%
          </p>
          <span className="text-[10px] sm:text-xs text-zinc-400 truncate block">High pipeline quality</span>
        </div>
        <div className="size-9 sm:size-11 rounded bg-lime/20 text-[#244034] flex items-center justify-center font-bold shrink-0">
          <FiTrendingUp className="size-4 sm:size-5" />
        </div>
      </div>
    </div>
  );
}
