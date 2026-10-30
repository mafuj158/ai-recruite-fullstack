"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import CommonFieldset from "@/components/ui/fieldset";
import RoleSwitcher from "@/components/shared/role-switcher";
import SocialAuthButtons from "@/components/shared/social-auth-buttons";
import toast from "react-hot-toast";
import { RegisterFormValues, RegisterRequestPayload } from "@/types";
import { useRegister } from "@/hooks";
import { USER_ROLES } from "@/constants";

const CandidateRegisterForm = () => {
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onBlur",
  });

  const { registerAsync, isPending } = useRegister(USER_ROLES.CANDIDATE);
  const passwordValue = watch("password");

  const isButtonDisabled =
    isPending ||
    isRedirecting ||
    Object.keys(errors)?.length > 0 ||
    !watch("fullName") ||
    !watch("email") ||
    !watch("password") ||
    !watch("confirmPassword");

  const onSubmit = (formData: RegisterFormValues) => {
    const payload: RegisterRequestPayload = {
      fullName: formData.fullName.trim(),
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
      role: USER_ROLES.CANDIDATE,
    };

    registerAsync(payload, {
      onSuccess: (res) => {
        setIsRedirecting(true);
        toast.success(
          res?.message ||
          "Account created successfully! Please check your email to verify."
        );
        router.replace("/login");
      },
      onError: (error) => {
        const responseData = error.response?.data;
        const serverErrors = responseData?.errors;

        if (serverErrors && serverErrors.length > 0) {
          serverErrors.forEach((err) => {
            setError(err.field as keyof RegisterFormValues, {
              type: "server",
              message: err.message,
            });
          });
          return;
        }

        toast.error(
          responseData?.message || "Registration failed. Please try again."
        );
      },
    });
  };

  return (
    <>
      {/* Role Switcher */}
      <RoleSwitcher activeRole="candidate" />

      {/* Social Logins */}
      <SocialAuthButtons label="Or continue with email" role="candidate" />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 sm:space-y-3.5">
        <CommonFieldset<RegisterFormValues>
          control={control}
          register_as="fullName"
          label="Full Name"
          type="text"
          placeholder="John Doe"
          isRequired={true}
          errors={errors}
          validationRules={{
            required: "Full name is required",
          }}
        />

        <CommonFieldset<RegisterFormValues>
          control={control}
          register_as="email"
          label="Email Address"
          type="email"
          placeholder="john@example.com"
          isRequired={true}
          errors={errors}
          validationRules={{
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          }}
        />

        <CommonFieldset<RegisterFormValues>
          control={control}
          register_as="password"
          label="Password"
          type="password"
          placeholder="••••••••"
          isRequired={true}
          errors={errors}
          validationRules={{
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          }}
        />

        <CommonFieldset<RegisterFormValues>
          control={control}
          register_as="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          isRequired={true}
          errors={errors}
          validationRules={{
            required: "Please confirm your password",
            validate: (value) =>
              value === passwordValue || "Passwords do not match",
          }}
        />

        <Button
          type="submit"
          variant="primary"
          disabled={isButtonDisabled}
          isLoading={isPending || isRedirecting}
          className="w-full text-xs sm:text-sm py-3 sm:py-3.5 rounded mt-2"
        >
          {isRedirecting ? "Creating Account..." : "Create Candidate Account"}
        </Button>
      </form>

      <div className="mt-4 sm:mt-6 text-center text-xs text-zinc-500">
        Already have an account?{" "}
        <Link href="/login" className="text-forest font-semibold hover:underline">
          Sign In
        </Link>
      </div>
    </>
  );
};

export default CandidateRegisterForm;
