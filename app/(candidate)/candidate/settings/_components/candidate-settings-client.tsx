"use client";

import { useState } from "react";
import { FiShield, FiBell, FiEye } from "react-icons/fi";
import { cn } from "@/lib/utils";
import { CandidateSettingsTab } from "@/types/candidate/settings.types";
import {
  DEFAULT_ACCOUNT_SECURITY,
  DEFAULT_NOTIFICATION_SETTINGS,
  DEFAULT_PRIVACY_SETTINGS,
  DEFAULT_SESSION_DEVICES,
} from "../dummy";
import CandidateAccountSecuritySection from "./candidate-account-security-section";
import CandidateSessionsSection from "./candidate-sessions-section";
import CandidateNotificationsSection from "./candidate-notifications-section";
import CandidatePrivacyVisibilitySection from "./candidate-privacy-visibility-section";

const TABS: { id: CandidateSettingsTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "security", label: "Account & Security", icon: FiShield },
  { id: "notifications", label: "Notification Alerts", icon: FiBell },
  { id: "privacy", label: "Privacy & Recruiter Visibility", icon: FiEye },
];

export default function CandidateSettingsClient() {
  const [activeTab, setActiveTab] = useState<CandidateSettingsTab>("security");

  return (
    <div className="w-full space-y-6">
      {/* Navigation Tabs Bar */}
      <div className="relative border-b border-zinc-200/90 flex items-center min-w-0 max-w-full">
        <nav
          aria-label="Candidate settings sections"
          className="flex items-center gap-1 sm:gap-2 overflow-x-auto scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden min-w-0 flex-1 -mb-px"
        >
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "group relative flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-medium transition-all duration-150 rounded-t-lg shrink-0 select-none whitespace-nowrap cursor-pointer",
                  isActive
                    ? "bg-[#EDF6F1] text-forest font-semibold border-b-2 border-forest"
                    : "text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50/80 border-b-2 border-transparent"
                )}
              >
                <Icon
                  className={cn(
                    "size-3.5 sm:size-4 transition-colors shrink-0",
                    isActive
                      ? "text-forest"
                      : "text-zinc-400 group-hover:text-zinc-600"
                  )}
                />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Active Tab Content */}
      <div className="w-full">
        {activeTab === "security" && (
          <div className="space-y-4 sm:space-y-6">
            <CandidateAccountSecuritySection
              initialSecurity={DEFAULT_ACCOUNT_SECURITY}
            />
            <CandidateSessionsSection initialDevices={DEFAULT_SESSION_DEVICES} />
          </div>
        )}

        {activeTab === "notifications" && (
          <CandidateNotificationsSection
            initialNotifications={DEFAULT_NOTIFICATION_SETTINGS}
          />
        )}

        {activeTab === "privacy" && (
          <CandidatePrivacyVisibilitySection
            initialPrivacy={DEFAULT_PRIVACY_SETTINGS}
          />
        )}
      </div>
    </div>
  );
}
