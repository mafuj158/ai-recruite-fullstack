import type { ReactNode } from "react";
import type { Metadata } from "next";
import { FiSettings } from "react-icons/fi";
import PageHeader from "@/components/shared/page-header";
import CandidateSettingsTabs from "./_components/settings-tabs";

export const metadata: Metadata = {
  title: {
    default: "Candidate Settings | AI Recruite",
    template: "%s | Candidate Settings | AI Recruite",
  },
  description:
    "Manage your candidate account credentials, notification alerts, and privacy preferences.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function CandidateSettingsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="w-full space-y-3 xs:space-y-4 sm:space-y-6">
      {/* Settings Header */}
      <PageHeader
        title="Account Settings"
        description="Manage your account security, job alert notifications, and recruiter privacy preferences."
        icon={FiSettings}
      />

      {/* Settings Navigation Tabs */}
      <CandidateSettingsTabs />

      {/* Tab Page Content */}
      <div className="w-full">{children}</div>
    </div>
  );
}
