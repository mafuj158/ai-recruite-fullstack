"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import CommonFieldset from "@/components/ui/fieldset";
import { Button } from "@/components/ui/button";
import { LuKeyRound, LuLock } from "react-icons/lu";
import toast from "react-hot-toast";
import type { ChangePasswordFormValues } from "@/types/global.types";

interface ChangePasswordFormProps {
  title?: string;
  description?: string;
  className?: string;
  onSuccess?: () => void;
}

export default function ChangePasswordForm({
  title = "Change Password",
  description = "Ensure your account is using a long, random password to stay secure",
  className,
  onSuccess,
}: ChangePasswordFormProps) {
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  // Form handling for Password Change
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormValues>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPasswordValue = watch("newPassword");

  const onPasswordSubmit = (_data: ChangePasswordFormValues) => {
    setIsUpdatingPassword(true);
    setTimeout(() => {
      setIsUpdatingPassword(false);
      reset();
      toast.success("Password updated successfully!");
      onSuccess?.();
    }, 700);
  };

  // Password strength checklist helpers
  const hasMinLength = (newPasswordValue || "").length >= 8;
  const hasNumberOrSymbol = /[0-9!@#$%^&*(),.?":{}|<>]/.test(
    newPasswordValue || ""
  );
  const hasUpperAndLower =
    /[a-z]/.test(newPasswordValue || "") &&
    /[A-Z]/.test(newPasswordValue || "");

  return (
    <div
      className={`w-full bg-white rounded p-4 sm:p-6 lg:p-8 border border-zinc-200/80 shadow-xs space-y-4 sm:space-y-6 ${
        className ?? ""
      }`}
    >
      <div className="flex items-start justify-between gap-4 pb-3 sm:pb-4 border-b border-zinc-100">
        <div>
          <div className="flex items-center gap-2">
            <div className="size-7 sm:size-8 rounded bg-forest/10 text-forest flex items-center justify-center shrink-0">
              <LuKeyRound className="size-3.5 sm:size-4" />
            </div>
            <h2 className="text-sm sm:text-base md:text-lg font-semibold text-zinc-900">
              {title}
            </h2>
          </div>
          <p className="text-[11px] sm:text-xs text-zinc-500 mt-0.5 sm:mt-1">
            {description}
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onPasswordSubmit)}
        className="space-y-4 sm:space-y-5"
      >
        <CommonFieldset<ChangePasswordFormValues>
          control={control}
          register_as="currentPassword"
          label="Current Password"
          type="password"
          placeholder="Enter current password"
          isRequired={true}
          errors={errors}
          validationRules={{
            required: "Current password is required",
          }}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 lg:gap-5">
          <CommonFieldset<ChangePasswordFormValues>
            control={control}
            register_as="newPassword"
            label="New Password"
            type="password"
            placeholder="Enter new password"
            isRequired={true}
            errors={errors}
            validationRules={{
              required: "New password is required",
              minLength: {
                value: 8,
                message: "Must be at least 8 characters",
              },
            }}
          />

          <CommonFieldset<ChangePasswordFormValues>
            control={control}
            register_as="confirmPassword"
            label="Confirm New Password"
            type="password"
            placeholder="Confirm new password"
            isRequired={true}
            errors={errors}
            validationRules={{
              required: "Please confirm your password",
              validate: (val) =>
                val === newPasswordValue || "Passwords do not match",
            }}
          />
        </div>

        {/* Password Requirements Guide */}
        <div className="p-3 sm:p-4 rounded bg-[#EDF6F1]/60 border border-[#D5E6DC] space-y-1.5 sm:space-y-2">
          <h3 className="text-xs font-semibold text-forest flex items-center gap-1.5">
            <LuLock className="size-3.5" />
            Password Requirements:
          </h3>
          <ul className="text-[11px] sm:text-xs space-y-1 text-zinc-600">
            <li className="flex items-center gap-2">
              <span
                className={`size-1.5 rounded-full ${
                  hasMinLength ? "bg-emerald-600" : "bg-zinc-300"
                }`}
              />
              <span className={hasMinLength ? "text-forest font-medium" : ""}>
                Minimum 8 characters in length
              </span>
            </li>
            <li className="flex items-center gap-2">
              <span
                className={`size-1.5 rounded-full ${
                  hasUpperAndLower ? "bg-emerald-600" : "bg-zinc-300"
                }`}
              />
              <span
                className={hasUpperAndLower ? "text-forest font-medium" : ""}
              >
                Includes both uppercase and lowercase letters
              </span>
            </li>
            <li className="flex items-center gap-2">
              <span
                className={`size-1.5 rounded-full ${
                  hasNumberOrSymbol ? "bg-emerald-600" : "bg-zinc-300"
                }`}
              />
              <span
                className={hasNumberOrSymbol ? "text-forest font-medium" : ""}
              >
                Includes at least one number or special character
              </span>
            </li>
          </ul>
        </div>

        <div className="flex items-center justify-end gap-3 pt-1 sm:pt-2">
          <Button
            type="submit"
            variant="primary"
            isLoading={isUpdatingPassword}
            className="w-full sm:w-auto px-6 sm:px-7 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold rounded shadow-xs hover:shadow cursor-pointer"
          >
            {isUpdatingPassword ? "Updating Password" : "Update Password"}
          </Button>
        </div>
      </form>
    </div>
  );
}
