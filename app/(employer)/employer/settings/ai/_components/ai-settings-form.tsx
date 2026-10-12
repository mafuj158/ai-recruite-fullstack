"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { EmployerAiSettingsFormValues } from "@/types/employer/ai-settings.types";
import AiSettingsHeader from "./ai-settings-header";
import AiMatchingThresholdsSection from "./ai-matching-thresholds-section";
import AiAutomationRulesSection from "./ai-automation-rules-section";
import AiPersonaSection from "./ai-persona-section";

const DEFAULT_AI_SETTINGS: EmployerAiSettingsFormValues = {
  minPassingScore: 75,
  autoArchiveThreshold: 50,
  weights: {
    skills: 30,
    experience: 25,
    requirements: 20,
    education: 15,
    softSkills: 10,
  },
  autoInviteScreening: true,
  autoArchiveLowFit: false,
  notifyOnInterviewComplete: true,
  aiFeedbackDetail: "comprehensive",
  aiTone: "professional",
};

export default function AiSettingsForm() {
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<EmployerAiSettingsFormValues>({
    defaultValues: DEFAULT_AI_SETTINGS,
  });

  const { setValue, watch, reset, handleSubmit, formState } = form;

  const onSubmit = handleSubmit(async (data) => {
    setIsSaving(true);
    try {
      // TODO: replace with real API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      reset(data);
      toast.success("AI configuration saved successfully!");
    } catch {
      toast.error("Failed to save AI configuration");
    } finally {
      setIsSaving(false);
    }
  });

  const handleReset = () => {
    reset(DEFAULT_AI_SETTINGS);
    toast.success("Reverted to standard AI configuration");
  };

  return (
    <div className="w-full bg-white rounded p-4 sm:p-6 lg:p-8 border border-zinc-200/80 shadow-xs space-y-6 sm:space-y-7">
      <AiSettingsHeader />

      <form onSubmit={onSubmit} className="space-y-6 sm:space-y-7">
        {/* Section 1: Screening Benchmarks & Matching Weights with Antd Sliders */}
        <AiMatchingThresholdsSection setValue={setValue} watch={watch} />

        <div className="border-t border-zinc-100" />

        {/* Section 2: Automated Pipeline Rules */}
        <AiAutomationRulesSection setValue={setValue} watch={watch} />

        <div className="border-t border-zinc-100" />

        {/* Section 3: AI Interviewer Persona & Feedback Depth */}
        <AiPersonaSection setValue={setValue} watch={watch} />

        {/* Form Actions */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-2.5 sm:gap-3 pt-4 border-t border-zinc-100">
          <Button
            type="button"
            variant="secondary"
            onClick={handleReset}
            disabled={isSaving || !formState.isDirty}
            className="w-full sm:w-auto px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 rounded cursor-pointer"
          >
            Reset
          </Button>

          <Button
            type="submit"
            variant="primary"
            isLoading={isSaving}
            className="w-full sm:w-auto px-5 sm:px-7 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold rounded shadow-xs hover:shadow cursor-pointer"
          >
            {isSaving ? "Saving Configuration" : "Save AI Settings"}
          </Button>
        </div>
      </form>
    </div>
  );
}
