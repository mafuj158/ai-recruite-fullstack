"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FiBell,
  FiCalendar,
  FiCheckCircle,
  FiEye,
  FiUserPlus,
  FiCheck,
  FiSettings,
} from "react-icons/fi";
import { LuSparkles } from "react-icons/lu";
import type {
  AppNotification,
  AppNotificationType,
} from "@/types/notification/notification.types";

interface NotificationDropdownProps {
  notifications: AppNotification[];
  isEmployer?: boolean;
}

export default function NotificationDropdown({
  notifications: initialNotifications,
  isEmployer = false,
}: NotificationDropdownProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] =
    useState<AppNotification[]>(initialNotifications);
  const [activeTab, setActiveTab] = useState<"all" | "unread">("all");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const handleItemClick = (notification: AppNotification) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notification.id ? { ...n, isRead: true } : n))
    );
    setIsOpen(false);
    router.push(notification.actionUrl);
  };

  const getIcon = (type: AppNotificationType) => {
    switch (type) {
      case "interview_scheduled":
      case "interview_accepted":
        return {
          icon: FiCalendar,
          color: "text-blue-600 bg-blue-50 border-blue-200",
        };
      case "shortlisted":
        return {
          icon: FiCheckCircle,
          color: "text-emerald-600 bg-emerald-50 border-emerald-200",
        };
      case "new_job_match":
      case "high_ai_match":
        return {
          icon: LuSparkles,
          color: "text-forest bg-[#F0F7F4] border-[#D5E6DC]",
        };
      case "application_viewed":
        return {
          icon: FiEye,
          color: "text-amber-600 bg-amber-50 border-amber-200",
        };
      case "new_application":
        return {
          icon: FiUserPlus,
          color: "text-indigo-600 bg-indigo-50 border-indigo-200",
        };
      case "ai_screening_completed":
        return {
          icon: FiCheckCircle,
          color: "text-purple-600 bg-purple-50 border-purple-200",
        };
      default:
        return {
          icon: FiBell,
          color: "text-zinc-600 bg-zinc-50 border-zinc-200",
        };
    }
  };

  const filteredList = notifications.filter((n) => {
    if (activeTab === "unread") return !n.isRead;
    return true;
  });

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Bell Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Notifications"
        title="Notifications"
        className={`relative size-9 flex items-center justify-center rounded transition-colors cursor-pointer ${
          isOpen
            ? "bg-zinc-100 text-zinc-900"
            : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100"
        }`}
      >
        <FiBell className="size-4.5" />
        {unreadCount > 0 && (
          <span className="absolute top-2 right-2 size-2 rounded-full bg-emerald-500 ring-2 ring-white animate-pulse" />
        )}
      </button>

      {/* Dropdown Popover */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-[calc(100vw-2rem)] max-w-sm sm:w-96 bg-white border border-zinc-200/80 rounded-lg shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
          {/* Header */}
          <div className="p-3.5 sm:p-4 border-b border-zinc-100 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-zinc-900">Notifications</h3>
              {unreadCount > 0 && (
                <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-[#EDF6F1] text-forest border border-[#D5E6DC]">
                  {unreadCount} unread
                </span>
              )}
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={handleMarkAllRead}
                className="text-[11px] font-semibold text-forest hover:text-[#1b3027] inline-flex items-center gap-1 cursor-pointer transition-colors"
              >
                <FiCheck className="size-3" />
                <span>Mark all as read</span>
              </button>
            )}
          </div>

          {/* Filter Tabs */}
          <div className="px-3 pt-2 pb-1.5 border-b border-zinc-100 flex items-center gap-1.5 bg-zinc-50/50">
            <button
              type="button"
              onClick={() => setActiveTab("all")}
              className={`px-2.5 py-1 rounded text-xs font-medium cursor-pointer transition-colors ${
                activeTab === "all"
                  ? "bg-white text-zinc-900 font-semibold shadow-2xs border border-zinc-200/60"
                  : "text-zinc-500 hover:text-zinc-900"
              }`}
            >
              All ({notifications.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("unread")}
              className={`px-2.5 py-1 rounded text-xs font-medium cursor-pointer transition-colors ${
                activeTab === "unread"
                  ? "bg-white text-forest font-semibold shadow-2xs border border-zinc-200/60"
                  : "text-zinc-500 hover:text-zinc-900"
              }`}
            >
              Unread ({unreadCount})
            </button>
          </div>

          {/* Notifications Scroll List */}
          <div className="max-h-80 overflow-y-auto divide-y divide-zinc-100">
            {filteredList.length > 0 ? (
              filteredList.map((item) => {
                const { icon: Icon, color } = getIcon(item.type);
                return (
                  <div
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    className={`p-3 sm:p-3.5 flex items-start gap-3 transition-colors cursor-pointer hover:bg-zinc-50 select-none ${
                      !item.isRead ? "bg-[#EDF6F1]/30" : "bg-white"
                    }`}
                  >
                    {/* Icon Badge */}
                    <div
                      className={`size-8 rounded-full border flex items-center justify-center shrink-0 ${color}`}
                    >
                      <Icon className="size-3.5" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-2">
                        <h4
                          className={`text-xs font-semibold truncate ${
                            !item.isRead ? "text-zinc-900 font-bold" : "text-zinc-700"
                          }`}
                        >
                          {item.title}
                        </h4>
                        <span className="text-[10px] text-zinc-400 shrink-0">
                          {item.timestamp}
                        </span>
                      </div>

                      <p className="text-[11px] text-zinc-600 mt-0.5 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>

                      {item.actionLabel && (
                        <div className="mt-1.5 flex items-center gap-2">
                          <span className="text-[11px] font-semibold text-forest hover:underline">
                            {item.actionLabel} →
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Unread Dot */}
                    {!item.isRead && (
                      <span className="size-1.5 rounded-full bg-forest shrink-0 mt-1.5" />
                    )}
                  </div>
                );
              })
            ) : (
              <div className="py-8 px-4 text-center text-zinc-400 space-y-1">
                <p className="text-xs font-medium">No notifications</p>
                <p className="text-[11px]">You are all caught up!</p>
              </div>
            )}
          </div>

          {/* Footer with Settings Link */}
          <div className="p-2.5 bg-zinc-50 border-t border-zinc-100 flex items-center justify-between text-xs">
            <Link
              href={
                isEmployer
                  ? "/employer/settings/notifications"
                  : "/candidate/settings/notifications"
              }
              onClick={() => setIsOpen(false)}
              className="text-zinc-500 hover:text-zinc-900 inline-flex items-center gap-1.5 font-medium transition-colors"
            >
              <FiSettings className="size-3 text-zinc-400" />
              <span>Notification Preferences</span>
            </Link>

            <span className="text-[10px] text-zinc-400 font-medium">
              AI Recruite Alerts
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
