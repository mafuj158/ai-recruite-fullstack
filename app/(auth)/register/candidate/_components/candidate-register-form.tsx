"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import CommonFieldset from "@/components/ui/fieldset";
import RoleSwitcher from "@/components/shared/role-switcher";
import SocialAuthButtons from "@/components/shared/social-auth-buttons";
import { CandidateRegisterFormValues } from "@/types/auth/register.types";
import toast from "react-hot-toast";

const CandidateRegisterForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CandidateRegisterFormValues>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const passwordValue = watch("password");

  const onSubmit = async (data: CandidateRegisterFormValues) => {
    setLoading(true);

    try {
      toast.success("Account created! Verification email sent.");
      router.push(
        `/verify-email?email=${encodeURIComponent(data.email)}&role=candidate`
      );
    } catch (err: any) {
      toast.error(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Role Switcher */}
      <RoleSwitcher activeRole="candidate" />

      {/* Social Logins */}
      <SocialAuthButtons label="Or continue with email" role="candidate" />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 sm:space-y-3.5">
        <CommonFieldset<CandidateRegisterFormValues>
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

        <CommonFieldset<CandidateRegisterFormValues>
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

        <CommonFieldset<CandidateRegisterFormValues>
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

        <CommonFieldset<CandidateRegisterFormValues>
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
          className="w-full text-xs sm:text-sm py-3 sm:py-3.5 rounded mt-2"
          isLoading={loading}
        >
          Create Candidate Account
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
