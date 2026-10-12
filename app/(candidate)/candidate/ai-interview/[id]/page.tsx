import type { Metadata } from "next";
import Link from "next/link";
import { FiVideo, FiArrowLeft } from "react-icons/fi";
import PageHeader from "@/components/shared/page-header";
import { getInterviewById } from "@/app/(candidate)/candidate/ai-interview/dummy";
import AIInterviewDetailClient from "./_components/ai-interview-detail-client";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {

  const { id } = await params;


  const interview = getInterviewById(id);

  if (!interview) {
    return {
      title: "Pre-Screening Interview | AI Recruite",
    };
  }

  return {
    title: `${interview.jobTitle} - AI Pre-Screening | ${interview.companyName}`,
    description: `Complete the role-specific AI pre-screening interview for ${interview.jobTitle} at ${interview.companyName}.`,
  };
}

export default async function CandidateAIInterviewDetailPage({
  params,
}: PageProps) {
  // for delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const { id } = await params;
  const interview = getInterviewById(id);

  if (!interview) {
    return (
      <div className="w-full space-y-4">
        <PageHeader
          title="Pre-Screening Interview"
          description="Role-specific AI pre-screening details and assessment."
          icon={FiVideo}
        />
        <div className="bg-white border border-zinc-200/80 rounded p-8 sm:p-12 text-center shadow-2xs space-y-3">
          <div className="size-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto">
            <FiVideo className="size-5" />
          </div>
          <h3 className="text-base font-bold text-zinc-900">
            Interview Not Found
          </h3>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto">
            The requested AI pre-screening interview could not be found or has expired.
          </p>
          <Link
            href="/candidate/ai-interview"
            className="h-9 px-4 rounded bg-forest text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <FiArrowLeft className="size-3.5" />
            <span>Back to All Pre-Screenings</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-3 xs:space-y-4 sm:space-y-6">
      <PageHeader
        title={interview.jobTitle}
        description={`AI Pre-Screening Interview for ${interview.companyName} (${interview.department})`}
        icon={FiVideo}
      />
      <AIInterviewDetailClient job={interview} />
    </div>
  );
}
