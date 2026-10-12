"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiBriefcase, FiPlus, FiX } from "react-icons/fi";
import CommonFieldset from "@/components/ui/fieldset";
import { Button } from "@/components/ui/button";
import { CandidatePreferencesFormValues } from "@/types/candidate/profile.types";
import toast from "react-hot-toast";

interface CandidatePreferencesSectionProps {
  initialValues: CandidatePreferencesFormValues;
  onSave: (values: CandidatePreferencesFormValues) => void;
}

const JOB_STATUS_OPTIONS = [
  { value: "actively_looking", label: "Actively Looking (Ready for interviews)" },
  { value: "open_to_offers", label: "Open to Offers (Open to compelling roles)" },
  { value: "casually_browsing", label: "Casually Browsing (Passive discovery)" },
  { value: "not_looking", label: "Not Looking (Hidden from search)" },
];

const WORK_TYPE_OPTIONS = [
  { value: "Remote", label: "Remote" },
  { value: "Hybrid", label: "Hybrid" },
  { value: "On-site", label: "On-site" },
  { value: "Flexible", label: "Flexible" },
];

const EMPLOYMENT_TYPE_OPTIONS = [
  { value: "Full-time", label: "Full-time" },
  { value: "Contract", label: "Contract" },
  { value: "Part-time", label: "Part-time" },
  { value: "Any", label: "Any" },
];

export default function CandidatePreferencesSection({
  initialValues,
  onSave,
}: CandidatePreferencesSectionProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [newRoleInput, setNewRoleInput] = useState("");

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CandidatePreferencesFormValues>({
    defaultValues: initialValues,
  });

  const preferredRoles = watch("preferredRoles") || [];

  const handleAddRole = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newRoleInput.trim();
    if (trimmed && !preferredRoles.includes(trimmed)) {
      setValue("preferredRoles", [...preferredRoles, trimmed], {
        shouldDirty: true,
      });
      setNewRoleInput("");
    }
  };

  const handleRemoveRole = (roleToRemove: string) => {
    setValue(
      "preferredRoles",
      preferredRoles.filter((r) => r !== roleToRemove),
      { shouldDirty: true }
    );
  };

  const onSubmit = (data: CandidatePreferencesFormValues) => {
    setIsSaving(true);
    setTimeout(() => {
      onSave(data);
      setIsSaving(false);
      toast.success("Career preferences and job search status saved!");
    }, 500);
  };

  return (
    <section className="bg-white rounded p-4 sm:p-6 border border-zinc-200/80 shadow-xs space-y-4 sm:space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
        <div className="flex items-center gap-2">
          <FiBriefcase className="size-4 text-forest" />
          <h2 className="text-sm sm:text-base font-bold text-zinc-900">
            Career Preferences & Job Search Status
          </h2>
        </div>
        <span className="text-xs text-zinc-400 hidden sm:inline">
          Used by AI matching algorithms
        </span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
          {/* Availability Status Select */}
          <CommonFieldset<CandidatePreferencesFormValues>
            control={control}
            register_as="jobSearchStatus"
            label="Job Search Status"
            type="select"
            options={JOB_STATUS_OPTIONS}
            errors={errors}
          />

          {/* Expected Salary */}
          <CommonFieldset<CandidatePreferencesFormValues>
            control={control}
            register_as="expectedSalary"
            label="Expected Annual Salary"
            type="text"
            placeholder="e.g. $140,000 - $175,000"
            errors={errors}
          />

          {/* Work Arrangement Select */}
          <CommonFieldset<CandidatePreferencesFormValues>
            control={control}
            register_as="preferredWorkType"
            label="Preferred Work Location"
            type="select"
            options={WORK_TYPE_OPTIONS}
            errors={errors}
          />

          {/* Employment Type Select */}
          <CommonFieldset<CandidatePreferencesFormValues>
            control={control}
            register_as="preferredEmploymentType"
            label="Employment Engagement Type"
            type="select"
            options={EMPLOYMENT_TYPE_OPTIONS}
            errors={errors}
          />
        </div>

        {/* Desired Target Roles */}
        <div className="space-y-2 pt-2 border-t border-zinc-100">
          <label className="text-xs font-bold text-zinc-700 block">
            Target Roles & Job Titles
          </label>

          <div className="flex flex-wrap items-center gap-1.5 min-h-[32px]">
            {preferredRoles.map((role) => (
              <span
                key={role}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium bg-[#EDF6F1] text-forest border border-[#C2E4D2]/60"
              >
                <span>{role}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveRole(role)}
                  className="hover:text-rose-600 transition-colors cursor-pointer"
                  title="Remove role"
                >
                  <FiX className="size-3" />
                </button>
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 max-w-md pt-1">
            <input
              type="text"
              value={newRoleInput}
              onChange={(e) => setNewRoleInput(e.target.value)}
              placeholder="Add job role (e.g. AI Product Engineer)..."
              className="flex-1 px-3 py-1.5 text-xs rounded bg-zinc-50/70 border border-zinc-200/80 focus:bg-white focus:border-forest focus:ring-1 focus:ring-forest outline-none transition-all"
            />
            <Button
              type="button"
              size="sm"
              onClick={handleAddRole}
              className="shrink-0 gap-1"
            >
              <FiPlus className="size-3.5" />
              <span>Add</span>
            </Button>
          </div>
        </div>

        {/* Section Save Button */}
        <div className="pt-3 border-t border-zinc-100 flex items-center justify-end">
          <Button
            type="submit"
            size="md"
            isLoading={isSaving}
          >
            Save Preferences
          </Button>
        </div>
      </form>
    </section>
  );
}
