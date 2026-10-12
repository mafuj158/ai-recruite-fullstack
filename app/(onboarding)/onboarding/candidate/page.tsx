import type { Metadata } from "next";
import CandidateOnboardingStepper from "./_components/candidate-onboarding-stepper";

export const metadata: Metadata = {
  title: "Candidate Onboarding",
  description:
    "Complete your candidate profile, experience, skills, and resume upload to start practicing AI mock interviews and receive top job matches.",
};

export default async function CandidateOnboardingPage() {

  // for delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <CandidateOnboardingStepper />
  )
}
