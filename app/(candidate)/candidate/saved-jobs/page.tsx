import type { Metadata } from "next";
import { FiBookmark } from "react-icons/fi";
import PageHeader from "@/components/shared/page-header";
import SavedJobsClient from "./_components/saved-jobs-client";

export const metadata: Metadata = {
  title: "Saved Jobs | AI Recruite",
  description:
    "View and manage your bookmarked job listings, compare salary ranges, and quickly apply when ready.",
};

export default async function SavedJobsPage() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return (
    <div className="w-full space-y-3 xs:space-y-4 sm:space-y-6">
      <PageHeader
        title="Saved Jobs"
        description="Review your bookmarked tech positions, compare compensation packages, and apply when ready."
        icon={FiBookmark}
      />
      <SavedJobsClient />
    </div>
  );
}
