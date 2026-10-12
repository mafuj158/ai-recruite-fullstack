"use client";

import { LuUsers, LuSparkles, LuFileText } from "react-icons/lu";
import { ToggleRow } from "./toggle-row";
import { SettingsSection } from "./settings-section";
import { UpdateSettingFn } from "@/types/employer/notification.types";

interface PipelineAlertsSectionProps {
  newApplicant: boolean;
  highAiMatch: boolean;
  candidateProfileUpdate: boolean;
  onUpdate: UpdateSettingFn;
}

export const PipelineAlertsSection = ({
  newApplicant,
  highAiMatch,
  candidateProfileUpdate,
  onUpdate,
}: PipelineAlertsSectionProps) => {
  return (
    <SettingsSection
      title="Applicant & AI Pipeline Alerts"
      description="Manage updates regarding new candidates, resume submissions, and AI matches"
    >
      <ToggleRow
        id="new-applicant"
        title="New Job Applications"
        description="Notify when a candidate applies to any of your active job listings."
        enabled={newApplicant}
        onChange={(val) => onUpdate("newApplicant", val)}
        icon={LuUsers}
      />

      <ToggleRow
        id="high-ai-match"
        title="High AI Match Highlight (Score 90%+)"
        description="Priority notification when a candidate's CV scores exceptionally high on role requirements."
        enabled={highAiMatch}
        onChange={(val) => onUpdate("highAiMatch", val)}
        icon={LuSparkles}
      />

      <ToggleRow
        id="candidate-update"
        title="Candidate Profile & CV Updates"
        description="Notify if a shortlisted candidate updates their resume or portfolio links."
        enabled={candidateProfileUpdate}
        onChange={(val) => onUpdate("candidateProfileUpdate", val)}
        icon={LuFileText}
      />
    </SettingsSection>
  );
};

export default PipelineAlertsSection;
