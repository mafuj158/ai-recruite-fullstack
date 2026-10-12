import { Control, FieldErrors } from "react-hook-form";
import CommonFieldset from "@/components/ui/fieldset";
import { CompanyProfileFormValues } from "@/types/employer/company-profile.types";

interface SocialProfilesSectionProps {
  control: Control<CompanyProfileFormValues>;
  errors: FieldErrors<CompanyProfileFormValues>;
}

export default function SocialProfilesSection({
  control,
  errors,
}: SocialProfilesSectionProps) {
  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2">
        <h2 className="text-xs sm:text-sm md:text-base font-semibold text-zinc-900">
          Online & Social Profiles
        </h2>
        <span className="text-[11px] sm:text-xs text-zinc-400">
          <span className="hidden sm:inline">• </span>Optional presence
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 lg:gap-5">
        <CommonFieldset<CompanyProfileFormValues>
          control={control}
          register_as="linkedin"
          label="LinkedIn URL"
          placeholder="https://linkedin.com/company/your-company"
          errors={errors}
        />

        <CommonFieldset<CompanyProfileFormValues>
          control={control}
          register_as="twitter"
          label="Twitter / X URL"
          placeholder="https://x.com/your-company"
          errors={errors}
        />
      </div>
    </div>
  );
}
