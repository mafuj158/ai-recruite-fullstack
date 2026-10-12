"use client";

import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { LuFileText, LuSmile, LuCompass, LuCheck } from "react-icons/lu";
import { EmployerAiSettingsFormValues } from "@/types/employer/ai-settings.types";
import { cn } from "@/lib/utils";

interface AiPersonaSectionProps {
  setValue: UseFormSetValue<EmployerAiSettingsFormValues>;
  watch: UseFormWatch<EmployerAiSettingsFormValues>;
}

const DETAIL_OPTIONS: {
  value: EmployerAiSettingsFormValues["aiFeedbackDetail"];
  label: string;
  desc: string;
}[] = [
  {
    value: "comprehensive",
    label: "Comprehensive Report",
    desc: "Detailed score breakdown across skills, communication, and STAR method analysis.",
  },
  {
    value: "standard",
    label: "Standard Overview",
    desc: "Balanced summary of key competencies, top strengths, and red flags.",
  },
  {
    value: "summary",
    label: "Executive Highlights",
    desc: "High-level summary with quick recommendation and fit score.",
  },
];

const TONE_OPTIONS: {
  value: EmployerAiSettingsFormValues["aiTone"];
  label: string;
  desc: string;
}[] = [
  {
    value: "professional",
    label: "Professional & Objective",
    desc: "Neutral, formal phrasing suited for enterprise and senior executive roles.",
  },
  {
    value: "encouraging",
    label: "Encouraging & Friendly",
    desc: "Empathetic, welcoming tone designed to put candidates at ease.",
  },
  {
    value: "direct",
    label: "Direct & Concise",
    desc: "Fast-paced, technical precision with minimal conversational preamble.",
  },
];

export default function AiPersonaSection({
  setValue,
  watch,
}: AiPersonaSectionProps) {
  const currentDetail = watch("aiFeedbackDetail") || "comprehensive";
  const currentTone = watch("aiTone") || "professional";

  return (
    <div className="space-y-6">
      {/* Feedback Depth */}
      <div className="space-y-3">
        <div>
          <h3 className="text-xs sm:text-sm md:text-base font-semibold text-zinc-900">
            AI Interview Feedback Depth
          </h3>
          <p className="text-[11px] sm:text-xs text-zinc-500 mt-0.5">
            Select the detail level generated after an applicant completes an AI pre-screen
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {DETAIL_OPTIONS.map((opt) => {
            const isSelected = currentDetail === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => setValue("aiFeedbackDetail", opt.value, { shouldDirty: true })}
                className={cn(
                  "p-3.5 rounded border text-left transition-all cursor-pointer flex flex-col justify-between",
                  isSelected
                    ? "bg-[#EDF6F1]/70 border-forest shadow-xs"
                    : "bg-white border-zinc-200/80 hover:border-zinc-300 hover:bg-zinc-50/50"
                )}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs sm:text-sm font-bold text-zinc-900">
                      {opt.label}
                    </span>
                    {isSelected && <LuCheck className="size-4 text-forest shrink-0" />}
                  </div>
                  <p className="text-[11px] text-zinc-500 leading-relaxed">{opt.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-t border-zinc-100" />

      {/* AI Interviewer Persona Tone */}
      <div className="space-y-3">
        <div>
          <h3 className="text-xs sm:text-sm md:text-base font-semibold text-zinc-900">
            AI Interviewer Persona Tone
          </h3>
          <p className="text-[11px] sm:text-xs text-zinc-500 mt-0.5">
            Set the verbal demeanor and question delivery style used during automated candidate video screenings
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {TONE_OPTIONS.map((opt) => {
            const isSelected = currentTone === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => setValue("aiTone", opt.value, { shouldDirty: true })}
                className={cn(
                  "p-3.5 rounded border text-left transition-all cursor-pointer flex flex-col justify-between",
                  isSelected
                    ? "bg-[#EDF6F1]/70 border-forest shadow-xs"
                    : "bg-white border-zinc-200/80 hover:border-zinc-300 hover:bg-zinc-50/50"
                )}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs sm:text-sm font-bold text-zinc-900">
                      {opt.label}
                    </span>
                    {isSelected && <LuCheck className="size-4 text-forest shrink-0" />}
                  </div>
                  <p className="text-[11px] text-zinc-500 leading-relaxed">{opt.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
