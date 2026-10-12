"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { CandidateJobDetail } from "@/types/candidate/job-details.types";
import JobDetailsHeader from "./job-details-header";
import JobDetailsOverview from "./job-details-overview";
import JobDetailsAiInsights from "./job-details-ai-insights";
import JobDetailsSidebar from "./job-details-sidebar";
import JobApplyModal from "./job-apply-modal";

interface JobDetailsClientProps {
  job: CandidateJobDetail;
}

export default function JobDetailsClient({ job }: JobDetailsClientProps) {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const isExpired = job.status === "expired";

  const handleOpenApplyModal = () => {
    if (isExpired) {
      toast.error("This job position has expired and is no longer accepting applications.");
      return;
    }
    setIsApplyModalOpen(true);
  };

  return (
    <div className="w-full space-y-5 sm:space-y-6">
      {/* 1. Top Header with Breadcrumbs, Avatar, Title, Status & Primary Actions */}
      <JobDetailsHeader job={job} onApplyClick={handleOpenApplyModal} />

      {/* 2. Responsive 2-Column Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 xl:gap-6 items-start">
        {/* Left Column: Job Overview, Responsibilities, Requirements & Benefits (7 cols on lg, 8 cols on xl) */}
        <div className="lg:col-span-7 xl:col-span-8 min-w-0">
          <JobDetailsOverview job={job} />
        </div>

        {/* Right Column: AI Match Score Insights & Job Quick Facts Sidebar (5 cols on lg, 4 cols on xl) */}
        <div className="lg:col-span-5 xl:col-span-4 min-w-0 space-y-4 sm:space-y-5 lg:sticky lg:top-20">
          <JobDetailsAiInsights job={job} />
          <JobDetailsSidebar job={job} onApplyClick={handleOpenApplyModal} />
        </div>
      </div>

      {/* 3. Interactive Apply Flow & AI Cover Letter Modal */}
      <JobApplyModal
        job={job}
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
      />
    </div>
  );
}
