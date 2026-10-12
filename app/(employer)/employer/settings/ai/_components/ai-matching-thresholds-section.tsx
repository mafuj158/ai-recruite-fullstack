"use client";

import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { Slider } from "antd";
import { LuSparkles, LuCircleCheck, LuTriangleAlert } from "react-icons/lu";
import { EmployerAiSettingsFormValues } from "@/types/employer/ai-settings.types";
import { AiMatchingWeights } from "@/types/employer/post-job.types";
import { cn } from "@/lib/utils";

interface AiMatchingThresholdsSectionProps {
  setValue: UseFormSetValue<EmployerAiSettingsFormValues>;
  watch: UseFormWatch<EmployerAiSettingsFormValues>;
}

const CRITERIA_CONFIG: {
  key: keyof AiMatchingWeights;
  title: string;
  desc: string;
}[] = [
  {
    key: "skills",
    title: "Skills & Technologies",
    desc: "Weight given to programming languages, framework proficiencies, and technical stack.",
  },
  {
    key: "experience",
    title: "Experience & Seniority",
    desc: "Weight given to years in industry, past companies, and role relevance.",
  },
  {
    key: "requirements",
    title: "Job Requirements & Responsibilities",
    desc: "Alignment with day-to-day deliverables and core job scope.",
  },
  {
    key: "education",
    title: "Education & Certifications",
    desc: "Weight given to academic degree, accredited certificates, and credentials.",
  },
  {
    key: "softSkills",
    title: "Soft Skills & Communication",
    desc: "AI evaluation score from candidate pre-screening responses and emotional intelligence.",
  },
];

export default function AiMatchingThresholdsSection({
  setValue,
  watch,
}: AiMatchingThresholdsSectionProps) {
  const minPassingScore = watch("minPassingScore") ?? 75;
  const autoArchiveThreshold = watch("autoArchiveThreshold") ?? 50;
  const weights = watch("weights") || {
    skills: 30,
    experience: 25,
    requirements: 20,
    education: 15,
    softSkills: 10,
  };

  const totalWeight =
    (weights.skills || 0) +
    (weights.experience || 0) +
    (weights.requirements || 0) +
    (weights.education || 0) +
    (weights.softSkills || 0);

  const isBalanced = totalWeight === 100;

  return (
    <div className="space-y-6">
      {/* Scoring Thresholds */}
      <div className="space-y-4">
        <div>
          <h3 className="text-xs sm:text-sm md:text-base font-semibold text-zinc-900">
            Candidate Screening Thresholds
          </h3>
          <p className="text-[11px] sm:text-xs text-zinc-500 mt-0.5">
            Define baseline match benchmarks for automated pipeline actions
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Minimum Passing Score */}
          <div className="p-3.5 rounded bg-zinc-50/70 border border-zinc-200/80 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between items-start gap-1 sm:gap-2">
              <span className="text-xs font-semibold text-zinc-800">
                Minimum Match for Auto-Invite
              </span>
              <span className="text-xs font-bold px-2 py-0.5 bg-white border border-zinc-200 rounded text-forest shadow-2xs">
                {minPassingScore}%
              </span>
            </div>
            <p className="text-[11px] text-zinc-500 leading-relaxed">
              Applicants meeting or exceeding this match score will automatically be tagged as Top Match.
            </p>
            <Slider
              min={50}
              max={95}
              step={5}
              value={minPassingScore}
              onChange={(v) => setValue("minPassingScore", v, { shouldDirty: true })}
              tooltip={{ formatter: (v) => `${v}%` }}
              className="my-1.5"
            />
          </div>

          {/* Low Fit Archive Threshold */}
          <div className="p-3.5 rounded bg-zinc-50/70 border border-zinc-200/80 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between items-start gap-1 sm:gap-2">
              <span className="text-xs font-semibold text-zinc-800">
                Low-Fit Threshold
              </span>
              <span className="text-xs font-bold px-2 py-0.5 bg-white border border-zinc-200 rounded text-amber-700 shadow-2xs">
                {autoArchiveThreshold}%
              </span>
            </div>
            <p className="text-[11px] text-zinc-500 leading-relaxed">
              Applications scoring below this threshold are flagged as low compatibility.
            </p>
            <Slider
              min={20}
              max={65}
              step={5}
              value={autoArchiveThreshold}
              onChange={(v) => setValue("autoArchiveThreshold", v, { shouldDirty: true })}
              tooltip={{ formatter: (v) => `${v}%` }}
              className="my-1.5"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-100" />

      {/* Default Matching Weights */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-xs sm:text-sm md:text-base font-semibold text-zinc-900">
              Default Matching Weights
            </h3>
            <p className="text-[11px] sm:text-xs text-zinc-500 mt-0.5">
              These weights pre-populate new job listings and can be fine-tuned per role
            </p>
          </div>

          <div
            className={cn(
              "flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold self-start sm:self-auto border",
              isBalanced
                ? "bg-[#EDF6F1] text-forest border-[#D5E6DC]"
                : "bg-amber-50 text-amber-700 border-amber-200"
            )}
          >
            {isBalanced ? (
              <LuCircleCheck className="size-3.5 text-forest shrink-0" />
            ) : (
              <LuTriangleAlert className="size-3.5 text-amber-600 shrink-0" />
            )}
            <span>Total: {totalWeight}%</span>
          </div>
        </div>

        <div className="space-y-3">
          {CRITERIA_CONFIG.map((item) => {
            const val = weights[item.key] || 0;
            return (
              <div
                key={item.key}
                className="p-3 rounded bg-zinc-50/60 border border-zinc-200/80 hover:border-zinc-300 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between items-start gap-1 sm:gap-2 mb-1">
                  <span className="text-xs font-semibold text-zinc-900">
                    {item.title}
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 bg-white border border-zinc-200 rounded text-forest shadow-2xs min-w-[40px] text-center">
                    {val}%
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 mb-1">{item.desc}</p>
                <Slider
                  min={0}
                  max={60}
                  step={5}
                  value={val}
                  onChange={(v) => setValue(`weights.${item.key}`, v, { shouldDirty: true })}
                  tooltip={{ formatter: (v) => `${v}%` }}
                  className="my-1"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
