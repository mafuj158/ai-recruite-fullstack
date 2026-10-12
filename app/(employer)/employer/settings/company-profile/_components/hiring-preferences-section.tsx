"use client";

import { Control, Controller, FieldErrors } from "react-hook-form";
import CommonFieldset from "@/components/ui/fieldset";
import CustomTagSelect from "@/app/(onboarding)/onboarding/_components/custom-tag-select";
import { CompanyProfileFormValues } from "@/types/employer/company-profile.types";
import {
  JOB_ROLE_OPTIONS as ROLE_OPTIONS,
  EXPERIENCE_LEVEL_OPTIONS as EXP_LEVEL_OPTIONS,
  BUDGET_OPTIONS,
} from "@/lib/constants";

interface HiringPreferencesSectionProps {
  control: Control<CompanyProfileFormValues>;
  errors: FieldErrors<CompanyProfileFormValues>;
}

export default function HiringPreferencesSection({
  control,
  errors,
}: HiringPreferencesSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2">
        <h2 className="text-xs sm:text-sm md:text-base font-semibold text-zinc-900">
          Hiring Preferences & Target Talent
        </h2>
        <span className="text-[11px] sm:text-xs text-zinc-400">
          <span className="hidden sm:inline">• </span>Configured during onboarding
        </span>
      </div>

      <div className="space-y-4">
        {/* Roles Hiring For */}
        <Controller
          control={control}
          name="rolesHiringFor"
          rules={{
            validate: (val) =>
              (Array.isArray(val) && val.length > 0) ||
              "Please select at least one role you are hiring for",
          }}
          render={({ field }) => (
            <CustomTagSelect
              label="Primary Roles Hiring For"
              placeholder="Select or type target job roles..."
              options={ROLE_OPTIONS}
              selectedValues={field.value || []}
              onChange={field.onChange}
              isRequired
              error={errors.rolesHiringFor?.message}
            />
          )}
        />

        {/* Preferred Experience Levels */}
        <Controller
          control={control}
          name="preferredExpLevels"
          rules={{
            validate: (val) =>
              (Array.isArray(val) && val.length > 0) ||
              "Please select at least one preferred experience level",
          }}
          render={({ field }) => (
            <CustomTagSelect
              label="Preferred Experience Levels"
              placeholder="Select preferred seniority levels..."
              options={EXP_LEVEL_OPTIONS}
              selectedValues={field.value || []}
              onChange={field.onChange}
              isRequired
              error={errors.preferredExpLevels?.message}
            />
          )}
        />

        {/* Budget / Compensation Range */}
        <CommonFieldset<CompanyProfileFormValues>
          control={control}
          register_as="budgetRange"
          label="Typical Salary / Budget Range"
          type="select"
          placeholder="Select typical compensation budget..."
          options={BUDGET_OPTIONS}
          errors={errors}
        />
      </div>
    </div>
  );
}
