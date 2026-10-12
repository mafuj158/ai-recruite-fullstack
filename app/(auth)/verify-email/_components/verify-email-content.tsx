"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  FaEnvelopeOpenText,
  FaCircleCheck,
  FaArrowRight,
  FaRotateRight,
} from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export default function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const role = searchParams.get("role") || "candidate";
  const verified = searchParams.get("verified") === "true";

  const [resendCooldown, setResendCooldown] = useState(0);
  const [resending, setResending] = useState(false);
  const [isVerified, setIsVerified] = useState(verified);

  // Countdown timer for resend email
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  // Handle simulated or real link verification
  const handleVerifyNow = () => {
    setIsVerified(true);
    toast.success("Email verified successfully!");
    setTimeout(() => {
      if (role === "employer") {
        router.push("/onboarding/employer");
      } else {
        router.push("/onboarding/candidate");
      }
    }, 1200);
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;
    setResending(true);
    try {
      // Simulate sending email
      await new Promise((resolve) => setTimeout(resolve, 800));
      toast.success("Verification link sent! Check your inbox.");
      setResendCooldown(30);
    } catch {
      toast.error("Failed to resend email. Please try again.");
    } finally {
      setResending(false);
    }
  };

  // State when email is verified
  if (isVerified) {
    return (
      <div className="text-center py-2 sm:py-4">
        {/* Success Icon Badge */}
        <div className="size-13 sm:size-16 rounded-full bg-[#EDF6F1] flex items-center justify-center mx-auto mb-3 sm:mb-4">
          <div className="size-9 sm:size-11 rounded-full bg-white border border-[#D5E6DC] flex items-center justify-center shadow-xs">
            <FaCircleCheck className="size-4 sm:size-5 text-forest" />
          </div>
        </div>

        <h1 className="text-xl sm:text-2xl font-bold text-zinc-900">
          Email Verified Successfully!
        </h1>
        <p className="text-xs text-zinc-500 mt-1.5 sm:mt-2 mb-4 sm:mb-6">
          Your email has been confirmed. Setting up your profile...
        </p>

        <Button
          variant="primary"
          onClick={() =>
            router.push(
              role === "employer"
                ? "/onboarding/employer"
                : "/onboarding/candidate"
            )
          }
          className="w-full text-xs sm:text-sm py-3 sm:py-3.5 rounded flex items-center justify-center gap-2"
        >
          <span>Continue to Onboarding</span>
          <FaArrowRight className="size-3.5" />
        </Button>
      </div>
    );
  }

  // Default: Check inbox state
  return (
    <div className="text-center">
      {/* Icon Badge */}
      <div className="size-13 sm:size-16 rounded-full bg-[#EDF6F1] flex items-center justify-center mx-auto mb-3 sm:mb-4">
        <div className="size-9 sm:size-11 rounded-full bg-white border border-[#D5E6DC] flex items-center justify-center shadow-xs">
          <FaEnvelopeOpenText className="size-4 sm:size-5 text-forest" />
        </div>
      </div>

      <h1 className="text-xl sm:text-2xl font-bold text-zinc-900">Check Your Email</h1>
      <p className="text-xs text-zinc-500 mt-1 mb-2.5 sm:mb-3">
        We&apos;ve sent a verification link to:
      </p>

      {/* Recipient Email Address Badge */}
      <div className="inline-block bg-zinc-100 border border-zinc-200/80 px-3 py-1.5 sm:px-4 sm:py-2 rounded text-xs sm:text-sm font-semibold text-zinc-800 break-all max-w-full mb-3.5 sm:mb-5">
        {email || "your email address"}
      </div>

      <p className="text-xs text-zinc-500 leading-relaxed max-w-sm mx-auto mb-4 sm:mb-6">
        Click the link in the email to activate your account. If you don&apos;t
        see it within a few minutes, be sure to check your spam or junk folder.
      </p>
      {/* Resend Verification Email Button */}
      <button
        type="button"
        onClick={handleResend}
        disabled={resendCooldown > 0 || resending}
        className="w-full py-2 sm:py-2.5 px-3 sm:px-4 text-xs font-semibold rounded border border-zinc-200 text-zinc-700 hover:bg-zinc-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 cursor-pointer"
      >
        <FaRotateRight className={`size-3 ${resending ? "animate-spin" : ""}`} />
        <span>
          {resendCooldown > 0
            ? `Resend available in ${resendCooldown}s`
            : "Resend Verification Email"}
        </span>
      </button>

      {/* Footer Navigation */}
      <div className="mt-5 sm:mt-8 pt-3 sm:pt-4 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500">
        <Link
          href={role === "employer" ? "/register/employer" : "/register/candidate"}
          className="hover:text-forest transition-colors"
        >
          Wrong email address?
        </Link>
        <Link
          href="/login"
          className="text-forest font-semibold hover:underline"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
}
