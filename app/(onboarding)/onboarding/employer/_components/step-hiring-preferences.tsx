"use client";

import { Control, Controller } from "react-hook-form";
import CommonFieldset from "@/components/ui/fieldset";
import StepHeader from "@/app/(onboarding)/onboarding/_components/step-header";
import StepActions from "@/app/(onboarding)/onboarding/_components/step-actions";
import CustomTagSelect from "@/app/(onboarding)/onboarding/_components/custom-tag-select";
import type { EmployerOnboardingFormValues } from "@/types/employer/onboarding.types";
import {
  EXPERIENCE_LEVEL_OPTIONS as EXP_LEVEL_OPTIONS,
  BUDGET_OPTIONS,
} from "@/lib/constants";
import { useLookupOptions } from "@/hooks/lookup/use-lookup-options";

export { EXP_LEVEL_OPTIONS, BUDGET_OPTIONS };

interface StepHiringPreferencesProps {
  control: Control<EmployerOnboardingFormValues>;
  onBack: () => void;
  loading?: boolean;
}

export default function StepHiringPreferences({
  control,
  onBack,
  loading = false,
}: StepHiringPreferencesProps) {
  const { jobRoles, isLoading: isLookupLoading } = useLookupOptions();

  const roleOptions = jobRoles.map((r) => ({
    label: r.label,
    value: r.label,
  }));

  return (
    <div className="space-y-5">
      {/* Header */}
      <StepHeader
        title="Hiring Preferences"
        description="Specify the talent and experience you need so our AI can match top-scoring candidates"
      />

      {/* Roles Hiring For (Controller with Hook-based Validation) */}
      <Controller
        control={control}
        name="rolesHiringFor"
        rules={{
          validate: (val) =>
            (Array.isArray(val) && val.length > 0) ||
            "Please select at least one role you are hiring for",
        }}
        render={({ field, fieldState: { error } }) => (
          <CustomTagSelect
            label="Roles Hiring For"
            placeholder={
              isLookupLoading
                ? "Loading roles..."
                : "Type or select roles (e.g. Frontend Developer)..."
            }
            options={roleOptions}
            selectedValues={(field.value || []).map((v) =>
              typeof v === "string" ? v : v.label
            )}
            onChange={(newRoles) => {
              // Convert strings to { label, value } objects
              const objects = newRoles.map((r) => {
                const matched = jobRoles.find(
                  (jr) => jr.label.toLowerCase() === r.toLowerCase()
                );
                return {
                  id: matched?.id,
                  label: r,
                  value: r.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
                };
              });
              field.onChange(objects);
            }}
            error={error?.message}
            isRequired={true}
            suggestedLabel="Suggested Roles:"
          />
        )}
      />

      {/* Preferred Experience Level (Controller with Hook-based Validation) */}
      <Controller
        control={control}
        name="preferredExpLevels"
        rules={{
          validate: (val) =>
            (Array.isArray(val) && val.length > 0) ||
            "Please select preferred experience level",
        }}
        render={({ field, fieldState: { error } }) => (
          <CustomTagSelect
            label="Preferred Experience Level"
            placeholder="Select preferred experience level(s)..."
            options={EXP_LEVEL_OPTIONS}
            selectedValues={field.value || []}
            onChange={(newLevels) => field.onChange(newLevels)}
            error={error?.message}
            isRequired={true}
            suggestedLabel="Suggested Levels:"
            allowCustom={false}
          />
        )}
      />

      {/* Budget Range */}
      <CommonFieldset<EmployerOnboardingFormValues>
        control={control}
        register_as="budgetRange"
        label="Budget Range (Annual)"
        type="select"
        placeholder="Select compensation / budget range"
        options={BUDGET_OPTIONS}
        isRequired={true}
        validationRules={{
          required: "Budget range is required",
        }}
      />

      {/* Step 2 Actions */}
      <StepActions
        onBack={onBack}
        loading={loading}
        submitLabel="Complete Setup"
      />
    </div>
  );
}
