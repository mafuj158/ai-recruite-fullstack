import type { Metadata } from "next";
import InterviewsClient from "./_components/interviews-client";
import PageHeader from "@/components/shared/page-header";
import { LuCalendar } from "react-icons/lu";

export const metadata: Metadata = {
  title: "Interviews Management | AI Recruite",
  description:
    "Review candidate interview schedules, conduct technical assessments, and review scorecards.",
};

export default async function EmployerInterviewsPage() {
 
 await new Promise((resolve) => setTimeout(resolve, 1000));
 
  return (
    <div className="w-full space-y-3 xs:space-y-4 sm:space-y-6">
      <PageHeader
        title="Interviews Management"
        description="Track video interviews, review candidate performance scorecards, and coordinate panel evaluations."
        icon={LuCalendar}
      />
      <InterviewsClient />
    </div>
  );
}

