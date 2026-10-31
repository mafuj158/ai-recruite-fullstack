import { useState } from "react";
import { Control, FieldErrors, UseFormSetValue } from "react-hook-form";
import CommonFieldset from "@/components/ui/fieldset";
import { Button } from "@/components/ui/button";
import { LuSparkles } from "react-icons/lu";
import toast from "react-hot-toast";
import { CreateJobPayload } from "@/types/employer/post-job.types";
import ResponsibilitiesInput from "./responsibilities-input";

interface JobDescriptionSectionProps {
  control: Control<CreateJobPayload>;
  errors: FieldErrors<CreateJobPayload>;
  setValue: UseFormSetValue<CreateJobPayload>;
  jobTitle: string;
  department?: string;
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
      setValue("coreResponsibilities", generatedResponsibilities, {
        shouldValidate: true,
      });

      setIsGeneratingAI(false);
      toast.success("AI generated job description & responsibilities!");
    }, 1200);
  };

  return (
    <div className="space-y-5">
      {/* Header with AI Generate Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm sm:text-base font-semibold text-zinc-900">
              Job Description
            </h2>
            <span className="text-xs text-zinc-400">
              <span className="hidden sm:inline">• </span>Detailed overview
            </span>
          </div>
          <p className="text-xs text-zinc-500 mt-0.5">
            Describe the role mission or generate one with AI assistance
          </p>
        </div>

        <Button
          type="button"
          onClick={handleGenerateAIDescription}
          disabled={isGeneratingAI}
          variant="outline"
          className="self-start sm:self-auto border-emerald-300 text-forest hover:bg-[#EDF6F1] font-semibold text-xs py-2 px-3 rounded shadow-2xs flex items-center gap-1.5 cursor-pointer"
        >
          <LuSparkles className="size-3.5 text-lime-600 animate-pulse" />
          {isGeneratingAI ? "Generating..." : "Generate with AI"}
        </Button>
      </div>

      {/* Description Textarea */}
      <CommonFieldset<CreateJobPayload>
        control={control}
        register_as="jobDescription"
        label="Full Job Description"
        type="textarea"
        placeholder="Provide an overview of the role, day-to-day work, and impact on the company..."
        rows={5}
        isRequired={true}
        errors={errors}
        validationRules={{
          required: "Job description is required",
          minLength: {
            value: 50,
            message: "Description must be at least 50 characters",
          },
        }}
      />

      {/* Core Responsibilities Dynamic Tag Input */}
      <ResponsibilitiesInput
        responsibilities={coreResponsibilities}
        onChange={(updatedList) =>
          setValue("coreResponsibilities", updatedList, { shouldValidate: true })
        }
        error={responsibilitiesError}
      />
    </div>
  );
}
