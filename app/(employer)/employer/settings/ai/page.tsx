import type { Metadata } from "next";
import AiSettingsForm from "./_components/ai-settings-form";

export const metadata: Metadata = {
  title: "AI Configuration",
  description:
    "Configure company-wide AI candidate matching weights, automated interview triggers, and pre-screening criteria.",
};

export default async function EmployerAiSettingsPage() {

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return <AiSettingsForm />;
}
