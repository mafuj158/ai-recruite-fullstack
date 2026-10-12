import type { Metadata } from "next";
import { getCandidateJobDetailBySlug } from "./dummy";
import JobDetailsClient from "./_components/job-details-client";

interface PageProps {
  params: Promise<{ job_slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { job_slug } = await params;
  const job = getCandidateJobDetailBySlug(job_slug);

  return {
    title: `${job.title} at ${job.company} | AI-Recruite`,
    description: job.description.slice(0, 160),
  };
}

export default async function JobDetailsPage({ params }: PageProps) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const { job_slug } = await params;
  const job = getCandidateJobDetailBySlug(job_slug);

  return <JobDetailsClient job={job} />;
}