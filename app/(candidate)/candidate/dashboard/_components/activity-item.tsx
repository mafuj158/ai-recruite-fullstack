import Link from "next/link";
import {
  FiCalendar,
  FiEye,
  FiCheckCircle,
} from "react-icons/fi";
import { LuSparkles } from "react-icons/lu";
import { CandidateActivityItem } from "@/types/candidate/dashboard.types";

const ACTIVITY_ICON_MAP = {
  interview: {
    icon: FiCalendar,
    badgeBg: "bg-blue-50 text-blue-700 border-blue-200",
  },
  review: {
    icon: FiEye,
    badgeBg: "bg-purple-50 text-purple-700 border-purple-200",
  },
  match: {
    icon: LuSparkles,
    badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  application: {
    icon: FiCheckCircle,
    badgeBg: "bg-amber-50 text-amber-700 border-amber-200",
  },
};

interface ActivityItemProps {
  item: CandidateActivityItem;
}

export default function ActivityItem({ item }: ActivityItemProps) {
  const config = ACTIVITY_ICON_MAP[item.type] || ACTIVITY_ICON_MAP.application;
  const Icon = config.icon;

  return (
    <div className="py-3 sm:py-3.5 first:pt-1 last:pb-1 flex items-start justify-between gap-3 sm:gap-4 hover:bg-zinc-50/50 -mx-2 px-2 rounded transition-colors">
      <div className="flex items-start gap-3 min-w-0 flex-1">
        <div
          className={`size-8 sm:size-9 rounded-lg flex items-center justify-center shrink-0 border ${config.badgeBg}`}
        >
          <Icon className="size-4" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-xs sm:text-sm font-semibold text-zinc-900 leading-snug">
            {item.title}
          </p>
          <p className="text-xs text-zinc-500 mt-0.5 leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>

      <div className="text-right shrink-0">
        <span className="text-[11px] text-zinc-400 block whitespace-nowrap">
          {item.timestamp}
        </span>
        {item.link && (
          <Link
            href={item.link}
            className="text-[11px] font-semibold text-forest hover:underline inline-block mt-0.5"
          >
            View
          </Link>
        )}
      </div>
    </div>
  );
}
