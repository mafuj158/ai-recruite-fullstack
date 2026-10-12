"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiUser } from "react-icons/fi";
import CommonFieldset from "@/components/ui/fieldset";
import { Button } from "@/components/ui/button";
import { CandidateBasicInfoFormValues } from "@/types/candidate/profile.types";
import toast from "react-hot-toast";

interface CandidateBasicInfoSectionProps {
  initialValues: CandidateBasicInfoFormValues;
  onSave: (values: CandidateBasicInfoFormValues) => void;
}

export default function CandidateBasicInfoSection({
  initialValues,
  onSave,
}: CandidateBasicInfoSectionProps) {
  const [isSaving, setIsSaving] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<CandidateBasicInfoFormValues>({
    defaultValues: initialValues,
  });

  const onSubmit = (data: CandidateBasicInfoFormValues) => {
    setIsSaving(true);
    setTimeout(() => {
      onSave(data);
      setIsSaving(false);
      toast.success("Personal and contact information saved!");
    }, 500);
  };

  return (
    <section className="bg-white rounded p-4 sm:p-6 border border-zinc-200/80 shadow-xs space-y-4 sm:space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
        <div className="flex items-center gap-2">
          <FiUser className="size-4 text-forest" />
          <h2 className="text-sm sm:text-base font-bold text-zinc-900">
            Personal & Contact Information
          </h2>
        </div>
        <span className="text-xs text-zinc-400 hidden sm:inline">
          Publicly visible to verified recruiters
        </span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
          {/* Full Name */}
          <CommonFieldset<CandidateBasicInfoFormValues>
            control={control}
            register_as="fullName"
            label="Full Name"
            placeholder="e.g. Alex Morgan"
            isRequired={true}
            errors={errors}
            validationRules={{
              required: "Full name is required",
            }}
          />

          {/* Professional Headline */}
          <CommonFieldset<CandidateBasicInfoFormValues>
            control={control}
            register_as="headline"
            label="Professional Title / Headline"
            placeholder="e.g. Senior Full Stack Engineer"
            isRequired={true}
            errors={errors}
            validationRules={{
              required: "Professional title is required",
            }}
          />

          {/* Email */}
          <CommonFieldset<CandidateBasicInfoFormValues>
            control={control}
            register_as="email"
            label="Email Address"
            type="email"
            placeholder="e.g. alex@example.com"
            isRequired={true}
            errors={errors}
            validationRules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            }}
          />

          {/* Phone */}
          <CommonFieldset<CandidateBasicInfoFormValues>
            control={control}
            register_as="phone"
            label="Phone Number"
            type="text"
            placeholder="e.g. +1 (555) 234-5678"
            errors={errors}
          />

          {/* Location */}
          <div className="sm:col-span-2">
            <CommonFieldset<CandidateBasicInfoFormValues>
              control={control}
              register_as="location"
              label="Current Location"
              type="text"
              placeholder="e.g. San Francisco, CA (Open to Remote)"
              errors={errors}
            />
          </div>

          {/* Professional Bio */}
          <div className="sm:col-span-2">
            <CommonFieldset<CandidateBasicInfoFormValues>
              control={control}
              register_as="bio"
              label="Professional Summary / Bio"
              type="textarea"
              placeholder="Summarize your technical background, leadership accomplishments, and career highlights..."
              errors={errors}
            />
          </div>
        </div>

        {/* Social / Portfolio Links */}
        <div className="pt-3 border-t border-zinc-100 space-y-3">
          <h3 className="text-xs font-bold text-zinc-800 uppercase tracking-wider">
            Social Profiles & Portfolios
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <CommonFieldset<CandidateBasicInfoFormValues>
              control={control}
              register_as="portfolioUrl"
              label="Portfolio Website"
              placeholder="https://yourportfolio.com"
              errors={errors}
            />

            <CommonFieldset<CandidateBasicInfoFormValues>
              control={control}
              register_as="githubUrl"
              label="GitHub Profile"
              placeholder="https://github.com/username"
              errors={errors}
            />

            <CommonFieldset<CandidateBasicInfoFormValues>
              control={control}
              register_as="linkedinUrl"
              label="LinkedIn Profile"
              placeholder="https://linkedin.com/in/username"
              errors={errors}
            />
          </div>
        </div>

        {/* Section Save Button */}
        <div className="pt-3 border-t border-zinc-100 flex items-center justify-end">
          <Button
            type="submit"
            size="md"
            isLoading={isSaving}
          >
            Save Personal Info
          </Button>
        </div>
      </form>
    </section>
  );
}
