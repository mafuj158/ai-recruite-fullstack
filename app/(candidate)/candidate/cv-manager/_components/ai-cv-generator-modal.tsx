"use client";

import { useState } from "react";
import { Modal } from "antd";
import { useForm } from "react-hook-form";
import { FiCpu, FiX, FiCheck, FiRefreshCw } from "react-icons/fi";
import { LuSparkles } from "react-icons/lu";
import CommonFieldset from "@/components/ui/fieldset";
import { Button } from "@/components/ui/button";

interface AICVGeneratorFormValues {
  targetRole: string;
  experienceYears: string;
  tone: string;
  topSkills: string;
}

interface AICVGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyGenerated: (newSummary: string) => void;
}

const EXPERIENCE_OPTIONS = [
  { label: "1-3 years (Junior / Mid)", value: "1-3 years" },
  { label: "3-5 years (Mid / Senior)", value: "3-5 years" },
  { label: "6+ years (Senior / Staff)", value: "6+ years" },
  { label: "10+ years (Principal / Lead)", value: "10+ years" },
];

const TONE_OPTIONS = [
  { label: "Executive & Metric-Driven", value: "Executive & Metric-Driven" },
  { label: "Deep Technical Architecture", value: "Deep Technical Architecture" },
  { label: "Leadership & Team Impact", value: "Leadership & Team Impact" },
];

export function AICVGeneratorModal({
  isOpen,
  onClose,
  onApplyGenerated,
}: AICVGeneratorModalProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDraft, setGeneratedDraft] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AICVGeneratorFormValues>({
    defaultValues: {
      targetRole: "Senior Full-Stack Engineer",
      experienceYears: "6+ years",
      tone: "Executive & Metric-Driven",
      topSkills: "Next.js, TypeScript, PostgreSQL, Distributed Systems, AWS",
    },
  });

  const handleFormSubmit = (data: AICVGeneratorFormValues) => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedDraft(
        `High-impact ${data.targetRole} with ${data.experienceYears} of expertise engineering resilient cloud platforms, scalable Next.js architectures, and event-driven microservices. Proficient in ${data.topSkills}. Proven track record of reducing latency by 40%+, mentoring engineering squads, and driving $2M+ in infrastructure efficiency.`
      );
      setIsGenerating(false);
    }, 600);
  };

  const handleApply = () => {
    if (generatedDraft) {
      onApplyGenerated(generatedDraft);
      handleClose();
    }
  };

  const handleClose = () => {
    setGeneratedDraft(null);
    setIsGenerating(false);
    reset();
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onCancel={handleClose}
      footer={null}
      destroyOnHidden
      centered
      width={540}
      closeIcon={
        <FiX className="size-4 text-zinc-400 hover:text-zinc-700 transition-colors" />
      }
      className="[&_.ant-modal-content]:rounded-xl! [&_.ant-modal-content]:p-0! overflow-hidden"
    >
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-zinc-100 bg-white flex items-center gap-3">
        <div className="size-9 rounded-lg bg-forest/10 text-forest flex items-center justify-center shrink-0">
          <FiCpu className="size-4.5" />
        </div>
        <div className="min-w-0 pr-6">
          <h3 className="text-base font-bold text-zinc-900 leading-snug">
            AI Resume Content Generator
          </h3>
          <p className="text-xs text-zinc-500 mt-0.5">
            Generate high-scoring ATS summaries and bullet points tailored to your target position.
          </p>
        </div>
      </div>

      {/* Form with CommonFieldset and react-hook-form */}
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="p-4 sm:p-5 space-y-3.5 bg-white"
      >
        <CommonFieldset<AICVGeneratorFormValues>
          control={control}
          register_as="targetRole"
          label="Target Role Title"
          placeholder="e.g. Senior Full-Stack Engineer"
          isRequired={true}
          errors={errors}
          validationRules={{ required: "Target role title is required" }}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <CommonFieldset<AICVGeneratorFormValues>
            control={control}
            register_as="experienceYears"
            type="select"
            label="Experience Level"
            placeholder="Select experience"
            options={EXPERIENCE_OPTIONS}
            isRequired={true}
            errors={errors}
            validationRules={{ required: "Experience level is required" }}
          />

          <CommonFieldset<AICVGeneratorFormValues>
            control={control}
            register_as="tone"
            type="select"
            label="Tone & Style"
            placeholder="Select tone"
            options={TONE_OPTIONS}
            isRequired={true}
            errors={errors}
            validationRules={{ required: "Tone is required" }}
          />
        </div>

        <CommonFieldset<AICVGeneratorFormValues>
          control={control}
          register_as="topSkills"
          type="textarea"
          label="Key Technical Stack & Keywords"
          placeholder="e.g. Next.js, TypeScript, PostgreSQL, Distributed Systems, AWS"
          isRequired={true}
          errors={errors}
          textareaClass="min-h-16 text-xs"
          validationRules={{ required: "Key technical stack is required" }}
        />

        {/* Generated Result Preview */}
        {generatedDraft && (
          <div className="p-3.5 rounded-lg bg-emerald-50/60 border border-emerald-200/80 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-forest uppercase tracking-wider text-[10px] flex items-center gap-1">
                <LuSparkles className="size-3" />
                Generated Executive Summary
              </span>
              <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                98% ATS Match
              </span>
            </div>
            <p className="text-xs text-zinc-700 leading-relaxed font-medium">
              {generatedDraft}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-zinc-100">
          <Button
            type="submit"
            variant="outline"
            disabled={isGenerating}
            className="h-9 px-3.5 border border-forest/30 bg-forest/5 text-forest hover:bg-forest/10 rounded inline-flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
          >
            {isGenerating ? (
              <>
                <FiRefreshCw className="size-3.5 animate-spin" />
                <span>Crafting with AI...</span>
              </>
            ) : (
              <>
                <LuSparkles className="size-3.5" />
                <span>{generatedDraft ? "Regenerate Draft" : "Generate Section"}</span>
              </>
            )}
          </Button>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="h-9 px-4 border border-[#DFE1E7] bg-white text-zinc-700 hover:bg-zinc-50 rounded text-xs font-semibold cursor-pointer"
            >
              Cancel
            </Button>
            {generatedDraft && (
              <Button
                type="button"
                variant="primary"
                onClick={handleApply}
                className="h-9 px-4 rounded bg-forest text-lime hover:bg-[#1b3027] text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
              >
                <FiCheck className="size-4" />
                <span>Apply to CV</span>
              </Button>
            )}
          </div>
        </div>
      </form>
    </Modal>
  );
}
