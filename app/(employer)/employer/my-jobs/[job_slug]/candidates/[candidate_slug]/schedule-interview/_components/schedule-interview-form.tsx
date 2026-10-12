"use client";

import { useForm } from "react-hook-form";
import {
  LuCalendar,
  LuLink,
  LuSend,
  LuSparkles,
} from "react-icons/lu";
import CommonFieldset from "@/components/ui/fieldset";
import { Button } from "@/components/ui/button";
import {
  ScheduleInterviewFormValues,
} from "@/types/employer/schedule-interview.types";

interface ScheduleInterviewFormProps {
  candidateName: string;
  jobTitle: string;
  onSubmit: (values: ScheduleInterviewFormValues) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const INTERVIEW_TYPE_OPTIONS = [
  { label: "Video Call (Google Meet, Zoom, Teams)", value: "video" },
  { label: "Phone Call", value: "phone" },
  { label: "In-Person Meeting (Office)", value: "in_person" },
];

const DURATION_OPTIONS = [
  { label: "30 minutes", value: "30 minutes" },
  { label: "45 minutes", value: "45 minutes" },
  { label: "60 minutes", value: "60 minutes" },
  { label: "90 minutes", value: "90 minutes" },
];

export default function ScheduleInterviewForm({
  candidateName,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: ScheduleInterviewFormProps) {
  const defaultDate = new Date(Date.now() + 86400000 * 2).toISOString().split("T")[0];

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ScheduleInterviewFormValues>({
    defaultValues: {
      interviewType: "video",
      title: `Technical Interview with ${candidateName}`,
      dateTime: `${defaultDate} 14:00`,
      duration: "45 minutes",
      meetingLink: "https://meet.google.com/abc-defg-hij",
      additionalNotes: "",
    },
  });

  const handleFormSubmit = (data: ScheduleInterviewFormValues) => {
    const [datePart, timePart] = (data.dateTime || "").split(" ");
    return onSubmit({
      ...data,
      date: datePart || "",
      time: timePart || "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="bg-white rounded border border-zinc-200/80 p-6 sm:p-8 shadow-2xs space-y-5"
    >
      {/* 1. Interview Title using CommonFieldset */}
      <CommonFieldset<ScheduleInterviewFormValues>
        control={control}
        register_as="title"
        label="Interview Title"
        placeholder="e.g. Technical Screening Round"
        isRequired={true}
        errors={errors}
        validationRules={{ required: "Interview title is required" }}
        icon={<LuSparkles className="size-4 text-forest" />}
      />

      {/* 2. Interview Type using CommonFieldset Select */}
      <CommonFieldset<ScheduleInterviewFormValues>
        control={control}
        register_as="interviewType"
        type="select"
        label="Interview Type"
        placeholder="Select interview type"
        options={INTERVIEW_TYPE_OPTIONS}
        isRequired={true}
        errors={errors}
        validationRules={{ required: "Interview type is required" }}
      />

      {/* 3. Date & Time using CommonFieldset datetime picker */}
      <CommonFieldset<ScheduleInterviewFormValues>
        control={control}
        register_as="dateTime"
        type="datetime"
        label="Interview Date & Time"
        placeholder="Select date and time"
        isRequired={true}
        errors={errors}
        validationRules={{ required: "Interview date and time is required" }}
        icon={<LuCalendar className="size-4 text-zinc-400" />}
      />

      {/* 4. Duration using CommonFieldset Select */}
      <CommonFieldset<ScheduleInterviewFormValues>
        control={control}
        register_as="duration"
        type="select"
        label="Duration"
        placeholder="Select duration"
        options={DURATION_OPTIONS}
        isRequired={true}
        errors={errors}
        validationRules={{ required: "Duration is required" }}
      />

      {/* 5. Meeting Link using CommonFieldset */}
      <CommonFieldset<ScheduleInterviewFormValues>
        control={control}
        register_as="meetingLink"
        label="Meeting Link / Location"
        placeholder="https://meet.google.com/abc-defg-hij"
        isRequired={true}
        errors={errors}
        validationRules={{ required: "Meeting link or location is required" }}
        icon={<LuLink className="size-4 text-zinc-400" />}
      />

      {/* 7. Additional Notes using CommonFieldset Textarea */}
      <CommonFieldset<ScheduleInterviewFormValues>
        control={control}
        register_as="additionalNotes"
        type="textarea"
        label="Additional Instructions (Optional)"
        placeholder="Any instructions, preparation agenda, or notes for the candidate..."
        errors={errors}
        textareaClass="min-h-24"
      />

      {/* 8. Action Buttons using Common Button component */}
      <div className="flex items-center gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          size="md"
          onClick={onCancel}
          disabled={isSubmitting}
          className="border border-[#DFE1E7] bg-white text-zinc-700 hover:bg-zinc-50 rounded"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={isSubmitting}
          loadingType="spinner"
          className="flex-1 sm:flex-initial gap-2 rounded"
        >
          <LuSend className="size-4" />
          <span>Send Invitation</span>
        </Button>
      </div>
    </form>
  );
}
