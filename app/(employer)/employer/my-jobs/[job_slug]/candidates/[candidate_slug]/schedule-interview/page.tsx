import { Metadata } from "next";
import { notFound } from "next/navigation";
import { DUMMY_JOBS } from "../../../../dummy";
import { DUMMY_CANDIDATES } from "../../dummy";
import { TOP_LEVEL_CANDIDATES } from "@/app/(employer)/employer/candidates/dummy";
import ScheduleInterviewClient from "./_components/schedule-interview-client";

interface PageProps {
  params: Promise<{ job_slug: string; candidate_slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { job_slug, candidate_slug } = await params;
  const candidate =
    DUMMY_CANDIDATES.find((c) => c.slug === candidate_slug) ||
    TOP_LEVEL_CANDIDATES.find((c) => c.slug === candidate_slug) ||
    DUMMY_CANDIDATES[0];
  const job = DUMMY_JOBS.find((j) => j.slug === job_slug) || DUMMY_JOBS[0];

  return {
    title: `Schedule Interview - ${candidate.name} | AI Recruite`,
    description: `Send an interview invitation to ${candidate.name} for the ${job.jobTitle} opening.`,
  };
}

export default async function ScheduleInterviewPage({ params }: PageProps) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const { job_slug, candidate_slug } = await params;
  const job = DUMMY_JOBS.find((j) => j.slug === job_slug) || DUMMY_JOBS[0];
  const candidate =
    DUMMY_CANDIDATES.find((c) => c.slug === candidate_slug) ||
    TOP_LEVEL_CANDIDATES.find((c) => c.slug === candidate_slug);

  if (!candidate) {
    notFound();
  }

  return (
    <div className="w-full">
      <ScheduleInterviewClient
        candidate={candidate}
        job={job}
        jobSlug={job_slug}
        candidateSlug={candidate_slug}
      />
    </div>
  );
}
