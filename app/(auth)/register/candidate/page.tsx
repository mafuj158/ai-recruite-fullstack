import type { Metadata } from "next";
import { FaUserPlus } from "react-icons/fa6";
import CandidateRegisterForm from "./_components/candidate-register-form";

export const metadata: Metadata = {
  title: "Candidate Registration",
  description:
    "Create your candidate account on AI-Recruite to practice AI interviews, test your tech skills, and land your dream job.",
};

export default async function CandidateRegisterPage() {

  // for delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <>
      {/* Icon Badge */}
      <div className="size-13 sm:size-16 rounded-full bg-[#EDF6F1] flex items-center justify-center mx-auto mb-3 sm:mb-4">
        <div className="size-9 sm:size-11 rounded-full bg-white border border-[#D5E6DC] flex items-center justify-center shadow-xs">
          <FaUserPlus className="size-3.5 sm:size-4 text-forest" />
        </div>
      </div>

      <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 text-center">
        Create Candidate Account
      </h1>
      <p className="text-xs text-zinc-500 text-center mt-1 mb-4 sm:mb-6">
        Practice AI interviews and unlock top job matches
      </p>

      {/* Form */}
      <CandidateRegisterForm />
    </>
  );
}
