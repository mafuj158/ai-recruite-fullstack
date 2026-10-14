import type { Metadata } from "next";
import { FaUser } from "react-icons/fa6";
import LoginForm from "./_components/login-form";

export const metadata: Metadata = {
  title: "Sign In",
  description:
    "Sign in to your AI-Recruite account as a Candidate or Employer to access your dashboard, mock interviews, and job postings.",
};

export default async function LoginPage() {
  return (
    <>
      {/* User Icon Badge */}
      <div className="size-13 sm:size-16 rounded-full bg-[#EDF6F1] flex items-center justify-center mx-auto mb-3 sm:mb-4">
        <div className="size-9 sm:size-11 rounded-full bg-white border border-[#D5E6DC] flex items-center justify-center shadow-xs">
          <FaUser className="size-3.5 sm:size-4 text-forest" />
        </div>
      </div>

      <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 text-center">
        Welcome Back
      </h1>
      <p className="text-xs text-zinc-500 text-center mt-1 mb-4 sm:mb-6">
        Sign in to your AI-Recruite account
      </p>

      {/* Form */}
      <LoginForm />
    </>
  );
}
