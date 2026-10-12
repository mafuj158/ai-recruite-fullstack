"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import CommonFieldset from "@/components/ui/fieldset";
import toast from "react-hot-toast";

interface ForgotPasswordFormValues {
  email: string;
}

const ForgotPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setLoading(true);

    try {
      toast.success("Password reset link sent to your email");
      setSubmittedEmail(data.email);
    } catch (err: any) {
      toast.error(err.message || "Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  if (submittedEmail) {
    return (
      <div className="text-center py-2 sm:py-4 space-y-3 sm:space-y-4">
        <p className="text-xs sm:text-sm text-zinc-600">
          If an account exists for{" "}
          <span className="font-semibold text-zinc-900">{submittedEmail}</span>,
          you will receive a recovery email shortly.
        </p>
        <Link href="/login" className="inline-block mt-2">
          <Button variant="primary" className="text-xs sm:text-sm py-2 sm:py-2.5 px-5 sm:px-6 rounded">
            Back to Login
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
        <CommonFieldset<ForgotPasswordFormValues>
          control={control}
          register_as="email"
          label="Email Address"
          type="email"
          placeholder="name@example.com"
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

        <Button
          type="submit"
          variant="primary"
          className="w-full text-xs sm:text-sm py-3 sm:py-3.5 rounded"
          isLoading={loading}
        >
          Send Reset Link
        </Button>
      </form>

      <div className="mt-4 sm:mt-6 text-center text-xs text-zinc-500">
        Remember your password?{" "}
        <Link href="/login" className="text-forest font-semibold hover:underline">
          Sign In
        </Link>
      </div>
    </>
  );
};

export default ForgotPasswordForm;
