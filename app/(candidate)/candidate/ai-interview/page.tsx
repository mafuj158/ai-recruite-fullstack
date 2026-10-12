import type { Metadata } from "next";
import { FiVideo } from "react-icons/fi";
import PageHeader from "@/components/shared/page-header";
import AIInterviewListView from "./_components/ai-interview-list-view";
import { MOCK_INTERVIEW_LIST } from "./dummy";

export const metadata: Metadata = {
  title: "AI Pre-Screening Interviews | AI Recruite",
  description:
    "Complete role-specific pre-screening interviews for your job applications with automated AI evaluation reports.",
};

export default async function CandidateAIInterviewPage() {
  // for delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <div className="w-full space-y-3 xs:space-y-4 sm:space-y-6">
      <PageHeader
        title="AI Pre-Screening Interviews"
        description="Complete role-specific technical and behavioral pre-screening questions to advance your job applications to employer review."
        icon={FiVideo}
      />
      <AIInterviewListView items={MOCK_INTERVIEW_LIST} />
    </div>
  );
}
