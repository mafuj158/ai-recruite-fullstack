"use client";

import { SettingsSection } from "./settings-section";
import { RadioCard } from "./radio-card";
import { DigestFrequency } from "@/types/employer/notification.types";

interface DigestFrequencySectionProps {
  value: DigestFrequency;
  onChange: (frequency: DigestFrequency) => void;
}

const FREQUENCY_OPTIONS: {
  id: DigestFrequency;
  label: string;
  description: string;
}[] = [
  {
    id: "instant",
    label: "Real-Time / Instant",
    description: "Sent immediately as actions occur",
  },
  {
    id: "daily",
    label: "Daily Summary",
    description: "One digest email delivered at 9:00 AM",
  },
  {
    id: "weekly",
    label: "Weekly Overview",
    description: "Consolidated report every Monday",
  },
];

export const DigestFrequencySection = ({
  value,
  onChange,
}: DigestFrequencySectionProps) => {
  return (
    <SettingsSection
      title="Email Digest Frequency"
      description="Choose how frequently non-urgent updates are bundled together"
      cardContainer={false}
      className="space-y-3"
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
        {FREQUENCY_OPTIONS.map((item) => (
          <RadioCard
            key={item.id}
            id={`freq-${item.id}`}
            title={item.label}
            description={item.description}
            isSelected={value === item.id}
            onSelect={() => onChange(item.id)}
          />
        ))}
      </div>
    </SettingsSection>
  );
};

export default DigestFrequencySection;
