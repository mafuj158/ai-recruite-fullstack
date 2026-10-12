import { Control, FieldErrors } from "react-hook-form";
import CommonFieldset from "@/components/ui/fieldset";
import dayjs from "dayjs";
import { PostJobFormValues } from "@/types/employer/post-job.types";

interface CompensationSectionProps {
  control: Control<PostJobFormValues>;
  errors: FieldErrors<PostJobFormValues>;
}

export default function CompensationSection({
  control,
  errors,
}: CompensationSectionProps) {
  const today = dayjs().format("YYYY-MM-DD");

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2">
        <h2 className="text-sm sm:text-base font-semibold text-zinc-900">
          Compensation & Timeline
        </h2>
        <span className="text-xs text-zinc-400">
          <span className="hidden sm:inline">• </span>Salary range & application deadline
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        <CommonFieldset<PostJobFormValues>
          control={control}
          register_as="salaryRange"
          label="Salary Range"
          placeholder="e.g. $120k - $180k"
          isRequired={true}
          errors={errors}
          validationRules={{
            required: "Salary range is required",
          }}
        />

        <CommonFieldset<PostJobFormValues>
          control={control}
          register_as="applicationDeadline"
          label="Application Deadline"
          type="date"
          placeholder="Select deadline date"
          min={today}
          isRequired={true}
          errors={errors}
          validationRules={{
            required: "Application deadline is required",
          }}
        />
      </div>
    </div>
  );
}
