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
import { RegisterRequestPayload } from "@/types";

const EmployerRegisterForm = () => {
  const router = useRouter();
  
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterRequestPayload>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const passwordValue = watch("password");

  const onSubmit = async (data: RegisterRequestPayload) => {
   
  };

  return (
    <>
      {/* Role Switcher */}
      <RoleSwitcher activeRole="employer" />

      {/* Social Logins */}
      <SocialAuthButtons label="Or continue with work email" role="employer" />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 sm:space-y-3.5">
        <CommonFieldset<RegisterRequestPayload>
          control={control}
          register_as="fullName"
          label="Full Name"
          type="text"
          placeholder="Jane Doe"
          isRequired={true}
          errors={errors}
          validationRules={{
            required: "Full name is required",
          }}
        />

        <CommonFieldset<RegisterRequestPayload>
          control={control}
          register_as="email"
          label="Work Email Address"
          type="email"
          placeholder="jane@company.com"
          isRequired={true}
          errors={errors}
          validationRules={{
            required: "Work email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          }}
        />

        <CommonFieldset<RegisterRequestPayload>
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

        <CommonFieldset<RegisterRequestPayload>
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
         
        >
          Create Employer Account
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

export default EmployerRegisterForm;
