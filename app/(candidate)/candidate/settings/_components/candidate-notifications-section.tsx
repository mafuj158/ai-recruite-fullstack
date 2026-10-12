"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import type { CandidateNotificationSettingsFormValues } from "@/types/candidate/settings.types";
import { CandidateChannelsSection } from "./candidate-channels-section";
import { CandidateCommunicationsSection } from "./candidate-communications-section";
import { CandidateJobMatchSection } from "./candidate-job-match-section";
import { CandidateNotificationsFooter } from "./candidate-notifications-footer";

interface CandidateNotificationsSectionProps {
  initialNotifications: CandidateNotificationSettingsFormValues;
}

export default function CandidateNotificationsSection({
  initialNotifications,
}: CandidateNotificationsSectionProps) {
  const [settings, setSettings] =
    useState<CandidateNotificationSettingsFormValues>(initialNotifications);
  const [isSaving, setIsSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const updateSetting = <K extends keyof CandidateNotificationSettingsFormValues>(
    key: K,
    val: CandidateNotificationSettingsFormValues[K]
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
    }, 600);
  };

  const handleReset = () => {
    setSettings(initialNotifications);
    setIsDirty(false);
    toast.success("Reset to default notification preferences");
  };

  return (
    <div className="w-full bg-white rounded p-4 sm:p-6 lg:p-8 border border-zinc-200/80 shadow-xs space-y-5 sm:space-y-6 lg:space-y-7">
      {/* 1. Notification Delivery Channels (Email, In-App, Browser Push) */}
      <CandidateChannelsSection
        emailAlerts={settings.emailAlerts}
        inAppAlerts={settings.inAppAlerts}
        browserPush={settings.browserPush}
        onUpdate={updateSetting}
      />

      <div className="border-t border-zinc-100" />

      {/* 2. Application Lifecycle & Recruiter Communications */}
      <CandidateCommunicationsSection
        applicationStatusUpdates={settings.applicationStatusUpdates}
        interviewInvitations={settings.interviewInvitations}
        chatMessages={settings.chatMessages}
        aiPracticeInsights={settings.aiPracticeInsights}
        onUpdate={updateSetting}
      />

      <div className="border-t border-zinc-100" />

      {/* 3. AI Job Match & Discovery Alerts */}
      <CandidateJobMatchSection
        jobMatchAlerts={settings.jobMatchAlerts}
        minMatchScoreThreshold={settings.minMatchScoreThreshold}
        alertFrequency={settings.alertFrequency}
        onUpdateBoolean={(key, val) => updateSetting(key, val)}
        onUpdateFrequency={(val) => updateSetting("alertFrequency", val)}
        onUpdateThreshold={(val) => updateSetting("minMatchScoreThreshold", val)}
      />

      {/* Footer Actions: Reset & Save */}
      <CandidateNotificationsFooter
        isSaving={isSaving}
        isDirty={isDirty}
        onReset={handleReset}
        onSave={handleSave}
      />
    </div>
  );
}
