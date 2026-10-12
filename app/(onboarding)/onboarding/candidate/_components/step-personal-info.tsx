"use client";

import { Control, Controller } from "react-hook-form";
import CommonFieldset from "@/components/ui/fieldset";
import StepHeader from "@/app/(onboarding)/onboarding/_components/step-header";
import StepActions from "@/app/(onboarding)/onboarding/_components/step-actions";
import WorkTypeSelector from "@/app/(onboarding)/onboarding/_components/work-type-selector";
import SkillsTagInput from "@/app/(onboarding)/onboarding/_components/skills-tag-input";
import type { CandidateOnboardingFormValues } from "@/types/candidate/onboarding.types";
import {
  JOB_ROLE_OPTIONS,
  EXPERIENCE_LEVEL_OPTIONS,
  INDUSTRY_OPTIONS,
} from "@/lib/constants";

interface StepPersonalInfoProps {
  control: Control<CandidateOnboardingFormValues>;
  onNext: () => void;
}

export default function StepPersonalInfo({
  control,
  onNext,
}: StepPersonalInfoProps) {
  return (
    <div className="space-y-4">
      {/* Header */}
      <StepHeader
        title="Tell us about yourself"
        description="Help us match you with the perfect opportunities"
      />

      {/* Job Title / Primary Role */}
      <CommonFieldset<CandidateOnboardingFormValues>
        control={control}
        register_as="jobTitle"
        label="Job Title"
        type="select"
        placeholder="Select your primary job title / role"
        options={JOB_ROLE_OPTIONS}
        isRequired={true}
        validationRules={{
          required: "Please select your job title",
        }}
      />

      {/* Skills Array Input (Controller with Hook-based Validation) */}
      <Controller
        control={control}
        name="skills"
        rules={{
          validate: (val) =>
            (Array.isArray(val) && val.length > 0) || "Please add at least one skill",
        }}
        render={({ field, fieldState: { error } }) => (
          <SkillsTagInput
            skills={field.value || []}
            onChange={(newSkills) => field.onChange(newSkills)}
            error={error?.message}
          />
        )}
      />

      {/* Experience Level & Industry */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <CommonFieldset<CandidateOnboardingFormValues>
          control={control}
          register_as="experienceLevel"
          label="Experience Level"
          type="select"
          placeholder="Select experience"
          options={EXPERIENCE_LEVEL_OPTIONS}
          isRequired={true}
          validationRules={{
            required: "Experience level is required",
          }}
        />

        <CommonFieldset<CandidateOnboardingFormValues>
          control={control}
          register_as="industry"
          label="Industry"
          type="select"
          placeholder="Select industry"
          options={INDUSTRY_OPTIONS}
          isRequired={false}
        />
      </div>

      {/* Work Type: Remote, Hybrid, On-site (Controller with Hook-based Validation) */}
      <Controller
        control={control}
        name="workType"
        rules={{
          required: "Please select your preferred work type",
        }}
        render={({ field, fieldState: { error } }) => (
          <WorkTypeSelector
            value={field.value}
            onChange={(val) => field.onChange(val)}
            error={error?.message}
          />
        )}
      />

      {/* Preferred Location & Salary Expectation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <CommonFieldset<CandidateOnboardingFormValues>
          control={control}
          register_as="preferredLocation"
          label="Preferred Location"
          type="text"
          placeholder="e.g. San Francisco, CA or Remote"
          isRequired={true}
          validationRules={{
            required: "Preferred location is required",
          }}
        />

        <CommonFieldset<CandidateOnboardingFormValues>
          control={control}
          register_as="salaryExpectation"
          label="Salary Expectation"
          type="text"
          placeholder="e.g. $90,000 - $120,000 / year"
          isRequired={true}
          validationRules={{
            required: "Salary expectation is required",
          }}
        />
      </div>

      {/* Bio / Professional Summary */}
      <CommonFieldset<CandidateOnboardingFormValues>
        control={control}
        register_as="bio"
        label="Professional Summary / Bio"
        type="textarea"
        placeholder="Brief summary of your expertise, strengths, and career goals..."
        isRequired={false}
        textareaClass="min-h-20"
      />

      {/* Step 1 Actions */}
      <StepActions onNext={onNext} />
    </div>
  );
}
