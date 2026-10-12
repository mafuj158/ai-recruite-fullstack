import Link from "next/link";
import {
  LuSparkles,
  LuBriefcase,
  LuCalendar,
  LuAward,
  LuTrendingUp,
} from "react-icons/lu";
import { CandidateDashboardStat } from "@/types/candidate/dashboard.types";

interface CandidateStatsCardsProps {
  stats: CandidateDashboardStat[];
}

const STAT_ICON_MAP = {
  sparkles: LuSparkles,
  briefcase: LuBriefcase,
  calendar: LuCalendar,
  award: LuAward,
};

const STAT_HREF_MAP: Record<string, string> = {
  "Recommended Jobs": "/candidate/find-jobs",
  "Active Applications": "/candidate/applied-jobs",
  "Interviews Scheduled": "/candidate/interviews",
  "Average Match Fit": "/candidate/find-jobs",
};

export default function CandidateStatsCards({ stats }: CandidateStatsCardsProps) {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5 sm:gap-5">
      {stats.map((stat) => {
        const Icon = STAT_ICON_MAP[stat.iconName] || LuBriefcase;
        const href = STAT_HREF_MAP[stat.title] || "/candidate/dashboard";

        return (
          <Link
            key={stat.title}
            href={href}
            className="group relative bg-white hover:bg-zinc-50/60 rounded p-4 sm:p-5 lg:p-6 border border-zinc-200/80 shadow-xs hover:shadow-md hover:border-zinc-300 transition-all duration-200 flex items-center justify-between gap-3 sm:gap-4 overflow-hidden"
          >
            {/* Left Content */}
            <div className="space-y-0.5 sm:space-y-1 min-w-0">
              <p className="text-[11px] sm:text-xs font-medium text-zinc-500 tracking-wide truncate">
                {stat.title}
              </p>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-zinc-900 tracking-tight">
                {stat.value}
              </h3>
              {stat.change && (
                <div className="flex items-center gap-1.5 pt-0.5">
                  <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/50 truncate">
                    <LuTrendingUp className="size-2.5 sm:size-3 text-emerald-600 shrink-0" />
                    <span>{stat.change}</span>
                  </span>
                </div>
              )}
            </div>

            {/* Right Lime Badge with soft glow */}
            <div className="size-10 sm:size-11 lg:size-12 rounded-full bg-[#D2F34C] text-forest flex items-center justify-center shrink-0 shadow-xs ring-4 ring-[#D2F34C]/25 group-hover:scale-105 group-hover:ring-[#D2F34C]/40 transition-all duration-200">
              <Icon className="size-4.5 sm:size-5 lg:size-5.5 text-forest" />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
