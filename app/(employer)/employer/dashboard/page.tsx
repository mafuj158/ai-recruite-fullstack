import type { Metadata } from "next";
import { FiGrid } from "react-icons/fi";
import PageHeader from "@/components/shared/page-header";
import HiringFunnelChart from "./_components/hiring-funnel-chart";
import ActiveJobPostings from "./_components/active-job-postings";
import QuickActions from "./_components/quick-actions";
import StatsCards from "./_components/stats-cards";

export const metadata: Metadata = {
  title: "Employer Dashboard",
  description:
    "Comprehensive hiring command center. Monitor active job listings, applicant pipelines, AI interview scores, and recruitment analytics.",
};

export default async function EmployerDashboardPage() {

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <div className="w-full space-y-3 xs:space-y-4 sm:space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Employer Dashboard"
        description="Monitor active job listings, review applicant pipelines, and track recruitment progress."
        icon={FiGrid}
      />
      {/* stats card */}
      <StatsCards />
      {/* hiring funnel chart and quick action */}
      <div className="flex flex-col lg:flex-row w-full justify-between gap-4 sm:gap-6">
        <HiringFunnelChart />
        <QuickActions />
      </div>
      {/* active job post*/}
      <ActiveJobPostings />
    </div>
  );
}
