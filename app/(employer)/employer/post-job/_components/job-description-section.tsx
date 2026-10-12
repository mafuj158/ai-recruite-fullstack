import { useState } from "react";
import { Control, FieldErrors, UseFormSetValue } from "react-hook-form";
import CommonFieldset from "@/components/ui/fieldset";
import { Button } from "@/components/ui/button";
import { LuSparkles } from "react-icons/lu";
import toast from "react-hot-toast";
import { PostJobFormValues } from "@/types/employer/post-job.types";
import ResponsibilitiesInput from "./responsibilities-input";

interface JobDescriptionSectionProps {
  control: Control<PostJobFormValues>;
  errors: FieldErrors<PostJobFormValues>;
  setValue: UseFormSetValue<PostJobFormValues>;
  jobTitle: string;
  department: string;
  coreResponsibilities?: string[];
  responsibilitiesError?: string;
}

export default function JobDescriptionSection({
  control,
  errors,
  setValue,
  jobTitle,
  department,
  coreResponsibilities = [],
  responsibilitiesError,
}: JobDescriptionSectionProps) {
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  const handleGenerateAIDescription = () => {
    if (!jobTitle) {
      toast.error("Please enter a Job Title first to generate a description.");
      return;
    }

    setIsGeneratingAI(true);
    setTimeout(() => {
      const generated = `We are seeking an exceptional ${jobTitle} to join our ${
        department || "Engineering"
      } team. In this role, you will contribute directly to product innovation, collaborate closely with cross-functional teams, and drive technical excellence across our platform.`;

      const generatedResponsibilities = [
        `Design, build, and maintain resilient features aligned with product roadmaps.`,
        `Collaborate cross-functionally with product management, design, and engineering teams.`,
        `Participate in peer code reviews, mentor team members, and uphold code quality standards.`,
        `Monitor system performance, optimize database queries, and resolve production issues promptly.`,
      ];

      setValue("jobDescription", generated, { shouldValidate: true });
      setValue("coreResponsibilities", generatedResponsibilities, { shouldValidate: true });
      setIsGeneratingAI(false);
      toast.success("AI generated description & core responsibilities loaded!");
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Job Description Textarea */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <h2 className="text-sm sm:text-base font-semibold text-zinc-900">
              Job Details <span className="text-red-500 ml-0.5">*</span>
            </h2>
            <span className="text-xs text-zinc-400 hidden sm:inline">
              • Role overview & mission
            </span>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={handleGenerateAIDescription}
            disabled={isGeneratingAI}
            isLoading={isGeneratingAI}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest hover:text-forest/80 bg-[#EDF6F1] hover:bg-[#E3EFE8] border border-[#D5E6DC] px-3 py-1.5 rounded transition-colors cursor-pointer disabled:opacity-50 shadow-2xs h-auto"
          >
            <LuSparkles
              className={`size-3.5 text-forest ${
                isGeneratingAI ? "animate-spin" : ""
              }`}
            />
            <span>{isGeneratingAI ? "Generating" : "Generate with AI"}</span>
          </Button>
        </div>

        <CommonFieldset<PostJobFormValues>
          control={control}
          register_as="jobDescription"
          type="textarea"
          label="Description"
          placeholder="Describe the role, company culture, and what makes this opportunity compelling..."
          textareaClass="normal-case min-h-36 sm:min-h-40 text-sm leading-relaxed"
          isRequired={true}
          errors={errors}
          validationRules={{
            required: "Job description is required",
          }}
        />

        <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium pt-0.5 select-none">
          <LuSparkles className="size-3.5 text-emerald-600 shrink-0" />
          <span>Description optimized for better candidate engagement</span>
        </div>
      </div>

      {/* Core Responsibilities Input */}
      <ResponsibilitiesInput
        responsibilities={coreResponsibilities}
        onChange={(newResps) =>
          setValue("coreResponsibilities", newResps, { shouldValidate: true })
        }
        error={responsibilitiesError || errors.coreResponsibilities?.message}
      />
    </div>
  );
}
