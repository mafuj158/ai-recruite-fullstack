import Link from "next/link";
import { FiClock, FiSearch } from "react-icons/fi";

interface RecentActivityEmptyProps {
  message?: string;
}

export default function RecentActivityEmpty({
  message = "No recent activity yet",
}: RecentActivityEmptyProps) {
  return (
    <div className="rounded p-6 sm:p-8 text-center space-y-3 bg-zinc-50/60 border border-dashed border-zinc-200">
      <div className="size-9 rounded-full bg-zinc-100 text-zinc-400 flex items-center justify-center mx-auto">
        <FiClock className="size-4.5" />
      </div>
      <div className="space-y-1">
        <p className="text-xs sm:text-sm font-semibold text-zinc-800">{message}</p>
        <p className="text-xs text-zinc-500 max-w-xs mx-auto">
          When you apply to jobs or recruiters review your profile, updates will appear here.
        </p>
      </div>
      <Link
        href="/candidate/find-jobs"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold bg-forest text-white hover:bg-forest/90 transition-colors shadow-2xs cursor-pointer"
      >
        <FiSearch className="size-3" />
        <span>Browse Jobs</span>
      </Link>
    </div>
  );
}
