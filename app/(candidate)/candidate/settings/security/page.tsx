import type { Metadata } from "next";
import CandidateAccountSecuritySection from "../_components/candidate-account-security-section";
import CandidateSessionsSection from "../_components/candidate-sessions-section";
import ChangePasswordForm from "@/components/shared/change-password-form";
import DangerZone from "@/components/shared/danger-zone";
import { DEFAULT_ACCOUNT_SECURITY, DEFAULT_SESSION_DEVICES } from "../dummy";

export const metadata: Metadata = {
  title: "Account & Security",
  description:
    "Manage candidate login credentials, active devices, and account deletion.",
};

export default async function CandidateSecuritySettingsPage() {
  // for delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return (
    <div className="w-full space-y-4 sm:space-y-6 lg:space-y-8">
      {/* 1. Account Contact Information */}
      <CandidateAccountSecuritySection
        initialSecurity={DEFAULT_ACCOUNT_SECURITY}
      />

      {/* 2. Change Password (Common Component) */}
      <ChangePasswordForm />

      {/* 3. Active Sessions & Devices */}
      <CandidateSessionsSection initialDevices={DEFAULT_SESSION_DEVICES} />

      {/* 4. Danger Zone (Common Component) */}
      <DangerZone />
    </div>
  );
}
