import type { Metadata } from "next";
import { FiSearch } from "react-icons/fi";
import PageHeader from "@/components/shared/page-header";
import FindJobsClient from "./_components/find-jobs-client";

export const metadata: Metadata = {
  title: "Find Jobs | AI-Recruite",
  description:
    "Explore AI-matched tech opportunities tailored to your skills, experience, and salary preferences. Filter by remote, contract, or full-time roles.",
};

export default async function FindJobsPage() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return (
    <div className="w-full space-y-3 xs:space-y-4 sm:space-y-6">
      {/* 1. Page Header */}
      <PageHeader
        title="Find Jobs"
        description="Explore AI-matched tech opportunities tailored to your verified skills, experience level, and preferred work arrangement."
        icon={FiSearch}
      />

      {/* 2. Main Search & Filter Interface */}
      <FindJobsClient />
    </div>
  );
}
