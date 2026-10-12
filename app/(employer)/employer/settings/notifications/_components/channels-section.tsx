"use client";

import { LuMail, LuBell, LuGlobe } from "react-icons/lu";
import { ToggleRow } from "./toggle-row";
import { SettingsSection } from "./settings-section";
import { UpdateSettingFn } from "@/types/employer/notification.types";

interface ChannelsSectionProps {
  emailAlerts: boolean;
  inAppAlerts: boolean;
  browserPush: boolean;
  onUpdate: UpdateSettingFn;
}

export const ChannelsSection = ({
  emailAlerts,
  inAppAlerts,
  browserPush,
  onUpdate,
}: ChannelsSectionProps) => {
  return (
    <SettingsSection
      title="Notification Delivery Channels"
      description="Select how and where you want to receive alerts from the platform"
    >
      <ToggleRow
        id="email-alerts"
        title="Email Notifications"
        description="Receive immediate messages and summaries directly to your registered work email."
        enabled={emailAlerts}
        onChange={(val) => onUpdate("emailAlerts", val)}
        icon={LuMail}
      />

      <ToggleRow
        id="inapp-alerts"
        title="In-App Notifications"
        description="Display real-time notifications in your dashboard header and activity center."
        enabled={inAppAlerts}
        onChange={(val) => onUpdate("inAppAlerts", val)}
        icon={LuBell}
      />

      <ToggleRow
        id="browser-push"
        title="Browser Push Notifications"
        description="Receive desktop popups for high-priority hiring alerts even when this tab is closed."
        enabled={browserPush}
        onChange={(val) => onUpdate("browserPush", val)}
        icon={LuGlobe}
      />
    </SettingsSection>
  );
};

export default ChannelsSection;
