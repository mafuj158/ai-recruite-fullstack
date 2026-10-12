import type { Metadata } from "next";
import { FiCalendar } from "react-icons/fi";
import PageHeader from "@/components/shared/page-header";
import { CandidateInterviewsClient } from "./_components/candidate-interviews-client";

export const metadata: Metadata = {
  title: "Scheduled Interviews | AI Recruite",
  description:
    "View and manage your upcoming and past interview rounds, access video conference links, and request rescheduling.",
};

export default async function CandidateInterviewsPage() {

  // for delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <div className="w-full space-y-3 xs:space-y-4 sm:space-y-6">
      <PageHeader
        title="Interviews"
        description="Track your live hiring sessions, access video meeting links, and manage upcoming interview rounds."
        icon={FiCalendar}
      />
      <CandidateInterviewsClient />
    </div>
  );
}
