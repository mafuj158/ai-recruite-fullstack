"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Candidate } from "@/types/employer/candidates.types";
import { EmployerJob } from "@/types/employer/my-jobs.types";
import { ScheduleInterviewFormValues } from "@/types/employer/schedule-interview.types";
import ScheduleInterviewHeader from "./schedule-interview-header";
import ScheduleInterviewForm from "./schedule-interview-form";
import ScheduleInterviewSidebar from "./schedule-interview-sidebar";

interface ScheduleInterviewClientProps {
  candidate: Candidate;
  job: EmployerJob;
  jobSlug: string;
  candidateSlug: string;
}

export default function ScheduleInterviewClient({
  candidate,
  job,
  jobSlug,
  candidateSlug,
}: ScheduleInterviewClientProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: ScheduleInterviewFormValues) => {
    setIsSubmitting(true);
    try {
      // Simulate API call to schedule interview and update stage to interview_scheduled
      await new Promise((resolve) => setTimeout(resolve, 800));

      toast.success(
        `Interview invitation sent to ${candidate.name}! Calendar invite dispatched.`
      );

      // Navigate back to Candidate Profile
      router.push(`/employer/my-jobs/${jobSlug}/candidates/${candidateSlug}`);
    } catch {
      toast.error("Failed to send interview invitation. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push(`/employer/my-jobs/${jobSlug}/candidates/${candidateSlug}`);
  };

  return (
    <div className="w-full space-y-6">
      {/* 1. Top Header Banner with Back Button */}
      <ScheduleInterviewHeader
        candidateName={candidate.name}
        candidateSlug={candidateSlug}
        jobSlug={jobSlug}
        jobTitle={job.jobTitle}
      />

      {/* 2. Main 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Form (8 cols) */}
        <div className="lg:col-span-8">
          <ScheduleInterviewForm
            candidateName={candidate.name}
            jobTitle={job.jobTitle}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isSubmitting={isSubmitting}
          />
        </div>

        {/* Right Column: Candidate Context, Tips & Next Steps (4 cols) */}
        <div className="lg:col-span-4">
          <ScheduleInterviewSidebar
            candidate={candidate}
            jobTitle={job.jobTitle}
          />
        </div>
      </div>
    </div>
  );
}
