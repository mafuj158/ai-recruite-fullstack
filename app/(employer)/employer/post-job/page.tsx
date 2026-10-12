import type { Metadata } from "next";
import PostJobForm from "./_components/post-job-form";
import PageHeader from "@/components/shared/page-header";
import { FiPlusCircle } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Post a Job",
  description:
    "Create and publish new job openings with AI-generated job descriptions, custom screening criteria, and interview questions.",
};

export default function PostJobPage() {
  return (
    <div className="w-full space-y-3 xs:space-y-4 sm:space-y-6">
      {/* header */}
      <PageHeader
        title="Create Job Posting"
        description="Specify the role criteria to attract and match top AI-ranked talent."
        icon={FiPlusCircle}
      />
      {/*  form */}
      <PostJobForm />
    </div>
  );
}
