"use client";

import { LuCalendar, LuClock, LuCheck } from "react-icons/lu";
import { ToggleRow } from "./toggle-row";
import { SettingsSection } from "./settings-section";
import { UpdateSettingFn } from "@/types/employer/notification.types";

interface InterviewAlertsSectionProps {
  interviewConfirmed: boolean;
  interviewReminder24h: boolean;
  postInterviewEvaluation: boolean;
  onUpdate: UpdateSettingFn;
}

export const InterviewAlertsSection = ({
  interviewConfirmed,
  interviewReminder24h,
  postInterviewEvaluation,
  onUpdate,
}: InterviewAlertsSectionProps) => {
  return (
    <SettingsSection
      title="Interview & Calendar Reminders"
      description="Keep your hiring team synchronized on scheduled Zoom and Google Meet sessions"
    >
      <ToggleRow
        id="interview-confirm"
        title="Interview Schedule & Changes"
        description="Receive immediate alerts when interviews are scheduled, rescheduled, or cancelled."
        enabled={interviewConfirmed}
        onChange={(val) => onUpdate("interviewConfirmed", val)}
        icon={LuCalendar}
      />

      <ToggleRow
        id="interview-reminder"
        title="24-Hour Interview Reminder"
        description="Send an automated reminder with the meeting link 24 hours prior to scheduled calls."
        enabled={interviewReminder24h}
        onChange={(val) => onUpdate("interviewReminder24h", val)}
        icon={LuClock}
      />

      <ToggleRow
        id="post-interview"
        title="Post-Interview Feedback Prompts"
        description="Prompt interviewers to record ratings and submit interview scorecards after a call concludes."
        enabled={postInterviewEvaluation}
        onChange={(val) => onUpdate("postInterviewEvaluation", val)}
        icon={LuCheck}
      />
    </SettingsSection>
  );
};

export default InterviewAlertsSection;
