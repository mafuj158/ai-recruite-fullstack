import { Control, FieldErrors } from "react-hook-form";
import CommonFieldset from "@/components/ui/fieldset";
import { INDUSTRY_OPTIONS, COMPANY_SIZE_OPTIONS } from "@/lib/constants";
import { CompanyProfileFormValues } from "@/types/employer/company-profile.types";

interface IndustryLocationSectionProps {
  control: Control<CompanyProfileFormValues>;
  errors: FieldErrors<CompanyProfileFormValues>;
}

export default function IndustryLocationSection({
  control,
  errors,
}: IndustryLocationSectionProps) {
  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2">
        <h2 className="text-xs sm:text-sm md:text-base font-semibold text-zinc-900">
          Industry & Scale
        </h2>
        <span className="text-[11px] sm:text-xs text-zinc-400">
          <span className="hidden sm:inline">• </span>Sector & workforce
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 lg:gap-5">
        <CommonFieldset<CompanyProfileFormValues>
          control={control}
          register_as="industry"
          label="Industry"
          type="select"
          placeholder="Select industry"
          options={INDUSTRY_OPTIONS}
          isRequired={true}
          errors={errors}
          validationRules={{
            required: "Industry is required",
          }}
        />

        <CommonFieldset<CompanyProfileFormValues>
          control={control}
          register_as="companySize"
          label="Company Size"
          type="select"
          placeholder="Select company size"
          options={COMPANY_SIZE_OPTIONS}
          isRequired={true}
          errors={errors}
          validationRules={{
            required: "Company size is required",
          }}
        />
      </div>

      <CommonFieldset<CompanyProfileFormValues>
        control={control}
        register_as="location"
        label="Office Headquarters / Location"
        placeholder="e.g. San Francisco, CA or Remote"
        isRequired={true}
        errors={errors}
        validationRules={{
          required: "Office headquarters is required",
        }}
      />
    </div>
  );
}
