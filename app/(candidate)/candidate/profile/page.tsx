import type { Metadata } from "next";
import { FiUser } from "react-icons/fi";
import PageHeader from "@/components/shared/page-header";
import CandidateProfileClient from "./_components/candidate-profile-client";

export const metadata: Metadata = {
  title: "Candidate Profile | AI Recruite",
  description:
    "Manage your personal identity, career preferences, verified skills, and work history for AI job matching.",
};

export default async function CandidateProfilePage() {
  // for delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return (
    <div className="w-full space-y-3 xs:space-y-4 sm:space-y-6">
      <PageHeader
        title="Candidate Profile"
        description="Manage your professional background, verified tech skills, and career preferences to attract tailored AI job matches."
        icon={FiUser}
      />

      <CandidateProfileClient />
    </div>
  );
}
