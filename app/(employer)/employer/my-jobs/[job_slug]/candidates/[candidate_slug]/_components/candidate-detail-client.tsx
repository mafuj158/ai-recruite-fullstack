"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Candidate, CandidateStatus } from "@/types/employer/candidates.types";
import { EmployerJob } from "@/types/employer/my-jobs.types";
import CandidateDetailHeader from "./candidate-detail-header";
import AiInterviewScoreCards from "./ai-interview-score-cards";
import CandidateResumeSkillsSection from "./candidate-resume-skills-section";
import CandidateDetailSidebar from "./candidate-detail-sidebar";
import { STATUS_CONFIG } from "../../../../../_components/candidate-card";

interface CandidateDetailClientProps {
  initialCandidate: Candidate;
  job: EmployerJob;
  jobSlug: string;
}

export default function CandidateDetailClient({
  initialCandidate,
  job,
  jobSlug,
}: CandidateDetailClientProps) {
  const [candidate, setCandidate] = useState<Candidate>(initialCandidate);

  const handleStatusChange = (newStatus: CandidateStatus) => {
    setCandidate((prev) => ({ ...prev, status: newStatus }));
    const statusLabel = STATUS_CONFIG[newStatus].label;
    toast.success(`Updated ${candidate.name}'s stage to ${statusLabel}`);
  };

  return (
    <div className="w-full space-y-6">
      {/* 1. Header with Breadcrumbs, Candidate Info & Stage Selector */}
      <CandidateDetailHeader
        candidate={candidate}
        job={job}
        jobSlug={jobSlug}
        onStatusChange={handleStatusChange}
      />

      {/* 2. Main 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 xl:gap-6 items-start">
        {/* Left Column (7 cols on lg, 8 cols on xl): AI Practice Interview Results + Profile & Skills */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-6">
          {/* AI Practice Interview Evaluation (Confidence, Communication, EQ, Recommendation) */}
          <AiInterviewScoreCards
            interviewResult={candidate.aiInterviewResult}
            candidateName={candidate.name}
          />

          {/* Profile, Skills Breakdown, Work History & Credentials */}
          <CandidateResumeSkillsSection candidate={candidate} />
        </div>

        {/* Right Column (5 cols on lg, 4 cols on xl): Stage Actions, Contact & Job Info */}
        <div className="lg:col-span-5 xl:col-span-4">
          <CandidateDetailSidebar
            candidate={candidate}
            job={job}
            jobSlug={jobSlug}
            onStatusChange={handleStatusChange}
          />
        </div>
      </div>
    </div>
  );
}
