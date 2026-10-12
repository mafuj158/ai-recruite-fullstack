"use client";

import type { InterviewItem } from "@/types/employer/interviews.types";
import InterviewDetailHeader from "./interview-detail-header";
import InterviewMeetingCard from "./interview-meeting-card";
import InterviewTimelineCard from "./interview-timeline-card";
import InterviewEvaluationCard from "./interview-evaluation-card";
import InterviewDetailSidebar from "./interview-detail-sidebar";

interface InterviewDetailClientProps {
  interview: InterviewItem;
}

export default function InterviewDetailClient({
  interview,
}: InterviewDetailClientProps) {
  return (
    <div className="w-full space-y-4 sm:space-y-6 pb-12">
      {/* 1. Header with Breadcrumb & Candidate Summary */}
      <InterviewDetailHeader interview={interview} />

      {/* 2. Main 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start">
        {/* Left Column (7 cols on lg, 8 cols on xl): Session Details & Activity History */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-6">
          <InterviewMeetingCard interview={interview} />
          {interview.timeline && interview.timeline.length > 0 && (
            <InterviewTimelineCard timeline={interview.timeline} />
          )}
          <InterviewEvaluationCard interview={interview} />
        </div>

        {/* Right Column (5 cols on lg, 4 cols on xl): Stage Actions, Contact & Job Info */}
        <div className="lg:col-span-5 xl:col-span-4">
          <InterviewDetailSidebar interview={interview} />
        </div>
      </div>
    </div>
  );
}
