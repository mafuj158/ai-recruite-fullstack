

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { DUMMY_INTERVIEWS } from "../dummy";
import InterviewDetailClient from "./_components/interview-detail-client";

interface PageProps {
  params: Promise<{ interview_slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { interview_slug } = await params;
  const interview = DUMMY_INTERVIEWS.find((i) => i.slug === interview_slug);

  if (!interview) {
    return {
      title: "Interview Not Found | AI Recruite",
    };
  }

  return {
    title: `${interview.candidateName} - Interview Assessment | AI Recruite`,
    description: `Interview session and performance assessment details for ${interview.candidateName} (${interview.jobTitle}).`,
  };
}

export default async function InterviewDetailsPage({ params }: PageProps) {

  await new Promise((resolve) => setTimeout(resolve, 1000));
  const { interview_slug } = await params;
  const interview = DUMMY_INTERVIEWS.find((i) => i.slug === interview_slug);

  if (!interview) {
    notFound();
  }

  return (
    <div className="w-full">
      <InterviewDetailClient interview={interview} />
    </div>
  );
}
