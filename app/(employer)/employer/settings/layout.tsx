import type { ReactNode } from "react";
import type { Metadata } from "next";
import { FiSettings } from "react-icons/fi";
import PageHeader from "@/components/shared/page-header";
import SettingsTabs from "./_components/settings-tabs";

export const metadata: Metadata = {
  title: {
    default: "Account Settings | AI-Recruite",
    template: "%s | Account Settings | AI-Recruite",
  },
  description:
    "Manage company profile identity, recruitment notifications, password security, and organization controls.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
  alternates: {
    canonical: "/employer/settings/company-profile",
  },
  openGraph: {
    title: "Account Settings | AI-Recruite",
    description:
      "Manage company profile identity, recruitment notifications, password security, and organization controls.",
    siteName: "AI-Recruite",
    type: "website",
  },
};

export default function SettingsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="w-full space-y-3 xs:space-y-4 sm:space-y-6">
      {/* Settings Header */}
      <PageHeader
        title="Account Settings"
        description="Manage your account preferences, company profile information, and recruitment controls."
        icon={FiSettings}
      />

      {/* Settings Navigation Tabs */}
      <SettingsTabs />

      {/* Tab Page Content */}
      <div className="w-full">{children}</div>
    </div>
  );
}
