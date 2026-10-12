import type { Metadata } from "next";
import CandidateNotificationsSection from "../_components/candidate-notifications-section";
import { DEFAULT_NOTIFICATION_SETTINGS } from "../dummy";

export const metadata: Metadata = {
  title: "Notification Alerts",
  description:
    "Configure email, in-app, browser push delivery channels, direct recruiter message alerts, and AI job match discovery.",
};

export default async function CandidateNotificationsSettingsPage() {
  // for delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return (
    <div className="w-full">
      <CandidateNotificationsSection
        initialNotifications={DEFAULT_NOTIFICATION_SETTINGS}
      />
    </div>
  );
}
