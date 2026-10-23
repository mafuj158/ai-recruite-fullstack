import type { Metadata } from "next";
import EmployerOnboardingStepper from "./_components/employer-onboarding-stepper";

export const metadata: Metadata = {
  title: "Employer Onboarding",
  description:
    "Set up your company profile, industry, size, and location on AI-Recruite to start posting jobs and reviewing AI candidate assessments.",
};

export default function EmployerOnboardingPage() {
  return <EmployerOnboardingStepper />;
}
