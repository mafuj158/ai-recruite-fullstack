"use client";

import { useRef, useState } from "react";
import { Control, FieldErrors, UseFormSetValue, UseFormWatch } from "react-hook-form";
import CommonFieldset from "@/components/ui/fieldset";
import StepHeader from "@/app/(onboarding)/onboarding/_components/step-header";
import StepActions from "@/app/(onboarding)/onboarding/_components/step-actions";
import { LuCamera, LuTrash2 } from "react-icons/lu";
import toast from "react-hot-toast";
import type { EmployerOnboardingFormValues } from "@/types/employer/onboarding.types";

import {
  INDUSTRY_OPTIONS,
  COMPANY_SIZE_OPTIONS,
} from "@/lib/constants";

export { INDUSTRY_OPTIONS, COMPANY_SIZE_OPTIONS };

interface StepCompanyInfoProps {
  control: Control<EmployerOnboardingFormValues>;
  setValue: UseFormSetValue<EmployerOnboardingFormValues>;
  watch: UseFormWatch<EmployerOnboardingFormValues>;
  errors: FieldErrors<EmployerOnboardingFormValues>;
  onNext: () => void;
}

export default function StepCompanyInfo({
  control,
  setValue,
  watch,
  errors,
  onNext,
}: StepCompanyInfoProps) {
  const logoInputRef = useRef<HTMLInputElement>(null);
  const companyLogo = watch("companyLogo");
  const [logoPreview, setLogoPreview] = useState<string | null>(companyLogo || null);

  const handleLogoUpload = (file: File | null) => {
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Logo size exceeds 5MB limit");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setLogoPreview(result);
      setValue("companyLogo", result);
      toast.success("Logo uploaded successfully");
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveLogo = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLogoPreview(null);
    setValue("companyLogo", "");
    if (logoInputRef.current) {
      logoInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <StepHeader
        title="Tell us about your company"
        description="Help candidates learn about your brand, mission, and culture"
      />

      {/* Company Name (Client Required) */}
      <CommonFieldset<EmployerOnboardingFormValues>
        control={control}
        register_as="companyName"
        label="Company Name"
        type="text"
        placeholder="e.g. Acme Technologies Inc."
        isRequired={true}
        errors={errors}
        validationRules={{
          required: "Company name is required",
        }}
      />

      {/* Company Logo Upload Field */}
      <div>
        <label className="block text-sm font-medium text-zinc-800 mb-1.5">
          Company Logo
        </label>
        <input
          ref={logoInputRef}
          type="file"
          accept="image/png, image/jpeg, image/webp, image/svg+xml"
          className="hidden"
          onChange={(e) =>
            handleLogoUpload(e.target.files ? e.target.files[0] : null)
          }
        />

        {!logoPreview ? (
          <div
            onClick={() => logoInputRef.current?.click()}
            className="flex items-center gap-4 p-4 border border-dashed border-zinc-300 rounded bg-zinc-50/50 hover:bg-zinc-50 hover:border-forest/50 transition-colors cursor-pointer"
          >
            <div className="size-16 rounded border border-zinc-200 bg-white flex flex-col items-center justify-center text-zinc-400 shrink-0 shadow-xs">
              <LuCamera className="size-5 mb-0.5 text-zinc-400" />
              <span className="text-[10px] font-medium text-zinc-500">Logo</span>
            </div>
            <div>
              <h4 className="text-sm font-medium text-zinc-800">
                Upload your company logo
              </h4>
              <p className="text-xs text-zinc-400 mt-0.5">
                PNG, JPG, WebP, or SVG up to 5MB (Square ratio recommended)
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between p-3 border border-[#D5E6DC] rounded bg-[#EDF6F1]/50">
            <div className="flex items-center gap-3.5">
              <div className="size-14 rounded border border-[#D5E6DC] bg-white flex items-center justify-center overflow-hidden shrink-0 shadow-xs">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logoPreview}
                  alt="Company Logo"
                  className="size-full object-cover"
                />
              </div>
              <div>
                <h4 className="text-sm font-medium text-zinc-900">
                  Company Logo Uploaded
                </h4>
                <p className="text-xs text-forest">Ready for candidate profile</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => logoInputRef.current?.click()}
                className="text-xs font-medium text-forest hover:underline px-2 py-1 cursor-pointer"
              >
                Change
              </button>
              <button
                type="button"
                onClick={handleRemoveLogo}
                className="size-8 rounded flex items-center justify-center text-zinc-400 hover:text-red-500 hover:bg-white transition-colors cursor-pointer"
                title="Remove logo"
              >
                <LuTrash2 className="size-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Website */}
      <CommonFieldset<EmployerOnboardingFormValues>
        control={control}
        register_as="website"
        label="Company Website"
        type="text"
        placeholder="https://company.com"
        isRequired={true}
        errors={errors}
        validationRules={{
          required: "Website is required",
        }}
      />

      {/* Industry & Company Size */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <CommonFieldset<EmployerOnboardingFormValues>
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

        <CommonFieldset<EmployerOnboardingFormValues>
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

      {/* Office Headquarters / Location */}
      <CommonFieldset<EmployerOnboardingFormValues>
        control={control}
        register_as="location"
        label="Office Headquarters"
        type="text"
        placeholder="e.g. San Francisco, CA or Remote"
        isRequired={true}
        errors={errors}
        validationRules={{
          required: "Location is required",
        }}
      />

      {/* About Company */}
      <CommonFieldset<EmployerOnboardingFormValues>
        control={control}
        register_as="aboutCompany"
        label="About Company"
        type="textarea"
        placeholder="Tell candidates about your company mission and culture..."
        isRequired={true}
        errors={errors}
        textareaClass="min-h-24"
        validationRules={{
          required: "Company description is required",
        }}
      />

      {/* Step 1 Actions */}
      <StepActions onNext={onNext} />
    </div>
  );
}
