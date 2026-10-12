import type { Metadata } from "next";
import CandidatePrivacyVisibilitySection from "../_components/candidate-privacy-visibility-section";
import { DEFAULT_PRIVACY_SETTINGS } from "../dummy";

export const metadata: Metadata = {
  title: "Privacy & Recruiter Visibility",
  description:
    "Control candidate profile discovery, exclude current employer or blocked companies, and manage personal data.",
};

export default async function CandidatePrivacySettingsPage() {
  // for delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return (
    <div className="w-full">
      <CandidatePrivacyVisibilitySection
        initialPrivacy={DEFAULT_PRIVACY_SETTINGS}
      />
    </div>
  );
}
