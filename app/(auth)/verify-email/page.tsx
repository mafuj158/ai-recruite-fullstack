import type { Metadata } from "next";
import VerifyEmailContent from "./_components/verify-email-content";

export const metadata: Metadata = {
  title: "Verify Your Email",
  description:
    "Check your email inbox and click the verification link to activate your AI-Recruite account.",
};

export default async function VerifyEmailPage() {

  // for delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <VerifyEmailContent />
  );
}
