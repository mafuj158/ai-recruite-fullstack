import Link from "next/link";
import { FiBriefcase } from "react-icons/fi";

interface RecommendedJobsEmptyProps {
  message?: string;
}

export default function RecommendedJobsEmpty({
  message = "No recommended jobs found",
}: RecommendedJobsEmptyProps) {
  return (
    <div className="col-span-full bg-white border border-zinc-200/80 rounded p-6 sm:p-8 text-center space-y-3 shadow-xs">
      <div className="size-10 rounded-full bg-zinc-100 text-zinc-400 flex items-center justify-center mx-auto">
        <FiBriefcase className="size-5" />
      </div>
      <div className="space-y-1">
        <p className="text-sm font-semibold text-zinc-800">{message}</p>
        <p className="text-xs text-zinc-500">
          Update your profile skills to get personalized AI job matches.
        </p>
      </div>
      <Link
        href="/candidate/profile"
        className="inline-flex items-center px-3.5 py-1.5 rounded text-xs font-semibold bg-forest text-white hover:bg-forest/90 transition-colors shadow-2xs cursor-pointer"
      >
        Update Profile Skills
      </Link>
    </div>
  );
}
