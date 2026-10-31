import { Control, FieldErrors } from "react-hook-form";
import CommonFieldset from "@/components/ui/fieldset";
import { CreateJobPayload } from "@/types/employer/post-job.types";
import { EMPLOYMENT_TYPE_OPTIONS } from "./post-job.constants";

interface BasicInfoSectionProps {
  control: Control<CreateJobPayload>;
  errors: FieldErrors<CreateJobPayload>;
}

export default function BasicInfoSection({
  control,
  errors,
}: BasicInfoSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2">
        <h2 className="text-sm sm:text-base font-semibold text-zinc-900">
          Basic Information
        </h2>
        <span className="text-xs text-zinc-400">
          <span className="hidden sm:inline">• </span>Role details
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        <CommonFieldset<CreateJobPayload>
          control={control}
          register_as="jobTitle"
          label="Job Title"
          placeholder="e.g. Senior Full Stack Developer"
          isRequired={true}
          errors={errors}
          validationRules={{
            required: "Job title is required",
          }}
        />

        <CommonFieldset<CreateJobPayload>
          control={control}
          register_as="department"
          label="Department"
          placeholder="e.g. Engineering"
          isRequired={true}
          errors={errors}
          validationRules={{
            required: "Department is required",
          }}
        />

        <CommonFieldset<CreateJobPayload>
          control={control}
          register_as="location"
          label="Location"
          placeholder="e.g. San Francisco, CA or Remote"
          isRequired={true}
          errors={errors}
          validationRules={{
            required: "Location is required",
          }}
        />

        <CommonFieldset<CreateJobPayload>
          control={control}
          register_as="employmentType"
          label="Employment Type"
          type="select"
          placeholder="Select employment type"
          options={EMPLOYMENT_TYPE_OPTIONS}
          isRequired={true}
          errors={errors}
          validationRules={{
            required: "Employment type is required",
          }}
        />
      </div>
    </div>
  );
}
