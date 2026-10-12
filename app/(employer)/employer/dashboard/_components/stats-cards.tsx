import type { ComponentType } from "react";
import { LuBriefcase, LuUsers, LuAward, LuVideo, LuTrendingUp } from "react-icons/lu";

interface StatItem {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon: ComponentType<{ className?: string }>;
}

const statsData: StatItem[] = [
  {
    title: "Active Jobs",
    value: "12",
    change: "+2 this week",
    isPositive: true,
    icon: LuBriefcase,
  },
  {
    title: "Total Applicants",
    value: "140",
    change: "+18.4% vs last mo",
    isPositive: true,
    icon: LuUsers,
  },
  {
    title: "AI Top Ranked",
    value: "18",
    change: "90%+ match score",
    isPositive: true,
    icon: LuAward,
  },
  {
    title: "Interview Conversion",
    value: "29%",
    change: "+4.1% industry avg",
    isPositive: true,
    icon: LuVideo,
  },
];

const StatsCards = () => {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5 sm:gap-5">
      {statsData.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.title}
            className="group relative bg-white hover:bg-zinc-50/60 rounded p-4 sm:p-5 lg:p-6 border border-zinc-200/80 shadow-xs hover:shadow-md hover:border-zinc-300 transition-all duration-200 flex items-center justify-between gap-3 sm:gap-4 overflow-hidden"
          >
            {/* Left Content */}
            <div className="space-y-0.5 sm:space-y-1">
              <p className="text-[11px] sm:text-xs font-medium text-zinc-500 tracking-wide">
                {stat.title}
              </p>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-zinc-900 tracking-tight">
                {stat.value}
              </h3>
              {stat.change && (
                <div className="flex items-center gap-1.5 pt-0.5">
                  <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/50">
                    <LuTrendingUp className="size-2.5 sm:size-3 text-emerald-600" />
                    {stat.change}
                  </span>
                </div>
              )}
            </div>

            {/* Right Lime Badge with soft glow */}
            <div className="size-10 sm:size-11 lg:size-12 rounded-full bg-[#D2F34C] text-forest flex items-center justify-center shrink-0 shadow-xs ring-4 ring-[#D2F34C]/25 group-hover:scale-105 group-hover:ring-[#D2F34C]/40 transition-all duration-200">
              <Icon className="size-4.5 sm:size-5 lg:size-5.5 text-forest" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;