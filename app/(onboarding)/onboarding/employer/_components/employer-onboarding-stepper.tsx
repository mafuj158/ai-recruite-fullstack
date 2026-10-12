"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import StepperIndicator from "@/app/(onboarding)/onboarding/_components/stepper-indicator";
import StepCompanyInfo from "./step-company-info";
import StepHiringPreferences from "./step-hiring-preferences";
import type { EmployerOnboardingFormValues } from "@/types/employer/onboarding.types";

export type { EmployerOnboardingFormValues };

export default function EmployerOnboardingStepper() {
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
  } = useForm<EmployerOnboardingFormValues>({
    defaultValues: {
      companyName: "",
      companyLogo: "",
      website: "",
      industry: "",
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
      "industry",
      "companySize",
      "location",
      "aboutCompany",
    ]);

    if (isValid) {
      setStep(2);
    }
  };

  const onSubmit = async (data: EmployerOnboardingFormValues) => {
    setLoading(true);

    try {
      console.log("Employer Profile Setup Data:", data);
      toast.success("Company profile setup completed successfully!");
      router.push("/employer/dashboard");
    } catch {
      toast.error("Failed to complete company setup");
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
              loading={loading}
            />
          )}
        </form>
      </div>
    </div>
  );
}
