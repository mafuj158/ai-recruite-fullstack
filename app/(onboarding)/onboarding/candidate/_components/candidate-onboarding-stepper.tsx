"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import StepperIndicator from "@/app/(onboarding)/onboarding/_components/stepper-indicator";
import StepPersonalInfo from "./step-personal-info";
import StepCvSelection from "./step-cv-selection";
import type { CandidateOnboardingFormValues } from "@/types/candidate/onboarding.types";

export type { CandidateOnboardingFormValues };

export default function CandidateOnboardingStepper() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<CandidateOnboardingFormValues>({
    defaultValues: {
      jobTitle: "",
      skills: [],
      experienceLevel: "",
      preferredLocation: "",
      workType: "Remote",
      salaryExpectation: "",
      industry: "",
      bio: "",
      cvOption: "upload",
      cvFileName: "",
      cvFileSize: "",
    },
    mode: "onTouched",
  });

  const handleStep1Next = async () => {
    const isValid = await trigger([
      "jobTitle",
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

  const onSubmit = async (data: CandidateOnboardingFormValues) => {
    if (data.cvOption === "upload" && !data.cvFileName) {
      toast.error("Please upload your CV or choose to generate one with AI.");
      return;
    }

    setLoading(true);

    try {
      console.log("Candidate Profile Setup Data:", data);
      toast.success("Profile setup completed successfully!");
      router.push("/candidate/dashboard");
    } catch {
      toast.error("Failed to complete profile setup");
    } finally {
      setLoading(false);
    }
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
              loading={loading}
            />
          )}
        </form>
      </div>
    </div>
  );
}
