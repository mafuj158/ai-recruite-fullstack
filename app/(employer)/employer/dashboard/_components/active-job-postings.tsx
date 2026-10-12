import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import JobCard from "@/app/(employer)/employer/_components/job-card";
import { DUMMY_JOBS } from "@/app/(employer)/employer/my-jobs/dummy";

export default function ActiveJobPostings() {
  const activeJobs = DUMMY_JOBS.filter((job) => job.status === "active");
  const displayedJobs = activeJobs.slice(0, 3);

  return (
    <section id="my-jobs" className="w-full space-y-3 sm:space-y-4 scroll-mt-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
          <h2 className="text-sm sm:text-base lg:text-lg font-bold text-zinc-900 truncate">
            Active Job Postings
          </h2>
          <span className="text-[10px] sm:text-xs font-semibold text-forest bg-forest/10 px-2 py-0.5 rounded border border-forest/15 shrink-0 whitespace-nowrap">
            {activeJobs.length} Active
          </span>
        </div>

        <Link
          href="/employer/my-jobs"
          className="text-xs sm:text-sm text-zinc-500 hover:text-forest transition-colors font-medium flex items-center gap-1 shrink-0 whitespace-nowrap group"
        >
          <span>View All</span>
          <span className="hidden sm:inline">Jobs</span>
          <FiArrowRight className="size-3 sm:size-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* Jobs Grid using shared JobCard */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5 sm:gap-5">
        {displayedJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </section>
  );
}