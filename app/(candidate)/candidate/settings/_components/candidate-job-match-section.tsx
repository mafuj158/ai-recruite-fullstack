"use client";

import { LuSparkles } from "react-icons/lu";
import { ToggleRow } from "@/components/shared/toggle-row";
import { SettingsSection } from "@/components/shared/settings-section";
import { RadioCard } from "@/components/shared/radio-card";

interface CandidateJobMatchSectionProps {
  jobMatchAlerts: boolean;
  minMatchScoreThreshold: number;
  alertFrequency: "instant" | "daily" | "weekly";
  onUpdateBoolean: (key: "jobMatchAlerts", val: boolean) => void;
  onUpdateFrequency: (val: "instant" | "daily" | "weekly") => void;
  onUpdateThreshold: (val: number) => void;
}

const FREQUENCY_OPTIONS: {
  id: "instant" | "daily" | "weekly";
  title: string;
  description: string;
}[] = [
  {
    id: "instant",
    title: "Instant Alerts",
    description: "Real-time notification as soon as a top matching job is published.",
  },
  {
    id: "daily",
    title: "Daily Digest",
    description: "Consolidated daily summary of new matching positions.",
  },
  {
    id: "weekly",
    title: "Weekly Digest",
    description: "Comprehensive weekly roundup sent every Monday morning.",
  },
];

export const CandidateJobMatchSection = ({
  jobMatchAlerts,
  minMatchScoreThreshold,
  alertFrequency,
  onUpdateBoolean,
  onUpdateFrequency,
  onUpdateThreshold,
}: CandidateJobMatchSectionProps) => {
  return (
    <SettingsSection
      title="AI Job Match & Discovery Alerts"
      description="Automated job discovery tuned to your verified resume skills and target positions"
    >
      <ToggleRow
        id="job-match-alerts"
        title="Automated AI Job Match Alerts"
        description="Receive curated job notifications when new vacancies closely match your verified experience."
        enabled={jobMatchAlerts}
        onChange={(val) => onUpdateBoolean("jobMatchAlerts", val)}
        icon={LuSparkles}
      />

      {jobMatchAlerts && (
        <div className="py-3 sm:py-4 space-y-4">
          {/* Minimum AI Fit Threshold */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="font-semibold text-zinc-900">
                Minimum AI Match Score Threshold
              </span>
              <span className="font-bold text-forest bg-[#EDF6F1] px-2.5 py-0.5 rounded border border-[#C2E4D2]">
                {minMatchScoreThreshold}% Match
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-zinc-500">
              Only notify me for job postings that meet or exceed this AI compatibility score.
            </p>
            <input
              type="range"
              min={60}
              max={95}
              step={5}
              value={minMatchScoreThreshold}
              onChange={(e) => onUpdateThreshold(Number(e.target.value))}
              className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-forest"
            />
            <div className="flex justify-between text-[10px] text-zinc-400 font-medium">
              <span>60% (More Jobs)</span>
              <span>80% (Recommended)</span>
              <span>95% (Exact Matches)</span>
            </div>
          </div>

          {/* Delivery Frequency */}
          <div className="space-y-2 pt-2 border-t border-zinc-100">
            <span className="text-xs sm:text-sm font-semibold text-zinc-900 block">
              Job Alert Delivery Frequency
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
              {FREQUENCY_OPTIONS.map((opt) => (
                <RadioCard
                  key={opt.id}
                  id={`frequency-${opt.id}`}
                  title={opt.title}
                  description={opt.description}
                  isSelected={alertFrequency === opt.id}
                  onSelect={() => onUpdateFrequency(opt.id)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </SettingsSection>
  );
};

export default CandidateJobMatchSection;
