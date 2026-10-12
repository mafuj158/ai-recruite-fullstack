import { Metadata } from "next";
import CandidatesExplorer from "./_components/candidates-explorer";
import PageHeader from "@/components/shared/page-header";
import { FiUsers } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Candidates Explorer | AI Recruite",
  description:
    "Search, evaluate, and manage candidate talent across all active jobs with AI-ranked matching scores and pre-screening insights.",
};

export default function CandidatesPage() {
  return (
    <div className="w-full space-y-3 xs:space-y-4 sm:space-y-6">
      {/* header */}
      <PageHeader
        title="Candidates Explorer"
        description="Search, evaluate, and manage candidates across all active job requisitions with AI-ranked matching."
        icon={FiUsers}
      />
      {/* content */}
      <CandidatesExplorer />
    </div>
  );
}
