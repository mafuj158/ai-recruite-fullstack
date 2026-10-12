"use client";

import type { ComponentType } from "react";
import Link from "next/link";
import { LuPlus, LuBriefcase, LuCalendar, LuDownload } from "react-icons/lu";
import toast from "react-hot-toast";

interface QuickActionItem {
  id: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  href?: string;
  onClick?: () => void;
}

const QuickActions = () => {
  const handleDownloadReport = () => {
    toast.success("Downloading latest hiring analytics report...");
  };

  const actions: QuickActionItem[] = [
    {
      id: "post-job",
      label: "Post New Job",
      icon: LuPlus,
      href: "/employer/post-job",
    },
    {
      id: "my-jobs",
      label: "My Jobs",
      icon: LuBriefcase,
      href: "/employer/my-jobs",
    },
    {
      id: "scheduled-interviews",
      label: "Scheduled Interviews",
      icon: LuCalendar,
      href: "/employer/interviews",
    },
    {
      id: "download-report",
      label: "Download Report",
      icon: LuDownload,
      onClick: handleDownloadReport,
    },
  ];

  const itemClassName =
    "group rounded bg-white hover:bg-zinc-50 border border-zinc-200/80 hover:border-zinc-300 text-zinc-900 p-2.5 sm:p-3.5 lg:p-4 flex flex-col items-center justify-center text-center gap-1.5 sm:gap-2.5 transition-all duration-150 shadow-xs hover:shadow-sm cursor-pointer";

  return (
    <div className="w-full lg:w-96 xl:w-115 shrink-0 bg-white rounded p-4 sm:p-5 lg:p-6 border border-zinc-200/80 shadow-xs flex flex-col justify-between">
      {/* quick actions header */}
      <div className="mb-3 sm:mb-5">
        <h3 className="text-sm sm:text-base font-semibold text-zinc-900">
          Quick Actions
        </h3>
        <p className="text-[11px] sm:text-xs text-zinc-400 mt-0.5">
          Common management shortcuts
        </p>
      </div>

      {/* quick action items */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3 flex-1">
        {actions.map(({ id, label, icon: Icon, href, onClick }) => {
          const content = (
            <>
              <div className="size-8 sm:size-9 rounded bg-zinc-100 text-zinc-600 group-hover:text-forest group-hover:bg-[#EDF6F1] flex items-center justify-center group-hover:scale-110 transition-all">
                <Icon className="size-4 sm:size-4.5" />
              </div>
              <span className="text-xs sm:text-sm font-semibold leading-tight text-zinc-900">
                {label}
              </span>
            </>
          );

          if (href) {
            return (
              <Link key={id} href={href} className={itemClassName}>
                {content}
              </Link>
            );
          }

          return (
            <button
              key={id}
              type="button"
              onClick={onClick}
              className={itemClassName}
            >
              {content}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;