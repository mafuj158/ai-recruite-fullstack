import type { Metadata } from "next";
import { FaLock } from "react-icons/fa6";
import SetNewPasswordForm from "./_components/set-new-password-form";

export const metadata: Metadata = {
  title: "Set New Password",
  description:
    "Choose a strong, secure new password for your AI-Recruite account.",
};

export default async function SetNewPasswordPage() {

  // for delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <>
      {/* Icon Badge */}
      <div className="size-13 sm:size-16 rounded-full bg-[#EDF6F1] flex items-center justify-center mx-auto mb-3 sm:mb-4">
        <div className="size-9 sm:size-11 rounded-full bg-white border border-[#D5E6DC] flex items-center justify-center shadow-xs">
          <FaLock className="size-3.5 sm:size-4 text-forest" />
        </div>
      </div>

      <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 text-center">
        Set New Password
      </h1>
      <p className="text-xs text-zinc-500 text-center mt-1 mb-4 sm:mb-6">
        Your new password must be different from previously used passwords
      </p>

      {/* Form */}
      <SetNewPasswordForm />
    </>
  );
}
