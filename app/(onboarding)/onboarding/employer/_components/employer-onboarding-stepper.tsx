"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import StepperIndicator from "@/app/(onboarding)/onboarding/_components/stepper-indicator";
import StepCompanyInfo from "./step-company-info";
import StepHiringPreferences from "./step-hiring-preferences";
import type {
  EmployerOnboardingFormValues,
  EmployerOnboardingRequestPayload,
} from "@/types/employer/onboarding.types";
import { useEmployerOnboarding } from "@/hooks/employer/use-employer-onboarding";

export type { EmployerOnboardingFormValues };

export default function EmployerOnboardingStepper() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);

  const { completeOnboarding, isPending } = useEmployerOnboarding();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<EmployerOnboardingFormValues>({
    defaultValues: {
      companyName: "",
      companyLogo: "",
      website: "",
      industryId: "",
      companySize: "",
      location: "",
      aboutCompany: "",
      rolesHiringFor: [],
      preferredExpLevels: [],
      budgetRange: "",
    },
    mode: "onTouched",
  });

  const handleStep1Next = async () => {
    const isValid = await trigger([
      "companyName",
      "website",
      "industryId",
      "companySize",
      "location",
      "aboutCompany",
    ]);

    if (isValid) {
      setStep(2);
    }
  };

  const onSubmit = (data: EmployerOnboardingFormValues) => {
    const payload: EmployerOnboardingRequestPayload = {
      companyName: data.companyName,
      companyLogo: data.companyLogo || null,
      website: data.website,
      industryId: data.industryId,
      companySize: data.companySize,
      location: data.location,
      aboutCompany: data.aboutCompany,
      rolesHiringFor: data.rolesHiringFor.map((r) => ({
        id: r.id || undefined,
        label: r.label,
        value: r.value,
      })),
      preferredExpLevels: data.preferredExpLevels,
      budgetRange: data.budgetRange,
    };

    completeOnboarding(payload, {
      onSuccess: (res) => {
        toast.success(res.message || "Company profile setup completed successfully!");
        router.replace("/employer/dashboard");
      },
      onError: (err) => {
        toast.error(
          err.response?.data?.message || "Failed to complete company setup. Please try again."
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
            ? "Step 1 of 2: Company Information"
            : "Step 2 of 2: Hiring Preferences"
        }
      />

      {/* Form Card */}
      <div className="bg-white border border-zinc-200/80 rounded p-4 xs:p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleSubmit(onSubmit)}>
          {step === 1 && (
            <StepCompanyInfo
              control={control}
              setValue={setValue}
              watch={watch}
              errors={errors}
              onNext={handleStep1Next}
            />
          )}

          {step === 2 && (
            <StepHiringPreferences
              control={control}
              onBack={() => setStep(1)}
              loading={isPending}
            />
          )}
        </form>
      </div>
    </div>
  );
}
