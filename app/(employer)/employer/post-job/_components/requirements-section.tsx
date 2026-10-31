import React from "react";
import { Control, FieldErrors, UseFormSetValue } from "react-hook-form";
import CommonFieldset from "@/components/ui/fieldset";
import { CreateJobPayload } from "@/types/employer/post-job.types";
import { EXPERIENCE_LEVEL_OPTIONS } from "./post-job.constants";
import SkillsInput from "./skills-input";

interface RequirementsSectionProps {
  control: Control<CreateJobPayload>;
  errors: FieldErrors<CreateJobPayload>;
  setValue: UseFormSetValue<CreateJobPayload>;
  skills: string[];
}

export default function RequirementsSection({
  control,
  errors,
  setValue,
  skills,
}: RequirementsSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2">
        <h2 className="text-sm sm:text-base font-semibold text-zinc-900">
          Requirements
        </h2>
        <span className="text-xs text-zinc-400">
          <span className="hidden sm:inline">• </span>Skills, seniority & qualifications
        </span>
      </div>

      {/* Skills & Technologies */}
      <SkillsInput
        skills={skills}
        onChange={(updatedSkills) =>
          setValue("skills", updatedSkills, { shouldValidate: true })
        }
        error={errors.skills?.message}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        <CommonFieldset<CreateJobPayload>
          control={control}
          register_as="experienceLevel"
          label="Experience Level"
          type="select"
          placeholder="Select experience level"
          options={EXPERIENCE_LEVEL_OPTIONS}
          isRequired={true}
          errors={errors}
          validationRules={{
            required: "Experience level is required",
          }}
        />

        <CommonFieldset<CreateJobPayload>
          control={control}
          register_as="education"
          label="Education / Qualification"
          placeholder="e.g. Bachelor's in Computer Science"
          isRequired={false}
          errors={errors}
        />
      </div>
    </div>
  );
}
