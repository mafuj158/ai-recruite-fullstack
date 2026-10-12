import type { Metadata } from "next";
import { FaKey } from "react-icons/fa6";
import ForgotPasswordForm from "./_components/forgot-password-form";

export const metadata: Metadata = {
  title: "Forgot Password",
  description:
    "Reset your AI-Recruite password. Enter your registered email to receive account recovery instructions.",
};

export default async function ForgotPasswordPage() {

  // for delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <>
      {/* Icon Badge */}
      <div className="size-13 sm:size-16 rounded-full bg-[#EDF6F1] flex items-center justify-center mx-auto mb-3 sm:mb-4">
        <div className="size-9 sm:size-11 rounded-full bg-white border border-[#D5E6DC] flex items-center justify-center shadow-xs">
          <FaKey className="size-3.5 sm:size-4 text-forest" />
        </div>
      </div>

      <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 text-center">
        Reset Password
      </h1>
      <p className="text-xs text-zinc-500 text-center mt-1 mb-4 sm:mb-6">
        Enter your email to receive recovery instructions
      </p>

      {/* Form */}
      <ForgotPasswordForm />
    </>
  );
}
