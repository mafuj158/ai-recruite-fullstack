"use client";

import { LuClock, LuFileText } from "react-icons/lu";
import { ToggleRow } from "./toggle-row";
import { SettingsSection } from "./settings-section";
import { UpdateSettingFn } from "@/types/employer/notification.types";

interface JobAlertsSectionProps {
  deadlineExpiring: boolean;
  weeklyDigest: boolean;
  onUpdate: UpdateSettingFn;
}

export const JobAlertsSection = ({
  deadlineExpiring,
  weeklyDigest,
  onUpdate,
}: JobAlertsSectionProps) => {
  return (
    <SettingsSection
      title="Job Posting Deadlines & Analytics"
      description="Stay ahead of expiring vacancies and review hiring throughput"
    >
      <ToggleRow
        id="deadline-expiring"
        title="Application Deadline Reminders"
        description="Alert you 3 days and 24 hours before a job posting deadline is set to expire."
        enabled={deadlineExpiring}
        onChange={(val) => onUpdate("deadlineExpiring", val)}
        icon={LuClock}
      />

      <ToggleRow
        id="weekly-digest"
        title="Weekly Pipeline Analytics Digest"
        description="Consolidated weekly email report summarizing total applicants, interview counts, and top matches."
        enabled={weeklyDigest}
        onChange={(val) => onUpdate("weeklyDigest", val)}
        icon={LuFileText}
      />
    </SettingsSection>
  );
};

export default JobAlertsSection;
