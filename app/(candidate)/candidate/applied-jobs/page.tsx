import type { Metadata } from "next";
import { FiBriefcase } from "react-icons/fi";
import PageHeader from "@/components/shared/page-header";
import AppliedJobsClient from "./_components/applied-jobs-client";

export const metadata: Metadata = {
  title: "My Applications | AI Recruite",
  description:
    "Track your applied job positions, recruiter review stages, AI interview invitations, and application progress.",
};

export default async function AppliedJobsPage() {

  // for delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <div className="w-full space-y-4 sm:space-y-6">
      <PageHeader
        title="My Applications"
        description="Track your applied positions, recruiter review stages, and upcoming interview invitations."
        icon={FiBriefcase}
      />
      <AppliedJobsClient />
    </div>
  );
}
