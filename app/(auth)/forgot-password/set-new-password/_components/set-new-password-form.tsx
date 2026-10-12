"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import CommonFieldset from "@/components/ui/fieldset";
import { FaCircleCheck, FaCheck, FaArrowRight } from "react-icons/fa6";
import toast from "react-hot-toast";

interface SetNewPasswordFormValues {
  newPassword: string;
  confirmPassword: string;
}

const SetNewPasswordForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SetNewPasswordFormValues>({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const newPassword = watch("newPassword") || "";
  const confirmPassword = watch("confirmPassword") || "";

  // Password requirement checks
  const hasMinLength = newPassword.length >= 8;
  const hasNumber = /\d/.test(newPassword);
  const passwordsMatch = newPassword.length > 0 && newPassword === confirmPassword;

  const onSubmit = async (data: SetNewPasswordFormValues) => {
    setLoading(true);

    try {
      // Simulate password reset API
      await new Promise((resolve) => setTimeout(resolve, 800));
      toast.success("Password updated successfully!");
      setIsSuccess(true);
    } catch (err: any) {
      toast.error(err.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  // Success Confirmation View
  if (isSuccess) {
    return (
      <div className="text-center py-2 sm:py-4">
        <div className="size-13 sm:size-16 rounded-full bg-[#EDF6F1] flex items-center justify-center mx-auto mb-3 sm:mb-4">
          <div className="size-9 sm:size-11 rounded-full bg-white border border-[#D5E6DC] flex items-center justify-center shadow-xs">
            <FaCircleCheck className="size-4 sm:size-5 text-forest" />
          </div>
        </div>

        <h2 className="text-lg sm:text-xl font-bold text-zinc-900">
          Password Updated!
        </h2>
        <p className="text-xs text-zinc-500 mt-1.5 sm:mt-2 mb-4 sm:mb-6">
          Your password has been changed successfully. You can now log in to
          your account with your new password.
        </p>

        <Button
          variant="primary"
          onClick={() => router.push("/login")}
          className="w-full text-xs sm:text-sm py-3 sm:py-3.5 rounded flex items-center justify-center gap-2"
        >
          <span>Sign In to Your Account</span>
          <FaArrowRight className="size-3.5" />
        </Button>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
        {/* New Password */}
        <CommonFieldset<SetNewPasswordFormValues>
          control={control}
          register_as="newPassword"
          label="New Password"
          type="password"
          placeholder="••••••••"
          isRequired={true}
          errors={errors}
          validationRules={{
            required: "New password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          }}
        />

        {/* Confirm Password */}
        <CommonFieldset<SetNewPasswordFormValues>
          control={control}
          register_as="confirmPassword"
          label="Confirm New Password"
          type="password"
          placeholder="••••••••"
          isRequired={true}
          errors={errors}
          validationRules={{
            required: "Please confirm your password",
            validate: (value) =>
              value === newPassword || "Passwords do not match",
          }}
        />

        {/* Password Strength / Requirements Checklist */}
        <div className="bg-zinc-50 border border-zinc-200/70 rounded p-2.5 sm:p-3 space-y-1.5 sm:space-y-2">
          <p className="text-[11px] font-semibold text-zinc-600 mb-1">
            Password requirements:
          </p>
          <div className="flex items-center gap-2 text-xs">
            <span
              className={`size-4 rounded-full flex items-center justify-center text-[9px] transition-colors ${
                hasMinLength
                  ? "bg-forest text-white"
                  : "bg-zinc-200 text-zinc-500"
              }`}
            >
              <FaCheck />
            </span>
            <span
              className={hasMinLength ? "text-zinc-900 font-medium" : "text-zinc-500"}
            >
              At least 8 characters long
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span
              className={`size-4 rounded-full flex items-center justify-center text-[9px] transition-colors ${
                hasNumber ? "bg-forest text-white" : "bg-zinc-200 text-zinc-500"
              }`}
            >
              <FaCheck />
            </span>
            <span
              className={hasNumber ? "text-zinc-900 font-medium" : "text-zinc-500"}
            >
              Contains at least one number
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span
              className={`size-4 rounded-full flex items-center justify-center text-[9px] transition-colors ${
                passwordsMatch
                  ? "bg-forest text-white"
                  : "bg-zinc-200 text-zinc-500"
              }`}
            >
              <FaCheck />
            </span>
            <span
              className={
                passwordsMatch ? "text-zinc-900 font-medium" : "text-zinc-500"
              }
            >
              Passwords match
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          className="w-full text-xs sm:text-sm py-3 sm:py-3.5 rounded"
          isLoading={loading}
        >
          Reset Password
        </Button>
      </form>

      {/* Back to Login Footer */}
      <div className="mt-4 sm:mt-6 text-center text-xs text-zinc-500">
        Remember your password?{" "}
        <Link href="/login" className="text-forest font-semibold hover:underline">
          Sign In
        </Link>
      </div>
    </>
  );
};

export default SetNewPasswordForm;
