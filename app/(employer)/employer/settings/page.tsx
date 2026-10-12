import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings Redirect",
  robots: {
    index: false,
    follow: false,
  },
};

export default function EmployerSettingsPage() {
  redirect("/employer/settings/company-profile");
}
