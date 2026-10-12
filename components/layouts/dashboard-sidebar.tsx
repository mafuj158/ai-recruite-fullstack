"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  FiGrid,
  FiPlusCircle,
  FiCalendar,
  FiMessageSquare,
  FiSettings,
  FiBriefcase,
  FiBookmark,
  FiVideo,
  FiFileText,
  FiLogOut,
  FiX,
  FiUsers,
  FiSearch,
  FiUser,
} from "react-icons/fi";
import Logo from "../ui/logo";
import { useAppStore } from "@/store";

const employerNavItems = [
  { name: "Dashboard", href: "/employer/dashboard", icon: FiGrid },
  { name: "My Jobs", href: "/employer/my-jobs", icon: FiBriefcase },
  { name: "Candidates", href: "/employer/candidates", icon: FiUsers },
  { name: "Post a Job", href: "/employer/post-job", icon: FiPlusCircle },
  { name: "Interviews", href: "/employer/interviews", icon: FiCalendar },
  { name: "Messages", href: "/employer/chat", icon: FiMessageSquare },
  { name: "Settings", href: "/employer/settings", icon: FiSettings },
];

const candidateNavItems = [
  { name: "Dashboard", href: "/candidate/dashboard", icon: FiGrid },
  { name: "Find Jobs", href: "/candidate/find-jobs", icon: FiSearch },
  { name: "My Applications", href: "/candidate/applied-jobs", icon: FiBriefcase },
  { name: "Interviews", href: "/candidate/interviews", icon: FiCalendar },
  { name: "Saved Jobs", href: "/candidate/saved-jobs", icon: FiBookmark },
  { name: "AI Interview", href: "/candidate/ai-interview", icon: FiVideo },
  { name: "CV Manager", href: "/candidate/cv-manager", icon: FiFileText },
  { name: "Profile", href: "/candidate/profile", icon: FiUser },
  { name: "Messages", href: "/candidate/chat", icon: FiMessageSquare },
  { name: "Settings", href: "/candidate/settings", icon: FiSettings },
];

interface DashboardSidebarProps {
  type: "employer" | "candidate";
  user?: {
    name?: string;
    role?: string;
    avatarUrl?: string;
    initials?: string;
  };
}

export function DashboardSidebar({ type, user }: DashboardSidebarProps) {
  const pathname = usePathname();
  const toggleLogoutModal = useAppStore((state) => state.toggleLogoutModal);
  const isMobileSidebarOpen = useAppStore((state) => state.isMobileSidebarOpen);
  const toggleMobileSidebar = useAppStore((state) => state.toggleMobileSidebar);

  const isEmployer = type === "employer";
  const navItems = isEmployer ? employerNavItems : candidateNavItems;

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

  // Close mobile sidebar on route change
  useEffect(() => {
    toggleMobileSidebar(false);
  }, [pathname, toggleMobileSidebar]);

  // Lock body scroll when mobile sidebar is open
  useEffect(() => {
    if (isMobileSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileSidebarOpen]);

  // Close mobile sidebar on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileSidebarOpen) {
        toggleMobileSidebar(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileSidebarOpen, toggleMobileSidebar]);

  const renderSidebarContent = (isMobile = false) => (
    <>
      <div className="space-y-6">
        {/* Brand Logo & optional close button on mobile */}
        <div className="flex items-center justify-between">
          <Logo titleClass="text-forest text-xl" imageClass="size-8" />
          {isMobile && (
            <button
              type="button"
              onClick={() => toggleMobileSidebar(false)}
              aria-label="Close navigation menu"
              className="p-1.5 rounded text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition-colors cursor-pointer"
            >
              <FiX className="size-5" />
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <div className="space-y-1">
          <p className="px-3 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase mb-2 select-none">
            Menu
          </p>
          <nav className="space-y-1 sm:space-y-1.5">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== `/${type}/dashboard` &&
                  pathname.startsWith(item.href));
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => {
                    if (isMobile) toggleMobileSidebar(false);
                  }}
                  className={cn(
                    "group flex items-center justify-between px-3.5 py-2 sm:py-2.5 rounded text-sm font-medium transition-all duration-150",
                    isActive
                      ? "bg-forest text-white shadow-xs font-semibold"
                      : "text-zinc-600 hover:bg-zinc-100/90 hover:text-zinc-900"
                  )}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon
                      className={cn(
                        "size-4.5 shrink-0 transition-colors",
                        isActive
                          ? "text-white"
                          : "text-zinc-400 group-hover:text-zinc-700"
                      )}
                    />
                    <span className="truncate">{item.name}</span>
                  </div>

                  {isActive && (
                    <span className="size-1.5 rounded-full bg-lime shrink-0 shadow-xs" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Sidebar Footer: User Avatar, Name, Role & Logout */}
      <div className="border-t border-zinc-100 pt-3.5 mt-auto">
        <div className="flex items-center justify-between p-2 rounded bg-zinc-50 border border-zinc-200/70 hover:border-zinc-300 transition-colors">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            {/* Avatar with status indicator */}
            <div className="relative shrink-0">
              <div
                className={cn(
                  "size-9 rounded-full flex items-center justify-center font-bold text-xs shadow-xs select-none",
                  isEmployer
                    ? "bg-forest text-lime"
                    : "bg-forest text-white"
                )}
              >
                {userInfo.initials}
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 size-2.5 bg-emerald-500 rounded-full ring-2 ring-white" />
            </div>

            {/* Name & Role */}
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-zinc-900 truncate leading-tight">
                {userInfo.name}
              </p>
              <p className="text-[11px] text-zinc-500 truncate leading-tight mt-0.5 capitalize">
                {userInfo.role}
              </p>
            </div>
          </div>

          {/* Logout Action Button */}
          <button
            type="button"
            onClick={() => {
              if (isMobile) toggleMobileSidebar(false);
              toggleLogoutModal(true);
            }}
            title="Log out"
            aria-label="Log out"
            className="size-8 flex items-center justify-center rounded text-zinc-400 hover:text-red-600 hover:bg-red-50 transition-colors shrink-0 cursor-pointer ml-1"
          >
            <FiLogOut className="size-4" />
          </button>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Docked Sidebar */}
      <aside className="hidden xl:flex w-64 xl:w-68 shrink-0 bg-white border-r border-zinc-200/80 h-screen flex-col justify-between py-5 px-3.5 sticky top-0 z-20">
        {renderSidebarContent(false)}
      </aside>

      {/* Mobile Backdrop Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/40 backdrop-blur-xs z-40 transition-opacity duration-300 xl:hidden",
          isMobileSidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        onClick={() => toggleMobileSidebar(false)}
        aria-hidden="true"
      />

      {/* Mobile Off-Canvas Drawer */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] bg-white shadow-2xl flex flex-col justify-between py-5 px-3.5 transition-transform duration-300 ease-in-out xl:hidden",
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
        aria-label="Mobile Navigation"
      >
        {renderSidebarContent(true)}
      </aside>
    </>
  );
}
