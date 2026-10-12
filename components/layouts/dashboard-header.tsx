"use client";

import { usePathname } from "next/navigation";
import { FiMenu } from "react-icons/fi";
import { useAppStore } from "@/store";
import { cn } from "@/lib/utils";
import NotificationDropdown from "./notification-dropdown";
import {
  MOCK_CANDIDATE_NOTIFICATIONS,
  MOCK_EMPLOYER_NOTIFICATIONS,
} from "./notification-dummy";

interface DashboardHeaderProps {
  user?: {
    name?: string;
    role?: string;
    initials?: string;
  };
}

const DashboardHeader = ({ user }: DashboardHeaderProps) => {
  const pathname = usePathname();
  const toggleMobileSidebar = useAppStore((state) => state.toggleMobileSidebar);
  const isEmployer = pathname.includes("/employer");

  const userInfo = {
    name: user?.name || (isEmployer ? "Acme Technologies" : "John Doe"),
    role: user?.role || (isEmployer ? "Hiring Manager" : "Candidate"),
    initials:
      user?.initials ||
      (user?.name
        ? user.name
            .split(" ")
            .map((n) => n[0])
            .slice(0, 2)
            .join("")
            .toUpperCase()
        : isEmployer
        ? "HR"
        : "JD"),
  };

  return (
    <header className="sticky top-0 z-20 h-16 shrink-0 bg-white border-b border-zinc-200/80 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 sm:gap-4">
      {/* Left: Mobile hamburger menu toggle & Welcome Text */}
      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
        <button
          type="button"
          onClick={() => toggleMobileSidebar(true)}
          aria-label="Open navigation menu"
          className="xl:hidden p-2 -ml-1 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded transition-colors cursor-pointer shrink-0"
        >
          <FiMenu className="size-5" />
        </button>

        <div className="min-w-0">
          <h1 className="text-sm sm:text-base lg:text-lg font-semibold text-zinc-900 leading-tight flex items-center gap-1.5 truncate">
            <span className="truncate">Welcome back, {userInfo.name.split(" ")[0]}</span>
            <span className="inline-block animate-wave text-base shrink-0">👋</span>
          </h1>
          <p className="text-xs text-zinc-500 hidden sm:block mt-0.5 truncate">
            Here&apos;s an overview of your activity today
          </p>
        </div>
      </div>

      {/* Right: Notifications & User Profile */}
      <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
        {/* Interactive Notification Dropdown */}
        <NotificationDropdown
          notifications={
            isEmployer
              ? MOCK_EMPLOYER_NOTIFICATIONS
              : MOCK_CANDIDATE_NOTIFICATIONS
          }
          isEmployer={isEmployer}
        />

        {/* Divider */}
        <div className="h-6 w-px bg-zinc-200" />

        {/* User Avatar, Name & Role */}
        <div className="flex items-center gap-2.5">
          <div className="relative shrink-0">
            <div
              className={cn(
                "size-8.5 rounded-full flex items-center justify-center font-bold text-xs shadow-xs select-none",
                isEmployer ? "bg-forest text-lime" : "bg-forest text-white"
              )}
            >
              {userInfo.initials}
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 size-2 bg-emerald-500 rounded-full ring-2 ring-white" />
          </div>

          <div className="hidden sm:block text-left leading-tight">
            <p className="text-xs font-semibold text-zinc-900 truncate max-w-[130px]">
              {userInfo.name}
            </p>
            <p className="text-[11px] text-zinc-500 truncate capitalize mt-0.5">
              {userInfo.role}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;