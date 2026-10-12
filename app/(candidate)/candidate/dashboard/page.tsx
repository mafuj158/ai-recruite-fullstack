import type { Metadata } from "next";
import { FiGrid } from "react-icons/fi";
import PageHeader from "@/components/shared/page-header";
import { DUMMY_CANDIDATE_DASHBOARD } from "./dummy";
import CandidateGreetingBanner from "./_components/candidate-greeting-banner";
import CandidateStatsCards from "./_components/candidate-stats-cards";
import CandidatePipelineCard from "./_components/candidate-pipeline-card";
import CandidateQuickActions from "./_components/candidate-quick-actions";
import CandidateRecommendedJobs from "./_components/candidate-recommended-jobs";
import CandidateRecentActivity from "./_components/candidate-recent-activity";

export const metadata: Metadata = {
  title: "Candidate Dashboard | AI-Recruite",
  description:
    "Personalized job matches, live application status tracking, AI interview invitations, and career analytics.",
};

export default async function CandidateDashboardPage() {

  // await new Promise((resolve) => setTimeout(resolve, 1000));
  const data = DUMMY_CANDIDATE_DASHBOARD;

  return (
    <div className="w-full space-y-3 xs:space-y-4 sm:space-y-6">
      {/* 1. Page Header */}
      <PageHeader
        title="Candidate Dashboard"
        description="Personalized job matches, live application status updates, and upcoming interview schedules."
        icon={FiGrid}
      />

      {/* 2. Candidate Greeting Banner & ATS Score Summary */}
      <CandidateGreetingBanner
        candidateName={data.candidateName}
        atsScore={data.atsScore}
        profileCompletion={data.profileCompletion}
      />

      {/* 3. 4 Overview Metric Stat Cards */}
      <CandidateStatsCards stats={data.stats} />

      {/* 4. Application Pipeline Funnel & Quick Action Shortcuts */}
      <div className="flex flex-col lg:flex-row w-full justify-between gap-4 sm:gap-6">
        <CandidatePipelineCard pipeline={data.pipeline} />
        <CandidateQuickActions />
      </div>

      {/* 5. Top AI-Recommended Jobs Feed */}
      <CandidateRecommendedJobs jobs={data.recommendedJobs} />

      {/* 6. Recent Application Activity Timeline */}
      <CandidateRecentActivity activities={data.recentActivities} />
    </div>
  );
}
