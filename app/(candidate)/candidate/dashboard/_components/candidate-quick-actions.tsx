import Link from "next/link";
import { LuSearch, LuBriefcase, LuVideo, LuFileText, LuCalendar } from "react-icons/lu";

interface QuickActionItem {
  id: string;
  label: string;
  icon: typeof LuSearch;
  href: string;
  badge?: string;
}

const candidateActions: QuickActionItem[] = [
  {
    id: "find-jobs",
    label: "Find Jobs",
    icon: LuSearch,
    href: "/candidate/find-jobs",
    badge: "24 New",
  },
  {
    id: "my-applications",
    label: "My Applications",
    icon: LuBriefcase,
    href: "/candidate/applied-jobs",
    badge: "6 Active",
  },
  {
    id: "practice-interview",
    label: "AI Interview",
    icon: LuVideo,
    href: "/candidate/ai-interview",
    badge: "Pre-Screen",
  },
  {
    id: "cv-manager",
    label: "CV Manager",
    icon: LuFileText,
    href: "/candidate/cv-manager",
    badge: "ATS 88%",
  },
];

export default function CandidateQuickActions() {
  const itemClassName =
    "group rounded bg-white hover:bg-zinc-50 border border-zinc-200/80 hover:border-zinc-300 text-zinc-900 p-2.5 sm:p-3.5 lg:p-4 flex flex-col items-center justify-center text-center gap-1.5 sm:gap-2 transition-all duration-150 shadow-xs hover:shadow-sm cursor-pointer relative";

  return (
    <div className="w-full lg:w-96 xl:w-115 shrink-0 bg-white rounded p-4 sm:p-5 lg:p-6 border border-zinc-200/80 shadow-xs flex flex-col justify-between">
      {/* Quick Actions Header */}
      <div className="mb-3 sm:mb-4">
        <h3 className="text-sm sm:text-base font-semibold text-zinc-900">
          Quick Actions
        </h3>
        <p className="text-[11px] sm:text-xs text-zinc-400 mt-0.5">
          Essential candidate tools & shortcuts
        </p>
      </div>

      {/* 2x2 Grid of Actions */}
      <div className="grid grid-cols-1 2xs:grid-cols-2 gap-2.5 sm:gap-3">
        {candidateActions.map(({ id, label, icon: Icon, href, badge }) => (
          <Link key={id} href={href} className={itemClassName}>
            {badge && (
              <span className="absolute top-2 right-2 text-[9px] font-bold text-forest bg-forest/10 px-1.5 py-0.2 rounded border border-forest/15">
                {badge}
              </span>
            )}
            <div className="size-8 sm:size-9 rounded bg-zinc-100 text-zinc-600 group-hover:text-forest group-hover:bg-[#EDF6F1] flex items-center justify-center group-hover:scale-110 transition-all">
              <Icon className="size-4 sm:size-4.5" />
            </div>
            <span className="text-xs sm:text-sm font-semibold leading-tight text-zinc-900">
              {label}
            </span>
          </Link>
        ))}
      </div>

      {/* Next Upcoming Interview Alert Card */}
      <div className="mt-4 pt-3.5 border-t border-zinc-100">
        <div className="p-3 rounded-lg bg-[#EDF6F1]/60 border border-[#D5E6DC] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="size-8 rounded-md bg-forest text-lime flex items-center justify-center shrink-0">
              <LuCalendar className="size-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-zinc-900 truncate">
                Tech Screen: Acme Tech
              </p>
              <p className="text-[11px] text-zinc-500 truncate">
                Tomorrow at 10:00 AM PST
              </p>
            </div>
          </div>

          <Link
            href="/candidate/interviews"
            className="text-xs font-bold text-forest hover:text-forest/80 px-2.5 py-1 rounded bg-white border border-[#D5E6DC] shadow-2xs shrink-0 transition-colors"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}
