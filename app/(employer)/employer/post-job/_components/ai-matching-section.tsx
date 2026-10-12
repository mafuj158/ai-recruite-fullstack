"use client";

import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { Slider } from "antd";
import { LuSparkles, LuBrain, LuCircleCheck, LuTriangleAlert } from "react-icons/lu";
import { AiMatchingWeights, PostJobFormValues } from "@/types/employer/post-job.types";
import { cn } from "@/lib/utils";

interface AiMatchingSectionProps {
  setValue: UseFormSetValue<PostJobFormValues>;
  watch: UseFormWatch<PostJobFormValues>;
}

const CRITERIA_CONFIG: {
  key: keyof AiMatchingWeights;
  title: string;
  desc: string;
}[] = [
  {
    key: "skills",
    title: "Skills & Technologies",
    desc: "Weight given to required programming languages, tools, and technical competencies.",
  },
  {
    key: "experience",
    title: "Work Experience & Seniority",
    desc: "Weight given to overall years of experience, relevant industry roles, and track record.",
  },
  {
    key: "requirements",
    title: "Job Requirements & Responsibilities",
    desc: "Alignment with specified day-to-day deliverables and core responsibilities.",
  },
  {
    key: "education",
    title: "Education & Qualifications",
    desc: "Weight given to academic degree, technical certifications, and formal credentials.",
  },
  {
    key: "softSkills",
    title: "Soft Skills & Communication",
    desc: "AI evaluation score from candidate pre-screening interview and collaborative traits.",
  },
];

const PRESETS: {
  name: string;
  weights: AiMatchingWeights;
}[] = [
  {
    name: "Balanced",
    weights: { skills: 30, experience: 25, requirements: 20, education: 15, softSkills: 10 },
  },
  {
    name: "Skills-Heavy",
    weights: { skills: 45, experience: 20, requirements: 15, education: 10, softSkills: 10 },
  },
  {
    name: "Experience-Heavy",
    weights: { skills: 20, experience: 45, requirements: 15, education: 10, softSkills: 10 },
  },
];

export default function AiMatchingSection({
  setValue,
  watch,
}: AiMatchingSectionProps) {
  const weights: AiMatchingWeights = watch("matchingWeights") || {
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

  const handleSliderChange = (key: keyof AiMatchingWeights, value: number) => {
    setValue(`matchingWeights.${key}`, value, { shouldValidate: true });
  };

  const applyPreset = (presetWeights: AiMatchingWeights) => {
    setValue("matchingWeights", presetWeights, { shouldValidate: true });
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-100">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5 sm:gap-3 min-w-0">
          <div className="flex items-center justify-between w-full sm:w-auto">
            <div className="size-9 rounded-lg bg-[#EDF6F1] border border-[#D5E6DC] flex items-center justify-center text-forest shrink-0">
              <LuBrain className="size-5" />
            </div>
            <span className="sm:hidden inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#EDF6F1] text-forest border border-[#D5E6DC] whitespace-nowrap shrink-0">
              <LuSparkles className="size-3 text-forest" />
              AI Powered
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <h3 className="text-sm sm:text-base font-semibold text-zinc-900 leading-snug">
                AI Candidate Matching Configuration
              </h3>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#EDF6F1] text-forest border border-[#D5E6DC] whitespace-nowrap shrink-0">
                <LuSparkles className="size-3 text-forest" />
                AI Powered
              </span>
            </div>
            <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
              Configure how the AI ranks and calculates compatibility scores for applicants
            </p>
          </div>
        </div>

        {/* Total Badge */}
        <div
          className={cn(
            "flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold self-start sm:self-auto border whitespace-nowrap shrink-0",
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

      {/* Quick Presets */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-zinc-500 font-medium">Quick Presets:</span>
        {PRESETS.map((preset) => {
          const isActive =
            weights.skills === preset.weights.skills &&
            weights.experience === preset.weights.experience &&
            weights.requirements === preset.weights.requirements;

          return (
            <button
              key={preset.name}
              type="button"
              onClick={() => applyPreset(preset.weights)}
              className={cn(
                "text-xs px-2.5 py-1 rounded border font-medium transition-colors cursor-pointer",
                isActive
                  ? "bg-forest text-white border-forest"
                  : "bg-zinc-50 hover:bg-zinc-100 text-zinc-700 border-zinc-200"
              )}
            >
              {preset.name}
            </button>
          );
        })}
      </div>

      {/* Sliders Grid */}
      <div className="space-y-3 pt-1">
        {CRITERIA_CONFIG.map((item) => {
          const val = weights[item.key] || 0;

          return (
            <div
              key={item.key}
              className="p-3.5 rounded bg-zinc-50/80 border border-zinc-200/80 hover:border-zinc-300 transition-colors"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs sm:text-sm font-semibold text-zinc-900">
                  {item.title}
                </span>
                <span className="text-xs font-bold px-2 py-0.5 bg-white border border-zinc-200 rounded text-forest min-w-[42px] text-center shadow-2xs">
                  {val}%
                </span>
              </div>

              <p className="text-[11px] text-zinc-500 mb-2">{item.desc}</p>

              <Slider
                min={0}
                max={100}
                value={val}
                onChange={(value) => handleSliderChange(item.key, value)}
                tooltip={{ formatter: (v) => `${v}%` }}
                className="my-1.5"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
