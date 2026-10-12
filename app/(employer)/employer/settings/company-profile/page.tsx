import type { Metadata } from "next";
import CompanyProfileForm from "./_components/company-profile-form";

export const metadata: Metadata = {
  title: "Company Profile",
  description:
    "Manage your company brand identity, logo, team scale, contact details, and organization overview on AI-Recruite.",
  alternates: {
    canonical: "/employer/settings/company-profile",
  },
  openGraph: {
    title: "Company Profile Settings | AI-Recruite",
    description:
      "Manage your company brand identity, logo, team scale, contact details, and organization overview on AI-Recruite.",
    url: "/employer/settings/company-profile",
    type: "website",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default async function CompanyProfileSettingsPage() {

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <div className="w-full">
      <CompanyProfileForm />
    </div>
  );
}
