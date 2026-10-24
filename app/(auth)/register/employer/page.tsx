import type { Metadata } from "next";
import { FaBuilding } from "react-icons/fa6";
import EmployerRegisterForm from "./_components/employer-register-form";

export const metadata: Metadata = {
  title: "Employer Registration",
  description:
    "Create an employer account on AI-Recruite to post jobs, automatically rank candidates, and conduct AI video interviews.",
};

export default function EmployerRegisterPage() {
  return (
    <>
      {/* Icon Badge */}
      <div className="size-13 sm:size-16 rounded-full bg-[#EDF6F1] flex items-center justify-center mx-auto mb-3 sm:mb-4">
        <div className="size-9 sm:size-11 rounded-full bg-white border border-[#D5E6DC] flex items-center justify-center shadow-xs">
          <FaBuilding className="size-3.5 sm:size-4 text-forest" />
        </div>
      </div>

      <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 text-center">
        Create Employer Account
      </h1>
      <p className="text-xs text-zinc-500 text-center mt-1 mb-4 sm:mb-6">
        Post jobs, auto-rank applicants, and review AI interviews
      </p>

      {/* Form */}
      <EmployerRegisterForm />
    </>
  );
}
