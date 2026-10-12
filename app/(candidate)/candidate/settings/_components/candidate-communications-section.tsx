"use client";

import {
  LuCircleCheck,
  LuCalendar,
  LuMessageSquare,
  LuSparkles,
} from "react-icons/lu";
import { ToggleRow } from "@/components/shared/toggle-row";
import { SettingsSection } from "@/components/shared/settings-section";

interface CandidateCommunicationsSectionProps {
  applicationStatusUpdates: boolean;
  interviewInvitations: boolean;
  chatMessages: boolean;
  aiPracticeInsights: boolean;
  onUpdate: (
    key:
      | "applicationStatusUpdates"
      | "interviewInvitations"
      | "chatMessages"
      | "aiPracticeInsights",
    val: boolean
  ) => void;
}

export const CandidateCommunicationsSection = ({
  applicationStatusUpdates,
  interviewInvitations,
  chatMessages,
  aiPracticeInsights,
  onUpdate,
}: CandidateCommunicationsSectionProps) => {
  return (
    <SettingsSection
      title="Application Lifecycle & Recruiter Communications"
      description="Stay updated on recruitment status, direct recruiter messages, and interviews"
    >
      <ToggleRow
        id="status-updates"
        title="Application Stage Changes"
        description="Notify me when an employer reviews, shortlists, or updates my job application status."
        enabled={applicationStatusUpdates}
        onChange={(val) => onUpdate("applicationStatusUpdates", val)}
        icon={LuCircleCheck}
      />

      <ToggleRow
        id="interview-invitations"
        title="Interview Scheduling Invitations"
        description="Immediate notifications when employers book interview time slots or calendar meetings."
        enabled={interviewInvitations}
        onChange={(val) => onUpdate("interviewInvitations", val)}
        icon={LuCalendar}
      />

      <ToggleRow
        id="chat-messages"
        title="Direct Employer Messages"
        description="Real-time alerts when a hiring manager or recruiter sends a direct inquiry in Candidate Chat."
        enabled={chatMessages}
        onChange={(val) => onUpdate("chatMessages", val)}
        icon={LuMessageSquare}
      />

      <ToggleRow
        id="ai-practice-feedback"
        title="AI Interview Practice Insights"
        description="Receive detailed performance breakdowns and improvement tips after completing mock interview simulations."
        enabled={aiPracticeInsights}
        onChange={(val) => onUpdate("aiPracticeInsights", val)}
        icon={LuSparkles}
      />
    </SettingsSection>
  );
};

export default CandidateCommunicationsSection;
