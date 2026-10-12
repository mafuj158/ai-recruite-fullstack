import Link from "next/link";
import { LuBriefcase, LuPlus } from "react-icons/lu";

interface EmptyJobsStateProps {
  hasFilter: boolean;
  onReset: () => void;
}

export default function EmptyJobsState({ hasFilter, onReset }: EmptyJobsStateProps) {
  return (
    <div className="w-full bg-white rounded p-10 sm:p-14 border border-zinc-200/80 text-center flex flex-col items-center justify-center space-y-4 shadow-2xs">
      <div className="size-12 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500">
        <LuBriefcase className="size-6 text-zinc-400" />
      </div>

      <div className="space-y-1 max-w-sm">
        <h3 className="text-base font-semibold text-zinc-900">
          No job postings found
        </h3>
        <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">
          {hasFilter
            ? "No jobs match your current filter or search criteria. Try clearing your search or switching tabs."
            : "You haven't posted any jobs yet. Create your first listing to start receiving AI-ranked candidate applications."}
        </p>
      </div>

      {hasFilter ? (
        <button
          type="button"
          onClick={onReset}
          className="px-4 py-2 rounded text-xs font-semibold text-forest bg-[#EDF6F1] hover:bg-[#E3EFE8] transition-colors cursor-pointer"
        >
          Clear filters
        </button>
      ) : (
        <Link
          href="/employer/post-job"
          className="inline-flex items-center gap-2 px-4 py-2 rounded text-xs font-semibold text-white bg-forest hover:bg-forest/90 transition-colors shadow-xs"
        >
          <LuPlus className="size-4" />
          <span>Post a Job</span>
        </Link>
      )}
    </div>
  );
}
