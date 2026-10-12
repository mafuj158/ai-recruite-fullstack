import type { Metadata } from "next";
import NotificationsForm from "./_components/notifications-client";

export const metadata: Metadata = {
  title: "Notifications",
  description:
    "Configure candidate alerts, interview reminders, automated evaluation updates, and email digest frequency.",
  alternates: {
    canonical: "/employer/settings/notifications",
  },
  openGraph: {
    title: "Notification Preferences | AI-Recruite",
    description:
      "Configure candidate alerts, interview reminders, automated evaluation updates, and email digest frequency.",
    url: "/employer/settings/notifications",
    type: "website",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default async function NotificationsSettingsPage() {

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <div className="w-full">
      <NotificationsForm />
    </div>
  );
}
