import { Metadata } from "next";
import { DUMMY_JOBS } from "../../dummy";
import JobCandidateLists from "./_components/candidate-lists";

interface PageProps {
  params: Promise<{ job_slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { job_slug } = await params;
  const job = DUMMY_JOBS.find((j) => j.slug === job_slug) || DUMMY_JOBS[0];

  return {
    title: `${job.jobTitle} - Candidates | AI Recruite`,
    description: `Review AI-screened candidate profiles, match scores, and interview pipeline for ${job.jobTitle}.`,
  };
}

export default async function JobCandidatesPage({ params }: PageProps) {

  await new Promise((resolve) => setTimeout(resolve, 1000));
  const { job_slug } = await params;
  const job = DUMMY_JOBS.find((j) => j.slug === job_slug) || DUMMY_JOBS[0];

  return (
    <div className="w-full">
      <JobCandidateLists job={job} jobSlug={job_slug} />
    </div>
  );
}