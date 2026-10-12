import type { Metadata } from "next";
import ChangePasswordForm from "@/components/shared/change-password-form";
import DangerZone from "@/components/shared/danger-zone";

export const metadata: Metadata = {
  title: "Security & Credentials",
  description:
    "Manage company password credentials, account security, session termination, and organizational data controls.",
  alternates: {
    canonical: "/employer/settings/security",
  },
  openGraph: {
    title: "Security Settings | AI-Recruite",
    description:
      "Manage company password credentials, account security, session termination, and organizational data controls.",
    url: "/employer/settings/security",
    type: "website",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default async function SecuritySettingsPage() {

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <div className="w-full space-y-4 sm:space-y-6 lg:space-y-8">
      {/* ========================================================================= */}
      {/* SECTION 1: CHANGE PASSWORD FORM                                           */}
      {/* ========================================================================= */}
      <ChangePasswordForm />
      {/* ========================================================================= */}
      {/* SECTION 2: DANGER ZONE                                                    */}
      {/* ========================================================================= */}
      <DangerZone />
    </div>
  );
}
