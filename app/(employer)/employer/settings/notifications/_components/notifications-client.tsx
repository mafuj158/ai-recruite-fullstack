"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { DEFAULT_SETTINGS, NotificationSettingsState } from "@/types/employer/notification.types";
import { ChannelsSection } from "./channels-section";
import { PipelineAlertsSection } from "./pipeline-alerts-section";
import { InterviewAlertsSection } from "./interview-alerts-section";
import { JobAlertsSection } from "./job-alerts-section";
import { DigestFrequencySection } from "./digest-frequency-section";
import { NotificationsFooter } from "./notifications-footer";

export function NotificationsClient() {
  const [settings, setSettings] = useState<NotificationSettingsState>(DEFAULT_SETTINGS);
  const [isSaving, setIsSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const updateSetting = <K extends keyof NotificationSettingsState>(
    key: K,
    val: NotificationSettingsState[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: val }));
    setIsDirty(true);
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsDirty(false);
      toast.success("Notification preferences saved successfully!");
    }, 700);
  };

  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS);
    setIsDirty(false);
    toast.success("Reset to default notification preferences");
  };

  return (
    <div className="w-full bg-white rounded p-4 sm:p-6 lg:p-8 border border-zinc-200/80 shadow-xs space-y-5 sm:space-y-6 lg:space-y-7">
      {/* 1. Notification Channels */}
      <ChannelsSection
        emailAlerts={settings.emailAlerts}
        inAppAlerts={settings.inAppAlerts}
        browserPush={settings.browserPush}
        onUpdate={updateSetting}
      />

      <div className="border-t border-zinc-100" />

      {/* 2. Applicant & AI Pipeline Alerts */}
      <PipelineAlertsSection
        newApplicant={settings.newApplicant}
        highAiMatch={settings.highAiMatch}
        candidateProfileUpdate={settings.candidateProfileUpdate}
        onUpdate={updateSetting}
      />

      <div className="border-t border-zinc-100" />

      {/* 3. Interview & Calendar Notifications */}
      <InterviewAlertsSection
        interviewConfirmed={settings.interviewConfirmed}
        interviewReminder24h={settings.interviewReminder24h}
        postInterviewEvaluation={settings.postInterviewEvaluation}
        onUpdate={updateSetting}
      />

      <div className="border-t border-zinc-100" />

      {/* 4. Job Postings & Analytics Digest */}
      <JobAlertsSection
        deadlineExpiring={settings.deadlineExpiring}
        weeklyDigest={settings.weeklyDigest}
        onUpdate={updateSetting}
      />

      <div className="border-t border-zinc-100" />

      {/* 5. Notification Frequency */}
      <DigestFrequencySection
        value={settings.digestFrequency}
        onChange={(val) => updateSetting("digestFrequency", val)}
      />

      {/* Footer Actions */}
      <NotificationsFooter
        isSaving={isSaving}
        isDirty={isDirty}
        onReset={handleReset}
        onSave={handleSave}
      />
    </div>
  );
}

export default NotificationsClient;
