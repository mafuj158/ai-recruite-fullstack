"use client";

import { LuMail, LuBell, LuGlobe } from "react-icons/lu";
import { ToggleRow } from "@/components/shared/toggle-row";
import { SettingsSection } from "@/components/shared/settings-section";

interface CandidateChannelsSectionProps {
  emailAlerts: boolean;
  inAppAlerts: boolean;
  browserPush: boolean;
  onUpdate: (key: "emailAlerts" | "inAppAlerts" | "browserPush", val: boolean) => void;
}

export const CandidateChannelsSection = ({
  emailAlerts,
  inAppAlerts,
  browserPush,
  onUpdate,
}: CandidateChannelsSectionProps) => {
  return (
    <SettingsSection
      title="Notification Delivery Channels"
      description="Choose where and how you receive job opportunities and recruiter communications"
    >
      <ToggleRow
        id="channel-email-alerts"
        title="Email Notifications"
        description="Receive immediate alerts, job matches, and interview scheduling links directly to your inbox."
        enabled={emailAlerts}
        onChange={(val) => onUpdate("emailAlerts", val)}
        icon={LuMail}
      />

      <ToggleRow
        id="channel-inapp-alerts"
        title="In-App Notifications"
        description="Display real-time notification alerts in your candidate portal navigation header and activity feed."
        enabled={inAppAlerts}
        onChange={(val) => onUpdate("inAppAlerts", val)}
        icon={LuBell}
      />

      <ToggleRow
        id="channel-browser-push"
        title="Browser Push Notifications"
        description="Receive instant desktop alerts for urgent employer interview requests even when this tab is closed."
        enabled={browserPush}
        onChange={(val) => onUpdate("browserPush", val)}
        icon={LuGlobe}
      />
    </SettingsSection>
  );
};

export default CandidateChannelsSection;
