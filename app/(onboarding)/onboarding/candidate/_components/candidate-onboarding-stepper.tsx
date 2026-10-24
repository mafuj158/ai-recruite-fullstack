"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import StepperIndicator from "@/app/(onboarding)/onboarding/_components/stepper-indicator";
import StepPersonalInfo from "./step-personal-info";
import StepCvSelection from "./step-cv-selection";
import type {
  CandidateOnboardingFormValues,
  CandidateOnboardingRequestPayload,
} from "@/types/candidate/onboarding.types";
import { useCandidateOnboarding } from "@/hooks/candidate/use-candidate-onboarding";

export type { CandidateOnboardingFormValues };

export default function CandidateOnboardingStepper() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);

  const { completeOnboarding, isPending } = useCandidateOnboarding();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    trigger,
  } = useForm<CandidateOnboardingFormValues>({
    defaultValues: {
      jobRoleId: "",
      skills: [],
      experienceLevel: "",
      preferredLocation: "",
      workType: "Remote",
      salaryExpectation: "",
      industryId: "",
      bio: "",
      cvOption: "upload",
      cvFileName: "",
      cvFileSize: "",
    },
    mode: "onTouched",
  });

  const handleStep1Next = async () => {
    const isValid = await trigger([
      "jobRoleId",
      "skills",
      "experienceLevel",
      "workType",
      "preferredLocation",
      "salaryExpectation",
    ]);

    if (isValid) {
      setStep(2);
    }
  };

  const onSubmit = (data: CandidateOnboardingFormValues) => {
    if (data.cvOption === "upload" && !data.cvFileName) {
      toast.error("Please upload your CV or choose to generate one with AI.");
      return;
    }

    const payload: CandidateOnboardingRequestPayload = {
      jobRoleId: data.jobRoleId,
      skills: data.skills.map((s) => ({
        id: s.id || undefined,
        label: s.label,
        value: s.value,
      })),
      experienceLevel: data.experienceLevel,
      preferredLocation: data.preferredLocation,
      workType: data.workType,
      salaryExpectation: data.salaryExpectation,
      industryId: data.industryId || null,
      bio: data.bio || null,
      cvOption: data.cvOption,
      cvFileName: data.cvFileName || null,
      cvFileSize: data.cvFileSize || null,
    };

    completeOnboarding(payload, {
      onSuccess: (res) => {
        toast.success(res.message || "Profile setup completed successfully!");
        router.replace("/candidate/dashboard");
      },
      onError: (err) => {
        toast.error(
          err.response?.data?.message || "Failed to complete profile setup. Please try again."
        );
      },
    });
  };

  return (
    <div className="w-full">
      {/* Top Stepper Indicator */}
      <StepperIndicator
        currentStep={step}
        label={
          step === 1
            ? "Step 1 of 2: Personal Information"
            : "Step 2 of 2: Select CV Option"
        }
      />

      {/* Main Card */}
      <div className="bg-white border border-zinc-200/80 rounded p-4 xs:p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleSubmit(onSubmit)}>
          {step === 1 && (
            <StepPersonalInfo
              control={control}
              onNext={handleStep1Next}
            />
          )}

          {step === 2 && (
            <StepCvSelection
              setValue={setValue}
              watch={watch}
              onBack={() => setStep(1)}
              loading={isPending}
            />
          )}
        </form>
      </div>
    </div>
  );
}
