"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import CommonFieldset from "@/components/ui/fieldset";
import { Button } from "@/components/ui/button";
import AvatarChange from "@/components/shared/avatar-change";
import { CompanyProfileFormValues } from "@/types/employer/company-profile.types";
import toast from "react-hot-toast";

import BasicInfoSection from "./basic-info-section";
import IndustryLocationSection from "./industry-location-section";
import HiringPreferencesSection from "./hiring-preferences-section";
import SocialProfilesSection from "./social-profiles-section";

const DEFAULT_COMPANY_VALUES: CompanyProfileFormValues = {
  companyLogo: "",
  companyName: "Acme Technologies Inc.",
  email: "contact@acmetech.io",
  phone: "+1 (555) 382-9102",
  website: "https://acmetech.io",
  industry: "Technology & Software",
  companySize: "51-200",
  location: "San Francisco, CA (Hybrid)",
  aboutCompany:
    "Acme Technologies is a high-growth AI and cloud software company building next-generation workflow automation tools. We foster an engineering-first culture that prioritizes technical craftsmanship, mentorship, and high-impact innovation.",
  rolesHiringFor: ["Full Stack Engineer", "Frontend Developer", "DevOps Engineer"],
  preferredExpLevels: ["Senior Level", "Mid Level"],
  budgetRange: "$100k - $150k",
  linkedin: "https://linkedin.com/company/acmetech",
  twitter: "https://x.com/acmetech",
};

export default function CompanyProfileForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isDirty },
  } = useForm<CompanyProfileFormValues>({
    defaultValues: DEFAULT_COMPANY_VALUES,
  });

  const companyLogo = watch("companyLogo");

  const onSubmit = (data: CompanyProfileFormValues) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Company profile and hiring preferences saved successfully!");
    }, 800);
  };

  const handleReset = () => {
    reset(DEFAULT_COMPANY_VALUES);
    toast.success("Reverted to saved profile details");
  };

  return (
    <div className="w-full bg-white rounded p-4 sm:p-6 lg:p-8 border border-zinc-200/80 shadow-xs space-y-5 sm:space-y-6 lg:space-y-7">
      {/* Section 1: Logo & Branding */}
      <div className="space-y-3 sm:space-y-4 flex flex-col">
        {/* heading text */}
        <div>
          <h2 className="text-xs sm:text-sm md:text-base font-semibold text-zinc-900">
            Company Logo & Branding
          </h2>
          <p className="text-[11px] sm:text-xs text-zinc-500 mt-0.5">
            This logo will be featured on all active job postings and candidate invitations
          </p>
        </div>
        {/* image */}
        <AvatarChange className="self-center" />
      </div>
      <div className="border-t border-zinc-100" />
      {/* Form Details */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6 lg:space-y-7">
        {/* Section 2: Core Company Details */}
        <BasicInfoSection control={control} errors={errors} />

        <div className="border-t border-zinc-100" />

        {/* Section 3: Industry & Scale */}
        <IndustryLocationSection control={control} errors={errors} />

        <div className="border-t border-zinc-100" />

        {/* Section 4: Hiring Preferences (from Onboarding) */}
        <HiringPreferencesSection control={control} errors={errors} />

        <div className="border-t border-zinc-100" />

        {/* Section 5: About the Company */}
        <div className="space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2">
            <h2 className="text-xs sm:text-sm md:text-base font-semibold text-zinc-900">
              About the Company
            </h2>
            <span className="text-[11px] sm:text-xs text-zinc-400">
              <span className="hidden sm:inline">• </span>Culture, mission & story
            </span>
          </div>

          <CommonFieldset<CompanyProfileFormValues>
            control={control}
            register_as="aboutCompany"
            label="Company Overview"
            type="textarea"
            placeholder="Describe your company mission, work culture, and value proposition for prospective candidates..."
            textareaClass="min-h-28 sm:min-h-32 text-xs sm:text-sm leading-relaxed"
            isRequired={true}
            errors={errors}
            validationRules={{
              required: "Company overview is required",
            }}
          />
        </div>

        <div className="border-t border-zinc-100" />

        {/* Section 6: Online & Social Profiles */}
        <SocialProfilesSection control={control} errors={errors} />

        {/* Footer Actions */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-2.5 sm:gap-3 pt-3.5 sm:pt-4 border-t border-zinc-100">
          <Button
            type="button"
            variant="secondary"
            onClick={handleReset}
            disabled={isSubmitting || !isDirty}
            className="w-full sm:w-auto px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 rounded cursor-pointer"
          >
            Reset
          </Button>

          <Button
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
            className="w-full sm:w-auto px-5 sm:px-7 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold rounded shadow-xs hover:shadow cursor-pointer"
          >
            {isSubmitting ? "Saving Profile" : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
