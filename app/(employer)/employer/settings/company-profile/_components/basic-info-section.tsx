import { Control, FieldErrors } from "react-hook-form";
import CommonFieldset from "@/components/ui/fieldset";
import { CompanyProfileFormValues } from "@/types/employer/company-profile.types";

interface BasicInfoSectionProps {
  control: Control<CompanyProfileFormValues>;
  errors: FieldErrors<CompanyProfileFormValues>;
}

export default function BasicInfoSection({ control, errors }: BasicInfoSectionProps) {
  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2">
        <h2 className="text-xs sm:text-sm md:text-base font-semibold text-zinc-900">
          Basic Company Information
        </h2>
        <span className="text-[11px] sm:text-xs text-zinc-400">
          <span className="hidden sm:inline">• </span>Core identity
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 lg:gap-5">
        <CommonFieldset<CompanyProfileFormValues>
          control={control}
          register_as="companyName"
          label="Company Name"
          placeholder="e.g. Acme Technologies Inc."
          isRequired={true}
          errors={errors}
          validationRules={{
            required: "Company name is required",
          }}
        />

        <CommonFieldset<CompanyProfileFormValues>
          control={control}
          register_as="email"
          label="Work Contact Email"
          type="email"
          placeholder="e.g. contact@acmetech.io"
          isRequired={true}
          errors={errors}
          validationRules={{
            required: "Contact email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          }}
        />

        <CommonFieldset<CompanyProfileFormValues>
          control={control}
          register_as="phone"
          label="Phone Number"
          type="text"
          placeholder="e.g. +1 (555) 000-0000"
          errors={errors}
        />

        <CommonFieldset<CompanyProfileFormValues>
          control={control}
          register_as="website"
          label="Company Website"
          type="text"
          placeholder="https://company.com"
          isRequired={true}
          errors={errors}
          validationRules={{
            required: "Website URL is required",
          }}
        />
      </div>
    </div>
  );
}
