"use client";

import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { Slider } from "antd";
import { LuSparkles, LuBrain, LuCircleCheck, LuTriangleAlert } from "react-icons/lu";
import { AiMatchingWeights, CreateJobPayload } from "@/types/employer/post-job.types";
import { cn } from "@/lib/utils";

interface AiMatchingSectionProps {
  setValue: UseFormSetValue<CreateJobPayload>;
  watch: UseFormWatch<CreateJobPayload>;
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
    name: "Balanced Default",
    weights: {
      skills: 30,
      experience: 25,
      requirements: 20,
      education: 15,
      softSkills: 10,
    },
  },
  {
    name: "Tech Heavy (Coding First)",
    weights: {
      skills: 45,
      experience: 20,
      requirements: 20,
      education: 5,
      softSkills: 10,
    },
  },
  {
    name: "Leadership & Senior Focus",
    weights: {
      skills: 20,
      experience: 35,
      requirements: 20,
      education: 10,
      softSkills: 15,
    },
  },
];

export default function AiMatchingSection({
  setValue,
  watch,
}: AiMatchingSectionProps) {
  const currentWeights: AiMatchingWeights = watch("matchingWeights") || {
    skills: 30,
    experience: 25,
    requirements: 20,
    education: 15,
    softSkills: 10,
  };

  const total =
    (currentWeights.skills || 0) +
    (currentWeights.experience || 0) +
    (currentWeights.requirements || 0) +
    (currentWeights.education || 0) +
    (currentWeights.softSkills || 0);

  const isExact100 = total === 100;

  const handleSliderChange = (key: keyof AiMatchingWeights, val: number) => {
    setValue(`matchingWeights.${key}`, val, { shouldValidate: true });
  };

  const applyPreset = (presetWeights: AiMatchingWeights) => {
    setValue("matchingWeights", presetWeights, { shouldValidate: true });
  };

  return (
    <div className="space-y-5 rounded border border-zinc-200/90 p-4 sm:p-5 lg:p-6 bg-zinc-50/50">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="size-6 rounded bg-[#EDF6F1] flex items-center justify-center text-forest">
              <LuBrain className="size-3.5" />
            </span>
            <h2 className="text-sm sm:text-base font-semibold text-zinc-900">
              AI Candidate Match Weights
            </h2>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              ATS Formula
            </span>
          </div>
          <p className="text-xs text-zinc-500 mt-0.5">
            Set percentage weights to calibrate AI ranking for inbound applicants
          </p>
        </div>

        {/* Total Weight Counter Badge */}
        <div
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold transition-all self-start sm:self-auto",
            isExact100
              ? "bg-[#EDF6F1] text-forest border border-[#D5E6DC]"
              : "bg-amber-50 text-amber-700 border border-amber-200 animate-pulse"
          )}
        >
          {isExact100 ? (
            <LuCircleCheck className="size-3.5 text-forest" />
          ) : (
            <LuTriangleAlert className="size-3.5 text-amber-600" />
          )}
          <span>Total Weight: {total}%</span>
          {!isExact100 && (
            <span className="text-[10px] font-normal hidden md:inline">
              (Aim for 100%)
            </span>
          )}
        </div>
      </div>

      {/* Quick Presets */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        <span className="text-xs font-medium text-zinc-500 mr-1 flex items-center gap-1">
          <LuSparkles className="size-3 text-forest" /> Quick Presets:
        </span>
        {PRESETS.map((p) => (
          <button
            key={p.name}
            type="button"
            onClick={() => applyPreset(p.weights)}
            className="text-xs px-2.5 py-1 rounded bg-white border border-zinc-200 text-zinc-700 hover:border-forest hover:text-forest transition-colors shadow-2xs cursor-pointer font-medium"
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Sliders Grid */}
      <div className="space-y-4 pt-2">
        {CRITERIA_CONFIG.map((c) => {
          const val = currentWeights[c.key] || 0;

          return (
            <div
              key={c.key}
              className="p-3 sm:p-3.5 rounded bg-white border border-zinc-200/70 space-y-2 hover:border-zinc-300 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-zinc-900">
                    {c.title}
                  </h4>
                  <p className="text-[11px] text-zinc-500 leading-tight">
                    {c.desc}
                  </p>
                </div>
                <div className="flex items-center gap-1 ml-3 shrink-0">
                  <span className="text-sm font-bold text-forest">{val}</span>
                  <span className="text-xs text-zinc-400">%</span>
                </div>
              </div>

              <Slider
                min={0}
                max={60}
                step={5}
                value={val}
                onChange={(value) => handleSliderChange(c.key, value)}
                styles={{
                  track: { backgroundColor: "#244034" },
                  handle: { borderColor: "#244034" },
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
