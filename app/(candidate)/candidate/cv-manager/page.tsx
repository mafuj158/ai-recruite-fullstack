import type { Metadata } from "next";
import { FiFileText } from "react-icons/fi";
import PageHeader from "@/components/shared/page-header";
import { CVManagerClient } from "./_components/cv-manager-client";

export const metadata: Metadata = {
  title: "CV & Resume Manager | AI Recruite",
  description:
    "Upload, manage, and optimize your CVs with automated AI ATS scoring, keyword extraction, and career recommendations.",
};

export default async function CandidateCVManagerPage() {
  // for delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return (
    <div className="w-full space-y-3 xs:space-y-4 sm:space-y-6">
      <PageHeader
        title="CV & Resume Manager"
        description="Upload, evaluate, and enhance your resume with automated AI ATS scoring and keyword recommendations."
        icon={FiFileText}
      />
      <CVManagerClient />
    </div>
  );
}
