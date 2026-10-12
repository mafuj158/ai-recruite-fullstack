import { Metadata } from "next";
import { notFound } from "next/navigation";
import { DUMMY_JOBS } from "../../../dummy";
import { DUMMY_CANDIDATES } from "../dummy";
import { TOP_LEVEL_CANDIDATES } from "@/app/(employer)/employer/candidates/dummy";
import CandidateDetailClient from "./_components/candidate-detail-client";

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
    title: `${candidate.name} - Candidate Profile | AI Recruite`,
    description: `Review AI evaluation, practice interview scores, and application background for ${candidate.name} on ${job.jobTitle}.`,
  };
}

export default async function JobCandidateDetailsPage({ params }: PageProps) {
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
      <CandidateDetailClient
        initialCandidate={candidate}
        job={job}
        jobSlug={job_slug}
      />
    </div>
  );
}