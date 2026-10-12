"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FiArrowLeft,
  FiBriefcase,
  FiGrid,
  FiAlertCircle,
  FiUsers,
  FiPlus,
  FiCalendar,
} from "react-icons/fi";

export default function EmployerNotFound() {
  const router = useRouter();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-white border border-zinc-200/80 rounded p-8 sm:p-14 lg:p-16 text-center shadow-2xs space-y-6">
      {/* Icon & Badge */}
      <div className="flex flex-col items-center gap-3">
        <div className="size-16 sm:size-20 rounded-full bg-[#EDF6F1] border border-[#D5E6DC] text-forest flex items-center justify-center">
          <FiAlertCircle className="size-8 sm:size-10 text-forest" />
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest/5 border border-forest/15 text-forest text-xs font-semibold">
          <span className="size-1.5 rounded-full bg-forest animate-pulse" />
          404 • Resource Not Found
        </span>
      </div>

      {/* Text */}
      <div className="space-y-2 max-w-lg mx-auto">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-zinc-900 tracking-tight">
          Employer Resource Not Found
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">
          The job posting, candidate application, interview assessment, or employer page you requested does not exist or has been archived.
        </p>
      </div>

      {/* Primary Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2">
        <button
          type="button"
          onClick={() => router.back()}
          className="w-full sm:w-auto h-9 px-4 rounded border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
        >
          <FiArrowLeft className="size-3.5" />
          <span>Go Back</span>
        </button>

        <Link
          href="/employer/dashboard"
          className="w-full sm:w-auto h-9 px-4 rounded bg-forest hover:bg-forest/90 text-white text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
        >
          <FiGrid className="size-3.5" />
          <span>Employer Dashboard</span>
        </Link>
      </div>

      {/* Quick Portal Links */}
      <div className="pt-6 border-t border-zinc-100 max-w-xl mx-auto">
        <p className="text-xs text-zinc-400 font-medium mb-3">
          Quick Navigation
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
          <Link
            href="/employer/my-jobs"
            className="px-3 py-1.5 rounded bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-zinc-600 hover:text-forest transition-colors inline-flex items-center gap-1.5"
          >
            <FiBriefcase className="size-3 text-zinc-400" />
            <span>My Jobs</span>
          </Link>
          <Link
            href="/employer/candidates"
            className="px-3 py-1.5 rounded bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-zinc-600 hover:text-forest transition-colors inline-flex items-center gap-1.5"
          >
            <FiUsers className="size-3 text-zinc-400" />
            <span>Candidates</span>
          </Link>
          <Link
            href="/employer/interviews"
            className="px-3 py-1.5 rounded bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-zinc-600 hover:text-forest transition-colors inline-flex items-center gap-1.5"
          >
            <FiCalendar className="size-3 text-zinc-400" />
            <span>Interviews</span>
          </Link>
          <Link
            href="/employer/post-job"
            className="px-3 py-1.5 rounded bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-zinc-600 hover:text-forest transition-colors inline-flex items-center gap-1.5"
          >
            <FiPlus className="size-3 text-zinc-400" />
            <span>Post New Job</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
