"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { LuSparkles } from "react-icons/lu";
import { PostJobFormValues } from "@/types/employer/post-job.types";
import BasicInfoSection from "./basic-info-section";
import JobDescriptionSection from "./job-description-section";
import RequirementsSection from "./requirements-section";
import CompensationSection from "./compensation-section";
import AiMatchingSection from "./ai-matching-section";
import ReviewAndPublishModal from "./review-and-publish-modal";

export type { PostJobFormValues };

export default function PostJobForm() {
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [formDataForReview, setFormDataForReview] = useState<PostJobFormValues | null>(null);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    register,
    formState: { errors },
  } = useForm<PostJobFormValues>({
    defaultValues: {
      jobTitle: "",
      department: "",
      location: "",
      employmentType: "",
      jobDescription: "",
      coreResponsibilities: [],
      skills: [],
      experienceLevel: "",
      education: "",
      salaryRange: "",
      applicationDeadline: "",
      matchingWeights: {
        skills: 30,
        experience: 25,
        requirements: 20,
        education: 15,
        softSkills: 10,
      },
    },
  });

  // Register skills and coreResponsibilities with required validation rules
  useEffect(() => {
    register("skills", {
      validate: (value) =>
        (value && value.length > 0) || "At least one skill or technology is required",
    });
    register("coreResponsibilities", {
      validate: (value) =>
        (value && value.length > 0) || "At least one core responsibility is required",
    });
  }, [register]);

  const jobTitle = watch("jobTitle");
  const department = watch("department");
  const coreResponsibilities = watch("coreResponsibilities") || [];
  const skills = watch("skills") || [];

  const onValidForm = (data: PostJobFormValues) => {
    setFormDataForReview(data);
    setIsReviewOpen(true);
  };

  return (
    <div className="w-full bg-white rounded p-6 sm:p-8 lg:p-9 border border-zinc-200/80 shadow-xs">
      {/* form */}
      <form onSubmit={handleSubmit(onValidForm)} className="space-y-7">
        <BasicInfoSection control={control} errors={errors} />

        <JobDescriptionSection
          control={control}
          errors={errors}
          setValue={setValue}
          jobTitle={jobTitle}
          department={department}
          coreResponsibilities={coreResponsibilities}
          responsibilitiesError={errors.coreResponsibilities?.message}
        />

        <div className="border-t border-zinc-100" />

        <RequirementsSection
          control={control}
          errors={errors}
          setValue={setValue}
          skills={skills}
        />

        <div className="border-t border-zinc-100" />

        <CompensationSection control={control} errors={errors} />

        <div className="border-t border-zinc-100" />

        {/* AI Matching Criteria Weights */}
        <AiMatchingSection setValue={setValue} watch={watch} />

        {/* Submit Action */}
        <Button
          type="submit"
          variant="primary"
          className="w-full py-3.5 rounded text-sm sm:text-base font-semibold shadow-xs hover:shadow flex items-center justify-center gap-2 cursor-pointer"
        >
          <LuSparkles className="size-4.5 text-lime" />
          Review & Publish with AI
        </Button>
      </form>
      {/* AI Review & Publish Modal */}
      {formDataForReview && (
        <ReviewAndPublishModal
          isOpen={isReviewOpen}
          onClose={() => setIsReviewOpen(false)}
          data={formDataForReview}
        />
      )}
    </div>
  );
}
