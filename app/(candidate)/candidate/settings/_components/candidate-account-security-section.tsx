"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiShield } from "react-icons/fi";
import CommonFieldset from "@/components/ui/fieldset";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import type { CandidateAccountSecurityFormValues } from "@/types/candidate/settings.types";

interface CandidateAccountSecuritySectionProps {
  initialSecurity: CandidateAccountSecurityFormValues;
}

export default function CandidateAccountSecuritySection({
  initialSecurity,
}: CandidateAccountSecuritySectionProps) {
  const [isUpdatingSecurity, setIsUpdatingSecurity] = useState(false);

  // Account Security Form
  const {
    control: secControl,
    handleSubmit: handleSecSubmit,
    formState: { errors: secErrors },
  } = useForm<CandidateAccountSecurityFormValues>({
    defaultValues: initialSecurity,
  });

  const onSubmitSecurity = () => {
    setIsUpdatingSecurity(true);
    setTimeout(() => {
      setIsUpdatingSecurity(false);
      toast.success("Account contact & security details saved!");
    }, 500);
  };

  return (
    <section className="bg-white rounded p-4 sm:p-6 lg:p-8 border border-zinc-200/80 shadow-xs space-y-4 sm:space-y-5">
      <div className="flex items-start justify-between gap-4 pb-3 sm:pb-4 border-b border-zinc-100">
        <div>
          <div className="flex items-center gap-2">
            <div className="size-7 sm:size-8 rounded bg-forest/10 text-forest flex items-center justify-center shrink-0">
              <FiShield className="size-3.5 sm:size-4" />
            </div>
            <h2 className="text-sm sm:text-base md:text-lg font-semibold text-zinc-900">
              Account Security & Login Credentials
            </h2>
          </div>
          <p className="text-[11px] sm:text-xs text-zinc-500 mt-0.5 sm:mt-1">
            Primary contact information and email address for your candidate profile
          </p>
        </div>
      </div>

      <form onSubmit={handleSecSubmit(onSubmitSecurity)} className="space-y-4 sm:space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 lg:gap-5">
          <CommonFieldset<CandidateAccountSecurityFormValues>
            control={secControl}
            register_as="email"
            label="Primary Account Email"
            type="email"
            placeholder="alex@example.com"
            isRequired={true}
            errors={secErrors}
            validationRules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email format",
              },
            }}
          />

          <CommonFieldset<CandidateAccountSecurityFormValues>
            control={secControl}
            register_as="phone"
            label="Phone Number (SMS Recovery)"
            type="text"
            placeholder="+1 (555) 234-5678"
            errors={secErrors}
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-1 sm:pt-2">
          <Button
            type="submit"
            size="md"
            isLoading={isUpdatingSecurity}
            className="w-full sm:w-auto px-6 sm:px-7 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold cursor-pointer"
          >
            Save Account Details
          </Button>
        </div>
      </form>
    </section>
  );
}
