import {
  LuCalendar,
  LuClock,
  LuCircleCheck,
  LuVideo,
} from "react-icons/lu";

interface InterviewsStatsHeaderProps {
  counts: {
    all: number;
    scheduled: number;
    completed: number;
    rescheduled: number;
    cancelled: number;
    today: number;
  };
}

export default function InterviewsStatsHeader({
  counts,
}: InterviewsStatsHeaderProps) {
  const statCards = [
    {
      label: "Total Sessions",
      value: counts.all,
      icon: LuCalendar,
      color: "text-zinc-700 bg-zinc-100",
      description: "Across all pipelines",
    },
    {
      label: "Today's Schedule",
      value: counts.today,
      icon: LuClock,
      color: "text-forest bg-[#EDF6F1] border border-[#D5E6DC]",
      description: "Sessions happening today",
      isHighlight: true,
    },
    {
      label: "Upcoming / Scheduled",
      value: counts.scheduled,
      icon: LuVideo,
      color: "text-blue-700 bg-blue-50 border border-blue-100",
      description: "Awaiting interview call",
    },
    {
      label: "Completed",
      value: counts.completed,
      icon: LuCircleCheck,
      color: "text-emerald-700 bg-emerald-50 border border-emerald-100",
      description: "Evaluations recorded",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5 lg:gap-4">
      {statCards.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className={`p-3 sm:p-4 rounded border bg-white shadow-2xs transition-all hover:shadow-xs flex flex-col justify-between ${
              stat.isHighlight ? "border-forest/30" : "border-zinc-200/80"
            }`}
          >
            <div className="flex items-center justify-between gap-1.5">
              <span className="text-xs sm:text-xs font-medium text-zinc-500 truncate">
                {stat.label}
              </span>
              <div className={`p-1.5 sm:p-2 rounded shrink-0 ${stat.color}`}>
                <Icon className="size-3.5 sm:size-4" />
              </div>
            </div>
            <div className="mt-2 sm:mt-2.5 flex items-baseline gap-1.5 sm:gap-2">
              <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-zinc-900 tracking-tight">
                {stat.value}
              </span>
              <span className="text-[11px] sm:text-xs text-zinc-400 hidden sm:inline truncate">
                {stat.description}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
