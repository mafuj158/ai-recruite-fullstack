import { Metadata } from "next";
import { DUMMY_JOBS } from "../dummy";
import JobDetailsHeader from "./_components/job-details-header";
import JobMetricsStrip from "./_components/job-metrics-strip";
import JobOverviewSection from "./_components/job-overview-section";
import JobSidebarSummary from "./_components/job-sidebar-summary";

interface PageProps {
  params: Promise<{ job_slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { job_slug } = await params;
  const job = DUMMY_JOBS.find((j) => j.slug === job_slug) || DUMMY_JOBS[0];

  return {
    title: `${job.jobTitle} | Job Details | AI Recruite`,
    description:
      job.jobDescription?.slice(0, 160) ||
      "Review job specifications, candidate pipeline metrics, and hiring criteria.",
  };
}

export default async function JobDetailsPage({ params }: PageProps) {

  await new Promise((resolve) => setTimeout(resolve, 1000));
  const { job_slug } = await params;
  const job = DUMMY_JOBS.find((j) => j.slug === job_slug) || DUMMY_JOBS[0];

  return (
    <div className="w-full space-y-6">
      {/* 1. Header with Breadcrumbs, Title, Status & Actions */}
      <JobDetailsHeader job={job} />

      {/* 2. Funnel KPI Metrics Strip */}
      <JobMetricsStrip job={job} />

      {/* 3. 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 xl:gap-6 items-start">
        {/* Left Column: Job Overview & Description (7 cols on lg, 8 cols on xl) */}
        <div className="lg:col-span-7 xl:col-span-8">
          <JobOverviewSection job={job} />
        </div>

        {/* Right Column: Pipeline Access & Role Quick Facts (5 cols on lg, 4 cols on xl) */}
        <div className="lg:col-span-5 xl:col-span-4">
          <JobSidebarSummary job={job} />
        </div>
      </div>
    </div>
  );
}