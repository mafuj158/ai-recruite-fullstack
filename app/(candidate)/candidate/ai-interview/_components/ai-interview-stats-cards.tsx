"use client";

import { FiAlertCircle, FiCheckCircle, FiAward, FiClock } from "react-icons/fi";
import type { AIInterviewListItem } from "@/types/candidate/ai-interview.types";

interface AIInterviewStatsCardsProps {
  items: AIInterviewListItem[];
}

export default function AIInterviewStatsCards({
  items = [],
}: AIInterviewStatsCardsProps) {
  const pendingCount = items.filter((i) => i.status === "pending").length;
  const completedItems = items.filter((i) => i.status === "completed" && i.score);
  const completedCount = completedItems.length;
  const avgScore =
    completedCount > 0
      ? Math.round(
          completedItems.reduce((acc, curr) => acc + (curr.score || 0), 0) /
            completedCount
        )
      : 0;

  const stats = [
    {
      title: "Action Required",
      value: pendingCount,
      subtext: "Employer pre-screenings pending",
      icon: FiAlertCircle,
      iconColor: "text-amber-600 bg-amber-50 border-amber-200",
      highlight: pendingCount > 0,
    },
    {
      title: "Completed Screenings",
      value: completedCount,
      subtext: "Reports submitted to hiring teams",
      icon: FiCheckCircle,
      iconColor: "text-forest bg-[#F0F7F4] border-[#D5E6DC]",
    },
    {
      title: "Average AI Score",
      value: avgScore > 0 ? `${avgScore}%` : "—",
      subtext: "Across completed evaluations",
      icon: FiAward,
      iconColor: "text-emerald-600 bg-emerald-50 border-emerald-200",
    },
    {
      title: "Avg. Duration",
      value: "8 mins",
      subtext: "Standard completion time",
      icon: FiClock,
      iconColor: "text-blue-600 bg-blue-50 border-blue-200",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className="bg-white border border-zinc-200/80 rounded p-3.5 sm:p-4 shadow-2xs flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-zinc-500">
                {stat.title}
              </span>
              <div
                className={`size-7 sm:size-8 rounded flex items-center justify-center border ${stat.iconColor}`}
              >
                <Icon className="size-3.5 sm:size-4" />
              </div>
            </div>
            <div className="mt-2 sm:mt-3">
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg sm:text-xl font-bold text-zinc-900">
                  {stat.value}
                </span>
                {stat.highlight && (
                  <span className="text-[10px] font-semibold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/60">
                    Urgent
                  </span>
                )}
              </div>
              <p className="text-[11px] text-zinc-400 mt-0.5 truncate">
                {stat.subtext}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
